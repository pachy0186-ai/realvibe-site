// Explicit bounded fictional experiment. Never invoked by normal build hooks.
import {readFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import {auditOnce} from './gateway-audit-once.js';
import {runIntelligence,runBaseline} from './intelligence-engine.js';
import {evidenceCatalogue} from './evidence-contract.js';
import {baselinePrompt} from './quality-prompts.js';
import {validationBudget} from './validation-budget.js';
import {CONSENT_VERSION,ensure} from './pilot-domain.js';
import {createHash} from 'node:crypto';
const hash=value=>createHash('sha256').update(value).digest('hex');
if(!process.argv.includes('--approved-final-feasibility')) console.log('Final feasibility disabled: explicit one-time command required.');
else {
  ensure(process.env.VERCEL_ENV==='preview'&&process.env.VERCEL_GIT_COMMIT_REF==='codex/fmg-pilot-operations-validation','Only the approved development preview can run this experiment.');
  const once=await auditOnce(`final-feasibility-20261029:${process.env.VERCEL_DEPLOYMENT_ID||process.env.VERCEL_URL}`,async()=>{
    const result={assignment:'final-feasibility-20261029',startedAt:new Date().toISOString(),testOnly:true,cases:[],protocolHash:hash(await readFile(new URL('../../docs/fmg-pilot/FINAL_FEASIBILITY_PROTOCOL.md',import.meta.url),'utf8'))};
    const token=process.env.VERCEL_OIDC_TOKEN;ensure(token,'Existing preview OIDC is required.');
    const env={...process.env,AI_GATEWAY_API_KEY:'',FMG_AI_ENABLED:'true',FMG_AI_PROFILE:'free-credit-validation',FMG_ENGINE_PROFILE:'evidence-first-feasibility',FMG_RESEARCH_MODEL:'openai/gpt-5-mini',FMG_SYNTHESIS_MODEL:'openai/gpt-5-mini'};
    const response=await fetch('https://ai-gateway.vercel.sh/v1/models',{signal:AbortSignal.timeout(15000)});ensure(response.ok,'Live model catalogue unavailable.');
    const model=(await response.json()).data.find(m=>m.id==='openai/gpt-5-mini');ensure(model?.tags.includes('structured-output'),'Required structured-output model unavailable.');
    result.model={id:model.id,pricing:model.pricing,contextWindow:model.context_window};
    const budget=validationBudget(model.pricing,{maxCalls:4,limitUSD:0.50,contextWindow:model.context_window});
    async function credits(){try{const r=await fetch('https://ai-gateway.vercel.sh/v1/credits',{headers:{authorization:`Bearer ${token}`},signal:AbortSignal.timeout(15000)});return r.ok?await r.json():{status:r.status,unavailable:true};}catch{return{unavailable:true};}}
    result.creditsBefore=await credits();
    const inputs=JSON.parse(await readFile(new URL('../../tests/pilot-test-inputs.json',import.meta.url),'utf8'));
    for(const [index,input] of inputs.entries()) {
      ensure(input.cv.startsWith('FICTIONAL QA CANDIDATE'),'Only the unchanged fictional cases are authorized.');
      const item={case:index?'CTM':'CRA',packageId:index?'interview':'application',stages:[]};let packet;
      const options={env,beforeRequest:body=>budget.beforeRequest(body),onStage:stage=>{item.stages.push(stage);console.log(JSON.stringify({feasibilityStage:item.case,...stage}));}};
      try{item.draft=await runIntelligence({...input,packageId:item.packageId,processingConsent:true,consentVersion:CONSENT_VERSION},{...options,onPacket:value=>{packet=value;item.packet=value;},onDraft:value=>{item.selection=value;}});}catch(e){item.error={code:e.code||'failed',message:String(e.message).slice(0,600)};}
      if(packet&&!item.error?.message.includes('$0.50')&&!item.error?.message.includes('preflight failed')) {
        const baselinePacket={catalogue:evidenceCatalogue(packet.intake),sources:packet.research.sources};
        item.baselinePromptHash=hash(baselinePrompt(baselinePacket.catalogue,baselinePacket.sources,item.packageId));
        try{item.baseline=await runBaseline(baselinePacket,item.packageId,options);}catch(e){item.baselineError={code:e.code||'failed',message:String(e.message).slice(0,600)};}
      }
      result.cases.push(item);
      if(item.error?.message.includes('$0.50')||item.baselineError?.message.includes('$0.50'))break;
    }
    result.budget=budget.snapshot();result.creditsAfter=await credits();result.completedAt=new Date().toISOString();return result;
  },{waitMs:500000});
  if(!once.reused){const chunks=gzipSync(JSON.stringify(once.result)).toString('base64').match(/.{1,1800}/g)||[];chunks.forEach((data,index)=>console.log(JSON.stringify({feasibilityArtifact:'gzip-base64-fictional-qa',index,total:chunks.length,data})));}
  console.log(JSON.stringify({finalFeasibility:'complete',reused:once.reused,budget:once.result.budget,cases:once.result.cases.map(c=>({case:c.case,draft:!!c.draft,flags:c.draft?.qualityFlags,baseline:!!c.baseline,error:c.error,baselineError:c.baselineError}))}));
}
