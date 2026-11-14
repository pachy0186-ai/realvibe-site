import {isCheckoutReady, paymentLinkUrl} from "../lib/toolkit-commerce-core.js";
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  if (req.method !== "GET") {res.setHeader("Allow", "GET"); return res.status(405).end();}
  if (!isCheckoutReady(process.env)) return res.status(503).json({error:"FMG toolkit checkout has not been activated."});
  const url = paymentLinkUrl(process.env.FMG_TOOLKIT_STRIPE_LINK_URL);
  if (!url) return res.status(503).json({error:"Checkout is not configured."});
  res.setHeader("Referrer-Policy", "no-referrer");
  return res.redirect(303,url);
}
