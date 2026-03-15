export type HowToBuyStepId =
  | "buyerType"
  | "interestType"
  | "volume"
  | "nextStep";

export type HowToBuyAnswers = Partial<Record<HowToBuyStepId, string>>;

export type HowToBuyOptionIconKey =
  | "users"
  | "store"
  | "shield"
  | "boxes"
  | "tag"
  | "workflow"
  | "package"
  | "truck"
  | "grid"
  | "badge"
  | "handshake";

export type HowToBuyOption = {
  value: string;
  title: string;
  description?: string;
  icon: HowToBuyOptionIconKey;
};

export type HowToBuyStep = {
  id: HowToBuyStepId;
  title: string;
  description: string;
  options: HowToBuyOption[];
};

export type HowToBuySummaryCard = {
  id: HowToBuyStepId;
  title: string;
  value: string;
  description: string;
};

export const howToBuyHero = {
  eyebrow: "как купить",
  title: "Как купить продукцию",
  description: [
    "Подбираем условия поставки индивидуально:",
    "с учётом объёма закупки, категории продукции,",
    "региона и формата сотрудничества.",
  ],
  note: [
    "Покупка у нас оформляется через персональный запрос.",
    "После уточнения задачи отдел продаж связывается с вами,",
    "презентует прайс-лист и предлагает условия сотрудничества.",
  ],
  cta: "оставить запрос",
};

export const howToBuyProcess = [
  {
    id: "request",
    index: "01",
    title: "оставляете запрос",
    description:
      "кратко указываете формат закупки и что именно вас интересует",
  },
  {
    id: "clarify",
    index: "02",
    title: "уточняем параметры",
    description:
      "менеджер помогает определить объём, категории продукции и формат сотрудничества",
  },
  {
    id: "offer",
    index: "03",
    title: "получаете предложение",
    description:
      "направляем прайс-лист, условия поставки и следующий шаг по взаимодействию",
  },
] as const;

export const howToBuySteps: HowToBuyStep[] = [
  {
    id: "buyerType",
    title: "Кто вы",
    description: "Это поможет подобрать подходящий формат взаимодействия",
    options: [
      {
        value: "dealer",
        title: "дилер / оптовый партнёр",
        description: "закупаете продукцию для дальнейшей продажи",
        icon: "users",
      },
      {
        value: "trade-company",
        title: "торговая компания",
        description:
          "работаете с несколькими каналами сбыта или ассортиментом",
        icon: "store",
      },
      {
        value: "contractor",
        title: "строительная компания / подрядчик",
        description: "закупаете материалы под объекты и регулярные задачи",
        icon: "shield",
      },
      {
        value: "manufacturer",
        title: "производственная компания",
        description: "интересует поставка материалов под внутренние процессы",
        icon: "boxes",
      },
      {
        value: "private-label",
        title: "Private Label / СТМ",
        description:
          "рассматриваете выпуск продукции под собственной торговой маркой",
        icon: "tag",
      },
      {
        value: "other",
        title: "другой формат",
        description: "нужна консультация по вашему сценарию",
        icon: "workflow",
      },
    ],
  },
  {
    id: "interestType",
    title: "Что вас интересует",
    description: "Уточним, с каким запросом вы к нам обращаетесь",
    options: [
      {
        value: "catalog",
        title: "готовая продукция из каталога",
        icon: "package",
      },
      {
        value: "wholesale",
        title: "регулярные оптовые поставки",
        icon: "truck",
      },
      {
        value: "dealer",
        title: "дилерское сотрудничество",
        icon: "handshake",
      },
      {
        value: "stm",
        title: "Private Label / СТМ",
        icon: "tag",
      },
      {
        value: "multi-category",
        title: "несколько категорий продукции",
        icon: "grid",
      },
      {
        value: "consultation",
        title: "нужна консультация по подбору",
        icon: "workflow",
      },
    ],
  },
  {
    id: "volume",
    title: "Планируемый объём",
    description: "Это влияет на формат условий и дальнейший диалог",
    options: [
      {
        value: "test",
        title: "тестовая закупка",
        description: "первый запрос или пробная партия",
        icon: "badge",
      },
      {
        value: "small",
        title: "малый опт",
        description: "регулярные небольшие закупки",
        icon: "package",
      },
      {
        value: "medium",
        title: "средний объём",
        description: "планируем рабочие поставки на постоянной основе",
        icon: "boxes",
      },
      {
        value: "large",
        title: "крупный объём",
        description: "интересуют расширенные поставки и персональные условия",
        icon: "truck",
      },
      {
        value: "unknown",
        title: "пока уточняем",
        description: "хотим обсудить объём после консультации",
        icon: "workflow",
      },
    ],
  },
  {
    id: "nextStep",
    title: "Что подготовить",
    description: "Поймём, что подготовить для вас в первую очередь",
    options: [
      {
        value: "price",
        title: "прайс-лист",
        icon: "badge",
      },
      {
        value: "conditions",
        title: "условия сотрудничества",
        icon: "handshake",
      },
      {
        value: "delivery",
        title: "условия поставки",
        icon: "truck",
      },
      {
        value: "stm",
        title: "условия по СТМ",
        icon: "tag",
      },
      {
        value: "assortment",
        title: "подбор ассортимента",
        icon: "grid",
      },
      {
        value: "manager",
        title: "связь с менеджером",
        icon: "users",
      },
    ],
  },
];

export const howToBuySummaryMeta: Record<
  HowToBuyStepId,
  { title: string; description: string }
> = {
  buyerType: {
    title: "формат покупателя",
    description: "какой тип взаимодействия вам ближе",
  },
  interestType: {
    title: "интерес",
    description: "что именно вас интересует сейчас",
  },
  volume: {
    title: "объём",
    description: "планируемый формат закупки",
  },
  nextStep: {
    title: "следующий шаг",
    description: "что подготовить в первую очередь",
  },
};

export const howToBuyResultContent = {
  eyebrow: "запрос сформирован",
  title: "Ваш запрос готов",
  description:
    "Передадим его менеджеру, чтобы подготовить условия сотрудничества, прайс-лист и следующий шаг по взаимодействию.",
  actionsTitle: "Что сделает отдел продаж",
  actions: [
    "уточнит детали вашего запроса",
    "подберёт релевантные категории продукции",
    "направит прайс-лист и условия поставки",
    "предложит следующий шаг по сотрудничеству",
  ],
  formTitle: "Оставьте контакты",
  formDescription:
    "Менеджер свяжется с вами, чтобы уточнить детали и направить предложение.",
  submitLabel: "отправить запрос",
  resetLabel: "пройти заново",
};

export const howToBuySuccessContent = {
  title: "Запрос отправлен",
  description:
    "Спасибо. Менеджер свяжется с вами, чтобы уточнить детали и направить предложение.",
  primaryCta: "перейти в каталог",
  secondaryCta: "отправить ещё один запрос",
};

export function getHowToBuyStep(stepId: HowToBuyStepId) {
  return howToBuySteps.find((step) => step.id === stepId);
}

export function getHowToBuyOption(
  stepId: HowToBuyStepId,
  value?: string,
): HowToBuyOption | undefined {
  if (!value) return undefined;
  return getHowToBuyStep(stepId)?.options.find((option) => option.value === value);
}

export function resolveHowToBuyValue(
  stepId: HowToBuyStepId,
  value?: string,
): string {
  return getHowToBuyOption(stepId, value)?.title ?? "не указано";
}

export function mapHowToBuySummary(
  answers: HowToBuyAnswers,
): HowToBuySummaryCard[] {
  return (Object.keys(howToBuySummaryMeta) as HowToBuyStepId[]).map((stepId) => ({
    id: stepId,
    title: howToBuySummaryMeta[stepId].title,
    value: resolveHowToBuyValue(stepId, answers[stepId]),
    description: howToBuySummaryMeta[stepId].description,
  }));
}
