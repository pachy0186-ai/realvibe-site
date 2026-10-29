// Opt-in, finite preview-build validation. No HTTP generation endpoint or new API key.
import {mkdir, writeFile, readFile} from 'node:fs/promises';
import {runIntelligence} from './intelligence-engine.js';
import {gatewayFailure, resolveModels} from './gateway-access.js';
import {CONSENT_VERSION} from './pilot-domain.js';
import {auditOnce} from './gateway-audit-once.js';
import {gzipSync} from 'node:zlib';

if (process.env.VERCEL_ENV === 'preview' && process.env.FMG_GATEWAY_AUDIT_MODE === 'free-credit') {
  const once = await auditOnce(process.env.VERCEL_DEPLOYMENT_ID || process.env.VERCEL_URL || process.env.VERCEL_GIT_COMMIT_SHA || 'controlled-preview-audit', async () => {
  const result = {testOnly: true, candidateData: 'Fictional QA candidates only', startedAt: new Date().toISOString(),
    authentication: {oidcPresent: !!process.env.VERCEL_OIDC_TOKEN, apiKeyPresent: !!process.env.AI_GATEWAY_API_KEY},
    limits: 'One 128-token smoke request; at most two report runs, each with two bounded calls. Verified free-tier models only; no paid fallback.', cases: []};
  // Use the existing project identity explicitly; no key is created, copied or printed.
  const env = {...process.env, AI_GATEWAY_API_KEY: '', FMG_AI_ENABLED: 'true', FMG_AI_PROFILE: 'free-credit-validation',
    FMG_RESEARCH_MODEL: 'openai/gpt-5-mini', FMG_SYNTHESIS_MODEL: 'openai/gpt-5-mini'};
  const token = env.VERCEL_OIDC_TOKEN;
  const summaryError = e => ({status: e.status || null, code: e.code || 'validation_failed', message: e.message.length < 180 ? e.message : 'Validation failed; inspect the controlled test configuration.',
    issues: e.issues?.map(({path, code, expected, maximum, minimum}) => ({path, code, expected, maximum, minimum}))});
  try {
    if (!token) throw Object.assign(Error('The preview build has no project OIDC identity.'), {code: 'oidc_missing'});
    result.models = resolveModels(env);
    const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {method: 'POST',
      headers: {authorization: `Bearer ${token}`, 'content-type': 'application/json'},
      body: JSON.stringify({model: result.models.research, input: 'Reply with exactly OK.', reasoning: {effort: 'minimal'}, max_output_tokens: 128, store: false}),
      signal: AbortSignal.timeout(45000)});
    const data = await response.json();
    if (!response.ok) throw gatewayFailure(response.status, data);
    result.smoke = {status: response.status, model: data.model || result.models.research, usage: data.usage || null, responseStatus: data.status,
      text: (data.output || []).flatMap(o => o.content || []).map(c => c.text || '').join('').slice(0, 200)};
    const inputs = JSON.parse(await readFile(new URL('../../tests/pilot-test-inputs.json', import.meta.url), 'utf8'));
    for (const [index, input] of inputs.entries()) {
      if (!input.cv.startsWith('FICTIONAL QA CANDIDATE')) throw Error('Audit accepts fictional QA cases only.');
      const stages = []; let rawDraft;
      try {
        const draft = await runIntelligence({...input, packageId: index === 0 ? 'application' : 'interview',
          processingConsent: true, consentVersion: CONSENT_VERSION, feedbackConsent: false}, {env,
          onDraft: raw => {rawDraft = raw;},
          onStage: stage => {stages.push(stage);console.log(JSON.stringify({gatewayStage: index === 0 ? 'CRA' : 'CTM', ...stage}));}});
        result.cases.push({case: index === 0 ? 'CRA application' : 'CTM interview', status: 'draft_generated', stages, draft});
      } catch (error) {console.log(JSON.stringify({gatewayCase: index === 0 ? 'CRA' : 'CTM', error: summaryError(error)}));result.cases.push({case: index === 0 ? 'CRA application' : 'CTM interview', status: 'blocked', stages, rawDraft, error: summaryError(error)});if (['customer_verification_required', 'authentication_failed', 'insufficient_funds', 'rate_limited'].includes(error.code)) break;}
    }
  } catch (error) {result.smoke = {status: 'blocked', error: summaryError(error)};}
  result.completedAt = new Date().toISOString();
  return result;
  });
  const result = once.result;
  const folder = new URL('../qa/', import.meta.url);await mkdir(folder, {recursive: true});
  await writeFile(new URL('gateway-validation.json', folder), JSON.stringify(result, null, 2));
  // Build output collection differs between static and function builders. Keep
  // one recoverable, private build-log artifact, restricted to fictional tests.
  if (!once.reused) {
    const encoded = gzipSync(JSON.stringify(result)).toString('base64');
    const chunks = encoded.match(/.{1,1800}/g) || [];
    chunks.forEach((data, index) => console.log(JSON.stringify({gatewayAuditArtifact: 'gzip-base64-fictional-qa', index, total: chunks.length, data})));
  }
  console.log(JSON.stringify({gatewayValidation: result.smoke?.error?.code || result.smoke?.status,
    reused: once.reused, oidcPresent: result.authentication.oidcPresent, generatedCases: result.cases.filter(c => c.status === 'draft_generated').length}));
} else console.log('Gateway validation is disabled; no model request was made.');
