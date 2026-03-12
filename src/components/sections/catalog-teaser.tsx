"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Factory, FlaskConical, Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

// Ширина стартовой карточки №1
const LEFT_CARD_WIDTH = 290;

// Глубина наложения карточек друг на друга
const CARD_OVERLAP = 64;

// Ширина карточки №2
const FACTORY_CARD_WIDTH = 620;

// Старт зоны карточки №2 за карточкой №1
const RIGHT_AREA_LEFT = LEFT_CARD_WIDTH - CARD_OVERLAP;

// Старт карточки №3 за карточкой №2
const ECO_CARD_LEFT = FACTORY_CARD_WIDTH - CARD_OVERLAP;

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

function FactoryPanel({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between bg-[var(--color-accent-2)] text-white",
        mobile
          ? "rounded-[28px] px-6 py-6"
          : "w-[620px] rounded-[32px] px-24 py-7",
      )}
    >
      <div className="flex h-full flex-col justify-between">
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
            mobile ? "text-[15px] leading-[1.3]" : "max-w-[420px] text-[17px] leading-[1.24]",
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
          : "w-full rounded-[32px] px-24 py-7",
      )}
    >
      <div className="flex h-full flex-col justify-between">
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
            mobile ? "text-[15px] leading-[1.3]" : "max-w-[360px] text-[17px] leading-[1.24]",
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
    offset: ["start 75%", "end 30%"],
  });

  const factoryRevealRaw = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const ecoRevealRaw = useTransform(scrollYProgress, [0.45, 0.95], [0, 1]);

  const factoryReveal = useSpring(factoryRevealRaw, {
    stiffness: 110,
    damping: 24,
    mass: 0.5,
  });

  const ecoReveal = useSpring(ecoRevealRaw, {
    stiffness: 110,
    damping: 24,
    mass: 0.5,
  });

  const factoryClip = useTransform(
    factoryReveal,
    (v) => `inset(0 ${100 - v * 100}% 0 0 round 32px)`,
  );

  const ecoClip = useTransform(
    ecoReveal,
    (v) => `inset(0 ${100 - v * 100}% 0 0 round 32px)`,
  );

  const factoryX = useTransform(factoryReveal, [0, 1], [26, 0]);
  const ecoX = useTransform(ecoReveal, [0, 1], [26, 0]);

  const factoryOpacity = useTransform(factoryReveal, [0, 1], [0.55, 1]);
  const ecoOpacity = useTransform(ecoReveal, [0, 1], [0.55, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.34) {
      setActiveStage(0);
    } else if (latest < 0.76) {
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

        <div ref={sceneRef} className="hidden xl:block h-[720px]">
          <div className="sticky top-28">
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
                  className="absolute left-0 top-0 z-20 h-full w-[620px]"
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
