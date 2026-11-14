import {isCheckoutReady, paymentLinkUrl} from "../lib/toolkit-commerce-core.js";
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  if (req.method !== "GET") {res.setHeader("Allow", "GET"); return res.status(405).end();}
  if (req.query?.sample === "1") {
    if (process.env.FMG_FREE_SAMPLE_PUBLISHED !== "true") return res.status(503).json({error:"PDF sample is not published yet."});
    try {
      const url = new URL(process.env.FMG_FREE_SAMPLE_PUBLIC_URL);
      if (url.protocol !== "https:" || !["drive.google.com","docs.google.com"].includes(url.hostname))
        return res.status(503).json({error:"Sample URL is not approved."});
      return res.redirect(303,url.toString());
    } catch {return res.status(503).json({error:"Sample URL is not configured."});}
  }
  if (!isCheckoutReady(process.env)) return res.status(503).json({error:"FMG toolkit checkout has not been activated."});
  const url = paymentLinkUrl(process.env.FMG_TOOLKIT_STRIPE_LINK_URL);
  if (!url) return res.status(503).json({error:"Checkout is not configured."});
  res.setHeader("Referrer-Policy", "no-referrer");
  return res.redirect(303,url);
}
