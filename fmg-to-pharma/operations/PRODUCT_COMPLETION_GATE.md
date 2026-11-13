# FMG to Pharma — Product completion and cross-role acceptance gate
Updated: November 12, 2026. PRIVATE. Development branch only.

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
- [ ] Recover and independently inspect the **existing original 21-page guide PDF** (do not author a replacement merely because it is absent from the ZIP).
- [ ] Recover and independently inspect the **existing original 18-page workbook PDF**; the earlier editorial inspection reported **no interactive form fields**, so advertise as printable/PDF-annotation-friendly only.
- [ ] Ensure day-by-day sequence: role families; hard eligibility gates; posting evidence; experience inventory; truthful résumé/LinkedIn; networking/interview; 30-day plan.
- [ ] Add at least one completed, explicitly fictional job-posting fit example and a reproducible decision rubric.
- [ ] Verify cited career/credential claims with primary sources and dated references; avoid employer hiring guarantees.
- [ ] Export final PDF files; inspect actual page count, text extraction, readability, layout and branding.
- [ ] Connect the actual five-page PDF sample and verify successful download.
- [ ] Confirm paid PDF secure delivery is restricted to verified orders.
- [ ] Test successful payment, failed payment, refunds, duplicate webhook, email delivery and support path in test mode.
- [ ] Review privacy, taxes, commercial hosting eligibility, refunds and accessibility.
- [ ] CRO factual/commercial QA PASS + Editor copyright/style QA PASS + technical QA PASS.
- [ ] Owner approval before production, live checkout, spend or outreach.

## Editorial scope and claims
Buyer: U.S.-based foreign-trained physicians with little/no U.S. research operations experience exploring first research role. Promise: a practical seven-session plan and application assets, **not a job**. Proposed $49 one-time, not active. Self-paced, no coaching or job placement. Never sell absent verified full PDFs.

## Current blocking priority
Recover the previously created original branded PDFs from project conversation files and reconcile the November 12 editorial QA report. Do **not** regenerate the manuscripts from scratch. Apply only verified page-specific corrections to versioned private copies; then connect the real five-page PDF sample and test it, followed by payment fulfillment verification. Maintain a factual evidence log and commit IDs on each run.

## Release decision
**HOLD** — original PDF page counts were reported verified in the November 12 project review, but repository-accessible final corrected files and tested paid fulfillment are not verified. This is a quality gate, not a request to stop private development.

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
