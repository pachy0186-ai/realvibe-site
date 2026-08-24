const MAX_BODY_BYTES = 120_000;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(503).json({ error: "Response collection is not configured yet." });
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

    const upstream = await fetch(`${supabaseUrl}/rest/v1/fmg_reality_check_responses`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(record),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("FMG Reality Check Supabase insert failed", upstream.status, detail.slice(0, 500));
      return res.status(502).json({ error: "Unable to save response." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("FMG Reality Check submission error", error?.message || error);
    return res.status(500).json({ error: "Unable to save response." });
  }
}
