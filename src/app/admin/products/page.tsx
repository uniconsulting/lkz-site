import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductsAdminTable } from "@/components/admin/products-admin-table";
import { getCatalogAllProducts } from "@/lib/products/service";

export default function AdminProductsPage() {
  const products = getCatalogAllProducts();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="админ-панель"
        title="Каталог товаров"
        description="Управление товарами, статусами публикации и карточками каталога."
        actions={
          <Link
            href="/admin/products/new"
            className="inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--color-accent-1)] px-5 text-[14px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 hover:-translate-y-[1px]"
          >
            добавить товар
          </Link>
        }
      />

      <ProductsAdminTable products={products} />
    </div>
  );
}
