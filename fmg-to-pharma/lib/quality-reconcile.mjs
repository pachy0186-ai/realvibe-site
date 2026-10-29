// Read-only reconciliation and source checks. This script never calls /responses.
import {auditOnce} from './gateway-audit-once.js';
import {qualityGenerationIDs} from './quality-generation-ids.js';
import {verifySources} from './source-verifier.js';
import {ensure} from './pilot-domain.js';
if(process.env.VERCEL_ENV==='preview'&&process.env.VERCEL_GIT_COMMIT_REF==='codex/fmg-pilot-operations-validation') {
  const once=await auditOnce(`quality-reconcile:${process.env.VERCEL_DEPLOYMENT_ID || process.env.VERCEL_URL}`,async()=>{
    const token=process.env.VERCEL_OIDC_TOKEN;ensure(token,'Existing preview OIDC required.');
    const headers={authorization:`Bearer ${token}`};
    async function read(path) {const res=await fetch(`https://ai-gateway.vercel.sh${path}`,{headers,signal:AbortSignal.timeout(15000)});return {status:res.status,...(res.ok?{data:await res.json()}:{unavailable:true})};}
    const costs=[];for(const item of qualityGenerationIDs) costs.push({...item,...await read(`/v1/generation?id=${encodeURIComponent(item.id)}`)});
    const credits=await read('/v1/credits');
    const sources=await verifySources([],'https://careers.iconplc.com/job/clinical-trial-manager-ii-biotech-united-states-remote-in-regional-united-states-pra-jid-36419');
    return {checkedAt:new Date().toISOString(),modelCalls:0,costs,credits,policyFallbackProbe:sources.map(({text,policyLinks,...metadata})=>metadata)};
  });
  if(!once.reused) console.log(JSON.stringify({qualityReconciliation:once.result}));
}
console.log('Read-only reconciliation complete; model auditing disabled.');
