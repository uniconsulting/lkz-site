"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSessionToken } from "@/lib/auth";

export async function loginAction(
  _prevState: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const password = (formData.get("password") as string) ?? "";

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminPassword || !adminSecret) {
    return { error: "Пароль администратора не задан в настройках сервера" };
  }

  if (password !== adminPassword) {
    // Небольшая задержка против брутфорса
    await new Promise((r) => setTimeout(r, 500));
    return { error: "Неверный пароль" };
  }

  const token = createSessionToken(adminSecret);

  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  redirect("/adpanel/products");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/adpanel/login");
}
