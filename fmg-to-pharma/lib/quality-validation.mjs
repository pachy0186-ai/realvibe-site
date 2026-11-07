// Explicit one-time preview command, NEVER the normal package build hook.
import {readFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import {auditOnce} from './gateway-audit-once.js';
import {runIntelligence,runBaseline} from './intelligence-engine.js';
import {validationBudget} from './validation-budget.js';
import {CONSENT_VERSION,ensure} from './pilot-domain.js';

const approved=process.argv.includes('--approved-quality-validation');
if (!approved) {console.log('Quality validation disabled: explicit one-time command required.');}
else {
  ensure(process.env.VERCEL_ENV==='preview'&&process.env.VERCEL_GIT_COMMIT_REF==='codex/fmg-pilot-operations-validation','Quality validation is limited to the approved preview branch.');
  const once=await auditOnce(`quality-remediation-20261029:${process.env.VERCEL_DEPLOYMENT_ID || process.env.VERCEL_URL}`,async()=>{
    const result={assignment:'quality-remediation-20261029',testOnly:true,startedAt:new Date().toISOString(),cases:[],baselineProtocol:'Same model, identical candidate/JD and frozen inspected-source packet; same 4500 output-token cap, low reasoning, no synthesis browsing. Measures synthesis and deterministic safeguards, not independent research superiority.'};
    const token=process.env.VERCEL_OIDC_TOKEN;ensure(token,'Preview OIDC identity is required.');
    const env={...process.env,AI_GATEWAY_API_KEY:'',FMG_AI_ENABLED:'true',FMG_AI_PROFILE:'free-credit-validation',FMG_RESEARCH_MODEL:'openai/gpt-5-mini',FMG_SYNTHESIS_MODEL:'openai/gpt-5-mini'};
    const catalogueResponse=await fetch('https://ai-gateway.vercel.sh/v1/models',{signal:AbortSignal.timeout(15000)});
    ensure(catalogueResponse.ok,'Live model metadata unavailable; no generation performed.');
    const catalogue=await catalogueResponse.json(),model=catalogue.data.find(m=>m.id==='openai/gpt-5-mini');
    ensure(model?.tags.includes('web-search')&&model.tags.includes('structured-output'),'Required model capabilities are unavailable.');
    result.model={id:model.id,pricing:model.pricing,contextWindow:model.context_window};
    const budget=validationBudget(model.pricing,{contextWindow:model.context_window});
    async function credits() {
      try {const r=await fetch('https://ai-gateway.vercel.sh/v1/credits',{headers:{authorization:`Bearer ${token}`},signal:AbortSignal.timeout(15000)});return r.ok?await r.json():{status:r.status,unavailable:true};} catch {return {unavailable:true};}
    }
    result.creditsBefore=await credits();
    const inputs=JSON.parse(await readFile(new URL('../../tests/pilot-test-inputs.json',import.meta.url),'utf8'));
    for(const [index,input] of inputs.entries()) {
      ensure(input.cv.startsWith('FICTIONAL QA CANDIDATE'),'Only fictional QA inputs are allowed.');
      const item={case:index?'CTM':'CRA',packageId:index?'interview':'application',stages:[]};let packet;
      const onStage=stage=>{item.stages.push(stage);console.log(JSON.stringify({qualityStage:item.case,...stage}));};
      const options={env,onStage,beforeRequest:body=>budget.beforeRequest(body)};
      try {item.draft=await runIntelligence({...input,packageId:item.packageId,processingConsent:true,consentVersion:CONSENT_VERSION},{...options,onPacket:value=>{packet=value;item.packet=value;},onDraft:raw=>{item.rawDraft=raw;}});}
      catch(error) {item.error={code:error.code || 'quality_validation_failed',message:String(error.message).slice(0,600)};}
      // The baseline is a distinct authorized benchmark, never a retry of a failed report.
      if(packet && !item.error?.message.includes('$0.50')) {
        try {item.baseline=await runBaseline(packet,item.packageId,options);}
        catch(error) {item.baselineError={code:error.code || 'baseline_failed',message:String(error.message).slice(0,600)};}
      }
      result.cases.push(item);
      if(item.error?.message.includes('$0.50')||item.baselineError?.message.includes('$0.50')) break;
    }
    result.budget=budget.snapshot();result.creditsAfter=await credits();result.completedAt=new Date().toISOString();
    return result;
  },{waitMs:500000});
  if(!once.reused) {
    const encoded=gzipSync(JSON.stringify(once.result)).toString('base64'),chunks=encoded.match(/.{1,1800}/g)||[];
    chunks.forEach((data,index)=>console.log(JSON.stringify({qualityAuditArtifact:'gzip-base64-fictional-qa',index,total:chunks.length,data})));
  }
  console.log(JSON.stringify({qualityValidation:'completed',reused:once.reused,budget:once.result.budget,cases:once.result.cases.map(c=>({case:c.case,generated:!!c.draft,qualityFlags:c.draft?.qualityFlags,baseline:!!c.baseline,error:c.error}))}));
}
