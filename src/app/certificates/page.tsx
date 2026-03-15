import type { Metadata } from "next";
import { CertificatesPage } from "@/components/sections/certificates-page";

export const metadata: Metadata = {
  title: "Сертификаты | Симбирские краски",
  description:
    "Архив PDF-документов по продукции: сертификаты соответствия, СГР и декларации. Скачивание отдельных файлов и архивов по категориям.",
};

export default function Page() {
  return <CertificatesPage />;
}
