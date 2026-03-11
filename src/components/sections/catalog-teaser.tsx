"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Factory, FlaskConical, Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

const AUTO_DELAY = 4200;

// Ширина стартовой карточки R&D
const LEFT_CARD_WIDTH = 290;

// Насколько следующая карточка заходит под предыдущую.
// Увеличили значение, чтобы левые углы №2 и №3 не читались.
const CARD_OVERLAP = 64;

// Ширина тёмной карточки
const FACTORY_CARD_WIDTH = 560;

// Старт правой области: она начинается левее края первой карточки,
// чтобы создать реальный эффект наложения.
const RIGHT_AREA_LEFT = LEFT_CARD_WIDTH - CARD_OVERLAP;

// Старт зелёной карточки: она уходит под тёмную карточку.
const ECO_CARD_LEFT = FACTORY_CARD_WIDTH - CARD_OVERLAP;

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
          : "w-[560px] rounded-[32px] px-24 py-7",
      )}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          x: visible ? 0 : 12,
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
          комплекс на
        </div>

        <div className={cn("flex items-end", mobile ? "gap-3" : "gap-5")}>
          <Factory
            size={mobile ? 38 : 44}
            strokeWidth={2.1}
            className={mobile ? "mb-[6px]" : "mb-[10px] shrink-0"}
          />

          <div
            className={cn(
              "font-heading tracking-[-0.06em]",
              mobile ? "text-[42px] leading-[0.92]" : "text-[56px] leading-[0.9]",
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
          <div>современный заводской комплекс,</div>
          <div>оснащённый автоматизированными</div>
          <div>линиями последнего поколения</div>
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
          : "w-full rounded-[32px] px-24 py-7",
      )}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          x: visible ? 0 : 12,
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

        <div className={cn("flex items-end", mobile ? "gap-3" : "gap-5")}>
          <Leaf
            size={mobile ? 38 : 44}
            strokeWidth={2.1}
            className={mobile ? "mb-[6px]" : "mb-[10px] shrink-0"}
          />

          <div
            className={cn(
              "font-heading tracking-[-0.06em]",
              mobile ? "text-[42px] leading-[0.92]" : "text-[56px] leading-[0.9]",
            )}
          >
            ИСО 14001
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
    <Section className="pt-0 xl:pt-0">
      <Container>
        <div className="xl:hidden">
          <div className="flex flex-col gap-3">
            <RnDCard mobile />
            <FactoryPanel visible mobile />
            <EcoPanel visible mobile />
          </div>
        </div>

        <div
          className="hidden xl:block"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Индикатор положения перенесён в верхний правый угол */}
          <div className="mb-5 flex items-center justify-end">
            <ProgressBars activeStage={activeStage} onSelect={setActiveStage} />
          </div>

          <div className="relative h-[252px] w-full">
            {/* Карточка №1. Самый верхний слой */}
            <div className="absolute left-0 top-0 z-30 h-full">
              <button
                type="button"
                onClick={() => setActiveStage(0)}
                className="h-full text-left"
                aria-label="Открыть блок R&D"
              >
                <RnDCard />
              </button>
            </div>

            {/* Правая раскрываемая область.
                Она начинается ЛЕВЕЕ правого края первой карточки,
                чтобы карточка №2 уходила под №1. */}
            <div
              className="absolute top-0 z-10 h-full"
              style={{
                left: `${RIGHT_AREA_LEFT}px`,
                right: 0,
              }}
            >
              {/* Карточка №2.
                  Reveal делаем через clip-path, а не через width-контейнер,
                  чтобы карточка выезжала уже со скруглёнными углами. */}
              <motion.div
                className="absolute left-0 top-0 z-20 h-full w-[560px]"
                initial={false}
                animate={{
                  clipPath:
                    activeStage >= 1
                      ? "inset(0 0% 0 0 round 32px)"
                      : "inset(0 100% 0 0 round 32px)",
                }}
                transition={{
                  duration: 0.86,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveStage(1)}
                  className="h-full w-full text-left"
                  aria-label="Открыть блок производства"
                >
                  <FactoryPanel visible={activeStage >= 1} />
                </button>
              </motion.div>

              {/* Карточка №3.
                  Её начало ещё левее под №2, а сама карточка длиннее и тянется до правого края. */}
              <motion.div
                className="absolute top-0 z-10 h-full"
                style={{
                  left: `${ECO_CARD_LEFT}px`,
                  right: 0,
                }}
                initial={false}
                animate={{
                  clipPath:
                    activeStage >= 2
                      ? "inset(0 0% 0 0 round 32px)"
                      : "inset(0 100% 0 0 round 32px)",
                }}
                transition={{
                  duration: 0.92,
                  ease: [0.22, 1, 0.36, 1],
                  delay: activeStage >= 2 ? 0.06 : 0,
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveStage(2)}
                  className="h-full w-full text-left"
                  aria-label="Открыть блок эко-стандарта"
                >
                  <EcoPanel visible={activeStage >= 2} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
