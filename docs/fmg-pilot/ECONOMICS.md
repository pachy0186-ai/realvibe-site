# Pilot economics — estimates, not measured results

October 28, 2026. No successful billable AI generation or real customer order occurred in this validation. Fictional fixture token counts/timings must not be used as real performance measurements.

The current [Gateway model catalog](https://ai-gateway.vercel.sh/v1/models) listed `openai/gpt-5.4-mini` at $0.75 / million input tokens and $4.50 / million output; `openai/gpt-5.4-fast` at $5 / million input and $30 / million output. Pricing can change; these are catalog observations, not an account invoice. [Gateway pricing](https://vercel.com/docs/ai-gateway/pricing) and actual usage must be reconciled, including search/tool charges.

Illustrative run: 12,000 research input + 4,000 output, then 20,000 synthesis input + 6,000 output = $0.009 + $0.018 + $0.10 + $0.18 = **$0.307 model tokens**. Search, extra provider context, compute, delivery and corrections are additional. Budget **$1 per generated attempt** and **$2 AI allowance per order** for planning, not a guaranteed cap. The code bounds output and two attempts/order but does not enforce a global dollar budget or exact input-token budget. Owner must configure Gateway spend controls and review actual charges before enabling generation.

[Stripe's standard U.S. domestic online card rate](https://stripe.com/pricing) is 2.9% + $0.30; actual account rates, international cards, FX, refunds, disputes, taxes and additional products can differ. At that planning rate: $49 fee $1.72; $99 fee $3.17.

| Planning item / order | $49 Application | $99 Interview |
|---|---:|---:|
| Payment fee, domestic standard assumption | $1.72 | $3.17 |
| AI allowance, including one controlled regeneration | $2.00 | $2.00 |
| Variable delivery/compute reserve | $0.50 | $0.50 |
| Contribution before labor/fixed costs/tax/refunds | $44.78 | $93.33 |
| Estimated contribution margin on those assumptions | 91.4% | 94.3% |

These estimates clear the requested 70% target mathematically; real economics remain unvalidated. Low demand can make allocated fixed hosting costs material. Founder labor is excluded as requested; a 25-minute review at $60/hour would cost another $25 in economic labor, even if no cash wage is paid.

The dashboard shows Hobby. Vercel's [fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines) restrict Hobby to noncommercial personal use; paid business use requires an approved commercial plan. [Pro currently starts at $20/month](https://vercel.com/pricing), plus applicable usage/tax. No upgrade, trial, paid service or new subscription was activated. Obtain owner approval rather than assuming free hosting supports the paid pilot.

Suggested 30-day cash allocation ceiling, contingent on approval: $20 base commercial hosting, $40 AI validation/limited pilot usage, $10 email/compute reserve, $50 payment-fee reserve, $30 refund/incident reserve, $150 unallocated contingency = $300. This is a spending plan, not an enforced account budget or a promise that all charges fit. At 20 orders, the per-order reserves are roughly consistent with this small pilot; stop intake at capacity/budget limits. Do not treat the contingency as permission to purchase anything.

Target founder time: 5 minutes checking intake/practical fit, 15 minutes verifying source and candidate claims, 5 minutes approval/delivery = 25 minutes/order. **Unmeasured.** The reviewer form stores actual minutes when supplied. Initially cap at five supervised orders/week: about 125 minutes of that target work, leaving the balance of the founder's 10 hours for support, marketing and corrections. Do not assume all ten hours can be spent on report review. Pause sales if reviews repeatedly exceed 30 minutes, material errors occur, or actual spend drifts from the allocation.

Latency: each provider request has an 80-second timeout; the analysis route has a 180-second function limit. These are implementation limits, not measured completion times or customer turnaround. Timeout/function termination may require manual sandbox recovery. No customer delivery SLA is approved. Real model time, correction time, first-pass approval rate, provider spend and inbox delivery must be measured during the two live validation cases before recommending paid launch.
