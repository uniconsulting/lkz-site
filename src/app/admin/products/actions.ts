"use server";

import { revalidatePath } from "next/cache";
import type {
  ProductCharacteristic,
  ProductItem,
  ProductPackaging,
  ProductPackagingUnit,
} from "@/lib/content/products";
import {
  createCatalogProduct,
  getCatalogProductById,
  updateCatalogProduct,
} from "@/lib/products/service";

type CharacteristicRow = {
  label: string;
  value: string;
};

type PackagingRow = {
  label: string;
  value: string;
  unit: ProductPackagingUnit;
  sortOrder: string;
};

type DocumentRow = {
  title: string;
  kind: string;
  fileName?: string;
};

export type ProductFormPayload = {
  id?: string;
  title: string;
  subtitle: string;
  slug: string;
  categoryId: ProductItem["categoryId"];
  lineId: ProductItem["lineId"];
  description: string;
  sortOrder: string;
  isPublished: boolean;
  applicationAreas: string[];
  packagings: PackagingRow[];
  documents: DocumentRow[];
  commercialCharacteristics: CharacteristicRow[];
  technicalCharacteristics: CharacteristicRow[];
  previewImageUrl?: string;
  detailImageUrl?: string;
};

function normalizeCharacteristics(
  items: CharacteristicRow[],
): ProductCharacteristic[] {
  return items
    .map((item) => ({
      label: item.label.trim(),
      value: item.value.trim(),
    }))
    .filter((item) => item.label && item.value);
}

function normalizePackagings(items: PackagingRow[]): ProductPackaging[] {
  return items
    .map((item) => ({
      label: item.label.trim(),
      value: Number(item.value),
      unit: item.unit,
      sortOrder: Number(item.sortOrder),
    }))
    .filter(
      (item) =>
        item.label &&
        Number.isFinite(item.value) &&
        Number.isFinite(item.sortOrder),
    );
}

function buildTagsFromDocuments(documents: DocumentRow[]) {
  return documents
    .map((item) => item.kind.trim().toLowerCase())
    .filter(Boolean);
}

function buildProductFromPayload(
  payload: ProductFormPayload,
  existing?: ProductItem,
): ProductItem {
  const commercial = normalizeCharacteristics(payload.commercialCharacteristics);
  const technical = normalizeCharacteristics(payload.technicalCharacteristics);
  const packagings = normalizePackagings(payload.packagings);
  const applicationAreas = payload.applicationAreas
    .map((item) => item.trim())
    .filter(Boolean);

  const documentTags = buildTagsFromDocuments(payload.documents);

  return {
    id: existing?.id ?? payload.id ?? crypto.randomUUID(),
    slug: payload.slug.trim(),
    categoryId: payload.categoryId,
    lineId: payload.lineId,
    title: payload.title.trim(),
    subtitle: payload.subtitle.trim() || undefined,
    description: payload.description.trim(),
    packagings,
    applicationAreas,
    characteristics: {
      commercial,
      technical,
      scenario: existing?.characteristics?.scenario ?? [],
    },
    images: {
      preview: payload.previewImageUrl || existing?.images?.preview || "",
      detail:
        payload.detailImageUrl ||
        existing?.images?.detail ||
        payload.previewImageUrl ||
        existing?.images?.preview ||
        "",
      gallery: existing?.images?.gallery ?? [],
    },
    seo: existing?.seo ?? {
      title: `${payload.title.trim()} | Продукция | Симбирские краски`,
      description: payload.description.trim(),
    },
    admin: {
      isPublished: payload.isPublished,
      sortOrder: Number(payload.sortOrder) || 100,
      updatedAt: new Date().toISOString().slice(0, 10),
      tags: Array.from(new Set([...(existing?.admin.tags ?? []), ...documentTags])),
    },
    isArchived: existing?.isArchived ?? false,
    workTypes: existing?.workTypes ?? [],
    materialTypes: existing?.materialTypes ?? [],
  };
}

export async function createProductAction(payload: ProductFormPayload) {
  const product = buildProductFromPayload(payload);
  createCatalogProduct(product);

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateProductAction(
  id: string,
  payload: ProductFormPayload,
) {
  const existing = getCatalogProductById(id);

  if (!existing) {
    throw new Error("Product not found");
  }

  const updated = buildProductFromPayload(payload, existing);
  updateCatalogProduct(id, updated);

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/products");
  revalidatePath(`/products/${updated.slug}`);
}
