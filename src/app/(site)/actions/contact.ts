"use server";

import { sendTelegramMessage } from "@/lib/notifications/telegram";
import { sendMaxMessage } from "@/lib/notifications/max";
import { prisma } from "@/lib/prisma";

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

export type B2BLeadData = {
  name: string;
  contact: string;
  comment: string;
  answers: {
    profile?: string;
    format?: string;
    volume?: string;
    geography?: string;
    priority?: string;
  };
  result: {
    modelTitle: string;
    nextStepTitle: string;
  };
};

// Human-readable labels for quiz answers
const profileLabels: Record<string, string> = {
  dealer: "Дилер",
  retail_chain: "Торговая сеть",
  distributor: "Дистрибьютор",
  construction_base: "Строительная база",
  online_b2b: "B2B-ритейл / online-канал",
};

const formatLabels: Record<string, string> = {
  ready_products: "Готовая продукция",
  private_label: "Private Label / СТМ",
  hybrid: "Смешанный формат",
};

const volumeLabels: Record<string, string> = {
  test: "Тестовая партия",
  small: "Малый объём",
  medium: "Средний объём",
  large: "Крупный объём",
};

const geographyLabels: Record<string, string> = {
  local: "Один город / локально",
  region: "Один регион",
  multi_region: "Несколько регионов",
  federal: "Сетевая география",
};

const priorityLabels: Record<string, string> = {
  margin: "Максимальная маржа",
  logistics: "Оптимизация доставки",
  stm: "Быстрый запуск СТМ",
  assortment: "Широкая продуктовая матрица",
  stability: "Стабильность поставок",
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

function formatB2BLead(data: B2BLeadData): string {
  const a = data.answers;
  const lines: string[] = [
    `🤝 Новая B2B-заявка — Калькулятор сотрудничества`,
    ``,
    `📊 Ответы анкеты:`,
    a.profile ? `  • Кто вы: ${profileLabels[a.profile] ?? a.profile}` : ``,
    a.format ? `  • Формат: ${formatLabels[a.format] ?? a.format}` : ``,
    a.volume ? `  • Объём: ${volumeLabels[a.volume] ?? a.volume}` : ``,
    a.geography ? `  • География: ${geographyLabels[a.geography] ?? a.geography}` : ``,
    a.priority ? `  • Приоритет: ${priorityLabels[a.priority] ?? a.priority}` : ``,
    ``,
    `🎯 Рекомендованная модель: ${data.result.modelTitle}`,
    `📌 Следующий шаг: ${data.result.nextStepTitle}`,
    ``,
    `👤 Имя: ${data.name || "—"}`,
    `📞 Контакт: ${data.contact || "—"}`,
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
  await Promise.all([
    notify(formatContactRequest(data)),
    prisma.lead.create({
      data: {
        type: "contact",
        source: data.source,
        name: data.name,
        contact: data.contact,
        data: data as object,
      },
    }),
  ]);
}

export async function submitSendProposalAction(
  data: SendProposalData,
): Promise<void> {
  await Promise.all([
    notify(formatSendProposal(data)),
    prisma.lead.create({
      data: {
        type: "send_proposal",
        source: data.source,
        name: data.name,
        contact: data.contact,
        data: data as object,
      },
    }),
  ]);
}

export async function submitHowToBuyAction(
  data: HowToBuyContactData,
): Promise<void> {
  await Promise.all([
    notify(formatHowToBuyContact(data)),
    prisma.lead.create({
      data: {
        type: "how_to_buy",
        source: "how_to_buy",
        name: data.name,
        contact: data.contact,
        data: data as object,
      },
    }),
  ]);
}

export async function submitB2BLeadAction(
  data: B2BLeadData,
): Promise<void> {
  await Promise.all([
    notify(formatB2BLead(data)),
    prisma.lead.create({
      data: {
        type: "b2b_quiz",
        source: "b2b_calculator",
        name: data.name,
        contact: data.contact,
        data: data as object,
      },
    }),
  ]);
}
