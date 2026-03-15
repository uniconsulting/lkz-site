export type CertificateCategory = "compliance" | "sgr" | "declaration";

export type CertificateCategoryMeta = {
  id: CertificateCategory;
  title: string;
  titleLines: [string, string];
  description: string;
  shortLabel: string;
};

export type CertificateItem = {
  id: string;
  title: string;
  category: CertificateCategory;
  fileUrl: string;
  fileName: string;
  documentNumber?: string;
  issueDate?: string;
  product?: string;
  isPublished: boolean;
};

export type CertificateArchiveItem = {
  category: CertificateCategory;
  title: string;
  archiveUrl: string;
  fileName: string;
  isPublished: boolean;
};

export const certificatesHero = {
  eyebrow: "сертификаты",
  title: "Сертификаты и документы",
  description: [
    "архив PDF-документов по продукции: сертификаты соответствия, СГР и декларации",
  ],
  cta: "перейти к документам",
};

export const certificateCategories: CertificateCategoryMeta[] = [
  {
    id: "compliance",
    shortLabel: "сертификаты",
    title: "сертификаты соответствия",
    titleLines: ["сертификаты", "соответствия"],
    description: "подтверждающие документы по отдельным позициям продукции",
  },
  {
    id: "sgr",
    shortLabel: "СГР",
    title: "СГР",
    titleLines: ["СГР", " "],
    description:
      "свидетельства о государственной регистрации по релевантным категориям",
  },
  {
    id: "declaration",
    shortLabel: "декларации",
    title: "декларации",
    titleLines: ["декларации", " "],
    description:
      "архив деклараций по продукции для скачивания по отдельности или пакетом",
  },
];

export const certificateArchives: CertificateArchiveItem[] = [
  {
    category: "compliance",
    title: "архив сертификатов соответствия",
    archiveUrl: "",
    fileName: "certificates-compliance.zip",
    isPublished: false,
  },
  {
    category: "sgr",
    title: "архив СГР",
    archiveUrl: "",
    fileName: "certificates-sgr.zip",
    isPublished: false,
  },
  {
    category: "declaration",
    title: "архив деклараций",
    archiveUrl: "",
    fileName: "certificates-declarations.zip",
    isPublished: false,
  },
];

export const certificateDocuments: CertificateItem[] = [
  // {
  //   id: "compliance-01",
  //   title: "Сертификат соответствия на интерьерную краску",
  //   category: "compliance",
  //   fileUrl: "/files/certificates/compliance/interior-paint.pdf",
  //   fileName: "interior-paint-certificate.pdf",
  //   documentNumber: "RU C-RU.AB12.B.12345/26",
  //   issueDate: "2026-03-10",
  //   product: "Интерьерная краска",
  //   isPublished: true,
  // },
];

export const certificatesEmptyState = {
  title: "документов пока нет",
  description:
    "Если нужный документ требуется уже сейчас, свяжитесь с менеджером",
  cta: "связаться с менеджером",
};

export function getCertificateCategoryMeta(category: CertificateCategory) {
  return certificateCategories.find((item) => item.id === category);
}

export function getCertificateArchive(category: CertificateCategory) {
  return certificateArchives.find((item) => item.category === category);
}

export function getCertificateDocumentsByCategory(category: CertificateCategory) {
  return certificateDocuments.filter(
    (item) => item.category === category && item.isPublished,
  );
}

export function getPublishedCertificateDocuments() {
  return certificateDocuments.filter((item) => item.isPublished);
}

export function getCertificateCount(category: CertificateCategory) {
  return getCertificateDocumentsByCategory(category).length;
}

export function getCertificateCountLabel(count: number) {
  if (count === 0) return "0 документов";
  if (count === 1) return "1 документ";
  if (count >= 2 && count <= 4) return `${count} документа`;
  return `${count} документов`;
}

export function getFilteredCertificateDocuments(
  filter: CertificateCategory | "all",
) {
  if (filter === "all") {
    return getPublishedCertificateDocuments();
  }

  return getCertificateDocumentsByCategory(filter);
}

export function hasPublishedArchive(category: CertificateCategory) {
  return Boolean(getCertificateArchive(category)?.isPublished);
}
