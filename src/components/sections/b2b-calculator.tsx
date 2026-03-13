"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  Boxes,
  Building2,
  CheckCircle2,
  Globe2,
  Grid2x2,
  Handshake,
  MonitorSmartphone,
  Package,
  RotateCcw,
  ShieldCheck,
  Store,
  Tag,
  Truck,
  Users,
  WandSparkles,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import {
  calculatorSteps,
  mapResultToCards,
  resolveCalculatorResult,
  type CalculatorAnswers,
  type CalculatorOption,
  type CalculatorStep,
  type CalculatorStepId,
  type OptionIconKey,
} from "@/lib/content/b2b-calculator";

const sectionMotion = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const stepMotion = {
  initial: { opacity: 0, x: 22, y: 10 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -22,
    y: -10,
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

const iconMap: Record<OptionIconKey, LucideIcon> = {
  users: Users,
  store: Store,
  network: Waypoints,
  warehouse: Building2,
  monitor: MonitorSmartphone,
  package: Package,
  badge: Tag,
  blend: Handshake,
  beaker: WandSparkles,
  boxes: Boxes,
  truck: Truck,
  globe: Globe2,
  coins: BadgePercent,
  route: Truck,
  tag: Tag,
  grid: Grid2x2,
  shield: ShieldCheck,
};

const displayFeatureCards = [
  {
    id: "scenario",
    icon: Workflow,
    title: "Сценарий",
    description: "Подбираем сценарий под вашу модель продаж",
    meta: "01",
    iconClassName: "text-[var(--color-accent-1)]",
    titleClassName: "text-[var(--color-accent-1)]",
    className:
      "left-0 top-0 rotate-[-4deg] opacity-55 hover:opacity-100 xl:w-[292px]",
  },
  {
    id: "pl-logistics",
    icon: Boxes,
    title: "СТМ и логистика",
    description: "Учитываем СТМ, логистику и ассортимент",
    meta: "02",
    iconClassName: "text-[var(--color-accent-1)]",
    titleClassName: "text-[var(--color-accent-1)]",
    className:
      "left-[52px] top-[32px] rotate-[-1.8deg] opacity-75 hover:opacity-100 xl:w-[302px]",
  },
  {
    id: "commercial-step",
    icon: Handshake,
    title: "Коммерческий шаг",
    description: "Даём ориентир для первого коммерческого шага",
    meta: "03",
    iconClassName: "text-[var(--color-accent-1)]",
    titleClassName: "text-[var(--color-accent-1)]",
    className: "left-[108px] top-[66px] rotate-[1deg] xl:w-[312px]",
  },
] as const;

function getCompletionRatio(stepIndex: number, isCompleted: boolean) {
  if (isCompleted) return 1;
  return Math.max((stepIndex + 1) / calculatorSteps.length, 0.12);
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

function FeatureStackCards() {
  return (
    <div className="relative hidden h-[230px] w-[430px] xl:block">
      {displayFeatureCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: 24, y: 18 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.08 + index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -10,
              scale: 1.012,
              opacity: 1,
            }}
            className={cn(
              "absolute rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg)]/92 p-5 shadow-[0_10px_28px_rgba(43,47,51,0.05)] backdrop-blur-[10px] transition-[opacity] duration-500",
              card.className,
            )}
          >
            <div className="mb-4 flex items-center gap-2">
              <Icon
                className={cn("size-4 shrink-0", card.iconClassName)}
                strokeWidth={2.2}
              />
              <span
                className={cn(
                  "text-[13px] font-semibold leading-none tracking-[-0.02em]",
                  card.titleClassName,
                )}
              >
                {card.title}
              </span>
            </div>

            <p className="max-w-[230px] text-[14px] leading-[1.38] text-[var(--color-text)]">
              {card.description}
            </p>

            <div className="mt-6 text-[13px] font-medium text-[var(--color-text-muted)]">
              {card.meta}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function FeatureCardsMobile() {
  return (
    <div className="grid gap-3 xl:hidden">
      {displayFeatureCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-bg)] p-4 shadow-[0_8px_22px_rgba(43,47,51,0.04)]"
          >
            <div className="mb-3 flex items-center gap-2">
              <Icon
                className="size-4 shrink-0 text-[var(--color-accent-1)]"
                strokeWidth={2.2}
              />
              <span className="text-[13px] font-semibold tracking-[-0.02em] text-[var(--color-accent-1)]">
                {card.title}
              </span>
            </div>

            <p className="text-[14px] leading-[1.38] text-[var(--color-text)]">
              {card.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

function OptionCard({
  option,
  isSelected,
  onSelect,
}: {
  option: CalculatorOption<string>;
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
        <div className="mt-2 text-[14px] leading-[1.38] text-[var(--color-text-muted)]">
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

function ResultCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] bg-[var(--color-bg)] p-5">
      <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        {title}
      </div>

      <div className="mt-3 text-[20px] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--color-text)]">
        {value}
      </div>

      <div className="mt-3 text-[14px] leading-[1.45] text-[var(--color-text-muted)]">
        {description}
      </div>
    </div>
  );
}

export function B2BCalculatorSection() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<CalculatorAnswers>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const autoNextTimeoutRef = useRef<number | null>(null);

  const currentStep = calculatorSteps[stepIndex] as CalculatorStep;
  const result = useMemo(() => resolveCalculatorResult(answers), [answers]);
  const resultCards = useMemo(
    () => (result ? mapResultToCards(result) : []),
    [result],
  );

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

  function handleSelect(stepId: CalculatorStepId, value: string) {
    clearPendingTimeout();

    setAnswers((prev) => ({
      ...prev,
      [stepId]: value,
    }));

    const isLastStep = stepIndex === calculatorSteps.length - 1;

    autoNextTimeoutRef.current = window.setTimeout(() => {
      if (isLastStep) {
        setIsCompleted(true);
      } else {
        setStepIndex((prev) => prev + 1);
      }
    }, 220);
  }

  function handlePrev() {
    clearPendingTimeout();

    if (isCompleted) {
      setIsCompleted(false);
      setStepIndex(calculatorSteps.length - 1);
      return;
    }

    setStepIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleNext() {
    clearPendingTimeout();

    if (isCompleted) return;

    if (stepIndex === calculatorSteps.length - 1) {
      setIsCompleted(true);
      return;
    }

    setStepIndex((prev) => Math.min(prev + 1, calculatorSteps.length - 1));
  }

  function handleReset() {
    clearPendingTimeout();
    setAnswers({});
    setStepIndex(0);
    setIsCompleted(false);
  }

  const currentValue = answers[currentStep.id];

  return (
    <Section className="pt-10 md:pt-12 xl:pt-14">
      <Container>
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.14 }}
          className="flex flex-col gap-6 md:gap-8"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-[760px]">
              <div className="mb-5 inline-flex items-center rounded-[999px] bg-[var(--color-accent-1)]/[0.12] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                B2B-конфигуратор
              </div>

              <h2 className="font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[40px] xl:text-[46px]">
                Подберите формат сотрудничества
              </h2>

              <p className="mt-5 max-w-[640px] text-[15px] leading-[1.48] text-[var(--color-text-muted)] md:text-[17px]">
                <span className="block">
                  Для дилеров, торговых сетей
                </span>
                <span className="block">
                  и партнёров по модели Private Label
                </span>
              </p>
            </div>

            <FeatureStackCards />
          </div>

          <FeatureCardsMobile />

          <div className="rounded-[32px] bg-[var(--color-surface)] p-4 md:p-6 xl:rounded-[36px] xl:p-8">
            <div className="rounded-[28px] bg-[var(--color-surface-strong)] p-4 md:p-5 xl:rounded-[32px] xl:p-6">
              <div className="mb-6 flex flex-col gap-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                    <div className="min-w-[56px] text-[16px] font-semibold text-[var(--color-text)]">
                      {isCompleted
                        ? "Готово"
                        : `${stepIndex + 1} / ${calculatorSteps.length}`}
                    </div>

                    <p className="max-w-[740px] text-[15px] leading-[1.4] text-[var(--color-text-muted)] md:text-[16px]">
                      {isCompleted
                        ? "Подготовили ориентировочный сценарий сотрудничества под ваш формат запуска."
                        : currentStep.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                  >
                    <RotateCcw size={16} strokeWidth={2.2} />
                    <span>Сбросить</span>
                  </button>
                </div>

                <StepProgress stepIndex={stepIndex} isCompleted={isCompleted} />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {!isCompleted ? (
                  <motion.div
                    key={currentStep.id}
                    variants={stepMotion}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <div className="min-h-[420px]">
                      <h3 className="font-heading text-[34px] leading-[0.94] tracking-[-0.05em] text-[var(--color-text)] md:text-[42px] xl:text-[48px]">
                        {currentStep.title}
                      </h3>

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

                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!currentValue}
                        className={cn(
                          "inline-flex h-12 items-center justify-center rounded-[18px] px-6 text-[15px] font-semibold transition duration-300",
                          !currentValue
                            ? "cursor-not-allowed bg-[var(--color-border)] text-[var(--color-text-muted)]"
                            : "bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)] hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]",
                        )}
                      >
                        далее
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
                  >
                    <div className="rounded-[24px] bg-[var(--color-bg)] p-5 md:p-6">
                      <div className="inline-flex items-center rounded-[999px] bg-[var(--color-accent-1)]/[0.12] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                        Рекомендуемый сценарий
                      </div>

                      <h3 className="mt-5 font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[36px]">
                        {result?.modelTitle}
                      </h3>

                      <p className="mt-4 max-w-[760px] text-[15px] leading-[1.5] text-[var(--color-text-muted)] md:text-[16px]">
                        {result?.modelDescription}
                      </p>

                      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {resultCards.map((card) => (
                          <ResultCard
                            key={card.id}
                            title={card.title}
                            value={card.value}
                            description={card.description}
                          />
                        ))}
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <a
                          href="#contacts"
                          className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
                        >
                          Получить коммерческое предложение
                        </a>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-surface)] px-6 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                        >
                          Пройти заново
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-bg)] px-6 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                      >
                        назад
                      </button>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-surface)] px-6 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                      >
                        Новый расчёт
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
