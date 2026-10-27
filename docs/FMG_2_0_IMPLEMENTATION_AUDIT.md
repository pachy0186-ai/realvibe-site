# FMG to Pharma 2.0 implementation and pilot audit

Date: October 27, 2026. Scope: development branch only; no production release, payment activation, database schema change, or lead-record writes.

## Deployment configuration

- Repository: `pachy0186-ai/realvibe-site` (GitHub connection verified through Vercel).
- Team: `pachy0186-ais-projects`.
- Project: `fmg-to-pharma` / `prj_31JLlwhMfVKzRJQlNPsDYXxPUYYS`.
- Development branch: `codex/fmg-2-intelligence-validation`.
- Required root directory: `fmg-to-pharma`. Set through the connected Vercel account; subsequent default-setting Preview deployments rendered the FMG site without a per-deployment root override.
- Production branch setting: NOT independently verified. The latest production deployment is from `codex/fmg-to-pharma-landing`, commit `95c7fff0be975b92dcb3ef24b4a8f8f2a6b748e1`. A deployed source branch is evidence of that deployment, not proof of the current automatic production-branch setting. The connector omits this setting; dashboard authentication is still required.
- The exact development branch has automatic Git deployments disabled in both Vercel config files. Manual Preview API deployments remain available. This is an intentional review hold, not a production release configuration. Do not remove it until the production branch has been independently verified.

## RealVibe thumbnail diagnosis

A Preview built with the project's original defaults actually served the repository-root RealVibe Agent AI page. This was reproduced in the browser, not inferred from a thumbnail. The FMG site lives in a subdirectory. An explicit FMG root override produced the correct site; the project root was then corrected and default-setting Previews confirmed the fix. Existing deployment URLs remain immutable historical builds and can retain their old thumbnails. Do not promote the incorrect build.

## Fixes committed

1. Removed the prominent legacy $397 sales section and its conflicting application promises from the homepage. Kept the exploratory Reality Check and its existing backend/data contract intact.
2. Added canonical `/job-intelligence` routing and redirect from the `.html` URL.
3. Linked Job Intelligence directly to the standalone Reality Check and adjusted narrow-screen navigation wrapping.
4. Added homepage intelligence CTA and product-page framework/view events to the existing dataLayer pattern. These events do not establish an analytics destination or a purchase funnel.
5. Fixed the invalid `IntersectionObserver` root margin (`700px 0` -> `700px 0px`) that threw a browser exception and prevented the homepage's embedded assessment from loading.
6. Added a preview-only same-origin responsive QA endpoint. It returns 404 outside `VERCEL_ENV=preview` and does not write data.

## Verification evidence

Preview: https://fmg-to-pharma-1pv2di7ct-pachy0186-ais-projects.vercel.app

Source commit for this runtime build: `ef6c5593a71e160ea0e53a83069d8c1588ca038e`.

- Homepage and Job Intelligence content and navigation inspected in the browser. Legacy `.html` product URL resolves correctly; sample framework anchor works.
- Same-origin iframe viewport tests at nominal widths 320, 375, 390 and 768px for homepage, product page and Reality Check showed no horizontal document overflow. Scrollbar-adjusted content widths were 305, 360, 375 and 753px. This is responsive layout testing, not physical-device or touch testing. Rechecked the final lazy-load fix at nominal 390px.
- Standalone Reality Check completed all 16 questions with fictional test answers and returned the expected `Advance Inside Clinical Research` result. Single-select navigation, multiselect Continue and required free-text validation worked. Did not click Save or book a call.
- Final homepage iframe loaded `/reality-check?embedded=1` and displayed the Start button; the previous IntersectionObserver exception was absent on that build.
- `/privacy`, `/guides/` and the Beyond CRC/CRA guide returned HTTP 200.
- `/api/fmg-health` returned HTTP 200 with `configured`, `databaseReachable`, and `tableReady` true. It performs a read-only check; it does not return lead contents.
- GET `/api/fmg-reality-check` returned the expected 405. No live POST submission was performed, so database-write success is deliberately not claimed.
- Production deployment listing remained headed by the pre-existing `dpl_FJo3q6e2cMrgcFDpaZhBZ6z1vvA6`. No production deployment was created or promoted.
- Page-error inspection also showed unrelated browser-extension metadata errors, distinguished from application errors.

## Opportunity Intelligence prototype audit

Project: `fmg-opportunity-intelligence` / `prj_ikQrfPfAMm2KDDEYY9lz1sWp7QhY`.

Observed deployment: `dpl_83yKhKH6dBsKj4PAmnKcQcEV9KmR`, Next.js, deployment protection enabled for all environments. Protection was not disabled.

Verified:

- Connected-account fetch returned the lab interface: company, role, job URL, pasted CV text, pasted full JD, and Run Deep Opportunity Analysis.
- The interface calls itself an internal validation prototype and claims live company research, evidence-bound candidate analysis, life-sciences judgment and an adversarial assessment.
- The source tree contains `app/page.js`, `app/api/analyze`, styles, layout and a minimal Next.js/React package. The visible client source submits JSON to `/api/analyze` and uses timed progress messages. Timed progress wording is not proof that the named stages actually ran.
- Pasted CV/JD character thresholds gate the UI. These are convenience checks, not evidence of server-side validation or abuse control.
- The interface says pasted material is not persisted. This wording does not establish upstream model-provider retention, request logging, deletion behavior or data-processing terms.
- This prototype's source is not present on the audited development branch. Its deployment metadata has no Git commit provenance. Its Vercel source tree is available in part, but the connector truncates deep entries and longer file contents. Full backend source was not recovered.

Not verified; do not represent as passed:

- Retrieval implementation, source freshness, citation-to-claim accuracy and how conflicting company evidence is handled.
- Model/prompt sequence, genuine independence of the adversarial stage, output schema enforcement and report completeness.
- Authentication within the app, payload limits, rate limits, prompt-injection treatment, safe URL retrieval and protection of secrets/logs.
- Model/search cost per report, timeout/retry behavior, duplicate-run handling and failure recovery.
- Actual report quality, employer-specific interview-process evidence, privacy claims, report export and operational delivery tracking.

No model analysis was run, no private CV was submitted, and no paid-pilot readiness is inferred from interface copy.

## Minimum work for a credible paid pilot, in priority order

1. Recover the full prototype backend and put its exact deployable source under version control. Verify API validation, authentication, safe URL handling, secret handling and CV/JD log/retention behavior. Keep it founder-operated behind deployment protection for the pilot; customer accounts and a public autonomous app are not prerequisites.
2. Produce one complete sanitized real-company/real-role example. Include dated primary-source company facts, exact JD evidence, a CV-to-requirement matrix, explicit missing evidence, verified interview-process facts where available, clearly labeled inferred themes, and prioritized candidate actions. A report outline is not a sample deliverable.
3. Turn clinical-operations judgment into a review rubric: sponsor/CRO/site context, CRA vs Senior CRA vs CTM scope, monitoring ownership, vendor oversight, study scale, inspection readiness, therapeutic-area relevance and examples the candidate can truthfully defend. Show why each recommendation follows from evidence. Do not claim a known interview process if the sources do not support it.
4. Blind-compare at least three representative reports against a strong generic-AI baseline using the same inputs. Founder reviews every material factual claim and candidate assertion. Fix material errors before fulfillment. This is an initial quality gate, not proof of broad superiority.
5. Establish minimal secure intake and fulfillment: explicit CV/model-processing consent, redaction guidance, accepted inputs, access controls, a defined retention/deletion practice, human-review status, delivery deadline, revision/refund scope and an order/reference ID. A secure existing file-sharing workflow plus manual report delivery can suffice; a new upload portal is optional. Keep new pilot records separate from existing Reality Check leads unless a later change is approved.
6. Measure a full dry run: research/model cost, elapsed time, founder minutes, source corrections and failure handling. Add hard per-run limits and an actionable failure path before any public generation endpoint. Record these privately without raw CVs in logs.
7. After the sample, quality and fulfillment gates pass, prepare the $49/$99 pilot terms and checkout for separate owner approval. Payment activation remains blocked. Then test genuine paid demand with a small qualified cohort; do not infer willingness to pay from clicks or free-call interest.

Suggested first experiment: one CRA, one Senior CRA and one CTM report, founder-reviewed, with anonymized evidence matrices and explicit fact/inference labels. Avoid building subscriptions, customer dashboards, automated negotiation or multi-company tracking before these reports demonstrate a useful advantage.

## Remaining release holds

- Finish dashboard authentication and read the actual production branch setting.
- Complete the backend audit and quality/cost dry run; verify privacy and failure behavior.
- Publish a genuine source-checked sample and finalize scope/turnaround/refund/data-handling terms.
- The secondary Reality Check still offers the pre-existing optional complimentary roadmap call in eligible results. It is not a purchase prerequisite; preserve or revise this separate legacy pathway deliberately before a production 2.0 launch.
- Obtain owner approval before production publishing, payment activation or any changes to existing lead records.
