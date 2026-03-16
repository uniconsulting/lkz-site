export type ProductCategoryId =
  | "enamels"
  | "paints"
  | "special-paints"
  | "primers"
  | "varnishes"
  | "adhesives-glass"
  | "protective"
  | "special-products";

export type ProductLineId =
  | "emalyer"
  | "narodnaya"
  | "baustoffe"
  | "unbranded";

export type ProductCategory = {
  id: ProductCategoryId;
  title: string;
  shortTitle: string;
  description: string;
  order: number;
};

export type ProductLine = {
  id: ProductLineId;
  title: string;
};

export type ProductCharacteristic = {
  label: string;
  value: string;
};

export type ProductItem = {
  id: string;
  slug: string;
  categoryId: ProductCategoryId;
  lineId: ProductLineId;
  title: string;
  subtitle?: string;
  description: string;
  packagings: string[];
  image?: string;
  isArchived?: boolean;
  characteristics?: ProductCharacteristic[];
};

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

export const productCategories: ProductCategory[] = [
  {
    id: "enamels",
    title: "Эмали",
    shortTitle: "Эмали",
    description: "Архивные эмали и специализированные эмалевые позиции",
    order: 1,
  },
  {
    id: "paints",
    title: "Краски",
    shortTitle: "Краски",
    description: "Интерьерные, фасадные и специальные акриловые краски",
    order: 2,
  },
  {
    id: "special-paints",
    title: "Специальные краски",
    shortTitle: "Спецкраски",
    description: "Краски-грунты и износостойкие специальные составы",
    order: 3,
  },
  {
    id: "primers",
    title: "Грунтовки",
    shortTitle: "Грунтовки",
    description: "Бетонконтакт и грунты глубокого проникновения",
    order: 4,
  },
  {
    id: "varnishes",
    title: "Лаки",
    shortTitle: "Лаки",
    description: "Универсальные и специальные водно-дисперсионные лаки",
    order: 5,
  },
  {
    id: "adhesives-glass",
    title: "Клей и жидкое стекло",
    shortTitle: "Клей и стекло",
    description: "Клеевые составы и жидкое стекло",
    order: 6,
  },
  {
    id: "protective",
    title: "Защитные материалы",
    shortTitle: "Защита",
    description: "Антисептики и составы для защиты древесины",
    order: 7,
  },
  {
    id: "special-products",
    title: "Специальные позиции",
    shortTitle: "Спецпозиции",
    description: "Дополнительные продукты каталога",
    order: 8,
  },
];

export const productLines: ProductLine[] = [
  { id: "emalyer", title: "Эмальер" },
  { id: "narodnaya", title: "Народная" },
  { id: "baustoffe", title: "BauStoffe" },
  { id: "unbranded", title: "Без линейки" },
];

export const products: ProductItem[] = [
  {
    id: "emalyer-enamel-universal-base-a",
    slug: "emalyer-universal-base-a",
    categoryId: "enamels",
    lineId: "emalyer",
    title: "Эмаль матовая база A",
    subtitle: "универсальная",
    description: "Базовая матовая эмаль для универсального применения.",
    packagings: ["0,4 кг", "0,9 кг"],
    image: `${basePath}/images/sections/catalog/products/product-enamel-matte-base-a.webp`,
    isArchived: true,
    characteristics: [
      { label: "Категория", value: "Эмали" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Статус", value: "Архивная позиция" },
    ],
  },
  {
    id: "emalyer-enamel-radiator-white",
    slug: "emalyer-radiator-white",
    categoryId: "enamels",
    lineId: "emalyer",
    title: "Эмаль для радиаторов",
    subtitle: "белоснежная",
    description: "Эмаль для окраски радиаторов и нагревающихся поверхностей.",
    packagings: ["0,4 кг", "0,9 кг"],
    characteristics: [
      { label: "Категория", value: "Эмали" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Для радиаторов" },
    ],
  },
  {
    id: "emalyer-paint-facade",
    slug: "emalyer-paint-facade",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Краска белоснежная",
    subtitle: "фасадная",
    description: "Белоснежная фасадная краска для наружных работ.",
    packagings: ["1,4 кг", "3 кг", "7 кг", "14 кг", "40 кг"],
    image: `${basePath}/images/sections/catalog/products/product-paint-white-facade.webp`,
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Фасадная" },
    ],
  },
  {
    id: "emalyer-paint-walls-ceilings",
    slug: "emalyer-paint-walls-ceilings",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Краска для стен и потолков",
    subtitle: "акриловая",
    description: "Влагостойкая белоснежная краска для внутренних работ.",
    packagings: ["1,4 кг", "3 кг", "7 кг", "14 кг", "40 кг"],
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Для стен и потолков" },
    ],
  },
  {
    id: "emalyer-paint-washable",
    slug: "emalyer-paint-washable",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Краска моющаяся",
    subtitle: "акриловая",
    description: "Моющаяся белоснежная краска для интерьеров.",
    packagings: ["1,4 кг", "3 кг", "7 кг", "14 кг", "40 кг"],
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Моющаяся" },
    ],
  },
  {
    id: "narodnaya-paint-interior",
    slug: "narodnaya-paint-interior",
    categoryId: "paints",
    lineId: "narodnaya",
    title: "Краска интерьерная",
    subtitle: "водно-дисперсионная",
    description: "Интерьерная водно-дисперсионная краска для сухих помещений.",
    packagings: ["2,5 кг", "6 кг", "13 кг"],
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Народная" },
      { label: "Тип", value: "Интерьерная" },
    ],
  },
  {
    id: "emalyer-rubber-paint",
    slug: "emalyer-rubber-paint",
    categoryId: "special-paints",
    lineId: "emalyer",
    title: "Краска резиновая",
    subtitle: "эластичная акриловая",
    description: "Эластичная краска для фасадов, OSB, дерева и минеральных оснований.",
    packagings: ["1,2 кг", "3 кг"],
    characteristics: [
      { label: "Категория", value: "Специальные краски" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Эластичная" },
    ],
  },
  {
    id: "emalyer-paint-primer-osb-2in1",
    slug: "emalyer-paint-primer-osb-2in1",
    categoryId: "special-paints",
    lineId: "emalyer",
    title: "Краска-грунт 2 в 1",
    subtitle: "по OSB",
    description: "Состав 2 в 1 для OSB, SIP, ДСП, ДВП и смежных оснований.",
    packagings: ["1,4 кг", "3 кг", "7 кг"],
    characteristics: [
      { label: "Категория", value: "Специальные краски" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "OSB / SIP / ДСП / ДВП" },
    ],
  },
  {
    id: "emalyer-primer-deep",
    slug: "emalyer-primer-deep",
    categoryId: "primers",
    lineId: "emalyer",
    title: "Грунт глубокого прон.",
    subtitle: "эмальер",
    description: "Грунтовка для укрепления и подготовки впитывающих оснований.",
    packagings: ["1 кг", "5 кг", "10 кг"],
    image: `${basePath}/images/sections/catalog/products/product-primer-deep.webp`,
    characteristics: [
      { label: "Категория", value: "Грунтовки" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Глубокого проникновения" },
    ],
  },
  {
    id: "emalyer-primer-concrete-contact",
    slug: "emalyer-primer-concrete-contact",
    categoryId: "primers",
    lineId: "emalyer",
    title: "Бетонконтакт",
    subtitle: "акриловый",
    description: "Адгезионный грунт для подготовки плотных оснований.",
    packagings: ["3 кг", "6 кг", "12 кг"],
    characteristics: [
      { label: "Категория", value: "Грунтовки" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Бетонконтакт" },
    ],
  },
  {
    id: "emalyer-varnish-gloss",
    slug: "emalyer-varnish-gloss",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "ВД лак глянцевый",
    subtitle: "универсальный",
    description: "Универсальный акриловый лак с глянцевым финишем.",
    packagings: ["0,3 кг", "2,2 кг", "10 кг"],
    image: `${basePath}/images/sections/catalog/products/product-lacquer-gloss.webp`,
    characteristics: [
      { label: "Категория", value: "Лаки" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Финиш", value: "Глянцевый" },
    ],
  },
  {
    id: "emalyer-varnish-matte",
    slug: "emalyer-varnish-matte",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "ВД лак матовый",
    subtitle: "универсальный",
    description: "Универсальный акриловый лак с матовым финишем.",
    packagings: ["0,5 кг", "2,5 кг", "10 кг"],
    characteristics: [
      { label: "Категория", value: "Лаки" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Финиш", value: "Матовый" },
    ],
  },
  {
    id: "emalyer-liquid-glass",
    slug: "emalyer-liquid-glass",
    categoryId: "adhesives-glass",
    lineId: "emalyer",
    title: "Жидкое стекло",
    subtitle: "натриевое",
    description: "Жидкое стекло для клеевых, строительных и укрепляющих задач.",
    packagings: ["1,4 кг", "4 кг", "6 кг", "15 кг"],
    image: `${basePath}/images/sections/catalog/products/product-liquid-glass.webp`,
    characteristics: [
      { label: "Категория", value: "Клей и жидкое стекло" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Натриевое" },
    ],
  },
  {
    id: "emalyer-pva-glue",
    slug: "emalyer-pva-glue",
    categoryId: "adhesives-glass",
    lineId: "emalyer",
    title: "Клей ПВА",
    subtitle: "универсальный",
    description: "Универсальный ПВА для бытовых и строительных задач.",
    packagings: ["1 кг", "2,5 кг", "10 кг"],
    image: `${basePath}/images/sections/catalog/products/product-pva-glue.webp`,
    characteristics: [
      { label: "Категория", value: "Клей и жидкое стекло" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "ПВА" },
    ],
  },
  {
    id: "emalyer-antiseptic",
    slug: "emalyer-antiseptic",
    categoryId: "protective",
    lineId: "emalyer",
    title: "Антисептик",
    subtitle: "универсальный",
    description: "Состав для защиты древесины от биопоражений.",
    packagings: ["5 кг", "10 кг", "20 кг"],
    image: `${basePath}/images/sections/catalog/products/product-antiseptic.webp`,
    characteristics: [
      { label: "Категория", value: "Защитные материалы" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Защита древесины" },
    ],
  },
  {
    id: "emalyer-wood-paint",
    slug: "emalyer-wood-paint",
    categoryId: "protective",
    lineId: "emalyer",
    title: "Краска для дерева",
    subtitle: "универсальная",
    description: "Материал для окрашивания и защиты деревянных поверхностей.",
    packagings: ["0,9 кг", "2,5 кг", "10 кг"],
    image: `${basePath}/images/sections/catalog/products/product-wood-paint.webp`,
    characteristics: [
      { label: "Категория", value: "Защитные материалы" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Для дерева" },
    ],
  },
  {
    id: "emalyer-acrylic-putty",
    slug: "emalyer-acrylic-putty",
    categoryId: "special-products",
    lineId: "emalyer",
    title: "Акриловая шпаклевка",
    subtitle: "для внутренних работ",
    description: "Акриловая шпаклевка для выравнивания и подготовки поверхностей.",
    packagings: ["1,5 кг", "5 кг", "14 кг"],
    characteristics: [
      { label: "Категория", value: "Специальные позиции" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Для внутренних работ" },
    ],
  },
];

export function getProductCategoryById(id: ProductCategoryId) {
  return productCategories.find((category) => category.id === id);
}

export function getProductLineById(id: ProductLineId) {
  return productLines.find((line) => line.id === id);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getAllPackagings() {
  return Array.from(
    new Set(products.flatMap((product) => product.packagings)),
  ).sort((a, b) => a.localeCompare(b, "ru"));
}

export function getFilteredProducts({
  categoryIds,
  lineIds,
  packagings,
  includeArchived,
  search,
  sort = "default",
}: {
  categoryIds?: ProductCategoryId[];
  lineIds?: ProductLineId[];
  packagings?: string[];
  includeArchived?: boolean;
  search?: string;
  sort?: "default" | "name-asc" | "name-desc" | "active-first" | "archived-first";
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
        : product.packagings.some((item) => packagings.includes(item));

    const matchesArchived = includeArchived ? true : !product.isArchived;

    const haystack = [
      product.title,
      product.subtitle,
      product.description,
      getProductLineById(product.lineId)?.title,
      getProductCategoryById(product.categoryId)?.title,
      ...(product.characteristics?.map((item) => `${item.label} ${item.value}`) ?? []),
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
      matchesArchived &&
      matchesSearch
    );
  });

  switch (sort) {
    case "name-asc":
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title, "ru"));
    case "name-desc":
      return [...filtered].sort((a, b) => b.title.localeCompare(a.title, "ru"));
    case "active-first":
      return [...filtered].sort(
        (a, b) => Number(!!a.isArchived) - Number(!!b.isArchived),
      );
    case "archived-first":
      return [...filtered].sort(
        (a, b) => Number(!!b.isArchived) - Number(!!a.isArchived),
      );
    default:
      return filtered;
  }
}
