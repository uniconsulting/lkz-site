import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

export function CatalogTeaser() {
  return (
    <Section className="pt-6 xl:pt-8">
      <Container>
        <div className="h-[270px] rounded-[36px] bg-[var(--color-surface)] px-[22px] py-[15px]">
          <div className="flex h-full items-center justify-between gap-10">
            <div className="relative h-[240px] w-[480px] shrink-0 overflow-hidden rounded-[28px] bg-[var(--color-bg)]/35">
              <img
                src={`${basePath}/images/sections/home/catalog-banner-v1.png`}
                alt="Каталог продукции"
                className="h-full w-full object-cover"
              />

              <Link
                href="#products"
                className="absolute right-4 top-4 inline-flex h-[52px] items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-8 text-[18px] font-semibold text-white transition duration-200 hover:opacity-90"
              >
                открыть весь каталог
              </Link>
            </div>

            <div className="flex flex-1 justify-end">
              <h2 className="max-w-[900px] text-right font-heading text-[42px] leading-[1.1] tracking-[-0.05em] text-[var(--color-text)]">
                <span className="block">Каталог продукции,</span>
                <span className="block">с возможностью производства</span>
                <span className="block">под Вашей торговой маркой</span>
              </h2>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
