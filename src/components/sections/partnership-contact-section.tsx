"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  FileText,
  MapPinned,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

// ВАЖНО:
// Сюда лучше вставить именно embed-ссылку Яндекс.Карт для iframe.
// Короткая ссылка ниже уже используется для перехода в Я.Карты.
const YANDEX_MAP_EMBED_URL = "";

const YANDEX_MAP_OPEN_URL = "https://yandex.com/maps/-/CPB2u0L4";

const partnershipContent = {
  title: "Запустим сотрудничество под вашу задачу",
  description:
    "Оптовые поставки, СТМ, логистика и подбор рабочей продуктовой матрицы для вашего канала продаж.",

  leadCard: {
    title: "Оптовые поставки и Private Label",
    description:
      "Подбираем формат сотрудничества под ваш канал продаж: готовая продукция, запуск СТМ, ассортиментная матрица и логистика поставок.",
    points: [
      {
        icon: PackageCheck,
        text: "индивидуальные условия под объём и формат запуска",
      },
      {
        icon: ShieldCheck,
        text: "запуск продукции под вашей торговой маркой",
      },
      {
        icon: Truck,
        text: "логистическая и коммерческая поддержка на старте",
      },
    ],
    cta: "запросить коммерческое предложение",
    image: `${basePath}/images/sections/partnership/partnership-hero.webp`,
  },

  formCard: {
    title: "получить коммерческое предложение",
    submit: "отправить запрос",
  },

  contactsCard: {
    title: "контакты и реквизиты",
    address: "г. Ульяновск, Московское шоссе, 42Е",
    company: 'ООО "ЛКЗ"',
    inn: "7327093976",
    ogrn: "1207300001963",
  },

  mapCard: {
    title: "география поставок",
    description:
      "Работаем с дилерами, торговыми сетями и B2B-партнёрами по всей России. Производственная база и логистический контур позволяют выстраивать поставки под региональные и сетевые задачи.",
    cta: "открыть в Я.Картах",
  },
};

const sectionMotion = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardMotion = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function ContactInput({
  label,
  placeholder,
  textarea = false,
}: {
  label: string;
  placeholder: string;
  textarea?: boolean;
}) {
  const baseClassName =
    "w-full rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 text-[15px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-1)] focus:shadow-[0_0_0_3px_rgba(30,222,123,0.10)]";

  return (
    <label className="block">
      <div className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        {label}
      </div>

      {textarea ? (
        <textarea
          rows={5}
          placeholder={placeholder}
          className={cn(baseClassName, "resize-none py-3.5")}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className={cn(baseClassName, "h-12")}
        />
      )}
    </label>
  );
}

export function PartnershipContactSection() {
  return (
    <Section className="pt-10 md:pt-12 xl:pt-14">
      <Container>
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.14 }}
        >
          <div className="max-w-[920px]">
            <h2 className="font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[40px] xl:text-[46px]">
              {partnershipContent.title}
            </h2>

            <p className="mt-5 max-w-[760px] text-[15px] leading-[1.48] text-[var(--color-text-muted)] md:text-[17px]">
              {partnershipContent.description}
            </p>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              variants={cardMotion}
              className="overflow-hidden rounded-[32px] bg-[var(--color-surface)]"
            >
              <div className="grid min-h-[520px] xl:grid-cols-[0.92fr_1fr]">
                <div className="flex flex-col justify-between bg-[var(--color-accent-2)] p-6 text-[var(--color-accent-2-foreground)] md:p-8">
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)]/[0.14] text-[var(--color-accent-1)]">
                      <PackageCheck size={22} strokeWidth={2.2} />
                    </div>

                    <h3 className="font-heading text-[30px] leading-[0.96] tracking-[-0.05em] md:text-[38px]">
                      {partnershipContent.leadCard.title}
                    </h3>

                    <p className="mt-5 max-w-[420px] text-[15px] leading-[1.48] text-[var(--color-accent-2-foreground)]/76 md:text-[17px]">
                      {partnershipContent.leadCard.description}
                    </p>

                    <div className="mt-7 space-y-4">
                      {partnershipContent.leadCard.points.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div key={item.text} className="flex items-start gap-3">
                            <div className="mt-[2px] flex h-7 w-7 items-center justify-center rounded-[10px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
                              <Icon size={15} strokeWidth={2.2} />
                            </div>

                            <div className="max-w-[360px] text-[15px] leading-[1.42] text-[var(--color-accent-2-foreground)]/92">
                              {item.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="#contacts"
                      className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-bg)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
                    >
                      {partnershipContent.leadCard.cta}
                    </Link>
                  </div>
                </div>

                <div className="relative min-h-[280px] overflow-hidden">
                  <img
                    src={partnershipContent.leadCard.image}
                    alt={partnershipContent.leadCard.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,24,28,0.10)_0%,rgba(20,24,28,0.02)_38%,rgba(20,24,28,0.18)_100%)]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardMotion}
              className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
            >
              <h3 className="font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[34px]">
                {partnershipContent.formCard.title}
              </h3>

              <form
                className="mt-6 space-y-4"
                onSubmit={(event) => event.preventDefault()}
              >
                <ContactInput label="имя" placeholder="ваше имя" />
                <ContactInput label="компания" placeholder="название компании" />
                <ContactInput
                  label="телефон / telegram"
                  placeholder="контакт для связи"
                />

                <label className="block">
                  <div className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    формат интереса
                  </div>

                  <select className="h-12 w-full rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 text-[15px] text-[var(--color-text)] outline-none transition duration-300 focus:border-[var(--color-accent-1)] focus:shadow-[0_0_0_3px_rgba(30,222,123,0.10)]">
                    <option>выберите формат</option>
                    <option>готовая продукция</option>
                    <option>дилерство</option>
                    <option>private label / СТМ</option>
                    <option>пока нужна консультация</option>
                  </select>
                </label>

                <ContactInput
                  label="комментарий"
                  placeholder="кратко опишите задачу, объём или интересующие категории"
                  textarea
                />

                <button
                  type="submit"
                  className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-bg)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
                >
                  {partnershipContent.formCard.submit}
                </button>
              </form>
            </motion.div>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <motion.div
              variants={cardMotion}
              className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
            >
              <h3 className="font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[34px]">
                {partnershipContent.contactsCard.title}
              </h3>

              <div className="mt-6 grid gap-5">
                <div className="flex items-start gap-4">
                  <div className="mt-[2px] flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
                    <MapPinned size={18} strokeWidth={2.2} />
                  </div>

                  <div>
                    <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      офис и производство
                    </div>
                    <div className="mt-2 text-[16px] leading-[1.42] text-[var(--color-text)]">
                      {partnershipContent.contactsCard.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-[2px] flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
                    <Building2 size={18} strokeWidth={2.2} />
                  </div>

                  <div>
                    <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      юридическое лицо
                    </div>
                    <div className="mt-2 text-[16px] leading-[1.42] text-[var(--color-text)]">
                      {partnershipContent.contactsCard.company}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[22px] bg-[var(--color-bg)] p-5">
                    <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      ИНН
                    </div>
                    <div className="mt-3 text-[20px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                      {partnershipContent.contactsCard.inn}
                    </div>
                  </div>

                  <div className="rounded-[22px] bg-[var(--color-bg)] p-5">
                    <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      ОГРН
                    </div>
                    <div className="mt-3 text-[20px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                      {partnershipContent.contactsCard.ogrn}
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                  >
                    <FileText size={16} strokeWidth={2.2} />
                    <span>получить карточку компании</span>
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardMotion}
              className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <div className="relative h-full min-h-[420px]">
                {YANDEX_MAP_EMBED_URL ? (
                  <iframe
                    src={YANDEX_MAP_EMBED_URL}
                    title="Карта"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#e8f7ef_0%,#dff3ea_28%,#d7eef7_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_58%,rgba(30,222,123,0.18),transparent_18%),radial-gradient(circle_at_46%_50%,rgba(30,222,123,0.12),transparent_22%),linear-gradient(0deg,rgba(255,255,255,0.20),rgba(255,255,255,0.20))]" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-1)] text-[var(--color-bg)] shadow-[0_10px_24px_rgba(30,222,123,0.22)]">
                      <MapPinned size={24} strokeWidth={2.2} />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,24,28,0.00)_0%,rgba(20,24,28,0.06)_100%)]" />

                <div className="absolute inset-x-0 top-0 z-10 p-6 md:p-8">
                  <div className="max-w-[520px] rounded-[24px] bg-[var(--color-bg)]/86 p-5 backdrop-blur-[10px]">
                    <h3 className="font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[34px]">
                      {partnershipContent.mapCard.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-[1.48] text-[var(--color-text-muted)]">
                      {partnershipContent.mapCard.description}
                    </p>

                    <div className="mt-5">
                      <a
                        href={YANDEX_MAP_OPEN_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-accent-1)] px-4 text-[14px] font-semibold text-[var(--color-bg)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
                      >
                        <span>{partnershipContent.mapCard.cta}</span>
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
