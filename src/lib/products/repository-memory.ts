import type { ProductsRepository } from "@/lib/products/repository";
import {
  productCategories,
  productLines,
  products,
  getPublishedProducts,
} from "@/lib/content/products";

export const memoryProductsRepository: ProductsRepository = {
  async getCategories() {
    return productCategories;
  },

  async getLines() {
    return productLines;
  },

  async getAllProducts() {
    return products;
  },

  async getPublishedProducts() {
    return getPublishedProducts();
  },

  async getProductById(id: string) {
    return products.find((item) => item.id === id) ?? null;
  },

  async getProductBySlug(slug: string) {
    return products.find((item) => item.slug === slug) ?? null;
  },
};
