import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 дней

export function createSessionToken(secret: string): string {
  const iat = Date.now().toString();
  const sig = createHmac("sha256", secret).update(iat).digest("hex");
  return `${iat}.${sig}`;
}

export function verifySessionToken(token: string, secret: string): boolean {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;

  const iat = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const age = Date.now() - parseInt(iat, 10);
  if (isNaN(age) || age < 0 || age > SESSION_MAX_AGE_MS) return false;

  const expected = createHmac("sha256", secret).update(iat).digest("hex");

  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

/** Для использования внутри API-роутов и server actions (Node.js runtime) */
export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true; // dev-режим без настроенного пароля

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;

  return verifySessionToken(token, secret);
}
