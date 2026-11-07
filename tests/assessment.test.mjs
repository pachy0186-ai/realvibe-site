import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const source = await fs.readFile(new URL('../fmg-to-pharma/api/fmg-reality-check.js', import.meta.url), 'utf8');
const { default: handler } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const payload = { response_id:'qa-fictional-no-write', assessment_version:'3.0-public-pilot', research_consent:true,
  answers:{scope:'fictional'}, derived:{transition_pattern:'example'}, contact:{}, source:{utm_source:'qa'} };
function response() {
  return { headers:{}, code:0, setHeader(k,v){this.headers[k]=v;}, status(n){this.code=n;return this;}, json(body){this.body=body;return this;} };
}
test('existing assessment contract, consent and upstream failures without database writes', async () => {
  const previous = {url:process.env.SUPABASE_URL, key:process.env.SUPABASE_SECRET_KEY, role:process.env.SUPABASE_SERVICE_ROLE_KEY};
  const originalFetch=globalThis.fetch, originalLog=console.error;
  try {
    process.env.SUPABASE_URL='https://example.supabase.co'; process.env.SUPABASE_SECRET_KEY='sb_secret_test_only';
    let call;
    globalThis.fetch=async (url,options)=>{call={url,options};return {ok:true};};
    let res=response(); await handler({method:'GET'},res); assert.equal(res.code,405);assert.equal(res.headers.Allow,'POST');
    res=response();await handler({method:'POST',body:{...payload,research_consent:false}},res);assert.equal(res.code,400);assert.equal(call,undefined);
    res=response();await handler({method:'POST',body:'{invalid'},res);assert.equal(res.code,400);
    res=response();await handler({method:'POST',body:{...payload,answers:{text:'x'.repeat(120_001)}}},res);assert.equal(res.code,413);
    res=response();await handler({method:'POST',body:payload},res);assert.equal(res.code,200);assert.equal(res.body.ok,true);
    assert.equal(call.url,'https://example.supabase.co/rest/v1/fmg_reality_check_responses');
    assert.equal(call.options.method,'POST');assert.equal(call.options.headers.Prefer,'return=minimal');
    assert.equal(call.options.headers.Authorization,undefined);
    const record=JSON.parse(call.options.body);assert.deepEqual(record.answers,payload.answers);assert.equal(record.response_id,payload.response_id);
    const logs=[];console.error=(...args)=>logs.push(args);
    globalThis.fetch=async()=>({ok:false,status:400,text:async()=> 'private-candidate-value'});
    res=response();await handler({method:'POST',body:payload},res);assert.equal(res.code,502);assert.ok(!JSON.stringify(logs).includes('private-candidate-value'));
    globalThis.fetch=async()=>{throw new Error('private-candidate-value');};
    res=response();await handler({method:'POST',body:payload},res);assert.equal(res.code,500);assert.ok(!JSON.stringify(logs).includes('private-candidate-value'));
    delete process.env.SUPABASE_SECRET_KEY;delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    res=response();await handler({method:'POST',body:payload},res);assert.equal(res.code,503);
  } finally {
    globalThis.fetch=originalFetch;console.error=originalLog;
    for(const [k,v] of Object.entries({SUPABASE_URL:previous.url,SUPABASE_SECRET_KEY:previous.key,SUPABASE_SERVICE_ROLE_KEY:previous.role})) {
      if(v===undefined)delete process.env[k];else process.env[k]=v;
    }
  }
});
