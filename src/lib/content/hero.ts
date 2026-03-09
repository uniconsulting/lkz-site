export type HeroSlide = {
  id: string;
  metricVariant: "single" | "stacked";
  metricTop: string;
  metricBottom?: string;
  metricShellClassName: string;
  metricTopClassName: string;
  metricBottomClassName?: string;
  metricDividerClassName?: string;
  contentGapClassName: string;
  descriptionShellClassName: string;
  description: [string, string, string, string];
};

export const heroSlides: HeroSlide[] = [
  {
    id: "experience",
    metricVariant: "single",
    metricTop: "13",
    metricShellClassName: "w-[300px]",
    metricTopClassName: "relative -top-[6px] text-[172px] leading-[0.82] tracking-[-0.09em]",
    contentGapClassName: "gap-[16px]",
    descriptionShellClassName: "max-w-[330px]",
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
    metricShellClassName: "w-[300px]",
    metricTopClassName: "text-[48px] leading-[0.9] tracking-[-0.06em]",
    metricBottomClassName: "relative -top-[6px] text-[64px] leading-[0.88] tracking-[-0.08em]",
    metricDividerClassName: "h-[1px] w-[245px] my-[12px]",
    contentGapClassName: "gap-[16px]",
    descriptionShellClassName: "max-w-[330px]",
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
    metricShellClassName: "w-[300px]",
    metricTopClassName: "text-[86px] leading-[0.82] tracking-[-0.08em]",
    metricBottomClassName: "relative -top-[6px] text-[34px] leading-[0.94] tracking-[-0.05em]",
    metricDividerClassName: "h-[1px] w-[245px] my-[12px]",
    contentGapClassName: "gap-[16px]",
    descriptionShellClassName: "max-w-[330px]",
    description: [
      "по всей России,",
      "которые ценят удобство",
      "коммуникации и качество",
      "нашей продукции",
    ],
  },
];
