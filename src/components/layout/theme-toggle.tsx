"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
    setIsReady(true);
  }, []);

  function handleToggle() {
    const nextValue = !isDark;
    document.documentElement.classList.toggle("dark", nextValue);
    window.localStorage.setItem("theme", nextValue ? "dark" : "light");
    setIsDark(nextValue);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Сменить тему"
      title="Сменить тему"
      className={cn(
  "interactive-lift-accent inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-[var(--color-bg)] text-[var(--color-text)] transition duration-200",
  !isReady && "opacity-0",
)}
    >
      {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
    </button>
  );
}
