import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductsAdminList } from "@/components/admin/products-admin-list";
import { getCatalogAllProducts } from "@/lib/products/service";

export default async function AdminProductsPage() {
  const products = await getCatalogAllProducts();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="админ-панель"
        title="Каталог товаров"
        description="Управление карточками товаров, статусами публикации и базовыми данными каталога."
      />

      <ProductsAdminList products={products} />
    </div>
  );
}

