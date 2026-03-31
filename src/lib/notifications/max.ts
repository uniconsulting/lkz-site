import { getSetting } from "@/lib/settings";

export async function sendMaxMessage(text: string): Promise<void> {
  const token = await getSetting("MAX_BOT_TOKEN");
  const userId = await getSetting("MAX_CHAT_ID");

  if (!token || !userId) return;

  try {
    await fetch(`https://platform-api.max.ru/messages?user_id=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ text }),
    });
  } catch {
    // уведомление не должно блокировать основной поток
  }
}
