import test from 'node:test';
import assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import analyze from '../fmg-to-pharma/api/analyze.js';
import intake from '../fmg-to-pharma/api/fmg-pilot.js';
import checkout from '../fmg-to-pharma/api/fmg-pilot-checkout.js';
import review from '../fmg-to-pharma/api/fmg-pilot-review.js';
import webhook from '../fmg-to-pharma/api/fmg-pilot-webhook.js';
import qa from '../fmg-to-pharma/api/fmg-preview-qa.js';
function response() {return {headers: {},code: 200,setHeader(k,v) {this.headers[k]=v;return this;},status(v) {this.code=v;return this;},json(v) {this.body=v;return this;},end(v) {this.body=v;return this;}};}
test('actual HTTP entry points fail closed without credentials and set privacy headers', async () => {
  const previous = process.env.FMG_PILOT_MODE;process.env.FMG_PILOT_MODE='closed';
  try {
    for (const handler of [analyze,checkout,review,intake]) {
      const res=response();await handler({method:handler===intake?'GET':'POST',headers:{},body:{}},res);
      assert.equal(res.code,503);assert.equal(res.headers['Cache-Control'],'no-store');assert.deepEqual(res.body,{error:'Pilot orders are closed.'});
      const wrong=response();await handler({method:'DELETE',headers:{}},wrong);assert.equal(wrong.code,405);
    }
    const req=Readable.from([Buffer.from('{"fictional":"bad signature"}')]);req.method='POST';req.headers={};
    const bad=response();await webhook(req,bad);assert.equal(bad.code,400);assert.equal(bad.body.error,'Sandbox payment event could not be verified.');
  } finally {if(previous===undefined)delete process.env.FMG_PILOT_MODE;else process.env.FMG_PILOT_MODE=previous;}
});
test('responsive QA route is absent in production and exercises all seventeen pages in preview', () => {
 const previous=process.env.VERCEL_ENV;
 try {process.env.VERCEL_ENV='production';const closed=response();qa({},closed);assert.equal(closed.code,404);
 process.env.VERCEL_ENV='preview';const open=response();qa({},open);assert.equal(open.code,200);assert.ok(open.body.includes('/pilot-order'));assert.ok(open.body.includes('/pilot-review'));assert.ok(open.body.includes('1440'));
 } finally {if(previous===undefined)delete process.env.VERCEL_ENV;else process.env.VERCEL_ENV=previous;}
});
test('actual report comparison is fictional preview-only content and never enables model calls',()=>{
 const previous=process.env.VERCEL_ENV;
 try {process.env.VERCEL_ENV='production';const closed=response();qa({url:'/?view=reports'},closed);assert.equal(closed.code,404);
 process.env.VERCEL_ENV='preview';const open=response();qa({url:'/?view=reports'},open);assert.equal(open.code,200);assert.ok(open.body.includes('NO-GO for automated sale'));assert.ok(open.body.includes('human clinical review is pending'));assert.ok(open.body.includes('/logo.png'));assert.ok(!open.body.includes('VERCEL_OIDC_TOKEN'));assert.ok(!open.body.includes('ai-gateway.vercel.sh'));
 } finally {if(previous===undefined)delete process.env.VERCEL_ENV;else process.env.VERCEL_ENV=previous;}
});
