import test from 'node:test';
import assert from 'node:assert/strict';
import {createPilotService} from '../fmg-to-pharma/lib/pilot-server.js';
import {memoryStore} from '../fmg-to-pharma/lib/pilot-store.js';
import {newOrder, REVIEW_CHECKS, customerView} from '../fmg-to-pharma/lib/pilot-domain.js';

const env = {FMG_PILOT_MODE:'sandbox',FMG_PILOT_ORIGIN:'https://qa.example.invalid',FMG_PILOT_ADMIN_TOKEN:'fictional-test-credential-only-123456789'};
const orderId = '11111111-1111-4111-8111-111111111111';
const report = {title:'Fictional application brief',body:'Fictional workflow QA. Independent monitoring duration is unknown. '.repeat(6),sourceNote:'Archived fictional JD supplied by the test; no current employer verification.'};
async function context() {
  const store = memoryStore();
  const order = newOrder({id:orderId,accessHash:'test',packageId:'application',email:'candidate@example.invalid',now:new Date().toISOString()});
  order.payment={sandbox:true};order.status='intake_received';
  order.intake={company:'ICON',role:'CRA II',cv:'FICTIONAL QA CANDIDATE '+ 'evidence '.repeat(50)};
  await store.create(order);
  const service=createPilotService({env,store,generate:()=>{throw Error('Model must not run');}});
  const request=(action,extra={})=>({headers:{authorization:`Bearer ${env.FMG_PILOT_ADMIN_TOKEN}`,origin:env.FMG_PILOT_ORIGIN},body:{id:orderId,action,...extra}});
  return {store,service,request};
}
test('manual fictional report stays private until approval and delivery',async()=>{
  const {store,service,request}=await context();
  await assert.rejects(service.review(request('deliver')),/approval/);
  const draft=await service.review(request('submit_manual',{manualReport:report}));
  assert.equal(draft.status,'review_required');assert.equal(customerView(draft).report,null);
  assert.equal(draft.draft.engineVersion,'manual-sandbox-1');
  await assert.rejects(service.review(request('approve',{review:{checks:{}}})),/every/);
  await service.review(request('approve',{review:{reviewer:'Automated fictional workflow QA',note:'Workflow verification only; not human clinical sign-off.',checks:Object.fromEntries(REVIEW_CHECKS.map(key=>[key,true]))}}));
  const delivered=await service.review(request('deliver'));
  assert.equal(customerView(delivered).report.manualReport.body,report.body.trim());
  await assert.rejects(service.review(request('submit_manual',{manualReport:report})),/Complete intake/);
  assert.equal((await store.get(orderId)).order.status,'delivered');
});
test('manual report rejects unauthenticated, production, malformed and real-data submissions',async()=>{
  const {store,service,request}=await context();
  await assert.rejects(service.review({...request('submit_manual',{manualReport:report}),headers:{origin:env.FMG_PILOT_ORIGIN}}),/authentication/);
  await assert.rejects(createPilotService({env:{...env,VERCEL_ENV:'production'},store}).review(request('submit_manual',{manualReport:report})),/closed/);
  await assert.rejects(service.review(request('submit_manual',{manualReport:{...report,body:'short'}})),/Report text/);
  const found=await store.get(orderId);found.order.intake.cv='Real candidate';await store.save(found.order,found.version);
  await assert.rejects(service.review(request('submit_manual',{manualReport:report})),/fictional/);
});
