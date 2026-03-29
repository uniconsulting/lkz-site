import type {
  ProductCategory,
  ProductItem,
  ProductLine,
} from "@/lib/content/products";

export type ProductsRepository = {
  getCategories(): ProductCategory[];
  getLines(): ProductLine[];
  getAllProducts(): Promise<ProductItem[]>;
  getPublishedProducts(): Promise<ProductItem[]>;
  getProductById(id: string): Promise<ProductItem | null>;
  getProductBySlug(slug: string): Promise<ProductItem | null>;
  createProduct(data: ProductItem): Promise<ProductItem>;
  updateProduct(id: string, data: ProductItem): Promise<ProductItem | null>;
  deleteProduct(id: string): Promise<boolean>;
};
