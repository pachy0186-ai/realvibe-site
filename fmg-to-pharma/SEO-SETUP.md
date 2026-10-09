# FMG to Pharma SEO and analytics setup

The site includes canonical URLs, structured data, `robots.txt`, `sitemap.xml`, and privacy-conscious conversion event hooks. No verification or analytics IDs are hard-coded because none were supplied.

## Google Search Console

1. Add `https://fmg-to-pharma.vercel.app/` as a URL-prefix property, or add the eventual custom domain as a Domain property.
2. Use the HTML-tag verification method if DNS verification is not available. Place the exact verification meta tag in the `<head>` of `index.html`; do not use a placeholder value.
3. Submit `https://fmg-to-pharma.vercel.app/sitemap.xml`.
4. Inspect `/`, `/reality-check`, `/guides/`, and the published cornerstone guide, then request indexing after the production deployment is verified.

## Bing Webmaster Tools

Import the verified Google Search Console property or use Bing's exact verification meta tag. Submit the same sitemap URL.

## GA4 or another analytics provider

The site does not load analytics by default. The browser emits these non-sensitive events through `window.dataLayer` and the `fmg:analytics` custom event:

- `reality_check_viewed`
- `reality_check_cta_clicked`
- `reality_check_started`
- `reality_check_completed`
- `strategy_call_clicked`
- `assessment_saved`
- `guide_hub_viewed`
- `article_viewed`

The completion event includes only the non-identifying result pattern and research-fit category. The save event includes only consent booleans. Assessment answers, names, and email addresses are not sent to the analytics layer.

When a GA4 Measurement ID is available, add the standard Google tag once to the shared site pages and guide template, then map the existing data-layer events in Google Tag Manager or dispatch matching GA4 events. Apply an appropriate consent configuration before enabling advertising features.

Guide pages use `/guides/guides.js`. Article-view events include only the published article slug. Reality Check CTA events include only page and source context; no names, email addresses, assessment answers, or query-string data are sent.

## Social preview image

The current metadata uses the existing square brand logo as a safe fallback. For stronger Facebook, LinkedIn, WhatsApp, and iMessage previews, create a purpose-designed 1200 × 630 image containing:

- the FMG to Pharma logo;
- the line “Career paths beyond residency for foreign medical graduates”;
- Patricia's approved founder portrait;
- generous safe margins for mobile crops;
- no claims about guaranteed employment, sponsorship, or salaries.

After approval, save it as `og-fmg-to-pharma.jpg`, update the `og:image` and `twitter:image` URLs in `index.html` and `reality-check.html`, and use `twitter:card=summary_large_image`.

## Domain migration

When a custom domain is connected, replace the `vercel.app` origin in canonical tags, Open Graph URLs, JSON-LD, `robots.txt`, and `sitemap.xml`. Keep one HTTPS hostname authoritative and configure a single permanent redirect from all alternate hostnames.
