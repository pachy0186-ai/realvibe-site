import {renderReport} from './report-renderer.js';
const status = document.getElementById('order-status');
const form = document.getElementById('intake-form');
const labels = {checkout_pending: 'Waiting for verified payment', payment_failed: 'Payment was not completed',
  paid_intake_pending: 'Payment verified — complete your intake', intake_received: 'Intake received', researching: 'Research in progress',
  review_required: 'Draft awaiting founder review', approved: 'Report approved — delivery pending', delivered: 'Your reviewed report is ready'};
async function load() {
  try {const response = await fetch('/api/fmg-pilot', {cache: 'no-store'});const data = await response.json();if (!response.ok) throw Error(data.error);
    status.textContent = labels[data.status] || 'Contact support about your order.';
    document.getElementById('order-reference').textContent = `Order reference: ${data.id}`;
    form.hidden = !['paid_intake_pending', 'intake_received'].includes(data.status);
    if (data.report) {renderReport(document.getElementById('private-report'), data.report);document.getElementById('report-print').hidden = false;}
  } catch {status.textContent = 'Pilot checkout is not open. If you already have a test order, return in the same browser after configuration is confirmed. For general questions, contact FMG to Pharma.';}
}
form.addEventListener('submit', async event => {
  event.preventDefault();if (!form.reportValidity()) return;
  const button = form.querySelector('button');button.disabled = true;status.textContent = 'Saving your private intake…';
  const values = Object.fromEntries(new FormData(form));values.processingConsent = form.elements.processingConsent.checked;
  values.feedbackConsent = form.elements.feedbackConsent.checked;
  try {const response = await fetch('/api/fmg-pilot', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(values)});
    const data = await response.json();if (!response.ok) throw Error(data.error);await load();
  } catch (error) {status.textContent = error.message || 'Intake could not be saved. Please try again.';} finally {button.disabled = false;}
});
document.getElementById('report-print').addEventListener('click', () => window.print());
load();
