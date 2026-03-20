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
import { memoryProductsRepository } from "@/lib/products/repository-memory";

const repository = memoryProductsRepository;

export function getCatalogCategories() {
  return repository.getCategories();
}

export function getCatalogLines() {
  return repository.getLines();
}

export function getCatalogAllProducts() {
  return repository.getAllProducts();
}

export function getCatalogPublishedProducts() {
  const items = repository.getPublishedProducts();
  return [...items].sort((a, b) => a.admin.sortOrder - b.admin.sortOrder);
}

export function getCatalogProductById(id: string) {
  return repository.getProductById(id);
}

export function getCatalogProductBySlug(slug: string) {
  return repository.getProductBySlug(slug);
}

export function getCatalogPublishedProductBySlug(slug: string) {
  const items = getCatalogPublishedProducts();
  return items.find((item) => item.slug === slug) ?? null;
}

export function getCatalogPublishedProductSlugs() {
  const items = getCatalogPublishedProducts();
  return items.map((item) => item.slug);
}

export function getCatalogAllPackagings() {
  const map = new Map<string, ProductPackaging>();
  const items = getCatalogPublishedProducts();

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

export function getCatalogAllWorkTypes() {
  const items = getCatalogPublishedProducts();

  return Array.from(
    new Set(items.flatMap((product) => product.workTypes ?? [])),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export function getCatalogAllMaterialTypes() {
  const items = getCatalogPublishedProducts();

  return Array.from(
    new Set(items.flatMap((product) => product.materialTypes ?? [])),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export function getCatalogAllApplicationAreas() {
  const items = getCatalogPublishedProducts();

  return Array.from(
    new Set(items.flatMap((product) => product.applicationAreas ?? [])),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export function getCatalogFilteredProducts({
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
}) {
  const normalizedSearch = search?.trim().toLowerCase() ?? "";
  const items = getCatalogPublishedProducts();

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

export function getCatalogRelatedProducts(
  productId: string,
  options?: {
    limit?: number;
  },
) {
  const limit = options?.limit ?? 3;
  const publicProducts = getCatalogPublishedProducts();
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
