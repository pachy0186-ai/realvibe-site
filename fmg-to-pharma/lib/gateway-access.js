// Preserve actionable classifications without returning provider bodies or credentials.
export function gatewayFailure(status, data) {
  const parts = [];
  function inspect(value, depth = 0) {
    if (depth > 4 || value == null) return;
    if (typeof value === 'string') {
      parts.push(value.slice(0, 8000));
      if (value.trim().startsWith('{')) {try {inspect(JSON.parse(value), depth + 1);} catch {}}
    } else if (typeof value === 'object') for (const key of ['error', 'code', 'type', 'message']) inspect(value[key], depth + 1);
  }
  inspect(data);const detail = parts.join(' ').toLowerCase();
  let code = 'gateway_request_failed', message = `AI Gateway request failed (${status}).`;
  if (detail.includes('customer_verification_required') || /requires? a valid credit card|valid payment method.*required/.test(detail)) {
    code = 'customer_verification_required';message = 'AI Gateway requires account verification to unlock free credits; this is separate from purchasing credits.';
  } else if (detail.includes('insufficient_funds')) {
    code = 'insufficient_funds';message = 'AI Gateway has no usable credit balance for this request.';
  } else if (detail.includes('quota_for_entity_exceeded')) {
    code = 'quota_for_entity_exceeded';message = 'An AI Gateway spending limit has been reached.';
  } else if (/model.*(not.allowed|not.available|not.supported|free.tier)|free.tier.*model|model_access_denied/.test(detail)) {
    code = 'model_access_denied';message = 'This model is unavailable under the current Gateway tier or model-access rules.';
  } else if (status === 401) {
    code = 'authentication_failed';message = 'AI Gateway authentication failed; check the project identity or API-key configuration.';
  } else if (status === 429) {
    code = 'rate_limited';message = 'AI Gateway rate limit reached. Wait before retrying.';
  } else if (status === 403) {
    code = 'access_denied';message = 'AI Gateway denied access; check model eligibility, account restrictions and configuration.';
  }
  const error = new Error(message);error.code = code;error.status = status;return error;
}

export const FREE_VALIDATION_MODELS = Object.freeze(['openai/gpt-5-mini', 'openai/gpt-5.4-nano']);
export function resolveModels(env) {
  const free = env.FMG_AI_PROFILE === 'free-credit-validation';
  const models = {research: env.FMG_RESEARCH_MODEL || (free ? 'openai/gpt-5-mini' : 'openai/gpt-5.4-mini'),
    synthesis: env.FMG_SYNTHESIS_MODEL || (free ? 'openai/gpt-5-mini' : 'openai/gpt-5.4-fast')};
  const allowed = free ? FREE_VALIDATION_MODELS : ['openai/gpt-5.4-mini', 'openai/gpt-5.4-fast', ...FREE_VALIDATION_MODELS];
  if (!Object.values(models).every(id => allowed.includes(id))) throw Error(free ? 'Free-credit validation rejects models outside the verified free-tier allowlist.' : 'Model must pass the reviewed allowlist.');
  return models;
}
