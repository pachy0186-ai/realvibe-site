# FMG to Pharma — AI Gateway free-tier validation
October 28, 2026. This addendum supersedes the earlier blanket billing blocker. **Free-tier access is verified; paid-report quality is not ready.**

## Decision
No purchased credits or new API key are needed for the initial development tests. Use `openai/gpt-5-mini` for research and synthesis in the branch-scoped `free-credit-validation` profile. Its successful requests prove compatibility with native web search and the current Responses pipeline. It supports further development testing; report quality is not yet suitable for sale.

## Exact models and eligibility
The live Vercel model directory's “Free AI Gateway Credit” column was inspected, including with the free filter removed.

| Model | Engine role | Free credit eligible |
|---|---|---|
| `openai/gpt-5.4-mini` | Recovered original research default | No |
| `openai/gpt-5.4-fast` | Recovered original synthesis default | No |
| `openai/gpt-5-mini` | Both stages in development validation | Yes; actual successful calls |
| `openai/gpt-5.4-nano` | Reviewed alternative, not tested | Yes |

Evidence: `FMG_Gateway_Model_Eligibility.json` and `FMG_Gateway_Eligibility.png`.
Sources: [Vercel model directory](https://vercel.com/ai-gateway/models?freeTier=true), [Gateway pricing](https://vercel.com/docs/ai-gateway/pricing). Eligibility may change; recheck before changing models. Buying credits moves the account to the paid tier and ends the monthly free-credit allowance under the current published terms.

## Authentication and the earlier 403
The all-projects team API-key inventory showed **No API Keys**. Neither FMG project's manual environment inventory contained `AI_GATEWAY_API_KEY`. No credential was created, copied or disclosed.

The deployed preview build automatically received `VERCEL_OIDC_TOKEN`. The finite audit explicitly used that identity, with the API-key field empty. Gateway Logs record HTTP 200 and authentication “fmg-to-pharma.” Vercel documents [automatic OIDC authentication](https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc).

The historical prototype 403 explicitly requested a valid card/account verification. That was the reported rejection at the time; it should not be retroactively renamed a missing-key error. The original two models also fail today's independent free-eligibility check. Current GPT-5 mini requests succeed without purchasing credits or adding a key. We cannot infer what account state changed between the old rejection and today's success. No card-verification step is currently demonstrated as necessary for the tested free-model path.

The customer-facing generation/order routes remain deliberately closed. Their configured 503 is a separate application launch gate, not an AI Gateway billing failure.

## Actual live validation
Preview: [FMG to Pharma development preview](https://fmg-to-pharma-4m18t09qk-pachy0186-ais-projects.vercel.app/)
Deployment: `dpl_4STCCwJwszxm6DSFCjwLtPnhHG7m`; state READY; target staging/preview.
Source commit: `8244ba4c1bae765706ef30b34081e47256cb55d2`.
Branch: `codex/fmg-pilot-operations-validation`; draft PR [#9](https://github.com/pachy0186-ai/realvibe-site/pull/9), based on `codex/fmg-2-intelligence-validation`.

Only fictional candidates and public job-description test paraphrases were submitted. No lead, customer résumé, payment or email was used. The audit made one smoke call and two stages per case. Actual outputs are retained in `FMG_Free_Tier_Live_Validation.json` and the branded `FMG_Free_Tier_Test_Drafts.html`. The HTML is explicitly an unapproved QA artifact, not a polished sample or a customer report.

| Check | CRA Application | CTM Interview |
|---|---|---|
| Research and synthesis | Both completed | Both completed |
| Independently recorded research URLs | 28 | 29 |
| Structured draft | Generated | Generated; seven practice prompts |
| Duration | 61.2 seconds | 67.5 seconds |
| Observed two-call Gateway cost | $0.0258 | $0.0373 |
| Automated quality flags | Target changed; JD excerpts not exact | Target changed |
| Customer approval | Withheld | Withheld |

URL counts represent tool-returned links, not a claim that every page or sentence was independently verified. An earlier CTM run completed model calls but failed schema validation. A strict Responses JSON schema and consistent eight-question limit resolved the structural failure in the final run. They did not resolve semantic accuracy.

## Report-quality findings
Useful content includes distinguishing CRA monitoring from site CRC work, identifying travel/work-authorization unknowns, and identifying CTM tenure and budget-ownership gaps. Application output correctly omits the interview deliverable; CTM practice prompts are labeled inference.

Material defects remain:

- Both drafts changed the exact requested target labels. CRA requirement excerpts also failed the exact-substring validator.
- The CRA résumé suggestions include work authorization and system experience that the candidate did not supply. These suggestions must not be copied.
- CTM's summary implies start-up support absent from the supplied CV. Some narrative blurs preferred global/end-to-end experience with mandatory criteria.
- A 404 CTM source still appears as verified public evidence for a substantive claim. The dossier notes the broken posting, but the synthesis does not consistently honor that uncertainty. The same URL independently returned 404 during review.
- Research missed ICON's linked applicant AI policy and labeled it unknown. The [policy](https://careers.iconplc.com/ai-usage-policy-for-job-applicants) permits preparation/research while prohibiting misrepresentation, unedited AI answers, AI assessment completion and live interview assistance.
- The [Microsoft partnership announcement](https://investor.iconplc.com/news-releases/news-release-details/icon-selects-microsoft-preferred-technology-partner-power-ai) supports the partnership fact; inferred effects on this specific hire's workload or technology expectations remain interpretation.

The existing gate refuses approval and delivery while quality flags remain. No report was approved or sent. Strong generic-ChatGPT baseline comparison remains **not run**; meaningful superiority is not established. Current drafts are too long and unreliable in places for a credible paid pilot.

Before recommending launch: constrain exact target/excerpts, ground every résumé and interview claim, distinguish requirements from preferences, validate source availability and claim support, retrieve applicant policy, then rerun both cases and the matched baseline. Buying a more expensive model alone is not a demonstrated solution.

## Credit usage and safeguards
Final visible dashboard snapshot: **$4.39 Free Credit**, **$0.61 used**, **27 requests**. Figures are rounded and dashboard ingestion can lag. The successful final pair consumed about $0.0631 plus a $0.000041 smoke request. These are two observations, not a production cost forecast; research depth, model reasoning, retries, web tools and rate limits vary. Founder review time is excluded.

The first audit unexpectedly ran repeatedly because Vercel invokes package build hooks for multiple functions. I canceled that deployment. A cross-builder lock now permits one audit per deployment; eight concurrent callers are tested and deployed logs confirm reused results rather than repeated model calls. The first repeated run consumed part of the free allowance; no purchased credits were used. Subsequent runs were bounded.

The branch-specific `FMG_GATEWAY_AUDIT_MODE` is now **off** for future builds. `FMG_AI_PROFILE=free-credit-validation` remains preview/branch-only. No paid-model fallback is permitted in that profile. Customer AI generation, payments and communications were not activated. No production settings, production publish, old-project settings, or lead data changed.

## Readiness

| Component | Status | Evidence or next requirement |
|---|---|---|
| Free-model eligibility and OIDC | Verified Ready | Actual 200 responses; no manual key |
| CRA/CTM structured generation | Verified Ready | Both real drafts retained |
| Report factual quality and citations | Blocked | Issues above; founder approval withheld |
| Generic baseline comparison | Not Implemented | No comparative superiority claim |
| Error classification and audit concurrency | Verified Ready | 20 automated tests pass; deployed single-run logs |
| Website regression | Verified Ready within tested scope | New preview homepage/logo and DB health verified; prior full layout/link evidence remains applicable to unchanged pages |
| Stripe test checkout and email delivery | Implemented but Unverified | Prior provider-double tests only; no remote payment/email validation this turn |
| Live paid launch | Blocked | Quality fixes, operational validation and explicit launch approvals still required |

No purchase, card entry or payment activation is requested. Production publishing, live payments, customer communications and retirement of the old project still require the user's explicit approval after the remaining validation.

