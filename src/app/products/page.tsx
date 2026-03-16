import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsPage } from "@/components/sections/products-page";

export const metadata: Metadata = {
  title: "Продукция | Симбирские краски",
  description:
    "Полный каталог лакокрасочной продукции с фильтрацией по категориям, фасовкам, линейкам и отдельными карточками товаров.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProductsPage />
    </Suspense>
  );
}
