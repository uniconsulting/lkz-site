"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgePercent,
  Boxes,
  Building2,
  Factory,
  Globe2,
  Grid2x2,
  Handshake,
  Landmark,
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

const introFeatures = [
  "Подбираем сценарий под вашу модель продаж",
  "Учитываем СТМ, логистику и ассортимент",
  "Даём ориентир для первого коммерческого шага",
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
    <div className="flex items-center gap-4">
      <div className="min-w-[52px] text-[13px] font-semibold text-[var(--color-text-muted)]">
        {isCompleted ? "Готово" : `${stepIndex + 1} / ${calculatorSteps.length}`}
      </div>

      <div className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent-1)]"
          initial={false}
          animate={{ width: `${ratio * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
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
        "group relative flex w-full flex-col items-start rounded-[24px] border p-5 text-left transition-[transform,box-shadow,border-color,background] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
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
          className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]"
        >
          <div className="rounded-[32px] bg-[var(--color-surface)] p-6 md:p-8 xl:p-10">
            <div className="mb-5 inline-flex items-center rounded-[999px] bg-[var(--color-accent-1)]/[0.12] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
              B2B-конфигуратор
            </div>

            <h2 className="font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[40px] xl:text-[46px]">
              Подберите формат сотрудничества
            </h2>

            <p className="mt-5 max-w-[560px] text-[15px] leading-[1.48] text-[var(--color-text-muted)] md:text-[17px]">
              <span className="block">
                Для дилеров, торговых сетей и партнёров
              </span>
              <span className="block">по модели Private Label</span>
            </p>

            <div className="mt-8 grid gap-3">
              {introFeatures.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] bg-[var(--color-bg)] p-4"
                >
                  <div className="mt-[2px] flex h-7 w-7 items-center justify-center rounded-[10px] bg-[var(--color-accent-1)]/[0.12] text-[var(--color-accent-1)]">
                    <Factory size={15} strokeWidth={2.2} />
                  </div>

                  <div className="text-[15px] leading-[1.4] text-[var(--color-text)]">
                    {item}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-[560px] text-[14px] leading-[1.5] text-[var(--color-text-muted)]">
              Расчёт носит ориентировочный характер и помогает быстрее
              определить рабочий формат сотрудничества.
            </p>
          </div>

          <div className="rounded-[32px] bg-[var(--color-surface)] p-4 md:p-5 xl:p-6">
            <div className="rounded-[28px] bg-[var(--color-surface-strong)] p-4 md:p-5">
              <div className="mb-6 flex items-center justify-between gap-4">
                <StepProgress stepIndex={stepIndex} isCompleted={isCompleted} />

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-bg)] px-4 text-[14px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                >
                  <RotateCcw size={16} strokeWidth={2.2} />
                  <span className="hidden md:inline">Сбросить</span>
                </button>
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
                    <div className="min-h-[356px]">
                      <div className="mb-6">
                        <h3 className="font-heading text-[26px] leading-[0.98] tracking-[-0.05em] text-[var(--color-text)] md:text-[32px]">
                          {currentStep.title}
                        </h3>

                        <p className="mt-3 max-w-[620px] text-[15px] leading-[1.45] text-[var(--color-text-muted)] md:text-[16px]">
                          {currentStep.description}
                        </p>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
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

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handlePrev}
                        disabled={stepIndex === 0}
                        className={cn(
                          "inline-flex h-12 items-center justify-center rounded-[18px] px-5 text-[15px] font-semibold transition duration-300",
                          stepIndex === 0
                            ? "cursor-not-allowed bg-[var(--color-border)] text-[var(--color-text-muted)]"
                            : "bg-[var(--color-bg)] text-[var(--color-text)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]",
                        )}
                      >
                        Назад
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
                        {stepIndex === calculatorSteps.length - 1
                          ? "Показать результат"
                          : "Далее"}
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

                      <p className="mt-4 max-w-[660px] text-[15px] leading-[1.5] text-[var(--color-text-muted)] md:text-[16px]">
                        {result?.modelDescription}
                      </p>

                      <div className="mt-6 grid gap-3 md:grid-cols-2">
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

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-bg)] px-5 text-[15px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
                      >
                        Назад
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
