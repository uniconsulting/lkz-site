import { notFound, redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductFormV2 } from "@/components/admin/product-form-v2";
import {
  getCatalogCategories,
  getCatalogLines,
  getCatalogProductById,
} from "@/lib/products/service";
import type { ProductFormPayload } from "@/app/admin/products/actions";
import { updateProductAction } from "@/app/admin/products/actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminProductEditPage({ params }: PageProps) {
  const { id } = await params;

  const product = await getCatalogProductById(id);
  const categories = getCatalogCategories();
  const lines = getCatalogLines();

  if (!product) {
    notFound();
  }

  async function handleUpdate(payload: ProductFormPayload) {
    "use server";
    await updateProductAction(id, payload);
    redirect(`/admin/products/${id}`);
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
        onSubmit={handleUpdate}
      />
    </div>
  );
}
