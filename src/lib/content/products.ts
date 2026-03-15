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
};

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
    title: "Универсальная",
    subtitle: "эмаль матовая база А",
    description: "Базовая матовая эмаль для универсального применения.",
    packagings: ["0,4 кг", "0,9 кг"],
    isArchived: true,
  },
  {
    id: "emalyer-enamel-radiator-white",
    slug: "emalyer-radiator-white",
    categoryId: "enamels",
    lineId: "emalyer",
    title: "Для радиаторов",
    subtitle: "эмаль белоснежная",
    description: "Эмаль для окраски радиаторов и нагревающихся поверхностей.",
    packagings: ["0,4 кг", "0,9 кг"],
    isArchived: true,
  },
  {
    id: "emalyer-enamel-radiator-base-a",
    slug: "emalyer-radiator-base-a",
    categoryId: "enamels",
    lineId: "emalyer",
    title: "Для радиаторов",
    subtitle: "эмаль база А",
    description: "База А для колеровки эмали по радиаторам.",
    packagings: ["0,4 кг", "0,9 кг"],
    isArchived: true,
  },

  {
    id: "emalyer-paint-walls-ceilings",
    slug: "emalyer-paint-walls-ceilings",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Для стен и потолков",
    subtitle: "краска акриловая",
    description: "Влагостойкая белоснежная краска для внутренних работ.",
    packagings: ["1,4 кг", "3 кг", "7 кг", "14 кг", "40 кг"],
  },
  {
    id: "emalyer-paint-washable",
    slug: "emalyer-paint-washable",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Моющаяся",
    subtitle: "краска акриловая",
    description: "Моющаяся белоснежная краска для интерьеров.",
    packagings: ["1,4 кг", "3 кг", "7 кг", "14 кг", "40 кг"],
  },
  {
    id: "emalyer-paint-facade",
    slug: "emalyer-paint-facade",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Фасадная",
    subtitle: "краска акриловая",
    description: "Белоснежная фасадная краска для наружных работ.",
    packagings: ["1,4 кг", "3 кг", "7 кг", "14 кг", "40 кг"],
  },

  {
    id: "narodnaya-paint-interior",
    slug: "narodnaya-paint-interior",
    categoryId: "paints",
    lineId: "narodnaya",
    title: "Интерьерная",
    subtitle: "краска ВД",
    description: "Интерьерная водно-дисперсионная краска для сухих помещений.",
    packagings: ["2,5 кг", "6 кг", "13 кг"],
  },
  {
    id: "narodnaya-paint-ceiling",
    slug: "narodnaya-paint-ceiling",
    categoryId: "paints",
    lineId: "narodnaya",
    title: "Для потолков",
    subtitle: "краска ВД",
    description: "Матовая краска для потолков и верхних панелей стен.",
    packagings: ["2,5 кг", "6 кг", "13 кг"],
  },
  {
    id: "narodnaya-paint-trees",
    slug: "narodnaya-paint-trees",
    categoryId: "paints",
    lineId: "narodnaya",
    title: "Краска для деревьев",
    subtitle: "водно-дисперсионная полиакриловая",
    description: "Состав для защиты садовых деревьев и закрашивания спилов.",
    packagings: ["1,3 кг", "2,8 кг"],
  },
  {
    id: "narodnaya-paint-stoves-fireplaces",
    slug: "narodnaya-paint-stoves-fireplaces",
    categoryId: "paints",
    lineId: "narodnaya",
    title: "Краска для печей и каминов",
    subtitle: "термостойкая",
    description: "Краска для минеральных нагревающихся поверхностей.",
    packagings: ["0,9 кг", "2,5 кг"],
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
  },

  {
    id: "emalyer-primer-concrete-contact",
    slug: "emalyer-primer-concrete-contact",
    categoryId: "primers",
    lineId: "emalyer",
    title: "Бетонконтакт",
    subtitle: "грунт акриловый",
    description: "Адгезионный грунт для подготовки плотных оснований.",
    packagings: ["3 кг", "6 кг", "12 кг"],
  },
  {
    id: "narodnaya-primer-concrete-contact",
    slug: "narodnaya-primer-concrete-contact",
    categoryId: "primers",
    lineId: "narodnaya",
    title: "Бетонконтакт",
    subtitle: "грунт акриловый",
    description: "Бетонконтакт для подготовки гладких поверхностей.",
    packagings: ["3 кг", "6 кг", "12 кг"],
  },
  {
    id: "narodnaya-primer-deep-penetration",
    slug: "narodnaya-primer-deep-penetration",
    categoryId: "primers",
    lineId: "narodnaya",
    title: "Народная",
    subtitle: "грунт глубокого проникновения",
    description: "Грунтовка для укрепления и подготовки впитывающих оснований.",
    packagings: ["3 кг", "5 кг", "10 кг"],
  },
  {
    id: "baustoffe-primer-deep-penetration",
    slug: "baustoffe-primer-deep-penetration",
    categoryId: "primers",
    lineId: "baustoffe",
    title: "BauStoffe",
    subtitle: "грунт глубокого проникновения",
    description: "Архивная грунтовка глубокого проникновения.",
    packagings: ["1 кг", "5 кг", "10 кг"],
    isArchived: true,
  },
  {
    id: "emalyer-primer-deep-penetration",
    slug: "emalyer-primer-deep-penetration",
    categoryId: "primers",
    lineId: "emalyer",
    title: "Эмальер",
    subtitle: "грунт глубокого проникновения",
    description: "Архивная грунтовка глубокого проникновения.",
    packagings: ["1 кг", "5 кг", "10 кг"],
    isArchived: true,
  },
  {
    id: "narodnaya-primer-deep-penetration-archived",
    slug: "narodnaya-primer-deep-penetration-archived",
    categoryId: "primers",
    lineId: "narodnaya",
    title: "Народная",
    subtitle: "грунт глубокого проникновения",
    description: "Архивная версия грунтовки глубокого проникновения.",
    packagings: ["3 кг", "5 кг", "10 кг"],
    isArchived: true,
  },

  {
    id: "emalyer-varnish-gloss",
    slug: "emalyer-varnish-gloss",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "Глянцевый",
    subtitle: "лак универсальный",
    description: "Архивный универсальный акриловый лак с глянцевым финишем.",
    packagings: ["0,3 кг", "2,2 кг", "10 кг"],
    isArchived: true,
  },
  {
    id: "emalyer-varnish-matte",
    slug: "emalyer-varnish-matte",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "Матовый",
    subtitle: "лак универсальный",
    description: "Архивный универсальный акриловый лак с матовым финишем.",
    packagings: ["0,5 кг", "2,5 кг", "10 кг"],
    isArchived: true,
  },
  {
    id: "emalyer-varnish-sauna-matte",
    slug: "emalyer-varnish-sauna-matte",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "Лак для бань и саун",
    subtitle: "матовый",
    description: "Влагостойкий защитный лак для деревянных поверхностей внутри бань и саун.",
    packagings: ["0,9 кг", "2,2 кг"],
  },
  {
    id: "emalyer-varnish-sauna-gloss",
    slug: "emalyer-varnish-sauna-gloss",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "Лак для бань и саун",
    subtitle: "глянцевый",
    description: "Глянцевый защитный лак для деревянных поверхностей внутри бань и саун.",
    packagings: ["0,9 кг", "2,2 кг"],
  },

  {
    id: "emalyer-pva-universal",
    slug: "emalyer-pva-universal",
    categoryId: "adhesives-glass",
    lineId: "emalyer",
    title: "Универсальный",
    subtitle: "клей ПВА",
    description: "Универсальный ПВА для бытовых и строительных задач.",
    packagings: ["1 кг", "2,5 кг", "10 кг"],
  },
  {
    id: "emalyer-pva-construction",
    slug: "emalyer-pva-construction",
    categoryId: "adhesives-glass",
    lineId: "emalyer",
    title: "Строительный",
    subtitle: "клей ПВА",
    description: "Строительный ПВА для ремонтных и отделочных работ.",
    packagings: ["1 кг", "2,5 кг", "10 кг"],
  },
  {
    id: "emalyer-liquid-glass",
    slug: "emalyer-liquid-glass",
    categoryId: "adhesives-glass",
    lineId: "emalyer",
    title: "Жидкое стекло",
    subtitle: "силикатный состав",
    description: "Жидкое стекло для клеевых, строительных и укрепляющих задач.",
    packagings: ["1,4 кг", "4 кг", "6 кг", "15 кг"],
  },

  {
    id: "emalyer-antiseptic",
    slug: "emalyer-antiseptic",
    categoryId: "protective",
    lineId: "emalyer",
    title: "Антисептик",
    subtitle: "защитный состав",
    description: "Состав для защиты древесины от биопоражений.",
    packagings: ["5 кг", "10 кг"],
  },
  {
    id: "emalyer-antiseptic-universal",
    slug: "emalyer-antiseptic-universal",
    categoryId: "protective",
    lineId: "emalyer",
    title: "Антисептик универсальный",
    subtitle: "защитный состав",
    description: "Универсальный антисептик для обработки древесины.",
    packagings: ["5 кг", "20 кг"],
  },
  {
    id: "emalyer-antizhuk",
    slug: "emalyer-antizhuk",
    categoryId: "protective",
    lineId: "emalyer",
    title: "Антижук",
    subtitle: "состав для древесины",
    description: "Защитный состав против насекомых-вредителей древесины.",
    packagings: ["5 кг", "10 кг"],
  },

  {
    id: "emalyer-antifreeze-additive",
    slug: "emalyer-antifreeze-additive",
    categoryId: "special-products",
    lineId: "emalyer",
    title: "Противоморозная добавка",
    subtitle: "для бетонных смесей",
    description: "Добавка для работы с растворами и смесями при пониженных температурах.",
    packagings: ["5 кг", "10 кг"],
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
  },
];

export function getProductCategoryById(id: ProductCategoryId) {
  return productCategories.find((category) => category.id === id);
}

export function getProductLineById(id: ProductLineId) {
  return productLines.find((line) => line.id === id);
}

export function getProductsByCategory(categoryId: ProductCategoryId) {
  return products.filter((product) => product.categoryId === categoryId);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getVisibleProducts() {
  return products;
}

export function getArchivedProducts() {
  return products.filter((product) => product.isArchived);
}

export function getActiveProducts() {
  return products.filter((product) => !product.isArchived);
}
