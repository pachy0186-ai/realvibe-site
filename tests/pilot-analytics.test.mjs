import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
const source=await fs.readFile(new URL('../fmg-to-pharma/pilot.js',import.meta.url),'utf8');
function run({choice='off',gpc=false,dnt='0',storageBlocked=false}={}){
  const saved=new Map([['fmg-pilot-analytics-choice',choice]]),session=new Map();
  const makeStorage=map=>({getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)});
  const events=[];const window={dispatchEvent:e=>events.push(e)};
  Object.defineProperties(window,{localStorage:{get(){if(storageBlocked)throw Error('blocked');return makeStorage(saved);}},sessionStorage:{get(){if(storageBlocked)throw Error('blocked');return makeStorage(session);}}});
  const document={querySelectorAll:()=>[],getElementById:()=>null};
  const context={window,document,navigator:{globalPrivacyControl:gpc,doNotTrack:dnt},
    location:{pathname:'/',search:'?utm_source=linkedin&utm_campaign=pilot_validation&utm_medium=private-candidate-value&email=private-candidate-value'},
    URLSearchParams,CustomEvent:class{constructor(name,args){this.type=name;this.detail=args.detail;}}};
  vm.runInNewContext(source,context);return{window,session,events};
}
test('pilot analytics defaults off and excludes arbitrary personal query values',()=>{
  assert.equal(run().events.length,0);
  const r=run({choice:'on'});assert.equal(r.events.length,1);
  assert.equal(r.events[0].detail.event,'landing_page_viewed');
  assert.equal(r.events[0].detail.utm_source,'linkedin');
  assert.ok(!JSON.stringify(r.window.dataLayer).includes('private-candidate-value'));
  assert.ok(![...r.session.values()].join('').includes('private-candidate-value'));
});
test('browser privacy preferences override stored opt-in; blocked storage is harmless',()=>{
  assert.equal(run({choice:'on',gpc:true}).events.length,0);
  assert.equal(run({choice:'on',dnt:'1'}).events.length,0);
  assert.equal(run({storageBlocked:true}).events.length,0);
});
