# FMG to Pharma 2.0: minimum paid-pilot validation

October 27, 2026. This is an operating draft, not evidence of sales, final customer terms, or authorization to contact leads. No payment collection is active.

## Current customer path

`/` → `/sample-report` → `/job-intelligence#packages` → `/contact?package=application|interview` → customer opens an email draft.

The sample has real public employer sources and fictional candidate inputs. Founder review is pending. An email click is an inquiry signal, not an order, purchase or proof of willingness to pay. No free call or assessment is required. The existing Reality Check remains optional.

## Launch gates and smallest workable fulfillment path

| Gate | Current status | Required evidence before opening purchases |
|---|---|---|
| Source-checked sample | Worked example implemented | Founder verifies clinical interpretation and source-to-claim accuracy |
| Exact deliverable | Proposed $49 Application / $99 Interview; one role/company | Confirm scope, format, what is excluded and revision boundary |
| Quality | No generation or customer benchmark claimed | Run matched tests below using authorized/redacted or synthetic inputs |
| Secure intake | Existing private bucket and ownership policies; no pilot intake enabled | Verify authentication, upload/read/delete ownership, limits and consent with test accounts |
| Processing/retention | Unverified | Choose retention period, deletion procedure, model provider/processing terms and authorized access before requesting CVs |
| Turnaround | Deliberately unspecified | Time a complete dry run; select a sustainable delivery commitment |
| Refund/revisions | Unfinalized | Owner confirms customer-facing rules before checkout |
| Payments | Not configured on website | Use an existing approved payment account; confirm test payment, confirmation, refund and verified webhook reconciliation before activation |
| Analytics | Consent-controlled event adapter; no destination | Attach an already approved measurement destination, verify event receipt and document its processing |
| Production | Awaiting owner review | Approve the exact tested preview and verify the intended production branch/root |

Do not create chargeable infrastructure or collect payments to complete these gates without approval. No new payment account or service was selected in this implementation.

After these gates pass, the simplest proposed order workflow is:

1. Customer selects one role/company and the agreed package. Show exact scope, price, turnaround, refund/revision terms and document-processing consent before checkout.
2. A confirmed payment creates a unique order/reference ID through a verified provider event or documented manual reconciliation. Never treat a browser success page as proof of payment. Keep new pilot order records separate from Reality Check leads.
3. Provide an authenticated intake using the existing Supabase project only after testing its ownership rules. Ask for a redacted CV or career evidence, a JD/URL, target role/company and preparation objective. Do not ask for identity, visa, medical or employer-confidential records.
4. Founder operates the protected prototype with authorized inputs, checks every material company claim and candidate statement, corrects unsupported output, and records review time and costs. If the prototype is not ready, use a manual research/report workflow; do not imply automation delivered the report.
5. Deliver using a verified private, expiring access mechanism. Record delivery and review status without raw CV text in logs or analytics. Execute the agreed deletion schedule and confirm completion.

No order table, schema migration, secure link, payment link, delivery automation or retention job was created as part of this website change.

## Quality comparison: before spending on generation

Use one CRA, one Senior CRA and one CTM case. The public sample supplies a synthetic CRA fixture. Additional cases require permissioned/redacted resumes or fully synthetic profiles. No candidate data should be taken from the existing lead database.

Use the same input evidence, date cutoff, public sources and comparable research access for the prototype and baseline. Record model/version, research access, prompt, costs and time; avoid giving the prototype sources withheld from the baseline. Randomize report order before founder scoring; another qualified reviewer would reduce bias further. Three cases are a pilot check, not market proof.

### Strong generic-AI baseline prompt

> Act as a clinical-operations career analyst. Use only the supplied candidate evidence and public employer sources. Analyze the exact target job, distinguishing required and preferred qualifications. Research the company and role context with dated primary-source links where tools permit. If research access is unavailable, state that limitation; do not invent sources. Map every key requirement to explicit candidate evidence, missing evidence, or an actual gap. Distinguish site/CRO/sponsor scope, independent ownership, study scale and seniority. Do not infer candidate achievements, work authorization, therapeutic experience or internal hiring criteria. Separate verified company facts, analysis/inference, and unknowns. Give prioritized application actions and role-relevant interview practice themes labeled as your suggestions, not actual employer questions. Build answer frameworks from the candidate's own examples without inventing outcomes. Flag conflicting sources, job ambiguity and practical constraints. Include a source register with retrieval dates and a limitations section. Make the report useful for one next application/interview decision, with no outcome guarantees.

### Scorecard (record real results privately)

| Measure | How to score | Gate |
|---|---|---|
| Material factual errors | Count unsupported/wrong employer facts and candidate assertions; verify citations | Zero |
| Source quality | 1–5 for primary sources, freshness, claim support and acknowledged conflicts | Founder judgment, document reasons |
| Role relevance | 1–5 for level, function, operating model, scope and therapeutic relevance | Improvement over matched baseline required |
| Actionability | 1–5: can the candidate take a specific, evidence-based action? | Improvement over matched baseline required |
| Usefulness | Customer feedback after an actual authorized delivery | Proposed ≥80% positive; record numerator/denominator |
| Founder involvement | Timed research, correction, review, support and delivery minutes | Proposed <30 minutes/report |
| Direct variable cost | Model/search, payment processing, delivery and refunds | Proposed ≥70% contribution margin before founder labor |

For $49, a 70% margin permits at most $14.70 in direct variable costs; for $99, at most $29.70. These are ceilings, not measured costs. Record founder labor separately. Contribution margin = (collected revenue − refunds − variable costs) ÷ collected revenue, before founder labor; avoid double-counting refunds. Record fixed costs and acquisition spend separately.

## Acquisition instrumentation

`pilot.js` defaults optional analytics off, honors DNT/GPC, captures only a fixed vocabulary of source/medium/campaign labels after opt-in, and emits to `dataLayer` plus `fmg-pilot-event`. There is no outbound analytics request. The legacy assessment events remain a separate existing implementation and were not comprehensively redesigned.

| Event | Implemented trigger | Interpretation |
|---|---|---|
| `landing_page_viewed` | Consented homepage load | Visit, not qualified exposure |
| `sample_report_clicked` | Marked sample link clicked | Sample interest |
| `sample_report_viewed` | Consented sample page load | Sample viewed |
| `product_page_viewed` | Consented product load | Product viewed |
| `product_engaged` | At least half a package card visible | Page engagement, not intent to purchase |
| `pilot_packages_clicked` | Homepage package link | Offer interest |
| `pilot_inquiry_clicked` | Package inquiry selected | Inquiry intent, no order |
| `pilot_email_clicked` | Email draft opened | Not proof that an email was sent |
| `checkout_started` | Not emitted; checkout absent | Add only when a real checkout starts |
| `purchase` | Not emitted; payments absent | Add only from a reconciled, deduplicated provider confirmation |
| `report_completed` | Not emitted; fulfillment absent | Add after actual delivery/review completion |

Approved campaign vocabulary: source `youtube`, `linkedin`, `referral`, `direct`; medium `organic`, `social`, `referral`, `email`; campaign `pilot_validation`, `sample_report`. Example: `?utm_source=linkedin&utm_medium=social&utm_campaign=pilot_validation`. No prospect-specific IDs, emails, job URLs, arbitrary campaign strings or raw referrers. Validate actual receipt in the eventual destination before claiming acquisition measurement works. Do not enable a broad automatic page-URL collector that bypasses these constraints.

## Highest-leverage next actions

1. Review the preview and founder-check the sample. Decide separately whether to publish the informational website to repair the public routing issue; checkout can remain closed.
2. Recover/version the full prototype backend, verify processing and security, and run the three matched quality/cost cases. No paid generation was run in this work.
3. Finalize fulfillment, consent, retention and customer terms; test the existing approved payment flow and measurement destination before activation.
4. After approval, invite 15 qualified prospects through permission-based channels and seek three real purchases. No outreach was sent. Zero sales calls for offer/audience diagnosis, not more platform development.

Retain the proposed 30-day experiment and $300 incremental ceiling as planning limits only; they do not authorize spending. Postpone subscriptions, customer dashboards, parsing, new databases, automated outbound and a full SaaS platform.
