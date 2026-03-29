import { unlink } from "node:fs/promises";
import { join } from "node:path";
import type {
  ProductCategoryId,
  ProductItem,
  ProductLineId,
  ProductPackaging,
} from "@/lib/content/products";
import {
  getProductCategoryById,
  getProductLineById,
} from "@/lib/content/products";
import { prismaProductsRepository } from "@/lib/products/repository-prisma";

const repository = prismaProductsRepository;

export function getCatalogCategories() {
  return repository.getCategories();
}

export function getCatalogLines() {
  return repository.getLines();
}

export async function getCatalogAllProducts() {
  return repository.getAllProducts();
}

export async function getCatalogPublishedProducts() {
  const items = await repository.getPublishedProducts();
  return [...items].sort((a, b) => a.admin.sortOrder - b.admin.sortOrder);
}

export async function getCatalogProductById(id: string) {
  return repository.getProductById(id);
}

export async function getCatalogProductBySlug(slug: string) {
  return repository.getProductBySlug(slug);
}

export async function getCatalogPublishedProductBySlug(slug: string) {
  const items = await getCatalogPublishedProducts();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getCatalogPublishedProductSlugs() {
  const items = await getCatalogPublishedProducts();
  return items.map((item) => item.slug);
}

export async function getCatalogAllPackagings() {
  const map = new Map<string, ProductPackaging>();
  const items = await getCatalogPublishedProducts();

  items.forEach((product) => {
    product.packagings.forEach((packaging) => {
      map.set(packaging.label, packaging);
    });
  });

  return Array.from(map.values())
    .sort((a, b) => {
      if (a.unit !== b.unit) {
        return a.unit.localeCompare(b.unit);
      }

      if (a.value !== b.value) {
        return a.value - b.value;
      }

      return a.sortOrder - b.sortOrder;
    })
    .map((item) => item.label);
}

export async function getCatalogAllWorkTypes() {
  const items = await getCatalogPublishedProducts();

  return Array.from(
    new Set(items.flatMap((product) => product.workTypes ?? [])),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export async function getCatalogAllMaterialTypes() {
  const items = await getCatalogPublishedProducts();

  return Array.from(
    new Set(items.flatMap((product) => product.materialTypes ?? [])),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export async function getCatalogAllApplicationAreas() {
  const items = await getCatalogPublishedProducts();

  return Array.from(
    new Set(items.flatMap((product) => product.applicationAreas ?? [])),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export function filterProducts(
  items: ProductItem[],
  {
    categoryIds,
    lineIds,
    packagings,
    applicationAreas,
    workTypes,
    materialTypes,
    includeArchived,
    search,
    sort = "default",
  }: {
    categoryIds?: ProductCategoryId[];
    lineIds?: ProductLineId[];
    packagings?: string[];
    applicationAreas?: string[];
    workTypes?: string[];
    materialTypes?: string[];
    includeArchived?: boolean;
    search?: string;
    sort?: "default" | "name-asc" | "name-desc";
  },
): ProductItem[] {
  const normalizedSearch = search?.trim().toLowerCase() ?? "";

  const filtered = items.filter((product) => {
    const matchesCategory =
      !categoryIds || categoryIds.length === 0
        ? true
        : categoryIds.includes(product.categoryId);

    const matchesLine =
      !lineIds || lineIds.length === 0
        ? true
        : lineIds.includes(product.lineId);

    const matchesPackaging =
      !packagings || packagings.length === 0
        ? true
        : product.packagings.some((item) => packagings.includes(item.label));

    const matchesApplicationArea =
      !applicationAreas || applicationAreas.length === 0
        ? true
        : (product.applicationAreas ?? []).some((item) =>
            applicationAreas.includes(item),
          );

    const matchesWorkType =
      !workTypes || workTypes.length === 0
        ? true
        : (product.workTypes ?? []).some((item) => workTypes.includes(item));

    const matchesMaterialType =
      !materialTypes || materialTypes.length === 0
        ? true
        : (product.materialTypes ?? []).some((item) =>
            materialTypes.includes(item),
          );

    const matchesArchived = includeArchived ? true : !product.isArchived;

    const haystack = [
      product.title,
      product.subtitle,
      product.description,
      getProductLineById(product.lineId)?.title,
      getProductCategoryById(product.categoryId)?.title,
      ...(product.applicationAreas ?? []),
      ...(product.workTypes ?? []),
      ...(product.materialTypes ?? []),
      ...product.packagings.map((item) => item.label),
      ...[
        ...(product.characteristics?.commercial ?? []),
        ...(product.characteristics?.technical ?? []),
        ...(product.characteristics?.scenario ?? []),
      ].map((item) => `${item.label} ${item.value}`),
      ...(product.admin.tags ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = normalizedSearch
      ? haystack.includes(normalizedSearch)
      : true;

    return (
      matchesCategory &&
      matchesLine &&
      matchesPackaging &&
      matchesApplicationArea &&
      matchesWorkType &&
      matchesMaterialType &&
      matchesArchived &&
      matchesSearch
    );
  });

  switch (sort) {
    case "name-asc":
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title, "ru"));
    case "name-desc":
      return [...filtered].sort((a, b) => b.title.localeCompare(a.title, "ru"));
    default:
      return filtered;
  }
}

export async function getCatalogFilteredProducts(
  filters: Parameters<typeof filterProducts>[1],
) {
  const items = await getCatalogPublishedProducts();
  return filterProducts(items, filters);
}

export async function getCatalogRelatedProducts(
  productId: string,
  options?: {
    limit?: number;
  },
) {
  const limit = options?.limit ?? 3;
  const publicProducts = await getCatalogPublishedProducts();
  const currentProduct = publicProducts.find((item) => item.id === productId);

  if (!currentProduct) return [];

  const scored = publicProducts
    .filter((item) => item.id !== productId)
    .map((item) => {
      let score = 0;

      if (item.categoryId === currentProduct.categoryId) score += 5;
      if (item.lineId === currentProduct.lineId) score += 3;

      const sharedPackagingCount = item.packagings.filter((pack) =>
        currentProduct.packagings.some(
          (currentPack) => currentPack.label === pack.label,
        ),
      ).length;

      const sharedWorkTypeCount = (item.workTypes ?? []).filter((workType) =>
        (currentProduct.workTypes ?? []).includes(workType),
      ).length;

      const sharedMaterialTypeCount = (item.materialTypes ?? []).filter(
        (materialType) =>
          (currentProduct.materialTypes ?? []).includes(materialType),
      ).length;

      score += Math.min(sharedPackagingCount, 2);
      score += Math.min(sharedWorkTypeCount, 2);
      score += Math.min(sharedMaterialTypeCount, 2);

      return {
        product: item,
        score,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.product.title.localeCompare(b.product.title, "ru");
    });

  return scored.slice(0, limit).map((item) => item.product);
}

export function getCatalogProductPreviewImage(product: ProductItem) {
  return product.images?.preview;
}

export function getCatalogProductDetailImage(product: ProductItem) {
  return product.images?.detail ?? product.images?.preview;
}

export async function createCatalogProduct(product: ProductItem) {
  return repository.createProduct(product);
}

export async function updateCatalogProduct(id: string, product: ProductItem) {
  return repository.updateProduct(id, product);
}

export async function deleteCatalogProduct(id: string): Promise<boolean> {
  const product = await repository.getProductById(id);

  if (product) {
    const uploadsDir =
      process.env.UPLOADS_DIR ?? join(process.cwd(), "public", "uploads");
    const urlPrefix = process.env.UPLOADS_URL_PREFIX ?? "/uploads";

    async function tryDeleteFile(url?: string) {
      if (!url || !url.startsWith(urlPrefix)) return;
      const filename = url.slice(urlPrefix.length).replace(/^\//, "");
      try {
        await unlink(join(uploadsDir, filename));
      } catch {
        // файл уже удалён или не существует
      }
    }

    await tryDeleteFile(product.images?.preview);
    if (product.images?.detail !== product.images?.preview) {
      await tryDeleteFile(product.images?.detail);
    }
  }

  return repository.deleteProduct(id);
}
