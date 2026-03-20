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

function productImage(fileName: string): ProductImageSet {
  const path = `${basePath}/images/sections/catalog/products/${fileName}`;
  return {
    preview: path,
    detail: path,
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
    description:
      "Влагостойкая белоснежная краска для внутренних работ по стенам и потолкам.",
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
    images: productImage("product-paint-walls-ceilings.webp"),
    seo: {
      title:
        "Краска для стен и потолков акриловая купить оптом | Симбирские краски",
      description:
        "Акриловая краска для стен и потолков. Оптовые поставки, фасовки, подбор продукции и коммерческое предложение.",
    },
    admin: {
      isPublished: true,
      sortOrder: 10,
      updatedAt: "2026-03-20",
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
    images: productImage("product-paint-facade.webp"),
    seo: {
      title: "Фасадная акриловая краска купить оптом | Симбирские краски",
      description:
        "Фасадная акриловая краска для наружных работ. Оптовые поставки, доступные фасовки и подбор продукции.",
    },
    admin: {
      isPublished: true,
      sortOrder: 20,
      updatedAt: "2026-03-20",
      tags: ["фасад", "наружные работы", "акриловая"],
    },
  },
  {
    id: "emalyer-paint-washable-white",
    slug: "emalyer-paint-washable-white",
    categoryId: "paints",
    lineId: "emalyer",
    title: "Моющаяся",
    subtitle: "краска белоснежная",
    description:
      "Моющаяся белоснежная краска для стен и потолков в сухих и влажных помещениях. Образует матовое покрытие, выдерживает влажную уборку.",
    packagings: [
      createPackaging("1,4 кг", 1.4, "kg", 1),
      createPackaging("3 кг", 3, "kg", 2),
      createPackaging("7 кг", 7, "kg", 3),
      createPackaging("14 кг", 14, "kg", 4),
      createPackaging("40 кг", 40, "kg", 5),
    ],
    applicationAreas: ["интерьер", "стены", "потолки", "влажные помещения"],
    workTypes: ["внутренние работы"],
    materialTypes: ["стены", "потолки", "минеральные поверхности", "гкл"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Краски" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "1,4 кг / 3 кг / 7 кг / 14 кг / 40 кг" },
      ],
      technical: [
        { label: "Основа", value: "Стирол-акриловая дисперсия" },
        { label: "Тип", value: "Моющаяся водно-дисперсионная" },
        { label: "Назначение", value: "Для стен и потолков" },
      ],
      scenario: [
        { label: "Подходит для", value: "Кухни, ванные комнаты, жилые помещения" },
        { label: "Особенность", value: "Выдерживает влажную уборку" },
      ],
    },
    images: productImage("product-paint-washable.webp"),
    seo: {
      title: "Моющаяся белоснежная краска Эмальер купить оптом | Симбирские краски",
      description:
        "Моющаяся белоснежная краска Эмальер для стен и потолков. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 25,
      updatedAt: "2026-03-20",
      tags: ["моющаяся", "влажные помещения", "стены", "потолки"],
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
    images: productImage("product-primer-osb-2in1.webp"),
    seo: {
      title: "Краска-грунт 2 в 1 по OSB купить оптом | Симбирские краски",
      description:
        "Краска-грунт 2 в 1 для OSB, SIP, ДСП и ДВП. Оптовые поставки и подбор продукции под задачу.",
    },
    admin: {
      isPublished: true,
      sortOrder: 30,
      updatedAt: "2026-03-20",
      tags: ["osb", "sip", "дсп", "двп", "грунт"],
    },
  },
  {
    id: "emalyer-rubber-paint",
    slug: "emalyer-rubber-paint",
    categoryId: "special-paints",
    lineId: "emalyer",
    title: "Резиновая",
    subtitle: "краска эластичная",
    description:
      "Эластичная резиновая краска для древесины, OSB, минеральных оснований, фасадов, заборов и кровли. Подходит для внутренних и наружных работ.",
    packagings: [
      createPackaging("1,2 кг", 1.2, "kg", 1),
      createPackaging("3 кг", 3, "kg", 2),
    ],
    applicationAreas: ["фасад", "заборы", "кровля", "osb", "дерево"],
    workTypes: ["внутренние работы", "наружные работы"],
    materialTypes: [
      "дерево",
      "osb",
      "минеральные поверхности",
      "металл",
      "гкл",
    ],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Специальные краски" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "1,2 кг / 3 кг" },
      ],
      technical: [
        { label: "Тип", value: "Резиновая краска" },
        { label: "Назначение", value: "Защитно-декоративное покрытие" },
        { label: "Свойство", value: "Высокая эластичность" },
      ],
      scenario: [
        { label: "Подходит для", value: "OSB, фасады, кровля, заборы, дерево" },
        { label: "Особенность", value: "Стойкость к влаге и УФ-излучению" },
      ],
    },
    images: productImage("product-paint-rubber.webp"),
    seo: {
      title: "Резиновая краска Эмальер купить оптом | Симбирские краски",
      description:
        "Эластичная резиновая краска Эмальер для фасадов, древесины, OSB и минеральных оснований.",
    },
    admin: {
      isPublished: true,
      sortOrder: 35,
      updatedAt: "2026-03-20",
      tags: ["резиновая краска", "эластичная", "фасад", "osb", "дерево"],
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
    images: productImage("product-enamel-radiator.webp"),
    seo: {
      title: "Эмаль для радиаторов купить оптом | Симбирские краски",
      description:
        "Белоснежная эмаль для радиаторов и нагревающихся поверхностей. Доступные фасовки и оптовые поставки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 40,
      updatedAt: "2026-03-20",
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
    images: productImage("product-varnish-sauna-matte.webp"),
    seo: {
      title: "Лак для бань и саун матовый купить оптом | Симбирские краски",
      description:
        "Матовый лак для бань и саун, для деревянных поверхностей. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 50,
      updatedAt: "2026-03-20",
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
    images: productImage("product-antiseptic.webp"),
    seo: {
      title:
        "Антисептик универсальный для древесины купить оптом | Симбирские краски",
      description:
        "Универсальный антисептик для защиты древесины. Оптовые поставки, подбор фасовки и коммерческое предложение.",
    },
    admin: {
      isPublished: true,
      sortOrder: 60,
      updatedAt: "2026-03-20",
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
    images: productImage("product-liquid-glass.webp"),
    seo: {
      title: "Жидкое стекло купить оптом | Симбирские краски",
      description:
        "Жидкое стекло для строительных и укрепляющих задач. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 70,
      updatedAt: "2026-03-20",
      tags: ["жидкое стекло", "силикатный состав", "строительные смеси"],
    },
  },
  {
    id: "narodnaya-paint-ceiling",
    slug: "narodnaya-paint-ceiling",
    categoryId: "paints",
    lineId: "narodnaya",
    title: "Для потолков",
    subtitle: "краска водно-дисперсионная",
    description:
      "Матовая водно-дисперсионная краска для потолков и верхних панелей стен в сухих помещениях. Обладает высокой укрывистостью и легко колеруется.",
    packagings: [
      createPackaging("2,5 кг", 2.5, "kg", 1),
      createPackaging("6 кг", 6, "kg", 2),
      createPackaging("13 кг", 13, "kg", 3),
    ],
    applicationAreas: ["потолки", "интерьер"],
    workTypes: ["внутренние работы"],
    materialTypes: ["потолки", "штукатурка", "бетон", "гипсокартон", "пенопласт"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Краски" },
        { label: "Линейка", value: "НАРОДНАЯ" },
        { label: "Фасовки", value: "2,5 кг / 6 кг / 13 кг" },
      ],
      technical: [
        { label: "Тип", value: "Потолочная водно-дисперсионная" },
        { label: "Финиш", value: "Матовый" },
        { label: "Назначение", value: "Для сухих помещений" },
      ],
      scenario: [
        { label: "Подходит для", value: "Потолки и верхние панели стен" },
        { label: "Особенность", value: "Высокая укрывистость" },
      ],
    },
    images: productImage("product-paint-narodnaya-ceiling.webp"),
    seo: {
      title: "Краска Народная для потолков купить оптом | Симбирские краски",
      description:
        "Краска Народная для потолков, матовая водно-дисперсионная. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 80,
      updatedAt: "2026-03-20",
      tags: ["народная", "потолки", "матовая", "интерьер"],
    },
  },
  {
    id: "narodnaya-paint-interior",
    slug: "narodnaya-paint-interior",
    categoryId: "paints",
    lineId: "narodnaya",
    title: "Интерьерная",
    subtitle: "краска водно-дисперсионная",
    description:
      "Интерьерная краска для потолков и верхних панелей стен в сухих помещениях. Матовая, паропроницаемая, легко колеруется.",
    packagings: [
      createPackaging("2,5 кг", 2.5, "kg", 1),
      createPackaging("6 кг", 6, "kg", 2),
      createPackaging("13 кг", 13, "kg", 3),
    ],
    applicationAreas: ["интерьер", "стены", "потолки"],
    workTypes: ["внутренние работы"],
    materialTypes: ["стены", "потолки", "штукатурка", "бетон", "гипсокартон"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Краски" },
        { label: "Линейка", value: "НАРОДНАЯ" },
        { label: "Фасовки", value: "2,5 кг / 6 кг / 13 кг" },
      ],
      technical: [
        { label: "Тип", value: "Интерьерная водно-дисперсионная" },
        { label: "Финиш", value: "Матовый" },
        { label: "Назначение", value: "Для сухих помещений" },
      ],
      scenario: [
        { label: "Подходит для", value: "Интерьерные стены и потолки" },
        { label: "Особенность", value: "Легко колеруется" },
      ],
    },
    images: productImage("product-paint-narodnaya-interior.webp"),
    seo: {
      title: "Интерьерная краска Народная купить оптом | Симбирские краски",
      description:
        "Интерьерная краска Народная для стен и потолков. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 90,
      updatedAt: "2026-03-20",
      tags: ["народная", "интерьерная", "стены", "потолки"],
    },
  },
  {
    id: "narodnaya-paint-garden-trees",
    slug: "narodnaya-paint-garden-trees",
    categoryId: "special-paints",
    lineId: "narodnaya",
    title: "Для садовых деревьев",
    subtitle: "краска полиакриловая",
    description:
      "Краска для стволов плодовых и декоративных деревьев и кустарников. Повышает стойкость к перепадам температур, защищает от солнечных ожогов и вредителей.",
    packagings: [
      createPackaging("1,3 кг", 1.3, "kg", 1),
      createPackaging("2,8 кг", 2.8, "kg", 2),
    ],
    applicationAreas: ["садовые деревья", "кустарники", "стволы деревьев"],
    workTypes: ["наружные работы"],
    materialTypes: ["дерево"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Специальные краски" },
        { label: "Линейка", value: "НАРОДНАЯ" },
        { label: "Фасовки", value: "1,3 кг / 2,8 кг" },
      ],
      technical: [
        { label: "Тип", value: "Полиакриловая краска для садовых деревьев" },
        { label: "Назначение", value: "Защита стволов и спилов" },
        { label: "Срок годности", value: "24 месяца" },
      ],
      scenario: [
        { label: "Подходит для", value: "Плодовые и декоративные деревья" },
        { label: "Особенность", value: "Защита от ожогов, морозобоин и вредителей" },
      ],
    },
    images: productImage("product-paint-garden-trees.webp"),
    seo: {
      title: "Краска Народная для садовых деревьев купить оптом | Симбирские краски",
      description:
        "Краска Народная для садовых деревьев и кустарников. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 100,
      updatedAt: "2026-03-20",
      tags: ["садовые деревья", "народная", "дерево", "наружные работы"],
    },
  },
  {
    id: "narodnaya-paint-stoves-fireplaces",
    slug: "narodnaya-paint-stoves-fireplaces",
    categoryId: "special-paints",
    lineId: "narodnaya",
    title: "Для печей и каминов",
    subtitle: "краска термостойкая",
    description:
      "Термостойкая краска для внешних стенок печей, каминов и дымоходов из минеральных материалов. Образует прочное покрытие и не растрескивается.",
    packagings: [
      createPackaging("0,9 кг", 0.9, "kg", 1),
      createPackaging("2,5 кг", 2.5, "kg", 2),
    ],
    applicationAreas: ["печи", "камины", "дымоходы"],
    workTypes: ["внутренние работы"],
    materialTypes: ["минеральные поверхности"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Специальные краски" },
        { label: "Линейка", value: "НАРОДНАЯ" },
        { label: "Фасовки", value: "0,9 кг / 2,5 кг" },
      ],
      technical: [
        { label: "Тип", value: "Термостойкая акриловая краска" },
        { label: "Назначение", value: "Для печей и каминов" },
        { label: "Класс пожарной опасности", value: "КМ1" },
      ],
      scenario: [
        { label: "Подходит для", value: "Печи, камины, дымоходы" },
        { label: "Особенность", value: "Не содержит органических растворителей" },
      ],
    },
    images: productImage("product-paint-stoves-fireplaces.webp"),
    seo: {
      title: "Краска для печей и каминов Народная купить оптом | Симбирские краски",
      description:
        "Термостойкая краска Народная для печей и каминов. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 110,
      updatedAt: "2026-03-20",
      tags: ["печи", "камины", "термостойкая", "народная"],
    },
  },
  {
    id: "emalyer-varnish-universal-matte",
    slug: "emalyer-varnish-universal-matte",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "Лак универсальный",
    subtitle: "матовый",
    description:
      "Универсальный матовый лак для наружных и внутренних работ. Предназначен для декоративной отделки и защиты деревянных и минеральных поверхностей.",
    packagings: [
      createPackaging("0,9 кг", 0.9, "kg", 1),
      createPackaging("2,2 кг", 2.2, "kg", 2),
      createPackaging("10 кг", 10, "kg", 3),
    ],
    applicationAreas: ["дерево", "кирпич", "бетон", "камень"],
    workTypes: ["внутренние работы", "наружные работы"],
    materialTypes: ["дерево", "кирпич", "бетон", "минеральные поверхности"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Лаки" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "0,9 кг / 2,2 кг / 10 кг" },
      ],
      technical: [
        { label: "Финиш", value: "Матовый" },
        { label: "Назначение", value: "Универсальный лак для наружных и внутренних работ" },
        { label: "Срок годности", value: "24 месяца" },
      ],
      scenario: [
        { label: "Подходит для", value: "Дерево, кирпич, бетон, камень" },
        { label: "Особенность", value: "Декоративная отделка и защита" },
      ],
    },
    images: productImage("product-varnish-universal-matte.webp"),
    seo: {
      title: "Универсальный матовый лак Эмальер купить оптом | Симбирские краски",
      description:
        "Универсальный матовый лак Эмальер для дерева и минеральных поверхностей. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 120,
      updatedAt: "2026-03-20",
      tags: ["лак", "универсальный", "матовый", "эмальер"],
    },
  },
  {
    id: "emalyer-varnish-universal-gloss",
    slug: "emalyer-varnish-universal-gloss",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "Лак универсальный",
    subtitle: "глянцевый",
    description:
      "Универсальный глянцевый лак для наружных и внутренних работ. Подходит для декоративной отделки и защиты деревянных и минеральных поверхностей.",
    packagings: [
      createPackaging("0,9 кг", 0.9, "kg", 1),
      createPackaging("2,2 кг", 2.2, "kg", 2),
      createPackaging("10 кг", 10, "kg", 3),
    ],
    applicationAreas: ["дерево", "кирпич", "бетон", "камень"],
    workTypes: ["внутренние работы", "наружные работы"],
    materialTypes: ["дерево", "кирпич", "бетон", "минеральные поверхности"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Лаки" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "0,9 кг / 2,2 кг / 10 кг" },
      ],
      technical: [
        { label: "Финиш", value: "Глянцевый" },
        { label: "Назначение", value: "Универсальный лак для наружных и внутренних работ" },
        { label: "Срок годности", value: "24 месяца" },
      ],
      scenario: [
        { label: "Подходит для", value: "Дерево, кирпич, бетон, камень" },
        { label: "Особенность", value: "Глянцевое декоративное покрытие" },
      ],
    },
    images: productImage("product-varnish-universal-gloss.webp"),
    seo: {
      title: "Универсальный глянцевый лак Эмальер купить оптом | Симбирские краски",
      description:
        "Универсальный глянцевый лак Эмальер для дерева и минеральных поверхностей. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 130,
      updatedAt: "2026-03-20",
      tags: ["лак", "универсальный", "глянцевый", "эмальер"],
    },
  },
  {
    id: "emalyer-varnish-sauna-gloss",
    slug: "emalyer-varnish-sauna-gloss",
    categoryId: "varnishes",
    lineId: "emalyer",
    title: "Лак для бань и саун",
    subtitle: "глянцевый",
    description:
      "Глянцевый лак для декоративной отделки и защиты деревянных поверхностей внутри бань и саун в условиях высокой влажности и температуры.",
    packagings: [
      createPackaging("0,9 кг", 0.9, "kg", 1),
      createPackaging("2,2 кг", 2.2, "kg", 2),
    ],
    applicationAreas: ["бани и сауны", "влажные помещения"],
    workTypes: ["внутренние работы"],
    materialTypes: ["дерево"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Лаки" },
        { label: "Линейка", value: "ЭМАЛЬЕР" },
        { label: "Фасовки", value: "0,9 кг / 2,2 кг" },
      ],
      technical: [
        { label: "Финиш", value: "Глянцевый" },
        { label: "Назначение", value: "Для бань и саун" },
        { label: "Состав", value: "Стирол-акриловый сополимер, антисептик, восковые добавки" },
      ],
      scenario: [
        { label: "Подходит для", value: "Стены, потолки, двери, перегородки в банях и саунах" },
        { label: "Особенность", value: "Водо- и грязеотталкивающее покрытие" },
      ],
    },
    images: productImage("product-varnish-sauna-gloss.webp"),
    seo: {
      title: "Глянцевый лак для бань и саун Эмальер купить оптом | Симбирские краски",
      description:
        "Глянцевый лак Эмальер для бань и саун. Оптовые поставки и доступные фасовки.",
    },
    admin: {
      isPublished: true,
      sortOrder: 140,
      updatedAt: "2026-03-20",
      tags: ["лак", "бани и сауны", "глянцевый", "эмальер"],
    },
  },
  {
    id: "ladya-solvent-white-spirit",
    slug: "ladya-solvent-white-spirit",
    categoryId: "solvents",
    lineId: "ladya",
    title: "Уайт-спирит",
    subtitle: "растворитель",
    description:
      "Растворитель для разбавления лакокрасочных материалов, обезжиривания и очистки инструмента.",
    packagings: [
      createPackaging("0,5 л", 0.5, "l", 1),
      createPackaging("1 л", 1, "l", 2),
      createPackaging("5 л", 5, "l", 3),
    ],
    applicationAreas: ["разбавление лкм", "обезжиривание", "очистка инструмента"],
    workTypes: ["внутренние работы", "наружные работы"],
    materialTypes: ["металл", "дерево", "инструмент"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Растворители" },
        { label: "Линейка", value: "ЛАДЬЯ" },
        { label: "Фасовки", value: "0,5 л / 1 л / 5 л" },
      ],
      technical: [
        { label: "Тип", value: "Органический растворитель" },
        { label: "Назначение", value: "Разбавление и обезжиривание" },
      ],
      scenario: [
        { label: "Подходит для", value: "Подготовка поверхности и очистка инструмента" },
      ],
    },
    images: productImage("product-solvent-white-spirit.webp"),
    seo: {
      title: "Уайт-спирит Ладья купить оптом | Симбирские краски",
      description:
        "Уайт-спирит Ладья для разбавления ЛКМ, обезжиривания и очистки инструмента.",
    },
    admin: {
      isPublished: true,
      sortOrder: 150,
      updatedAt: "2026-03-20",
      tags: ["ладья", "растворитель", "уайт-спирит"],
    },
  },
  {
    id: "ladya-solvent-646",
    slug: "ladya-solvent-646",
    categoryId: "solvents",
    lineId: "ladya",
    title: "Растворитель 646",
    subtitle: "универсальный",
    description:
      "Универсальный растворитель для разбавления лакокрасочных материалов и очистки инструмента.",
    packagings: [
      createPackaging("0,5 л", 0.5, "l", 1),
      createPackaging("1 л", 1, "l", 2),
      createPackaging("5 л", 5, "l", 3),
    ],
    applicationAreas: ["разбавление лкм", "очистка инструмента"],
    workTypes: ["внутренние работы", "наружные работы"],
    materialTypes: ["металл", "инструмент"],
    characteristics: {
      commercial: [
        { label: "Категория", value: "Растворители" },
        { label: "Линейка", value: "ЛАДЬЯ" },
        { label: "Фасовки", value: "0,5 л / 1 л / 5 л" },
      ],
      technical: [
        { label: "Тип", value: "Растворитель 646" },
        { label: "Назначение", value: "Разбавление и очистка" },
      ],
      scenario: [
        { label: "Подходит для", value: "Разбавление эмалей, лаков и очистка инструмента" },
      ],
    },
    images: productImage("product-solvent-646.webp"),
    seo: {
      title: "Растворитель 646 Ладья купить оптом | Симбирские краски",
      description:
        "Растворитель 646 Ладья для разбавления ЛКМ и очистки инструмента.",
    },
    admin: {
      isPublished: true,
      sortOrder: 160,
      updatedAt: "2026-03-20",
      tags: ["ладья", "растворитель 646", "растворитель"],
    },
  },
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
