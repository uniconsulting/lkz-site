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
  applicationAreas?: string[];
  image?: string;
  isArchived?: boolean;
  characteristics?: ProductCharacteristicsGroup;
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

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

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
    applicationAreas: ["внутренние работы", "универсальные покрытия", "металл"],
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
    title: "Для радиаторов",
    subtitle: "эмаль белоснежная",
    description: "Эмаль для окраски радиаторов и нагревающихся поверхностей.",
    packagings: ["0,4 кг", "0,9 кг"],
    applicationAreas: ["радиаторы", "металл", "внутренние работы"],
    isArchived: true,
    characteristics: [
      { label: "Категория", value: "Эмали" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Для радиаторов" },
      { label: "Статус", value: "Архивная позиция" },
    ],
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
    applicationAreas: ["радиаторы", "металл", "внутренние работы"],
    isArchived: true,
    characteristics: [
      { label: "Категория", value: "Эмали" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "База А" },
      { label: "Статус", value: "Архивная позиция" },
    ],
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
    applicationAreas: ["интерьер", "стены", "потолки", "внутренние работы"],
    image: `${basePath}/images/sections/catalog/products/product-paint-white-facade.webp`,
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Для стен и потолков" },
      { label: "Тип", value: "Акриловая" },
    ],
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
    applicationAreas: ["интерьер", "стены", "внутренние работы"],
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Моющаяся" },
      { label: "Основа", value: "Акриловая" },
    ],
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
    applicationAreas: ["фасад", "наружные работы", "минеральные основания"],
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Фасадная" },
      { label: "Основа", value: "Акриловая" },
    ],
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
    applicationAreas: ["интерьер", "стены", "потолки", "внутренние работы"],
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Народная" },
      { label: "Тип", value: "Интерьерная" },
    ],
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
    applicationAreas: ["интерьер", "потолки", "внутренние работы"],
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Народная" },
      { label: "Назначение", value: "Для потолков" },
    ],
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
    applicationAreas: ["дерево", "наружные работы", "садовые работы"],
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Народная" },
      { label: "Назначение", value: "Для деревьев" },
    ],
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
    applicationAreas: ["печи и камины", "минеральные основания", "внутренние работы"],
    characteristics: [
      { label: "Категория", value: "Краски" },
      { label: "Линейка", value: "Народная" },
      { label: "Тип", value: "Термостойкая" },
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
    applicationAreas: ["osb", "sip", "дсп", "двп", "дерево"],
    characteristics: [
      { label: "Категория", value: "Специальные краски" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "OSB / SIP / ДСП / ДВП" },
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
    applicationAreas: ["фасад", "osb", "дерево", "минеральные основания", "наружные работы"],
    characteristics: [
      { label: "Категория", value: "Специальные краски" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Эластичная" },
    ],
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
    applicationAreas: ["минеральные основания", "внутренние работы", "наружные работы"],
    image: `${basePath}/images/sections/catalog/products/product-primer-deep.webp`,
    characteristics: [
      { label: "Категория", value: "Грунтовки" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Бетонконтакт" },
    ],
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
    applicationAreas: ["минеральные основания", "внутренние работы", "наружные работы"],
    characteristics: [
      { label: "Категория", value: "Грунтовки" },
      { label: "Линейка", value: "Народная" },
      { label: "Тип", value: "Бетонконтакт" },
    ],
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
    applicationAreas: ["минеральные основания", "внутренние работы", "наружные работы"],
    characteristics: [
      { label: "Категория", value: "Грунтовки" },
      { label: "Линейка", value: "Народная" },
      { label: "Тип", value: "Глубокого проникновения" },
    ],
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
    applicationAreas: ["минеральные основания", "внутренние работы", "наружные работы"],
    isArchived: true,
    characteristics: [
      { label: "Категория", value: "Грунтовки" },
      { label: "Линейка", value: "BauStoffe" },
      { label: "Тип", value: "Глубокого проникновения" },
      { label: "Статус", value: "Архивная позиция" },
    ],
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
    applicationAreas: ["минеральные основания", "внутренние работы", "наружные работы"],
    isArchived: true,
    characteristics: [
      { label: "Категория", value: "Грунтовки" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Глубокого проникновения" },
      { label: "Статус", value: "Архивная позиция" },
    ],
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
    applicationAreas: ["минеральные основания", "внутренние работы", "наружные работы"],
    isArchived: true,
    characteristics: [
      { label: "Категория", value: "Грунтовки" },
      { label: "Линейка", value: "Народная" },
      { label: "Тип", value: "Глубокого проникновения" },
      { label: "Статус", value: "Архивная позиция" },
    ],
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
    applicationAreas: ["дерево", "внутренние работы", "универсальные покрытия"],
    image: `${basePath}/images/sections/catalog/products/product-lacquer-gloss.webp`,
    isArchived: true,
    characteristics: [
      { label: "Категория", value: "Лаки" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Финиш", value: "Глянцевый" },
      { label: "Статус", value: "Архивная позиция" },
    ],
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
    applicationAreas: ["дерево", "внутренние работы", "универсальные покрытия"],
    isArchived: true,
    characteristics: [
      { label: "Категория", value: "Лаки" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Финиш", value: "Матовый" },
      { label: "Статус", value: "Архивная позиция" },
    ],
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
    applicationAreas: ["бани и сауны", "дерево", "внутренние работы"],
    characteristics: [
      { label: "Категория", value: "Лаки" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Для бань и саун" },
      { label: "Финиш", value: "Матовый" },
    ],
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
    applicationAreas: ["бани и сауны", "дерево", "внутренние работы"],
    characteristics: [
      { label: "Категория", value: "Лаки" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Для бань и саун" },
      { label: "Финиш", value: "Глянцевый" },
    ],
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
    applicationAreas: ["склеивание", "строительные работы", "внутренние работы"],
    image: `${basePath}/images/sections/catalog/products/product-liquid-glass.webp`,
    characteristics: [
      { label: "Категория", value: "Клей и жидкое стекло" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Клей ПВА" },
    ],
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
    applicationAreas: ["склеивание", "строительные работы", "отделочные работы"],
    characteristics: [
      { label: "Категория", value: "Клей и жидкое стекло" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Клей ПВА" },
    ],
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
    applicationAreas: ["строительные смеси", "укрепление оснований", "минеральные основания"],
    characteristics: [
      { label: "Категория", value: "Клей и жидкое стекло" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Тип", value: "Силикатный состав" },
    ],
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
    applicationAreas: ["дерево", "защита древесины", "наружные работы", "внутренние работы"],
    image: `${basePath}/images/sections/catalog/products/product-antiseptic.webp`,
    characteristics: [
      { label: "Категория", value: "Защитные материалы" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Защита древесины" },
    ],
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
    applicationAreas: ["дерево", "защита древесины", "наружные работы", "внутренние работы"],
    characteristics: [
      { label: "Категория", value: "Защитные материалы" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Универсальная защита древесины" },
    ],
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
    applicationAreas: ["дерево", "защита древесины", "наружные работы"],
    characteristics: [
      { label: "Категория", value: "Защитные материалы" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Против насекомых-вредителей" },
    ],
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
    applicationAreas: ["строительные смеси", "бетонные работы", "наружные работы"],
    characteristics: [
      { label: "Категория", value: "Специальные позиции" },
      { label: "Линейка", value: "Эмальер" },
      { label: "Назначение", value: "Для бетонных смесей" },
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
    applicationAreas: ["интерьер", "стены", "внутренние работы", "минеральные основания"],
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

export function getProductsByCategory(categoryId: ProductCategoryId) {
  return products.filter((product) => product.categoryId === categoryId);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getAllPackagings() {
  return Array.from(
    new Set(products.flatMap((product) => product.packagings)),
  ).sort((a, b) => a.localeCompare(b, "ru"));
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

      const sharedPackagingCount = item.packagings.filter((pack) =>
        currentProduct.packagings.includes(pack),
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

export type ProductCharacteristic = {
  label: string;
  value: string;
};

export type ProductCharacteristicsGroup = {
  commercial?: ProductCharacteristic[];
  technical?: ProductCharacteristic[];
  scenario?: ProductCharacteristic[];
};
