import { getSetting } from "@/lib/settings";

export async function sendTelegramMessage(text: string): Promise<void> {
  const token =
    process.env.TELEGRAM_BOT_TOKEN || (await getSetting("TELEGRAM_BOT_TOKEN"));
  const chatId =
    process.env.TELEGRAM_CHAT_ID || (await getSetting("TELEGRAM_CHAT_ID"));

  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch {
    // уведомление не должно блокировать основной поток
  }
}
