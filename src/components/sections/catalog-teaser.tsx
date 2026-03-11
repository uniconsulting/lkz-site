"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Factory, FlaskConical, Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

const DESKTOP_STAGE_WIDTHS = [300, 860, 1380] as const;
const AUTO_DELAY = 4200;

function ProgressBars({
  activeStage,
  onSelect,
}: {
  activeStage: number;
  onSelect: (stage: number) => void;
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      {[0, 1, 2].map((stage) => (
        <button
          key={stage}
          type="button"
          onClick={() => onSelect(stage)}
          aria-label={`Открыть этап ${stage + 1}`}
          className={cn(
            "rounded-full transition-all duration-300",
            activeStage === stage
              ? "h-[4px] w-10 bg-[var(--color-accent-1)]"
              : "h-[4px] w-6 bg-[var(--color-accent-3)]/45 hover:bg-[var(--color-accent-3)]/75",
          )}
        />
      ))}
    </div>
  );
}

function RnDCard({
  desktop = false,
}: {
  desktop?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between rounded-[32px] border-[3px] border-[var(--color-accent-2)] bg-[var(--color-bg)]",
        desktop ? "w-[300px] px-8 py-7" : "px-6 py-6",
      )}
    >
      <FlaskConical
        size={desktop ? 42 : 34}
        strokeWidth={2.1}
        className="text-[var(--color-accent-2)]"
      />

      <div className={cn(desktop ? "space-y-5" : "space-y-4")}>
        <div
          className={cn(
            "font-heading tracking-[-0.04em] text-[var(--color-accent-2)]",
            desktop ? "text-[26px] leading-[1.08]" : "text-[24px] leading-[1.08]",
          )}
        >
          <div>R&amp;D Центр</div>
          <div>и лаборатория</div>
        </div>

        <div
          className={cn(
            "text-[var(--color-text)]/82",
            desktop ? "text-[16px] leading-[1.3]" : "text-[15px] leading-[1.3]",
          )}
        >
          <div>улучшаем рецептуру</div>
          <div>и контролируем качество</div>
        </div>
      </div>
    </div>
  );
}

function FactoryCard({
  visible,
  desktop = false,
}: {
  visible: boolean;
  desktop?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between bg-[var(--color-accent-2)] text-white",
        desktop ? "w-[560px] rounded-r-[32px] px-10 py-7" : "rounded-[28px] px-6 py-6",
      )}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          x: visible ? 0 : 10,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full flex-col justify-between"
      >
        <div
          className={cn(
            "font-heading tracking-[-0.04em]",
            desktop ? "text-[28px] leading-[1]" : "text-[24px] leading-[1]",
          )}
        >
          комплекс на
        </div>

        <div className={cn("flex items-end", desktop ? "gap-4" : "gap-3")}>
          <Factory
            size={desktop ? 52 : 38}
            strokeWidth={2.1}
            className={desktop ? "mb-[8px]" : "mb-[6px]"}
          />

          <div
            className={cn(
              "font-heading tracking-[-0.06em]",
              desktop ? "text-[82px] leading-[0.9]" : "text-[50px] leading-[0.92]",
            )}
          >
            2300 м²
          </div>
        </div>

        <div
          className={cn(
            "text-white/92",
            desktop ? "max-w-[410px] text-[18px] leading-[1.26]" : "text-[15px] leading-[1.3]",
          )}
        >
          <div>Современный заводской комплекс,</div>
          <div>оснащённый автоматизированными</div>
          <div>линиями последнего поколения.</div>
        </div>
      </motion.div>
    </div>
  );
}

function EcoCard({
  visible,
  desktop = false,
}: {
  visible: boolean;
  desktop?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]",
        desktop ? "w-[520px] rounded-r-[32px] px-10 py-7" : "rounded-[28px] px-6 py-6",
      )}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          x: visible ? 0 : 10,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full flex-col justify-between"
      >
        <div
          className={cn(
            "font-heading tracking-[-0.04em]",
            desktop ? "text-[24px] leading-[1]" : "text-[22px] leading-[1]",
          )}
        >
          эко-стандарт
        </div>

        <div className={cn("flex items-end", desktop ? "gap-4" : "gap-3")}>
          <Leaf
            size={desktop ? 52 : 38}
            strokeWidth={2.1}
            className={desktop ? "mb-[8px]" : "mb-[6px]"}
          />

          <div
            className={cn(
              "font-heading tracking-[-0.06em]",
              desktop ? "text-[72px] leading-[0.9]" : "text-[42px] leading-[0.92]",
            )}
          >
            ISO 14001
          </div>
        </div>

        <div
          className={cn(
            "opacity-95",
            desktop ? "max-w-[390px] text-[18px] leading-[1.26]" : "text-[15px] leading-[1.3]",
          )}
        >
          <div>соблюдаем стандарты эко-норм</div>
          <div>безопасность для человека</div>
          <div>и окружающей среды</div>
        </div>
      </motion.div>
    </div>
  );
}

export function CatalogTeaser() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveStage((prev) => (prev === 2 ? 0 : prev + 1));
    }, AUTO_DELAY);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <Section className="pt-2 xl:pt-3">
      <Container>
        <div className="md:hidden">
          <div className="flex flex-col gap-3">
            <RnDCard />
            <FactoryCard visible desktop={false} />
            <EcoCard visible desktop={false} />
          </div>
        </div>

        <div
          className="hidden md:block"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            animate={{ width: DESKTOP_STAGE_WIDTHS[activeStage] }}
            transition={{
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-[262px] overflow-hidden"
          >
            <div className="flex h-full w-[1380px] items-stretch">
              <button
                type="button"
                onClick={() => setActiveStage(0)}
                className="h-full cursor-pointer text-left"
                aria-label="Открыть блок R&D"
              >
                <RnDCard desktop />
              </button>

              <button
                type="button"
                onClick={() => setActiveStage(1)}
                className="h-full cursor-pointer text-left"
                aria-label="Открыть блок производства"
              >
                <FactoryCard visible={activeStage >= 1} desktop />
              </button>

              <button
                type="button"
                onClick={() => setActiveStage(2)}
                className="h-full cursor-pointer text-left"
                aria-label="Открыть блок эко-стандарта"
              >
                <EcoCard visible={activeStage >= 2} desktop />
              </button>
            </div>
          </motion.div>

          <div className="mt-5 flex items-center justify-end">
            <ProgressBars activeStage={activeStage} onSelect={setActiveStage} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
