import {createHash} from 'node:crypto';
import {normalize} from './source-verifier.js';
import {ensure} from './pilot-domain.js';

export function requirementKind(text) {
  if (/^Evaluate\b|^Assess\b|must not|require.*confirmation|^This paraphrase|^QA paraphrase/i.test(text)) return 'context';
  if (/\bpreferred\b/i.test(text) && /\b(requires?|required|must|mandatory)\b/i.test(text)) return 'mixed_requires_review';
  if (/\bpreferred\b/i.test(text)) return 'preferred';
  if (/\b(requires?|required|requests?|must|minimum|mandatory)\b/i.test(text) && !/must not|require.*confirmation|evaluate mandatory/i.test(text)) return 'mandatory';
  if (/responsibilit|duties|include|oversight|monitoring plans|review|training|mentoring|timelines|relationships|corrective|preventive/i.test(text)) return 'responsibility';
  if (/\b(travel|work authorization|location)\b/i.test(text)) return 'constraint';
  return 'context';
}
const sentences = value => [...new Intl.Segmenter('en',{granularity:'sentence'}).segment(value)].map(s=>s.segment.trim()).filter(Boolean);
export function evidenceCatalogue(intake) {
  const jobs=[];
  for (const sentence of sentences(intake.jd)) {
    const kind = requirementKind(sentence);
    // Preserve exact input substrings. Inherit qualifiers from the whole sentence,
    // so a comma-separated preferred list cannot become a mandatory criterion.
    const parts = kind==='context' ? [sentence] : sentence.split(/,\s+|;\s+/);
    for (const text of parts) if(text.trim()) jobs.push({id:`J${jobs.length+1}`,text:text.trim(),kind});
  }
  const candidates=sentences(intake.cv).map((text,index)=>({id:`C${index+1}`,text}));
  return {company:intake.company,role:intake.role,jd:intake.jd,cv:intake.cv,jdSHA256:createHash('sha256').update(intake.jd).digest('hex'),cvSHA256:createHash('sha256').update(intake.cv).digest('hex'),jobs,candidates};
}
export function qualityOutputFormat(catalogue,sources,packageId) {
  const text = maxLength=>({type:'string',maxLength});
  const list=(items,minItems,maxItems)=>({type:'array',items,minItems,maxItems});
  const obj=properties=>({type:'object',properties,required:Object.keys(properties),additionalProperties:false});
  const jobIDs=catalogue.jobs.filter(j=>j.kind!=='context').map(j=>j.id);
  ensure(jobIDs.length>=3,'The supplied description needs at least three explicit criteria or responsibilities.');
  const ids={job:{type:'string',enum:jobIDs},candidate:{type:'string',enum:catalogue.candidates.map(c=>c.id)},source:{type:'string',enum:sources.filter(s=>s.status==='available'&&s.employerDomainMatch).map(s=>s.id)}};
  const references=obj({job_ids:list(ids.job,1,3),candidate_ids:list(ids.candidate,0,3)});
  const fact=obj({source_id:ids.source,quote:text(450),interpretation:text(230)});
  const requirements=obj({job_id:ids.job,candidate_ids:list(ids.candidate,0,3),coverage:{type:'string',enum:['supported','partial','not_established']},interpretation:text(220),next_action:text(230)});
  const practice=obj({question:text(180),competency:text(80),candidate_ids:list(ids.candidate,0,2),answer_plan:text(300),missing_evidence:text(170)});
  const schema=obj({target:obj({company:{type:'string',enum:[catalogue.company]},role:{type:'string',enum:[catalogue.role]}}),
    decision:obj({recommendation:{type:'string',enum:['Apply','Clarify eligibility first','Lower priority']},interpretation:text(350)}),
    critical_findings:list(obj({heading:text(70),interpretation:text(230),references}),3,3),
    requirements:list(requirements,3,6),employer_facts:list(fact,0,3),
    actions:list(obj({action:text(220),reason:text(160),references}),3,4),
    practice:list(practice,packageId==='interview'?3:0,packageId==='interview'?4:0),
    clarification_questions:list(obj({question:text(180),reason:text(150)}),1,4)});
  if(!ids.source.enum.length) {schema.properties.employer_facts.maxItems=0;fact.properties.source_id={type:'string'};}
  return {type:'json_schema',name:'fmg_evidence_bound_report',strict:true,schema};
}
export function validateQuality(raw,catalogue,sources,packageId) {
  assertContract(raw,qualityOutputFormat(catalogue,sources,packageId).schema);
  const flags=[],claims=[];const candidate=new Map(catalogue.candidates.map(c=>[c.id,c]));const jobs=new Map(catalogue.jobs.map(j=>[j.id,j]));
  const add=(id,type,claim,evidence,status)=>claims.push({id,type,claim,evidence,status});
  if(raw.target?.company!==catalogue.company||raw.target?.role!==catalogue.role) flags.push('Exact target changed.');
  ensure(raw.critical_findings?.length===3 && raw.requirements?.length>=3 && raw.requirements.length<=6 && raw.actions?.length>=3 && raw.actions.length<=4,'Report structure or concision limits failed.');
  const refs=(reference,id)=>{
    ensure(reference && Array.isArray(reference.job_ids) && reference.job_ids.length && Array.isArray(reference.candidate_ids),'Missing evidence references.');
    for(const jid of reference.job_ids) if(!jobs.has(jid)||jobs.get(jid).kind==='context') flags.push('Unknown requirement reference.');
    for(const cid of reference.candidate_ids) if(!candidate.has(cid)) flags.push('Unknown candidate reference.');
    add(id,'professional_interpretation','References identify the inputs for this interpretation.',reference,'semantic_review_required');
  };
  for(const [i,item] of raw.critical_findings.entries()) refs(item.references,`F${i+1}`);
  const used=new Set();
  for(const [i,item] of raw.requirements.entries()) {
    const job=jobs.get(item.job_id);if(!job||job.kind==='context') flags.push('Unknown requirement reference.');
    if(job?.kind==='mixed_requires_review') flags.push('Mixed mandatory/preferred wording requires source clarification.');
    if(used.has(item.job_id)) flags.push('Repeated requirement instead of distinct decision drivers.');used.add(item.job_id);
    if(!['supported','partial','not_established'].includes(item.coverage)) flags.push('Invalid evidence coverage.');
    if(item.coverage==='supported'&&!item.candidate_ids?.length) flags.push('Supported criterion has no candidate evidence.');
    if(item.coverage==='supported' && item.candidate_ids?.some(id=>/\b(no|not|never)\b/i.test(candidate.get(id)?.text || ''))) flags.push('Negative or missing evidence cannot establish full coverage.');
    for(const id of item.candidate_ids || []) if(!candidate.has(id)) flags.push('Unknown candidate reference.');
    if(job?.kind==='preferred' && /\b(mandatory|must|required)\b/i.test(item.interpretation)) flags.push('Preferred criterion described as mandatory.');
    add(`R${i+1}`,'job_requirement',job?.text,{job_id:item.job_id,classification:job?.kind},job?'exact_input':'failed');
    for(const cid of item.candidate_ids || []) add(`R${i+1}/${cid}`,'candidate_provided',candidate.get(cid)?.text,{candidate_id:cid},candidate.has(cid)?'exact_input':'failed');
  }
  for(const [i,item] of raw.employer_facts.entries()) {
    const source=sources.find(s=>s.id===item.source_id);
    const matched=source?.status==='available' && source.employerDomainMatch && normalize(item.quote).length>=30 && normalize(source.text).includes(normalize(item.quote));
    if(!matched) flags.push('Employer excerpt is not supported by an available inspected source.');
    if(item.quote.trim().split(/\s+/).length>25) flags.push('Employer excerpt exceeds the short quotation limit.');
    if(raw.employer_facts.slice(0,i).some(f=>f.source_id===item.source_id)) flags.push('Use only one short excerpt per employer source.');
    add(`S-F${i+1}`,'employer_source_excerpt',item.quote,{source_id:item.source_id,url:source?.url,checkedAt:source?.checkedAt},matched?'exact_source_excerpt':'failed');
    add(`S-I${i+1}`,'professional_interpretation',item.interpretation,{source_id:item.source_id},'semantic_review_required');
  }
  for(const [i,item] of raw.actions.entries()) refs(item.references,`A${i+1}`);
  const policy=sources.find(s=>s.kind==='applicant_ai_policy'&&s.status==='available'&&s.employerDomainMatch);
  if(policy && !raw.employer_facts.some(f=>f.source_id===policy.id && /misrepresent|unedited|live interview|assessment|prohibit|unacceptable|must not/i.test(f.quote))) flags.push('Verified applicant AI policy restrictions were not addressed.');
  const generatedWords=JSON.stringify(raw).split(/\s+/).length;
  if(generatedWords>1250) flags.push('Generated report exceeds the concise review limit.');
  ensure(Array.isArray(raw.practice) && (packageId==='application'?raw.practice.length===0:raw.practice.length>=3&&raw.practice.length<=4),'Package deliverable boundary failed.');
  for(const [i,item] of raw.practice.entries()) for(const cid of item.candidate_ids || []) {
    if(!candidate.has(cid)) flags.push('Unknown candidate reference.');
    add(`P${i+1}/${cid}`,'candidate_provided',candidate.get(cid)?.text,{candidate_id:cid},candidate.has(cid)?'exact_input':'failed');
  }
  return {flags:[...new Set(flags)],claims};
}
export function assertContract(value,schema,path='report') {
  if(schema.enum) ensure(schema.enum.includes(value),`${path}: value is outside the evidence-bound enum.`);
  if(schema.type==='string') ensure(typeof value==='string' && value.length<=(schema.maxLength ?? Infinity),`${path}: string or length violation.`);
  if(schema.type==='array') {
    ensure(Array.isArray(value) && value.length>=(schema.minItems ?? 0) && value.length<=(schema.maxItems ?? Infinity),`${path}: array count violation.`);
    value.forEach((v,i)=>assertContract(v,schema.items,`${path}[${i}]`));
  }
  if(schema.type==='object') {
    ensure(value && typeof value==='object' && !Array.isArray(value),`${path}: object required.`);
    ensure(schema.required.every(key=>Object.hasOwn(value,key)),`${path}: required field missing.`);
    ensure(Object.keys(value).every(key=>Object.hasOwn(schema.properties,key)),`${path}: unknown field.`);
    for(const [key,child] of Object.entries(schema.properties)) assertContract(value[key],child,`${path}.${key}`);
  }
}
export function assembleQualityDraft(raw,intake,catalogue,sources,packageId,researchedAt) {
  const audit=validateQuality(raw,catalogue,sources,packageId);
  const candidateText=ids=>ids.map(id=>catalogue.candidates.find(c=>c.id===id)?.text || 'Unresolved evidence reference');
  const analysis={target:{company:intake.company,role:intake.role},
    critical_findings:raw.critical_findings,
    executive_verdict:{recommendation:raw.decision.recommendation,competitiveness:'Professional interpretation',summary:raw.decision.interpretation,reasons_for:[],reasons_against:[]},
    decision_drivers:raw.requirements.map(r=>{const j=catalogue.jobs.find(j=>j.id===r.job_id);return {requirement:j?.text,jd_evidence:j?.text,classification:j?.kind,job_id:r.job_id};}),
    evidence_map:raw.requirements.map(r=>{const j=catalogue.jobs.find(j=>j.id===r.job_id);const quotes=candidateText(r.candidate_ids);return {driver:j?.text,classification:j?.kind,candidate_evidence:quotes.join(' '),candidate_quotes:quotes,strength:{supported:'strong',partial:'partial',not_established:'missing'}[r.coverage],gap_type:r.coverage==='supported'?'none':'evidence_gap',risk:r.interpretation,action:r.next_action};}),
    company_intelligence:raw.employer_facts.map(f=>{const s=sources.find(s=>s.id===f.source_id);return {finding:f.quote,why_it_matters:f.interpretation,provenance:'verified_public',source_urls:[s?.url],source_id:s?.id};}),
    positioning_strategy:{headline:'Prioritize evidence, eligibility and accurate positioning.',top_changes:raw.actions.map((a,i)=>({change:a.action,why:a.reason,rank:i+1,references:a.references})),resume_edits:[]},
    interview_map:raw.practice.map(p=>({question:p.question,competency:p.competency,best_candidate_evidence:candidateText(p.candidate_ids).join(' ') || 'No relevant experience established in intake.',answer_strategy:p.answer_plan,missing_info:p.missing_evidence,avoid:'Do not claim experience or outcomes absent from your intake. Describe a hypothetical approach explicitly when experience is missing.',provenance:'inference'})),
    clarification_questions:raw.clarification_questions.map(q=>({question:q.question,why_needed:q.reason,impact:'Clarify before making application or interview claims.'})),
    source_index:sources.filter(s=>s.status==='available').map(s=>({url:s.url,title:s.title,type:s.kind,date:`Access checked ${s.checkedAt.slice(0,10)}; publication date not independently established`,id:s.id})),
    quality_notes:['Candidate excerpts below are exact intake text, not independently verified employment history.','Recommendations and practice prompts are professional interpretation, not employer promises or confirmed interview questions.'],
  };
  const policy=sources.find(s=>s.kind==='applicant_ai_policy'&&s.status==='available');
  const limits=sources.filter(s=>s.status!=='available').map(s=>`${s.id}: ${s.url} — ${s.status}. Not used as verified evidence.`);
  if(!policy) limits.push('A public applicant AI-use policy could not be verified. This does not establish that no policy exists.');
  return {analysis,qualityFlags:audit.flags,claimAudit:audit.claims,requiresFounderReview:true,engineVersion:'0.3.0-evidence-bound',researchedAt,
    inputIntegrity:{company:intake.company,role:intake.role,jdSHA256:catalogue.jdSHA256,cvSHA256:catalogue.cvSHA256},
    evidenceCatalogue:{jobs:catalogue.jobs,candidates:catalogue.candidates},
    sourceChecks:sources.map(({text,policyLinks,...metadata})=>metadata),policy:policy?{url:policy.url,title:policy.title}:null,
    researchGaps:limits,rawInterpretations:raw};
}
