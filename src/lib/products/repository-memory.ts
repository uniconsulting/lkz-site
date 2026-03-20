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

export const memoryProductsRepository: ProductsRepository & {
  createProduct(product: ProductItem): ProductItem;
  updateProduct(id: string, updates: ProductItem): ProductItem | null;
} = {
  getCategories(): ProductCategory[] {
    return productCategories;
  },

  getLines(): ProductLine[] {
    return productLines;
  },

  getAllProducts(): ProductItem[] {
    return [...productsStore];
  },

  getPublishedProducts(): ProductItem[] {
    return productsStore
      .filter((product) => product.admin.isPublished)
      .sort((a, b) => a.admin.sortOrder - b.admin.sortOrder);
  },

  getProductById(id: string): ProductItem | null {
    return productsStore.find((item) => item.id === id) ?? null;
  },

  getProductBySlug(slug: string): ProductItem | null {
    return productsStore.find((item) => item.slug === slug) ?? null;
  },

  createProduct(product: ProductItem): ProductItem {
    productsStore = [...productsStore, product];
    return product;
  },

  updateProduct(id: string, updates: ProductItem): ProductItem | null {
    let updated: ProductItem | null = null;

    productsStore = productsStore.map((item) => {
      if (item.id !== id) return item;
      updated = updates;
      return updates;
    });

    return updated;
  },
};
