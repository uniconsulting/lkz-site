import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/sections/product-detail-page";
import {
  getCatalogPublishedProductBySlug,
  getCatalogPublishedProductSlugs,
} from "@/lib/products/service";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getCatalogPublishedProductSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getCatalogPublishedProductBySlug(slug);

  if (!product) {
    return {
      title: "Товар не найден | Симбирские краски",
      description: "Запрашиваемая карточка товара не найдена.",
    };
  }

  return {
    title:
      product.seo?.title ??
      `${product.title} | Продукция | Симбирские краски`,
    description: product.seo?.description ?? product.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = getCatalogPublishedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
