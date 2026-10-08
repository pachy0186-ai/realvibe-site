# FMG to Pharma — Landing Page + Reality Check

This folder contains the isolated FMG to Pharma research-beta landing page and embedded screening assessment. It does not modify the existing RealVibe Agent AI homepage.

## What is included

- Mobile-first FMG to Pharma landing page
- 16-question Career Reality Check embedded directly in the page
- Transition-pattern results:
  - Clarify Your Industry Path
  - Break Into the Industry
  - Get Through the Hiring Filter
  - Convert Interviews Into Offers
  - Advance Inside Clinical Research
  - Residency Still Leads
  - Access Comes First
  - Outside current research scope
- Research-fit classification: `core`, `adjacent`, or `outside`
- Separate email consent and research-interview opt-in
- UTM/referrer capture for Facebook, Reddit, referrals, and other channels
- No predetermined paid product pitch
- Employer-neutral founder credibility language
- No immigration or sponsorship promises

## Response collection

A serverless endpoint is included at:

`/api/fmg-reality-check`

The endpoint writes to Supabase using two server-side environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Never expose the service-role key in browser code.

Run `fmg-to-pharma/supabase.sql` in the Supabase SQL editor to create the response table.

### Submission behavior

The assessment posts to `/api/fmg-reality-check` in production. In local browser-only previews, responses are stored on that device when no serverless endpoint is available. Keep the Supabase secret key server-side, and verify the health endpoint after any environment-variable or database change.

## Production deployment

FMG to Pharma is deployed as its own Vercel project at:

`https://fmg-to-pharma.vercel.app/`

The `fmg-to-pharma` directory now contains the static site, API routes, Vercel routing configuration, crawl files, and SEO setup notes needed to deploy it independently from the RealVibe site. Configure `SUPABASE_URL` and `SUPABASE_SECRET_KEY` (or the legacy `SUPABASE_SERVICE_ROLE_KEY`) only in the Vercel project's server-side environment variables.

## Research objective

The immediate goal is not to sell the old $47/$250/$997/$2,997 ladder. The page is meant to answer a narrower question first: among U.S.-based, work-authorized FMGs seriously considering clinical research/pharma as a durable path, what repeated problem is urgent enough to act on and eventually pay to solve?

