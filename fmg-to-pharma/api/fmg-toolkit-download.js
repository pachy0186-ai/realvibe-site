import Stripe from "stripe";
import {allowedDoc, isCheckoutReady, isPaidToolkitSession, validCheckoutSessionId} from "../lib/toolkit-commerce-core.js";
const BUCKET = "fmg-paid-toolkit";
async function signedDownload(filename, env) {
  const base = new URL(env.SUPABASE_URL);
  if (base.protocol !== "https:") throw new Error("Storage URL must use HTTPS");
  const secret = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  const url = new URL("/storage/v1/object/sign/" + BUCKET + "/" + encodeURIComponent(filename),base);
  const headers = {"apikey":secret,"Content-Type":"application/json"};
  if (!secret.startsWith("sb_secret_")) headers.Authorization = "Bearer " + secret;
  const response = await fetch(url,{method:"POST",headers,body:JSON.stringify({expiresIn:180}),signal:AbortSignal.timeout(8000)});
  if (!response.ok) throw new Error("Unable to create a protected download");
  const body = await response.json();
  const path = body.signedURL || body.signedUrl;
  if (typeof path !== "string") throw new Error("Invalid storage response");
  const target = new URL(path,base);
  if (target.origin !== base.origin || target.protocol !== "https:" || !target.pathname.includes("/storage/v1/object/sign/")) {
    throw new Error("Untrusted download destination");
  }
  return target.toString();
}
export default async function handler(req,res) {
  res.setHeader("Cache-Control","private, no-store, max-age=0");
  res.setHeader("Referrer-Policy","no-referrer");
  res.setHeader("X-Robots-Tag","noindex, nofollow");
  if (req.method !== "GET") {res.setHeader("Allow","GET");return res.status(405).end();}
  if (!isCheckoutReady(process.env)) return res.status(503).json({error:"Downloads are not available yet."});
  const sessionId = req.query.session_id;
  const filename = allowedDoc(req.query.doc);
  if (!validCheckoutSessionId(sessionId) || !filename) return res.status(400).json({error:"Invalid download request."});
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lines = await stripe.checkout.sessions.listLineItems(sessionId,{limit:10});
    if (!isPaidToolkitSession(session,lines.data,process.env)) return res.status(403).json({error:"No verified toolkit purchase."});
    if (!session.payment_intent) return res.status(403).json({error:"Payment is not confirmed."});
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent,{expand:["latest_charge"]});
    const charge = paymentIntent.latest_charge;
    if (paymentIntent.status !== "succeeded" || !charge || typeof charge === "string" || charge.refunded || charge.amount_refunded > 0) {
      return res.status(403).json({error:"Payment was refunded or not confirmed."});
    }
    const url = await signedDownload(filename,process.env);
    return res.redirect(303,url);
  } catch(e) {
    console.error("FMG toolkit secure download failed",e?.type || e?.name || "error");
    return res.status(503).json({error:"We could not verify this download. Please contact support with your Stripe receipt."});
  }
}
