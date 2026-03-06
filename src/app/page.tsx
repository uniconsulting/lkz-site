import { BentoCard } from "@/components/ui/bento-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Section className="pt-4 md:pt-6 xl:pt-8">
        <Container>
          <BentoCard className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit rounded-full bg-[var(--color-accent-1)] px-3 py-2 text-[12px] font-medium uppercase tracking-[0.06em] text-white">
                foundation
              </span>

              <div className="flex flex-col gap-4">
                <h1 className="font-heading text-[40px] leading-[1] tracking-[-0.04em] md:text-[56px]">
                  Каркас проекта собран
                </h1>
                <p className="max-w-[720px] text-[15px] leading-[1.55] text-[var(--color-text-muted)] md:text-[16px]">
                  Это стартовая страница foundation-слоя. Следующий шаг после
                  развёртывания репозитория — поэтапная разработка Header,
                  Footer и реальных секций.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button>Запросить КП</Button>
                <Button variant="dark">Каталог</Button>
                <Button variant="ghost">О компании</Button>
              </div>
            </div>

            <div className="grid gap-4">
              <BentoCard className="rounded-[calc(var(--radius-card)-8px)] bg-[var(--color-accent-2)] text-white">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] uppercase tracking-[0.08em] text-white/70">
                    UI
                  </span>
                  <p className="text-[18px] leading-[1.2] font-medium">
                    Токены, Bento-система, централизованные константы и базовые
                    reusable-компоненты.
                  </p>
                </div>
              </BentoCard>

              <BentoCard className="rounded-[calc(var(--radius-card)-8px)]">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    next step
                  </span>
                  <p className="text-[16px] leading-[1.4]">
                    Header → Footer → Hero → каталог и контентные секции.
                  </p>
                </div>
              </BentoCard>
            </div>
          </BentoCard>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="system"
            title="Базовые компоненты подключены"
            description="Шрифты отключены намеренно: их можно вернуть после локальной загрузки файлов и проверки build."
          />
        </Container>
      </Section>
    </main>
  );
}
