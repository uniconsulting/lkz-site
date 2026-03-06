export type Category = {
  slug: string;
  name: string;
  description?: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  packSize: string;
  packUnit: string;
};

export type ProductCard = {
  id: string;
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  variants: ProductVariant[];
};
