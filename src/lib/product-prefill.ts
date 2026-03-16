import { getProductBySlug } from "@/lib/content/products";

export function getProductPrefillBySlug(slug: string | null) {
  if (!slug) return null;

  const product = getProductBySlug(slug);
  if (!product) return null;

  const titleParts = [product.title, product.subtitle].filter(Boolean);

  return {
    slug: product.slug,
    title: titleParts.join(" · "),
    shortText: `Интересует товар: ${titleParts.join(" · ")}`,
    extendedText: [
      `Интересует товар: ${titleParts.join(" · ")}`,
      product.packagings.length > 0
        ? `Доступные фасовки: ${product.packagings.map((item) => item.label).join(", ")}`
        : null,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}
