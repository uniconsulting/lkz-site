import type { ProductsRepository } from "@/lib/products/repository";
import {
  productCategories,
  productLines,
  products,
  getPublishedProducts,
} from "@/lib/content/products";

export const memoryProductsRepository: ProductsRepository = {
  getCategories() {
    return productCategories;
  },

  getLines() {
    return productLines;
  },

  getAllProducts() {
    return products;
  },

  getPublishedProducts() {
    return getPublishedProducts();
  },

  getProductById(id: string) {
    return products.find((item) => item.id === id) ?? null;
  },

  getProductBySlug(slug: string) {
    return products.find((item) => item.slug === slug) ?? null;
  },
};
