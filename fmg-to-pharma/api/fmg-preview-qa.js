// Same-origin responsive test surface. Never available on production.
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (process.env.VERCEL_ENV !== 'preview') return res.status(404).end();
  const widths = [320, 375, 390, 768];
  const width = widths.includes(Number(req.query.width)) ? Number(req.query.width) : 375;
  const routes = ['/', '/job-intelligence', '/reality-check'];
  const route = routes.includes(req.query.route) ? req.query.route : '/';
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(`<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Preview responsive QA</title><style>body{font:16px system-ui;background:#eee;margin:16px}nav{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px}iframe{display:block;background:white;border:1px solid #888;height:850px;max-width:100%}</style><h1>Preview responsive QA</h1><p>Same-origin browser viewport: ${width}px. No assessment submissions are part of this check.</p><nav>${routes.map(r => `<a href="?width=${width}&route=${encodeURIComponent(r)}">${r}</a>`).join('')}${widths.map(w => `<a href="?width=${w}&route=${encodeURIComponent(route)}">${w}px</a>`).join('')}</nav><iframe title="Responsive page" width="${width}" src="${route}"></iframe></html>`);
}
