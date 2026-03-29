import type {
  ProductCategory,
  ProductItem,
  ProductLine,
} from "@/lib/content/products";
import { productCategories, productLines } from "@/lib/content/products";
import { prisma } from "@/lib/prisma";
import type { ProductsRepository } from "./repository";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProductItem(record: any): ProductItem {
  return {
    id: record.id,
    slug: record.slug,
    categoryId: record.categoryId,
    lineId: record.lineId,
    title: record.title,
    subtitle: record.subtitle ?? undefined,
    description: record.description,
    packagings: record.packagings,
    applicationAreas: record.applicationAreas,
    workTypes: record.workTypes,
    materialTypes: record.materialTypes,
    characteristics: record.characteristics,
    images: record.images,
    seo: record.seo,
    isArchived: record.isArchived,
    admin: {
      isPublished: record.isPublished,
      sortOrder: record.sortOrder,
      updatedAt: record.updatedAt,
      tags: record.tags,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toCreateData(data: ProductItem): any {
  return {
    id: data.id,
    slug: data.slug,
    categoryId: data.categoryId,
    lineId: data.lineId,
    title: data.title,
    subtitle: data.subtitle ?? null,
    description: data.description,
    isPublished: data.admin.isPublished,
    isArchived: data.isArchived ?? false,
    sortOrder: data.admin.sortOrder,
    updatedAt: data.admin.updatedAt,
    tags: data.admin.tags ?? [],
    packagings: data.packagings,
    applicationAreas: data.applicationAreas ?? [],
    workTypes: data.workTypes ?? [],
    materialTypes: data.materialTypes ?? [],
    characteristics: data.characteristics ?? {},
    images: data.images ?? {},
    seo: data.seo ?? {},
  };
}

export const prismaProductsRepository: ProductsRepository = {
  getCategories(): ProductCategory[] {
    return productCategories;
  },

  getLines(): ProductLine[] {
    return productLines;
  },

  async getAllProducts(): Promise<ProductItem[]> {
    const records = await prisma.product.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return records.map(toProductItem);
  },

  async getPublishedProducts(): Promise<ProductItem[]> {
    const records = await prisma.product.findMany({
      where: { isPublished: true, isArchived: false },
      orderBy: { sortOrder: "asc" },
    });
    return records.map(toProductItem);
  },

  async getProductById(id: string): Promise<ProductItem | null> {
    const record = await prisma.product.findUnique({ where: { id } });
    return record ? toProductItem(record) : null;
  },

  async getProductBySlug(slug: string): Promise<ProductItem | null> {
    const record = await prisma.product.findUnique({ where: { slug } });
    return record ? toProductItem(record) : null;
  },

  async createProduct(data: ProductItem): Promise<ProductItem> {
    const record = await prisma.product.create({ data: toCreateData(data) });
    return toProductItem(record);
  },

  async updateProduct(
    id: string,
    data: ProductItem,
  ): Promise<ProductItem | null> {
    try {
      const { id: _id, ...updateData } = toCreateData(data);
      const record = await prisma.product.update({
        where: { id },
        data: updateData,
      });
      return toProductItem(record);
    } catch {
      return null;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await prisma.product.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  },
};
