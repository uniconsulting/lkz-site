"use client";

import { useRef, useState } from "react";
import { FileText, Loader2, Trash2, Upload } from "lucide-react";

type AdminDocumentUploadFieldProps = {
  title: string;
  description?: string;
  initialFileUrl?: string;
  onUploadComplete?: (url: string | null) => void;
};

export function AdminFilePlaceholder({
  title,
  description,
  initialFileUrl,
  onUploadComplete,
}: AdminDocumentUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(
    initialFileUrl ?? null,
  );
  const [isUploading, setIsUploading] = useState(false);

  function handleOpenFileDialog() {
    inputRef.current?.click();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload-document", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const url = data.url ?? null;
      setUploadedUrl(url);
      onUploadComplete?.(url);
    } catch {
      setUploadedUrl(null);
      onUploadComplete?.(null);
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemove() {
    setFileName(null);
    setUploadedUrl(null);
    onUploadComplete?.(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const hasFile = Boolean(uploadedUrl);

  return (
    <div className="rounded-[22px] bg-[var(--color-bg)] p-5">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[var(--color-surface)]">
            <FileText
              size={18}
              strokeWidth={2.1}
              className={hasFile ? "text-[var(--color-accent-1)]" : "text-[var(--color-text)]"}
            />
          </div>

          <div className="min-w-0">
            <div className="text-[15px] font-semibold text-[var(--color-text)]">
              {title}
            </div>

            {hasFile ? (
              <div className="mt-1 truncate text-[13px] text-[var(--color-accent-1)]">
                {fileName ?? uploadedUrl}
              </div>
            ) : description ? (
              <div className="mt-1 text-[13px] leading-[1.5] text-[var(--color-text-muted)]">
                {description}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenFileDialog}
            disabled={isUploading}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[14px] bg-[var(--color-surface)] px-4 text-[13px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? (
              <Loader2 size={14} strokeWidth={2.2} className="animate-spin" />
            ) : (
              <Upload size={14} strokeWidth={2.2} />
            )}
            <span>{isUploading ? "загрузка..." : hasFile ? "заменить" : "выбрать файл"}</span>
          </button>

          {hasFile && !isUploading ? (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition duration-300 hover:-translate-y-[1px] hover:text-[var(--color-text)]"
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
