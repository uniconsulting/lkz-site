"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { Factory, FlaskConical, Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

// Ширина стартовой карточки №1
const LEFT_CARD_WIDTH = 300;

// Глубина наложения карточек
const CARD_OVERLAP = 64;

// Ширина карточки №2
const FACTORY_CARD_WIDTH = 660;

// Начало области карточки №2 за карточкой №1
const RIGHT_AREA_LEFT = LEFT_CARD_WIDTH - CARD_OVERLAP;

// Начало карточки №3 за карточкой №2
const ECO_CARD_LEFT = FACTORY_CARD_WIDTH - CARD_OVERLAP;

// Отступ sticky-сцены от верха viewport
const STICKY_TOP_PX = 96;

function ProgressBars({ activeStage }: { activeStage: number }) {
  return (
    <div className="flex items-center justify-end gap-2">
      {[0, 1, 2].map((stage) => (
        <span
          key={stage}
          className={cn(
            "rounded-full transition-all duration-300",
            activeStage === stage
              ? "h-[4px] w-10 bg-[var(--color-accent-1)]"
              : "h-[4px] w-6 bg-[var(--color-accent-3)]/45",
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
        "flex h-full flex-col justify-between border-[6px] border-[var(--color-accent-2)] bg-[var(--color-bg)]",
        mobile
          ? "rounded-[28px] px-6 py-6"
          : "w-[300px] rounded-[32px] px-8 py-7",
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
            mobile
              ? "text-[18px] leading-[1.08]"
              : "relative -top-[2px] text-[20px] leading-[1.06]",
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

function FactoryPanel({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between bg-[var(--color-accent-2)] text-white",
        mobile
          ? "rounded-[28px] px-6 py-6"
          : "w-[660px] rounded-[32px] px-16 py-7",
      )}
    >
      <div className="flex h-full flex-col justify-between pl-8">
        <div
          className={cn(
            "font-heading tracking-[-0.04em]",
            mobile ? "text-[18px] leading-[1]" : "text-[20px] leading-[1]",
          )}
        >
          комплекс на
        </div>

        <div className={cn("flex items-center", mobile ? "gap-3" : "gap-5")}>
          <Factory
            size={mobile ? 38 : 44}
            strokeWidth={2.1}
            className="shrink-0"
          />

          <div
            className={cn(
              "font-heading whitespace-nowrap tracking-[-0.06em]",
              mobile ? "text-[42px] leading-none" : "text-[56px] leading-none",
            )}
          >
            2300 м²
          </div>
        </div>

        <div
          className={cn(
            "text-white/92",
            mobile ? "text-[15px] leading-[1.3]" : "max-w-[560px] text-[17px] leading-[1.24]",
          )}
        >
          <div>современный заводской комплекс,</div>
          <div>оснащённый автоматизированными</div>
          <div>линиями последнего поколения</div>
        </div>
      </div>
    </div>
  );
}

function EcoPanel({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]",
        mobile
          ? "rounded-[28px] px-6 py-6"
          : "w-full rounded-[32px] px-14 py-7",
      )}
    >
      <div className="flex h-full flex-col justify-between pl-8">
        <div
          className={cn(
            "font-heading tracking-[-0.04em]",
            mobile ? "text-[18px] leading-[1]" : "text-[20px] leading-[1]",
          )}
        >
          эко-стандарт
        </div>

        <div className={cn("flex items-center", mobile ? "gap-3" : "gap-5")}>
          <Leaf
            size={mobile ? 38 : 44}
            strokeWidth={2.1}
            className="shrink-0"
          />

          <div
            className={cn(
              "font-heading whitespace-nowrap tracking-[-0.06em]",
              mobile ? "text-[42px] leading-none" : "text-[56px] leading-none",
            )}
          >
            ИСО 14001
          </div>
        </div>

        <div
          className={cn(
            "opacity-95",
            mobile ? "text-[15px] leading-[1.3]" : "max-w-[460px] text-[17px] leading-[1.24]",
          )}
        >
          <div>соблюдаем стандарты эко-норм</div>
          <div>безопасность для человека</div>
          <div>и окружающей среды</div>
        </div>
      </div>
    </div>
  );
}

export function CatalogTeaser() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: [`start ${STICKY_TOP_PX}px`, `end ${STICKY_TOP_PX}px`],
  });

  // Строгая последовательность:
  // 0.00 - 0.50 раскрывается только №2
  // 0.50 - 1.00 раскрывается только №3
  const factoryReveal = useTransform(scrollYProgress, [0, 0.5], [0, 1], {
    clamp: true,
  });

  const ecoReveal = useTransform(scrollYProgress, [0.5, 1], [0, 1], {
    clamp: true,
  });

  // По умолчанию скрываем чуть больше 100%, чтобы не было видно фрагмент №2
  const factoryClip = useTransform(
    factoryReveal,
    (v) => `inset(0 ${100.5 - v * 100.5}% 0 0 round 32px)`,
  );

  const ecoClip = useTransform(
    ecoReveal,
    (v) => `inset(0 ${100.5 - v * 100.5}% 0 0 round 32px)`,
  );

  const factoryX = useTransform(factoryReveal, [0, 1], [20, 0]);
  const ecoX = useTransform(ecoReveal, [0, 1], [20, 0]);

  const factoryOpacity = useTransform(factoryReveal, [0, 0.04, 1], [0, 0, 1]);
  const ecoOpacity = useTransform(ecoReveal, [0, 0.04, 1], [0, 0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.02) {
      setActiveStage(0);
    } else if (latest < 0.5) {
      setActiveStage(1);
    } else {
      setActiveStage(2);
    }
  });

  return (
    <Section className="pt-0 xl:pt-0">
      <Container>
        <div className="xl:hidden">
          <div className="flex flex-col gap-3">
            <RnDCard mobile />
            <FactoryPanel mobile />
            <EcoPanel mobile />
          </div>
        </div>

        {/* Сцена длиннее, чтобы весь первичный scroll уходил в reveal карточек */}
        <div ref={sceneRef} className="hidden xl:block h-[1500px]">
          <div className="sticky top-24">
            <div className="mb-5 flex items-center justify-end">
              <ProgressBars activeStage={activeStage} />
            </div>

            <div className="relative h-[252px] w-full">
              <div className="absolute left-0 top-0 z-30 h-full">
                <RnDCard />
              </div>

              <div
                className="absolute top-0 z-10 h-full"
                style={{
                  left: `${RIGHT_AREA_LEFT}px`,
                  right: 0,
                }}
              >
                <motion.div
                  className="absolute left-0 top-0 z-20 h-full w-[660px]"
                  style={{
                    clipPath: factoryClip,
                    x: factoryX,
                    opacity: factoryOpacity,
                  }}
                >
                  <FactoryPanel />
                </motion.div>

                <motion.div
                  className="absolute top-0 z-10 h-full"
                  style={{
                    left: `${ECO_CARD_LEFT}px`,
                    right: 0,
                    clipPath: ecoClip,
                    x: ecoX,
                    opacity: ecoOpacity,
                  }}
                >
                  <EcoPanel />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
