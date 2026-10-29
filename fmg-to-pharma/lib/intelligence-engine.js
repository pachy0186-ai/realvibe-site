import {z} from 'zod';
import {discoveryPrompt, qualityPrompt, baselinePrompt} from './quality-prompts.js';
import {evidenceCatalogue, qualityOutputFormat, assembleQualityDraft} from './evidence-contract.js';
import {verifySources, readPublicPage} from './source-verifier.js';
import {ensure, validateIntake, PACKAGES} from './pilot-domain.js';
import {gatewayFailure, resolveModels} from './gateway-access.js';

export const ENGINE_VERSION = '0.3.0-evidence-bound';
const GATEWAY = 'https://ai-gateway.vercel.sh/v1/responses';
const short = z.string().max(6000);
const source = z.object({url: z.url(), title: short, type: short, date: short}).passthrough();
const draftSchema = z.object({
  target: z.object({company: short, role: short}),
  executive_verdict: z.object({recommendation: short, competitiveness: short, summary: short,
    reasons_for: z.array(short).max(12), reasons_against: z.array(short).max(12)}),
  decision_drivers: z.array(z.object({requirement: short, jd_evidence: short}).passthrough()).min(3).max(12),
  company_intelligence: z.array(z.object({finding: short, why_it_matters: short,
    provenance: z.enum(['verified_public', 'reported_experience', 'inference']), source_urls: z.array(z.url()).max(8)})).max(12),
  evidence_map: z.array(z.object({driver: short, candidate_evidence: short,
    candidate_quotes: z.array(short).max(6), strength: z.enum(['strong', 'partial', 'missing']),
    gap_type: short, risk: short, action: short})).min(3).max(12),
  positioning_strategy: z.object({headline: short,
    top_changes: z.array(z.object({change: short, why: short})).max(10),
    resume_edits: z.array(z.object({current_or_issue: short, suggested: short, reason: short})).max(10)}),
  interview_map: z.array(z.object({question: short, competency: short, best_candidate_evidence: short,
    answer_strategy: short, missing_info: short, avoid: short}).passthrough()).max(8),
  clarification_questions: z.array(z.object({question: short, why_needed: short, impact: short})).max(12),
  source_index: z.array(source).min(1).max(20), quality_notes: z.array(short).max(20),
}).passthrough();

// Keep provider output and server validation aligned. URL syntax is checked again
// by Zod and the source audit; the provider supports only a JSON Schema subset.
export function reportOutputFormat() {
  const schema = z.toJSONSchema(draftSchema);
  function strict(node) {
    if (!node || typeof node !== 'object') return;
    delete node.$schema;
    if (node.format === 'uri') delete node.format;
    if (node.type === 'object') {
      node.additionalProperties = false;
      node.required = Object.keys(node.properties || {});
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(strict); else strict(value);
    }
  }
  strict(schema);
  return {type: 'json_schema', name: 'fmg_intelligence_report', strict: true, schema};
}

export function parseJSON(text) {
  const value = String(text || '').replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  ensure(value.length <= 180000, 'Model output exceeds the review limit.');
  return JSON.parse(value);
}
export function publicURL(input) {
  try {
    const u = new URL(input);
    return u.protocol === 'https:' && !u.username && !u.password && !u.port &&
      !/^(localhost|.*\.localhost|.*\.local|.*\.internal|\d+\.\d+\.\d+\.\d+|\[.*\])$/i.test(u.hostname) ? u.href : null;
  } catch { return null; }
}
function responseText(data) {
  if (typeof data.output_text === 'string') return data.output_text;
  return (data.output || []).flatMap(o => o.content || []).map(c => typeof c.text === 'string' ? c.text : '').join('');
}
export function retrievedURLs(data) {
  const urls = new Set();
  for (const item of data.output || []) {
    for (const s of item.action?.sources || []) { const url = publicURL(s.url); if (url) urls.add(url); }
    for (const content of item.content || []) for (const a of content.annotations || []) {
      if (a.type === 'url_citation') { const url = publicURL(a.url); if (url) urls.add(url); }
    }
  }
  return [...urls];
}
export function auditDraft(raw, intake, packageId, verifiedURLs) {
  const analysis = draftSchema.parse(raw); const flags = [];
  const allowed = new Set(verifiedURLs.map(publicURL).filter(Boolean));
  const listed = new Set(analysis.source_index.map(s => publicURL(s.url)));
  for (const item of analysis.source_index) if (!allowed.has(publicURL(item.url))) flags.push('Source was not returned by the research tool.');
  if (analysis.target.company.toLowerCase() !== intake.company.toLowerCase() || analysis.target.role.toLowerCase() !== intake.role.toLowerCase()) flags.push('Target company or role changed.');
  for (const item of analysis.company_intelligence) {
    if (!item.source_urls.length) flags.push('Company claim has no citation.');
    for (const url of item.source_urls) if (!allowed.has(publicURL(url)) || !listed.has(publicURL(url))) flags.push('Company claim cites an unverified URL.');
  }
  for (const item of analysis.decision_drivers) if (!item.jd_evidence || !intake.jd.includes(item.jd_evidence)) flags.push('Requirement evidence is not an exact job-description excerpt.');
  for (const item of analysis.evidence_map) {
    if (item.strength !== 'missing' && !item.candidate_quotes.length) flags.push('Candidate assertion has no exact supporting excerpt.');
    for (const quote of item.candidate_quotes) if (!quote.trim() || !intake.cv.includes(quote)) flags.push('Candidate evidence is not an exact intake excerpt.');
  }
  if (analysis.decision_drivers.length !== analysis.evidence_map.length) flags.push('Not every decision driver has an evidence row.');
  if (packageId === 'application' && analysis.interview_map.length) flags.push('Application report includes the separate interview deliverable.');
  if (packageId === 'interview' && analysis.interview_map.length < 2) flags.push('Interview report lacks useful preparation prompts.');
  // Practice material is always our inference, never an employer's promised interview question.
  analysis.interview_map = analysis.interview_map.map(item => ({...item, provenance: 'inference', probability: undefined}));
  return {analysis, qualityFlags: [...new Set(flags)], engineVersion: ENGINE_VERSION, requiresFounderReview: true};
}

export function gatewayClient({env=process.env,fetchImpl=fetch,onStage=()=>{},beforeRequest=()=>{}}={}) {
  ensure(env.FMG_AI_ENABLED === 'true', 'AI generation is disabled pending controlled validation.');
  const token = env.AI_GATEWAY_API_KEY || env.VERCEL_OIDC_TOKEN;
  ensure(token, 'AI Gateway authentication is unavailable.');
  const models = resolveModels(env);
  const calls=[];
  async function ask(prompt,{web=false,format=null,stage=web?'research':'synthesis'}={}) {
    const model=web?models.research:models.synthesis;
    const body = {model, input: prompt, store: false, reasoning: {effort: env.FMG_AI_PROFILE === 'free-credit-validation' ? 'low' : 'medium'},
      max_output_tokens: web ? 2000 : 4500};
    if (web) Object.assign(body, {tools: [{type: 'web_search', search_context_size: 'medium'}],
      tool_choice: 'required', max_tool_calls: 2, include: ['web_search_call.action.sources']});
    if(format) body.text={format};
    await beforeRequest(body);
    const started=Date.now(),requestStarted=new Date().toISOString();
    const response = await fetchImpl(GATEWAY, {method: 'POST', headers: {authorization: `Bearer ${token}`, 'content-type': 'application/json'},
      body: JSON.stringify(body), signal: AbortSignal.timeout(80000), cache: 'no-store'});
    const data = await response.json();
    if (!response.ok) throw gatewayFailure(response.status, data);
    const call={stage,model,requestStarted,responseID:data.id || null,inputTokens:data.usage?.input_tokens ?? null,outputTokens:data.usage?.output_tokens ?? null,durationMs:Date.now()-started};
    calls.push(call);
    onStage({...call,status: data.status, outputCharacters: responseText(data).length,
      sourceURLs: retrievedURLs(data).length, incompleteReason: data.incomplete_details?.reason || null});
    ensure(data.status !== 'incomplete', 'Model output was incomplete; retry only after reviewing cost and limits.');
    return {text: responseText(data), urls: retrievedURLs(data),call};
  }
  return {ask,calls,models};
}
export async function runIntelligence(input, {env = process.env, fetchImpl = fetch, now = () => new Date().toISOString(), onStage = () => {}, onDraft = () => {}, onPacket=()=>{}, sourceLoader=readPublicPage,beforeRequest=()=>{}} = {}) {
  ensure(PACKAGES[input.packageId], 'Unknown package.');
  const client=gatewayClient({env,fetchImpl,onStage,beforeRequest});
  const intake=validateIntake(input,input.packageId), catalogue=evidenceCatalogue(intake), started=Date.now();
  const research = await client.ask(discoveryPrompt(intake,now().slice(0,10)),{web:true});
  const dossier = parseJSON(research.text);
  ensure(Array.isArray(dossier.sources),'Research returned no source list.');
  const referenced = new Set(research.urls.map(publicURL));
  const discovered=dossier.sources.map(s=>publicURL(s.url)).filter(url=>url&&referenced.has(url));
  const sources=await verifySources(discovered,intake.jobUrl,{load:sourceLoader,now});
  onPacket({intake,catalogue,sources,discoveryLimitations:dossier.limitations || []});
  const synthesis=await client.ask(qualityPrompt(catalogue,sources,input.packageId),{format:qualityOutputFormat(catalogue,sources,input.packageId)});
  const raw = parseJSON(synthesis.text);
  onDraft(raw);
  const result=assembleQualityDraft(raw,intake,catalogue,sources,input.packageId,now());
  result.telemetry = {durationMs: Date.now() - started, calls:client.calls, costUSD: null,
    costNote: 'Token usage is recorded when supplied. Tool and provider charges require reconciliation with Gateway billing.'};
  return result;
}
export async function runBaseline(packet,packageId,options={}) {
  ensure(options.env?.FMG_AI_PROFILE==='free-credit-validation','Baseline is limited to the explicit free-credit validation profile.');
  const client=gatewayClient(options),started=Date.now();
  const response=await client.ask(baselinePrompt(packet.catalogue,packet.sources,packageId),{stage:'baseline'});
  return {text:response.text,telemetry:{durationMs:Date.now()-started,calls:client.calls}};
}
