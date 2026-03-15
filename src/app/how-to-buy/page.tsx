import type { Metadata } from "next";
import { HowToBuyPage } from "@/components/sections/how-to-buy-page";

export const metadata: Metadata = {
  title: "Как купить | Симбирские краски",
  description:
    "Узнайте, как купить продукцию Симбирских красок: оптовые поставки, дилерский формат, Private Label / СТМ, персональные условия сотрудничества.",
};

export default function Page() {
  return <HowToBuyPage />;
}
