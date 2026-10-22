export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    return res.status(503).json({
      ok: false,
      configured: false,
      urlConfigured: Boolean(supabaseUrl),
      keyConfigured: Boolean(supabaseSecretKey),
    });
  }

  try {
    const headers = { apikey: supabaseSecretKey };
    if (!supabaseSecretKey.startsWith("sb_secret_")) {
      headers.Authorization = `Bearer ${supabaseSecretKey}`;
    }

    const upstream = await fetch(
      `${supabaseUrl}/rest/v1/fmg_reality_check_responses?select=response_id&limit=1`,
      { headers }
    );

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("FMG Supabase health check failed", upstream.status, detail.slice(0, 300));
      return res.status(502).json({
        ok: false,
        configured: true,
        databaseReachable: false,
        upstreamStatus: upstream.status,
      });
    }

    return res.status(200).json({
      ok: true,
      configured: true,
      databaseReachable: true,
      tableReady: true,
    });
  } catch (error) {
    console.error("FMG health check error", error?.message || error);
    return res.status(500).json({ ok: false, configured: true, databaseReachable: false });
  }
}
