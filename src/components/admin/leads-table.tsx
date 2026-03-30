"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { markLeadReadAction } from "@/app/adpanel/(panel)/leads/actions";

export type LeadRow = {
  id: string;
  createdAt: string; // ISO string
  type: string;
  source: string;
  name: string;
  contact: string;
  data: unknown;
  isRead: boolean;
};

const typeLabels: Record<string, string> = {
  contact: "Обратная связь",
  b2b_quiz: "B2B-калькулятор",
  how_to_buy: "Как купить",
  send_proposal: "Входящее КП",
};

const sourceLabels: Record<string, string> = {
  contacts: "Контакты",
  partnership: "Партнёрство",
  how_to_buy: "Как купить",
  b2b_calculator: "Калькулятор",
};

const profileLabels: Record<string, string> = {
  dealer: "Дилер",
  retail_chain: "Торговая сеть",
  distributor: "Дистрибьютор",
  construction_base: "Строительная база",
  online_b2b: "B2B-ритейл / online",
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ru", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LeadDetail({ lead }: { lead: LeadRow }) {
  const data = lead.data as Record<string, unknown>;

  if (lead.type === "b2b_quiz") {
    const answers = (data.answers ?? {}) as Record<string, string>;
    const result = (data.result ?? {}) as Record<string, string>;
    return (
      <div className="space-y-4">
        <Section title="Анкета">
          {answers.profile && <Row label="Кто вы" value={profileLabels[answers.profile] ?? answers.profile} />}
          {answers.format && <Row label="Формат" value={formatLabels[answers.format] ?? answers.format} />}
          {answers.volume && <Row label="Объём" value={volumeLabels[answers.volume] ?? answers.volume} />}
          {answers.geography && <Row label="География" value={geographyLabels[answers.geography] ?? answers.geography} />}
          {answers.priority && <Row label="Приоритет" value={priorityLabels[answers.priority] ?? answers.priority} />}
        </Section>
        {result.modelTitle && (
          <Section title="Результат">
            <Row label="Модель" value={result.modelTitle} />
            {result.nextStepTitle && <Row label="Следующий шаг" value={result.nextStepTitle} />}
          </Section>
        )}
        {data.comment ? (
          <Section title="Комментарий">
            <p className="text-[14px] leading-[1.5] text-[var(--color-text)]">{String(data.comment)}</p>
          </Section>
        ) : null}
      </div>
    );
  }

  if (lead.type === "contact") {
    return (
      <div className="space-y-4">
        <Section title="Данные">
          {data.organization ? <Row label="Организация" value={String(data.organization)} /> : null}
          {data.interest ? <Row label="Интерес" value={String(data.interest)} /> : null}
          {data.comment ? <Row label="Комментарий" value={String(data.comment)} /> : null}
        </Section>
      </div>
    );
  }

  if (lead.type === "how_to_buy") {
    const answers = (data.answers ?? {}) as Record<string, string>;
    const answerLabels: Record<string, string> = {
      buyerType: "Тип покупателя",
      interestType: "Интерес",
      volume: "Объём",
      nextStep: "Следующий шаг",
    };
    return (
      <div className="space-y-4">
        {Object.keys(answers).length > 0 && (
          <Section title="Анкета">
            {Object.entries(answers).map(([k, v]) => (
              <Row key={k} label={answerLabels[k] ?? k} value={v} />
            ))}
          </Section>
        )}
        <Section title="Данные">
          {data.company ? <Row label="Компания" value={String(data.company)} /> : null}
          {data.city ? <Row label="Город / Регион" value={String(data.city)} /> : null}
          {data.comment ? <Row label="Комментарий" value={String(data.comment)} /> : null}
        </Section>
      </div>
    );
  }

  if (lead.type === "send_proposal") {
    const fileUrls = (data.fileUrls ?? []) as string[];
    return (
      <div className="space-y-4">
        <Section title="Файлы КП">
          {fileUrls.length > 0 ? (
            <ul className="space-y-1">
              {fileUrls.map((url, i) => (
                <li key={i}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-[var(--color-accent-1)] underline underline-offset-2"
                  >
                    Файл {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14px] text-[var(--color-text-muted)]">Файлы не приложены</p>
          )}
        </Section>
      </div>
    );
  }

  return (
    <pre className="overflow-auto rounded-[12px] bg-[var(--color-surface)] p-4 text-[12px]">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] bg-[var(--color-surface)] p-4">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[12px] text-[var(--color-text-muted)]">{label}</span>
      <span className="text-[14px] text-[var(--color-text)]">{value}</span>
    </div>
  );
}

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const [selected, setSelected] = useState<LeadRow | null>(null);
  const [localLeads, setLocalLeads] = useState(leads);
  const [, startTransition] = useTransition();

  function openLead(lead: LeadRow) {
    setSelected(lead);
    if (!lead.isRead) {
      setLocalLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, isRead: true } : l)),
      );
      startTransition(async () => {
        await markLeadReadAction(lead.id);
      });
    }
  }

  if (localLeads.length === 0) {
    return (
      <div className="rounded-[24px] bg-[var(--color-surface)] px-6 py-16 text-center">
        <p className="text-[15px] text-[var(--color-text-muted)]">Заявок пока нет</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-[24px] bg-[var(--color-surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-[var(--color-bg)]">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Дата
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Тип
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Имя
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Контакт
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Источник
                </th>
                <th className="w-10 px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {localLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => openLead(lead)}
                  className={cn(
                    "cursor-pointer border-b border-[var(--color-bg)] transition duration-200 last:border-0 hover:bg-[var(--color-bg)]",
                  )}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {!lead.isRead && (
                        <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent-1)]" />
                      )}
                      <span className="text-[13px] text-[var(--color-text-muted)]">
                        {formatDate(lead.createdAt)}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center rounded-[999px] bg-[var(--color-bg)] px-3 py-1 text-[12px] font-medium text-[var(--color-text)]">
                      {typeLabels[lead.type] ?? lead.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[14px] font-medium text-[var(--color-text)]">
                    {lead.name || "—"}
                  </td>
                  <td className="px-5 py-4 text-[14px] text-[var(--color-text-muted)]">
                    {lead.contact || "—"}
                  </td>
                  <td className="px-5 py-4 text-[13px] text-[var(--color-text-muted)]">
                    {sourceLabels[lead.source] ?? lead.source}
                  </td>
                  <td className="px-5 py-4">
                    <ChevronRight size={16} className="text-[var(--color-text-muted)]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[4px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-[480px] flex-col bg-[var(--color-bg)] shadow-[-24px_0_54px_rgba(17,20,23,0.14)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-[var(--color-border)] px-6 py-5">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                    {typeLabels[selected.type] ?? selected.type}
                  </div>
                  <div className="mt-1 text-[18px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                    {selected.name || "—"}
                  </div>
                  <div className="mt-0.5 text-[13px] text-[var(--color-text-muted)]">
                    {selected.contact}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-strong)]"
                >
                  <X size={15} strokeWidth={2.2} />
                </button>
              </div>

              {/* Meta */}
              <div className="border-b border-[var(--color-border)] px-6 py-3">
                <span className="text-[12px] text-[var(--color-text-muted)]">
                  {formatDate(selected.createdAt)} · {sourceLabels[selected.source] ?? selected.source}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <LeadDetail lead={selected} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
