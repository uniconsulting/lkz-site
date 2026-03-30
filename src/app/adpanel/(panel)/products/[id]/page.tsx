import { notFound, redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/adpanel/admin-page-header";
import { ProductFormV2 } from "@/components/adpanel/product-form-v2";
import {
  getCatalogCategories,
  getCatalogLines,
  getCatalogProductById,
} from "@/lib/products/service";
import type { ProductFormPayload } from "@/app/adpanel/products/actions";
import { updateProductAction } from "@/app/adpanel/products/actions";

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
    redirect(`/adpanel/products/${id}`);
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
