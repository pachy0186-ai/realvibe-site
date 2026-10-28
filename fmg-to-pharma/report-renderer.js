// Model content is rendered only as text; never insert model-generated HTML.
export function renderReport(host, draft) {
  host.replaceChildren();
  const a = draft?.analysis; if (!a) return;
  const text = (tag, value, parent = host) => {const node = document.createElement(tag);node.textContent = String(value ?? '');parent.append(node);return node;};
  text('h2', `${a.target.company} · ${a.target.role}`);
  text('p', `Prepared ${draft.researchedAt || 'date not supplied'} · ${draft.engineVersion || 'reviewed report'}`);
  text('h3', 'Your next decision'); text('p', a.executive_verdict.summary);
  text('h3', 'Prioritized next actions');
  const actions = text('ol', '');
  for (const item of a.positioning_strategy.top_changes) text('li', `${item.change} ${item.why}`, actions);
  text('h3', 'Employer context and sources');
  for (const item of a.company_intelligence) {const card = text('section', '');card.className = 'card';text('strong', item.provenance.replaceAll('_', ' '), card);text('p', item.finding, card);text('p', item.why_it_matters, card);}
  text('h3', 'Your evidence against the requirements');
  for (const row of a.evidence_map) {
    const card = text('section', '');card.className = 'card';text('h4', row.driver, card);
    for (const [label, value] of [['Your evidence', row.candidate_evidence], ['Coverage', row.strength], ['Gap', row.gap_type], ['Risk or uncertainty', row.risk], ['Next action', row.action]]) {
      text('strong', label, card);text('p', value, card);
    }
  }
  if (a.interview_map.length) {
    text('h3', 'Interview practice — our preparation suggestions');
    text('p', 'These prompts are professional interpretation, not an employer’s confirmed questions or interview process.');
    for (const item of a.interview_map) {const card = text('section', '');card.className = 'card';text('h4', item.question, card);text('p', item.answer_strategy, card);text('p', `Evidence to use: ${item.best_candidate_evidence}`, card);text('p', `Clarify: ${item.missing_info}`, card);text('p', `Avoid: ${item.avoid}`, card);}
  }
  text('h3', 'What to clarify');
  const gaps = text('ul', '');for (const item of a.clarification_questions) text('li', `${item.question} ${item.why_needed}`, gaps);
  text('h3', 'Sources and research limits');
  const sources = text('ol', '');
  for (const item of a.source_index) {
    const li = text('li', '', sources);
    try {const url = new URL(item.url);if (url.protocol !== 'https:' || url.username || url.password) continue;
      const link = text('a', item.title, li);link.href = url.href;link.target = '_blank';link.rel = 'noopener noreferrer';
      text('span', ` · ${item.date || 'Publication date not displayed'}`, li);
    } catch {text('span', 'Source URL requires review.', li);}
  }
  for (const note of [...a.quality_notes, ...(draft.researchGaps || [])]) text('p', note);
  text('p', 'Educational career guidance. No employer affiliation, insider hiring information or guaranteed interview, offer or sponsorship outcome.');
}
