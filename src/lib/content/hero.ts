export type HeroSlide = {
  id: string;
  metricVariant: "single" | "stacked";
  metricTop: string;
  metricBottom?: string;
  metricShellClassName: string;
  metricTopClassName: string;
  metricBottomClassName?: string;
  description: [string, string, string, string];
};

export const heroSlides: HeroSlide[] = [
  {
    id: "experience",
    metricVariant: "single",
    metricTop: "13",
    metricShellClassName: "w-[250px]",
    metricTopClassName: "text-[168px] leading-[0.82] tracking-[-0.09em]",
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
    metricTopClassName: "text-[62px] leading-[0.9] tracking-[-0.06em]",
    metricBottomClassName: "text-[102px] leading-[0.88] tracking-[-0.08em]",
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
    metricShellClassName: "w-[320px]",
    metricTopClassName: "text-[154px] leading-[0.82] tracking-[-0.08em]",
    metricBottomClassName: "text-[58px] leading-[0.94] tracking-[-0.05em]",
    description: [
      "по всей России,",
      "которые ценят удобство",
      "коммуникации и качество",
      "нашей продукции",
    ],
  },
];
