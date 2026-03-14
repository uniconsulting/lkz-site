"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Building2,
  ChevronDown,
  Copy,
  FileText,
  FolderUp,
  MapPinned,
  PackageCheck,
  ShieldCheck,
  Truck,
  Workflow,
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
    "оптовые поставки, СТМ, логистика",
    "и подбор рабочей продуктовой матрицы для вашего канала продаж",
  ],

  leadCard: {
    title: "13 лет развиваем производство",
    description:
      "За это время выстроили производственную базу, лабораторный контроль и рабочую инфраструктуру поставок, чтобы стабильно закрывать задачи дилеров, торговых сетей и B2B-партнёров.",
    points: [
      {
        icon: PackageCheck,
        text: "производственная база и лаборатория",
      },
      {
        icon: ShieldCheck,
        text: "системный контроль качества каждой партии",
      },
      {
        icon: Truck,
        text: "инфраструктура для стабильных B2B-поставок",
      },
    ],
    image: `${basePath}/images/sections/partnership/partnership-hero.webp`,
  },

  formCard: {
    requestTitle: "запросить коммерческое предложение",
    sendTitle: "отправить коммерческое предложение",
    submitRequest: "отправить запрос",
    submitSend: "отправить КП",
    interestOptions: [
      "готовая продукция",
      "дилерство",
      "private label / СТМ",
      "пока нужна консультация",
    ],
  },

  contactsCard: {
    title: "контакты и реквизиты",
    address: "г. Ульяновск, Московское шоссе, 42Е",
    company: 'ООО "ЛКЗ"',
    inn: "7327093976",
    ogrn: "1207300001963",
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

const innerPanelMotion = {
  initial: {
    opacity: 0,
    x: 26,
    scale: 0.992,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.46,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    scale: 0.992,
    filter: "blur(8px)",
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

type ProposalMode = "request" | "send";

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
    "w-full rounded-[18px] border border-transparent bg-[var(--color-bg)] px-4 text-[15px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-1)] focus:shadow-[0_0_0_3px_rgba(30,222,123,0.10)] hover:border-[var(--color-border)]";

  return (
    <label className="block">
      <div className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        {label}
      </div>

      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          className={cn(baseClassName, "resize-none py-3.5")}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className={cn(baseClassName, "h-11")}
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
          "flex h-11 w-full items-center justify-between rounded-[18px] border border-transparent bg-[var(--color-bg)] px-4 text-left text-[15px] transition duration-300 hover:border-[var(--color-border)]",
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

        <ChevronDown
          size={18}
          strokeWidth={2.2}
          className={cn(
            "shrink-0 text-[var(--color-text-muted)] transition duration-300",
            isOpen ? "rotate-180" : "",
          )}
        />
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

function RequestForm() {
  const [step, setStep] = useState<0 | 1>(0);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          {step + 1} / 2
        </div>

        <div className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent-1)]"
            initial={false}
            animate={{ width: step === 0 ? "50%" : "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 ? (
            <motion.div
              key="request-step-1"
              variants={innerPanelMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              <ContactInput label="имя" placeholder="ваше имя" />
              <ContactInput label="организация" placeholder="название компании" />
              <ContactInput
                label="телефон / telegram"
                placeholder="контакт для связи"
              />
            </motion.div>
          ) : (
            <motion.div
              key="request-step-2"
              variants={innerPanelMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              <B2BSelect
                label="формат интереса"
                placeholder="выберите формат"
                options={partnershipContent.formCard.interestOptions}
              />

              <ContactInput
                label="комментарий"
                placeholder="кратко опишите задачу, объём или интересующие категории"
                textarea
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-3">
        {step === 1 ? (
          <button
            type="button"
            onClick={() => setStep(0)}
            className="inline-flex h-10 items-center justify-center rounded-[15px] bg-[var(--color-bg)] px-5 text-[13px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
          >
            назад
          </button>
        ) : null}

        {step === 0 ? (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-[15px] bg-[var(--color-accent-1)] px-5 text-[13px] font-semibold text-[var(--color-bg)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
          >
            далее
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex h-10 flex-1 items-center justify-center rounded-[15px] bg-[var(--color-accent-1)] px-5 text-[13px] font-semibold text-[var(--color-bg)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
          >
            {partnershipContent.formCard.submitRequest}
          </button>
        )}
      </div>
    </div>
  );
}

function SendProposalForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function mergeFiles(newFiles: File[]) {
    const merged = [...files, ...newFiles].slice(0, 3);
    setFiles(merged);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFiles = Array.from(event.target.files ?? []);
    mergeFiles(nextFiles);
    event.target.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
  }

  return (
    <div className="flex h-full flex-col">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          const dropped = Array.from(event.dataTransfer.files ?? []);
          mergeFiles(dropped);
        }}
        className={cn(
          "flex flex-1 min-h-0 flex-col rounded-[22px] border border-dashed bg-[var(--color-bg)] p-5 transition duration-300",
          isDragging
            ? "border-[var(--color-accent-1)] bg-[var(--color-accent-1)]/[0.06]"
            : "border-[var(--color-border)]",
        )}
      >
        {files.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
              <FolderUp size={20} strokeWidth={2.2} />
            </div>

            <div className="max-w-[320px] text-[15px] font-semibold leading-[1.2] text-[var(--color-text)]">
              загрузите коммерческое предложение
            </div>

            <div className="mt-5 max-w-[320px] text-[13px] leading-[1.45] text-[var(--color-text-muted)]">
              <span className="block">
                pdf, doc, docx, xls, xlsx, ppt, pptx или архив
              </span>
              <span className="block">до 3 файлов в одном запросе</span>
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-[15px] bg-[var(--color-accent-1)] px-5 text-[13px] font-semibold text-[var(--color-bg)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
            >
              выбрать файлы
            </button>
          </div>
        ) : (
          <div className="flex h-full min-h-0 flex-col">
            <div className="mb-4">
              <div className="text-[15px] font-semibold leading-[1.2] text-[var(--color-text)]">
                загруженные файлы
              </div>
              <div className="mt-2 text-[13px] leading-[1.45] text-[var(--color-text-muted)]">
                можно прикрепить до 3 файлов
              </div>
            </div>

            <div className="flex-1 min-h-0 space-y-2 overflow-y-auto pr-1">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-[14px] bg-[var(--color-surface)] px-3 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-medium text-[var(--color-text)]">
                      {file.name}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="shrink-0 text-[var(--color-text-muted)] transition duration-200 hover:text-[var(--color-text)]"
                  >
                    <X size={14} strokeWidth={2.2} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={files.length >= 3}
              className={cn(
                "mt-4 inline-flex h-10 items-center justify-center self-start rounded-[15px] px-5 text-[13px] font-semibold transition duration-300",
                files.length >= 3
                  ? "cursor-not-allowed bg-[var(--color-border)] text-[var(--color-text-muted)]"
                  : "bg-[var(--color-accent-1)] text-[var(--color-bg)] hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]",
              )}
            >
              добавить файлы
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      <button
        type="button"
        disabled={files.length === 0}
        className={cn(
          "mt-8 inline-flex h-10 w-full items-center justify-center rounded-[15px] px-5 text-[13px] font-semibold transition duration-300",
          files.length === 0
            ? "cursor-not-allowed bg-[var(--color-border)] text-[var(--color-text-muted)]"
            : "bg-[var(--color-accent-1)] text-[var(--color-bg)] hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]",
        )}
      >
        {partnershipContent.formCard.submitSend}
      </button>
    </div>
  );
}

function CopyValueButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition duration-300 hover:text-[var(--color-text)] hover:shadow-[0_6px_14px_rgba(43,47,51,0.08)]"
      aria-label="Скопировать"
      title={copied ? "Скопировано" : "Скопировать"}
    >
      <Copy size={15} strokeWidth={2.2} />
    </button>
  );
}

export function PartnershipContactSection() {
  const [mode, setMode] = useState<ProposalMode>("request");

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
              className="overflow-hidden rounded-[32px] bg-[var(--color-surface)] xl:min-h-[520px]"
            >
              <div className="grid h-full xl:grid-cols-[1fr_1fr]">
                <div className="flex h-full flex-col justify-center bg-[var(--color-accent-2)] px-8 py-10 text-[var(--color-accent-2-foreground)] md:px-9 md:py-11">
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-[15px] bg-[var(--color-accent-1)]/[0.14] text-[var(--color-accent-1)]">
                    <Workflow size={18} strokeWidth={2.2} />
                  </div>

                  <h3 className="font-heading text-[27px] leading-[0.94] tracking-[-0.05em] md:text-[31px]">
                    {partnershipContent.leadCard.title}
                  </h3>

                  <p className="mt-6 max-w-[388px] text-[13px] leading-[1.44] text-[var(--color-accent-2-foreground)]/76 md:text-[14px]">
                    {partnershipContent.leadCard.description}
                  </p>

                  <div className="mt-8 space-y-4">
                    {partnershipContent.leadCard.points.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div key={item.text} className="flex items-center gap-3">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
                            <Icon size={13} strokeWidth={2.2} />
                          </div>

                          <div className="max-w-[356px] text-[13px] leading-[1.34] text-[var(--color-accent-2-foreground)]/92">
                            {item.text}
                          </div>
                        </div>
                      );
                    })}
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
              className="flex rounded-[32px] bg-[var(--color-surface)] p-5 md:p-6 xl:min-h-[520px]"
            >
              <div className="flex h-full w-full flex-col">
                <div className="mb-5 flex rounded-[18px] bg-[var(--color-bg)] p-1">
                  <button
                    type="button"
                    onClick={() => setMode("request")}
                    className={cn(
                      "flex-1 rounded-[14px] px-4 py-2.5 text-[14px] font-semibold transition duration-300",
                      mode === "request"
                        ? "bg-[var(--color-accent-1)] text-[var(--color-bg)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                    )}
                  >
                    запросить КП
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("send")}
                    className={cn(
                      "flex-1 rounded-[14px] px-4 py-2.5 text-[14px] font-semibold transition duration-300",
                      mode === "send"
                        ? "bg-[var(--color-accent-1)] text-[var(--color-bg)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                    )}
                  >
                    отправить КП
                  </button>
                </div>

                <h3 className="font-heading text-[24px] leading-[0.94] tracking-[-0.05em] text-[var(--color-text)] md:text-[27px]">
                  {mode === "request"
                    ? partnershipContent.formCard.requestTitle
                    : partnershipContent.formCard.sendTitle}
                </h3>

                <div className="mt-5 h-[360px] flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    {mode === "request" ? (
                      <motion.div
                        key="request-mode"
                        variants={innerPanelMotion}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="h-full"
                      >
                        <RequestForm />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send-mode"
                        variants={innerPanelMotion}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="h-full"
                      >
                        <SendProposalForm />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
                  <div className="relative rounded-[22px] bg-[var(--color-bg)] p-5 transition duration-300 hover:shadow-[0_8px_20px_rgba(43,47,51,0.05)]">
                    <CopyValueButton value={partnershipContent.contactsCard.inn} />
                    <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      ИНН
                    </div>
                    <div className="mt-3 text-[20px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                      {partnershipContent.contactsCard.inn}
                    </div>
                  </div>

                  <div className="relative rounded-[22px] bg-[var(--color-bg)] p-5 transition duration-300 hover:shadow-[0_8px_20px_rgba(43,47,51,0.05)]">
                    <CopyValueButton value={partnershipContent.contactsCard.ogrn} />
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
