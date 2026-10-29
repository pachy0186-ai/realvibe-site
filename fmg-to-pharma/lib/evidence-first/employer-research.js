import {verifySources,readPublicPage,normalize} from '../source-verifier.js';
import {numeric} from './job-extraction.js';
export async function researchEmployer(intake,job,{load=readPublicPage,now=()=>new Date().toISOString()}={}) {
  const sources=await verifySources([],intake.jobUrl,{load,now}),facts=[],conflicts=[];
  for(const s of sources) {
    if(s.status!=='available'||!s.employerDomainMatch) continue;
    const add=(key,quote,claim,implication,context=quote)=>facts.push({id:`E${facts.length+1}`,key,sourceId:s.id,url:s.url,quote,claim,implication,context,checkedAt:s.checkedAt,provenance:'verified_employer_source'});
    if(s.kind==='target_job'&&s.url===intake.jobUrl) {
      const titleMatch=normalize(s.title).toLowerCase().includes(normalize(intake.role).toLowerCase());
      if(!titleMatch) {conflicts.push('The exact public-posting title could not be matched; no employer role facts were compiled from it.');continue;}
      const minimum=s.text.match(/Minimum of (\d+|one|two|three|four|five) years? of independent monitoring experience[.]?/i);
      if(minimum) {
        add('monitoring_minimum',minimum[0],'The inspected exact target posting states an independent-monitoring minimum.','Confirm actual independent-monitoring dates instead of substituting CRA or CRC role tenure.');
        const supplied=job.units.find(j=>j.competency==='independent_monitoring_tenure');
        if(supplied&&supplied.minimumMonths!==numeric(minimum[1])*12) conflicts.push('The supplied JD and inspected target posting disagree on the independent-monitoring minimum.');
      }
      const travel=s.text.match(/Willingness to travel as required \(approximately \d+%\)/i);
      if(travel) add('travel_constraint',travel[0],'The inspected exact target posting states a travel expectation.','Check personal travel availability against the exact opportunity before applying.');
    }
    if(s.kind==='applicant_ai_policy') {
      const section=s.text.indexOf('Unacceptable Uses of AI');
      const match=s.text.match(/inaccurately portrays one's skills, experiences, or qualifications/i);
      if(section>=0&&match&&match.index>section) add('applicant_ai_policy',match[0],'The inspected applicant AI policy restricts misrepresentation of skills or experience.','Use only supported responsibilities in preparation and read the full policy, including its conditions on generated application material and live assistance.',s.text.slice(section,Math.min(s.text.length,section+1800)));
      else conflicts.push('An applicant AI policy was inspected, but its relevant restrictions need human interpretation; no automated restriction claim was compiled.');
    }
  }
  return {sources,facts,conflicts,scope:'Direct exact-job inspection plus observed employer-policy discovery. No claim of confidential hiring knowledge or deep competitive company research.'};
}
