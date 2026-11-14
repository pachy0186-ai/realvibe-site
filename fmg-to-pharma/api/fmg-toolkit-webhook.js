import Stripe from "stripe";
import nodemailer from "nodemailer";
import {isCheckoutReady,isPaidToolkitSession} from "../lib/toolkit-commerce-core.js";
export const config = {api:{bodyParser:false}};
const REQUIRED = ["FMG_TOOLKIT_STRIPE_WEBHOOK_SECRET","FMG_TOOLKIT_PUBLIC_ORIGIN","FMG_SMTP_HOST","FMG_SMTP_USER","FMG_SMTP_PASSWORD","FMG_EMAIL_FROM"];
async function rawBody(req) {
  const chunks=[];let length=0;
  for await(const c of req){length+=c.length;if(length>1024*1024)throw new Error("payload limit");chunks.push(c);}
  return Buffer.concat(chunks);
}
async function dbRequest(env,method,query,record){
  const url=new URL("/rest/v1/fmg_toolkit_orders"+query,env.SUPABASE_URL);
  const secret=env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  const headers={apikey:secret,"Content-Type":"application/json",Prefer:"return=representation"};
  if(!secret.startsWith("sb_secret_"))headers.Authorization="Bearer "+secret;
  if(method==="POST")headers.Prefer="resolution=merge-duplicates,return=representation";
  const response=await fetch(url,{method,headers,body:record?JSON.stringify(record):undefined,signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw new Error("secure order tracking failed");
  return response.json();
}
function receiptUrl(env,sessionId){
  const url=new URL("/toolkit-access",env.FMG_TOOLKIT_PUBLIC_ORIGIN);
  if(url.protocol!=="https:")throw new Error("invalid delivery origin");
  url.searchParams.set("session_id",sessionId);
  return url.toString();
}
export default async function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  if(req.method!=="POST"){res.setHeader("Allow","POST");return res.status(405).end();}
  if(!isCheckoutReady(process.env)||process.env.FMG_TOOLKIT_EMAIL_ENABLED!=="true"||REQUIRED.some(key=>!process.env[key]))
    return res.status(503).json({error:"Automatic fulfillment is not enabled."});
  const env=process.env;let event;
  try{
    const stripe=new Stripe(env.STRIPE_SECRET_KEY);
    event=stripe.webhooks.constructEvent(await rawBody(req),req.headers["stripe-signature"],env.FMG_TOOLKIT_STRIPE_WEBHOOK_SECRET);
  }catch{return res.status(400).json({error:"Invalid signature."});}
  if(!["checkout.session.completed","checkout.session.async_payment_succeeded"].includes(event.type))
    return res.status(200).json({ignored:true});
  try{
    const stripe=new Stripe(env.STRIPE_SECRET_KEY);
    const session=await stripe.checkout.sessions.retrieve(event.data.object.id);
    const items=await stripe.checkout.sessions.listLineItems(session.id,{limit:10});
    if(!isPaidToolkitSession(session,items.data,env))return res.status(200).json({ignored:true});
    const email=session.customer_details?.email||session.customer_email;
    if(typeof email!=="string"||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(503).json({error:"Buyer email unavailable."});
    // Never contact an arbitrary person when testing in a preview environment.
    if(env.FMG_TOOLKIT_LIVE_MODE!=="true"){
      const allow=(env.FMG_TOOLKIT_TEST_EMAIL_ALLOWLIST||"").split(",").map(v=>v.trim().toLowerCase()).filter(Boolean);
      if(!allow.includes(email.toLowerCase()))return res.status(200).json({skipped_test_recipient:true});
    }
    const key=encodeURIComponent(session.id);
    const row={stripe_session_id:session.id,stripe_payment_intent_id:typeof session.payment_intent==="string"?session.payment_intent:session.payment_intent?.id,buyer_email:email,paid_at:new Date().toISOString()};
    await dbRequest(env,"POST","?on_conflict=stripe_session_id",row);
    const rows=await dbRequest(env,"GET","?stripe_session_id=eq."+key+"&select=stripe_session_id,email_sent_at");
    if(rows[0]?.email_sent_at)return res.status(200).json({already_sent:true});
    const link=receiptUrl(env,session.id);
    const transport=nodemailer.createTransport({host:env.FMG_SMTP_HOST,port:Number(env.FMG_SMTP_PORT||465),secure:Number(env.FMG_SMTP_PORT||465)===465,auth:{user:env.FMG_SMTP_USER,pass:env.FMG_SMTP_PASSWORD}});
    await transport.sendMail({from:env.FMG_EMAIL_FROM,to:email,subject:"Your FMG to Pharma 7-Day Career Launch Kit",
      text:"Thank you for purchasing the FMG to Pharma career toolkit. Open your secure access page to download your guide and companion workbook:\n"+link+"\n\nKeep this link private. If you have trouble accessing your files, reply to this email.\n\nFMG to Pharma — RealVibeAI LLC",replyTo:"fmgtopharma@gmail.com"});
    await dbRequest(env,"PATCH","?stripe_session_id=eq."+key,{email_sent_at:new Date().toISOString()});
    return res.status(200).json({fulfilled:true});
  }catch(error){console.error("FMG toolkit receipt error",error?.name||"Error");return res.status(503).json({error:"Fulfillment temporarily unavailable."});}
}
