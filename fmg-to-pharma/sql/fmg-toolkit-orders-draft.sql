-- PRIVATE DRAFT — do not apply to production without owner approval and QA.
-- A separate purchase ledger; does not touch Reality Check submissions.
CREATE TABLE IF NOT EXISTS public.fmg_toolkit_orders (
  stripe_session_id text PRIMARY KEY CHECK (length(stripe_session_id) <= 255),
  stripe_payment_intent_id text,
  buyer_email text NOT NULL CHECK (length(buyer_email) <= 254),
  paid_at timestamptz NOT NULL DEFAULT now(),
  email_sent_at timestamptz
);
ALTER TABLE public.fmg_toolkit_orders ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.fmg_toolkit_orders FROM anon, authenticated;
GRANT ALL ON TABLE public.fmg_toolkit_orders TO service_role;
COMMENT ON TABLE public.fmg_toolkit_orders IS
  'Private self-service FMG purchase confirmations for transactional delivery; never marketing subscribers.';
-- No public / authenticated RLS policies. Server-only service key operations.
-- Define a documented retention/deletion period before enabling live orders.
