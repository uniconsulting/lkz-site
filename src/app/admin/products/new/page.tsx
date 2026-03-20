import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductForm } from "@/components/admin/product-form";
import { getCatalogCategories, getCatalogLines } from "@/lib/products/service";

export default function NewAdminProductPage() {
  const categories = getCatalogCategories();
  const lines = getCatalogLines();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="админ-панель"
        title="Новый товар"
        description="Создание базовой карточки товара для каталога."
      />

      <ProductForm
        mode="create"
        categories={categories}
        lines={lines}
      />
    </div>
  );
}
