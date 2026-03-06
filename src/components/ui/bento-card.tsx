import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

type BentoCardProps = HTMLAttributes<HTMLDivElement>;

export function BentoCard({ className, ...props }: BentoCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:p-5 xl:p-6",
        className,
      )}
      {...props}
    />
  );
}
