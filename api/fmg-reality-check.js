const MAX_BODY_BYTES = 120_000;

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "");
  const key = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  ).trim();
  return { url, key };
}

function logFetchError(prefix, error) {
  const cause = error?.cause || {};
  console.error(prefix, {
    message: error?.message || String(error),
    name: error?.name,
    causeCode: cause?.code,
    causeMessage: cause?.message,
    syscall: cause?.syscall,
    hostname: cause?.hostname,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url: supabaseUrl, key: supabaseSecretKey } = getSupabaseConfig();

  if (!supabaseUrl || !supabaseSecretKey) {
    return res.status(503).json({ error: "Response collection is not configured yet." });
  }

  try {
    new URL(supabaseUrl);
  } catch {
    console.error("FMG Reality Check invalid SUPABASE_URL configuration");
    return res.status(503).json({ error: "Response collection is not configured correctly." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const serialized = JSON.stringify(body || {});

    if (Buffer.byteLength(serialized, "utf8") > MAX_BODY_BYTES) {
      return res.status(413).json({ error: "Response is too large." });
    }

    if (!body?.response_id || !body?.assessment_version || body?.research_consent !== true) {
      return res.status(400).json({ error: "Invalid assessment payload." });
    }

    const record = {
      response_id: String(body.response_id).slice(0, 120),
      assessment_version: String(body.assessment_version).slice(0, 80),
      submitted_at: body.submitted_at || new Date().toISOString(),
      research_consent: true,
      answers: body.answers || {},
      derived: body.derived || {},
      contact: body.contact || {},
      source: body.source || {},
    };

    const headers = {
      apikey: supabaseSecretKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    };

    if (!supabaseSecretKey.startsWith("sb_secret_")) {
      headers.Authorization = `Bearer ${supabaseSecretKey}`;
    }

    const upstream = await fetch(`${supabaseUrl}/rest/v1/fmg_reality_check_responses`, {
      method: "POST",
      headers,
      body: JSON.stringify(record),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("FMG Reality Check Supabase insert failed", upstream.status, detail.slice(0, 500));
      return res.status(502).json({ error: "Unable to save response." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    logFetchError("FMG Reality Check submission error", error);
    return res.status(500).json({ error: "Unable to save response." });
  }
}
