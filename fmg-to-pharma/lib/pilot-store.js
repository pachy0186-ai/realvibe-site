import {ensure} from './pilot-domain.js';

// Separate sandbox-only table; existing lead/auth/document tables are never used here.
export function supabaseStore(env, fetchImpl = fetch) {
  const base = String(env.SUPABASE_URL || '').replace(/\/$/, '');
  const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  ensure(base.startsWith('https://') && key, 'Sandbox order storage is not configured.');
  const headers = {apikey: key, 'Content-Type': 'application/json', Prefer: 'return=representation'};
  if (!key.startsWith('sb_secret_')) headers.Authorization = `Bearer ${key}`;
  async function request(query, method = 'GET', body) {
    const response = await fetchImpl(`${base}/rest/v1/fmg_pilot_sandbox_orders?${query}`, {
      method, headers, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(12000), cache: 'no-store',
    });
    ensure(response.ok, 'Sandbox order storage request failed.');
    return response.status === 204 ? [] : response.json();
  }
  function row(order, version) {
    return {id: order.id, version, checkout_id: order.checkoutId, data: order,
      expires_at: new Date(Date.parse(order.createdAt) + 30 * 86400000).toISOString()};
  }
  return {
    async create(order) {await request('', 'POST', row(order, 0)); return {order, version: 0};},
    async get(id) {const rows = await request(`id=eq.${encodeURIComponent(id)}&expires_at=gt.${encodeURIComponent(new Date().toISOString())}&select=id,version,data`);return rows[0] ? {order: rows[0].data, version: rows[0].version} : null;},
    async save(order, version) {const rows = await request(`id=eq.${encodeURIComponent(order.id)}&version=eq.${version}`, 'PATCH', row(order, version + 1));return rows.length === 1;},
  };
}
export function memoryStore() {
  const rows = new Map();
  return {
    async create(order) {ensure(!rows.has(order.id), 'Duplicate order.');rows.set(order.id, {order: structuredClone(order), version: 0});return this.get(order.id);},
    async get(id) {return rows.has(id) ? structuredClone(rows.get(id)) : null;},
    async save(order, version) {if (rows.get(order.id)?.version !== version) return false;rows.set(order.id, {order: structuredClone(order), version: version + 1});return true;},
  };
}
export async function updateOrder(store, id, transform) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const found = await store.get(id); ensure(found, 'Order not found.');
    const updated = transform(found.order);
    if (await store.save(updated, found.version)) return updated;
  }
  throw new Error('Order changed concurrently. Please retry.');
}
