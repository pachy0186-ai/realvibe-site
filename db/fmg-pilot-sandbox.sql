-- Additive sandbox storage only. No changes to leads, auth or existing storage policies.
create table public.fmg_pilot_sandbox_orders (
  id uuid primary key,
  version integer not null default 0 check (version >= 0),
  checkout_id text unique,
  data jsonb not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  check (data->>'id' = id::text)
);
alter table public.fmg_pilot_sandbox_orders enable row level security;
revoke all on public.fmg_pilot_sandbox_orders from public, anon, authenticated;
grant select, insert, update, delete on public.fmg_pilot_sandbox_orders to service_role;
create index fmg_pilot_sandbox_orders_expiry on public.fmg_pilot_sandbox_orders(expires_at);
comment on table public.fmg_pilot_sandbox_orders is 'Server-only fictional sandbox orders. Expired records are inaccessible via the application; physical deletion is a separately reviewed retention task.';
