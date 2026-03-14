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

const TOP_CARD_HEIGHT = 584;
const FORM_CONTENT_HEIGHT = 430;
const UPLOAD_WINDOW_HEIGHT = 300;

const partnershipContent = {
  title: "Запустим сотрудничество под вашу задачу",
  description: [
    "оптовые поставки, СТМ, логистика",
    "и подбор рабочей продуктовой матрицы для вашего канала продаж",
  ],

  leadCard: {
    titleLines: ["13 лет развиваем", "производство"],
    descriptionLines: [
      "За это время выстроили производственную базу,",
      "лабораторный контроль и рабочую инфраструктуру",
      "поставок, чтобы стабильно закрывать задачи",
      "дилеров, торговых сетей и B2B-партнёров.",
    ],
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
    x: 18,
    scale: 0.992,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -16,
    scale: 0.992,
    filter: "blur(6px)",
    transition: {
      duration: 0.2,
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
    "w-full rounded-[22px] border border-transparent bg-[var(--color-bg)] px-6 text-[12px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-1)] focus:shadow-[0_0_0_3px_rgba(30,222,123,0.10)] hover:border-[var(--color-border)]";

  return (
    <label className="block">
      <div className="mb-[5px] text-[12px] font-semibold tracking-[-0.03em] text-[var(--color-text-muted)]">
        {label}
      </div>

      {textarea ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          className={cn(baseClassName, "h-[134px] resize-none py-4")}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className={cn(baseClassName, "h-[44px]")}
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
      <div className="mb-[5px] text-[12px] font-semibold tracking-[-0.03em] text-[var(--color-text-muted)]">
        {label}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-[44px] w-full items-center justify-between rounded-[22px] border border-transparent bg-[var(--color-bg)] px-6 text-left text-[12px] transition duration-300 hover:border-[var(--color-border)]",
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
          size={16}
          strokeWidth={2.1}
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
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[22px] bg-[var(--color-bg)] shadow-[0_16px_38px_rgba(43,47,51,0.12)]"
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
                  "flex w-full items-center rounded-[16px] px-4 py-3 text-left text-[12px] transition duration-200",
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
      <div className="flex items-center gap-4">
        <div className="w-[42px] shrink-0 text-[12px] text-[var(--color-text-muted)]">
          {step + 1}/2
        </div>

        <div className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent-1)]"
            initial={false}
            animate={{ width: step === 0 ? "50%" : "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="mt-[54px] flex-1 min-h-0">
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 ? (
            <motion.div
              key="request-step-1"
              variants={innerPanelMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-[23px]"
            >
              <ContactInput label="имя" placeholder="ваше имя" />
              <ContactInput label="организация" placeholder="название компании" />
              <ContactInput
                label="контакт"
                placeholder="telegram / телефон / email"
              />
            </motion.div>
          ) : (
            <motion.div
              key="request-step-2"
              variants={innerPanelMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-[23px]"
            >
              <B2BSelect
                label="формат интереса"
                placeholder="выберите формат"
                options={partnershipContent.formCard.interestOptions}
              />

              <ContactInput
                label="комментарий / сообщение"
                placeholder="опишите задачу"
                textarea
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-[54px] flex gap-5">
        {step === 1 ? (
          <button
            type="button"
            onClick={() => setStep(0)}
            className="inline-flex h-[60px] flex-1 items-center justify-center rounded-[30px] bg-[var(--color-bg)] text-[14px] font-semibold text-[var(--color-text-muted)] transition duration-300 hover:-translate-y-[1px] hover:text-[var(--color-text)] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
          >
            назад
          </button>
        ) : null}

        {step === 0 ? (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex h-[60px] flex-1 items-center justify-center rounded-[30px] bg-[var(--color-accent-2)] text-[14px] font-semibold text-[var(--color-accent-2-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(43,47,51,0.16)]"
          >
            далее
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex h-[60px] flex-1 items-center justify-center rounded-[30px] bg-[var(--color-accent-2)] text-[14px] font-semibold text-[var(--color-accent-2-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(43,47,51,0.16)]"
          >
            отправить
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
      <div className="text-[12px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
        загрузите Ваше КП
      </div>

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
          "mt-[23px] flex h-[300px] flex-col rounded-[24px] border-2 border-dashed bg-[var(--color-bg)] p-5 transition duration-300",
          isDragging
            ? "border-[var(--color-accent-1)] bg-[var(--color-accent-1)]/[0.06]"
            : "border-[var(--color-accent-2)]",
        )}
      >
        {files.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-11 w-11 items-center justify-center text-[var(--color-accent-1)]">
              <FolderUp size={34} strokeWidth={2.1} />
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-[14px] text-[var(--color-text)] transition duration-300 hover:text-[var(--color-accent-2)]"
            >
              выбрать файлы
            </button>

            <div className="mt-[52px] max-w-[520px] text-[12px] leading-[1.42] text-[var(--color-text-muted)]">
              <span className="block">
                pdf, doc, docx, xls, xlsx, ppt, pptx или архив
              </span>
              <span className="block">до 3 файлов в одном запросе</span>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex-1 min-h-0 space-y-2 overflow-y-auto pr-1">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-[16px] bg-[var(--color-surface)] px-4 py-3"
                >
                  <div className="min-w-0 truncate text-[12px] text-[var(--color-text)]">
                    {file.name}
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
                "mt-4 inline-flex h-[44px] items-center justify-center self-start rounded-[22px] px-5 text-[12px] font-medium transition duration-300",
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
          "mt-[54px] inline-flex h-[60px] w-full items-center justify-center rounded-[30px] text-[14px] font-semibold transition duration-300",
          files.length === 0
            ? "cursor-not-allowed bg-[var(--color-border)] text-[var(--color-text-muted)]"
            : "bg-[var(--color-accent-2)] text-[var(--color-accent-2-foreground)] hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(43,47,51,0.16)]",
        )}
      >
        отправить
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
              Запустим сотрудничество под вашу задачу
            </h2>

            <p className="mt-5 max-w-[760px] text-[15px] leading-[1.48] text-[var(--color-text-muted)] md:text-[17px]">
              <span className="block">{partnershipContent.description[0]}</span>
              <span className="block">{partnershipContent.description[1]}</span>
            </p>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.38fr_0.72fr] xl:items-stretch">
            <motion.div
              variants={cardMotion}
              className="overflow-hidden rounded-[32px] bg-[var(--color-surface)]"
              style={{ height: `${TOP_CARD_HEIGHT}px` }}
            >
              <div className="grid h-full xl:grid-cols-[1fr_1fr]">
                <div className="h-full bg-[var(--color-accent-2)] px-[28px] py-[28px] text-[var(--color-accent-2-foreground)]">
                  <div className="flex h-full flex-col">
                    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[20px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
                      <Workflow size={22} strokeWidth={2.1} />
                    </div>

                    <div className="mt-[28px]">
                      <h3 className="font-heading text-[32px] leading-[0.92] tracking-[-0.05em] text-[var(--color-accent-2-foreground)]">
                        <span className="block">
                          {partnershipContent.leadCard.titleLines[0]}
                        </span>
                        <span className="block">
                          {partnershipContent.leadCard.titleLines[1]}
                        </span>
                      </h3>
                    </div>

                    <div className="mt-[36px] border-t border-white/10 pt-[36px]">
                      <div className="space-y-[12px] text-[12px] leading-[1.35] tracking-[-0.02em] text-[var(--color-accent-2-foreground)]/82">
                        {partnershipContent.leadCard.descriptionLines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-[36px] border-t border-white/10 pt-[36px]">
                      <div className="space-y-[22px]">
                        {partnershipContent.leadCard.points.map((item) => {
                          const Icon = item.icon;

                          return (
                            <div
                              key={item.text}
                              className="flex items-center gap-[16px]"
                            >
                              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[14px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
                                <Icon size={16} strokeWidth={2.1} />
                              </div>

                              <div className="text-[12px] leading-[1.25] tracking-[-0.02em] text-[var(--color-accent-2-foreground)] whitespace-nowrap">
                                {item.text}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative h-full overflow-hidden">
                  <img
                    src={partnershipContent.leadCard.image}
                    alt="Производственная линия"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardMotion}
              className="rounded-[32px] bg-[var(--color-surface)] p-[20px]"
              style={{ height: `${TOP_CARD_HEIGHT}px` }}
            >
              <div className="flex h-full flex-col">
                <div className="grid h-[60px] grid-cols-[1fr_1px_1fr] items-center gap-[18px]">
                  <button
                    type="button"
                    onClick={() => setMode("request")}
                    className={cn(
                      "h-full rounded-[30px] text-[14px] font-semibold transition duration-300",
                      mode === "request"
                        ? "bg-[var(--color-accent-1)] text-[var(--color-bg)]"
                        : "bg-[var(--color-bg)] text-[var(--color-text)]",
                    )}
                  >
                    запросить КП
                  </button>

                  <div className="mx-auto h-[44px] w-px bg-[var(--color-accent-2)]/10" />

                  <button
                    type="button"
                    onClick={() => setMode("send")}
                    className={cn(
                      "h-full rounded-[30px] text-[14px] font-semibold transition duration-300",
                      mode === "send"
                        ? "bg-[var(--color-accent-1)] text-[var(--color-bg)]"
                        : "bg-[var(--color-bg)] text-[var(--color-text)]",
                    )}
                  >
                    отправить КП
                  </button>
                </div>

                <div className="mt-[54px]" style={{ height: `${FORM_CONTENT_HEIGHT}px` }}>
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
