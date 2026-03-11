"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Factory, FlaskConical, Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

const AUTO_DELAY = 4200;
const OVERLAP = 24;
const BASE_CARD_WIDTH = 290;
const FACTORY_WIDTH = 500;
const ECO_WIDTH = 450;
const RIGHT_AREA_WIDTHS = [0, FACTORY_WIDTH, FACTORY_WIDTH + ECO_WIDTH - OVERLAP] as const;

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

function RnDCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between border-[3px] border-[var(--color-accent-2)] bg-[var(--color-bg)]",
        mobile
          ? "rounded-[28px] px-6 py-6"
          : "w-[290px] rounded-[32px] px-8 py-7",
      )}
    >
      <FlaskConical
        size={mobile ? 34 : 42}
        strokeWidth={2.1}
        className="text-[var(--color-accent-2)]"
      />

      <div className={cn(mobile ? "space-y-4" : "space-y-5")}>
        <div
          className={cn(
            "font-heading tracking-[-0.04em] text-[var(--color-accent-2)]",
            mobile ? "text-[20px] leading-[1.08]" : "text-[22px] leading-[1.06]",
          )}
        >
          <div>R&amp;D Центр</div>
          <div>и лаборатория</div>
        </div>

        <div
          className={cn(
            "text-[var(--color-text)]/82",
            mobile ? "text-[15px] leading-[1.3]" : "text-[16px] leading-[1.28]",
          )}
        >
          <div>улучшаем рецептуру</div>
          <div>и контролируем качество</div>
        </div>
      </div>
    </div>
  );
}

function FactoryPanel({
  visible,
  mobile = false,
}: {
  visible: boolean;
  mobile?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between bg-[var(--color-accent-2)] text-white",
        mobile
          ? "rounded-[28px] px-6 py-6"
          : "w-[500px] rounded-[32px] px-9 py-7",
      )}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          x: visible ? 0 : 14,
        }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full flex-col justify-between"
      >
        <div
          className={cn(
            "font-heading tracking-[-0.04em]",
            mobile ? "text-[20px] leading-[1]" : "text-[24px] leading-[1]",
          )}
        >
          комплекс на
        </div>

        <div className={cn("flex items-end", mobile ? "gap-3" : "gap-4")}>
          <Factory
            size={mobile ? 38 : 46}
            strokeWidth={2.1}
            className={mobile ? "mb-[6px]" : "mb-[8px]"}
          />

          <div
            className={cn(
              "font-heading tracking-[-0.06em]",
              mobile ? "text-[50px] leading-[0.92]" : "text-[72px] leading-[0.9]",
            )}
          >
            2300 м²
          </div>
        </div>

        <div
          className={cn(
            "text-white/92",
            mobile ? "text-[15px] leading-[1.3]" : "max-w-[360px] text-[17px] leading-[1.24]",
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

function EcoPanel({
  visible,
  mobile = false,
}: {
  visible: boolean;
  mobile?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]",
        mobile
          ? "rounded-[28px] px-6 py-6"
          : "w-[450px] rounded-[32px] px-9 py-7",
      )}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          x: visible ? 0 : 14,
        }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full flex-col justify-between"
      >
        <div
          className={cn(
            "font-heading tracking-[-0.04em]",
            mobile ? "text-[18px] leading-[1]" : "text-[20px] leading-[1]",
          )}
        >
          эко-стандарт
        </div>

        <div className={cn("flex items-end", mobile ? "gap-3" : "gap-4")}>
          <Leaf
            size={mobile ? 38 : 46}
            strokeWidth={2.1}
            className={mobile ? "mb-[6px]" : "mb-[8px]"}
          />

          <div
            className={cn(
              "font-heading tracking-[-0.06em]",
              mobile ? "text-[42px] leading-[0.92]" : "text-[62px] leading-[0.9]",
            )}
          >
            ISO 14001
          </div>
        </div>

        <div
          className={cn(
            "opacity-95",
            mobile ? "text-[15px] leading-[1.3]" : "max-w-[320px] text-[17px] leading-[1.24]",
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
            <RnDCard mobile />
            <FactoryPanel visible mobile />
            <EcoPanel visible mobile />
          </div>
        </div>

        <div
          className="hidden md:block"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div className="flex items-stretch">
              <div className="relative z-30 h-[252px] shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveStage(0)}
                  className="h-full text-left"
                  aria-label="Открыть блок R&D"
                >
                  <RnDCard />
                </button>
              </div>

              <motion.div
                animate={{ width: RIGHT_AREA_WIDTHS[activeStage] }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="-ml-[24px] relative z-10 h-[252px] overflow-hidden"
              >
                <div className="relative h-full w-[926px]">
                  <div className="absolute left-0 top-0 z-10 h-full">
                    <button
                      type="button"
                      onClick={() => setActiveStage(1)}
                      className="h-full text-left"
                      aria-label="Открыть блок производства"
                    >
                      <FactoryPanel visible={activeStage >= 1} />
                    </button>
                  </div>

                  <div className="absolute left-[476px] top-0 z-20 h-full">
                    <button
                      type="button"
                      onClick={() => setActiveStage(2)}
                      className="h-full text-left"
                      aria-label="Открыть блок эко-стандарта"
                    >
                      <EcoPanel visible={activeStage >= 2} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-5 flex items-center justify-end">
              <ProgressBars activeStage={activeStage} onSelect={setActiveStage} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
