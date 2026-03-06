"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function RequestQuoteForm() {
  return (
    <form className="grid gap-4">
      <Input placeholder="Имя" />
      <Input placeholder="Телефон" />
      <Textarea placeholder="Комментарий" />
      <Button type="submit">Отправить</Button>
    </form>
  );
}
