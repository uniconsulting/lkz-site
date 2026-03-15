"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgePercent,
  Boxes,
  CheckCircle2,
  Grid2x2,
  Handshake,
  Package,
  RotateCcw,
  ShieldCheck,
  Store,
  Tag,
  Truck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import {
  howToBuyResultContent,
  howToBuySteps,
  howToBuySuccessContent,
  mapHowToBuySummary,
  type HowToBuyAnswers,
  type HowToBuyOption,
  type HowToBuyOptionIconKey,
  type HowToBuyStep,
  type HowToBuyStepId,
} from "@/lib/content/how-to-buy";

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

const stepMotion = {
  initial: {
    opacity: 0,
    x: 20,
    y: 8,
    scale: 0.995,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -16,
    y: -4,
    scale: 0.995,
    filter: "blur(6px)",
    transition: {
      duration: 0.26,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

const iconMap: Record<HowToBuyOptionIconKey, LucideIcon> = {
  users: Users,
  store: Store,
  shield: ShieldCheck,
  boxes: Boxes,
  tag: Tag,
  workflow: Workflow,
  package: Package,
  truck: Truck,
  grid: Grid2x2,
  badge: BadgePercent,
  handshake: Handshake,
};

const processItems = [
  {
    id: "request",
    index: "01",
    title: "оставляете запрос",
    description:
      "кратко указываете формат закупки и что именно вас интересует",
  },
  {
    id: "clarify",
    index: "02",
    title: "уточняем параметры",
    description:
      "менеджер помогает определить объём, категории продукции и формат сотрудничества",
  },
  {
    id: "offer",
    index: "03",
    title: "получаете предложение",
    description:
      "направляем прайс-лист, условия поставки и следующий шаг по взаимодействию",
  },
] as const;

function getCompletionRatio(stepIndex: number, isCompleted: boolean) {
  if (isCompleted) return 1;
  return Math.max((stepIndex + 1) / howToBuySteps.length, 0.12);
}

function StepProgress({
  stepIndex,
  isCompleted,
}: {
  stepIndex: number;
  isCompleted: boolean;
}) {
  const ratio = getCompletionRatio(stepIndex, isCompleted);

  return (
    <div className="relative h-[4px] w-full overflow-hidden rounded-full bg-[var(--color-border)]">
      <motion.span
        className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent-1)]"
        initial={false}
        animate={{ width: `${ratio * 100}%` }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function ProcessCard({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={cardMotion}
      className="rounded-[24px] bg-[var(--color-surface)] p-5 md:p-6"
    >
      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
        {index}
      </div>

      <h3 className="mt-4 font-heading text-[24px] leading-[0.96] tracking-[-0.04em] text-[var(--color-text)]">
        {title}
      </h3>

      <p className="mt-4 text-[15px] leading-[1.46] text-[var(--color-text-muted)]">
        {description}
      </p>
    </motion.div>
  );
}

function OptionCard({
  option,
  isSelected,
  onSelect,
}: {
  option: HowToBuyOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const Icon = iconMap[option.icon];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex w-full min-h-[156px] flex-col items-start rounded-[24px] border p-5 text-left transition-[transform,box-shadow,border-color,background] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(43,47,51,0.06)]",
        isSelected
          ? "border-[var(--color-accent-1)] bg-[var(--color-accent-1)]/[0.08] shadow-[0_10px_28px_rgba(30,222,123,0.12)]"
          : "border-[var(--color-border)] bg-[var(--color-bg)]",
      )}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--color-surface)] text-[var(--color-accent-1)]">
        <Icon size={20} strokeWidth={2.2} />
      </div>

      <div className="text-[17px] font-semibold leading-[1.08] text-[var(--color-text)]">
        {option.title}
      </div>

      {option.description ? (
        <div className="mt-2 whitespace-pre-line text-[14px] leading-[1.38] text-[var(--color-text-muted)]">
          {option.description}
        </div>
      ) : null}

      <motion.span
        className="absolute right-4 top-4 h-3 w-3 rounded-full bg-[var(--color-accent-1)]"
        initial={false}
        animate={{
          scale: isSelected ? 1 : 0.45,
          opacity: isSelected ? 1 : 0.25,
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
    </button>
  );
}

function SummaryCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] bg-[var(--color-surface)] p-5">
      <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        {title}
      </div>

      <div className="mt-3 text-[20px] font-semibold leading-[1.04] tracking-[-0.03em] text-[var(--color-text)]">
        {value}
      </div>

      <div className="mt-3 text-[14px] leading-[1.42] text-[var(--color-text-muted)]">
        {description}
      </div>
    </div>
  );
}

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
    "w-full rounded-[22px] border border-transparent bg-[var(--color-accent-1-foreground)] px-6 text-[13px] text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-1)] focus:shadow-[0_0_0_3px_rgba(30,222,123,0.10)] hover:border-[var(--color-border)]";

  return (
    <label className="block">
      <div className="mb-[6px] pl-[8px] text-[14px] font-semibold tracking-[-0.03em] text-[var(--color-text-muted)]">
        {label}
      </div>

      {textarea ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          className={cn(baseClassName, "h-[132px] resize-none py-4")}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className={cn(baseClassName, "h-[46px]")}
        />
      )}
    </label>
  );
}

export function HowToBuyPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<HowToBuyAnswers>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const autoNextTimeoutRef = useRef<number | null>(null);

  const currentStep = howToBuySteps[stepIndex] as HowToBuyStep;
  const summaryCards = useMemo(() => mapHowToBuySummary(answers), [answers]);
  const currentValue = answers[currentStep.id];

  useEffect(() => {
    return () => {
      if (autoNextTimeoutRef.current) {
        window.clearTimeout(autoNextTimeoutRef.current);
      }
    };
  }, []);

  function clearPendingTimeout() {
    if (autoNextTimeoutRef.current) {
      window.clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = null;
    }
  }

  function handleSelect(stepId: HowToBuyStepId, value: string) {
    clearPendingTimeout();

    setAnswers((prev) => ({
      ...prev,
      [stepId]: value,
    }));

    const isLastStep = stepIndex === howToBuySteps.length - 1;

    autoNextTimeoutRef.current = window.setTimeout(() => {
      if (isLastStep) {
        setIsCompleted(true);
      } else {
        setStepIndex((prev) => prev + 1);
      }
    }, 200);
  }

  function handlePrev() {
    clearPendingTimeout();

    if (isCompleted) {
      setIsCompleted(false);
      setStepIndex(howToBuySteps.length - 1);
      return;
    }

    setStepIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleReset() {
    clearPendingTimeout();
    setAnswers({});
    setStepIndex(0);
    setIsCompleted(false);
    setIsSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

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
            <div className="flex max-w-[760px] flex-col justify-center xl:-mt-2">
              <div className="mb-5 text-[15px] tracking-[-0.02em] text-[var(--color-text-muted)]">
                главная / как купить
              </div>

              <h1 className="font-heading text-[34px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[48px] xl:text-[58px]">
                Как купить продукцию
              </h1>

              <p className="mt-5 max-w-[620px] text-[16px] leading-[1.46] text-[var(--color-text-muted)] md:text-[18px]">
                <span className="block">
                  подбираем условия поставки индивидуально под объём,
                </span>
                <span className="block">
                  задачи и формат сотрудничества
                </span>
              </p>

              <a
                href="#buy-request"
                className="mt-7 inline-flex h-12 w-fit items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
              >
                оставить запрос
              </a>
            </div>

            <div className="how-to-buy-hero-card overflow-hidden rounded-[28px] p-5 md:p-6 xl:p-7">
              <div className="flex h-full flex-col">
                <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                  персональный формат покупки
                </div>

                <h2 className="how-to-buy-hero-card-title mt-4 font-heading text-[26px] leading-[0.96] tracking-[-0.04em] md:text-[30px]">
                  <span className="block">
                    условия поставки формируются под
                  </span>
                  <span className="block">ваш запрос</span>
                </h2>

                <p className="how-to-buy-hero-card-body mt-4 max-w-[520px] text-[15px] leading-[1.48] md:text-[16px]">
                  <span className="block">
                    после уточнения параметров менеджер направляет
                  </span>
                  <span className="block">
                    прайс-лист, условия сотрудничества и следующий шаг
                  </span>
                  <span className="block">по взаимодействию</span>
                </p>

                <div className="how-to-buy-hero-card-divider mt-6 border-t pt-6">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="flex min-h-[72px] items-center justify-center rounded-[18px] bg-white/[0.04] px-4 py-4 text-center">
                      <div className="how-to-buy-hero-card-point text-[14px] font-semibold leading-[1.2] tracking-[-0.02em]">
                        оптовые закупки
                      </div>
                    </div>

                    <div className="flex min-h-[72px] items-center justify-center rounded-[18px] bg-white/[0.04] px-4 py-4 text-center">
                      <div className="how-to-buy-hero-card-point text-[14px] font-semibold leading-[1.2] tracking-[-0.02em]">
                        дилерский формат
                      </div>
                    </div>

                    <div className="flex min-h-[72px] items-center justify-center rounded-[18px] bg-white/[0.04] px-4 py-4 text-center">
                      <div className="how-to-buy-hero-card-point text-[14px] font-semibold leading-[1.2] tracking-[-0.02em]">
                        Private Label / СТМ
                      </div>
                    </div>
                  </div>
                </div>
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
            className="grid gap-4 md:grid-cols-3"
          >
            {processItems.map((item) => (
              <ProcessCard
                key={item.id}
                index={item.index}
                title={item.title}
                description={item.description}
              />
            ))}
          </motion.div>
        </Container>
      </Section>

      <Section id="buy-request" className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="rounded-[32px] bg-[var(--color-surface)] p-4 md:p-6 xl:rounded-[36px] xl:p-8"
          >
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                  <div className="min-w-[68px] text-[16px] font-semibold text-[var(--color-text)]">
                    {isSubmitted
                      ? "готово"
                      : isCompleted
                        ? "запрос"
                        : `${stepIndex + 1} / ${howToBuySteps.length}`}
                  </div>

                  <p className="max-w-[760px] text-[15px] leading-[1.4] text-[var(--color-text-muted)] md:text-[16px]">
                    {isSubmitted
                      ? "отдел продаж получил ваш запрос"
                      : isCompleted
                        ? "проверьте краткое summary и оставьте контакты для связи"
                        : currentStep.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                >
                  <RotateCcw size={16} strokeWidth={2.2} />
                  <span>сбросить</span>
                </button>
              </div>

              <StepProgress
                stepIndex={stepIndex}
                isCompleted={isCompleted || isSubmitted}
              />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {isSubmitted ? (
                <motion.div
                  key="success"
                  variants={stepMotion}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="rounded-[24px] bg-[var(--color-bg)] p-5 md:p-6"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
                    <CheckCircle2 size={24} strokeWidth={2.2} />
                  </div>

                  <h3 className="mt-5 font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[36px]">
                    {howToBuySuccessContent.title}
                  </h3>

                  <p className="mt-4 max-w-[760px] text-[15px] leading-[1.5] text-[var(--color-text-muted)] md:text-[16px]">
                    {howToBuySuccessContent.description}
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/products"
                      className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
                    >
                      {howToBuySuccessContent.primaryCta}
                    </Link>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-surface)] px-6 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                    >
                      {howToBuySuccessContent.secondaryCta}
                    </button>
                  </div>
                </motion.div>
              ) : !isCompleted ? (
                <motion.div
                  key={currentStep.id}
                  variants={stepMotion}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="min-h-[420px]">
                    <h2 className="font-heading text-[34px] leading-[0.94] tracking-[-0.05em] text-[var(--color-text)] md:text-[42px] xl:text-[48px]">
                      {currentStep.title}
                    </h2>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {currentStep.options.map((option) => (
                        <OptionCard
                          key={option.value}
                          option={option}
                          isSelected={currentValue === option.value}
                          onSelect={() =>
                            handleSelect(currentStep.id, option.value)
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={stepIndex === 0}
                      className={cn(
                        "inline-flex h-12 items-center justify-center rounded-[18px] px-6 text-[15px] font-semibold transition duration-300",
                        stepIndex === 0
                          ? "cursor-not-allowed bg-[var(--color-border)] text-[var(--color-text-muted)]"
                          : "bg-[var(--color-bg)] text-[var(--color-text)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]",
                      )}
                    >
                      назад
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  variants={stepMotion}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="rounded-[24px] bg-[var(--color-bg)] p-5 md:p-6"
                >
                  <div className="inline-flex items-center rounded-[999px] bg-[var(--color-accent-1)]/[0.12] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                    {howToBuyResultContent.eyebrow}
                  </div>

                  <h3 className="mt-5 font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[36px]">
                    {howToBuyResultContent.title}
                  </h3>

                  <p className="mt-4 max-w-[760px] text-[15px] leading-[1.5] text-[var(--color-text-muted)] md:text-[16px]">
                    {howToBuyResultContent.description}
                  </p>

                  <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {summaryCards.map((card) => (
                      <SummaryCard
                        key={card.id}
                        title={card.title}
                        value={card.value}
                        description={card.description}
                      />
                    ))}
                  </div>

                  <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-[24px] bg-[var(--color-surface)] p-5">
                      <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                        {howToBuyResultContent.actionsTitle}
                      </div>

                      <div className="mt-4 space-y-3">
                        {howToBuyResultContent.actions.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <div className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent-1)]" />
                            <div className="text-[15px] leading-[1.42] text-[var(--color-text)]">
                              {item}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="rounded-[24px] bg-[var(--color-surface)] p-5"
                    >
                      <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                        {howToBuyResultContent.formTitle}
                      </div>

                      <p className="mt-3 text-[15px] leading-[1.45] text-[var(--color-text-muted)]">
                        {howToBuyResultContent.formDescription}
                      </p>

                      <div className="mt-5 grid gap-4">
                        <ContactInput label="имя" placeholder="ваше имя" />
                        <ContactInput
                          label="компания"
                          placeholder="название компании"
                        />
                        <ContactInput
                          label="контакт"
                          placeholder="telegram / телефон / email"
                        />
                        <ContactInput
                          label="город / регион"
                          placeholder="город или регион поставки"
                        />
                        <ContactInput
                          label="комментарий"
                          placeholder="кратко опишите запрос"
                          textarea
                        />
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="submit"
                          className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
                        >
                          {howToBuyResultContent.submitLabel}
                        </button>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-bg)] px-6 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                        >
                          {howToBuyResultContent.resetLabel}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
