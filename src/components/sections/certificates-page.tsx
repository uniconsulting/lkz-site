"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Archive,
  ArrowDownToLine,
  BadgeCheck,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import {
  certificateCategories,
  certificatesEmptyState,
  certificatesHero,
  getCertificateArchive,
  getCertificateCount,
  getCertificateCountLabel,
  getFilteredCertificateDocuments,
  type CertificateCategory,
} from "@/lib/content/certificates";

const sectionMotion = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardMotion = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const categoryIconMap = {
  compliance: BadgeCheck,
  sgr: ShieldCheck,
  declaration: FileText,
} as const;

function CategoryCard({
  category,
  onOpen,
}: {
  category: (typeof certificateCategories)[number];
  onOpen: (category: CertificateCategory) => void;
}) {
  const Icon = categoryIconMap[category.id];
  const count = getCertificateCount(category.id);
  const countLabel = getCertificateCountLabel(count);
  const archive = getCertificateArchive(category.id);

  return (
    <motion.div
      variants={cardMotion}
      className="flex h-full flex-col rounded-[24px] bg-[var(--color-surface)] p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[var(--color-bg)] text-[var(--color-accent-1)]">
          <Icon size={20} strokeWidth={2.1} />
        </div>

        <div className="rounded-[999px] bg-[var(--color-bg)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          {countLabel}
        </div>
      </div>

      <h3 className="mt-5 font-heading text-[24px] leading-[0.96] tracking-[-0.04em] text-[var(--color-text)]">
        <span className="block">{category.titleLines[0]}</span>
        <span className="block">{category.titleLines[1]}</span>
      </h3>

      <p className="mt-4 text-[15px] leading-[1.46] text-[var(--color-text-muted)]">
        {category.description}
      </p>

      <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
        <button
          type="button"
          onClick={() => onOpen(category.id)}
          className="inline-flex h-11 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-5 text-[14px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
        >
          открыть
        </button>

        {archive?.isPublished && archive.archiveUrl ? (
          <a
            href={archive.archiveUrl}
            download={archive.fileName}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[18px] bg-[var(--color-bg)] px-5 text-[14px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
          >
            <Archive size={16} strokeWidth={2.2} />
            <span>скачать архив</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[18px] bg-[var(--color-border)] px-5 text-[14px] font-semibold text-[var(--color-text-muted)]"
          >
            <Archive size={16} strokeWidth={2.2} />
            <span>архив недоступен</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}

function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-[18px] px-5 text-[14px] font-semibold transition duration-300",
        isActive
          ? "bg-[var(--color-accent-1)] text-[var(--color-accent-1-foreground)]"
          : "bg-[var(--color-bg)] text-[var(--color-text)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]",
      )}
    >
      {label}
    </button>
  );
}

function DocumentRow({
  title,
  category,
  documentNumber,
  issueDate,
  product,
  fileUrl,
  fileName,
}: {
  title: string;
  category: string;
  documentNumber?: string;
  issueDate?: string;
  product?: string;
  fileUrl: string;
  fileName: string;
}) {
  return (
    <motion.div
      variants={cardMotion}
      className="rounded-[22px] bg-[var(--color-surface)] p-4 md:p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-[999px] bg-[var(--color-bg)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
              PDF
            </span>

            <span className="inline-flex items-center rounded-[999px] bg-[var(--color-bg)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              {category}
            </span>
          </div>

          <h3 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--color-text)]">
            {title}
          </h3>

          {documentNumber || issueDate || product ? (
            <div className="mt-3 flex flex-col gap-1 text-[14px] leading-[1.42] text-[var(--color-text-muted)]">
              {documentNumber ? <div>номер: {documentNumber}</div> : null}
              {issueDate ? <div>дата: {issueDate}</div> : null}
              {product ? <div>продукция: {product}</div> : null}
            </div>
          ) : null}
        </div>

        <a
          href={fileUrl}
          download={fileName}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[18px] bg-[var(--color-bg)] px-5 text-[14px] font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(43,47,51,0.06)]"
        >
          <ArrowDownToLine size={16} strokeWidth={2.2} />
          <span>скачать</span>
        </a>
      </div>
    </motion.div>
  );
}

export function CertificatesPage() {
  const [activeFilter, setActiveFilter] = useState<CertificateCategory | "all">(
    "all",
  );

  const filteredDocuments = useMemo(
    () => getFilteredCertificateDocuments(activeFilter),
    [activeFilter],
  );

  function handleOpenCategory(category: CertificateCategory) {
    setActiveFilter(category);

    const archiveSection = document.getElementById("certificates-archive");
    if (archiveSection) {
      archiveSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="pt-[92px] pb-2 md:pt-[104px] md:pb-4 xl:pb-6">
      <Section className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="visible"
            className="max-w-[1180px]"
          >
            <div className="mb-5 text-[15px] tracking-[-0.02em] text-[var(--color-text-muted)]">
              главная / {certificatesHero.eyebrow}
            </div>

            <h1 className="font-heading text-[34px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[48px] xl:text-[58px]">
              {certificatesHero.title}
            </h1>

            <p className="mt-5 max-w-[1180px] text-[16px] leading-[1.46] text-[var(--color-text-muted)] md:text-[18px]">
              {certificatesHero.description.join(" ")}
            </p>

            <a
              href="#certificates-archive"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
            >
              {certificatesHero.cta}
            </a>
          </motion.div>
        </Container>
      </Section>

      <Section className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {certificateCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onOpen={handleOpenCategory}
              />
            ))}
          </motion.div>
        </Container>
      </Section>

      <Section id="certificates-archive" className="pt-8 md:pt-10 xl:pt-12">
        <Container>
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="rounded-[32px] bg-[var(--color-surface)] p-4 md:p-6 xl:rounded-[36px] xl:p-8"
          >
            <div className="flex flex-col gap-5">
              <div className="max-w-[760px]">
                <h2 className="font-heading text-[30px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[40px]">
                  Архив документов
                </h2>

                <p className="mt-4 text-[15px] leading-[1.46] text-[var(--color-text-muted)] md:text-[16px]">
                  Выберите категорию и скачайте отдельный PDF-файл или архив по
                  нужному разделу.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <FilterButton
                  label="все"
                  isActive={activeFilter === "all"}
                  onClick={() => setActiveFilter("all")}
                />

                {certificateCategories.map((category) => (
                  <FilterButton
                    key={category.id}
                    label={category.title}
                    isActive={activeFilter === category.id}
                    onClick={() => setActiveFilter(category.id)}
                  />
                ))}
              </div>

              {filteredDocuments.length > 0 ? (
                <div className="grid gap-3">
                  {filteredDocuments.map((document) => {
                    const categoryMeta = certificateCategories.find(
                      (item) => item.id === document.category,
                    );

                    return (
                      <DocumentRow
                        key={document.id}
                        title={document.title}
                        category={categoryMeta?.title ?? document.category}
                        documentNumber={document.documentNumber}
                        issueDate={document.issueDate}
                        product={document.product}
                        fileUrl={document.fileUrl}
                        fileName={document.fileName}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-[24px] bg-[var(--color-bg)] p-5 md:p-6">
                  <div className="inline-flex items-center rounded-[999px] bg-[var(--color-accent-1)]/[0.12] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-1)]">
                    архив пуст
                  </div>

                  <h3 className="mt-5 font-heading text-[28px] leading-[0.96] tracking-[-0.05em] text-[var(--color-text)] md:text-[34px]">
                    {certificatesEmptyState.title}
                  </h3>

                  <p className="mt-4 max-w-[720px] text-[15px] leading-[1.5] text-[var(--color-text-muted)] md:text-[16px]">
                    {certificatesEmptyState.description}
                  </p>

                  <div className="mt-6">
                    <Link
                      href="/#contacts"
                      className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[15px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(30,222,123,0.22)]"
                    >
                      {certificatesEmptyState.cta}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
