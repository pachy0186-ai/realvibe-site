import {renderReport} from './report-renderer.js';
const form = document.getElementById('review-form');
const status = document.getElementById('review-status');
let busy = false;
function showStatus(message) {
  status.textContent = message;
  status.scrollIntoView({behavior: 'smooth', block: 'center'});
}
form.addEventListener('invalid', event => {
  showStatus(`Check ${event.target.labels?.[0]?.textContent || 'the highlighted field'}: ${event.target.validationMessage}`);
}, true);
form.addEventListener('keydown', event => {
  if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
    event.preventDefault();
    showStatus('Choose an action button below. Enter does not save or approve a report.');
  }
});
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
document.getElementById('connect-gmail').addEventListener('click', async () => {
    if (busy) return;
    if (!form.elements.access.reportValidity()) return;
    busy = true;
    showStatus('Opening secure Google authorization…');
    try {
      const response = await fetch('/api/fmg-gmail-oauth',{method:'POST',headers:{Authorization:`Bearer ${form.elements.access.value}`}});
      const result = await response.json();
      if(!response.ok || new URL(result.url).origin !== 'https://accounts.google.com') throw Error('Gmail authorization could not start.');
      location.assign(result.url);
    } catch {showStatus('Gmail authorization could not start. Check reviewer access and OAuth configuration.');} finally {busy = false;}
});
form.addEventListener('submit', async event => {
  event.preventDefault();if (busy) return;
  const action = event.submitter?.value;
  if (!action) {showStatus('Choose an action button to continue.');return;}
  if (!form.reportValidity()) return;
  const manualReport = {title: form.elements.manualTitle.value, body: form.elements.manualBody.value, sourceNote: form.elements.manualSourceNote.value};
  const headers = {'Content-Type': 'application/json', Authorization: `Bearer ${form.elements.access.value}`};
  const id = form.elements.orderId.value.trim();
  const review = {reviewer: form.elements.reviewer.value.trim(), note: form.elements.note.value.trim(), minutes: form.elements.minutes.value, checks: {}};
  for (const input of form.querySelectorAll('[data-review-check]')) review.checks[input.dataset.reviewCheck] = input.checked;
  if (action === 'approve') {
    if (review.reviewer.length < 2) {showStatus('Enter a reviewer name before approving.');return;}
    if (review.note.length < 10) {showStatus('Enter a review note of at least 10 characters before approving.');return;}
    const incomplete = [...form.querySelectorAll('[data-review-check]')].filter(input => !input.checked);
    if (incomplete.length) {showStatus(`Complete all seven review checks before approving (${incomplete.length} remaining).`);return;}
  }
  busy = true;showStatus(action === 'generate' ? 'Generating a draft. No delivery occurs before founder review.' : 'Processing reviewer action…');
  try {const response = await fetch(action === 'generate' ? '/api/analyze' : '/api/fmg-pilot-review', {
    method: 'POST', headers, body: JSON.stringify(action === 'generate' ? {orderId: id} : {id, action, review, manualReport})});
    const data = await response.json();if (!response.ok) throw Error(data.error);
    showStatus(action === 'submit_manual' ? 'Manual draft saved. Review the report below, then complete the review checks before approving.' : `Action completed. Status: ${data.status || 'notifications captured for testing'}.`);
    document.getElementById('review-log').textContent = JSON.stringify({id: data.id, status: data.status,
      flags: data.draft?.qualityFlags, telemetry: data.draft?.telemetry, review: data.review, notifications: data.notifications}, null, 2);
    if (data.draft) renderReport(document.getElementById('review-report'), data.draft);
  } catch (error) {showStatus(error.message || 'Reviewer action failed.');} finally {busy = false;}
});
