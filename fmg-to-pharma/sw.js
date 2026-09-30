self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.endsWith('/fmg-to-pharma/index.html')) return;

  event.respondWith((async () => {
    const response = await fetch(event.request);
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || !contentType.includes('text/html')) return response;

    let html = await response.text();
    html = html.replace(
      'const VERSION="2.1-landing-research-beta";const SUBMIT_ENDPOINT=window.FMG_SUBMIT_ENDPOINT||"";',
      'const VERSION="2.1-landing-research-beta";const SUBMIT_ENDPOINT=window.FMG_SUBMIT_ENDPOINT||"/api/fmg-reality-check";'
    );

    const headers = new Headers(response.headers);
    headers.delete('content-length');
    headers.set('cache-control', 'no-store');
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  })());
});
