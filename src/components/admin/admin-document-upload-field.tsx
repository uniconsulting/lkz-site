"use client";

import { useRef, useState } from "react";
import { FileText, Paperclip, Trash2 } from "lucide-react";

export function AdminDocumentUploadField({
  title = "Файл документа",
  description,
  onFileChange,
}: {
  title?: string;
  description?: string;
  onFileChange?: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  function handleOpenFileDialog() {
    inputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;
    setFile(nextFile);
    onFileChange?.(nextFile);
  }

  function handleRemove() {
    setFile(null);
    onFileChange?.(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-[18px] bg-[var(--color-bg)] p-4">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-surface)]">
            <FileText size={16} strokeWidth={2.1} />
          </div>

          <div>
            <div className="text-[14px] font-medium text-[var(--color-text)]">
              {title}
            </div>
            {description ? (
              <div className="mt-1 text-[12px] leading-[1.5] text-[var(--color-text-muted)]">
                {description}
              </div>
            ) : null}

            {file ? (
              <div className="mt-2 inline-flex items-center gap-2 text-[12px] text-[var(--color-text)]">
                <Paperclip size={12} strokeWidth={2.2} />
                <span>{file.name}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenFileDialog}
            className="inline-flex h-10 items-center justify-center rounded-[14px] bg-[var(--color-surface)] px-4 text-[13px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
          >
            {file ? "заменить" : "выбрать файл"}
          </button>

          {file ? (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition duration-300 hover:-translate-y-[1px] hover:text-[var(--color-text)]"
              aria-label="Удалить файл"
            >
              <Trash2 size={14} strokeWidth={2.2} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
