import {randomUUID, randomBytes, createHash, timingSafeEqual} from 'node:crypto';
import Stripe from 'stripe';
import {PACKAGES, ensure, newOrder, receiveIntake, recordPayment, attachDraft, approveReport,
  deliverReport, requestFeedback, notification, customerView} from './pilot-domain.js';
import {supabaseStore, updateOrder} from './pilot-store.js';
import {runIntelligence} from './intelligence-engine.js';
import {dispatchNotifications} from './pilot-mail.js';

export const hash = text => createHash('sha256').update(text).digest('hex');
const equal = (a, b) => typeof a === 'string' && typeof b === 'string' && a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
const validId = id => typeof id === 'string' && /^[0-9a-f-]{36}$/i.test(id);
function admin(req, env) {
  ensure(env.FMG_PILOT_ADMIN_TOKEN?.length >= 32 && equal(req.headers.authorization, `Bearer ${env.FMG_PILOT_ADMIN_TOKEN}`), 'Reviewer authentication required.');
}
export function sandboxGuard(env) {
  ensure(env.VERCEL_ENV !== 'production' && env.FMG_PILOT_MODE === 'sandbox', 'Pilot orders are closed.');
  ensure(env.FMG_PILOT_ORIGIN && /^(https:\/\/[^/?#]+|http:\/\/127\.0\.0\.1:\d+)$/.test(env.FMG_PILOT_ORIGIN), 'Verified pilot origin is required.');
}
function stripeClient(env) {
  ensure(/^(sk_test_|rk_test_)/.test(env.STRIPE_SECRET_KEY || ''), 'A Stripe sandbox key is required; live keys are rejected.');
  return new Stripe(env.STRIPE_SECRET_KEY, {maxNetworkRetries: 1, timeout: 15000});
}
export async function rawBody(req, max = 160000) {
  const chunks = []; let size = 0;
  for await (const chunk of req) {const buffer = Buffer.from(chunk);size += buffer.length;ensure(size <= max, 'Request is too large.');chunks.push(buffer);}
  return Buffer.concat(chunks);
}
export function createPilotService({env = process.env, store, stripe, generate = runIntelligence, now = () => new Date().toISOString()} = {}) {
  const database = () => store || supabaseStore(env);
  const payments = () => stripe || stripeClient(env);
  async function owned(req) {
    const cookie = String(req.headers.cookie || '').split(';').map(v => v.trim()).find(v => v.startsWith('fmg_pilot='));
    const [id, token] = (cookie?.slice('fmg_pilot='.length) || '').split('.');
    ensure(validId(id) && /^[A-Za-z0-9_-]{43}$/.test(token || ''), 'Private order session is required.');
    const found = await database().get(id);
    ensure(found && equal(found.order.accessHash, hash(token)), 'Private order session is invalid.');
    return found.order;
  }
  return {
    async checkout(req) {
      sandboxGuard(env); admin(req, env); // Sandbox checkouts are reviewer-only until launch approval.
      ensure(req.headers.origin === env.FMG_PILOT_ORIGIN, 'Request origin mismatch.');
      const {packageId, email, termsAccepted} = req.body || {};
      ensure(PACKAGES[packageId] && termsAccepted === true, 'Select a package and accept the sandbox terms.');
      ensure(/^[^\s@]+@[^\s@]+\.invalid$/i.test(email || ''), 'Sandbox checkout accepts only .invalid test addresses.');
      const client = payments(); const id = randomUUID(); const token = randomBytes(32).toString('base64url');
      const order = newOrder({id, accessHash: hash(token), packageId, email, now: now()});
      await database().create(order);
      const price = PACKAGES[packageId];
      const session = await client.checkout.sessions.create({mode: 'payment', customer_email: email,
        client_reference_id: id, metadata: {order_id: id, package_id: packageId, sandbox: 'true'},
        line_items: [{price_data: {currency: 'usd', unit_amount: price.cents,
          product_data: {name: `SANDBOX — ${price.name}`}}, quantity: 1}],
        success_url: `${env.FMG_PILOT_ORIGIN}/pilot-order?checkout=returned`, cancel_url: `${env.FMG_PILOT_ORIGIN}/pilot-order?checkout=cancelled`}, {idempotencyKey: `fmg-sandbox-${id}`});
      ensure(session.livemode === false && session.url?.startsWith('https://checkout.stripe.com/'), 'Stripe returned an unexpected checkout.');
      order.checkoutId = session.id; ensure(await database().save(order, 0), 'Unable to associate checkout.');
      return {url: session.url, cookie: `fmg_pilot=${id}.${token}; HttpOnly; ${env.FMG_PILOT_ORIGIN.startsWith('https:') ? 'Secure; ' : ''}SameSite=Lax; Path=/; Max-Age=2592000`};
    },
    async webhook(payload, signature) {
      sandboxGuard(env); ensure(env.STRIPE_WEBHOOK_SECRET?.startsWith('whsec_'), 'Webhook verification is not configured.');
      const client = payments();
      const event = await client.webhooks.constructEventAsync(payload, signature, env.STRIPE_WEBHOOK_SECRET);
      ensure(event.livemode === false, 'Live events are rejected.');
      if (!['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'checkout.session.async_payment_failed'].includes(event.type)) return {received: true};
      const incoming = event.data.object; const id = incoming.metadata?.order_id;
      ensure(validId(id), 'Unknown payment order.');
      // Retrieve the Session independently; do not trust client-return URLs or submitted amounts.
      const session = await client.checkout.sessions.retrieve(incoming.id);
      await updateOrder(database(), id, order => recordPayment(order, {id: event.id, type: event.type, livemode: event.livemode, session}, now()));
      return {received: true};
    },
    async status(req) {sandboxGuard(env);return customerView(await owned(req));},
    async intake(req) {
      sandboxGuard(env); ensure(req.headers.origin === env.FMG_PILOT_ORIGIN, 'Request origin mismatch.');
      ensure(req.body?.cv?.startsWith('FICTIONAL QA CANDIDATE'), 'Sandbox intake accepts clearly labeled fictional QA evidence only.');
      const current = await owned(req);
      return customerView(await updateOrder(database(), current.id, order => receiveIntake(order, req.body, now())));
    },
    async review(req) {
      sandboxGuard(env); admin(req, env); ensure(req.headers.origin === env.FMG_PILOT_ORIGIN, 'Request origin mismatch.');
      const {id, action, review} = req.body || {}; ensure(validId(id), 'Valid order reference required.');
      const db = database(); const found = await db.get(id); ensure(found, 'Order not found.');
      if (action === 'generate') {
        ensure(env.FMG_AI_ENABLED === 'true', 'AI generation is disabled pending billing and validation approval.');
        ensure(found.order.intake && found.order.payment && ['intake_received', 'review_required'].includes(found.order.status), 'Order is not ready for generation.');
        const inputHash = hash(JSON.stringify(found.order.intake));
        const reserved = await updateOrder(db, id, order => {
          ensure(['intake_received', 'review_required'].includes(order.status), 'Generation is already running.');
          ensure((order.generationAttempts || 0) < 2, 'Generation attempt limit reached. Reviewer intervention required.');
          order.generationAttempts = (order.generationAttempts || 0) + 1;
          order.status = 'researching'; order.generationStartedAt = now(); return order;
        });
        try {
          const draft = await generate({...reserved.intake, packageId: reserved.packageId}, {env});
          return await updateOrder(db, id, order => {ensure(hash(JSON.stringify(order.intake)) === inputHash, 'Intake changed during generation.');return attachDraft(order, draft, now());});
        } catch (error) {
          await updateOrder(db, id, order => {order.status = 'intake_received';order.generationError = 'Generation failed; review configuration and costs before retrying.';return order;});
          throw error;
        }
      }
      if (action === 'approve') return updateOrder(db, id, order => approveReport(order, review, now()));
      if (action === 'deliver') return updateOrder(db, id, order => deliverReport(order, now()));
      if (action === 'feedback') return updateOrder(db, id, order => requestFeedback(order, now()));
      if (action === 'send_test_notifications') return {id, notifications: await dispatchNotifications(db, id, {env, now})};
      if (action === 'capture_notifications') {
        ensure(env.FMG_NOTIFICATION_MODE === 'capture', 'Only test capture is implemented; external email is disabled.');
        const order = await updateOrder(db, id, current => {
          for (const item of current.outbox) if (item.status === 'pending') {
            item.message = notification(current, item, {origin: env.FMG_PILOT_ORIGIN, founderEmail: 'founder@example.invalid'});
            item.status = 'captured'; item.attempts += 1; item.capturedAt = now();
          }
          return current;
        });
        return {id: order.id, notifications: order.outbox};
      }
      ensure(action === 'inspect', 'Unknown review action.'); return found.order;
    },
  };
}
export function apiHeaders(res) {
  res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Referrer-Policy', 'no-referrer'); res.setHeader('X-Content-Type-Options', 'nosniff');
}
export function failure(res, error) {
  const message = error?.type?.startsWith('Stripe') ? 'Sandbox payment request failed. Contact support.' :
    error?.name === 'ZodError' ? 'The generated report failed structure checks; founder review is required.' : String(error?.message || 'Pilot request failed.');
  const auth = /authentication|required session|session is|session is invalid|Private order/.test(message);
  const closed = /closed|disabled|not configured|billing verification|authentication is unavailable/.test(message);
  // Do not return provider response bodies, submitted values, credentials, or database diagnostics.
  return res.status(closed ? 503 : auth ? 401 : 400).json({error: message.length < 180 ? message : 'Pilot request failed. Please contact support.'});
}
