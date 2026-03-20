import type {
  ProductCategory,
  ProductItem,
  ProductLine,
} from "@/lib/content/products";

export type ProductsRepository = {
  getCategories(): Promise<ProductCategory[]>;
  getLines(): Promise<ProductLine[]>;
  getAllProducts(): Promise<ProductItem[]>;
  getPublishedProducts(): Promise<ProductItem[]>;
  getProductById(id: string): Promise<ProductItem | null>;
  getProductBySlug(slug: string): Promise<ProductItem | null>;
};
