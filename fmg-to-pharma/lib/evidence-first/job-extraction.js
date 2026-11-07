import {createHash} from 'node:crypto';
import {requirementKind} from '../evidence-contract.js';
export const numeric=value=>({one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12}[String(value).toLowerCase()] ?? Number(value));
export const sentences=text=>[...new Intl.Segmenter('en',{granularity:'sentence'}).segment(text)].map(s=>s.segment.trim()).filter(Boolean);
export function competency(text) {
  if(/\bCTMS\b/.test(text)) return 'systems';
  const rules=[
    ['independent_monitoring_tenure',/independent monitoring experience/i],
    ['ctm_tenure',/years? (?:in|as).*CTM (?:position|role)|years? in a CTM/i],
    ['total_experience',/years? of relevant experience/i],['education',/bachelor|degree/i],
    ['gcp',/ICH.GCP knowledge|GCP adherence|protocol.*GCP/i],
    ['qualification_visit',/qualification/i],['initiation_visit',/\binitiation\b/i],
    ['routine_monitoring',/routine monitoring/i],['closeout',/close-out/i],
    ['systems',/clinical.trial systems|\bEDC\b|\beTMF\b/i],['data_quality',/data quality|trial records/i],
    ['budget_oversight',/clinical budget/i],['monitoring_plan',/monitoring plans/i],
    ['cra_mentoring',/CRA training|mentoring.*CRAs?/i],['ctm_mentoring',/mentoring other CTMs/i],
    ['startup',/study start-up|enrollment timelines/i],['end_to_end',/start-up through database-lock/i],
    ['global_trial',/global trial/i],['trip_review',/trip-report review/i],
    ['capa',/corrective|preventive|CAPA/i],['stakeholders',/sponsor\/vendor|cross-functional relationships/i],
    ['monitoring_tenure',/years? of monitoring/i],['travel',/\btravel\b/i],
  ];
  return rules.find(([,re])=>re.test(text))?.[0] || 'manual_interpretation';
}
export function extractJob(intake) {
  const units=[];
  for(const sentence of sentences(intake.jd)) {
    const kind=requirementKind(sentence);
    // These are test/editorial instructions, never employer requirements.
    if(kind==='context') continue;
    const pieces=sentence.split(/,\s+|;\s+|\s+and\s+(?=at least|ICH.GCP|mentoring other|close-out)/i);
    for(const text of pieces) {
      if(!text.trim())continue;
      const duration=text.match(/\b(\d+(?:\.\d+)?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(years?|months?)\b/i);
      units.push({id:`J${units.length+1}`,text:text.trim(),classification:kind,sourceSentence:sentence,competency:competency(text),
        minimumMonths:duration?numeric(duration[1])*(duration[2].toLowerCase().startsWith('year')?12:1):null,
        provenance:'supplied_job_description'});
    }
  }
  return {company:intake.company,role:intake.role,original:intake.jd,sha256:createHash('sha256').update(intake.jd).digest('hex'),units};
}
