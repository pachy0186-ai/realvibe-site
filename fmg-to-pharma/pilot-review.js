import {renderReport} from './report-renderer.js';
const form = document.getElementById('review-form');
const status = document.getElementById('review-status');
let busy = false;
document.getElementById('checkout-form').addEventListener('submit', async event => {
  event.preventDefault();if (busy || !event.currentTarget.reportValidity()) return;
  const access = form.elements.access.value;
  if (access.length < 32) {status.textContent = 'Enter the reviewer access code before creating a sandbox checkout.';return;}
  const input = event.currentTarget;busy = true;status.textContent = 'Creating a Stripe sandbox checkout…';
  try {const response = await fetch('/api/fmg-pilot-checkout', {method: 'POST', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${access}`},
    body: JSON.stringify({packageId: input.elements.packageId.value, email: input.elements.email.value, termsAccepted: input.elements.termsAccepted.checked})});
    const data = await response.json();if (!response.ok) throw Error(data.error);
    const url = new URL(data.url);if (url.origin !== 'https://checkout.stripe.com') throw Error('Unexpected checkout destination.');
    location.assign(url.href);
  } catch (error) {status.textContent = error.message || 'Sandbox checkout is unavailable.';} finally {busy = false;}
});
form.addEventListener('submit', async event => {
  event.preventDefault();if (busy || !form.reportValidity()) return;
  const action = event.submitter?.value || 'inspect';
  const headers = {'Content-Type': 'application/json', Authorization: `Bearer ${form.elements.access.value}`};
  const id = form.elements.orderId.value.trim();
  const review = {reviewer: form.elements.reviewer.value.trim(), note: form.elements.note.value.trim(), minutes: form.elements.minutes.value, checks: {}};
  for (const input of form.querySelectorAll('[data-review-check]')) review.checks[input.dataset.reviewCheck] = input.checked;
  busy = true;status.textContent = action === 'generate' ? 'Generating a draft. No delivery occurs before founder review.' : 'Processing reviewer action…';
  try {const response = await fetch(action === 'generate' ? '/api/analyze' : '/api/fmg-pilot-review', {
    method: 'POST', headers, body: JSON.stringify(action === 'generate' ? {orderId: id} : {id, action, review})});
    const data = await response.json();if (!response.ok) throw Error(data.error);
    status.textContent = `Action completed. Status: ${data.status || 'notifications captured for testing'}.`;
    document.getElementById('review-log').textContent = JSON.stringify({id: data.id, status: data.status,
      flags: data.draft?.qualityFlags, telemetry: data.draft?.telemetry, review: data.review, notifications: data.notifications}, null, 2);
    if (data.draft) renderReport(document.getElementById('review-report'), data.draft);
  } catch (error) {status.textContent = error.message || 'Reviewer action failed.';} finally {busy = false;}
});
