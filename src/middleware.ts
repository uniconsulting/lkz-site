import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/adpanel/:path*"],
};

const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

async function verifyToken(token: string, secret: string): Promise<boolean> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;

  const iat = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const age = Date.now() - parseInt(iat, 10);
  if (isNaN(age) || age < 0 || age > SESSION_MAX_AGE_MS) return false;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    const sigBytes = new Uint8Array(
      sig.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)),
    );

    return await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(iat),
    );
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secret = process.env.ADMIN_SECRET;

  // Если секрет не задан — не блокируем (нет смысла без пароля)
  if (!secret) return NextResponse.next();

  const isLoginPage = pathname === "/adpanel/login";
  const token = request.cookies.get("admin_session")?.value;
  const isValid = token ? await verifyToken(token, secret) : false;

  // Уже авторизован и пришёл на /login — редиректим в панель
  if (isLoginPage && isValid) {
    return NextResponse.redirect(new URL("/adpanel/products", request.url));
  }

  // Не авторизован и пришёл НЕ на /login — редиректим на вход
  if (!isLoginPage && !isValid) {
    const url = new URL("/adpanel/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
