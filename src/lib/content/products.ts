import type { ProductCard } from "@/types/catalog";

export const products: ProductCard[] = [
  {
    id: "demo-1",
    slug: "rezinovaya-kraska-demo",
    categorySlug: "vd-kraska",
    name: "Резиновая краска Demo",
    shortDescription: "Демо-карточка под будущую разработку каталога.",
    variants: [
      { id: "demo-1-v1", name: "1,4 кг", packSize: "1,4", packUnit: "кг" },
      { id: "demo-1-v2", name: "3 кг", packSize: "3", packUnit: "кг" },
    ],
  },
];
