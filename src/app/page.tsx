import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { BentoCard } from "@/components/ui/bento-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Footer } from "@/components/layout/footer";

function DemoSection({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <Section id={id} className="scroll-mt-28">
      <Container>
        <BentoCard className="min-h-[220px]">
          <div className="flex min-h-[172px] items-end">
            <h2 className="font-heading text-[28px] leading-[1.02] tracking-[-0.03em] md:text-[36px]">
              {title}
            </h2>
          </div>
        </BentoCard>
      </Container>
    </Section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header />
      <Hero />

      <DemoSection id="products" title="Продукция" />
      <DemoSection id="how-to-buy" title="Как купить" />
      <DemoSection id="certificates" title="Сертификаты" />
      <DemoSection id="contacts" title="Контакты" />
      <DemoSection id="calculator" title="Калькулятор" />
      
      <Footer />
    </main>
  );
}
