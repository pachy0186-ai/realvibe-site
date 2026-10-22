# FMG to Pharma guide publishing template

Use the published cornerstone guide as the semantic HTML template for future guides. This file is documentation only and is not deployed.

## Required page inputs

- Plain-language guide title and one H1
- Clean lowercase slug under `/guides/`
- Unique SEO title (aim for about 50–60 characters when practical)
- Unique meta description that accurately previews the page
- Canonical URL using the production origin
- Short deck that answers the reader's problem without repeating the title
- Patricia byline and approved credentials: `MD, MSHS, CCRP`
- Factual publication date; add an updated date only after a substantive revision
- Reading time calculated from visible article words at 225 words per minute, rounded up
- One primary search intent and a clear reader outcome
- One contextual Reality Check CTA where it helps the reader decide what to do next

## Reusable structure

1. Site header and breadcrumb: Home → Guides → current guide
2. Article hero: category, H1, deck, author, date, reading time
3. Direct answer in the opening paragraphs
4. Optional short-answer callout
5. Logical H2/H3 sections based on the reader's questions
6. Optional comparison table when it clarifies differences
7. Patricia perspective box only when first-hand experience genuinely adds value
8. One Reality Check CTA with clear limitations
9. Useful FAQ content when the page supports it
10. Official references for licensure, regulatory, legal, or other time-sensitive claims
11. Related-reading component containing published links only
12. Reusable Patricia author box and site footer

## Structured data

Each guide should include an `@graph` with:

- `Organization` using `https://fmg-to-pharma.vercel.app/#organization`
- `Person` using `https://fmg-to-pharma.vercel.app/#patricia-mieses`
- `Article` with factual dates, headline, description, author, publisher, and main page
- `WebPage` with the canonical URL
- `BreadcrumbList` matching the visible breadcrumb

Do not add FAQ structured data simply because a visible FAQ exists. Use schema only when it accurately describes visible content and supports a durable search feature.

## Analytics

The shared `/guides/guides.js` file emits privacy-conscious events through `window.dataLayer` and `fmg:analytics`:

- `guide_hub_viewed`
- `article_viewed` with `article_slug`
- `reality_check_cta_clicked` with non-sensitive page and source context

Do not send names, email addresses, assessment answers, or URL query content to the analytics layer.

## Publishing checklist

- Add a real card to `/guides/`; never publish a placeholder card or dead link.
- Add the canonical clean URL to `sitemap.xml` with the actual last-modified date.
- Add a `.html` redirect and clean-route rewrite to `vercel.json`.
- Validate one H1, heading order, metadata uniqueness, canonical, indexability, JSON-LD parsing, internal links, and breadcrumb links.
- Test at desktop and mobile widths with no console errors, failed requests, or horizontal overflow.
- Test the Reality Check CTA and confirm the assessment itself has not changed.
- Use the existing logo as a safe social fallback until an approved 1200 × 630 guide image exists.
