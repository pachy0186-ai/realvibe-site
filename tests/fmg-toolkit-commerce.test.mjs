import test from "node:test";
import assert from "node:assert/strict";
import {isCheckoutReady,paymentLinkUrl,isPaidToolkitSession,allowedDoc,validCheckoutSessionId,safeSignedStorageUrl} from "../fmg-to-pharma/lib/toolkit-commerce-core.js";
const env={FMG_TOOLKIT_PAYMENTS_ENABLED:"true",FMG_TOOLKIT_PAYMENT_LINK_ID:"plink_example",FMG_TOOLKIT_PRICE_ID:"price_example",STRIPE_SECRET_KEY:"sk_test_dummy",SUPABASE_URL:"https://example.supabase.co",SUPABASE_SECRET_KEY:"sb_secret_dummy",FMG_TOOLKIT_LIVE_MODE:"false"};
const session={livemode:false,payment_status:"paid",mode:"payment",payment_link:"plink_example"};
const items=[{price:{id:"price_example"},quantity:1}];
test("payment is closed by default",()=>assert.equal(isCheckoutReady({}),false));
test("external checkout allowlist",()=>{assert.equal(paymentLinkUrl("https://buy.stripe.com/example"),"https://buy.stripe.com/example");assert.equal(paymentLinkUrl("https://buy.stripe.com.evil.net/"),null);assert.equal(paymentLinkUrl("http://buy.stripe.com/test"),null);});
test("only correct paid SKU and link authorize",()=>{assert.equal(isPaidToolkitSession(session,items,env),true);assert.equal(isPaidToolkitSession({...session,payment_status:"unpaid"},items,env),false);assert.equal(isPaidToolkitSession({...session,payment_link:"plink_legacy"},items,env),false);assert.equal(isPaidToolkitSession({...session,livemode:true},items,env),false);assert.equal(isPaidToolkitSession(session,[{price:{id:"price_legacy"},quantity:1}],env),false);assert.equal(isPaidToolkitSession(session,items,{...env,FMG_TOOLKIT_PAYMENTS_ENABLED:"false"}),false);});
test("strict file allowlist and session IDs",()=>{assert.ok(allowedDoc("guide").endsWith(".pdf"));assert.ok(allowedDoc("workbook").endsWith(".pdf"));assert.equal(allowedDoc("../.env"),null);assert.equal(allowedDoc("__proto__"),null);assert.equal(validCheckoutSessionId("cs_test_abcdefghijklmnop123456"),true);assert.equal(validCheckoutSessionId("not a session"),false);});

test("Supabase raw signed path is normalized to Storage API path",()=>{
  const u=safeSignedStorageUrl("/object/sign/fmg-paid-toolkit/guide.pdf?token=abc","https://example.supabase.co","fmg-paid-toolkit");
  assert.equal(u?.toString(),"https://example.supabase.co/storage/v1/object/sign/fmg-paid-toolkit/guide.pdf?token=abc");
  assert.equal(safeSignedStorageUrl("https://evil.invalid/object/sign/fmg-paid-toolkit/guide.pdf?token=a","https://example.supabase.co","fmg-paid-toolkit"),null);
  assert.equal(safeSignedStorageUrl("/object/sign/other-bucket/guide.pdf?token=a","https://example.supabase.co","fmg-paid-toolkit"),null);
});
