import type { Metadata } from "next";
import { ContactsPage } from "@/components/sections/contacts-page";

export const metadata: Metadata = {
  title: "Контакты | Симбирские краски",
  description:
    "Телефон, почта, адрес, реквизиты и форма запроса коммерческого предложения.",
};

type PageProps = {
  searchParams: Promise<{
    product?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  return <ContactsPage productSlug={params.product ?? null} />;
}
