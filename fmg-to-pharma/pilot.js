/* Pilot instrumentation has no external destination until explicitly configured. */
(() => {
  'use strict';
  const choiceKey = 'fmg-pilot-analytics-choice';
  const attributionKey = 'fmg-pilot-attribution';
  const blocked = () => navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';
  const read = (storage, key) => { try { return storage.getItem(key); } catch { return null; } };
  const put = (storage, key, value) => { try { storage.setItem(key, value); } catch { /* storage is optional */ } };
  const remove = (storage, key) => { try { storage.removeItem(key); } catch { /* storage is optional */ } };
  const approved = {
    utm_source: ['youtube', 'linkedin', 'referral', 'direct'],
    utm_medium: ['organic', 'social', 'referral', 'email'],
    utm_campaign: ['pilot_validation', 'sample_report'],
  };
  const packages = ['application', 'interview'];
  const pages = ['/', '/job-intelligence', '/sample-report', '/how-it-works', '/about', '/faq', '/contact', '/privacy'];
  const route = pages.includes(location.pathname) ? location.pathname : 'other';
  const events = new Set(['landing_page_viewed', 'sample_report_viewed', 'sample_report_clicked',
    'product_page_viewed', 'product_engaged', 'pilot_packages_clicked', 'pilot_inquiry_clicked', 'pilot_email_clicked']);
  const storage = name => { try { return window[name]; } catch { return null; } };
  const persistent = storage('localStorage'), session = storage('sessionStorage');
  let consent = read(persistent, choiceKey) === 'on' && !blocked();
  let attribution = {};
  function captureAttribution() {
    try { attribution = JSON.parse(read(session, attributionKey) || '{}'); } catch { attribution = {}; }
    if (!attribution || typeof attribution !== 'object' || Array.isArray(attribution)) attribution = {};
    // Rebuild from a fixed vocabulary even when stored data has been modified.
    attribution = Object.fromEntries(Object.entries(approved).flatMap(([key, values]) =>
      values.includes(attribution[key]) ? [[key, attribution[key]]] : []));
    const query = new URLSearchParams(location.search);
    for (const [key, values] of Object.entries(approved)) {
      const value = query.get(key);
      if (!(key in attribution) && values.includes(value)) attribution[key] = value;
    }
    put(session, attributionKey, JSON.stringify(attribution));
  }
  function track(event, detail = {}) {
    if (!consent || blocked() || !events.has(event)) return;
    const payload = { event, page_type: route, ...attribution };
    if (packages.includes(detail.package)) payload.package = detail.package;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    // An owner-reviewed adapter may subscribe. No network request is made here.
    window.dispatchEvent(new CustomEvent('fmg-pilot-event', { detail: payload }));
  }
  function view() {
    if (route === '/') track('landing_page_viewed');
    if (route === '/sample-report') track('sample_report_viewed');
    if (route === '/job-intelligence') track('product_page_viewed');
  }
  if (consent) { captureAttribution(); view(); }
  else remove(session, attributionKey);
  document.querySelectorAll('[data-event]').forEach(link => link.addEventListener('click', () =>
    track(link.dataset.event, { package: link.dataset.package })));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        track('product_engaged', { package: entry.target.dataset.package });
        // Observe again after a consent change; no false engagement while disabled.
        if (consent && !blocked()) observer.unobserve(entry.target);
      }
    }, { threshold: .5 });
    document.querySelectorAll('article[data-package]').forEach(el => observer.observe(el));
  }
  const status = document.getElementById('analytics-status');
  function showChoice() {
    document.querySelectorAll('[data-analytics-choice]').forEach(button =>
      button.setAttribute('aria-pressed', String(button.dataset.analyticsChoice === (consent ? 'on' : 'off'))));
    if (status) status.textContent = blocked()
      ? 'Your browser privacy preference keeps optional pilot analytics off.'
      : consent ? 'Optional pilot events are allowed. No external destination is configured.'
        : 'Optional pilot analytics are off.';
  }
  document.querySelectorAll('[data-analytics-choice]').forEach(button => button.addEventListener('click', () => {
    consent = button.dataset.analyticsChoice === 'on' && !blocked();
    put(persistent, choiceKey, consent ? 'on' : 'off');
    if (consent) { captureAttribution(); view(); }
    else { attribution = {}; remove(session, attributionKey); }
    showChoice();
  }));
  showChoice();
  document.getElementById('print-report')?.addEventListener('click', () => window.print());
  const selectedPackage = new URLSearchParams(location.search).get('package');
  const email = document.getElementById('pilot-email');
  if (email && packages.includes(selectedPackage)) {
    const subject = `${selectedPackage === 'application' ? 'Application' : 'Interview'} Intelligence pilot inquiry`;
    email.href = `mailto:fmgtopharma@gmail.com?subject=${encodeURIComponent(subject)}`;
    email.dataset.package = selectedPackage;
  }
})();
