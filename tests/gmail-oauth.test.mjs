import test from 'node:test';
import assert from 'node:assert/strict';
import {seal,unseal,authorizeGmail,finishGmail,gmailTransport} from '../fmg-to-pharma/lib/gmail-oauth.js';
const env={VERCEL_ENV:'preview',FMG_PILOT_MODE:'sandbox',FMG_PILOT_ADMIN_TOKEN:'fictional-test-access-code-32-characters',FMG_GMAIL_CLIENT_ID:'fictional-client',FMG_GMAIL_CLIENT_SECRET:'fictional-secret',FMG_PILOT_ORIGIN:'https://preview.example.invalid',FMG_EMAIL_FROM:'fmg@example.invalid'};
test('OAuth protects credentials, origin and state before token exchange',async()=>{
 const encrypted=seal({refreshToken:'fictional-token'},env.FMG_PILOT_ADMIN_TOKEN);
 assert.equal(unseal(encrypted,env.FMG_PILOT_ADMIN_TOKEN).refreshToken,'fictional-token');
 assert.throws(()=>unseal(encrypted,'wrong-key'));
 assert.throws(()=>authorizeGmail({headers:{}},env));
 const started=authorizeGmail({headers:{authorization:`Bearer ${env.FMG_PILOT_ADMIN_TOKEN}`,origin:env.FMG_PILOT_ORIGIN}},env);
 const url=new URL(started.url);assert.equal(url.searchParams.get('code_challenge_method'),'S256');
 assert.ok(started.cookie.includes('HttpOnly; Secure; SameSite=Lax'));
 let calls=0;await assert.rejects(finishGmail({headers:{cookie:started.cookie},query:{state:'wrong',code:'fake'}},env,async()=>{calls++;}));assert.equal(calls,0);
 let saved;const replies=[{refresh_token:'fake-refresh',access_token:'fake-access',scope:'https://www.googleapis.com/auth/gmail.send'},{email:env.FMG_EMAIL_FROM,email_verified:true}];
 await finishGmail({headers:{cookie:started.cookie},query:{state:url.searchParams.get('state'),code:'fake-code'}},env,async()=>({ok:true,json:async()=>replies.shift()}),async body=>{saved=body;});
 assert.equal(unseal(saved.encrypted_token,env.FMG_PILOT_ADMIN_TOKEN).refreshToken,'fake-refresh');
 assert.throws(()=>gmailTransport({...env,VERCEL_ENV:'production'}));
});
