import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[var(--color-accent-1)] px-3 py-2 text-[12px] font-medium uppercase tracking-[0.06em] text-white",
        className,
      )}
      {...props}
    />
  );
}
