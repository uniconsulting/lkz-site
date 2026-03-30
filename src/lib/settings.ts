import { prisma } from "@/lib/prisma";

export async function getSetting(key: string): Promise<string | null> {
  try {
    const record = await prisma.settings.findUnique({ where: { key } });
    return record?.value ?? null;
  } catch {
    return null;
  }
}

export async function setSetting(key: string, value: string): Promise<void> {
  await prisma.settings.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function getNotificationSettings() {
  const [tgToken, tgChatId, maxToken, maxChatId] = await Promise.all([
    getSetting("TELEGRAM_BOT_TOKEN"),
    getSetting("TELEGRAM_CHAT_ID"),
    getSetting("MAX_BOT_TOKEN"),
    getSetting("MAX_CHAT_ID"),
  ]);

  return {
    telegram: {
      token: tgToken ?? process.env.TELEGRAM_BOT_TOKEN ?? "",
      chatId: tgChatId ?? process.env.TELEGRAM_CHAT_ID ?? "",
    },
    max: {
      token: maxToken ?? process.env.MAX_BOT_TOKEN ?? "",
      chatId: maxChatId ?? process.env.MAX_CHAT_ID ?? "",
    },
  };
}
