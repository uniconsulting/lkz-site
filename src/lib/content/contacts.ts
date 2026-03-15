export const contactsHero = {
  eyebrow: "контакты",
  title: "Контакты",
  description: [
    "свяжитесь с нами по телефону, почте, в мессенджерах",
    "или отправьте запрос через форму",
  ],
  messengers: [
    {
      id: "max",
      label: "MAX",
      href: "#",
    },
    {
      id: "telegram",
      label: "Telegram",
      href: "#",
    },
  ],
};

export const contactsQuickCards = [
  {
    id: "phone-email",
    eyebrow: "быстрая связь",
    lines: ["+7 (964) 858-99-10", "simkraski@bk.ru"],
  },
  {
    id: "address-hours",
    eyebrow: "адрес и график",
    lines: ["г. Ульяновск, Московское шоссе, 42Е", "Пн-Пт: 8:00 – 18:00"],
  },
  {
    id: "office-production",
    eyebrow: "офис и производство",
    lines: ["г. Ульяновск, Московское шоссе, 42Е"],
  },
  {
    id: "legal",
    eyebrow: "юридическое лицо",
    lines: ['ООО "ЛКЗ"', "ИНН: 7327093976", "ОГРН: 1207300001963"],
  },
] as const;

export const contactsMap = {
  embedUrl:
    "https://yandex.ru/map-widget/v1/?um=constructor%3Ab9ba62ca6079292583614d568f069fd31e16362261dcb68461cc2aa7f829bdc7&source=constructor",
};

export const contactsPageContent = {
  formTitle: "Запрос и коммерческое предложение",
  formDescription: [
    "оставьте запрос на сотрудничество",
    "или отправьте своё коммерческое предложение через форму",
  ],
};
