import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "accent" | "dark" | "muted" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  accent: "bg-[var(--color-accent-1)] text-white hover:opacity-90",
  dark: "bg-[var(--color-accent-2)] text-white hover:opacity-90",
  muted: "bg-[var(--color-accent-3)] text-white hover:opacity-90",
  ghost: "bg-transparent text-[var(--color-text)] hover:bg-black/5 dark:hover:bg-white/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[14px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-[15px] md:text-[16px]",
};

export function Button({
  className,
  variant = "accent",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-control)] font-medium transition duration-200 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
