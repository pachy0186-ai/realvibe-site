# Unified FMG to Pharma pilot — October 28, 2026

## Architecture

One repository and the existing `fmg-to-pharma` Vercel project serve the customer experience. Static HTML preserves existing URLs, assets, assessment, guides and social links. Node serverless functions add the recovered intelligence pipeline and sandbox order workflow. The original Next.js UI is archived, not embedded as a second application. The old prototype is unchanged pending an approved production cutover.

```
fmg-to-pharma/
  index.html, job-intelligence.html, sample-report.html, guides/, reality-check.html
  pilot-order.html, pilot-order.js       private customer session and reviewed report
  pilot-review.html, pilot-review.js     authenticated founder controls
  report-renderer.js                    text-only report rendering
  api/
    analyze.js                         reviewer-only, paid-complete-order analysis
    fmg-pilot-checkout.js               fixed $49/$99 Stripe test Checkout
    fmg-pilot-webhook.js                raw body + official Stripe signature verification
    fmg-pilot.js                        private status/intake
    fmg-pilot-review.js                 generation, approval, delivery, test notification controls
    fmg-reality-check.js, fmg-health.js  preserved existing lead functionality
  lib/
    intelligence-prompts.js             recovered prompts + package/grounding instructions
    intelligence-engine.js              two Responses calls + schema and evidence checks
    pilot-domain.js                     payment/intake/review/delivery rules
    pilot-store.js                      private Supabase store + optimistic concurrency
    pilot-mail.js                       leased/retryable test SMTP outbox
db/fmg-pilot-sandbox.sql                 additive server-only sandbox storage
docs/fmg-pilot/                          historical source, baseline, operational evidence
tests/                                 fictional QA inputs and provider doubles; outside site root
```

## Source and deployment findings

See `RECOVERY.md` for original source provenance. Both projects are associated with `pachy0186-ai/realvibe-site`, but the recovered prototype was uploaded by CLI and its route was absent from the 11 Git branch histories inspected. The original API, frontend and dependency versions were recovered from the authenticated deployment source viewer.

Main project dashboard: framework Other, root `fmg-to-pharma`, Node 24.x; build/install/output overrides off. Output defaults to `public` if present, otherwise the root; this site has no `public` directory. Production environment tracks `main`; all other unassigned branches are previews. Historical production was built from the older landing branch. An earlier default-root preview actually served the repository-root RealVibe Agent AI page. Correct root settings now exist, and every new preview is explicitly pinned to the FMG root. Do not promote the historical incorrect build or treat its old thumbnail as current source.

## What is enforced

- Closed by default; `VERCEL_ENV=production` is always rejected. Live Stripe keys and live webhook events are rejected. Sandbox checkout requires the reviewer credential and `.invalid` addresses. Candidate evidence must start `FICTIONAL QA CANDIDATE`. This is deliberately not an activated live-sales implementation.
- Server prices only: 4900/9900 cents USD. Browser return URLs do not mark orders paid. Official signed events plus a separately retrieved Session must match order and amount. Replay/concurrent events do not duplicate fulfillment messages.
- A random 256-bit browser capability is stored only as a hash in the database. The cookie is HttpOnly, Secure on HTTPS, SameSite=Lax; customer JSON excludes email, CV, staff notes, capability and unfinished drafts. Orders expire from application access after 30 days. Physical deletion is separate and is not falsely promised.
- New `fmg_pilot_sandbox_orders` table has RLS and no browser policies. All public/anon/authenticated grants are revoked; service role only. No existing leads, auth, policies or buckets are changed.
- Generation requires reviewer authentication plus paid/complete intake, consumes a durable attempt before calling, and allows two attempts/order. Two bounded model requests, no automatic model retries, at most three web tool calls. No fallback report exists.
- Public research receives company/JD, not the candidate CV. Synthesis receives CV plus dossier with provider `store:false`. Provider retention terms must still be approved before real data; `store:false` is not a zero-retention guarantee.
- Schema, returned-tool URL, exact JD excerpt and exact candidate excerpt checks produce blocking flags. These are screening controls, not proof that each source supports each claim. Founder review must verify every material fact, current vacancy, practical constraints and inference. No guessed hiring likelihood.
- Seven review checks, reviewer, note and optional measured review minutes are stored. Drafts remain inaccessible to the customer until separate approval AND delivery actions.
- All rendered model strings use `textContent`. Private pages are noindex/no-referrer. API responses are no-store/noindex. No private token appears in URL or browser storage.
- Five notification templates: payment, founder paid-order alert, intake, delivery, optional feedback. Capture is the default and sends nothing. SMTP test mode requires explicit approval and an address allowlist, TLS, finite timeouts, durable leases and retry delays. SMTP can duplicate after a crash between acceptance and persistence; it is not exactly-once email.

## Sandbox enablement after owner intervention

1. Configure `.env.example` names securely in the existing Vercel project, **preview branch only**. Never send credentials through chat. Generate a strong reviewer token of at least 32 characters. Use the exact preview origin; reject cross-origin requests. Keep live/production guards intact.
2. Connect an actual Stripe sandbox; only `sk_test_`/`rk_test_` credentials. Register `/api/fmg-pilot-webhook` for Checkout completion and asynchronous success/failure; store its signing secret. Do not change the $397 live link. Rebuild preview after environment changes.
3. Founder opens `/pilot-review`, creates a test checkout, completes it using official Stripe test instruments, and returns in the same browser. Confirm the signed webhook changes status before intake. Test duplicate/late events, declined payment and mismatched amount. No real card or charge.
4. Submit labeled fictional CRA/CTM intake in `/pilot-order`. Enable Gateway billing verification yourself first; enable `FMG_AI_ENABLED` only for the agreed validation budget. Run the benchmark below before permitting customer report generation.
5. Inspect order; generate; resolve or reject quality flags. There is no inline draft editor yet. A flagged draft cannot be approved; developer correction/revalidation or a controlled regeneration is required. If a function is interrupted while `researching`, a reviewer/operator must diagnose and recover the sandbox record; there is no automatic paid retry.
6. Record real founder review minutes and each of the seven checks. Approve, then make the approved report available. Reload the customer portal and verify only the delivered version appears.
7. Capture notification artifacts first. With separate authorization, configure existing approved SMTP/sender and specific test recipients, set `smtp-test` + approval, and invoke `send_test_notifications` via the authenticated review API. Test real inbox arrival, spam placement, reply handling and retry behavior before calling email ready. No scheduler is installed; founder invokes queue processing and the opted-in feedback action after seven days.

## Pilot expectations and present limitations

The website offers an interest/preview pathway, not live purchasing. When eventual checkout is approved, payment should start a one-opportunity research service, not employment placement or unlimited coaching. Founder confirms turnaround only after complete intake and capacity check; no guaranteed delivery SLA is currently approved. $397 remains separate by inquiry. Audience includes clinical research professionals who are not FMGs; FMG/IMG resources remain visible and secondary.

Current private access is bound to the purchase browser/device for 30 days. Email links alone do not restore access; there is no account login or cross-device recovery. This must be resolved or explicitly agreed as a supervised tiny-pilot limitation before paid launch. No automated retention purge, refund workflow, delivery scheduler, inline report editor, full queue dashboard, or live checkout exists. Founder monitoring is required; do not call this unattended fulfillment.

## Security verification and existing advisories

Rollback-only SQL verified insert, compare-and-set update and rejection of stale writes. After rollback: 22 existing leads, zero sandbox rows. Service-role-only grants were inspected. Adapter behavior is covered locally, but deployed REST writes have not been exercised with a configured sandbox order.

Supabase still reports informational no-policy notices for the intentionally server-only assessment and sandbox tables. Existing `public.rls_auto_enable()` SECURITY DEFINER execute warnings for anon/authenticated remain; the routine is an event trigger. They predate this migration and were not changed to preserve existing behavior. Review its grants separately before launch. [Advisory explanation](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable).

## Cutover and rollback — approval required

Do not promote this preview as a live checkout system. First pass real CRA/CTM generation and blinded baseline review, Stripe sandbox and SMTP delivery tests, retention/privacy/turnaround approval, and commercial hosting approval. Add live mode only in a separately reviewed change; this code rejects production and real data intentionally.

After approval, merge the reviewed feature stack into the chosen production source, build a staged production deployment with the FMG root and production environment, verify it without assigning traffic, then approve assigning the production alias. Keep payments separately disabled until final go-live approval. Recheck Reality Check/health, URLs, guides/videos/socials, private access and the first supervised order. Existing production pointer recorded before cutover: `dpl_FJo3q6e2cMrgcFDpaZhBZ6z1vvA6` (historically incorrect site). Preserve a known-good FMG-only build for rollback as well; blindly restoring an already wrong historical site is not a satisfactory customer rollback.

If problems arise, close new checkout, preserve paid order records, disable new generation, and restore the approved last-known-good FMG deployment. Never drop the additive order table to roll back code. Reconcile outstanding payments manually. Retire the old prototype only with explicit owner approval after unified production verification; archive its recovered source first.
