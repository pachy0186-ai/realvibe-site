# FMG to Pharma — Product completion and cross-role acceptance gate
Updated: November 13, 2026. PRIVATE. Development branch only.

## Shared owner-independent execution
**CRO role:** confirm target buyer, scope, pricing economics, source quality, real deliverable existence, legal/technical launch gates and evidence of buying behavior. Review copywriter changes on the next run and resolve factual/commercial conflicts.

**Copywriter/editor role:** create and revise original buyer-facing guide/workbook copy, exercise examples, product pages and email language. Check the latest CRO review on the development branch before editing; record precise changes and unresolved claims.

**Integration/QA role (performed by whichever scheduled role has access):** verify links, actual files, page counts, PDF extraction/rendering, mobile navigation, secure payment fulfillment and accurate release status. No role may imply it has communicated with another agent in real time.

## Verified asset inventory
- Uploaded launch package includes a 5-page free-sample PDF (site/assets/free-sample-preview.pdf), HTML toolkit page, branding asset and marketing/governance drafts.
- The complete paid PDFs are **not in that uploaded ZIP**. A November 12 editorial inspection in the project conversation reported verified original PDFs of 21 pages (guide), 18 pages (workbook), and 5 pages (sample), with an editorial QA PDF and ZIP package. The repository deployment does not yet contain these original paid PDFs. The next integration run must retrieve the original files and independently verify checksums/page counts before attaching them to fulfillment. Absence from the launch ZIP does **not** mean the products were never created.
- Current website Day 1 HTML excerpt is not the full PDF sample. Never conflate them.
- Existing public homepage previously promoted obsolete CRA/CTM pilot. Development branch homepage, FAQ and Contact were revised; remaining pages need audit.
- No verified payment-to-download end-to-end test. No verified product sales.

## Product acceptance checklist
- [x] Recover and independently inspect the **existing original 21-page guide PDF** (retained; corrected reference links in final edition).
- [x] Recover and independently inspect the **existing original 18-page workbook PDF**; it remains printable/PDF-annotation-friendly, not an interactive form.
- [x] Ensure day-by-day sequence: role families; hard eligibility gates; posting evidence; experience inventory; truthful résumé/LinkedIn; networking/interview; 30-day plan.
- [x] Verify included fictional job-posting example and five-factor role-fit planning rubric; no hiring-probability claim.
- [x] Recheck principal career, certification, GCP, ATS and AI recruitment claims against current official sources, November 13, 2026; no employer hiring guarantees.
- [x] Export final 21/18/5-page PDFs; verify extraction, pages, hyperlinks, branding and selected rendered layout.
- [ ] Connect the actual five-page PDF sample and verify successful download.
- [ ] Confirm paid PDF secure delivery is restricted to verified orders.
- [ ] Test successful payment, failed payment, refunds, duplicate webhook, email delivery and support path in test mode.
- [ ] Review privacy, taxes, commercial hosting eligibility, refunds and accessibility.
- [ ] CRO factual/commercial QA PASS + Editor copyright/style QA PASS + technical QA PASS.
- [ ] Owner approval before production, live checkout, spend or outreach.

## Editorial scope and claims
Buyer: U.S.-based foreign-trained physicians with little/no U.S. research operations experience exploring first research role. Promise: a practical seven-session plan and application assets, **not a job**. Proposed $49 one-time, not active. Self-paced, no coaching or job placement. Never sell absent verified full PDFs.

## Current blocking priority
Editorial file recovery and version reconciliation are **RESOLVED**. The next task is technical: provide accessible *public* delivery of only the free corrected five-page sample, keep paid guide/workbook files private, and test Stripe payment-verified delivery and terms. No extra manuscript generation. Review the November 13 final private Library folder and PDF hashes below before using any file.

## Release decision
**EDITORIAL SOURCE READY / COMMERCIAL RELEASE HOLD.** The three final PDFs exist and are privately archived. Website preview is READY; the five-page sample is readable as an integrated HTML excerpt, but PDF binary download is not yet hosted. Paid delivery, commerce-eligible hosting, tax/refund/support terms, payment test and owner launch approval remain required.

## CRO handoff — November 13, 2026
- **Concrete correction:** reconciled stale repository checklist against the November 12 original-PDF inspection and removed instructions to recreate completed manuscripts.
- **Editorial issue:** site sample page truthfully says the five-page PDF is not linked, but `site/assets/free-sample-preview.pdf` is listed in the launch-package inventory. Next technical pass must inspect that actual asset, confirm it matches the original five-page branded preview, then add a working download link. Do not assume identical files from names alone.
- **Claims QA:** the 7 days are self-paced learning sessions, not a hiring timeline; the workbook is not interactive-fillable. Proposed $49 price is not a live checkout.
- **Independent review:** no new final-PDF byte-level review performed in this run; the prior editorial report is evidence of a past inspection, not proof that corrections have been applied.
- **Release decision:** HOLD until the original PDFs are recovered into an editable workspace, the changes are verified, sample download works, and test-mode checkout/delivery, legal terms and owner approval pass.

## Editorial run — November 13, 2026, 04:00 ET
- Located the exact original `(1).pdf` files in the FMG to Pharma Project Library (21-page guide, 18-page workbook, 5-page sample) by metadata; additionally discovered `(2).pdf` variants. Do not assume newer suffix means editorial approval or identical content.
- Attempted raw-byte materialization for all three original `(1)` PDFs using their actual Library file IDs. **All three failed** with `This Project file does not have an authorized raw-byte materialization path.` This is a persistent access-control blocker, not evidence that PDFs are absent. No PDF edits or independent page-by-page verification occurred in this run.
- Reviewed dev-branch `toolkit-sample.html`: clearly labels selected Days 1/4 excerpts, prelaunch status, no fillable workbook promise, and no live checkout. No change necessary to this page based on accessible source.
- Editorial decision: **HOLD**. Existing November 12 report is not a substitute for access to PDF bytes. Do not issue an internal pass or claim corrected PDFs.
- Next authorized work: obtain accessible raw PDF assets through supported project-file access, verify `(1)` versus `(2)` versions, then make only page-specific corrections. Keep public publication and payments owner-gated.


## FINAL EDITORIAL AND SITE INTEGRATION UPDATE — November 13, 2026 (supersedes obsolete access blockers above)

- **Source-of-truth:** Accessible branded (1) original PDFs; (1) and (2) full extracted text matches for all three; exact (2) bytes remain inaccessible. Do not regenerate manuscripts.
- **Final private Library folder:** `/FMG to Pharma/Final Editorial 2026-11-13/` with three final PDFs and final editorial QA.
- **Final guide:** `FMG_to_Pharma_7_Day_Career_Launch_Guide_FINAL_2026-11-13.pdf` — 21 pages, SHA-256 `bbbd2c040dbbfed22ebc3c3f20ccb9259c9b90d0bbc0c1048fcd816a4401e4ac`. Verified official SOCRA link corrected and Indeed help link localized.
- **Final workbook:** `FMG_to_Pharma_Workbook_and_Templates_FINAL_2026-11-13.pdf` — 18 pages, SHA-256 `b44388c79c26b2c40455e8c2c8c65223fc7fa60aef7205536fc7e7ae9ba3128f`. Unchanged body; printable/PDF annotation-friendly.
- **Final free sample:** `FMG_to_Pharma_Free_Sample_FINAL_2026-11-13.pdf` — 5 pages, SHA-256 `b18bfa79a4ddce5436e524fa2c371909ea75d91699ae180589c9cd19fa7ff060`. Page-4 label collision fixed.
- **Site changes:** Branch `codex/fmg-toolkit-final-editorial-20261113` updates homepage, toolkit, complete sample as readable HTML, founder, seven-day process, FAQ, free-guides nav and legacy pilot/archive notices. Legacy operational pilot code and leads preserved. Preview Vercel deployment `dpl_Dtx8cLvGeEF7tNbBTiAJqGH2J4iZ` built READY from commit `2241e993c566fd21513a2b906be871f93572fcb1`.
- **NO CLAIM OF PUBLIC PDF EMBEDDING:** Web preview provides inline HTML sample, not a live free sample PDF download. Neither paid PDF is accessible through a public URL. GitHub and Vercel changes are preview-only; production unchanged.
- **Release gates:** public sample binary upload/test; commercially permitted hosting (Hobby is noncommercial); authenticated test-mode Stripe purchase + webhook + protected PDF downloads; privacy/refund/tax/support language; accessibility/mobile browser QA; specific owner approval before live payments or spend.
- **Current decision:** Editorial candidate READY. Public commercial release remains **HOLD**, for concrete technical/compliance reasons—not content access.


## November 14, 2026 — Hosted checkout and fulfillment development (supersedes earlier payment assumptions)
- Development branch: `codex/fmg-stripe-fulfillment-preview-20261114`. Separate from production.
- New isolated private Supabase Storage bucket `fmg-paid-toolkit`, `public=false`, created in existing free FMG project. No objects yet; no existing assessment records changed.
- Implemented **gated** Stripe-hosted Payment Link redirect, post-payment order/price verification, refunded-payment rejection, 180-second Supabase signed URL response, receipt-access HTML, and webhook-based receipt email skeleton. All features default OFF. No customer email sent.
- Private draft order table SQL added to source only; no live order table migration applied. Webhook cannot be fully verified without test-mode Stripe, SMTP and database setup.
- Security tests for matching paid SKU/link, invalid file identifiers, session shape and disabled checkout drafted in `tests/fmg-toolkit-commerce.test.mjs`.
- **Audit correction:** An earlier exported ZIP SHA256 manifest had stale hashes for the guide and workbook. November 14 direct hash verification of actual final PDFs: guide (616,525 bytes) SHA-256 `bbbd2c040dbbfed22ebc3c3f20ccb9259c9b90d0bbc0c1048fcd816a4401e4ac`; workbook (597,131 bytes) `b44388c79c26b2c40455e8c2c8c65223fc7fa60aef7205536fc7e7ae9ba3128f`; sample (577,884 bytes) `b18bfa79a4ddce5436e524fa2c371909ea75d91699ae180589c9cd19fa7ff060`. Do not use stale PDF hashes in prior report or ZIP. Source originals preserved.
- Editorial specialist November 14 status remains **HOLD**, pending full copyright/source verification and newest corrected preview confirmation; do not relabel as final approved for commerce solely on previous editorial statements.
- Revenue release remains **HOLD** until: actual corrected five-page PDF published for sampling; private paid guide/workbook objects uploaded and hash-checked; test Stripe product/link redirect and webhook email tested incl. refunds/duplicate events; refund/tax/privacy/support terms; commercially permitted hosting; and owner approval. No production publication or payment activation.


## FINAL COMMERCIAL IMPLEMENTATION DECISION — November 14, 2026 (supersedes custom-delivery work)
**Priority:** Release the validated 21-page + 18-page self-serve toolkit at $49 using **Payhip Free**, not custom Vercel + Stripe + Supabase webhooks. Payhip Free has $0 monthly subscription, 5% platform transaction fee plus Stripe processing, hosted storefront/checkout and delivery. **No Payhip seller account is connected to this ChatGPT environment; seller identity creation and Stripe OAuth authorization need the owner's authenticated UI action.** Never claim this platform is configured or taking purchases before seeing an actual URL and testing access.

**Approved content:** Existing original guide and workbook are preserved, with a distinct five-page sample labeled selected excerpts from Days 1 and 4 plus founder note. The workbook is printable/PDF annotation friendly, not electronically fillable. Official logo is required. The full private launch pack is in the conversation artifact `FMG_to_Pharma_Payhip_Launch_Kit_2026-11-14.zip`: guide, workbook, public sample, Payhip product listing, buyer terms, product cover and optional Netlify static site.

**Production rules:** Do not promote the custom toolkit checkout APIs on Vercel Hobby. They are prototypes only. Vercel Hobby is not commercial eligible. Do not publish any paid PDFs into a public web tree. Netlify Free is a possible commercial-eligible host with hard free-plan credit limits, but a Netlify account/Git connection is not connected here. Starting with the separate Payhip-hosted storefront avoids hosting spend and migration delays.

**Release sequence, no further engineering before first real sale:** (1) owner creates/connects Payhip Free and authorizes RealVibeAI Stripe via provider OAuth; (2) publish $49 product with full guide+workbook, free five-page excerpt, compliant purchase/refund/support terms; (3) test 100%-off coupon checkout, download links, email receipt, mobile, and full page copy before visibility public; (4) publish Payhip URL and then migrate/link commercial marketing to Netlify Free, not Vercel Hobby. No manual outreach, charges, or customer data modification without owner approval.

**Avoid endless editorial HOLD loops:** Corrected free sample is already generated with a visible selected-excerpts label. Only reopen factual/copyright questions for a **specific substantiated problem**, not indefinite undifferentiated QA. Review exact source, note corrective action, then ship under owner approval. No new agent/scheduled task is necessary; two existing FMG agents are sufficient.

## November 15, 2026 — Private PDF download integration
- A free five-page PDF **integration candidate** is embedded as a real static binary in GitHub at `fmg-to-pharma/assets/fmg-free-five-page-sample.pdf`. It is derived from the verified November 14 sample with a source-reference note on page 5 directing readers to the main guide's bibliography on pages 20 and 21. Five-page count and page-5 visual layout checked. Local SHA-256: `077f0662825067dcc84713ecc6f540c13717634e5cb0f2808828b52c0fe3e47d`. Git blob SHA-1: `3b4fa1b51403037eb1f0397c28ad2ee59e1d6643`.
- **Critical version distinction:** The exact November 15 editorial team's independently corrected 'v2' PDF was referenced by its status message but its raw file or working link was not exposed to this project or Library retrieval at this run. DO NOT claim the above integration candidate is byte-identical to the editorial v2. Swap the PDF asset to the editorial v2 once its actual bytes and SHA-256 are available.
- Static sample button is linked from `/toolkit-sample`, `/toolkit`, and `/faq`, with PDF at `/assets/fmg-free-five-page-sample.pdf`. Route is static; no Stripe/payment or Supabase service is involved. The PDF asset has noindex and a short cache TTL.
- **Testing:** The branch preview builds via Vercel, and the PDF is readable in GitHub source; the Vercel preview URL couldn't be fetched by the available external browser/network, so an unauthenticated HTTP 200/download, mobile and assistive-technology test are NOT independently verified. Human/browser QA remains required before public-facing claims.
- **Accessibility:** Confirmed untagged `/StructTreeRoot` is missing in all three original PDFs. Workbook has zero interactive form fields. Sample page now discloses this, and the HTML excerpt remains readable as an interim alternative; this is NOT a PDF/UA compliance claim.
- **Release:** Strictly development preview only; production, live checkout, payment links, Payhip setup, paid PDF access and existing leads were not changed. Commercial release remains HOLD pending exact editorial v2, structural accessibility remediation or an equivalently accessible complete alternative, factual/copyright QA and purchase-delivery testing. No new spending.
