import {randomBytes, createHash, createCipheriv, createDecipheriv, timingSafeEqual} from 'node:crypto';
import nodemailer from 'nodemailer';
import {ensure} from './pilot-domain.js';

export const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.send openid email';
export function gmailGuard(env) {
  ensure(env.VERCEL_ENV !== 'production' && env.FMG_PILOT_MODE === 'sandbox', 'Gmail setup is preview-only.');
  ensure(env.FMG_PILOT_ADMIN_TOKEN?.length >= 32 && env.FMG_GMAIL_CLIENT_ID && env.FMG_GMAIL_CLIENT_SECRET, 'Gmail OAuth is not configured.');
  const origin = new URL(env.FMG_PILOT_ORIGIN);
  ensure(origin.protocol === 'https:' && origin.origin === env.FMG_PILOT_ORIGIN, 'Verified HTTPS origin required.');
}
export function seal(value, secret) {
  const nonce = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', createHash('sha256').update(secret).digest(), nonce);
  return Buffer.concat([nonce, cipher.update(JSON.stringify(value)), cipher.final(), cipher.getAuthTag()]).toString('base64url');
}
export function unseal(value, secret) {
  const bytes = Buffer.from(value, 'base64url');
  const decipher = createDecipheriv('aes-256-gcm', createHash('sha256').update(secret).digest(), bytes.subarray(0,12));
  decipher.setAuthTag(bytes.subarray(-16));
  return JSON.parse(Buffer.concat([decipher.update(bytes.subarray(12,-16)),decipher.final()]).toString());
}
export function authorizeGmail(req, env) {
  gmailGuard(env);
  const expected = Buffer.from(`Bearer ${env.FMG_PILOT_ADMIN_TOKEN}`);
  const supplied = Buffer.from(String(req.headers.authorization || ''));
  ensure(expected.length === supplied.length && timingSafeEqual(expected,supplied), 'Reviewer authentication required.');
  ensure(req.headers.origin === env.FMG_PILOT_ORIGIN, 'Request origin mismatch.');
  const state = randomBytes(32).toString('base64url');
  const verifier = randomBytes(32).toString('base64url');
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.search = new URLSearchParams({client_id:env.FMG_GMAIL_CLIENT_ID,redirect_uri:`${env.FMG_PILOT_ORIGIN}/api/fmg-gmail-oauth`,response_type:'code',scope:GMAIL_SCOPE,access_type:'offline',prompt:'consent',login_hint:env.FMG_EMAIL_FROM,state,code_challenge:createHash('sha256').update(verifier).digest('base64url'),code_challenge_method:'S256'}).toString();
  return {url:url.href,cookie:`fmg_gmail_oauth=${seal({state,verifier,expires:Date.now()+600000},env.FMG_PILOT_ADMIN_TOKEN)}; HttpOnly; Secure; SameSite=Lax; Path=/api/fmg-gmail-oauth; Max-Age=600`};
}
async function tokenStore(env, method, body) {
  const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  ensure(key && env.SUPABASE_URL, 'Private Gmail token storage is not configured.');
  const headers = {apikey:key,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates,return=representation'};
  if(!key.startsWith('sb_secret_')) headers.Authorization=`Bearer ${key}`;
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/fmg_gmail_sandbox_tokens?sender=eq.${encodeURIComponent(env.FMG_EMAIL_FROM)}&select=encrypted_token`,{method,headers,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(15000),cache:'no-store'});
  ensure(response.ok,'Private Gmail token storage failed.');
  return response.json();
}
export async function finishGmail(req, env, fetchImpl = fetch, persist = body => tokenStore(env,'POST',body)) {
  gmailGuard(env);
  const cookie = String(req.headers.cookie || '').split(';').map(part=>part.trim()).find(part=>part.startsWith('fmg_gmail_oauth='));
  ensure(cookie,'OAuth session expired. Start again from the reviewer workspace.');
  const session = unseal(cookie.slice('fmg_gmail_oauth='.length),env.FMG_PILOT_ADMIN_TOKEN);
  ensure(session.expires > Date.now() && typeof req.query.state === 'string' && req.query.state === session.state,'OAuth state verification failed.');
  ensure(typeof req.query.code === 'string' && !req.query.error,'Google authorization was not completed.');
  const response = await fetchImpl('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:env.FMG_GMAIL_CLIENT_ID,client_secret:env.FMG_GMAIL_CLIENT_SECRET,redirect_uri:`${env.FMG_PILOT_ORIGIN}/api/fmg-gmail-oauth`,grant_type:'authorization_code',code:req.query.code,code_verifier:session.verifier}),signal:AbortSignal.timeout(15000)});
  ensure(response.ok,'Google token exchange failed.');
  const tokens = await response.json();
  ensure(tokens.refresh_token && tokens.scope?.split(' ').includes('https://www.googleapis.com/auth/gmail.send'),'Gmail send permission and offline access are required.');
  const identity = await fetchImpl('https://openidconnect.googleapis.com/v1/userinfo',{headers:{Authorization:`Bearer ${tokens.access_token}`},signal:AbortSignal.timeout(15000)});
  ensure(identity.ok,'Google identity verification failed.');
  const user = await identity.json();
  ensure(user.email_verified && user.email === env.FMG_EMAIL_FROM,'Authorize only the configured FMG sender mailbox.');
  await persist({sender:env.FMG_EMAIL_FROM,encrypted_token:seal({refreshToken:tokens.refresh_token},env.FMG_PILOT_ADMIN_TOKEN),updated_at:new Date().toISOString()});
}
export function gmailTransport(env, fetchImpl = fetch, load = () => tokenStore(env,'GET')) {
  gmailGuard(env);
  ensure(env.FMG_NOTIFICATION_MODE === 'gmail-test' && env.FMG_EMAIL_TEST_APPROVED === 'true','Gmail test sending is not approved.');
  const mime = nodemailer.createTransport({streamTransport:true,buffer:true,newline:'unix'});
  return {async sendMail(message) {
    ensure(message.from === env.FMG_EMAIL_FROM && String(env.FMG_EMAIL_TEST_RECIPIENTS || '').split(',').map(value=>value.trim()).includes(message.to),'Gmail sender or recipient is not approved.');
    const rows = await load();ensure(rows[0]?.encrypted_token,'Gmail mailbox authorization is missing.');
    const saved = unseal(rows[0].encrypted_token,env.FMG_PILOT_ADMIN_TOKEN);
    const response = await fetchImpl('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:env.FMG_GMAIL_CLIENT_ID,client_secret:env.FMG_GMAIL_CLIENT_SECRET,refresh_token:saved.refreshToken,grant_type:'refresh_token'}),signal:AbortSignal.timeout(15000)});
    ensure(response.ok,'Gmail authorization needs reconnecting.');
    const token = await response.json();ensure(token.access_token,'Gmail access token unavailable.');
    const built = await mime.sendMail({...message,disableFileAccess:true,disableUrlAccess:true});
    const sent = await fetchImpl('https://gmail.googleapis.com/gmail/v1/users/me/messages/send',{method:'POST',headers:{Authorization:`Bearer ${token.access_token}`,'Content-Type':'application/json'},body:JSON.stringify({raw:built.message.toString('base64url')}),signal:AbortSignal.timeout(20000)});
    ensure(sent.ok,'Gmail test message was not accepted.');
    const result = await sent.json();ensure(result.id,'Gmail returned no message reference.');
    return {accepted:[message.to],messageId:result.id};
  }};
}
