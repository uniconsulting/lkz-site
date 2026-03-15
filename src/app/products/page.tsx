import type { Metadata } from "next";
import { ProductsPage } from "@/components/sections/products-page";

export const metadata: Metadata = {
  title: "Продукция | Симбирские краски",
  description:
    "Полный каталог лакокрасочной продукции: эмали, краски, грунтовки, лаки, жидкое стекло, защитные материалы и специальные позиции.",
};

export default function Page() {
  return <ProductsPage />;
}
