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

### Important before public launch

The current landing page is intentionally safe in preview mode if no submission endpoint is configured: it stores the response only in that visitor's browser. Before driving public traffic, wire `SUBMIT_ENDPOINT` in `index.html` to `/api/fmg-reality-check` (or set `window.FMG_SUBMIT_ENDPOINT` before the assessment script), then verify one real test response appears in Supabase.

## Suggested URL

Deploy this folder at:

`/fmg-to-pharma/`

The existing RealVibe site can remain unchanged.

## Research objective

The immediate goal is not to sell the old $47/$250/$997/$2,997 ladder. The page is meant to answer a narrower question first: among U.S.-based, work-authorized FMGs seriously considering clinical research/pharma as a durable path, what repeated problem is urgent enough to act on and eventually pay to solve?
