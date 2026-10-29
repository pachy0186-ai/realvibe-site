import test from 'node:test';
import assert from 'node:assert/strict';
import {cases,consent} from './pilot-fixtures.mjs';
import {extractJob,competency} from '../fmg-to-pharma/lib/evidence-first/job-extraction.js';
import {extractCandidate} from '../fmg-to-pharma/lib/evidence-first/candidate-extraction.js';
import {interpretCompetencies} from '../fmg-to-pharma/lib/evidence-first/competency-rules.js';
import {researchEmployer} from '../fmg-to-pharma/lib/evidence-first/employer-research.js';
import {practiceLibrary,selectionFormat,priorityScore} from '../fmg-to-pharma/lib/evidence-first/recommendation-generation.js';
import {compileReport} from '../fmg-to-pharma/lib/evidence-first/report-compilation.js';
import {validateIndependentClaims} from '../fmg-to-pharma/lib/evidence-first/claim-validation.js';
import {runIntelligence} from '../fmg-to-pharma/lib/intelligence-engine.js';
import {approveReport,REVIEW_CHECKS} from '../fmg-to-pharma/lib/pilot-domain.js';

const policyURL='https://careers.iconplc.com/ai-usage-policy-for-job-applicants';
export function sourceDouble(input,{publicMinimum=1}={}) {return async url=>{
  if(url===input.jobUrl&&input.id.startsWith('CTM')) return {url,status:'inaccessible',httpStatus:404};
  if(url===policyURL) return {url,status:'available',title:'ICON Plc: AI Usage Policy for Job Applicants',text:"Acceptable Uses of AI Research Assistance. Unacceptable Uses of AI Misrepresentation Submitting AI-generated content that inaccurately portrays one's skills, experiences, or qualifications. Live Interview Assistance Relying on AI tools during live interviews to generate responses in real-time.",policyLinks:[]};
  if(url===input.jobUrl)return {url,status:'available',title:`${input.role} job | ICON`,text:`Minimum of ${publicMinimum} year${publicMinimum===1?'':'s'} of independent monitoring experience. Willingness to travel as required (approximately 60%). These are controlled source fixtures, not live research.`,policyLinks:[policyURL]};
  return {url,status:'available',title:'ICON careers',text:'Controlled employer careers page used only for observed policy discovery.',policyLinks:[policyURL]};
};}
export async function fixtureStages(index=0) {
  const input={...cases[index],...consent,packageId:index?'interview':'application'},job=extractJob(input),candidate=extractCandidate(input);
  const research=await researchEmployer(input,job,{load:sourceDouble(input),now:()=> '2026-10-29T00:00:00Z'});
  const interpretation=interpretCompetencies(job,candidate),practice=practiceLibrary(job,candidate),format=selectionFormat(interpretation,practice,input.packageId);
  const priority_ids=format.schema.properties.priority_ids.items.enum.slice(0,3),selection={priority_ids,action_ids:priority_ids,practice_ids:index?practice.slice(0,3).map(p=>p.id):[]};
  const stages={job,candidate,research,interpretation,practice,selection};
  const draft=compileReport(input,stages,'2026-10-29T00:00:00Z');
  return {input,stages,draft};
}
test('job extraction preserves exact atomic requirements and separates CTM mentoring from CTMS systems',()=>{
  for(const input of cases)for(const unit of extractJob(input).units){assert.ok(input.jd.includes(unit.text));assert.ok(input.jd.includes(unit.sourceSentence));}
  const job=extractJob(cases[1]);
  assert.equal(job.units.find(j=>j.competency==='ctm_tenure').minimumMonths,24);
  assert.equal(job.units.find(j=>j.competency==='total_experience').minimumMonths,96);
  assert.equal(job.units.find(j=>j.competency==='ctm_mentoring').classification,'preferred');
  assert.equal(competency('CTMS administration'),'systems');assert.equal(competency('mentoring other CTMs'),'ctm_mentoring');
  assert.ok(!job.units.some(j=>j.text.includes('Associate CTM duties must not')));
});
test('CRC, CRA and Associate CTM durations remain distinct; aggregate months do not become competency duration',()=>{
  const a=extractCandidate(cases[0]),b=extractCandidate(cases[1]);
  assert.deepEqual(a.roles.map(r=>[r.family,r.months]),[['crc',24],['cra',18]]);
  assert.deepEqual(b.roles.map(r=>[r.family,r.months]),[['crc',48],['cra',36],['associate_ctm',18]]);
  assert.equal(a.listedClinicalRoleMonths,42);assert.equal(b.listedClinicalRoleMonths,102);
  assert.equal(a.independentMonitoringMonths,null);assert.equal(b.independentMonitoringMonths,null);assert.equal(b.accountableCtmMonths,null);
});
test('only explicitly quantified affirmative independent-monitoring evidence supplies a duration',()=>{
  assert.equal(extractCandidate({...cases[0],cv:cases[0].cv+' I have 18 months of independent monitoring experience.'}).independentMonitoringMonths,18);
  assert.equal(extractCandidate({...cases[0],cv:cases[0].cv+' No 18 months of independent monitoring experience is established.'}).independentMonitoringMonths,null);
  assert.equal(extractCandidate({...cases[0],cv:'I did not have three years as a CRA.'}).roles.length,0);
});
test('budget exposure, study participation and CRA follow-up do not create ownership, start-up or mentoring claims',()=>{
  const c=extractCandidate(cases[1]);
  assert.ok(c.facts.budgetSupport.length);assert.equal(c.facts.budgetOwnership.length,0);assert.equal(c.facts.startupParticipation.length,0);assert.equal(c.facts.endToEndOwnership.length,0);assert.equal(c.facts.craMentoring.length,0);assert.equal(c.facts.ctmMentoring.length,0);
  const explicit=extractCandidate({...cases[1],cv:cases[1].cv+' Owned the clinical budget and approved budget changes. Supported study start-up.'});
  assert.ok(explicit.facts.budgetOwnership.length);assert.ok(explicit.facts.startupParticipation.length);assert.equal(explicit.facts.endToEndOwnership.length,0);
});
test('clinical rules retain 8.5-year arithmetic without qualifying CTM tenure or a false below-preference conclusion',()=>{
  const c=extractCandidate(cases[1]),r=interpretCompetencies(extractJob(cases[1]),c);
  assert.match(r.cards.find(k=>k.competency==='total_experience').finding,/102 months \(8.5 years\)/);
  assert.match(r.cards.find(k=>k.competency==='monitoring_tenure').finding,/does not establish 24 months/);
  assert.equal(r.cards.find(k=>k.competency==='end_to_end').classification,'preferred');
  assert.ok(!r.cards.some(k=>/less than eight|below preferred|meets.*monitoring minimum/i.test(k.finding)));
});
test('actual-source inspection finds policy after a broken target and flags contradictory public minimums',async()=>{
  const r=await researchEmployer(cases[1],extractJob(cases[1]),{load:sourceDouble(cases[1])});
  assert.equal(r.sources.find(s=>s.kind==='target_job').status,'inaccessible');assert.ok(r.facts.some(f=>f.key==='applicant_ai_policy'));assert.ok(!r.facts.some(f=>f.key==='monitoring_minimum'));
  const conflict=await researchEmployer(cases[0],extractJob(cases[0]),{load:sourceDouble(cases[0],{publicMinimum:2})});assert.ok(conflict.conflicts.some(c=>c.includes('disagree')));
});
test('independent validation checks both compiled cases and leaves human checkpoints pending',async()=>{
  for(const index of [0,1]){const {input,stages,draft}=await fixtureStages(index);const audit=validateIndependentClaims(draft,input,stages);assert.deepEqual(audit.errors,[]);assert.equal(audit.humanReview.status,'pending');assert.ok(audit.claims.length>30);assert.equal(draft.analysis.interview_map.length,index?3:0);}
});
test('final-output tampering is rejected independently of the extraction and compiler stages',async()=>{
  const mutations=[d=>d.analysis.target.role+=' Senior',d=>d.durationSummary.listedRoleYears=7.5,d=>d.analysis.evidence_map[0].candidate_quotes=['Certified to work in every clinical trial system.'],d=>d.analysis.executive_verdict.summary='The candidate meets every requirement.',d=>d.analysis.positioning_strategy.top_changes[0].change='Claim global trial leadership.'];
  for(const mutate of mutations){const {input,stages,draft}=await fixtureStages(1);mutate(draft);assert.equal(validateIndependentClaims(draft,input,stages).passed,false);}
});
test('forged underlying duration operands and invented employer statements cannot pass',async()=>{
  let f=await fixtureStages(1);f.stages.candidate.roles[0].months=12;assert.equal(validateIndependentClaims(f.draft,f.input,f.stages).passed,false);
  f=await fixtureStages(0);f.draft.analysis.company_intelligence[0].finding='ICON guarantees a hiring interview.';assert.equal(validateIndependentClaims(f.draft,f.input,f.stages).passed,false);
});
test('model selection is ID-only and cannot replace factual prose or omit the complete requirement register',async()=>{
  const {input,stages,draft}=await fixtureStages(0);stages.selection.candidate_fact='18 months independent monitoring';assert.equal(validateIndependentClaims(draft,input,stages).passed,false);
  delete stages.selection.candidate_fact;draft.fullRequirementRegister.pop();assert.equal(validateIndependentClaims(draft,input,stages).passed,false);
});
test('practice plans keep unsupported start-up hypothetical and preserve reported review/budget limits',async()=>{
  const {stages}=await fixtureStages(1);
  assert.match(stages.practice.find(p=>p.id==='P-startup').plan,/not documented|hypothetical/);
  assert.match(stages.practice.find(p=>p.id==='P-budget').plan,/Do not claim negotiation/);
  assert.ok(stages.practice.find(p=>p.id==='P-quality').candidateIds.length);
});
test('the existing backend can invoke the preview profile with one ranking call and no research model call',async()=>{
  const input={...cases[0],...consent,packageId:'application'},requests=[];
  const fetchImpl=async(_url,req)=>{const body=JSON.parse(req.body);requests.push(body);const schema=body.text.format.schema.properties,priority_ids=schema.priority_ids.items.enum.slice(0,3);return {ok:true,json:async()=>({status:'completed',id:'fictional-ranking-only',output_text:JSON.stringify({priority_ids,action_ids:priority_ids,practice_ids:[]}),usage:{input_tokens:100,output_tokens:50}})};};
  const env={FMG_ENGINE_PROFILE:'evidence-first-feasibility',FMG_AI_ENABLED:'true',FMG_AI_PROFILE:'free-credit-validation',VERCEL_ENV:'preview',VERCEL_OIDC_TOKEN:'fictional'};
  const report=await runIntelligence(input,{env,fetchImpl,sourceLoader:sourceDouble(input)});assert.equal(report.engineVersion,'0.4.0-evidence-first');assert.equal(requests.length,1);assert.equal(requests[0].tools,undefined);assert.deepEqual(report.qualityFlags,[]);assert.equal(report.humanReview.status,'pending');
  await assert.rejects(runIntelligence(input,{env:{...env,VERCEL_ENV:'production'},fetchImpl}),/preview/);assert.equal(requests.length,1);
});
test('a human clinical-review attestation is required; fixture attestation is not actual human evidence',()=>{
  const order={status:'review_required',draft:{engineVersion:'0.4.0-evidence-first',qualityFlags:[],humanReview:{status:'pending'}},history:[]};
  const review={reviewer:'Fictional test reviewer',note:'Controlled fixture only, not a real clinical review.',checks:Object.fromEntries(REVIEW_CHECKS.map(k=>[k,true]))};
  assert.throws(()=>approveReport(order,review,'2026-10-29T00:00:00Z'),/human clinical reviewer/);
  const attested=approveReport(order,{...review,humanClinicalReviewerAttestation:true},'2026-10-29T00:00:00Z');assert.equal(attested.draft.humanReview.status,'attested');
});
