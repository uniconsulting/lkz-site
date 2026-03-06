import { typography } from "@/lib/constants/typography";
import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 md:gap-4", className)}>
      {eyebrow ? (
        <span className="text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          {eyebrow}
        </span>
      ) : null}

      <h2 className={cn("font-heading text-[var(--color-text)]", typography.h2)}>
        {title}
      </h2>

      {description ? (
        <p className={cn("max-w-[760px] text-[var(--color-text-muted)]", typography.body)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
