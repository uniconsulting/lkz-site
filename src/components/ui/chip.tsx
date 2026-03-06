import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

type ChipProps = HTMLAttributes<HTMLSpanElement>;

export function Chip({ className, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-chip)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[13px] text-[var(--color-text)]",
        className,
      )}
      {...props}
    />
  );
}
