import {createHash} from 'node:crypto';
import {numeric,sentences} from './job-extraction.js';
const durationPattern=/\b(\d+(?:\.\d+)?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(years?|months?)\s+as\s+/gi;
function roleFamily(text) {
  if(/Associate\s+CTM|Assistant\s+CTM/i.test(text)) return 'associate_ctm';
  if(/\bCTM\b|Clinical Trial Manager/i.test(text)) return 'ctm';
  if(/\bCRC\b|Clinical Research Coordinator/i.test(text)) return 'crc';
  if(/\bCRA\b|Clinical Research Associate/i.test(text)) return 'cra';
  return 'other';
}
export function extractCandidate(intake) {
  const units=sentences(intake.cv).map((text,i)=>({id:`C${i+1}`,text,provenance:'candidate_provided'})),roles=[];
  for(const unit of units) {
    const matches=[...unit.text.matchAll(durationPattern)];
    matches.forEach((m,i)=>{
      const prefix=unit.text.slice(0,m.index).split(/;|\bbut\b/i).at(-1);
      if(/\b(no|not|never)\b/i.test(prefix)) return;
      let end=i+1<matches.length?matches[i+1].index:unit.text.length;
      let quote=unit.text.slice(m.index,end).replace(/(?:,\s*|\s+(?:and|followed by)\s*)+$/i,'').trim();
      const roleText=quote.slice(m[0].length).replace(/[.]$/,'');
      roles.push({id:`T${roles.length+1}`,sourceId:unit.id,quote,role:roleText,family:roleFamily(roleText),value:numeric(m[1]),unit:m[2].toLowerCase().startsWith('year')?'years':'months',months:numeric(m[1])*(m[2].toLowerCase().startsWith('year')?12:1)});
    });
  }
  const clauses=units.flatMap(unit=>unit.text.split(/;\s*|\s+but\s+/i).map(text=>({sourceId:unit.id,text,negative:/\b(no|not|never|without)\b/i.test(text)})));
  const positive=re=>[...new Set(clauses.filter(c=>!c.negative&&re.test(c.text)).map(c=>c.sourceId))];
  const any=re=>units.filter(c=>re.test(c.text)).map(c=>c.id);
  const facts={
    education:positive(/\bBSc\b|bachelor|MBBS|medical degree/i),
    independentMonitoringActivity:positive(/independently (?:performed|conducted|completed).*monitoring|independently monitored/i),
    routineMonitoring:positive(/routine monitoring/i),
    independentQualification:positive(/independently (?:performed|conducted|owned).*qualification/i),
    independentInitiation:positive(/independently (?:performed|conducted|owned).*initiation/i),
    closeoutSupport:positive(/supported.*close-out/i),
    independentCloseout:positive(/independently (?:performed|conducted|owned).*close-out/i),
    gcpTraining:positive(/ICH.GCP training/i),
    dataQuality:positive(/tracked.*queries|escalated.*documentation/i),
    systems:positive(/(?:used|maintained|administered).*(?:CTMS|EDC|eTMF|Rave)/i),
    budgetSupport:positive(/supported.*budget|budget exposure/i),
    budgetOwnership:positive(/\b(owned|approved|accountable for).*budget|budget.*(?:approval authority|sign-off authority)/i),
    startupParticipation:positive(/(?:supported|participated|coordinated|led|owned).*start.up/i),
    endToEndOwnership:positive(/(?:led|owned|accountable for).*(?:end.to.end|start.up through database.lock)/i),
    globalLeadership:positive(/(?:led|owned|accountable for).*global (?:trial|study)/i),
    craMentoring:positive(/(?:mentored|trained|coached)\s+(?:other\s+)?CRAs?\b/i),
    ctmMentoring:positive(/(?:mentored|managed|trained)\s+(?:other\s+)?CTMs?\b/i),
    tripReview:positive(/reviewed trip reports/i),
    capaOwnership:positive(/(?:owned|led|authored).*CAPA|(?:corrective|preventive) action/i),
    stakeholderWork:positive(/coordinated CRA follow.up|prepared meeting summaries/i),
    travel:positive(/(?:willing|able|available).*travel|travel.*(?:willing|available)/i),
    authorization:positive(/(?:reports|has|holds).*work authorization/i),
    explicitLimitations:any(/\b(no|not|never)\b/i),
  };
  const durations=[];
  for(const c of clauses) if(!c.negative) {
    const m=c.text.match(/\b(\d+(?:\.\d+)?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(years?|months?)\s+of independent monitoring/i);
    if(m) durations.push({sourceId:c.sourceId,quote:m[0],months:numeric(m[1])*(m[2].toLowerCase().startsWith('year')?12:1)});
  }
  const clinicalRoles=roles.filter(r=>r.family!=='other');
  return {original:intake.cv,sha256:createHash('sha256').update(intake.cv).digest('hex'),units,roles,facts,
    listedClinicalRoleMonths:clinicalRoles.reduce((s,r)=>s+r.months,0),
    independentMonitoringDurations:durations,
    independentMonitoringMonths:durations.length===1?durations[0].months:null,
    accountableCtmMonths:null,
    durationCaveat:'The arithmetic sums stated role durations only. Overlaps, employer relevance, independent monitoring duration and qualifying CTM tenure require separate confirmation.'};
}
