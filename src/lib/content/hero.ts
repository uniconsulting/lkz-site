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
    metricTopClassName: "relative -top-[2px] text-[172px] leading-[0.82] tracking-[-0.09em]",
    contentGapClassName: "gap-[44px]",
    descriptionShellClassName: "max-w-[360px]",
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
    metricTopClassName: "text-[64px] leading-[0.9] tracking-[-0.06em]",
    metricBottomClassName: "text-[100px] leading-[0.88] tracking-[-0.08em]",
    metricDividerClassName: "w-[260px] my-[12px]",
    contentGapClassName: "gap-[54px]",
    descriptionShellClassName: "max-w-[430px]",
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
    metricTopClassName: "text-[154px] leading-[0.82] tracking-[-0.08em]",
    metricBottomClassName: "text-[58px] leading-[0.94] tracking-[-0.05em]",
    metricDividerClassName: "w-[260px] my-[12px]",
    contentGapClassName: "gap-[58px]",
    descriptionShellClassName: "max-w-[420px]",
    description: [
      "по всей России,",
      "которые ценят удобство",
      "коммуникации и качество",
      "нашей продукции",
    ],
  },
];
