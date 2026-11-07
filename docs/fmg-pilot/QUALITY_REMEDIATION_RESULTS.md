# Competitive benchmark and commercial judgment

## Method

The protocol and rubric were committed before live calls. Each product had one attempt. Both specialized and strong generic synthesis used GPT-5 mini, low reasoning, the same 4,500-token output cap and the identical frozen source packet, original CV/JD and target. The baseline also received the extracted evidence/classification ledger. Neither synthesis browsed; discovery and HTTPS inspection were shared. This measures synthesis and safeguards, not independent research superiority or the ChatGPT product itself. Complete baseline outputs are retained without edits.

One unblinded Codex reviewer scored 0–5 using deterministic checks and separate primary-source inspection. Scores are diagnostic judgments, not statistics or independent human validation. Material factual defects fail acceptance regardless of score. The predefined diagnostic advantage threshold was at least +10/100, specialized >=80, and all quality gates passing.

## Scores

| Dimension | Weight | CRA specialized | CRA generic | CTM specialized | CTM generic |
|---|---:|---:|---:|---:|---:|
| Employer-specific intelligence | 20% | 2 | 2 | 1 | 1 |
| Factual accuracy and evidence | 25% | 2 | 2 | 1 | 2 |
| Candidate personalization | 20% | 3 | 3 | 2 | 3 |
| Clinical research expertise | 15% | 3 | 3 | 2 | 3 |
| Actionability | 15% | 2 | 3 | 2 | 3 |
| Clarity and efficiency | 5% | 1 | 3 | 1 | 3 |
| Weighted total / 100 | 100% | **46** | **51** | **30** | **47** |

Neither product meets the predefined advantage or safety gates. These two cases do not establish that generic AI is universally better; they provide no basis for claiming our current report output is superior.

## Rationale by dimension

1. Employer-specific intelligence: CRA outputs mostly reuse an easily found posting minimum and applicant policy; neither reveals defensible, difficult-to-obtain intelligence. CTM uses an irrelevant privacy notice and an inaccessible vacancy. Both CTM outputs therefore score 1.
2. Accuracy/evidence: Exact target and factual excerpt fields improved in the specialized output, but CRA conflates title tenure with independent monitoring duration. Its generic baseline makes the same overstatement, asserts unverified employer screening behavior and attributes QA guidance to ICON. CTM specialized miscalculates the listed 8.5 years, contradicts its own monitoring heading and misuses privacy context. CTM generic calculates 8.5 correctly but overstates qualifying eligibility and attributes supplied test guidance to the employer. Both baseline outputs remain unapproved.
3. Personalization: CRA uses visit ownership, travel, systems and query-escalation gaps in both approaches. CTM specialized uses real budget/CTM gaps but undermines them with contradictory arithmetic; generic CTM maps the candidate's role history more coherently, while some practice suggestions still assume unprovided examples.
4. Clinical expertise: CRA usefully distinguishes CRC participation, CRA visit scope and senior readiness, with corrections needed for duration. CTM specialized preserves a preferred label in the table but blurs it elsewhere and misreads monitoring evidence. Generic CTM more clearly separates aggregate duration, CTM tenure and budget ownership. Neither has verified confidential employer insight.
5. Actionability: Both approaches offer clarification and truthful-positioning steps. Specialized CRA includes clipped actions and requests that could solicit confidential trial documents. Generic plans are clearer but still require conditional wording and source review. CTM specialized needs a corrected eligibility decision before its practice plan is usable.
6. Clarity/efficiency: Specialized drafts contain visibly clipped sentences and internal evidence IDs in prose. The baselines are complete and easier to follow, but are 880 and 931 words, slightly above the 850-word target, with repetition and imperfect citations.

## Separate product verdicts

### $49 Application Intelligence — NO-GO for selling the current output

The customer receives useful issue spotting: confirm actual independent monitoring months, distinguish visit ownership, resolve travel/work authorization, and avoid unsupported systems claims. Those recommendations could change application accuracy, but the strong generic baseline supplies essentially the same value. The current product adds traceability and software gates, not demonstrated unique intelligence. The clipped recommendations and tenure overstatement still fail acceptance.

Estimated founder review/correction time: **20–30 minutes**, including original evidence review, scope clarification and rewriting. This is a task-based estimate, not observed founder time. It excludes waiting for candidate answers. Low model cost does not establish willingness to pay $49. A narrower founder-reviewed eligibility/evidence audit may be worth testing later; no paid sale is recommended now.

### $99 Interview Intelligence — NO-GO for selling the current output

The useful candidate-specific themes are budget support versus ownership, qualifying CTM tenure, documented trip-report/risk work and honest hypothetical gap responses. The output's wrong total-years conclusion can misdirect preparation. Its employer-specific material provides no defensible advantage; the exact posting is unavailable and applicant policy was missed in the original packet. The generic baseline is more coherent on duration and most of the useful preparation is reproducible with a strong prompt.

Estimated founder review/correction time: **30–45 minutes**, plus a current job description or recruiter clarification. This is not a measured human turnaround. A future differentiated offer would need expert rehearsal feedback, deidentified story development and verified employer/role context, rather than more generic practice questions. No evidence currently justifies launching this report at $99.

## Commercial limits and next decision

Neither case contains information shown to be difficult to obtain from a sophisticated generic prompt. Public sourcing and clinical interpretation can become useful when verified, but this run does not demonstrate a moat or willingness to pay. Both cases use one employer and fictional histories; there are no real purchase, retention, outcome or founder-time data. Do not change prices or marketing claims based on these scores alone.

Keep purchases closed. Narrow the deliverable around a small number of verified screening/ownership decisions and expert correction. Before reconsidering launch, validate a current target job, ensure complete prose and correct duration reasoning, test another employer, obtain human SME review and assess actual buyer usefulness. No extra generation was performed after the authorized six calls. Later prompt/validator changes are locally verified and source-probed, not a successful new end-to-end report test.

## Operational evidence and implementation status

Final preview: [FMG to Pharma](https://fmg-to-pharma-cvwqqhiqi-pachy0186-ais-projects.vercel.app/), [actual fictional report/baseline viewer](https://fmg-to-pharma-cvwqqhiqi-pachy0186-ais-projects.vercel.app/api/fmg-preview-qa?view=reports). Deployment `dpl_ApJ78u2xAaz1XDubssbn1ck7Bsgi` is READY, staging/preview, code `f6824484140d78428bf2abceec6d586c74ef4181`. PR #9 remains draft and unmerged on `codex/fmg-pilot-operations-validation`, targeting `codex/fmg-2-intelligence-validation`.

The one-attempt live generator was commit `656329f0fda88a826a025056eaff924c8e2c3b02`. Its build completed the six model calls but then failed static output packaging. Outputs were recovered intact. Later commits add observed-failure guards, a read-only policy fallback probe, a QA viewer and raw-source path protection; no further model generation occurred.

| Case | Research + specialized | Baseline inference, incremental | Engine time | Baseline time |
|---|---:|---:|---:|---:|
| CRA | $0.01926315 | $0.00383650 | 35.502 s | 22.981 s |
| CTM | $0.03178415 | $0.00475450 | 41.603 s | 17.048 s |

Exact six-call assignment total **$0.05963830**. Balance before **$4.3881167**, after fully reconciled charges **$4.3284784**. Baseline inference shares the already-built packet; it is not a standalone research-cost comparison. No paid-model fallback, purchased credits, manual API key or additional model call was used. All six calls used GPT-5 mini with existing OIDC.

**37 automated tests pass.** Thirteen deployed GET checks pass, including healthy read-only DB connectivity, closed pilot orders, expected methods, working homepage/sample/Reality Check, and 404s for raw API sources/private libraries. Both report cases were checked at 375px and 1440px without horizontal overflow; the actual logo loaded and no browser errors were recorded. This does not certify physical devices or a complete paid workflow. The final normal build logged disabled model auditing, with zero model-stage lines.

The new careers-homepage fallback retrieved the actual applicant AI policy after the exact CTM target returned 404. That is verified source retrieval, not proof of a regenerated high-quality report. Duration arithmetic, unfinished-sentence, mandatory-coverage and confidential-document-request checks now withhold the frozen failed outputs. Source privacy notices are excluded from future role intelligence. Post-test prompt changes remain unverified by live generation.

See [claim-level review](CLAIM_LEVEL_AUDIT.md), [full CRA baseline](CRA_GENERIC_BASELINE.md), [full CTM baseline](CTM_GENERIC_BASELINE.md), [frozen test protocol](QUALITY_REMEDIATION_PROTOCOL.md), the actual outputs in the preview-only QA fixture module, and the full locally delivered handoff/evidence bundle. Reports retain unedited model text with explicit failure annotations rather than silently substituting a founder-written success.

Normal and retired build hooks cannot generate reports. Audit mode remains off. No website redesign, production publish/settings change, PR merge, payment activation, customer email, existing lead-data mutation or old-prototype retirement occurred. Both $49/$99 products remain NO-GO for sale pending quality, human SME and buyer validation.


