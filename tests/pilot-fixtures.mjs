import fs from 'node:fs';
import {evidenceCatalogue} from '../fmg-to-pharma/lib/evidence-contract.js';
export const cases = JSON.parse(fs.readFileSync(new URL('./pilot-test-inputs.json', import.meta.url), 'utf8'));
export const consent = {processingConsent: true, consentVersion: 'pilot-processing-2026-10-28', feedbackConsent: true};
export function fixtureAnalysis(input, packageId = 'application') {
  const ctm = input.id?.startsWith('CTM') || input.role.includes('Manager');
  const requirements = ctm ? ['two years in a CTM position at a CRO', 'eight years of relevant experience', 'clinical budget oversight'] :
    ["relevant bachelor's degree", 'one year of independent monitoring experience', '60 percent travel'];
  const evidence = ctm ? ['BSc Nursing', 'Four years as a site CRC', 'did not own the clinical budget'] :
    ['BSc Biology', '18 months as a CRO Clinical Research Associate', 'Travel availability and work authorization are not supplied'];
  return {
    target: {company: input.company, role: input.role},
    executive_verdict: {recommendation: 'Clarify before applying', competitiveness: 'Unclear', summary: 'TEST DOUBLE ONLY: clarify ownership and material constraints before tailoring the application.', reasons_for: ['Relevant reported experience'], reasons_against: ['Material details remain unknown']},
    decision_drivers: requirements.map(requirement => ({requirement, jd_evidence: requirement})),
    company_intelligence: [{finding: 'The target role and requirements are documented in the linked employer posting.', why_it_matters: 'Evaluate this role rather than a generic job family.', provenance: 'verified_public', source_urls: [input.jobUrl]}],
    evidence_map: requirements.map((driver, i) => ({driver, candidate_evidence: evidence[i], candidate_quotes: [evidence[i]], strength: i === 2 ? 'missing' : 'partial', gap_type: i === 2 ? 'evidence_gap' : 'none', risk: 'Confirm the full scope.', action: 'Clarify the specific requirement before making a claim.'})),
    positioning_strategy: {headline: 'State independent ownership accurately.', top_changes: [{change: 'Clarify role scope.', why: 'A title alone does not establish ownership.'}], resume_edits: []},
    interview_map: packageId === 'interview' ? [
      {question: 'Describe an operational risk you managed.', competency: 'Risk management', best_candidate_evidence: evidence[1], answer_strategy: 'Explain context, decision, action and supported result.', missing_info: 'Confirm the outcome.', avoid: 'Invented results'},
      {question: 'How did you distinguish your responsibility from the CTM’s?', competency: 'Ownership', best_candidate_evidence: evidence[2], answer_strategy: 'Separate supported work from decisions you owned.', missing_info: 'Clarify delegated authority.', avoid: 'Inflated accountability'},
    ] : [],
    clarification_questions: [{question: 'Which responsibilities did you own independently?', why_needed: 'Title equivalence is not established.', impact: 'May change positioning.'}],
    source_index: [{url: input.jobUrl, title: 'Employer job posting — QA fixture', type: 'current_job', date: '2026-10-28'}],
    quality_notes: ['Deterministic QA test double. Not a generated customer report.'],
  };
}
export function gatewayDouble(input, packageId) {
  let count = 0;const requests = [];
  const fetchImpl = async (url, request) => {
    const body = JSON.parse(request.body);requests.push(body);count++;
    const research = {resolved_target: {company: input.company, role: input.role}, sources: [{url: input.jobUrl, title: 'Employer posting', type: 'current_job', date: '2026-10-28'}], research_gaps: ['QA fixture only']};
    return {ok: true, status: 200, json: async () => ({status: 'completed', usage: {input_tokens: 1000, output_tokens: 600},
      output_text: JSON.stringify(count === 1 ? research : fixtureQuality(input, packageId)),
      output: count === 1 ? [{type: 'web_search_call', action: {sources: [{url: input.jobUrl}]}}] : []})};
  };
  return {fetchImpl, requests,sourceLoader:async url=>({url,finalURL:url,status:'available',title:'QA employer source',text:'This is a controlled employer source excerpt for local tests only. No live research is represented by this fixture.',policyLinks:[]})};
}
export function fixtureQuality(input,packageId='application') {
  const catalogue=evidenceCatalogue(input),mandatory=catalogue.jobs.filter(j=>j.kind==='mandatory');
  const jobs=[...mandatory,...catalogue.jobs.filter(j=>j.kind!=='context'&&j.kind!=='mandatory')].slice(0,Math.max(3,mandatory.length));
  const references={job_ids:[jobs[0].id],candidate_ids:['C3']};
  return {target:{company:input.company,role:input.role},decision:{recommendation:'Clarify eligibility first',interpretation:'TEST DOUBLE ONLY: clarify evidence and precise role ownership.'},
    critical_findings:[1,2,3].map(i=>({heading:`Fixture finding ${i}`,interpretation:'Professional interpretation for deterministic workflow tests only.',references})),
    requirements:jobs.map(j=>({job_id:j.id,candidate_ids:[],coverage:'not_established',interpretation:'The fictional evidence needs clarification.',next_action:'Clarify the exact responsibility.'})),
    employer_facts:[{source_id:'S1',quote:'This is a controlled employer source excerpt for local tests only.',interpretation:'This is fixture evidence, not real employer intelligence.'}],
    actions:[1,2,3].map(()=>({action:'Clarify the exact evidence before claiming ownership.',reason:'Fixture scope only.',references})),
    practice:packageId==='interview'?[1,2,3].map(()=>({question:'Which responsibilities did you own?',competency:'Ownership',candidate_ids:[],answer_plan:'If experience is absent, state the gap and describe a hypothetical approach.',missing_evidence:'Independent ownership.'})):[],
    clarification_questions:[{question:'What scope was independently owned?',reason:'A title alone is insufficient.'}]};
}
