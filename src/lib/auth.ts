import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

function secret(): string {
  const s = import.meta.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET env var is not set');
  return s;
}

function sign(data: string): string {
  return createHmac('sha256', secret()).update(data).digest('base64url').slice(0, 24);
}

export function createSessionToken(): string {
  const ts = Date.now().toString(36);
  return `${ts}.${sign(ts)}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return false;
    const ts = token.slice(0, dot);
    const mac = token.slice(dot + 1);
    const expected = sign(ts);
    if (mac.length !== expected.length) return false;
    if (!timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return false;
    const age = Date.now() - parseInt(ts, 36);
    return age > 0 && age < SESSION_MAX_AGE;
  } catch {
    return false;
  }
}
