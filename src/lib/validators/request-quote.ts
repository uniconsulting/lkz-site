import { z } from "zod";

export const requestQuoteSchema = z.object({
  name: z.string().min(1, "Введите имя"),
  phone: z.string().min(1, "Введите телефон"),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  comment: z.string().optional(),
});

export type RequestQuoteValues = z.infer<typeof requestQuoteSchema>;
