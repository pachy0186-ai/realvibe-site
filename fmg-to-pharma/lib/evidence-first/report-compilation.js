import {CAREER_DECISION,actionReason} from './recommendation-generation.js';
export function compileReport(intake,{job,candidate,research,interpretation,practice,selection},researchedAt) {
  const selected=ids=>ids.map(id=>interpretation.cards.find(c=>c.id===id));
  const priorities=selected(selection.priority_ids),actions=selected(selection.action_ids);
  const mandatory=interpretation.cards.filter(c=>c.classification==='mandatory');
  const table=[...new Map([...mandatory,...priorities,...actions].map(c=>[c.id,c])).values()];
  const evidenceRow=c=>({id:c.id,jobId:c.jobId,driver:c.requirement,classification:c.classification,candidate_evidence:c.candidateQuotes.join(' ')||'No supporting candidate excerpt is established.',candidate_quotes:c.candidateQuotes,
    strength:c.coverage==='reported_evidence'?'strong':c.coverage==='partly_documented'?'partial':'missing',gap_type:c.coverage==='reported_evidence'?'none':'evidence_gap',risk:c.finding,action:c.action});
  const practiceChoices=selection.practice_ids.map(id=>practice.find(p=>p.id===id));
  const analysis={target:{company:intake.company,role:intake.role},
    executive_verdict:{recommendation:CAREER_DECISION.recommendation,competitiveness:'Not scored as a hiring probability',summary:CAREER_DECISION.summary,reasons_for:[],reasons_against:[]},
    critical_findings:priorities.map(c=>({heading:c.coverage==='reported_evidence'?'Evidence is reported for this competency':({independent_monitoring_tenure:'Independent monitoring duration needs confirmation',ctm_tenure:'Qualifying CTM tenure needs confirmation',total_experience:'Aggregate tenure is not qualifying ownership',budget_oversight:'Budget support and accountability are different',travel:'Travel availability needs confirmation',qualification_visit:'Qualification-visit ownership is not established',initiation_visit:'Initiation-visit ownership is not established',startup:'Start-up participation is not established'})[c.competency]||'Clarify this role competency',interpretation:c.finding,references:{job_ids:[c.jobId],candidate_ids:c.candidateIds}})),
    decision_drivers:table.map(c=>({requirement:c.requirement,jd_evidence:c.requirement,classification:c.classification})),evidence_map:table.map(evidenceRow),
    company_intelligence:research.facts.map(f=>({factId:f.id,finding:f.claim,source_quote:f.quote,why_it_matters:f.implication,provenance:'verified_public',source_urls:[f.url],source_id:f.sourceId})),
    positioning_strategy:{headline:'Act on the evidence before expanding the claim.',top_changes:actions.map(c=>({ruleId:c.id,change:c.action,why:actionReason(c),references:{job_ids:[c.jobId],candidate_ids:c.candidateIds}})),resume_edits:[]},
    interview_map:practiceChoices.map(p=>({id:p.id,question:p.question,competency:p.competency,best_candidate_evidence:p.candidateIds.map(id=>candidate.units.find(u=>u.id===id)?.text).join(' ')||'No past example is established; use a hypothetical approach.',answer_strategy:p.plan,missing_info:p.missing,avoid:'Do not invent an outcome, responsibility or past event.',provenance:'inference',candidateIds:p.candidateIds,jobIds:p.jobIds})),
    clarification_questions:priorities.map(c=>({question:c.action,why_needed:'This decision could change the application or preparation strategy.',impact:'Confirm before making the associated claim.'})),
    source_index:research.sources.filter(s=>s.status==='available'&&['target_job','applicant_ai_policy'].includes(s.kind)).map(s=>({url:s.url,title:s.title,type:s.kind,date:`Access checked ${s.checkedAt}; publication date not independently established`})),
    quality_notes:['Candidate facts are self-reported intake evidence, not independent verification of employment.','The supplied JD is preserved. Public posting status, credential acceptance and title equivalence are separate questions.','Clinical interpretations and practice plans are rules-based suggestions requiring human clinical review.']};
  const limitations=research.sources.filter(s=>s.status!=='available'&&s.status!=='discovery_only').map(s=>`${s.url}: ${s.status}. Not used as verified employer evidence.`);
  if(!research.facts.some(f=>f.key==='applicant_ai_policy')) limitations.push('Relevant applicant AI restrictions could not be verified by the controlled compiler; review the source manually.');
  return {engineVersion:'0.4.0-evidence-first',analysis,qualityFlags:[],requiresFounderReview:true,researchedAt,
    inputIntegrity:{company:intake.company,role:intake.role,jdSHA256:job.sha256,cvSHA256:candidate.sha256},
    evidenceCatalogue:{jobs:job.units.map(j=>({...j,kind:j.classification})),candidates:candidate.units},
    fullRequirementRegister:interpretation.cards.map(evidenceRow),
    durationSummary:{listedRoleMonths:candidate.listedClinicalRoleMonths,listedRoleYears:candidate.listedClinicalRoleMonths/12,independentMonitoringMonths:candidate.independentMonitoringMonths,qualifyingCtmMonths:candidate.accountableCtmMonths,caveat:candidate.durationCaveat},
    sourceChecks:research.sources.map(({text,policyLinks,...metadata})=>metadata),researchGaps:limitations,policy:research.sources.find(s=>s.kind==='applicant_ai_policy'&&s.status==='available')?{url:research.sources.find(s=>s.kind==='applicant_ai_policy'&&s.status==='available').url}:null,
    method:'Separate exact extraction, source inspection, versioned clinical rules, model ranking, deterministic compilation and independent claim checks. The model supplies IDs only, not factual prose.'};
}
