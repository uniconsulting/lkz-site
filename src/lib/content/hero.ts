export type HeroSlide = {
  id: string;
  metricVariant: "single" | "stacked";
  metricTop: string;
  metricBottom?: string;
  metricTopClassName: string;
  metricBottomClassName?: string;
  description: [string, string, string, string];
};

export const heroSlides: HeroSlide[] = [
  {
    id: "experience",
    metricVariant: "single",
    metricTop: "13",
    metricTopClassName: "text-[122px] leading-[0.82] tracking-[-0.09em]",
    description: [
      "лет опыта в производстве",
      "лакокрасочной продукции",
      "и построении надёжных",
      "отношений с партнёрами",
    ],
  },
  {
    id: "volume",
    metricVariant: "stacked",
    metricTop: "20.000",
    metricBottom: "ТОНН",
    metricTopClassName: "text-[46px] leading-[0.9] tracking-[-0.06em]",
    metricBottomClassName: "text-[58px] leading-[0.9] tracking-[-0.06em]",
    description: [
      "продукции мы производим",
      "ежегодно, непрерывно",
      "улучшая лабораторию",
      "и инфраструктуру",
    ],
  },
  {
    id: "partners",
    metricVariant: "stacked",
    metricTop: "400",
    metricBottom: "партнёров",
    metricTopClassName: "text-[104px] leading-[0.82] tracking-[-0.08em]",
    metricBottomClassName: "text-[30px] leading-[0.96] tracking-[-0.04em]",
    description: [
      "по всей России,",
      "которые ценят удобство",
      "коммуникации и качество",
      "нашей продукции",
    ],
  },
];
