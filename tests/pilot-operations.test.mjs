import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import Stripe from '../fmg-to-pharma/node_modules/stripe/esm/stripe.esm.node.js';
import nodemailer from '../fmg-to-pharma/node_modules/nodemailer/dist/esm/nodemailer.js';
import {createPilotService, sandboxGuard} from '../fmg-to-pharma/lib/pilot-server.js';
import {memoryStore, updateOrder, supabaseStore} from '../fmg-to-pharma/lib/pilot-store.js';
import {REVIEW_CHECKS, customerView, newOrder, approveReport} from '../fmg-to-pharma/lib/pilot-domain.js';
import {runIntelligence, auditDraft, parseJSON, publicURL} from '../fmg-to-pharma/lib/intelligence-engine.js';
import {dispatchNotifications} from '../fmg-to-pharma/lib/pilot-mail.js';
import {cases, consent, fixtureAnalysis, gatewayDouble} from './pilot-fixtures.mjs';

const adminToken = 'fictional-local-reviewer-token-for-tests-only-123456';
const webhookSecret = 'whsec_fictional_test_signing_secret';
const baseEnv = {FMG_PILOT_MODE: 'sandbox', VERCEL_ENV: 'preview', FMG_PILOT_ORIGIN: 'https://qa.example.invalid',
  FMG_PILOT_ADMIN_TOKEN: adminToken, STRIPE_WEBHOOK_SECRET: webhookSecret, AI_GATEWAY_API_KEY: 'fictional-never-network', FMG_AI_ENABLED: 'true', FMG_NOTIFICATION_MODE: 'capture'};
const headers = {origin: baseEnv.FMG_PILOT_ORIGIN, authorization: `Bearer ${adminToken}`};
function setup(packageId = 'application') {
  const store = memoryStore();let session;let clock = '2026-10-28T14:00:00Z';
  const sdk = new Stripe('sk_test_fictional');
  const stripe = {webhooks: sdk.webhooks, checkout: {sessions: {
    async create(data) {session = {id: `cs_test_${randomUUID()}`, livemode: false, metadata: data.metadata, payment_status: 'unpaid', currency: 'usd', amount_total: data.line_items[0].price_data.unit_amount, url: 'https://checkout.stripe.com/c/pay/test_fixture'};return session;},
    async retrieve(id) {assert.equal(id, session.id);return session;},
  }}};
  const input = {...cases[packageId === 'application' ? 0 : 1], ...consent, packageId};
  const fake = gatewayDouble(input, packageId);
  const service = createPilotService({env: baseEnv, store, stripe, now: () => clock,
    generate: (intake, options) => runIntelligence(intake, {...options, fetchImpl: fake.fetchImpl,sourceLoader:fake.sourceLoader})});
  async function event(type = 'checkout.session.completed', id = `evt_${randomUUID()}`, overrides = {}) {
    const body = JSON.stringify({id, type, livemode: false, data: {object: {...session}}, ...overrides});
    const signature = sdk.webhooks.generateTestHeaderString({payload: body, secret: webhookSecret});
    return {body, signature};
  }
  return {store, service, input, fake, stripe, event, getSession: () => session, setClock: v => clock = v,
    async checkout() {return service.checkout({headers, body: {packageId, email: 'candidate@example.invalid', termsAccepted: true}});}};
}
async function paidContext(packageId) {
  const ctx = setup(packageId);const checkout = await ctx.checkout();
  const req = {headers: {...headers, cookie: checkout.cookie.split(';')[0]}};
  ctx.getSession().payment_status = 'paid';const event = await ctx.event();await ctx.service.webhook(event.body, event.signature);
  const view = await ctx.service.status(req);return {...ctx, req, id: view.id};
}

test('closed and production modes reject orders; no live keys or third package are accepted', async () => {
  assert.throws(() => sandboxGuard({...baseEnv, VERCEL_ENV: 'production'}), /closed/);
  assert.throws(() => sandboxGuard({...baseEnv, FMG_PILOT_MODE: 'closed'}), /closed/);
  const ctx = setup();
  await assert.rejects(ctx.service.checkout({headers: {...headers, origin: 'https://attacker.invalid'}, body: {}}), /origin/);
  await assert.rejects(ctx.service.checkout({headers, body: {packageId: 'positioning', email: 'candidate@example.invalid', termsAccepted: true}}), /package/);
  await assert.rejects(ctx.service.checkout({headers, body: {packageId: 'application', email: 'real@example.com', termsAccepted: true}}), /test addresses/);
  const live = createPilotService({env: {...baseEnv, STRIPE_SECRET_KEY: 'sk_live_never_use'}, store: memoryStore()});
  await assert.rejects(live.checkout({headers, body: {packageId: 'application', email: 'candidate@example.invalid', termsAccepted: true}}), /live keys/);
});

test('Stripe SDK signature validation, delayed payment, amount validation and webhook replay', async () => {
  const ctx = setup();await ctx.checkout();const first = await ctx.event();
  await assert.rejects(ctx.service.webhook(first.body + ' ', first.signature), /signature|payload/i);
  await ctx.service.webhook(first.body, first.signature);
  const id = ctx.getSession().metadata.order_id;
  assert.equal((await ctx.store.get(id)).order.payment, null);
  ctx.getSession().payment_status = 'paid';ctx.getSession().amount_total = 1;
  const wrong = await ctx.event('checkout.session.async_payment_succeeded');
  await assert.rejects(ctx.service.webhook(wrong.body, wrong.signature), /amount mismatch/);
  ctx.getSession().amount_total = 4900;const paid = await ctx.event('checkout.session.async_payment_succeeded');
  await Promise.all([ctx.service.webhook(paid.body, paid.signature), ctx.service.webhook(paid.body, paid.signature)]);
  const order = (await ctx.store.get(id)).order;
  assert.equal(order.status, 'paid_intake_pending');assert.equal(order.outbox.length, 2);
  const live = await ctx.event('checkout.session.completed', 'evt_live', {livemode: true});
  await assert.rejects(ctx.service.webhook(live.body, live.signature), /Live/);
});

test('private intake enforces ownership, fictional data and current processing consent', async () => {
  const ctx = await paidContext('application');
  await assert.rejects(ctx.service.intake({headers, body: ctx.input}), /Private order/);
  await assert.rejects(ctx.service.intake({...ctx.req, body: {...ctx.input, processingConsent: false}}), /consent/);
  await assert.rejects(ctx.service.intake({...ctx.req, body: {...ctx.input, cv: 'Real candidate data '.repeat(30)}}), /fictional/);
  await ctx.service.intake({...ctx.req, body: ctx.input});
  const view = await ctx.service.status(ctx.req);
  assert.equal(view.status, 'intake_received');assert.equal(view.report, null);
  assert.equal(JSON.stringify(view).includes(ctx.input.cv), false);
  assert.equal(JSON.stringify(view).includes('accessHash'), false);
});

test('CRA application and CTM interview share the recovered pipeline, separate scope, and founder delivery gate', async () => {
  for (const packageId of ['application', 'interview']) {
    const ctx = await paidContext(packageId);await ctx.service.intake({...ctx.req, body: ctx.input});
    const invoke = (action, extra = {}) => ctx.service.review({headers, body: {id: ctx.id, action, ...extra}});
    await assert.rejects(invoke('deliver'), /approval/);
    const generated = await invoke('generate');
    assert.deepEqual(generated.draft.qualityFlags, []);
    assert.equal(ctx.fake.requests.length, 2);
    assert.equal(ctx.fake.requests[0].input.includes(ctx.input.cv), false);
    assert.equal(ctx.fake.requests[1].input.includes(ctx.input.cv), true);
    assert.equal(ctx.fake.requests[0].max_tool_calls, 2);
    assert.equal(ctx.fake.requests[1].store, false);
    assert.equal(generated.draft.analysis.interview_map.length, packageId === 'interview' ? 3 : 0);
    await assert.rejects(invoke('approve', {review: {checks: {}}}), /every/);
    const review = {reviewer: 'Fictional QA reviewer', note: 'All fixture checks reviewed for controlled QA.', checks: Object.fromEntries(REVIEW_CHECKS.map(k => [k, true]))};
    await invoke('approve', {review});assert.equal((await ctx.service.status(ctx.req)).report, null);
    await invoke('deliver');const customer = await ctx.service.status(ctx.req);
    assert.equal(customer.status, 'delivered');assert.ok(customer.report);
    await assert.rejects(invoke('feedback'), /seven days/);
    ctx.setClock('2026-11-05T14:00:00Z');await invoke('feedback');
    const captured = await invoke('capture_notifications');
    assert.equal(captured.notifications.length, 5);
    assert.ok(captured.notifications.every(n => n.status === 'captured'));
    assert.ok(captured.notifications.every(n => !n.message.text.includes(ctx.input.cv)));
  }
});

test('AI is disabled without approval; missing citations and invented evidence cannot be approved', async () => {
  const input = {...cases[0], ...consent, packageId: 'application'};
  let calls = 0;
  await assert.rejects(runIntelligence(input, {env: {}, fetchImpl: async () => {calls++;}}), /disabled/);
  assert.equal(calls, 0);
  const raw = fixtureAnalysis(input);raw.source_index[0].url = 'https://invented.invalid/fact';raw.evidence_map[0].candidate_quotes = ['Reduced deviations 87%'];
  const result = auditDraft(raw, input, 'application', [input.jobUrl]);
  assert.ok(result.qualityFlags.some(x => x.includes('research tool')));
  assert.ok(result.qualityFlags.some(x => x.includes('exact intake')));
  assert.throws(() => approveReport({status: 'review_required', draft: result}, {checks: {}}, new Date().toISOString()), /quality flags/);
  assert.throws(() => parseJSON('not JSON'), /JSON|Unexpected/);
  assert.equal(publicURL('http://127.0.0.1/private'), null);assert.equal(publicURL('https://user:password@example.com'), null);
});

test('concurrent generation reserves one attempt; a failed request cannot loop indefinitely', async () => {
  const ctx = await paidContext('application');await ctx.service.intake({...ctx.req, body: ctx.input});
  let release, entered;const barrier = new Promise(resolve => {release = resolve;});
  const started = new Promise(resolve => {entered = resolve;});let calls = 0;
  const service = createPilotService({env: baseEnv, store: ctx.store, generate: async () => {calls++;entered();await barrier;throw Error('Controlled QA provider failure');}});
  const invoke = () => service.review({headers, body: {id: ctx.id, action: 'generate'}});
  const first = invoke();const failure = assert.rejects(first, /Controlled/);await started;
  await assert.rejects(invoke(), /ready|running/);release();await failure;
  await assert.rejects(invoke(), /Controlled/);
  await assert.rejects(invoke(), /attempt limit/);
  assert.equal(calls, 2);assert.equal((await ctx.store.get(ctx.id)).order.generationAttempts, 2);
});

test('invalid mail configuration does not lease pending notifications', async () => {
  const ctx = await paidContext('application');
  const env = {...baseEnv, FMG_NOTIFICATION_MODE: 'smtp-test', FMG_EMAIL_TEST_APPROVED: 'true', FMG_EMAIL_TEST_RECIPIENTS: 'candidate@example.invalid', FMG_EMAIL_FROM: 'qa@example.invalid', FMG_FOUNDER_EMAIL: 'founder@example.invalid'};
  await assert.rejects(dispatchNotifications(ctx.store, ctx.id, {env}), /SMTP/);
  assert.ok((await ctx.store.get(ctx.id)).order.outbox.every(item => item.status === 'pending' && item.attempts === 0));
});

test('notification rendering uses a local stream; failed sending is retryable and never leaks CVs', async () => {
  const ctx = await paidContext('application');
  const env = {...baseEnv, FMG_NOTIFICATION_MODE: 'smtp-test', FMG_EMAIL_TEST_APPROVED: 'true',
    FMG_EMAIL_TEST_RECIPIENTS: 'approved-qa@example.invalid,founder@example.invalid', FMG_EMAIL_TEST_CUSTOMER: 'approved-qa@example.invalid', FMG_EMAIL_FROM: 'qa@example.invalid', FMG_FOUNDER_EMAIL: 'founder@example.invalid'};
  const messages = [], subjects = [];
  const stream = nodemailer.createTransport({streamTransport: true, buffer: true, newline: 'unix'});
  const transport = {async sendMail(message) {subjects.push(message.subject);const info = await stream.sendMail(message);messages.push(info.message.toString());return info;}};
  const results = await dispatchNotifications(ctx.store, ctx.id, {env, transport});
  assert.equal(results.length, 2);assert.ok(results.every(r => r.status === 'sent'));
  assert.ok(messages.every(m => m.includes('Subject:') && !m.includes(ctx.input.cv)));
  assert.ok(messages.some(m => m.includes('To: approved-qa@example.invalid')));
  assert.ok(subjects.every(subject => subject.startsWith('[SANDBOX TEST]')));
  assert.equal((await dispatchNotifications(ctx.store, ctx.id, {env, transport})).length, 0);
  const failing = await paidContext('application');
  const failure = await dispatchNotifications(failing.store, failing.id, {env, transport: {async sendMail() {throw Error('fake SMTP failure');}}});
  assert.ok(failure.every(r => r.status === 'retry_or_review'));
  assert.ok((await failing.store.get(failing.id)).order.outbox.every(x => x.status === 'pending' && x.nextAttemptAt));
});

test('Supabase adapter uses only sandbox storage, bounded optimistic updates and server-only credentials', async () => {
  const requests = [];
  const store = supabaseStore({SUPABASE_URL: 'https://qa.supabase.invalid', SUPABASE_SECRET_KEY: 'sb_secret_fictional'}, async (url, options) => {
    requests.push({url, options});return {ok: true, status: 200, json: async () => options.method === 'PATCH' ? [] : []};
  });
  const order = newOrder({id: randomUUID(), accessHash: 'fictional-hash', packageId: 'application', email: 'a@example.invalid', now: new Date().toISOString()});
  assert.equal(await store.save(order, 3), false);
  assert.ok(requests[0].url.includes('fmg_pilot_sandbox_orders?'));
  assert.ok(requests[0].url.includes('version=eq.3'));
  assert.equal(requests[0].options.headers.Authorization, undefined);
  assert.equal(requests[0].options.headers.apikey, 'sb_secret_fictional');
});
