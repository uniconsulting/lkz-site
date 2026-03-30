import { describe, it, expect, vi } from "vitest";

// next/headers недоступен вне Next.js runtime — мокируем модуль целиком
vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

import { createSessionToken, verifySessionToken } from "./auth";

const SECRET = "test-secret-key";

describe("createSessionToken", () => {
  it("возвращает строку формата <iat>.<sig>", () => {
    const token = createSessionToken(SECRET);
    const parts = token.split(".");
    expect(parts).toHaveLength(2);
    expect(Number(parts[0])).toBeGreaterThan(0);
    expect(parts[1]).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe("verifySessionToken", () => {
  it("подтверждает токен, созданный только что", () => {
    const token = createSessionToken(SECRET);
    expect(verifySessionToken(token, SECRET)).toBe(true);
  });

  it("отклоняет токен с неверным секретом", () => {
    const token = createSessionToken(SECRET);
    expect(verifySessionToken(token, "wrong-secret")).toBe(false);
  });

  it("отклоняет токен с подменённой подписью", () => {
    const token = createSessionToken(SECRET);
    const [iat] = token.split(".");
    const tampered = `${iat}.${"a".repeat(64)}`;
    expect(verifySessionToken(tampered, SECRET)).toBe(false);
  });

  it("отклоняет токен без точки", () => {
    expect(verifySessionToken("nodottoken", SECRET)).toBe(false);
  });

  it("отклоняет токен с нечисловым iat", () => {
    const token = `notanumber.${"a".repeat(64)}`;
    expect(verifySessionToken(token, SECRET)).toBe(false);
  });

  it("отклоняет просроченный токен (старше 30 дней)", () => {
    const THIRTY_ONE_DAYS_MS = 31 * 24 * 60 * 60 * 1000;
    const oldIat = (Date.now() - THIRTY_ONE_DAYS_MS).toString();
    const { createHmac } = await import("crypto");
    const sig = createHmac("sha256", SECRET).update(oldIat).digest("hex");
    const token = `${oldIat}.${sig}`;
    expect(verifySessionToken(token, SECRET)).toBe(false);
  });

  it("отклоняет токен с будущим iat (age < 0)", () => {
    const futureIat = (Date.now() + 60_000).toString();
    const { createHmac } = await import("crypto");
    const sig = createHmac("sha256", SECRET).update(futureIat).digest("hex");
    const token = `${futureIat}.${sig}`;
    expect(verifySessionToken(token, SECRET)).toBe(false);
  });
});
