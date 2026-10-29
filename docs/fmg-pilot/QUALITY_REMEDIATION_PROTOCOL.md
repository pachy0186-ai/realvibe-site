# Quality remediation and benchmark protocol

Frozen before new live calls for assignment `quality-remediation-20261029`.

## Controlled test

Use unchanged fictional inputs in `tests/pilot-test-inputs.json`. Run exactly one CRA Application and one CTM Interview attempt, without automatic retry. Model: `openai/gpt-5-mini`, existing preview OIDC and free-credit profile. No paid-model fallback.

Each case gets one bounded discovery call (at most two search tools, 2,000 output tokens), direct HTTPS source verification, and one specialized synthesis call (4,500 output tokens, low reasoning). The baseline gets the identical frozen inspected-source packet, original JD/CV and target, the same model, 4,500-token cap and low reasoning. Neither synthesis can browse. The baseline prompt is in `lib/quality-prompts.js`; both full outputs and prompts are retained.

This is a controlled synthesis comparison, not a comparison of independent browsing/retrieval. The baseline receives the same extracted evidence and classification ledger, making it a strong comparator. Shared research cost must be reported separately from baseline incremental synthesis cost. One case per product, one unblinded Codex reviewer plus deterministic checks and independent primary-source inspection; no human panel, customer willingness-to-pay evidence or statistical superiority claim.

## Rubric

Score 0–5, then weight to 100. Anchors: 0 absent/unsafe; 1 generic or materially wrong; 2 incomplete; 3 useful with corrections; 4 strong and grounded; 5 unusually precise and ready to act on. Record concrete examples and deficiencies for every score.

| Dimension | Weight |
|---|---:|
| Employer-specific intelligence | 20% |
| Factual accuracy and evidence | 25% |
| Candidate personalization | 20% |
| Clinical research expertise | 15% |
| Actionability | 15% |
| Clarity and efficiency | 5% |

A material invented candidate qualification, unsupported employer claim, broken source presented as verified, or mandatory/preferred conflation fails regardless of score. Engineering checks do not certify semantic accuracy. Independently inspect material excerpts and all narrative recommendations against original inputs.

For this diagnostic, a meaningful advantage requires at least 10 points out of 100 over the strong baseline, a specialized score of at least 80, and all quality gates passing. A close score, a single case or our own rubric rating cannot establish customers will pay. A commercial GO also needs credible human-review time/capacity and real willingness-to-pay evidence. Conditional GO means a narrowly supervised pilot only after named conditions and owner launch approval; otherwise NO-GO.

## Spending and build controls

Normal and retired build hooks cannot call models. Audit mode stays off. Only a manually requested preview build command with `--approved-quality-validation` can run this assignment; branch/preview guards, a cross-builder lock, six-call maximum and a $0.50 conservative preflight reservation apply. Read current model metadata before any call. Stop before additional tests that would exceed $0.50, and reconcile actual Gateway logs/balance afterward. No automatic retry of a failed live test.

## Evidence and deliverables

Preserve exact target/JD/CV hashes and excerpts, requirement classification, source URL/status/check time/content hash, candidate evidence references, material source quotes and professional interpretations. Keep full fetched source bodies in internal working evidence only; customer reports use short excerpts, direct citations and limitations. Deliver revised reports, complete baseline outputs, claim-level audit, scores/rationale, actual costs and runtimes, founder-review estimate, separate $49/$99 verdicts, current preview/commit and draft PR status. No production, payment, email or lead mutation is authorized.
