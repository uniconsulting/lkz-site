"use server";

import { sendTelegramMessage } from "@/lib/notifications/telegram";
import { sendMaxMessage } from "@/lib/notifications/max";

export type ContactRequestData = {
  source: "contacts" | "partnership";
  name: string;
  organization: string;
  contact: string;
  interest: string;
  comment: string;
};

export type SendProposalData = {
  source: "contacts" | "partnership";
  name: string;
  contact: string;
  fileUrls: string[];
};

export type HowToBuyContactData = {
  name: string;
  company: string;
  contact: string;
  city: string;
  comment: string;
  answers: Record<string, string>;
};

function formatContactRequest(data: ContactRequestData): string {
  const source =
    data.source === "contacts"
      ? "Страница Контакты"
      : "Страница Партнёрство";

  const lines: string[] = [
    `📋 Новая заявка — ${source}`,
    ``,
    `👤 Имя: ${data.name || "—"}`,
    data.organization ? `🏢 Организация: ${data.organization}` : ``,
    `📞 Контакт: ${data.contact || "—"}`,
    data.interest ? `🎯 Интерес: ${data.interest}` : ``,
    data.comment ? `💬 Комментарий: ${data.comment}` : ``,
  ];

  return lines.filter((l, i) => i === 0 || l !== "").join("\n").trim();
}

function formatSendProposal(data: SendProposalData): string {
  const source =
    data.source === "contacts"
      ? "Страница Контакты"
      : "Страница Партнёрство";

  const fileList =
    data.fileUrls.length > 0
      ? data.fileUrls.map((url, i) => `  ${i + 1}. ${url}`).join("\n")
      : "  —";

  return [
    `📎 Входящее КП — ${source}`,
    ``,
    `👤 Имя: ${data.name || "—"}`,
    `📞 Контакт: ${data.contact || "—"}`,
    ``,
    `📁 Файлы:`,
    fileList,
  ].join("\n");
}

function formatHowToBuyContact(data: HowToBuyContactData): string {
  const answerLabels: Record<string, string> = {
    buyerType: "Тип покупателя",
    interestType: "Интерес",
    volume: "Объём",
    nextStep: "Следующий шаг",
  };

  const answerLines = Object.entries(data.answers)
    .map(([key, value]) => `  • ${answerLabels[key] ?? key}: ${value}`)
    .join("\n");

  const lines: string[] = [
    `📋 Новая заявка — Как купить`,
    ``,
    `📊 Ответы анкеты:`,
    answerLines,
    ``,
    `👤 Имя: ${data.name || "—"}`,
    data.company ? `🏢 Компания: ${data.company}` : ``,
    `📞 Контакт: ${data.contact || "—"}`,
    data.city ? `📍 Город / Регион: ${data.city}` : ``,
    data.comment ? `💬 Комментарий: ${data.comment}` : ``,
  ];

  return lines.filter((l, i) => i === 0 || l !== "").join("\n").trim();
}

async function notify(text: string) {
  await Promise.allSettled([sendTelegramMessage(text), sendMaxMessage(text)]);
}

export async function submitContactRequestAction(
  data: ContactRequestData,
): Promise<void> {
  await notify(formatContactRequest(data));
}

export async function submitSendProposalAction(
  data: SendProposalData,
): Promise<void> {
  await notify(formatSendProposal(data));
}

export async function submitHowToBuyAction(
  data: HowToBuyContactData,
): Promise<void> {
  await notify(formatHowToBuyContact(data));
}
