import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductFormV2 } from "@/components/admin/product-form-v2";
import { getCatalogCategories, getCatalogLines } from "@/lib/products/service";

export default function NewAdminProductPage() {
  const categories = getCatalogCategories();
  const lines = getCatalogLines();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="админ-панель"
        title="Новый товар"
        description="Создание карточки товара с изображениями, документацией, фасовками и характеристиками."
      />

      <ProductFormV2 categories={categories} lines={lines} mode="create" />
    </div>
  );
}

