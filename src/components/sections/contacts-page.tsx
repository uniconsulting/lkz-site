"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Building2,
  Check,
  ChevronDown,
  Copy,
  FileText,
  FolderUp,
  Mail,
  MapPinned,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import {
  contactsHero,
  contactsMap,
  contactsPageContent,
} from "@/lib/content/contacts";

const FORM_CONTENT_HEIGHT = 430;
const UPLOAD_WINDOW_HEIGHT = 300;

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
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

const interestOptions = [
  "готовая продукция",
  "дилерство",
  "private label / СТМ",
  "пока нужна консультация",
];

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
      <div className="mb-[5px] pl-[4px] text-[14px] font-semibold tracking-[-0.03em] text-[var(--color-text-muted)]">
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
      <div className="mb-[5px] pl-[4px] text-[14px] font-semibold tracking-[-0.03em] text-[var(--color-text-muted)]">
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
            selected
              ? "text-[var(--color-text)]"
              : "text-[var(--color-text-muted)]",
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

      <div className="mt-[54px] min-h-0 flex-1">
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
              <ContactInput
                label="организация"
                placeholder="название компании"
              />
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
                options={interestOptions}
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
            className="inline-flex h-[60px] flex-1 items-center justify-center rounded-[12px] bg-[var(--color-bg)] text-[14px] font-semibold text-[var(--color-text-muted)] transition duration-300 hover:-translate-y-[1px] hover:text-[var(--color-text)] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
          >
            назад
          </button>
        ) : null}

        {step === 0 ? (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex h-[60px] flex-1 items-center justify-center rounded-[12px] bg-[var(--color-accent-2)] text-[14px] font-semibold text-[var(--color-accent-2-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(43,47,51,0.16)]"
          >
            далее
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex h-[60px] flex-1 items-center justify-center rounded-[12px] bg-[var(--color-accent-2)] text-[14px] font-semibold text-[var(--color-accent-2-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(43,47,51,0.16)]"
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
      <div className="pl-[4px] text-[14px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
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
          "mt-[23px] flex flex-col rounded-[24px] border-2 border-dashed bg-[var(--color-bg)] p-5 transition duration-300",
          isDragging
            ? "border-[var(--color-accent-1)] bg-[var(--color-accent-1)]/[0.06]"
            : "border-[var(--color-accent-2)]",
        )}
        style={{ height: `${UPLOAD_WINDOW_HEIGHT}px` }}
      >
        {files.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-11 w-11 items-center justify-center text-[var(--color-accent-1)]">
              <FolderUp size={34} strokeWidth={2.1} />
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-[12px] text-[14px] text-[var(--color-text)] transition duration-300 hover:text-[var(--color-accent-2)]"
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
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
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
                "mt-4 inline-flex h-[44px] items-center justify-center self-start rounded-[12px] px-5 text-[12px] font-medium transition duration-300",
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
          "mt-[54px] inline-flex h-[60px] w-full items-center justify-center rounded-[12px] text-[14px] font-semibold transition duration-300",
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
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--color-surface)] transition duration-300 hover:shadow-[0_6px_14px_rgba(43,47,51,0.08)]",
        copied
          ? "text-[var(--color-accent-1)]"
          : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
      )}
      aria-label="Скопировать"
      title={copied ? "Скопировано" : "Скопировать"}
    >
      {copied ? (
        <Check size={15} strokeWidth={2.4} />
      ) : (
        <Copy size={15} strokeWidth={2.2} />
      )}
    </button>
  );
}

function MessengerButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
    >
      <MessageCircle size={17} strokeWidth={2.2} />
      <span>{label}</span>
    </a>
  );
}

export function ContactsPage() {
  const [mode, setMode] = useState<ProposalMode>("request");

  return (
    <div className="pt-[92px] pb-2 md:pt-[104px] md:pb-4 xl:pb-6">
      <Section className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="visible"
            className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr] xl:items-center"
          >
            <div className="max-w-[860px]">
              <div className="mb-5 text-[15px] tracking-[-0.02em] text-[var(--color-text-muted)]">
                главная / {contactsHero.eyebrow}
              </div>

              <h1 className="font-heading text-[34px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[48px] xl:text-[58px]">
                {contactsHero.title}
              </h1>

              <p className="mt-5 max-w-[760px] text-[16px] leading-[1.46] text-[var(--color-text-muted)] md:text-[18px]">
                {contactsHero.description.join(" ")}
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="tel:+79648589910"
                  className="block w-fit text-[28px] font-semibold leading-[1] tracking-[-0.04em] text-[var(--color-text)] md:text-[34px]"
                >
                  +7 (964) 858-99-10
                </a>

                <a
                  href="mailto:simkraski@bk.ru"
                  className="block w-fit text-[18px] leading-[1.3] text-[var(--color-text-muted)] md:text-[20px]"
                >
                  simkraski@bk.ru
                </a>

                <div className="pt-1 text-[15px] leading-[1.4] text-[var(--color-text-muted)]">
                  Пн-Пт: 8:00 – 18:00
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-[var(--color-surface)] p-5 md:p-6 xl:p-7">
              <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                мессенджеры
              </div>

              <h2 className="mt-4 font-heading text-[26px] leading-[0.96] tracking-[-0.04em] text-[var(--color-text)] md:text-[30px]">
                напишите нам удобным способом
              </h2>

              <p className="mt-4 text-[15px] leading-[1.48] text-[var(--color-text-muted)] md:text-[16px]">
                Для быстрого контакта используйте MAX или Telegram. По рабочим
                вопросам также доступны телефон и электронная почта.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {contactsHero.messengers.map((item) => (
                  <MessengerButton
                    key={item.id}
                    href={item.href}
                    label={`написать в ${item.label}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="rounded-[32px] bg-[var(--color-surface)] p-5 md:p-6 xl:p-8"
          >
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
              <motion.div variants={cardMotion}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--color-bg)] text-[var(--color-accent-1)]">
                    <MapPinned size={20} strokeWidth={2.1} />
                  </div>

                  <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                    офис и производство
                  </div>
                </div>

                <div className="text-[24px] leading-[1.08] tracking-[-0.03em] text-[var(--color-text)] md:text-[30px]">
                  г. Ульяновск,
                  <br />
                  Московское шоссе, 42Е
                </div>
              </motion.div>

              <motion.div variants={cardMotion}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--color-bg)] text-[var(--color-accent-1)]">
                    <Building2 size={20} strokeWidth={2.1} />
                  </div>

                  <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                    реквизиты
                  </div>
                </div>

                <div className="text-[18px] leading-[1.35] text-[var(--color-text)]">
                  ООО "ЛКЗ"
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="relative rounded-[20px] bg-[var(--color-bg)] p-4">
                    <CopyValueButton value="7327093976" />
                    <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      ИНН
                    </div>
                    <div className="mt-3 text-[18px] leading-[1.2] text-[var(--color-text)]">
                      7327093976
                    </div>
                  </div>

                  <div className="relative rounded-[20px] bg-[var(--color-bg)] p-4">
                    <CopyValueButton value="1207300001963" />
                    <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      ОГРН
                    </div>
                    <div className="mt-3 text-[18px] leading-[1.2] text-[var(--color-text)]">
                      1207300001963
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
            className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr] xl:items-stretch"
          >
            <motion.div
              variants={cardMotion}
              className="overflow-hidden rounded-[32px] bg-[var(--color-surface)] xl:min-h-[620px]"
            >
              <iframe
                src={contactsMap.embedUrl}
                title="Карта"
                className="h-full min-h-[360px] w-full border-0 xl:min-h-[620px]"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              variants={cardMotion}
              className="rounded-[32px] bg-[var(--color-surface)] p-[20px]"
            >
              <div className="mb-6 max-w-[760px]">
                <h2 className="font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[40px]">
                  {contactsPageContent.formTitle}
                </h2>

                <p className="mt-4 text-[15px] leading-[1.46] text-[var(--color-text-muted)] md:text-[16px]">
                  {contactsPageContent.formDescription.join(" ")}
                </p>
              </div>

              <div className="flex h-full flex-col">
                <div className="grid h-[60px] grid-cols-[1fr_1px_1fr] items-center gap-[18px]">
                  <button
                    type="button"
                    onClick={() => setMode("request")}
                    className={cn(
                      "h-full rounded-[12px] text-[14px] font-semibold transition duration-300",
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
                      "h-full rounded-[12px] text-[14px] font-semibold transition duration-300",
                      mode === "send"
                        ? "bg-[var(--color-accent-1)] text-[var(--color-bg)]"
                        : "bg-[var(--color-bg)] text-[var(--color-text)]",
                    )}
                  >
                    отправить КП
                  </button>
                </div>

                <div
                  className="mt-[54px]"
                  style={{ height: `${FORM_CONTENT_HEIGHT}px` }}
                >
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
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
