export const DOCUMENTS = Object.freeze({
  guide: "FMG_to_Pharma_7_Day_Career_Launch_Guide_FINAL_2026-11-13.pdf",
  workbook: "FMG_to_Pharma_Workbook_and_Templates_FINAL_2026-11-13.pdf"
});
export function isCheckoutReady(env = {}) {
  return env.FMG_TOOLKIT_PAYMENTS_ENABLED === "true" &&
    !!env.FMG_TOOLKIT_PAYMENT_LINK_ID && !!env.FMG_TOOLKIT_PRICE_ID &&
    !!env.STRIPE_SECRET_KEY && !!env.SUPABASE_URL &&
    !!(env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY);
}
export function paymentLinkUrl(raw) {
  if (!raw || typeof raw !== "string") return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" || !["buy.stripe.com", "checkout.stripe.com"].includes(u.hostname) ||
        u.username || u.password || u.hash) return null;
    return u.toString();
  } catch {return null;}
}
export function isPaidToolkitSession(session, lineItems, env = {}) {
  const expectedLive = env.FMG_TOOLKIT_LIVE_MODE === "true";
  if (!isCheckoutReady(env) || !session || session.livemode !== expectedLive ||
      session.payment_status !== "paid" || session.mode !== "payment") return false;
  const linkId = typeof session.payment_link === "string" ? session.payment_link : session.payment_link?.id;
  if (linkId !== env.FMG_TOOLKIT_PAYMENT_LINK_ID) return false;
  if (!Array.isArray(lineItems) || lineItems.length !== 1) return false;
  const item = lineItems[0];
  const actualPriceId = typeof item.price === "string" ? item.price : item.price?.id;
  return actualPriceId === env.FMG_TOOLKIT_PRICE_ID && item.quantity === 1;
}
export function allowedDoc(key) {
  return typeof key === "string" && Object.hasOwn(DOCUMENTS, key) ? DOCUMENTS[key] : null;
}
export function validCheckoutSessionId(value) {
  return typeof value === "string" && /^cs_(?:test_)?[A-Za-z0-9_]{15,200}$/.test(value);
}

export function safeSignedStorageUrl(raw,baseUrl,bucket){
  if(typeof raw!=="string"||!raw) return null;
  try {
    const base=new URL(baseUrl);
    if(base.protocol!=="https:")return null;
    let dest;
    if(raw.startsWith("/object/sign/"))dest=new URL("/storage/v1"+raw,base);
    else if(raw.startsWith("/storage/v1/object/sign/"))dest=new URL(raw,base);
    else if(raw.startsWith("https://"))dest=new URL(raw);
    else return null;
    const prefix="/storage/v1/object/sign/"+encodeURIComponent(bucket)+"/";
    if(dest.origin!==base.origin||dest.protocol!=="https:"||!dest.pathname.startsWith(prefix)||!dest.searchParams.has("token"))return null;
    return dest;
  }catch{return null;}
}
