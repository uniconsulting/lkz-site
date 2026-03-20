import type { ReactNode } from "react";

export function AdminFormSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] bg-[var(--color-surface)] p-5 md:p-6">
      <div className="mb-5">
        {eyebrow ? (
          <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
            {eyebrow}
          </div>
        ) : null}

        <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.04em] text-[var(--color-text)] md:text-[26px]">
          {title}
        </h2>

        {description ? (
          <p className="mt-3 max-w-[860px] text-[14px] leading-[1.52] text-[var(--color-text-muted)] md:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  );
}

