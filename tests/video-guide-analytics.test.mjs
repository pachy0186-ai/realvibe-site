import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';

const source=await fs.readFile(new URL('../fmg-to-pharma/guides/guides.js',import.meta.url),'utf8');
function run({video=false,consent='off',dnt='0',gpc=false,blockedStorage=false}={}) {
  const listeners={};
  const window={
    localStorage:{getItem(){if(blockedStorage)throw Error('blocked');return consent;}},
    dispatchEvent(){},addEventListener(name,fn){listeners[name]=fn;},
  };
  const dataset={pageType:'guide_article',articleSlug:video?'seven-day-career-fit-plan':'existing-guide'};
  if(video)Object.assign(dataset,{requiresAnalyticsConsent:'true',videoResource:'true'});
  vm.runInNewContext(source,{window,document:{body:{dataset},querySelectorAll:()=>[]},
    navigator:{doNotTrack:dnt,globalPrivacyControl:gpc},CustomEvent:class{constructor(name,args){this.type=name;this.detail=args.detail;}}});
  return {window,listeners};
}

test('existing guides retain their event contract; new resource requires optional analytics consent',()=>{
  assert.equal(run().window.dataLayer[0].event,'article_viewed');
  assert.equal(run({video:true}).window.dataLayer,undefined);
  const r=run({video:true,consent:'on'});
  assert.equal(r.window.dataLayer.length,2);
  assert.equal(r.window.dataLayer[1].event,'video_resource_viewed');
  r.listeners['fmg:video-request']({detail:{video_id:'unrelated-id'}});
  assert.equal(r.window.dataLayer.length,2);
  r.listeners['fmg:video-request']({detail:{video_id:'iPMPtll-P3Q'}});
  assert.equal(r.window.dataLayer.at(-1).event,'video_player_requested');
  r.listeners['fmg:video-request']({detail:{video_id:'MRPkx_-6n1s'}});
  assert.equal(r.window.dataLayer.at(-1).video_id,'MRPkx_-6n1s');
});

test('privacy preferences and unavailable storage prevent optional resource telemetry',()=>{
  for(const options of [{gpc:true},{dnt:'1'},{blockedStorage:true}]) {
    const r=run({video:true,consent:'on',...options});
    r.listeners['fmg:video-request']({detail:{video_id:'iPMPtll-P3Q'}});
    r.listeners['fmg:video-request']({detail:{video_id:'MRPkx_-6n1s'}});
    assert.equal(r.window.dataLayer,undefined);
  }
});
