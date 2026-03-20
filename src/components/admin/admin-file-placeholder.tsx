"use client";

import { Image as ImageIcon, FileText, Upload } from "lucide-react";

export function AdminFilePlaceholder({
  title,
  description,
  kind = "image",
}: {
  title: string;
  description?: string;
  kind?: "image" | "document";
}) {
  const Icon = kind === "image" ? ImageIcon : FileText;

  return (
    <div className="rounded-[22px] bg-[var(--color-bg)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--color-surface)]">
            <Icon size={18} strokeWidth={2.1} className="text-[var(--color-text)]" />
          </div>

          <div>
            <div className="text-[15px] font-semibold text-[var(--color-text)]">
              {title}
            </div>

            {description ? (
              <div className="mt-1 max-w-[520px] text-[13px] leading-[1.5] text-[var(--color-text-muted)]">
                {description}
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[14px] bg-[var(--color-surface)] px-4 text-[13px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
        >
          <Upload size={14} strokeWidth={2.2} />
          <span>выбрать файл</span>
        </button>
      </div>
    </div>
  );
}

