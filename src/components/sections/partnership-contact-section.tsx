"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  FileText,
  FlaskConical,
  MapPinned,
  ShieldCheck,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

const YANDEX_MAP_EMBED_URL =
  "https://yandex.ru/map-widget/v1/?um=constructor%3Ab9ba62ca6079292583614d568f069fd31e16362261dcb68461cc2aa7f829bdc7&source=constructor";

const partnershipContent = {
  title: "Запустим сотрудничество под вашу задачу",
  description: [
    "производственная экспертиза, контроль качества",
    "и удобный формат работы с коммерческими материалами",
  ],

  leadCard: {
    title: "R&D-центр и контроль качества",
    description:
      "Собственная лаборатория, выверенные рецептуры и контроль стабильности партий помогают быстрее согласовывать требования и переходить к предметному коммерческому диалогу.",
    points: [
      {
        icon: FlaskConical,
        text: "проверяем рецептуры, укрывистость и стабильность покрытия",
      },
      {
        icon: ShieldCheck,
        text: "сопровождаем согласование требований по продукту и документам",
      },
      {
        icon: WandSparkles,
        text: "ускоряем переход от технического обсуждения к коммерческому предложению",
      },
    ],
    cta: "обсудить задачу",
    image: `${basePath}/images/sections/partnership/partnership-hero.webp`,
  },

  contactsCard: {
    title: "контакты и реквизиты",
    address: "г. Ульяновск, Московское шоссе, 42Е",
    company: 'ООО "ЛКЗ"',
    inn: "7327093976",
    ogrn: "1207300001963",
  },

  requestFormats: [
    "готовая продукция",
    "дилерство",
    "private label / СТМ",
    "пока нужна консультация",
  ],
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

const paneMotion = {
  initial: {
    opacity: 0,
    x: 28,
    scale: 0.992,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -28,
    scale: 0.992,
    filter: "blur(8px)",
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 1, 1] as const,
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
    "w-full rounded-[18px] border border-transparent bg-[var(--color-bg)] px-4 text-[15px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)] hover:border-[var(--color-border)] focus:border-[var(--color-accent-1)] focus:shadow-[0_0_0_3px_rgba(30,222,123,0.10)]";

  return (
    <label className="block">
      <div className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        {label}
      </div>

      {textarea ? (
        <textarea
          rows={4}
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

function B2BSelect({
  label,
  placeholder,
  options,
}: {
  label: string;
  placeholder: string;
  options: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        {label}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-[18px] border border-transparent bg-[var(--color-bg)] px-4 text-left text-[15px] transition duration-300",
          "hover:border-[var(--color-border)]",
          isOpen
            ? "border-[var(--color-accent-1)] shadow-[0_0_0_3px_rgba(30,222,123,0.10)]"
            : "",
        )}
      >
        <span
          className={cn(
            selected ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]",
          )}
        >
          {selected || placeholder}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ArrowRight
            size={16}
            strokeWidth={2.2}
            className="rotate-90 text-[var(--color-text-muted)]"
          />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -8,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[20px] bg-[var(--color-bg)] shadow-[0_16px_38px_rgba(43,47,51,0.12)]"
      >
        <div className="p-2">
          {options.map((option) => {
            const isActive = selected === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center rounded-[14px] px-3 py-3 text-left text-[15px] transition duration-200",
                  isActive
                    ? "bg-[var(--color-accent-1)]/[0.10] text-[var(--color-text)]"
                    : "text-[var(--color-text)] hover:bg-[var(--color-surface)]",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function RequestQuotePane({
  step,
  onPrev,
  onNext,
}: {
  step: 0 | 1;
  onPrev: () => void;
  onNext: () => void;
}) {
  const progress = step === 0 ? "50%" : "100%";

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="min-w-[44px] text-[14px] font-semibold text-[var(--color-text)]">
          {step + 1} / 2
        </div>

        <div className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent-1)]"
            initial={false}
            animate={{ width: progress }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === 0 ? (
          <motion.div
            key="request-step-1"
            variants={paneMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex h-full flex-col"
          >
            <h3 className="font-heading text-[26px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[30px]">
              запросить КП
            </h3>

            <p className="mt-3 text-[14px] leading-[1.42] text-[var(--color-text-muted)]">
              оставьте базовые данные для связи и перейдите к параметрам запроса
            </p>

            <div className="mt-5 flex flex-1 flex-col space-y-3.5">
              <ContactInput label="имя" placeholder="ваше имя" />
              <ContactInput label="организация" placeholder="название компании" />
              <ContactInput
                label="контакт"
                placeholder="телефон, email или telegram"
              />
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onNext}
                className="inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--color-accent-1)] px-5 text-[14px] font-semibold text-[var(--color-bg)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
              >
                далее
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="request-step-2"
            variants={paneMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex h-full flex-col"
          >
            <h3 className="font-heading text-[26px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[30px]">
              запросить КП
            </h3>

            <p className="mt-3 text-[14px] leading-[1.42] text-[var(--color-text-muted)]">
              укажите формат интереса и добавьте комментарий по задаче
            </p>

            <div className="mt-5 flex flex-1 flex-col space-y-3.5">
              <B2BSelect
                label="формат интереса"
                placeholder="выберите формат"
                options={partnershipContent.requestFormats}
              />

              <ContactInput
                label="комментарий"
                placeholder="кратко опишите задачу, объём или интересующие категории"
                textarea
              />
            </div>

            <div className="mt-5 flex justify-between gap-3">
              <button
                type="button"
                onClick={onPrev}
                className="inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--color-bg)] px-5 text-[14px] font-semibold text-[var(--color-text)] transition duration-300 hover:border-[var(--color-border)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
              >
                назад
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--color-accent-1)] px-5 text-[14px] font-semibold text-[var(--color-bg)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
              >
                отправить запрос
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} КБ`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} МБ`;
}

function SendQuotePane() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function applyFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list).slice(0, 3);
    setFiles(next);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragActive(false);
    applyFiles(event.dataTransfer.files);
  }

  const helperText = useMemo(() => {
    if (files.length === 0) {
      return "загрузите до 3 файлов: КП, спецификации, таблицы, презентации или архив";
    }
    return `загружено файлов: ${files.length} из 3`;
  }, [files.length]);

  return (
    <div className="flex h-full flex-col">
      <h3 className="font-heading text-[26px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[30px]">
        отправить КП
      </h3>

      <p className="mt-3 text-[14px] leading-[1.42] text-[var(--color-text-muted)]">
        прикрепите материалы для рассмотрения: коммерческое предложение,
        спецификацию, расчёты или сопроводительные документы
      </p>

      <div className="mt-5 flex flex-1 flex-col">
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragActive(true);
          }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex min-h-[232px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-transparent bg-[var(--color-bg)] px-6 py-8 text-center transition duration-300",
            "hover:border-[var(--color-border)]",
            isDragActive
              ? "border-[var(--color-accent-1)] shadow-[0_0_0_3px_rgba(30,222,123,0.10)]"
              : "",
          )}
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
            <Upload size={24} strokeWidth={2.2} />
          </div>

          <div className="text-[17px] font-semibold leading-[1.1] text-[var(--color-text)]">
            перетащите файлы сюда
          </div>

          <div className="mt-2 text-[14px] leading-[1.42] text-[var(--color-text-muted)]">
            или нажмите, чтобы выбрать файлы с устройства
          </div>

          <div className="mt-4 text-[13px] leading-[1.4] text-[var(--color-text-muted)]">
            {helperText}
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={(event) => applyFiles(event.target.files)}
            className="hidden"
          />
        </div>

        {files.length > 0 ? (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-3 rounded-[18px] bg-[var(--color-bg)] px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-semibold text-[var(--color-text)]">
                    {file.name}
                  </div>
                  <div className="mt-1 text-[13px] text-[var(--color-text-muted)]">
                    {formatFileSize(file.size)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition duration-200 hover:text-[var(--color-text)]"
                >
                  <X size={16} strokeWidth={2.2} />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--color-accent-1)] px-5 text-[14px] font-semibold text-[var(--color-bg)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
          >
            отправить материалы
          </button>
        </div>
      </div>
    </div>
  );
}

export function PartnershipContactSection() {
  const [mode, setMode] = useState<"request" | "send">("request");
  const [requestStep, setRequestStep] = useState<0 | 1>(0);

  useEffect(() => {
    if (mode === "send") {
      setRequestStep(0);
    }
  }, [mode]);

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
              <span className="block">{partnershipContent.description[0]}</span>
              <span className="block">{partnershipContent.description[1]}</span>
            </p>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.38fr_0.72fr] xl:items-stretch">
            <motion.div
              variants={cardMotion}
              className="overflow-hidden rounded-[32px] bg-[var(--color-surface)] xl:h-[440px]"
            >
              <div className="grid h-full xl:grid-cols-[0.72fr_1.08fr]">
                <div className="flex h-full flex-col justify-between bg-[var(--color-accent-2)] p-6 text-[var(--color-accent-2-foreground)] md:p-7">
                  <div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--color-accent-1)]/[0.14] text-[var(--color-accent-1)]">
                      <FlaskConical size={20} strokeWidth={2.2} />
                    </div>

                    <h3 className="font-heading text-[28px] leading-[0.96] tracking-[-0.05em] md:text-[33px]">
                      {partnershipContent.leadCard.title}
                    </h3>

                    <p className="mt-4 max-w-[338px] text-[14px] leading-[1.45] text-[var(--color-accent-2-foreground)]/76 md:text-[15px]">
                      {partnershipContent.leadCard.description}
                    </p>

                    <div className="mt-6 space-y-3.5">
                      {partnershipContent.leadCard.points.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div key={item.text} className="flex items-start gap-3">
                            <div className="mt-[2px] flex h-7 w-7 items-center justify-center rounded-[10px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
                              <Icon size={14} strokeWidth={2.2} />
                            </div>

                            <div className="max-w-[310px] text-[14px] leading-[1.4] text-[var(--color-accent-2-foreground)]/92">
                              {item.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href="#contacts"
                      className="inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--color-accent-1)] px-5 text-[14px] font-semibold text-[var(--color-bg)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
                    >
                      {partnershipContent.leadCard.cta}
                    </Link>
                  </div>
                </div>

                <div className="relative h-full min-h-[260px] overflow-hidden">
                  <img
                    src={partnershipContent.leadCard.image}
                    alt={partnershipContent.leadCard.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,24,28,0.08)_0%,rgba(20,24,28,0.01)_34%,rgba(20,24,28,0.14)_100%)]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardMotion}
              className="flex rounded-[32px] bg-[var(--color-surface)] p-6 md:p-7 xl:h-[440px]"
            >
              <div className="flex h-full w-full flex-col">
                <div className="mb-5 inline-flex rounded-[18px] bg-[var(--color-bg)] p-1">
                  <button
                    type="button"
                    onClick={() => setMode("request")}
                    className={cn(
                      "inline-flex h-10 items-center justify-center rounded-[14px] px-4 text-[14px] font-semibold transition duration-300",
                      mode === "request"
                        ? "bg-[var(--color-accent-1)] text-[var(--color-bg)]"
                        : "text-[var(--color-text-muted)]",
                    )}
                  >
                    запросить КП
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("send")}
                    className={cn(
                      "inline-flex h-10 items-center justify-center rounded-[14px] px-4 text-[14px] font-semibold transition duration-300",
                      mode === "send"
                        ? "bg-[var(--color-accent-1)] text-[var(--color-bg)]"
                        : "text-[var(--color-text-muted)]",
                    )}
                  >
                    отправить КП
                  </button>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {mode === "request" ? (
                    <motion.div
                      key={`request-${requestStep}`}
                      variants={paneMotion}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex h-full flex-col"
                    >
                      <RequestQuotePane
                        step={requestStep}
                        onPrev={() => setRequestStep(0)}
                        onNext={() => setRequestStep(1)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      variants={paneMotion}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex h-full flex-col"
                    >
                      <SendQuotePane />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr] xl:items-stretch">
            <motion.div
              variants={cardMotion}
              className="rounded-[32px] bg-[var(--color-surface)] p-6 md:p-8"
            >
              <h3 className="font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[34px]">
                {partnershipContent.contactsCard.title}
              </h3>

              <div className="mt-6 grid gap-5">
                <div className="flex items-start gap-4">
                  <div className="mt-[2px] flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-accent-1)] text-[var(--color-bg)]">
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
                  <div className="mt-[2px] flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-accent-1)] text-[var(--color-bg)]">
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
                  <div className="rounded-[22px] bg-[var(--color-bg)] p-5 transition duration-300 hover:border-[var(--color-border)] hover:shadow-[0_8px_20px_rgba(43,47,51,0.05)]">
                    <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      ИНН
                    </div>
                    <div className="mt-3 text-[20px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                      {partnershipContent.contactsCard.inn}
                    </div>
                  </div>

                  <div className="rounded-[22px] bg-[var(--color-bg)] p-5 transition duration-300 hover:border-[var(--color-border)] hover:shadow-[0_8px_20px_rgba(43,47,51,0.05)]">
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
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] font-semibold text-[var(--color-text)] transition duration-300 hover:border-[var(--color-border)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                  >
                    <FileText size={16} strokeWidth={2.2} />
                    <span>получить карточку компании</span>
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardMotion}
              className="overflow-hidden rounded-[32px] bg-[var(--color-surface)] xl:min-h-[360px]"
            >
              <iframe
                src={YANDEX_MAP_EMBED_URL}
                title="Карта"
                className="h-full min-h-[360px] w-full border-0"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
