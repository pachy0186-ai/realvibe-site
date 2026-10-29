import test from 'node:test';
import assert from 'node:assert/strict';
import {gatewayFailure, resolveModels} from '../fmg-to-pharma/lib/gateway-access.js';
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
