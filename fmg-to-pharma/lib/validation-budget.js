import {ensure} from './pilot-domain.js';
export function validationBudget(pricing,{limitUSD=0.50,maxCalls=6,contextWindow=400000}={}) {
  const input=Number(pricing.input),output=Number(pricing.output),search=Number(pricing.web_search)/1000;
  ensure(input>0&&input<=0.00000025&&output>0&&output<=0.000002&&search>=0&&search<=0.01,'Current model prices exceed the reviewed validation bounds.');
  let reservedUSD=0,calls=0;
  return {beforeRequest(body) {
    ensure(body.model==='openai/gpt-5-mini','Validation forbids model substitution or fallback.');
    // Reserve a full context window for a web request; use the serialized request
    // byte count as a conservative input-token bound for a synthesis request.
    const inputBound=body.tools?.length?contextWindow:Buffer.byteLength(JSON.stringify(body),'utf8');
    const reserve=inputBound*input+body.max_output_tokens*output+(body.max_tool_calls || 0)*search;
    ensure(calls<maxCalls && reservedUSD+reserve<=limitUSD,'Stop: additional live testing requires approval under the $0.50 assignment threshold.');
    calls++;reservedUSD+=reserve;
    return reserve;
  },snapshot:()=>({limitUSD,maxCalls,calls,reservedUpperBoundUSD:reservedUSD,note:'Local conservative preflight reservation, not a change to Gateway billing settings. Reconcile actual charges with Gateway logs.'})};
}
