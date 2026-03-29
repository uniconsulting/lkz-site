import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsPage } from "@/components/sections/products-page";
import {
  getCatalogAllMaterialTypes,
  getCatalogAllPackagings,
  getCatalogAllWorkTypes,
  getCatalogPublishedProducts,
} from "@/lib/products/service";

export const metadata: Metadata = {
  title: "Продукция | Симбирские краски",
  description:
    "Полный каталог лакокрасочной продукции с фильтрацией по категориям, фасовкам, линейкам и отдельными карточками товаров.",
};

export default async function Page() {
  const [initialProducts, allPackagings, allWorkTypes, allMaterialTypes] =
    await Promise.all([
      getCatalogPublishedProducts(),
      getCatalogAllPackagings(),
      getCatalogAllWorkTypes(),
      getCatalogAllMaterialTypes(),
    ]);

  return (
    <Suspense fallback={null}>
      <ProductsPage
        initialProducts={initialProducts}
        allPackagings={allPackagings}
        allWorkTypes={allWorkTypes}
        allMaterialTypes={allMaterialTypes}
      />
    </Suspense>
  );
}
