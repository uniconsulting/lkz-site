import { PrismaClient } from "@prisma/client";
import { products } from "../src/lib/content/products";

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${products.length} products...`);

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        slug: product.slug,
        categoryId: product.categoryId,
        lineId: product.lineId,
        title: product.title,
        subtitle: product.subtitle ?? null,
        description: product.description,
        isPublished: product.admin.isPublished,
        isArchived: product.isArchived ?? false,
        sortOrder: product.admin.sortOrder,
        updatedAt: product.admin.updatedAt,
        tags: product.admin.tags ?? [],
        packagings: product.packagings as object[],
        applicationAreas: product.applicationAreas ?? [],
        workTypes: product.workTypes ?? [],
        materialTypes: product.materialTypes ?? [],
        characteristics: (product.characteristics ?? {}) as object,
        images: (product.images ?? {}) as object,
        seo: (product.seo ?? {}) as object,
      },
    });
  }

  console.log("Seeding complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
