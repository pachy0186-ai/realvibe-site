// Shared deterministic order rules. No network, credentials, or model calls.
export const PACKAGES = Object.freeze({
  application: {name: 'Application Intelligence', cents: 4900},
  interview: {name: 'Interview Intelligence', cents: 9900},
});
export const CONSENT_VERSION = 'pilot-processing-2026-10-28';
export function ensure(condition, message) { if (!condition) throw new Error(message); }
export function clean(value, min, max, label) {
  ensure(typeof value === 'string', `${label} is required.`);
  const text = value.trim();
  ensure(text.length >= min && text.length <= max, `${label} must contain ${min}–${max} characters.`);
  return text;
}
export function validateIntake(input, packageId) {
  ensure(PACKAGES[packageId], 'Unknown package.');
  ensure(input.processingConsent === true && input.consentVersion === CONSENT_VERSION, 'Processing consent is required.');
  const result = {
    company: clean(input.company, 2, 160, 'Target company'),
    role: clean(input.role, 3, 180, 'Target role'),
    jd: clean(input.jd, 250, 30000, 'Job description'),
    cv: clean(input.cv, 300, 30000, 'Career evidence'),
    jobUrl: '', interviewDate: '', processingConsent: true, consentVersion: CONSENT_VERSION,
    feedbackConsent: input.feedbackConsent === true,
  };
  if (input.jobUrl) {
    const url = new URL(clean(input.jobUrl, 8, 1500, 'Job URL'));
    ensure(url.protocol === 'https:' && !url.username && !url.password, 'Use a public HTTPS job URL.');
    result.jobUrl = url.href; // Stored as a reference; never fetched directly by this module.
  }
  if (input.interviewDate) {
    ensure(packageId === 'interview' && /^\d{4}-\d{2}-\d{2}$/.test(input.interviewDate), 'Invalid interview date.');
    ensure(!Number.isNaN(Date.parse(input.interviewDate)), 'Invalid interview date.');
    result.interviewDate = input.interviewDate;
  }
  return result;
}
export function newOrder({id, accessHash, packageId, email, now}) {
  ensure(PACKAGES[packageId], 'Unknown package.');
  ensure(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'A valid email is required.');
  return {id, accessHash, packageId, email, createdAt: now, updatedAt: now, status: 'checkout_pending',
    payment: null, checkoutId: null, intake: null, draft: null, review: null, deliveredAt: null,
    processedEvents: [], outbox: [], history: [{at: now, action: 'order_created'}]};
}
function changed(order, now, action) {
  const next = structuredClone(order); next.updatedAt = now; next.history.push({at: now, action}); return next;
}
export function queueMail(order, kind, now) {
  const id = `${order.id}:${kind}`;
  if (!order.outbox.some(item => item.id === id)) order.outbox.push({id, kind, status: 'pending', attempts: 0, createdAt: now});
}
export function recordPayment(order, event, now) {
  ensure(event.livemode === false && event.session?.livemode === false, 'Live payment events are not accepted.');
  ensure(event.session.id === order.checkoutId && event.session.metadata?.order_id === order.id, 'Payment order mismatch.');
  if (order.processedEvents.includes(event.id)) return structuredClone(order);
  const next = changed(order, now, 'payment_event');
  next.processedEvents.push(event.id);
  if (event.type === 'checkout.session.async_payment_failed') {
    if (!next.payment) next.status = 'payment_failed';
    return next;
  }
  ensure(['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type), 'Unsupported event.');
  if (event.session.payment_status !== 'paid') return next;
  ensure(event.session.amount_total === PACKAGES[order.packageId].cents && event.session.currency === 'usd', 'Payment amount mismatch.');
  if (!next.payment) {
    next.payment = {verifiedAt: now, checkoutId: event.session.id, cents: event.session.amount_total, currency: 'usd', sandbox: true};
    next.status = 'paid_intake_pending';
    queueMail(next, 'payment_confirmation', now); queueMail(next, 'founder_paid', now);
  }
  return next;
}
export function receiveIntake(order, input, now) {
  ensure(order.payment && ['paid_intake_pending', 'intake_received'].includes(order.status), 'Verified payment and an open intake are required.');
  const next = changed(order, now, 'intake_received');
  next.intake = {...validateIntake(input, order.packageId), receivedAt: now};
  next.status = 'intake_received'; queueMail(next, 'intake_confirmation', now); return next;
}
export function attachDraft(order, draft, now) {
  ensure(order.payment && order.intake && ['intake_received', 'researching', 'review_required'].includes(order.status), 'Complete intake is required.');
  ensure(draft && typeof draft === 'object' && Array.isArray(draft.qualityFlags), 'Validated report draft is required.');
  const next = changed(order, now, 'draft_generated'); next.draft = draft; next.review = null;
  next.status = 'review_required'; return next;
}
export const REVIEW_CHECKS = ['sources', 'candidateEvidence', 'clinicalAccuracy', 'uncertainties', 'packageScope', 'privacy', 'readability'];
export function approveReport(order, review, now) {
  ensure(review && typeof review === 'object', 'Founder review is required.');
  ensure(order.status === 'review_required' && order.draft, 'A draft awaiting review is required.');
  ensure(order.draft.qualityFlags.length === 0, 'Resolve report quality flags before approval.');
  if(order.draft.engineVersion==='0.4.0-evidence-first') ensure(review.humanClinicalReviewerAttestation===true,'A qualified independent human clinical reviewer must explicitly attest before approval.');
  ensure(REVIEW_CHECKS.every(key => review.checks?.[key] === true), 'Complete every founder review check.');
  const next = changed(order, now, 'founder_approved');
  next.review = {reviewer: clean(review.reviewer, 2, 80, 'Reviewer'), note: clean(review.note, 10, 2000, 'Review note'),
    checks: Object.fromEntries(REVIEW_CHECKS.map(k => [k, true])), approvedAt: now};
  if(next.draft.engineVersion==='0.4.0-evidence-first') next.draft.humanReview={...next.draft.humanReview,status:'attested',reviewer:next.review.reviewer,reviewedAt:now,qualifiedClinicalReviewerAttestation:true};
  if (review.minutes !== undefined && review.minutes !== '') {
    ensure(Number.isFinite(Number(review.minutes)) && Number(review.minutes) > 0 && Number(review.minutes) <= 480, 'Enter valid review minutes.');
    next.review.minutes = Number(review.minutes);
  }
  next.status = 'approved'; return next;
}
export function deliverReport(order, now) {
  ensure(order.status === 'approved' && order.review && order.draft?.qualityFlags.length === 0, 'Founder approval is required before delivery.');
  const next = changed(order, now, 'report_delivered'); next.status = 'delivered'; next.deliveredAt = now;
  queueMail(next, 'delivery_notification', now); return next;
}
export function requestFeedback(order, now) {
  ensure(order.status === 'delivered' && order.intake?.feedbackConsent, 'Delivery and feedback opt-in are required.');
  ensure(Date.parse(now) >= Date.parse(order.deliveredAt) + 7 * 86400000, 'Feedback is scheduled no earlier than seven days after delivery.');
  const next = changed(order, now, 'feedback_requested'); queueMail(next, 'feedback_request', now); return next;
}
export function customerView(order) {
  return {id: order.id, packageId: order.packageId, status: order.status, createdAt: order.createdAt,
    paid: !!order.payment, intakeComplete: !!order.intake, deliveredAt: order.deliveredAt,
    report: order.status === 'delivered' ? order.draft : null};
}
export function notification(order, item, {origin, founderEmail}) {
  const service = PACKAGES[order.packageId].name;
  const portal = `${origin}/pilot-order`;
  const content = {
    payment_confirmation: [`Payment confirmed — ${service}`, `Your sandbox payment for ${service} is verified. Order ${order.id}. Complete your private intake at ${portal}. Delivery timing must be confirmed after complete intake; this is not a delivery-date promise.`],
    founder_paid: [`Paid order requires review — ${service}`, `Sandbox order ${order.id}: $${PACKAGES[order.packageId].cents / 100} USD verified. Intake is pending. Open the private reviewer workspace; do not request documents by email.`],
    intake_confirmation: [`Intake received — ${service}`, `Your intake for order ${order.id} is recorded. The draft must pass source checks and founder review before delivery. Check status at ${portal}.`],
    delivery_notification: [`Your ${service} report is ready`, `Your reviewed sandbox report for order ${order.id} is available privately at ${portal}. Reply with your order reference if you need help. No employment outcome is guaranteed.`],
    feedback_request: [`How useful was your ${service} report?`, `You opted in to feedback about order ${order.id}. You may reply with what was useful and what needs improving. This request is optional and does not enroll you in marketing.`],
  };
  ensure(content[item.kind], 'Unknown notification.');
  return {id: item.id, to: item.kind === 'founder_paid' ? founderEmail : order.email,
    subject: content[item.kind][0], text: content[item.kind][1]};
}
