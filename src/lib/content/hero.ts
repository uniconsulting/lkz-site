export type HeroSlide = {
  id: string;
  metricVariant: "single" | "stacked";
  metricTop: string;
  metricBottom?: string;
  description: string[];
  bannerTone: "dark" | "muted" | "light";
  bannerLabel: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "experience",
    metricVariant: "single",
    metricTop: "13",
    description: [
      "лет опыта в производстве",
      "лакокрасочной продукции",
      "и построении надёжных",
      "отношений с партнёрами",
    ],
    bannerTone: "dark",
    bannerLabel: "БАННЕР",
  },
  {
    id: "volume",
    metricVariant: "stacked",
    metricTop: "20.000",
    metricBottom: "ТОНН",
    description: [
      "продукции мы производим",
      "ежегодно, непрерывно",
      "улучшая лабораторию",
      "и инфраструктуру",
    ],
    bannerTone: "muted",
    bannerLabel: "БАННЕР",
  },
  {
    id: "partners",
    metricVariant: "stacked",
    metricTop: "400",
    metricBottom: "партнёров",
    description: [
      "по всей России,",
      "которые ценят удобство",
      "коммуникации и качество",
      "нашей продукции",
    ],
    bannerTone: "light",
    bannerLabel: "БАННЕР",
  },
];
