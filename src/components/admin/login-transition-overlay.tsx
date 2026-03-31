"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useLoginTransition } from "@/lib/login-transition-context";

export function LoginTransitionOverlay() {
  const { isTransitioning, endTransition } = useLoginTransition();
  const [blurPhase, setBlurPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (!isTransitioning) return;

    // Блюр нарастает 1000мс до пика, затем стартуют панели (900мс)
    // После ухода панелей блюр гаснет 700мс → итого 2600мс
    const t1 = setTimeout(() => setBlurPhase("out"), 1900);
    const t2 = setTimeout(() => endTransition(), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isTransitioning, endTransition]);

  useEffect(() => {
    if (!isTransitioning) setBlurPhase("in");
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  // easeInOutQuart — медленный старт, ускорение в середине, мягкое торможение у края
  const slideEase = [0.76, 0, 0.24, 1] as const;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Левая панель — уходит влево */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full bg-[var(--color-bg)] lg:w-[480px]"
        initial={{ x: 0 }}
        animate={{ x: "-110%" }}
        transition={{ duration: 0.9, delay: 1.0, ease: slideEase }}
      >
        <div className="flex h-full flex-col justify-between px-10 py-10">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-1)]">
              ЛКЗ
            </div>
            <div className="text-[16px] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
              Административная панель
            </div>
          </div>
          <div className="mx-auto w-full max-w-[360px]">
            <h1 className="font-heading text-[38px] leading-[0.94] tracking-[-0.05em] text-[var(--color-text)]">
              Вход
            </h1>
          </div>
          <div className="text-[12px] text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} ЛКЗ. Панель управления
          </div>
        </div>
      </motion.div>

      {/* Правая панель — уходит вправо (только десктоп) */}
      <motion.div
        className="absolute inset-y-0 right-0 hidden overflow-hidden lg:block"
        style={{ left: 480 }}
        initial={{ x: 0 }}
        animate={{ x: "110%" }}
        transition={{ duration: 0.9, delay: 1.0, ease: slideEase }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/sections/partnership/partnership-hero.webp"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <div className="text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--color-accent-1)]">
              Лакокрасочный завод
            </div>
            <div className="mt-2 font-heading text-[28px] leading-[1.1] tracking-[-0.04em] text-white">
              13 лет производим
              <br />
              лакокрасочные материалы
            </div>
          </div>
        </div>
      </motion.div>

      {/* Блюр — появляется за 1с, затем гаснет после ухода панелей */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: blurPhase === "out" ? 0 : 1 }}
        transition={
          blurPhase === "out"
            ? { duration: 0.7, ease: "easeOut" }
            : { duration: 1.0, ease: "easeIn" }
        }
        style={{
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
      />
    </div>
  );
}
