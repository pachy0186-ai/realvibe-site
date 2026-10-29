import test from 'node:test';
import assert from 'node:assert/strict';
import {gatewayFailure, resolveModels} from '../fmg-to-pharma/lib/gateway-access.js';
import {auditOnce} from '../fmg-to-pharma/lib/gateway-audit-once.js';
import {randomUUID} from 'node:crypto';
import {mkdtemp} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {runIntelligence} from '../fmg-to-pharma/lib/intelligence-engine.js';
import {cases, consent, gatewayDouble} from './pilot-fixtures.mjs';
test('the eligible-model profile retains source/evidence validation and never calls a paid-tier model', async () => {
  const input={...cases[0],...consent,packageId:'application'}, fake=gatewayDouble(input,'application'), stages=[];
  const draft=await runIntelligence(input,{env:{FMG_AI_ENABLED:'true',FMG_AI_PROFILE:'free-credit-validation',AI_GATEWAY_API_KEY:'fictional-never-network'},fetchImpl:fake.fetchImpl,onStage:s=>stages.push(s)});
  assert.deepEqual(draft.qualityFlags,[]);assert.equal(fake.requests.length,2);
  assert.ok(fake.requests.every(r=>r.model==='openai/gpt-5-mini'&&r.reasoning.effort==='low'));
  assert.equal(fake.requests[0].text,undefined);
  const format=fake.requests[1].text.format;
  assert.equal(format.type,'json_schema');assert.equal(format.strict,true);
  assert.equal(format.schema.additionalProperties,false);
  assert.equal(format.schema.properties.interview_map.maxItems,8);
  assert.deepEqual(format.schema.required,Object.keys(format.schema.properties));
  assert.deepEqual(stages.map(s=>s.stage),['research','synthesis']);assert.ok(stages[0].sourceURLs>0);
});
test('concurrent Vercel builders share one finite audit instead of repeating model calls', async () => {
  let calls=0;const key=randomUUID();const directory=await mkdtemp(join(resolve('..'),'audit-once-'));
  const jobs=Array.from({length:8},()=>auditOnce(key,async()=>{calls++;await new Promise(resolve=>setTimeout(resolve,10));return {fictionalQA:true};},{directory,waitMs:5000}));
  const results=await Promise.all(jobs);assert.equal(calls,1);assert.equal(results.filter(r=>!r.reused).length,1);
  assert.ok(results.every(r=>r.result.fictionalQA));
});
test('Gateway failures distinguish verification, model eligibility, authentication, balance, quota and rate limits', () => {
  assert.equal(gatewayFailure(403, {error:{type:'customer_verification_required'}}).code, 'customer_verification_required');
  assert.equal(gatewayFailure(403, {error:{message:JSON.stringify({error:{code:'customer_verification_required'}})}}).code, 'customer_verification_required');
  assert.equal(gatewayFailure(403, {error:{message:'Model is not available in the free tier'}}).code, 'model_access_denied');
  assert.equal(gatewayFailure(403, {}).code, 'access_denied');
  assert.equal(gatewayFailure(401, {}).code, 'authentication_failed');
  assert.equal(gatewayFailure(402, {error:{code:'insufficient_funds'}}).code, 'insufficient_funds');
  assert.equal(gatewayFailure(402, {error:{code:'quota_for_entity_exceeded'}}).code, 'quota_for_entity_exceeded');
  assert.equal(gatewayFailure(429, {}).code, 'rate_limited');
});
test('Free-credit validation never falls back to the original ineligible models', () => {
  const env={FMG_AI_PROFILE:'free-credit-validation'};
  assert.deepEqual(resolveModels(env), {research:'openai/gpt-5-mini',synthesis:'openai/gpt-5-mini'});
  assert.throws(()=>resolveModels({...env, FMG_RESEARCH_MODEL:'openai/gpt-5.4-mini'}),/free-tier/);
  assert.throws(()=>resolveModels({...env, FMG_SYNTHESIS_MODEL:'openai/gpt-5.4-fast'}),/free-tier/);
  assert.equal(resolveModels({...env, FMG_RESEARCH_MODEL:'openai/gpt-5.4-nano'}).research,'openai/gpt-5.4-nano');
});
