"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Factory, FlaskConical, Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

const stages = [
  {
    id: "rd",
    title: ["R&D Центр", "и лаборатория"],
    description: ["улучшаем рецептуру", "и контролируем качество"],
  },
  {
    id: "factory",
    eyebrow: "комплекс на",
    metric: "2300 м²",
    description: [
      "Современный заводской комплекс,",
      "оснащённый автоматизированными",
      "линиями последнего поколения.",
    ],
  },
  {
    id: "eco",
    eyebrow: "эко-стандарт",
    metric: "ISO 14001",
    description: [
      "соблюдаем стандарты эко-норм",
      "безопасность для человека",
      "и окружающей среды",
    ],
  },
] as const;

function ProgressBars({
  activeStage,
  onSelect,
}: {
  activeStage: number;
  onSelect: (stage: number) => void;
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      {stages.map((stage, index) => (
        <button
          key={stage.id}
          type="button"
          aria-label={`Открыть этап ${index + 1}`}
          onClick={() => onSelect(index)}
          className={cn(
            "h-[4px] rounded-full transition-all duration-300",
            activeStage === index
              ? "w-10 bg-[var(--color-accent-1)]"
              : "w-6 bg-[var(--color-accent-3)]/55 hover:bg-[var(--color-accent-3)]",
          )}
        />
      ))}
    </div>
  );
}

function BaseCard({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative z-20 flex h-[262px] w-[300px] shrink-0 flex-col items-start justify-between rounded-[32px] border-[3px] border-[var(--color-accent-2)] bg-[var(--color-bg)] px-8 py-7 text-left transition duration-300",
        active && "shadow-[0_12px_28px_rgba(43,47,51,0.08)]",
      )}
    >
      <FlaskConical
        size={42}
        strokeWidth={2.1}
        className="text-[var(--color-accent-2)]"
      />

      <div className="space-y-5">
        <div className="font-heading text-[26px] leading-[1.1] tracking-[-0.04em] text-[var(--color-accent-2)]">
          <div>R&amp;D Центр</div>
          <div>и лаборатория</div>
        </div>

        <div className="text-[16px] leading-[1.32] text-[var(--color-text)]/82">
          <div>улучшаем рецептуру</div>
          <div>и контролируем качество</div>
        </div>
      </div>
    </button>
  );
}

function FactoryPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 14 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="h-[262px] w-[560px] rounded-r-[32px] bg-[var(--color-accent-2)] px-12 py-7 text-white"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="font-heading text-[28px] leading-[1] tracking-[-0.04em] text-white">
          комплекс на
        </div>

        <div className="flex items-end gap-5">
          <Factory size={54} strokeWidth={2.1} className="mb-[10px] shrink-0" />

          <div className="font-heading text-[84px] leading-[0.9] tracking-[-0.06em]">
            2300 м²
          </div>
        </div>

        <div className="max-w-[420px] text-[18px] leading-[1.28] text-white/92">
          <div>Современный заводской комплекс,</div>
          <div>оснащённый автоматизированными</div>
          <div>линиями последнего поколения.</div>
        </div>
      </div>
    </motion.div>
  );
}

function EcoPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 14 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="h-[262px] w-[540px] rounded-r-[32px] bg-[var(--color-accent-1)] px-10 py-7 text-[var(--color-accent-1-foreground)]"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="font-heading text-[26px] leading-[1] tracking-[-0.04em]">
          эко-стандарт
        </div>

        <div className="flex items-end gap-4">
          <Leaf size={56} strokeWidth={2.1} className="mb-[10px] shrink-0" />

          <div className="font-heading text-[78px] leading-[0.9] tracking-[-0.06em]">
            ISO 14001
          </div>
        </div>

        <div className="max-w-[410px] text-[18px] leading-[1.28] opacity-95">
          <div>соблюдаем стандарты эко-норм</div>
          <div>безопасность для человека</div>
          <div>и окружающей среды</div>
        </div>
      </div>
    </motion.div>
  );
}

export function CatalogTeaser() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveStage((prev) => (prev === 2 ? 0 : prev + 1));
    }, 4200);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <Section className="pt-2 xl:pt-3">
      <Container>
        <div className="md:hidden">
          <div className="flex flex-col gap-3">
            <div className="rounded-[28px] border-[3px] border-[var(--color-accent-2)] bg-[var(--color-bg)] px-6 py-6">
              <div className="flex flex-col gap-5">
                <FlaskConical
                  size={34}
                  strokeWidth={2.1}
                  className="text-[var(--color-accent-2)]"
                />

                <div className="font-heading text-[24px] leading-[1.08] tracking-[-0.04em] text-[var(--color-accent-2)]">
                  <div>R&amp;D Центр</div>
                  <div>и лаборатория</div>
                </div>

                <div className="text-[15px] leading-[1.3] text-[var(--color-text)]/82">
                  <div>улучшаем рецептуру</div>
                  <div>и контролируем качество</div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-[var(--color-accent-2)] px-6 py-6 text-white">
              <div className="flex flex-col gap-5">
                <div className="font-heading text-[24px] leading-[1] tracking-[-0.04em]">
                  комплекс на
                </div>

                <div className="flex items-end gap-3">
                  <Factory size={38} strokeWidth={2.1} className="mb-[6px]" />
                  <div className="font-heading text-[50px] leading-[0.92] tracking-[-0.06em]">
                    2300 м²
                  </div>
                </div>

                <div className="text-[15px] leading-[1.3] text-white/92">
                  <div>Современный заводской комплекс,</div>
                  <div>оснащённый автоматизированными</div>
                  <div>линиями последнего поколения.</div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-[var(--color-accent-1)] px-6 py-6 text-[var(--color-accent-1-foreground)]">
              <div className="flex flex-col gap-5">
                <div className="font-heading text-[22px] leading-[1] tracking-[-0.04em]">
                  эко-стандарт
                </div>

                <div className="flex items-end gap-3">
                  <Leaf size={38} strokeWidth={2.1} className="mb-[6px]" />
                  <div className="font-heading text-[42px] leading-[0.92] tracking-[-0.06em]">
                    ISO 14001
                  </div>
                </div>

                <div className="text-[15px] leading-[1.3] opacity-95">
                  <div>соблюдаем стандарты эко-норм</div>
                  <div>безопасность для человека</div>
                  <div>и окружающей среды</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden md:block"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-[36px] bg-transparent">
            <div className="flex items-stretch">
              <BaseCard
                active={activeStage === 0}
                onClick={() => setActiveStage(0)}
              />

              <motion.div
                animate={{
                  width: activeStage >= 1 ? 540 : 0,
                  opacity: activeStage >= 1 ? 1 : 0,
                  marginLeft: activeStage >= 1 ? -12 : 0,
                }}
                transition={{
                  duration: 0.62,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 overflow-hidden"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveStage(1)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveStage(1);
                    }
                  }}
                  className="outline-none"
                >
                  <AnimatePresence mode="wait">
                    {activeStage >= 1 ? <FactoryPanel /> : null}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  width: activeStage >= 2 ? 520 : 0,
                  opacity: activeStage >= 2 ? 1 : 0,
                  marginLeft: activeStage >= 2 ? -12 : 0,
                }}
                transition={{
                  duration: 0.62,
                  ease: [0.22, 1, 0.36, 1],
                  delay: activeStage >= 2 ? 0.06 : 0,
                }}
                className="relative z-0 overflow-hidden"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveStage(2)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveStage(2);
                    }
                  }}
                  className="outline-none"
                >
                  <AnimatePresence mode="wait">
                    {activeStage >= 2 ? <EcoPanel /> : null}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            <div className="mt-5 flex items-center justify-end">
              <ProgressBars
                activeStage={activeStage}
                onSelect={(stage) => setActiveStage(stage)}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
