"use server";

import { setSetting } from "@/lib/settings";

export async function saveTelegramSettingsAction(
  token: string,
  chatId: string,
): Promise<void> {
  await Promise.all([
    setSetting("TELEGRAM_BOT_TOKEN", token.trim()),
    setSetting("TELEGRAM_CHAT_ID", chatId.trim()),
  ]);
}

export async function saveMaxSettingsAction(
  token: string,
  chatId: string,
): Promise<void> {
  await Promise.all([
    setSetting("MAX_BOT_TOKEN", token.trim()),
    setSetting("MAX_CHAT_ID", chatId.trim()),
  ]);
}

export async function testTelegramAction(
  token: string,
  chatId: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!token || !chatId) {
    return { ok: false, error: "Заполните токен и Chat ID" };
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "✅ Тестовое сообщение от LKZ Admin\nСоединение настроено успешно!",
        }),
      },
    );
    const data = await res.json();
    if (!data.ok) {
      return {
        ok: false,
        error: data.description ?? "Telegram вернул ошибку",
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Ошибка сети" };
  }
}

export async function testMaxAction(
  token: string,
  chatId: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!token || !chatId) {
    return { ok: false, error: "Заполните токен и User ID" };
  }

  try {
    const res = await fetch(
      `https://platform-api.max.ru/messages?user_id=${chatId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({
          text: "✅ Тестовое сообщение от LKZ Admin\nСоединение настроено успешно!",
        }),
      },
    );
    if (!res.ok) {
      return { ok: false, error: `MAX вернул ${res.status}` };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Ошибка сети" };
  }
}
