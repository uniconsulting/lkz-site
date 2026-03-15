import type { Metadata } from "next";
import { ContactsPage } from "@/components/sections/contacts-page";

export const metadata: Metadata = {
  title: "Контакты | Симбирские краски",
  description:
    "Контакты Симбирских красок: телефон, email, адрес, режим работы, реквизиты, карта и форма запроса или отправки коммерческого предложения.",
};

export default function Page() {
  return <ContactsPage />;
}
