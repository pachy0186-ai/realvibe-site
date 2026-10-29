import nodemailer from 'nodemailer';
import {randomUUID, createHash} from 'node:crypto';
import {ensure, notification} from './pilot-domain.js';
import {updateOrder} from './pilot-store.js';

export function smtpTransport(env) {
  ensure(env.FMG_NOTIFICATION_MODE === 'smtp-test' && env.FMG_EMAIL_TEST_APPROVED === 'true', 'External test email is not approved.');
  const port = Number(env.FMG_SMTP_PORT || 465);
  ensure(env.FMG_SMTP_HOST && [465, 587].includes(port) && env.FMG_SMTP_USER && env.FMG_SMTP_PASSWORD, 'Secure SMTP is not configured.');
  return nodemailer.createTransport({host: env.FMG_SMTP_HOST, port, secure: port === 465, requireTLS: true,
    auth: {user: env.FMG_SMTP_USER, pass: env.FMG_SMTP_PASSWORD}, tls: {rejectUnauthorized: true},
    connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 20000});
}
// A durable lease prevents concurrent workers from sending the same pending entry.
// SMTP is at-least-once: a crash after acceptance but before recording success can duplicate mail.
export async function dispatchNotifications(store, id, {env, transport, now = () => new Date().toISOString()} = {}) {
  ensure(env.FMG_NOTIFICATION_MODE === 'smtp-test' && env.FMG_EMAIL_TEST_APPROVED === 'true', 'External test email is not approved.');
  const allowed = String(env.FMG_EMAIL_TEST_RECIPIENTS || '').split(',').map(v => v.trim()).filter(Boolean);
  ensure(allowed.length && env.FMG_EMAIL_FROM && env.FMG_FOUNDER_EMAIL, 'Approved test recipients and sender are required.');
  const sender = transport || smtpTransport(env);
  const worker = randomUUID(); const claimed = [];
  await updateOrder(store, id, order => {
    claimed.length = 0;
    for (const item of order.outbox) {
      const available = item.status === 'pending' || item.status === 'sending' && Date.parse(item.leaseUntil) < Date.parse(now());
      if (claimed.length >= 5 || !available || item.attempts >= 5 || item.nextAttemptAt && Date.parse(item.nextAttemptAt) > Date.parse(now())) continue;
      item.status = 'sending';item.worker = worker;item.leaseUntil = new Date(Date.parse(now()) + 120000).toISOString();item.attempts++;
      claimed.push(structuredClone(item));
    }
    return order;
  });
  const results = [];
  for (const item of claimed) {
    try {
      const current = (await store.get(id)).order;
      const message = notification(current, item, {origin: env.FMG_PILOT_ORIGIN, founderEmail: env.FMG_FOUNDER_EMAIL});
      // Orders retain fictional addresses. An explicitly approved QA mailbox can receive customer-template tests.
      if (item.kind !== 'founder_paid' && env.FMG_EMAIL_TEST_CUSTOMER) message.to = env.FMG_EMAIL_TEST_CUSTOMER;
      message.subject = `[SANDBOX TEST] ${message.subject}`;
      ensure(allowed.includes(message.to), 'Recipient is outside the approved test allowlist.');
      const messageId = `<${createHash('sha256').update(item.id).digest('hex')}@fmg-pilot.invalid>`;
      const info = await sender.sendMail({...message, from: env.FMG_EMAIL_FROM, messageId, disableFileAccess: true, disableUrlAccess: true});
      ensure(info.accepted?.includes(message.to) || info.message, 'Email transport did not accept the test message.');
      await updateOrder(store, id, order => {const target = order.outbox.find(x => x.id === item.id);ensure(target?.worker === worker, 'Notification lease changed.');target.status = 'sent';target.sentAt = now();delete target.worker;delete target.leaseUntil;return order;});
      results.push({id: item.id, status: 'sent'});
    } catch {
      await updateOrder(store, id, order => {const target = order.outbox.find(x => x.id === item.id);if (target?.worker === worker) {target.status = target.attempts >= 5 ? 'failed' : 'pending';target.lastError = 'Test notification failed; review the transport and recipient configuration.';target.nextAttemptAt = new Date(Date.parse(now()) + 60000 * 2 ** target.attempts).toISOString();delete target.worker;delete target.leaseUntil;}return order;});
      results.push({id: item.id, status: 'retry_or_review'});
    }
  }
  return results;
}
