"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Image as ImageIcon, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type AdminImageUploadFieldProps = {
  title: string;
  description?: string;
  initialImageUrl?: string;
  onFileChange?: (file: File | null) => void;
};

export function AdminImageUploadField({
  title,
  description,
  initialImageUrl,
  onFileChange,
}: AdminImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const previewUrl = useMemo(() => {
    return objectUrl ?? initialImageUrl ?? null;
  }, [initialImageUrl, objectUrl]);

  useEffect(() => {
    if (!file) {
      setObjectUrl(null);
      return;
    }

    const nextObjectUrl = URL.createObjectURL(file);
    setObjectUrl(nextObjectUrl);

    return () => {
      URL.revokeObjectURL(nextObjectUrl);
    };
  }, [file]);

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
    <div className="rounded-[22px] bg-[var(--color-bg)] p-5">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[var(--color-surface)]">
            <ImageIcon
              size={18}
              strokeWidth={2.1}
              className="text-[var(--color-text)]"
            />
          </div>

          <div>
            <div className="text-[15px] font-semibold text-[var(--color-text)]">
              {title}
            </div>

            {description ? (
              <div className="mt-1 whitespace-pre-line text-[13px] leading-[1.5] text-[var(--color-text-muted)]">
                {description}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenFileDialog}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[14px] bg-[var(--color-surface)] px-4 text-[13px] font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px]"
          >
            <Upload size={14} strokeWidth={2.2} />
            <span>{previewUrl ? "заменить" : "выбрать файл"}</span>
          </button>

          {previewUrl ? (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition duration-300 hover:-translate-y-[1px] hover:text-[var(--color-text)]"
              aria-label="Удалить изображение"
            >
              <Trash2 size={14} strokeWidth={2.2} />
            </button>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          "relative overflow-hidden rounded-[20px] border border-[rgba(127,127,127,0.12)] bg-[var(--color-surface)]",
          "h-[280px] md:h-[320px]",
        )}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={title}
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[var(--color-bg)]">
              <ImageIcon
                size={22}
                strokeWidth={2}
                className="text-[var(--color-text-muted)]"
              />
            </div>

            <div className="mt-4 text-[14px] font-medium text-[var(--color-text)]">
              Изображение не выбрано
            </div>

            <div className="mt-2 max-w-[320px] text-[13px] leading-[1.5] text-[var(--color-text-muted)]">
              Поддерживаются PNG, JPG, WEBP, AVIF. После выбора здесь появится
              локальный preview.
            </div>
          </div>
        )}
      </div>

      {file ? (
        <div className="mt-3 text-[12px] text-[var(--color-text-muted)]">
          {file.name}
        </div>
      ) : null}
    </div>
  );
}
