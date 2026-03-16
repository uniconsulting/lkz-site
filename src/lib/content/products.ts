const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

export type ProductCategoryId =
  | "enamels"
  | "varnishes"
  | "paints"
  | "special-paints"
  | "protective"
  | "adhesives-glass"
  | "primers";

export type ProductLineId = "emalyer" | "general";

export type ProductPackagingUnit = "kg" | "l";

export type ProductPackaging = {
  label: string;
  value: number;
  unit: ProductPackagingUnit;
  sortOrder: number;
};

export type ProductCharacteristic = {
  label: string;
  value: string;
};

export type ProductCharacteristicsGroup = {
  commercial?: ProductCharacteristic[];
  technical?: ProductCharacteristic[];
  scenario?: ProductCharacteristic[];
};

export type ProductCategory = {
  id: ProductCategoryId;
  title: string;
  shortTitle: string;
};

export type ProductLine = {
  id: ProductLineId;
  title: string;
};

export type ProductItem = {
  id: string;
  slug: string;
  categoryId: ProductCategoryId;
  lineId: ProductLineId;
  title: string;
  subtitle?: string;
  description: string;
  packagings: ProductPackaging[];
  image?: string;
  isArchived?: boolean;
  applicationAreas?: string[];
  characteristics?: ProductCharacteristicsGroup;
};

function createPackaging(
  label: string,
  value: number,
  unit: ProductPackagingUnit,
  sortOrder: number,
): ProductPackaging {
  return {
    label,
    value,
    unit,
    sortOrder,
  };
}

export const productCategories: ProductCategory[] = [
  { id: "enamels", title: "Эмали", shortTitle: "эмали" },
  { id: "varnishes", title: "Лаки", shortTitle: "лаки" },
  { id: "paints", title: "Краски", shortTitle: "краски" },
  { id: "special-paints", title: "Специальные краски", shortTitle: "спецкраски" },
  { id: "protective", title: "Защитные материалы", shortTitle: "защита" },
  { id: "adhesives-glass", title: "Клей и жидкое стекло", shortTitle: "клей и стекло" },
  { id: "primers", title: "Грунты", shortTitle: "грунты" },
];

export const productLines: ProductLine[] = [
  { id: "emalyer", title: "Эмальер" },
  { id: "general", title: "Универсальная линейка" },
];

export const products: ProductItem[] = [
  {
    id: "emalyer-enamel-matte-base-a",
    slug: "emalyer-enamel-matte-base-a",
    categoryId: "enamels",
    lineId: "emalyer",
    title: "Эмаль матовая база A",
    subtitle: "универсальная",
    description:
      "Матовая водно-дисперсионная эмаль для интерьерных и универсальных задач с дальнейшей колеровкой.",
    image: `${basePath}/images/sections/catalog/products/product-enamel-matte-base-a.webp`,
    packagings: [
      createPackaging("0,9 кг", 0.9, "kg", 1),
      createPackaging("2,5 кг", 2.5, "kg", 2),
      createPackaging("12 кг", 12, "kg", 3),
    ],
    applicationAreas: ["интерьер", "внутренние работы", "универсальные поверхности"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Эмали" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "0,9 кг / 2,5 кг / 12 кг" },
      ],
      technical: [
        { label: "Финиш", value: "Матовый" },
        { label: "Основа", value: "Водно-дисперсионная" },
        { label: "База", value: "A" },
      ],
    },
  },
  {
    id: "emalyer-enamel-radiator-white",
    slug: "emalyer-radiator-white",
    categoryId: "enamels",
    lineId: "emalyer",
    title: "Для радиаторов",
    subtitle: "эмаль белоснежная",
    description:
      "Эмаль для окраски радиаторов и нагревающихся металлических поверхностей внутри помещений.",
    packagings: [
      createPackaging("0,4 кг", 0.4, "kg", 1),
      createPackaging("0,9 кг", 0.9, "kg", 2),
    ],
    applicationAreas: ["радиаторы", "металл", "внутренние работы"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Эмали" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "0,4 кг / 0,9 кг" },
      ],
      technical: [
        { label: "Назначение", value: "Для радиаторов" },
        { label: "Цвет", value: "Белоснежный" },
        { label: "Основа", value: "Водно-дисперсионная" },
      ],
    },
  },
  {
    id: "emalyer-paint-walls-ceilings",
    slug: "emalyer-paint-walls-ceilings",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Для стен и потолков",
    subtitle: "краска акриловая",
    description:
      "Влагостойкая белоснежная краска для внутренних работ по стенам и потолкам.",
    image: `${basePath}/images/sections/catalog/products/product-paint-white-facade.webp`,
    packagings: [
      createPackaging("1,4 кг", 1.4, "kg", 1),
      createPackaging("3 кг", 3, "kg", 2),
      createPackaging("7 кг", 7, "kg", 3),
      createPackaging("14 кг", 14, "kg", 4),
      createPackaging("40 кг", 40, "kg", 5),
    ],
    applicationAreas: ["интерьер", "стены", "потолки", "внутренние работы"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Краски" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "1,4 кг / 3 кг / 7 кг / 14 кг / 40 кг" },
      ],
      technical: [
        { label: "Основа", value: "Акриловая" },
        { label: "Тип", value: "Водно-дисперсионная" },
        { label: "Назначение", value: "Для внутренних работ" },
      ],
    },
  },
  {
    id: "emalyer-paint-facade",
    slug: "emalyer-paint-facade",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Фасадная",
    subtitle: "краска акриловая",
    description:
      "Белоснежная фасадная краска для наружных работ по минеральным основаниям.",
    packagings: [
      createPackaging("1,4 кг", 1.4, "kg", 1),
      createPackaging("3 кг", 3, "kg", 2),
      createPackaging("7 кг", 7, "kg", 3),
      createPackaging("14 кг", 14, "kg", 4),
      createPackaging("40 кг", 40, "kg", 5),
    ],
    applicationAreas: ["фасад", "наружные работы", "минеральные основания"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Краски" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "1,4 кг / 3 кг / 7 кг / 14 кг / 40 кг" },
      ],
      technical: [
        { label: "Основа", value: "Акриловая" },
        { label: "Тип", value: "Фасадная" },
        { label: "Назначение", value: "Для наружных работ" },
      ],
    },
  },
  {
    id: "emalyer-wood-paint",
    slug: "emalyer-wood-paint",
    categoryId: "special-paints",
    lineId: "emalyer",
    title: "Краска для дерева",
    subtitle: "универсальная",
    description:
      "Укрывная краска для деревянных оснований с хорошей адгезией и стабильным финишем.",
    image: `${basePath}/images/sections/catalog/products/product-wood-paint.webp`,
    packagings: [
      createPackaging("0,9 кг", 0.9, "kg", 1),
      createPackaging("2,5 кг", 2.5, "kg", 2),
      createPackaging("9 кг", 9, "kg", 3),
    ],
    applicationAreas: ["дерево", "внутренние работы", "наружные работы"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Специальные краски" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "0,9 кг / 2,5 кг / 9 кг" },
      ],
      technical: [
        { label: "Назначение", value: "Для дерева" },
        { label: "Тип", value: "Укрывная" },
        { label: "Основа", value: "Водно-дисперсионная" },
      ],
    },
  },
  {
    id: "emalyer-paint-primer-osb-2in1",
    slug: "emalyer-paint-primer-osb-2in1",
    categoryId: "special-paints",
    lineId: "emalyer",
    title: "Краска-грунт 2 в 1",
    subtitle: "по OSB",
    description:
      "Состав 2 в 1 для OSB, SIP, ДСП, ДВП и смежных оснований с функцией укрепления и окраски.",
    packagings: [
      createPackaging("1,4 кг", 1.4, "kg", 1),
      createPackaging("3 кг", 3, "kg", 2),
      createPackaging("7 кг", 7, "kg", 3),
    ],
    applicationAreas: ["osb", "sip", "дсп", "двп", "дерево"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Специальные краски" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "1,4 кг / 3 кг / 7 кг" },
      ],
      technical: [
        { label: "Формат", value: "2 в 1" },
        { label: "Назначение", value: "OSB / SIP / ДСП / ДВП" },
        { label: "Основа", value: "Водно-дисперсионная" },
      ],
    },
  },
  {
    id: "emalyer-varnish-gloss",
    slug: "emalyer-varnish-gloss",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "ВД лак глянцевый",
    subtitle: "универсальный",
    description:
      "Глянцевый водно-дисперсионный лак для декоративной и защитной отделки поверхностей.",
    image: `${basePath}/images/sections/catalog/products/product-lacquer-gloss.webp`,
    packagings: [
      createPackaging("0,9 кг", 0.9, "kg", 1),
      createPackaging("2,2 кг", 2.2, "kg", 2),
      createPackaging("9 кг", 9, "kg", 3),
    ],
    applicationAreas: ["интерьер", "дерево", "внутренние работы"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Лаки" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "0,9 кг / 2,2 кг / 9 кг" },
      ],
      technical: [
        { label: "Финиш", value: "Глянцевый" },
        { label: "Основа", value: "Водно-дисперсионная" },
        { label: "Назначение", value: "Защитно-декоративное покрытие" },
      ],
    },
  },
  {
    id: "emalyer-varnish-sauna-matte",
    slug: "emalyer-varnish-sauna-matte",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "Лак для бань и саун",
    subtitle: "матовый",
    description:
      "Влагостойкий защитный лак для деревянных поверхностей внутри бань и саун.",
    packagings: [
      createPackaging("0,9 кг", 0.9, "kg", 1),
      createPackaging("2,2 кг", 2.2, "kg", 2),
    ],
    applicationAreas: ["бани и сауны", "дерево", "внутренние работы"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Лаки" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "0,9 кг / 2,2 кг" },
      ],
      technical: [
        { label: "Финиш", value: "Матовый" },
        { label: "Назначение", value: "Для бань и саун" },
        { label: "Основа", value: "Водно-дисперсионная" },
      ],
    },
  },
  {
    id: "emalyer-primer-deep-penetration",
    slug: "emalyer-primer-deep-penetration",
    categoryId: "primers",
    lineId: "emalyer",
    title: "Грунт глубокого проникновения",
    subtitle: "эмальер",
    description:
      "Грунт для подготовки минеральных оснований перед дальнейшей отделкой и окраской.",
    image: `${basePath}/images/sections/catalog/products/product-primer-deep.webp`,
    packagings: [
      createPackaging("1 кг", 1, "kg", 1),
      createPackaging("5 кг", 5, "kg", 2),
      createPackaging("10 кг", 10, "kg", 3),
    ],
    applicationAreas: ["минеральные основания", "внутренние работы", "наружные работы"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Грунты" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "1 кг / 5 кг / 10 кг" },
      ],
      technical: [
        { label: "Тип", value: "Глубокого проникновения" },
        { label: "Назначение", value: "Подготовка основания" },
        { label: "Основа", value: "Водно-дисперсионная" },
      ],
    },
  },
  {
    id: "emalyer-antiseptic-universal",
    slug: "emalyer-antiseptic-universal",
    categoryId: "protective",
    lineId: "emalyer",
    title: "Антисептик универсальный",
    subtitle: "защитный состав",
    description:
      "Универсальный антисептик для обработки древесины и профилактической защиты от внешних факторов.",
    image: `${basePath}/images/sections/catalog/products/product-antiseptic.webp`,
    packagings: [
      createPackaging("5 кг", 5, "kg", 1),
      createPackaging("20 кг", 20, "kg", 2),
    ],
    applicationAreas: ["дерево", "защита древесины", "наружные работы", "внутренние работы"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Защитные материалы" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "5 кг / 20 кг" },
      ],
      technical: [
        { label: "Назначение", value: "Универсальная защита древесины" },
        { label: "Тип", value: "Антисептический состав" },
        { label: "Основа", value: "Водно-дисперсионная" },
      ],
    },
  },
  {
    id: "emalyer-liquid-glass",
    slug: "emalyer-liquid-glass",
    categoryId: "adhesives-glass",
    lineId: "emalyer",
    title: "Жидкое стекло",
    subtitle: "натриевое",
    description:
      "Силикатный состав для строительных, клеевых и укрепляющих задач.",
    image: `${basePath}/images/sections/catalog/products/product-liquid-glass.webp`,
    packagings: [
      createPackaging("1,4 кг", 1.4, "kg", 1),
      createPackaging("4 кг", 4, "kg", 2),
      createPackaging("6 кг", 6, "kg", 3),
      createPackaging("15 кг", 15, "kg", 4),
    ],
    applicationAreas: ["строительные смеси", "укрепление оснований", "минеральные основания"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Клей и жидкое стекло" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "1,4 кг / 4 кг / 6 кг / 15 кг" },
      ],
      technical: [
        { label: "Тип", value: "Силикатный состав" },
        { label: "Основа", value: "Натриевое жидкое стекло" },
        { label: "Назначение", value: "Строительные и укрепляющие задачи" },
      ],
    },
  },
  {
    id: "emalyer-pva-glue",
    slug: "emalyer-pva-glue",
    categoryId: "adhesives-glass",
    lineId: "emalyer",
    title: "Клей ПВА",
    subtitle: "универсальный",
    description:
      "Универсальный ПВА-клей для бытовых, столярных и строительных задач.",
    image: `${basePath}/images/sections/catalog/products/product-pva-glue.webp`,
    packagings: [
      createPackaging("0,9 кг", 0.9, "kg", 1),
      createPackaging("2,5 кг", 2.5, "kg", 2),
      createPackaging("10 кг", 10, "kg", 3),
    ],
    applicationAreas: ["дерево", "внутренние работы", "столярные работы"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Клей и жидкое стекло" },
        { label: "Линейка", value: "Эмальер" },
        { label: "Фасовки", value: "0,9 кг / 2,5 кг / 10 кг" },
      ],
      technical: [
        { label: "Тип", value: "ПВА" },
        { label: "Назначение", value: "Универсальное склеивание" },
        { label: "Основа", value: "Поливинилацетатная" },
      ],
    },
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductCategoryById(id: ProductCategoryId) {
  return productCategories.find((category) => category.id === id);
}

export function getProductLineById(id: ProductLineId) {
  return productLines.find((line) => line.id === id);
}

export function getAllPackagings() {
  const map = new Map<string, ProductPackaging>();

  products.forEach((product) => {
    product.packagings.forEach((packaging) => {
      map.set(packaging.label, packaging);
    });
  });

  return Array.from(map.values())
    .sort((a, b) => {
      if (a.unit !== b.unit) {
        return a.unit.localeCompare(b.unit);
      }

      if (a.value !== b.value) {
        return a.value - b.value;
      }

      return a.sortOrder - b.sortOrder;
    })
    .map((item) => item.label);
}

export function getAllApplicationAreas() {
  return Array.from(
    new Set(products.flatMap((product) => product.applicationAreas ?? [])),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export function getFilteredProducts({
  categoryIds,
  lineIds,
  packagings,
  applicationAreas,
  includeArchived,
  search,
  sort = "default",
}: {
  categoryIds?: ProductCategoryId[];
  lineIds?: ProductLineId[];
  packagings?: string[];
  applicationAreas?: string[];
  includeArchived?: boolean;
  search?: string;
  sort?: "default" | "name-asc" | "name-desc";
}) {
  const normalizedSearch = search?.trim().toLowerCase() ?? "";

  const filtered = products.filter((product) => {
    const matchesCategory =
      !categoryIds || categoryIds.length === 0
        ? true
        : categoryIds.includes(product.categoryId);

    const matchesLine =
      !lineIds || lineIds.length === 0
        ? true
        : lineIds.includes(product.lineId);

    const matchesPackaging =
      !packagings || packagings.length === 0
        ? true
        : product.packagings.some((item) => packagings.includes(item.label));

    const matchesApplicationArea =
      !applicationAreas || applicationAreas.length === 0
        ? true
        : (product.applicationAreas ?? []).some((item) =>
            applicationAreas.includes(item),
          );

    const matchesArchived = includeArchived ? true : !product.isArchived;

    const haystack = [
      product.title,
      product.subtitle,
      product.description,
      getProductLineById(product.lineId)?.title,
      getProductCategoryById(product.categoryId)?.title,
      ...(product.applicationAreas ?? []),
      ...product.packagings.map((item) => item.label),
      ...[
        ...(product.characteristics?.commercial ?? []),
        ...(product.characteristics?.technical ?? []),
        ...(product.characteristics?.scenario ?? []),
      ].map((item) => `${item.label} ${item.value}`),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = normalizedSearch
      ? haystack.includes(normalizedSearch)
      : true;

    return (
      matchesCategory &&
      matchesLine &&
      matchesPackaging &&
      matchesApplicationArea &&
      matchesArchived &&
      matchesSearch
    );
  });

  switch (sort) {
    case "name-asc":
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title, "ru"));
    case "name-desc":
      return [...filtered].sort((a, b) => b.title.localeCompare(a.title, "ru"));
    default:
      return filtered;
  }
}

export function getRelatedProducts(
  productId: string,
  options?: {
    limit?: number;
  },
) {
  const limit = options?.limit ?? 3;
  const currentProduct = products.find((item) => item.id === productId);

  if (!currentProduct) return [];

  const scored = products
    .filter((item) => item.id !== productId)
    .map((item) => {
      let score = 0;

      if (item.categoryId === currentProduct.categoryId) score += 5;
      if (item.lineId === currentProduct.lineId) score += 3;
      if (!!item.isArchived === !!currentProduct.isArchived) score += 1;

      const currentLabels = currentProduct.packagings.map((pack) => pack.label);
      const sharedPackagingCount = item.packagings.filter((pack) =>
        currentLabels.includes(pack.label),
      ).length;

      score += Math.min(sharedPackagingCount, 2);

      return {
        product: item,
        score,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.product.title.localeCompare(b.product.title, "ru");
    });

  return scored.slice(0, limit).map((item) => item.product);
}

export function getProductApplicationAreas(productId: string) {
  const product = products.find((item) => item.id === productId);
  return product?.applicationAreas ?? [];
}

