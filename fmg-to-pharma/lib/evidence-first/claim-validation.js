import {createHash} from 'node:crypto';
import {CAREER_DECISION,actionReason} from './recommendation-generation.js';
// This stage reads original input and inspected pages, not model opinions.
export function validateIndependentClaims(draft,input,{job,candidate,research,interpretation,practice,selection}) {
  const errors=[],audit=[];const check=(id,type,text,ok,evidence,limitation='')=>{audit.push({id,type,text,passed:!!ok,evidence,limitation});if(!ok)errors.push(`${id}: independent evidence check failed.`);};
  check('target','target',draft.analysis.target,draft.analysis.target.company===input.company&&draft.analysis.target.role===input.role,{company:input.company,role:input.role});
  check('jd-hash','input_integrity',job.sha256,job.sha256===createHash('sha256').update(input.jd).digest('hex'),{original:'supplied JD'});
  check('cv-hash','input_integrity',candidate.sha256,candidate.sha256===createHash('sha256').update(input.cv).digest('hex'),{original:'supplied CV'});
  check('decision-text','registered_recommendation',draft.analysis.executive_verdict,draft.analysis.executive_verdict.summary===CAREER_DECISION.summary&&draft.analysis.executive_verdict.recommendation===CAREER_DECISION.recommendation,{registry:'CAREER_DECISION'});
  for(const j of job.units) {
    const expectedPreferred=/\bpreferred\b/i.test(j.sourceSentence);
    const expectedMandatory=/\b(requests?|requires?|required|must|minimum|mandatory)\b/i.test(j.sourceSentence)&&!expectedPreferred;
    const classificationOK=j.classification==='mixed_requires_review'?false:expectedPreferred?j.classification==='preferred':expectedMandatory?j.classification==='mandatory':true;
    check(j.id,'job_requirement',j.text,input.jd.includes(j.text)&&input.jd.includes(j.sourceSentence)&&classificationOK,{classification:j.classification,sourceSentence:j.sourceSentence},'This is the supplied JD, not a claim the public vacancy is open.');
  }
  const wordNumbers={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12};
  for(const r of candidate.roles) {
    const parsed=r.quote.match(/^(\d+(?:\.\d+)?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(years?|months?)\s+as\b/i);
    const months=parsed?(wordNumbers[parsed[1].toLowerCase()]??Number(parsed[1]))*(parsed[2].toLowerCase().startsWith('year')?12:1):NaN;
    check(r.id,'reported_role_duration',r.quote,input.cv.includes(r.quote)&&months===r.months,{value:r.value,unit:r.unit,months:r.months,family:r.family},'Job-title tenure is not independent-monitoring or qualifying CTM tenure.');
  }
  const sum=candidate.roles.filter(r=>r.family!=='other').reduce((n,r)=>n+r.months,0);
  check('sum','derived_arithmetic',`${sum} stated months / 12 = ${sum/12} years`,sum===candidate.listedClinicalRoleMonths,{operands:candidate.roles.filter(r=>r.family!=='other').map(r=>r.id)},'Overlaps and employer relevance are unverified.');
  check('displayed-duration-summary','derived_arithmetic',draft.durationSummary,draft.durationSummary.listedRoleMonths===sum&&draft.durationSummary.listedRoleYears===sum/12&&draft.durationSummary.independentMonitoringMonths===candidate.independentMonitoringMonths&&draft.durationSummary.qualifyingCtmMonths===null,{source:'validated role-duration operands'});
  if(candidate.independentMonitoringMonths!==null) {
    const valid=candidate.independentMonitoringDurations.length===1&&candidate.independentMonitoringDurations.every(d=>input.cv.includes(d.quote)&&/of independent monitoring/i.test(d.quote));
    check('independent-duration','candidate_competency_duration',candidate.independentMonitoringMonths,valid,{excerpts:candidate.independentMonitoringDurations});
  } else check('independent-duration','unknown',null,true,{reason:'No explicitly quantified independent monitoring period.'});
  check('qualifying-ctm-duration','unknown',candidate.accountableCtmMonths,candidate.accountableCtmMonths===null,{reason:'No employer-confirmed qualifying CTM tenure is supplied.'});
  for(const c of interpretation.cards) {
    const j=job.units.find(j=>j.id===c.jobId);
    const quotes=c.candidateIds.map(id=>candidate.units.find(u=>u.id===id)?.text);
    check(c.id,'clinical_interpretation',c.finding,!!j&&quotes.every(q=>q&&input.cv.includes(q)),{jobId:c.jobId,classification:c.classification,candidateIds:c.candidateIds,rule:c.competency},'Rule-based interpretation requires independent human clinical review.');
    if(c.coverage==='reported_evidence'&&['budget_oversight','startup','end_to_end','cra_mentoring','ctm_mentoring','qualification_visit','initiation_visit'].includes(c.competency)) {
      const positives=quotes.flatMap(q=>q.split(/;|\bbut\b/i)).filter(q=>! /\b(no|not|never|without)\b/i.test(q));
      const semantic={budget_oversight:/\bowned|approval authority|sign-off authority/i,startup:/start.up/i,end_to_end:/\b(?:led|owned|accountable for)\b.*(?:end.to.end|start.up through database.lock)/i,cra_mentoring:/(mentored|trained|coached).*CRA/i,ctm_mentoring:/(mentored|managed|trained).*CTM/i,qualification_visit:/independently.*qualification/i,initiation_visit:/independently.*initiation/i}[c.competency];
      check(`${c.id}-ownership`,'ownership_support',c.coverage,positives.some(q=>semantic.test(q)),{candidateIds:c.candidateIds});
    }
  }
  for(const f of research.facts) {
    const source=research.sources.find(s=>s.id===f.sourceId);
    const permitted=source?.status==='available'&&source.employerDomainMatch&&['target_job','applicant_ai_policy'].includes(source.kind);
    const match=permitted&&source.text.replace(/\s+/g,' ').includes(f.quote.replace(/\s+/g,' '));
    const policyRelevant=f.key==='applicant_ai_policy'&&source?.kind==='applicant_ai_policy'&&source.text.indexOf('Unacceptable Uses of AI')>=0&&source.text.indexOf(f.quote)>source.text.indexOf('Unacceptable Uses of AI');
    const roleRelevant=['monitoring_minimum','travel_constraint'].includes(f.key)&&source?.kind==='target_job'&&source.url===input.jobUrl&&source.title.toLowerCase().includes(input.role.toLowerCase());
    check(f.id,'employer_fact',f.claim,match&&(policyRelevant||roleRelevant)&&f.quote.split(/\s+/).length<=25,{sourceId:f.sourceId,url:f.url,contentSHA256:source?.contentSHA256,quote:f.quote,checkedAt:f.checkedAt},'An excerpt supports its limited claim, not private hiring practices.');
  }
  for(const [i,f] of draft.analysis.company_intelligence.entries()) {
    const source=research.facts.find(x=>x.id===f.factId);
    check(`displayed-employer-${i+1}`,'compiled_employer_claim',f.finding,!!source&&f.finding===source.claim&&f.why_it_matters===source.implication&&f.source_quote===source.quote,{factId:f.factId});
  }
  for(const [i,f] of draft.analysis.critical_findings.entries()) {
    const card=interpretation.cards.find(c=>c.id===selection.priority_ids[i]);
    check(`finding-${i+1}`,'compiled_interpretation',f.interpretation,!!card&&f.interpretation===card.finding&&!/\b(meets?|qualified|eligible|below|above)\b/i.test(f.heading),{ruleId:card?.id});
  }
  for(const row of [...draft.analysis.evidence_map,...draft.fullRequirementRegister]) {
    const card=interpretation.cards.find(c=>c.id===row.id);
    check(`display-${row.id}`,'displayed_evidence',row.driver,!!card&&input.jd.includes(row.driver)&&row.candidate_quotes.every(q=>input.cv.includes(q))&&row.risk===card.finding&&row.action===card.action&&row.classification===card.classification,{jobId:row.jobId,candidateIds:card?.candidateIds});
  }
  for(const [i,action] of draft.analysis.positioning_strategy.top_changes.entries()) {
    const card=interpretation.cards.find(c=>c.id===action.ruleId);
    check(`action-${i+1}`,'registered_action',action.change,!!card&&action.change===card.action&&action.why===actionReason(card),{ruleId:action.ruleId});
  }
  if(research.conflicts.length) errors.push(...research.conflicts);
  const allowed=Object.keys(selection).sort().join(',')==='action_ids,practice_ids,priority_ids';
  const validIDs=(ids,values,min,max)=>Array.isArray(ids)&&ids.length>=min&&ids.length<=max&&new Set(ids).size===ids.length&&ids.every(id=>values.includes(id));
  const cards=interpretation.cards.map(c=>c.id);
  check('selection','recommendation_selection',selection,allowed&&validIDs(selection.priority_ids,cards,3,3)&&validIDs(selection.action_ids,cards,3,4)&&selection.priority_ids.every(id=>selection.action_ids.includes(id))&&validIDs(selection.practice_ids,practice.map(p=>p.id),input.packageId==='application'?0:3,input.packageId==='application'?0:4),{allowedCardIds:cards});
  const mapped=draft.fullRequirementRegister.map(r=>r.jobId);
  check('complete-register','requirement_completeness',mapped,job.units.every(j=>mapped.includes(j.id)),{expected:job.units.map(j=>j.id)});
  for(const p of draft.analysis.interview_map) {const registered=practice.find(v=>v.id===p.id);check(p.id,'inferred_practice',p.question,p.provenance==='inference'&&registered?.question===p.question&&registered?.plan===p.answer_strategy,{candidateIds:p.candidateIds,jobIds:p.jobIds},'Practice theme only; no employer question or past candidate event is asserted.');}
  return {passed:errors.length===0,errors:[...new Set(errors)],claims:audit,humanReview:{status:'pending',reviewer:null,reviewedAt:null,checkpoints:['Candidate truth and negation','Requirement classification and completeness','Role/competency duration and ownership','Material source support and relevance','Recommendation usefulness and safe practice','Readability and package scope']}};
}
