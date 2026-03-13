export type PartnerProfile =
  | "dealer"
  | "retail_chain"
  | "distributor"
  | "construction_base"
  | "online_b2b";

export type CooperationFormat =
  | "ready_products"
  | "private_label"
  | "hybrid";

export type LaunchVolume = "test" | "small" | "medium" | "large";

export type SupplyGeography =
  | "local"
  | "region"
  | "multi_region"
  | "federal";

export type BusinessPriority =
  | "margin"
  | "logistics"
  | "stm"
  | "assortment"
  | "stability";

export type PartnerModel =
  | "dealer_model"
  | "ready_matrix"
  | "private_label_model"
  | "hybrid_model";

export type AccentKey =
  | "margin"
  | "logistics"
  | "stm"
  | "assortment"
  | "stability";

export type CalculatorAnswers = {
  profile?: PartnerProfile;
  format?: CooperationFormat;
  volume?: LaunchVolume;
  geography?: SupplyGeography;
  priority?: BusinessPriority;
};

export type CalculatorStepId = keyof CalculatorAnswers;

export type OptionIconKey =
  | "users"
  | "store"
  | "network"
  | "warehouse"
  | "monitor"
  | "package"
  | "badge"
  | "blend"
  | "beaker"
  | "boxes"
  | "truck"
  | "globe"
  | "coins"
  | "route"
  | "tag"
  | "grid"
  | "shield";

export type ScoreKey = PartnerModel | AccentKey;

export type CalculatorOption<T extends string> = {
  value: T;
  title: string;
  description?: string;
  icon: OptionIconKey;
  score: Partial<Record<ScoreKey, number>>;
};

export type CalculatorStep = {
  id: CalculatorStepId;
  title: string;
  description: string;
  options: CalculatorOption<string>[];
};

export type ScoreState = {
  models: Record<PartnerModel, number>;
  accents: Record<AccentKey, number>;
};

export type CalculatorResult = {
  model: PartnerModel;
  modelTitle: string;
  modelDescription: string;
  startTitle: string;
  startDescription: string;
  accentTitle: string;
  accentDescription: string;
  nextStepTitle: string;
  nextStepDescription: string;
};

export type CalculatorResultCard = {
  id: "model" | "start" | "accent" | "next-step";
  title: string;
  value: string;
  description: string;
};

type ScenarioOverride = {
  when: Partial<CalculatorAnswers>;
  result: Partial<CalculatorResult> & { model: PartnerModel };
};

function createInitialScoreState(): ScoreState {
  return {
    models: {
      dealer_model: 0,
      ready_matrix: 0,
      private_label_model: 0,
      hybrid_model: 0,
    },
    accents: {
      margin: 0,
      logistics: 0,
      stm: 0,
      assortment: 0,
      stability: 0,
    },
  };
}

export const calculatorSteps: CalculatorStep[] = [
  {
    id: "profile",
    title: "Кто вы",
    description: "определим модель сотрудничества под ваш канал продаж",
    options: [
      {
        value: "dealer",
        title: "Дилер",
        description: "работаете через собственные продажи\nи клиентскую базу",
        icon: "users",
        score: {
          dealer_model: 3,
          ready_matrix: 1,
          margin: 1,
        },
      },
      {
        value: "retail_chain",
        title: "Торговая сеть",
        description: "развиваете сеть точек или полочную матрицу",
        icon: "store",
        score: {
          private_label_model: 3,
          hybrid_model: 2,
          logistics: 1,
          assortment: 1,
        },
      },
      {
        value: "distributor",
        title: "Дистрибьютор",
        description:
          "работаете с объёмами, географией и\nнесколькими каналами",
        icon: "network",
        score: {
          hybrid_model: 3,
          dealer_model: 2,
          logistics: 2,
          stability: 1,
        },
      },
      {
        value: "construction_base",
        title: "Строительная база",
        description: "нужен устойчивый ходовой ассортимент",
        icon: "warehouse",
        score: {
          ready_matrix: 2,
          dealer_model: 2,
          margin: 1,
          stability: 1,
        },
      },
      {
        value: "online_b2b",
        title: "B2B-ритейл / online-канал",
        description: "продаёте через online-витрину\nили digital-канал",
        icon: "monitor",
        score: {
          ready_matrix: 2,
          private_label_model: 1,
          assortment: 1,
          margin: 1,
        },
      },
    ],
  },
  {
    id: "format",
    title: "Что вам интересно",
    description: "поймём, какой формат запуска подходит лучше",
    options: [
      {
        value: "ready_products",
        title: "Готовая продукция",
        description: "хотим быстро стартовать на готовой линейке",
        icon: "package",
        score: {
          ready_matrix: 4,
          dealer_model: 1,
          stability: 1,
        },
      },
      {
        value: "private_label",
        title: "Private Label / СТМ",
        description: "хотим запускать продукцию под своей маркой",
        icon: "badge",
        score: {
          private_label_model: 5,
          stm: 3,
        },
      },
      {
        value: "hybrid",
        title: "Смешанный формат",
        description: "интересна и готовая продукция, и сценарий СТМ",
        icon: "blend",
        score: {
          hybrid_model: 5,
          private_label_model: 1,
          ready_matrix: 1,
          assortment: 1,
        },
      },
    ],
  },
  {
    id: "volume",
    title: "Планируемый объём запуска",
    description: "определим рекомендуемый старт и темп входа",
    options: [
      {
        value: "test",
        title: "Тестовая партия",
        description: "проверить спрос и начать с малого",
        icon: "beaker",
        score: {
          ready_matrix: 2,
          dealer_model: 2,
        },
      },
      {
        value: "small",
        title: "Малый объём",
        description: "аккуратный запуск с базовой матрицей",
        icon: "package",
        score: {
          dealer_model: 2,
          ready_matrix: 2,
          margin: 1,
        },
      },
      {
        value: "medium",
        title: "Средний объём",
        description: "системный старт с ростом матрицы",
        icon: "boxes",
        score: {
          hybrid_model: 2,
          private_label_model: 2,
          logistics: 1,
        },
      },
      {
        value: "large",
        title: "Крупный объём",
        description: "работаем на расширенный запуск\nи устойчивые поставки",
        icon: "warehouse",
        score: {
          private_label_model: 3,
          hybrid_model: 2,
          logistics: 2,
          stability: 1,
        },
      },
    ],
  },
  {
    id: "geography",
    title: "География поставок",
    description: "учитываем логистику и масштаб отгрузок",
    options: [
      {
        value: "local",
        title: "Один город / локально",
        description: "точечный запуск на ограниченной территории",
        icon: "store",
        score: {
          ready_matrix: 1,
          dealer_model: 1,
        },
      },
      {
        value: "region",
        title: "Один регион",
        description: "региональная модель с системной поставкой",
        icon: "globe",
        score: {
          dealer_model: 1,
          hybrid_model: 1,
          logistics: 1,
        },
      },
      {
        value: "multi_region",
        title: "Несколько регионов",
        description: "нужна логистика и управляемая\nгеография отгрузок",
        icon: "route",
        score: {
          hybrid_model: 2,
          logistics: 3,
          stability: 1,
        },
      },
      {
        value: "federal",
        title: "Сетевая география",
        description: "нужен масштаб и предсказуемость поставок",
        icon: "network",
        score: {
          private_label_model: 2,
          hybrid_model: 2,
          logistics: 3,
          stability: 2,
        },
      },
    ],
  },
  {
    id: "priority",
    title: "Главный приоритет",
    description: "сделаем акцент на том, что важнее именно для вас",
    options: [
      {
        value: "margin",
        title: "Максимальная маржа",
        description: "делаем упор на экономику сделки и потенциал наценки",
        icon: "coins",
        score: {
          margin: 5,
          dealer_model: 1,
        },
      },
      {
        value: "logistics",
        title: "Оптимизация доставки",
        description: "снижаем логистическую нагрузку и упрощаем поставки",
        icon: "truck",
        score: {
          logistics: 5,
          hybrid_model: 1,
        },
      },
      {
        value: "stm",
        title: "Быстрый запуск СТМ",
        description: "готовим вход в собственную линейку без лишней сложности",
        icon: "tag",
        score: {
          stm: 5,
          private_label_model: 2,
        },
      },
      {
        value: "assortment",
        title: "Широкая продуктовая матрица",
        description: "важен сильный стартовый ассортимент под разные сценарии",
        icon: "grid",
        score: {
          assortment: 5,
          ready_matrix: 1,
          hybrid_model: 1,
        },
      },
      {
        value: "stability",
        title: "Стабильность поставок",
        description: "критична предсказуемость работы и качество каждой партии",
        icon: "shield",
        score: {
          stability: 5,
          ready_matrix: 1,
          hybrid_model: 1,
        },
      },
    ],
  },
];

const modelDictionary: Record<
  PartnerModel,
  {
    title: string;
    description: string;
    nextStepTitle: string;
    nextStepDescription: string;
  }
> = {
  dealer_model: {
    title: "Дилерская модель",
    description:
      "подходит для партнёров, которым нужен понятный старт, рабочая маржа и управляемая ассортиментная матрица",
    nextStepTitle: "получить коммерческое предложение",
    nextStepDescription:
      "подготовим условия по базовой матрице, объёму и формату первой поставки",
  },
  ready_matrix: {
    title: "Готовая продуктовая матрица",
    description:
      "оптимальный вариант для быстрого запуска на готовой линейке с устойчивым спросом и понятной логикой входа",
    nextStepTitle: "подобрать стартовую матрицу SKU",
    nextStepDescription:
      "покажем, с каких позиций логично начать и как собрать первый ассортимент",
  },
  private_label_model: {
    title: "Private Label / СТМ",
    description:
      "подходит для партнёров, которым важно запускать продукцию под собственной торговой маркой и контролировать позиционирование",
    nextStepTitle: "обсудить запуск СТМ",
    nextStepDescription:
      "подготовим сценарий запуска, состав линейки и ориентир по объёму первой партии",
  },
  hybrid_model: {
    title: "Смешанный формат",
    description:
      "подходит для партнёров, которым нужен гибкий вход: готовая продукция на старте и возможность масштабирования в сторону СТМ",
    nextStepTitle: "собрать гибридную модель запуска",
    nextStepDescription:
      "покажем, как совместить готовую матрицу, логистику и будущий сценарий Private Label",
  },
};

const accentDictionary: Record<
  AccentKey,
  {
    title: string;
    description: string;
  }
> = {
  margin: {
    title: "Акцент на маржинальности",
    description:
      "для вас важна экономика сделки и потенциал наценки в рамках выбранной модели",
  },
  logistics: {
    title: "Акцент на логистике",
    description:
      "для вас критична управляемая доставка, география отгрузок и оптимизация сопутствующих затрат",
  },
  stm: {
    title: "Акцент на запуске СТМ",
    description:
      "для вас ключевым является собственный бренд, управляемый запуск линейки и усиление позиции на рынке",
  },
  assortment: {
    title: "Акцент на ассортименте",
    description:
      "для вас важна сильная стартовая матрица и возможность закрывать сразу несколько товарных сценариев",
  },
  stability: {
    title: "Акцент на стабильности поставок",
    description:
      "для вас приоритетны предсказуемость работы, устойчивость поставок и качество каждой партии",
  },
};

const startDictionary: Record<
  LaunchVolume,
  Record<
    PartnerModel,
    {
      title: string;
      description: string;
    }
  >
> = {
  test: {
    dealer_model: {
      title: "Тестовый вход",
      description:
        "рекомендуем начать с ограниченной партии и проверить спрос на базовых позициях",
    },
    ready_matrix: {
      title: "Тестовая матрица",
      description:
        "логично стартовать с нескольких ходовых SKU и быстро проверить оборачиваемость",
    },
    private_label_model: {
      title: "Пилотный запуск СТМ",
      description:
        "рекомендуем ограниченную тестовую партию для валидации формата и упаковки",
    },
    hybrid_model: {
      title: "Мягкий комбинированный старт",
      description:
        "оптимально зайти через готовую матрицу и параллельно подготовить сценарий СТМ",
    },
  },
  small: {
    dealer_model: {
      title: "Старт с базовой матрицей",
      description:
        "подойдёт компактный набор ходовых позиций с понятной дилерской логикой",
    },
    ready_matrix: {
      title: "Компактная ассортиментная матрица",
      description:
        "рекомендуем небольшой, но коммерчески сильный набор категорий для старта",
    },
    private_label_model: {
      title: "Ограниченная линейка СТМ",
      description:
        "можно запускать короткую собственную линейку без избыточной нагрузки на входе",
    },
    hybrid_model: {
      title: "Небольшой гибридный запуск",
      description:
        "часть ассортимента можно взять из готовой линейки, часть подготовить под СТМ",
    },
  },
  medium: {
    dealer_model: {
      title: "Системный дилерский старт",
      description:
        "можно закладывать устойчивую работу с расширением матрицы и географии",
    },
    ready_matrix: {
      title: "Расширенная готовая матрица",
      description:
        "подходит запуск с несколькими категориями и более глубокой товарной структурой",
    },
    private_label_model: {
      title: "Полноценный старт СТМ",
      description:
        "объём достаточен для осмысленного запуска линейки под собственной торговой маркой",
    },
    hybrid_model: {
      title: "Гибрид с потенциалом масштабирования",
      description:
        "подходит для системной модели: готовая продукция плюс развитие собственного бренда",
    },
  },
  large: {
    dealer_model: {
      title: "Масштабная дилерская работа",
      description:
        "можно строить устойчивую модель на объёме, географии и расширенной матрице",
    },
    ready_matrix: {
      title: "Крупный запуск на готовой линейке",
      description:
        "подходит для интенсивного входа с сильной продуктовой матрицей и стабильными поставками",
    },
    private_label_model: {
      title: "Масштабный запуск СТМ",
      description:
        "объём позволяет выстраивать полноценную private label-модель с сильным позиционированием",
    },
    hybrid_model: {
      title: "Гибридная модель на масштабе",
      description:
        "подходит для крупных партнёров, которым нужен и объём, и гибкость продуктовой стратегии",
    },
  },
};

const scenarioOverrides = [
  {
    when: {
      profile: "retail_chain",
      format: "private_label",
      volume: "medium",
      priority: "stm",
    },
    result: {
      model: "private_label_model" as const,
      modelTitle: "Private Label / СТМ",
      modelDescription:
        "для вашей модели лучше всего подходит запуск собственной линейки под брендом заказчика",
      startTitle: "Запуск ограниченной линейки СТМ",
      startDescription:
        "рекомендуем стартовать с узкой, но коммерчески сильной линейки и последующим расширением",
    },
  },
  {
    when: {
      profile: "dealer",
      format: "ready_products",
      volume: "small",
      priority: "margin",
    },
    result: {
      model: "dealer_model" as const,
      modelTitle: "Дилерская модель",
      modelDescription:
        "для вас оптимален быстрый вход через готовую продукцию с акцентом на коммерческую маржу",
      startTitle: "Базовая матрица для входа",
      startDescription:
        "лучше начать с ограниченного набора ходовых позиций и быстро проверить спрос",
    },
  },
  {
    when: {
      profile: "distributor",
      geography: "multi_region",
      priority: "logistics",
    },
    result: {
      model: "hybrid_model" as const,
      modelTitle: "Смешанный формат",
      modelDescription:
        "для вашей модели важна гибкость ассортимента и управляемая логистика на расширенной географии",
      startTitle: "Региональный запуск с масштабированием",
      startDescription:
        "рекомендуем модель с сильной логистической опорой и постепенным расширением матрицы",
    },
  },
] satisfies ScenarioOverride[];

function applyOptionScore(
  current: ScoreState,
  score: Partial<Record<ScoreKey, number>>,
): ScoreState {
  const next: ScoreState = {
    models: { ...current.models },
    accents: { ...current.accents },
  };

  (Object.keys(score) as ScoreKey[]).forEach((key) => {
    const value = score[key] ?? 0;

    if (key in next.models) {
      next.models[key as PartnerModel] += value;
    }

    if (key in next.accents) {
      next.accents[key as AccentKey] += value;
    }
  });

  return next;
}

export function calculateScores(answers: CalculatorAnswers): ScoreState {
  return calculatorSteps.reduce((acc, step) => {
    const selectedValue = answers[step.id];
    if (!selectedValue) return acc;

    const option = step.options.find((item) => item.value === selectedValue);
    if (!option) return acc;

    return applyOptionScore(acc, option.score);
  }, createInitialScoreState());
}

function getTopModel(scores: ScoreState): PartnerModel {
  return (Object.entries(scores.models).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "ready_matrix") as PartnerModel;
}

function getTopAccent(scores: ScoreState): AccentKey {
  return (Object.entries(scores.accents).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "stability") as AccentKey;
}

function matchesOverride(
  answers: CalculatorAnswers,
  override: ScenarioOverride,
): boolean {
  return Object.entries(override.when).every(([key, value]) => {
    return answers[key as keyof CalculatorAnswers] === value;
  });
}

export function resolveCalculatorResult(
  answers: CalculatorAnswers,
): CalculatorResult | null {
  if (
    !answers.profile ||
    !answers.format ||
    !answers.volume ||
    !answers.geography ||
    !answers.priority
  ) {
    return null;
  }

  const scores = calculateScores(answers);
  const model = getTopModel(scores);
  const accent = getTopAccent(scores);

  const modelData = modelDictionary[model];
  const accentData = accentDictionary[accent];
  const startData = startDictionary[answers.volume][model];

  const baseResult: CalculatorResult = {
    model,
    modelTitle: modelData.title,
    modelDescription: modelData.description,
    startTitle: startData.title,
    startDescription: startData.description,
    accentTitle: accentData.title,
    accentDescription: accentData.description,
    nextStepTitle: modelData.nextStepTitle,
    nextStepDescription: modelData.nextStepDescription,
  };

  const override = scenarioOverrides.find((item) =>
    matchesOverride(answers, item),
  );

  if (!override) {
    return baseResult;
  }

  return {
    ...baseResult,
    ...override.result,
  };
}

export function mapResultToCards(
  result: CalculatorResult,
): CalculatorResultCard[] {
  return [
    {
      id: "model",
      title: "Формат сотрудничества",
      value: result.modelTitle,
      description: result.modelDescription,
    },
    {
      id: "start",
      title: "Рекомендуемый старт",
      value: result.startTitle,
      description: result.startDescription,
    },
    {
      id: "accent",
      title: "Ключевой акцент",
      value: result.accentTitle,
      description: result.accentDescription,
    },
    {
      id: "next-step",
      title: "Следующий шаг",
      value: result.nextStepTitle,
      description: result.nextStepDescription,
    },
  ];
}
