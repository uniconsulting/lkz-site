import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactsPage } from "@/components/sections/contacts-page";

export const metadata: Metadata = {
  title: "Контакты | Симбирские краски",
  description:
    "Телефон, почта, адрес, реквизиты и форма запроса коммерческого предложения.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ContactsPage />
    </Suspense>
  );
}
