const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

export type ProductCategoryId =
  | "paints"
  | "special-paints"
  | "enamels"
  | "varnishes"
  | "protective"
  | "adhesives-glass"
  | "solvents";

export type ProductLineId = "emalyer" | "narodnaya" | "ladya";

export type ProductCharacteristic = {
  label: string;
  value: string;
};

export type ProductCharacteristicsGroup = {
  commercial?: ProductCharacteristic[];
  technical?: ProductCharacteristic[];
  scenario?: ProductCharacteristic[];
};

export type ProductPackagingUnit = "kg" | "l";

export type ProductPackaging = {
  label: string;
  value: number;
  unit: ProductPackagingUnit;
  sortOrder: number;
};

export type ProductImageSet = {
  preview: string;
  detail: string;
  gallery?: string[];
};

export type ProductSeo = {
  title?: string;
  description?: string;
};

export type ProductAdminMeta = {
  isPublished: boolean;
  sortOrder: number;
  updatedAt: string;
  tags?: string[];
};

export type ProductCategory = {
  id: ProductCategoryId;
  title: string;
  shortTitle: string;
};

export type ProductLine = {
  id: ProductLineId;
  title: string;
  shortTitle: string;
  description?: string;
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
  applicationAreas?: string[];
  workTypes?: string[];
  materialTypes?: string[];
  characteristics?: ProductCharacteristicsGroup;
  images?: ProductImageSet;
  seo?: ProductSeo;
  admin: ProductAdminMeta;
  isArchived?: boolean;
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
  {
    id: "paints",
    title: "Краски",
    shortTitle: "краски",
  },
  {
    id: "special-paints",
    title: "Специальные краски",
    shortTitle: "спецкраски",
  },
  {
    id: "enamels",
    title: "Эмали",
    shortTitle: "эмали",
  },
  {
    id: "varnishes",
    title: "Лаки",
    shortTitle: "лаки",
  },
  {
    id: "protective",
    title: "Защитные материалы",
    shortTitle: "защитные",
  },
  {
    id: "adhesives-glass",
    title: "Клей и жидкое стекло",
    shortTitle: "клей и стекло",
  },
  {
    id: "solvents",
    title: "Растворители",
    shortTitle: "растворители",
  },
];

export const productLines: ProductLine[] = [
  {
    id: "emalyer",
    title: "ЭМАЛЬЕР",
    shortTitle: "Эмальер",
    description: "Основная линейка лакокрасочной продукции",
  },
  {
    id: "narodnaya",
    title: "НАРОДНАЯ",
    shortTitle: "Народная",
    description: "Базовая доступная линейка продукции",
  },
  {
    id: "ladya",
    title: "ЛАДЬЯ",
    shortTitle: "Ладья",
    description: "Суб-бренд растворителей",
  },
];

export const products: ProductItem[] = [
  {
    id: "emalyer-paint-walls-ceilings",
    slug: "emalyer-paint-walls-ceilings",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Для стен и потолков",
    subtitle: "краска акриловая",
    description: "Влагостойкая белоснежная краска для внутренних работ.",
    packagings: [
      createPackaging("1,4 кг", 1.4, "kg", 1),
      createPackaging("3 кг", 3, "kg", 2),
      createPackaging("7 кг", 7, "kg", 3),
      createPackaging("14 кг", 14, "kg", 4),
      createPackaging("40 кг", 40, "kg", 5),
    ],
    applicationAreas: ["интерьер", "стены", "потолки"],
    workTypes: ["внутренние работы"],
    materialTypes: ["стены", "потолки", "минеральные поверхности"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Краски" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "1,4 кг / 3 кг / 7 кг / 14 кг / 40 кг" },
      ],
      technical: [
        { label: "Основа", value: "Акриловая" },
        { label: "Тип", value: "Водно-дисперсионная" },
        { label: "Назначение", value: "Для внутренних работ" },
      ],
      scenario: [
        { label: "Подходит для", value: "Стены и потолки" },
        { label: "Тип объекта", value: "Интерьер" },
      ],
    },
    images: {
      preview: `${basePath}/images/sections/catalog/products/product-paint-white-facade.webp`,
      detail: `${basePath}/images/sections/catalog/products/product-paint-white-facade.webp`,
    },
    seo: {
      title:
        "Краска для стен и потолков акриловая купить оптом | Симбирские краски",
      description:
        "Акриловая краска для стен и потолков. Оптовые поставки, фасовки, подбор продукции и коммерческое предложение.",
    },
    admin: {
      isPublished: true,
      sortOrder: 10,
      updatedAt: "2026-03-16",
      tags: ["интерьер", "стены", "потолки", "акриловая"],
    },
  },
  {
    id: "emalyer-paint-facade",
    slug: "emalyer-paint-facade",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Фасадная",
    subtitle: "краска акриловая",
    description: "Белоснежная фасадная краска для наружных работ.",
    packagings: [
      createPackaging("1,4 кг", 1.4, "kg", 1),
      createPackaging("3 кг", 3, "kg", 2),
      createPackaging("7 кг", 7, "kg", 3),
      createPackaging("14 кг", 14, "kg", 4),
      createPackaging("40 кг", 40, "kg", 5),
    ],
    applicationAreas: ["фасад"],
    workTypes: ["наружные работы"],
    materialTypes: ["минеральные поверхности", "фасады"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Краски" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "1,4 кг / 3 кг / 7 кг / 14 кг / 40 кг" },
      ],
      technical: [
        { label: "Основа", value: "Акриловая" },
        { label: "Тип", value: "Фасадная" },
        { label: "Назначение", value: "Для наружных работ" },
      ],
      scenario: [
        { label: "Подходит для", value: "Фасады и наружные поверхности" },
        { label: "Тип основания", value: "Минеральные поверхности" },
      ],
    },
    images: {
      preview: `${basePath}/images/sections/catalog/products/product-paint-white-facade.webp`,
      detail: `${basePath}/images/sections/catalog/products/product-paint-white-facade.webp`,
    },
    seo: {
      title: "Фасадная акриловая краска купить оптом | Симбирские краски",
      description:
        "Фасадная акриловая краска для наружных работ. Оптовые поставки, доступные фасовки и подбор продукции.",
    },
    admin: {
      isPublished: true,
      sortOrder: 20,
      updatedAt: "2026-03-16",
      tags: ["фасад", "наружные работы", "акриловая"],
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
      "Состав 2 в 1 для OSB, SIP, ДСП, ДВП и смежных оснований.",
    packagings: [
      createPackaging("1,4 кг", 1.4, "kg", 1),
      createPackaging("3 кг", 3, "kg", 2),
      createPackaging("7 кг", 7, "kg", 3),
    ],
    applicationAreas: ["osb", "sip", "дсп", "двп"],
    workTypes: ["внутренние работы", "наружные работы"],
    materialTypes: ["osb", "sip", "дсп", "двп", "дерево"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Специальные краски" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "1,4 кг / 3 кг / 7 кг" },
      ],
      technical: [
        { label: "Тип", value: "Краска-грунт 2 в 1" },
        { label: "Назначение", value: "OSB / SIP / ДСП / ДВП" },
      ],
      scenario: [
        { label: "Подходит для", value: "Плитные и древесные основания" },
      ],
    },
    images: {
      preview: `${basePath}/images/sections/catalog/products/product-primer-deep.webp`,
      detail: `${basePath}/images/sections/catalog/products/product-primer-deep.webp`,
    },
    seo: {
      title: "Краска-грунт 2 в 1 по OSB купить оптом | Симбирские краски",
      description:
        "Краска-грунт 2 в 1 для OSB, SIP, ДСП и ДВП. Оптовые поставки и подбор продукции под задачу.",
    },
    admin: {
      isPublished: true,
      sortOrder: 30,
      updatedAt: "2026-03-16",
      tags: ["osb", "sip", "дсп", "двп", "грунт"],
    },
  },
  {
    id: "emalyer-enamel-radiator-white",
    slug: "emalyer-radiator-white",
    categoryId: "enamels",
    lineId: "emalyer",
    title: "Для радиаторов",
    subtitle: "эмаль белоснежная",
    description: "Эмаль для окраски радиаторов и нагревающихся поверхностей.",
    packagings: [
      createPackaging("0,4 кг", 0.4, "kg", 1),
      createPackaging("0,9 кг", 0.9, "kg", 2),
    ],
    applicationAreas: ["радиаторы"],
    workTypes: ["внутренние работы"],
    materialTypes: ["металл", "радиаторы"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Эмали" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "0,4 кг / 0,9 кг" },
      ],
      technical: [
        { label: "Назначение", value: "Для радиаторов" },
        { label: "Тип поверхности", value: "Металл" },
      ],
      scenario: [
        {
          label: "Подходит для",
          value: "Радиаторы и нагревающиеся поверхности",
        },
      ],
    },
    images: {
      preview: `${basePath}/images/sections/catalog/products/product-enamel-matte-base-a.webp`,
      detail: `${basePath}/images/sections/catalog/products/product-enamel-matte-base-a.webp`,
    },
    seo: {
      title: "Эмаль для радиаторов купить оптом | Симбирские краски",
      description:
        "Белоснежная эмаль для радиаторов и нагревающихся поверхностей. Доступные фасовки и оптовые поставки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 40,
      updatedAt: "2026-03-16",
      tags: ["радиаторы", "эмаль", "металл"],
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
    applicationAreas: ["бани и сауны"],
    workTypes: ["внутренние работы"],
    materialTypes: ["дерево"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Лаки" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "0,9 кг / 2,2 кг" },
      ],
      technical: [
        { label: "Финиш", value: "Матовый" },
        { label: "Назначение", value: "Для бань и саун" },
        { label: "Основа", value: "Водно-дисперсионная" },
      ],
      scenario: [
        {
          label: "Подходит для",
          value: "Деревянные поверхности внутри влажных помещений",
        },
      ],
    },
    images: {
      preview: `${basePath}/images/sections/catalog/products/product-lacquer-gloss.webp`,
      detail: `${basePath}/images/sections/catalog/products/product-lacquer-gloss.webp`,
    },
    seo: {
      title: "Лак для бань и саун матовый купить оптом | Симбирские краски",
      description:
        "Матовый лак для бань и саун, для деревянных поверхностей. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 50,
      updatedAt: "2026-03-16",
      tags: ["лак", "бани и сауны", "дерево", "матовый"],
    },
  },
  {
    id: "emalyer-antiseptic-universal",
    slug: "emalyer-antiseptic-universal",
    categoryId: "protective",
    lineId: "emalyer",
    title: "Антисептик универсальный",
    subtitle: "защитный состав",
    description: "Универсальный антисептик для обработки древесины.",
    packagings: [
      createPackaging("5 кг", 5, "kg", 1),
      createPackaging("20 кг", 20, "kg", 2),
    ],
    applicationAreas: ["защита древесины"],
    workTypes: ["внутренние работы", "наружные работы"],
    materialTypes: ["дерево"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Защитные материалы" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "5 кг / 20 кг" },
      ],
      technical: [
        { label: "Тип", value: "Антисептик" },
        { label: "Назначение", value: "Универсальная защита древесины" },
      ],
      scenario: [
        { label: "Подходит для", value: "Обработка деревянных поверхностей" },
      ],
    },
    images: {
      preview: `${basePath}/images/sections/catalog/products/product-antiseptic.webp`,
      detail: `${basePath}/images/sections/catalog/products/product-antiseptic.webp`,
    },
    seo: {
      title:
        "Антисептик универсальный для древесины купить оптом | Симбирские краски",
      description:
        "Универсальный антисептик для защиты древесины. Оптовые поставки, подбор фасовки и коммерческое предложение.",
    },
    admin: {
      isPublished: true,
      sortOrder: 60,
      updatedAt: "2026-03-16",
      tags: ["антисептик", "дерево", "защита древесины"],
    },
  },
  {
    id: "emalyer-liquid-glass",
    slug: "emalyer-liquid-glass",
    categoryId: "adhesives-glass",
    lineId: "emalyer",
    title: "Жидкое стекло",
    subtitle: "силикатный состав",
    description:
      "Жидкое стекло для клеевых, строительных и укрепляющих задач.",
    packagings: [
      createPackaging("1,4 кг", 1.4, "kg", 1),
      createPackaging("4 кг", 4, "kg", 2),
      createPackaging("6 кг", 6, "kg", 3),
      createPackaging("15 кг", 15, "kg", 4),
    ],
    applicationAreas: ["строительные смеси", "укрепление оснований"],
    workTypes: ["внутренние работы", "наружные работы"],
    materialTypes: ["минеральные поверхности"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Клей и жидкое стекло" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "1,4 кг / 4 кг / 6 кг / 15 кг" },
      ],
      technical: [{ label: "Тип", value: "Силикатный состав" }],
      scenario: [
        {
          label: "Подходит для",
          value: "Строительные и укрепляющие задачи",
        },
      ],
    },
    images: {
      preview: `${basePath}/images/sections/catalog/products/product-liquid-glass.webp`,
      detail: `${basePath}/images/sections/catalog/products/product-liquid-glass.webp`,
    },
    seo: {
      title: "Жидкое стекло купить оптом | Симбирские краски",
      description:
        "Жидкое стекло для строительных и укрепляющих задач. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 70,
      updatedAt: "2026-03-16",
      tags: ["жидкое стекло", "силикатный состав", "строительные смеси"],
    },
  },

  /*
    Далее:
    - добавляешь позиции линейки НАРОДНАЯ с lineId: "narodnaya"
    - добавляешь позиции линейки ЛАДЬЯ с lineId: "ladya"
    - для растворителей используешь categoryId: "solvents"
  */
];

export function getProductCategoryById(id: ProductCategoryId) {
  return productCategories.find((item) => item.id === id);
}

export function getProductLineById(id: ProductLineId) {
  return productLines.find((item) => item.id === id);
}

export function getPublishedProducts() {
  return products
    .filter((product) => product.admin.isPublished)
    .sort((a, b) => a.admin.sortOrder - b.admin.sortOrder);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getPublishedProductBySlug(slug: string) {
  return getPublishedProducts().find((product) => product.slug === slug);
}

export function getPublishedProductSlugs() {
  return getPublishedProducts().map((product) => product.slug);
}

export function getProductPreviewImage(product: ProductItem) {
  return product.images?.preview;
}

export function getProductDetailImage(product: ProductItem) {
  return product.images?.detail ?? product.images?.preview;
}

export function getAllApplicationAreas() {
  return Array.from(
    new Set(
      getPublishedProducts().flatMap((product) => product.applicationAreas ?? []),
    ),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export function getAllWorkTypes() {
  return Array.from(
    new Set(getPublishedProducts().flatMap((product) => product.workTypes ?? [])),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export function getAllMaterialTypes() {
  return Array.from(
    new Set(
      getPublishedProducts().flatMap((product) => product.materialTypes ?? []),
    ),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export function getAllPackagings() {
  const map = new Map<string, ProductPackaging>();

  getPublishedProducts().forEach((product) => {
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

export function getFilteredProducts({
  categoryIds,
  lineIds,
  packagings,
  applicationAreas,
  workTypes,
  materialTypes,
  includeArchived,
  search,
  sort = "default",
}: {
  categoryIds?: ProductCategoryId[];
  lineIds?: ProductLineId[];
  packagings?: string[];
  applicationAreas?: string[];
  workTypes?: string[];
  materialTypes?: string[];
  includeArchived?: boolean;
  search?: string;
  sort?: "default" | "name-asc" | "name-desc";
}) {
  const normalizedSearch = search?.trim().toLowerCase() ?? "";

  const filtered = getPublishedProducts().filter((product) => {
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

    const matchesWorkType =
      !workTypes || workTypes.length === 0
        ? true
        : (product.workTypes ?? []).some((item) => workTypes.includes(item));

    const matchesMaterialType =
      !materialTypes || materialTypes.length === 0
        ? true
        : (product.materialTypes ?? []).some((item) =>
            materialTypes.includes(item),
          );

    const matchesArchived = includeArchived ? true : !product.isArchived;

    const haystack = [
      product.title,
      product.subtitle,
      product.description,
      getProductLineById(product.lineId)?.title,
      getProductCategoryById(product.categoryId)?.title,
      ...(product.applicationAreas ?? []),
      ...(product.workTypes ?? []),
      ...(product.materialTypes ?? []),
      ...product.packagings.map((item) => item.label),
      ...[
        ...(product.characteristics?.commercial ?? []),
        ...(product.characteristics?.technical ?? []),
        ...(product.characteristics?.scenario ?? []),
      ].map((item) => `${item.label} ${item.value}`),
      ...(product.admin.tags ?? []),
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
      matchesWorkType &&
      matchesMaterialType &&
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
  const publicProducts = getPublishedProducts();
  const currentProduct = publicProducts.find((item) => item.id === productId);

  if (!currentProduct) return [];

  const scored = publicProducts
    .filter((item) => item.id !== productId)
    .map((item) => {
      let score = 0;

      if (item.categoryId === currentProduct.categoryId) score += 5;
      if (item.lineId === currentProduct.lineId) score += 3;

      const sharedPackagingCount = item.packagings.filter((pack) =>
        currentProduct.packagings.some(
          (currentPack) => currentPack.label === pack.label,
        ),
      ).length;

      const sharedWorkTypeCount = (item.workTypes ?? []).filter((workType) =>
        (currentProduct.workTypes ?? []).includes(workType),
      ).length;

      const sharedMaterialTypeCount = (item.materialTypes ?? []).filter(
        (materialType) =>
          (currentProduct.materialTypes ?? []).includes(materialType),
      ).length;

      score += Math.min(sharedPackagingCount, 2);
      score += Math.min(sharedWorkTypeCount, 2);
      score += Math.min(sharedMaterialTypeCount, 2);

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
