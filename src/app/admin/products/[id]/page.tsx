import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductFormV2 } from "@/components/admin/product-form-v2";
import {
  getCatalogAllProducts,
  getCatalogCategories,
  getCatalogLines,
  getCatalogProductById,
} from "@/lib/products/service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return getCatalogAllProducts().map((product) => ({
    id: product.id,
  }));
}

export default async function AdminProductEditPage({ params }: PageProps) {
  const { id } = await params;

  const product = getCatalogProductById(id);
  const categories = getCatalogCategories();
  const lines = getCatalogLines();

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="админ-панель"
        title="Редактирование товара"
        description="Обновление карточки товара, изображений, документации, фасовок и характеристик."
      />

      <ProductFormV2
        mode="edit"
        categories={categories}
        lines={lines}
        initialProduct={product}
      />
    </div>
  );
}
