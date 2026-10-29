// Model content is rendered only as text; never insert model-generated HTML.
export function renderReport(host, draft) {
  if(draft?.engineVersion==='0.3.0-evidence-bound') return renderEvidenceReport(host,draft);
  host.replaceChildren();
  const a = draft?.analysis; if (!a) return;
  const text = (tag, value, parent = host) => {const node = document.createElement(tag);node.textContent = String(value ?? '');parent.append(node);return node;};
  text('h2', `${a.target.company} · ${a.target.role}`);
  const prepared = new Date(draft.researchedAt);
  text('p', Number.isNaN(prepared.getTime()) ? 'Research date requires confirmation.' : `Prepared ${new Intl.DateTimeFormat('en-US', {dateStyle: 'long', timeZone: 'UTC'}).format(prepared)}`);
  text('h3', 'Your next decision'); text('p', a.executive_verdict.summary);
  text('h3', 'Prioritized next actions');
  const actions = text('ol', '');
  for (const item of a.positioning_strategy.top_changes) text('li', `${item.change} ${item.why}`, actions);
  text('h3', 'Employer context and sources');
  for (const item of a.company_intelligence) {const card = text('section', '');card.className = 'card';text('strong', item.provenance.replaceAll('_', ' '), card);text('p', item.finding, card);text('p', item.why_it_matters, card);}
  text('h3', 'Your evidence against the requirements');
  for (const row of a.evidence_map) {
    const card = text('section', '');card.className = 'card';text('h4', row.driver, card);
    const coverage = {strong: 'Strong evidence', partial: 'Partial evidence', missing: 'Evidence not supplied'}[row.strength] || 'Needs review';
    const gap = {none: 'No material gap identified', qualification_gap: 'Required qualifications not established', evidence_gap: 'Evidence needs clarification', language_gap: 'Make relevant experience clearer', seniority_gap: 'Ownership or seniority gap', perception_risk: 'A potential concern to address'}[row.gap_type] || 'Needs review';
    for (const [label, value] of [['Your evidence', row.candidate_evidence], ['Coverage', coverage], ['Gap', gap], ['Risk or uncertainty', row.risk], ['Next action', row.action]]) {
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

function renderEvidenceReport(host,draft) {
  host.replaceChildren();const a=draft.analysis;
  const text=(tag,value,parent=host)=>{const n=document.createElement(tag);n.textContent=String(value ?? '');parent.append(n);return n;};
  const card=()=>{const n=text('section','');n.className='card';return n;};
  const link=(url,label,parent)=>{try{const u=new URL(url);if(u.protocol!=='https:'||u.username||u.password)return;const n=text('a',label,parent);n.href=u.href;n.target='_blank';n.rel='noopener noreferrer';}catch{}};
  const evidence=(refs,parent)=>{
    const details=text('details','',parent);text('summary','See the exact evidence',details);
    for(const id of refs.job_ids || []) {const item=draft.evidenceCatalogue.jobs.find(j=>j.id===id);if(item)text('p',`Supplied job description: “${item.text}”`,details);}
    for(const id of refs.candidate_ids || []) {const item=draft.evidenceCatalogue.candidates.find(c=>c.id===id);if(item)text('p',`Your intake: “${item.text}”`,details);}
    if(!refs.candidate_ids?.length) text('p','No candidate evidence is established by this finding.',details);
  };
  text('h2',`${a.target.company} · ${a.target.role}`);
  const prepared=new Intl.DateTimeFormat('en-US',{dateStyle:'long',timeZone:'America/New_York'}).format(new Date(draft.researchedAt));
  text('p',`Prepared ${prepared} (Eastern Time). Based on your supplied job description and intake; a public posting may have changed or closed.`);
  if(draft.qualityFlags.length) text('p','Draft requires corrections before approval or delivery.');
  text('h3','Three findings that matter');
  for(const finding of a.critical_findings) {const n=card();text('h4',finding.heading,n);text('p',finding.interpretation,n);evidence(finding.references,n);}
  text('h3','Your next decision');text('strong',a.executive_verdict.recommendation);text('p',a.executive_verdict.summary);
  text('h3','Your priorities');const priorities=text('ol','');
  for(const action of a.positioning_strategy.top_changes){const li=text('li','',priorities);text('strong',action.change,li);text('p',action.why,li);evidence(action.references,li);}
  text('h3','Evidence against the role');
  const labels={mandatory:'Mandatory in the supplied description',preferred:'Preferred in the supplied description',responsibility:'Role responsibility',constraint:'Stated constraint',mixed_requires_review:'Requirement classification needs review'};
  for(const row of a.evidence_map){const n=card();text('h4',row.driver,n);text('strong',labels[row.classification] || 'Classification not established',n);
    text('p',({strong:'Supported by intake',partial:'Partly supported',missing:'Not established'})[row.strength],n);
    if(row.candidate_quotes.length) for(const quote of row.candidate_quotes) text('blockquote',quote,n);else text('p','No supporting candidate excerpt supplied.',n);
    text('p',`Interpretation: ${row.risk}`,n);text('p',`Next step: ${row.action}`,n);
  }
  text('h3','Employer evidence and its implications');
  if(!a.company_intelligence.length) text('p','No employer-specific factual excerpt met the verification rules. Use the limitations below before acting.');
  for(const fact of a.company_intelligence){const n=card();text('strong','Inspected source excerpt',n);text('blockquote',fact.finding,n);text('p',`Professional interpretation: ${fact.why_it_matters}`,n);
    for(const url of fact.source_urls){const source=a.source_index.find(s=>s.url===url);link(url,source?.title || 'Read the source',n);}
  }
  if(a.interview_map.length){text('h3','Practice for this opportunity');text('p','These are our preparation themes, not confirmed employer questions. Answer from actual experience; label hypothetical approaches clearly.');
    for(const practice of a.interview_map){const n=card();text('h4',practice.question,n);text('p',practice.answer_strategy,n);text('p',`Intake evidence: ${practice.best_candidate_evidence}`,n);text('p',`Still needed: ${practice.missing_info}`,n);}
  }
  text('h3','What to clarify');const questions=text('ul','');for(const q of a.clarification_questions)text('li',`${q.question} ${q.why_needed}`,questions);
  text('h3','Sources and limits');
  for(const source of a.source_index){const n=text('p','');link(source.url,source.title,n);text('span',` — ${source.date}`,n);}
  if(draft.policy) {const n=text('p','');link(draft.policy.url,'Read the inspected applicant AI-use policy',n);}
  for(const note of [...a.quality_notes,...draft.researchGaps])text('p',note);
  text('p','Educational career preparation. No employer affiliation, confidential hiring access or guaranteed outcome.');
}
