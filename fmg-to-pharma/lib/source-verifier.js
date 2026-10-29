import https from 'node:https';
import {lookup} from 'node:dns/promises';
import {isIP} from 'node:net';
import {createHash} from 'node:crypto';

export const normalize = text => String(text || '').replace(/\s+/g, ' ').trim();
export function publicAddress(ip) {
  if (isIP(ip) === 4) {
    const [a,b] = ip.split('.').map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && [0,168].includes(b) || a === 100 && b >= 64 && b <= 127 || a === 198 && [18,19,51].includes(b) || a === 203 && b === 0);
  }
  return isIP(ip) === 6 && /^[23]/i.test(ip) && !/^2001:(db8|0):/i.test(ip);
}
export function safeSourceURL(value) {
  try {const u = new URL(value);return u.protocol === 'https:' && !u.username && !u.password && !u.port && !isIP(u.hostname.replaceAll(/[\[\]]/g,'')) && u.hostname.includes('.') && !/\.(local|localhost|internal|invalid|test)$/i.test(u.hostname) ? u.href : null;} catch {return null;}
}
function entities(text) {
  const named = {amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',rsquo:'’',lsquo:'‘',rdquo:'”',ldquo:'“',ndash:'–',mdash:'—'};
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (all,key) => {
    if (key[0] !== '#') return named[key.toLowerCase()] ?? all;
    const n = key[1].toLowerCase() === 'x' ? parseInt(key.slice(2),16) : Number(key.slice(1));
    return Number.isInteger(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : all;
  });
}
export function extractPage(html, url) {
  const title = entities(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g,' ') || 'Public source');
  const policyLinks = [];
  for (const match of html.matchAll(/<a\b([^>]*?)href\s*=\s*["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const label = entities(match[4].replace(/<[^>]*>/g,' '));
    if (/\bAI\b|artificial intelligence/i.test(label) && /applica|policy|us(e|age)/i.test(label + match[2])) {
      try {const candidate = safeSourceURL(new URL(entities(match[2]),url).href);if(candidate && new URL(candidate).hostname === new URL(url).hostname) policyLinks.push(candidate);} catch {}
    }
  }
  let body = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  body = body.replace(/<(script|style|nav|header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi,' ');
  body = normalize(entities(body.replace(/<[^>]+>/g,' ')));
  return {title:normalize(title), text:body.slice(0,16000), policyLinks:[...new Set(policyLinks)].slice(0,1)};
}
// Resolve and pin a validated public IP for each request, including redirects.
// This avoids arbitrary private-network fetches and DNS rebinding between checks.
export async function readPublicPage(value, {resolve = host => lookup(host,{all:true}), request = https.request} = {}) {
  let url = safeSourceURL(value);
  if (!url) return {url:value, status:'rejected', reason:'Not an allowed public HTTPS URL.'};
  for (let redirects=0;redirects<=3;redirects++) {
    try {
      const u = new URL(url), addresses = await resolve(u.hostname);
      if (!addresses.length || addresses.some(a=>!publicAddress(a.address))) return {url:value,status:'rejected',reason:'Host did not resolve exclusively to public addresses.'};
      const pinned = addresses[0];
      const page = await new Promise((done,fail)=> {
        const req = request(u,{method:'GET',lookup:(_host,options,callback)=>options?.all ? callback(null,[pinned]) : callback(null,pinned.address,pinned.family),
          headers:{'user-agent':'FMG-Source-Verification/0.3','accept':'text/html,text/plain','accept-encoding':'identity'}},res=> {
          if ([301,302,303,307,308].includes(res.statusCode)) {res.resume();done({redirect:res.headers.location});return;}
          if (res.statusCode !== 200) {res.resume();done({status:'inaccessible',httpStatus:res.statusCode,reason:'Source did not return HTTP 200.'});return;}
          if (!/^text\/(html|plain)/i.test(res.headers['content-type'] || '')) {res.resume();done({status:'unsupported',reason:'Only inspectable HTML or plain text is accepted.'});return;}
          let bytes=0;const parts=[];
          res.on('data',chunk=>{bytes+=chunk.length;if(bytes>800000) req.destroy(Error('Source exceeded the byte limit.'));else parts.push(chunk);});
          res.on('end',()=>done({status:'available',html:Buffer.concat(parts).toString('utf8')}));res.on('error',fail);
        });
        req.setTimeout(10000,()=>req.destroy(Error('Source timed out.')));req.on('error',fail);req.end();
      });
      if (page.redirect) {url = safeSourceURL(new URL(page.redirect,url).href);if(!url) return {url:value,status:'rejected',reason:'Unsafe redirect.'};continue;}
      if (page.status !== 'available') return {url:value,finalURL:url,...page};
      const parsed = extractPage(page.html,url);
      if (parsed.text.length<120 || /just a moment|access denied|verify you are human/i.test(parsed.title)) return {url:value,finalURL:url,status:'inaccessible',reason:'Content could not be inspected.'};
      return {url:value,finalURL:url,status:'available',...parsed,contentSHA256:createHash('sha256').update(parsed.text).digest('hex')};
    } catch {return {url:value,status:'inaccessible',reason:'HTTPS, DNS or response verification failed.'};}
  }
  return {url:value,status:'inaccessible',reason:'Redirect limit exceeded.'};
}
export async function verifySources(discovered, jobUrl, {load = readPublicPage, now = ()=>new Date().toISOString()} = {}) {
  const candidates = [...new Set([jobUrl,...discovered].map(safeSourceURL).filter(Boolean))].slice(0,4);
  const records=[];
  const employerDomain=jobUrl?new URL(jobUrl).hostname.replace(/^(careers|jobs|www)\./i,''):null;
  const record=(page,url,kind)=>{
    const host=new URL(page.finalURL || url).hostname;
    const employerDomainMatch=!!employerDomain && (host===employerDomain || host.endsWith('.'+employerDomain));
    const expired=kind==='target_job' && /this (job|vacancy|position) (has expired|is no longer|is closed)|no longer accepting applications/i.test(page.text || '');
    return {...page,id:`S${records.length+1}`,checkedAt:now(),kind,employerDomainMatch,...(expired?{status:'expired',reason:'The target posting is marked closed or expired.'}:{})};
  };
  for (const url of candidates) {
    if(records.some(s=>s.url===url)) continue;
    const page = await load(url);
    const kind=url===jobUrl?'target_job':/\bAI\b|artificial intelligence/i.test(page.title || '') && /applicant|recruit|policy/i.test(page.title || '')?'applicant_ai_policy':'employer_context';
    records.push(record(page,url,kind));
    // Follow an observed policy link before spending another research/model call.
    for (const policyURL of page.policyLinks || []) if (!records.some(s=>s.url===policyURL) && records.length<5) {
      const policy = await load(policyURL);records.push(record(policy,policyURL,'applicant_ai_policy'));
    }
    if (records.length>=5) break;
  }
  return records;
}
