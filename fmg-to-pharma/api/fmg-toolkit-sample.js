// Free-preview redirect is disabled until an editorial-approved PDF is shared publicly.
// A private Google Drive URL will not work for visitors and must never be used here.
export default function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  res.setHeader("X-Robots-Tag","noindex, nofollow");
  if(req.method!=="GET"){res.setHeader("Allow","GET");return res.status(405).end();}
  if(process.env.FMG_FREE_SAMPLE_PUBLISHED!=="true")return res.status(503).json({error:"The PDF sample is not published yet."});
  const raw=process.env.FMG_FREE_SAMPLE_PUBLIC_URL;
  let url;
  try{url=new URL(raw);}catch{return res.status(503).json({error:"Sample PDF URL is not configured."});}
  if(url.protocol!=="https:" || !["drive.google.com","docs.google.com"].includes(url.hostname)) return res.status(503).json({error:"Sample PDF URL is not approved."});
  res.setHeader("Referrer-Policy","no-referrer");
  return res.redirect(303,url.toString());
}
