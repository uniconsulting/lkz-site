import type {
  ProductCategory,
  ProductItem,
  ProductLine,
} from "@/lib/content/products";

export type ProductsRepository = {
  getCategories(): ProductCategory[];
  getLines(): ProductLine[];
  getAllProducts(): ProductItem[];
  getPublishedProducts(): ProductItem[];
  getProductById(id: string): ProductItem | null;
  getProductBySlug(slug: string): ProductItem | null;
};
