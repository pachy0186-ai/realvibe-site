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
- **Final guide:** `FMG_to_Pharma_7_Day_Career_Launch_Guide_FINAL_2026-11-13.pdf` — 21 pages, SHA-256 `f9655a388ef7528db9dfa43f1cad6273e94c2cbbd821e224e65ff4d16e4c82c9`. Verified official SOCRA link corrected and Indeed help link localized.
- **Final workbook:** `FMG_to_Pharma_Workbook_and_Templates_FINAL_2026-11-13.pdf` — 18 pages, SHA-256 `413a223c6a96c2a94ec160554d5c567fcc62b429794d3fb3b71c674940a0b160`. Unchanged body; printable/PDF annotation-friendly.
- **Final free sample:** `FMG_to_Pharma_Free_Sample_FINAL_2026-11-13.pdf` — 5 pages, SHA-256 `b18bfa79a4ddce5436e524fa2c371909ea75d91699ae180589c9cd19fa7ff060`. Page-4 label collision fixed.
- **Site changes:** Branch `codex/fmg-toolkit-final-editorial-20261113` updates homepage, toolkit, complete sample as readable HTML, founder, seven-day process, FAQ, free-guides nav and legacy pilot/archive notices. Legacy operational pilot code and leads preserved. Preview Vercel deployment `dpl_Dtx8cLvGeEF7tNbBTiAJqGH2J4iZ` built READY from commit `2241e993c566fd21513a2b906be871f93572fcb1`.
- **NO CLAIM OF PUBLIC PDF EMBEDDING:** Web preview provides inline HTML sample, not a live free sample PDF download. Neither paid PDF is accessible through a public URL. GitHub and Vercel changes are preview-only; production unchanged.
- **Release gates:** public sample binary upload/test; commercially permitted hosting (Hobby is noncommercial); authenticated test-mode Stripe purchase + webhook + protected PDF downloads; privacy/refund/tax/support language; accessibility/mobile browser QA; specific owner approval before live payments or spend.
- **Current decision:** Editorial candidate READY. Public commercial release remains **HOLD**, for concrete technical/compliance reasons—not content access.
