import type {
  ProductCategory,
  ProductItem,
  ProductLine,
} from "@/lib/content/products";
import type { ProductsRepository } from "@/lib/products/repository";
import {
  productCategories,
  productLines,
  products as initialProducts,
} from "@/lib/content/products";

let productsStore: ProductItem[] = [...initialProducts];

export const memoryProductsRepository: ProductsRepository = {
  getCategories(): ProductCategory[] {
    return productCategories;
  },

  getLines(): ProductLine[] {
    return productLines;
  },

  async getAllProducts(): Promise<ProductItem[]> {
    return [...productsStore];
  },

  async getPublishedProducts(): Promise<ProductItem[]> {
    return productsStore
      .filter((product) => product.admin.isPublished)
      .sort((a, b) => a.admin.sortOrder - b.admin.sortOrder);
  },

  async getProductById(id: string): Promise<ProductItem | null> {
    return productsStore.find((item) => item.id === id) ?? null;
  },

  async getProductBySlug(slug: string): Promise<ProductItem | null> {
    return productsStore.find((item) => item.slug === slug) ?? null;
  },

  async createProduct(product: ProductItem): Promise<ProductItem> {
    productsStore = [...productsStore, product];
    return product;
  },

  async updateProduct(id: string, updates: ProductItem): Promise<ProductItem | null> {
    let updated: ProductItem | null = null;

    productsStore = productsStore.map((item) => {
      if (item.id !== id) return item;
      updated = updates;
      return updates;
    });

    return updated;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const before = productsStore.length;
    productsStore = productsStore.filter((item) => item.id !== id);
    return productsStore.length < before;
  },
};
