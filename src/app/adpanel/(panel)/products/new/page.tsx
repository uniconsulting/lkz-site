import { redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/adpanel/admin-page-header";
import { ProductFormV2 } from "@/components/adpanel/product-form-v2";
import { getCatalogCategories, getCatalogLines } from "@/lib/products/service";
import type { ProductFormPayload } from "@/app/adpanel/products/actions";
import { createProductAction } from "@/app/adpanel/products/actions";

export default function NewAdminProductPage() {
  const categories = getCatalogCategories();
  const lines = getCatalogLines();

  async function handleCreate(payload: ProductFormPayload) {
    "use server";
    await createProductAction(payload);
    redirect("/adpanel/products");
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="админ-панель"
        title="Новый товар"
        description="Создание карточки товара с изображениями, документацией, фасовками и характеристиками."
      />

      <ProductFormV2
        categories={categories}
        lines={lines}
        mode="create"
        onSubmit={handleCreate}
      />
    </div>
  );
}
