import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

export function CatalogTeaser() {
  return (
    <Section className="pt-2 xl:pt-3">
      <Container>
        <div className="md:hidden">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[28px] leading-[1.18] tracking-[-0.05em] text-[var(--color-text)]">
              <span className="block">Каталог продукции,</span>
              <span className="block">с возможностью производства</span>
              <span className="block">под Вашей торговой маркой</span>
            </h2>

            <div className="rounded-[28px] bg-[var(--color-surface)] p-2">
              <div className="relative aspect-[2/1] overflow-hidden rounded-[24px] bg-[var(--color-bg)]/35">
                <img
                  src={`${basePath}/images/sections/home/catalog-banner-v1.png`}
                  alt="Каталог продукции"
                  className="h-full w-full object-cover"
                />

                <Link
                  href="#products"
                  style={{ color: "var(--color-accent-1-foreground)" }}
                  className="absolute left-3 top-3 inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--color-accent-1)] px-5 text-[15px] font-semibold transition duration-200 hover:opacity-90"
                >
                  открыть весь каталог
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="h-[256px] rounded-[36px] bg-[var(--color-surface)] p-2">
            <div className="flex h-full items-center justify-between gap-8">
              <div className="relative h-[240px] w-[480px] shrink-0 overflow-hidden rounded-[28px] bg-[var(--color-bg)]/35">
                <img
                  src={`${basePath}/images/sections/home/catalog-banner-v1.png`}
                  alt="Каталог продукции"
                  className="h-full w-full object-cover"
                />

                <Link
                  href="#products"
                  style={{ color: "var(--color-accent-1-foreground)" }}
                  className="absolute left-4 top-4 inline-flex h-[52px] items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-8 text-[18px] font-semibold transition duration-200 hover:opacity-90"
                >
                  открыть весь каталог
                </Link>
              </div>

              <div className="flex h-full flex-1 items-center justify-end pr-[64px]">
                <h2 className="max-w-[820px] text-right font-heading text-[34px] leading-[1.38] tracking-[-0.05em] text-[var(--color-text)]">
                  <span className="block">Каталог продукции,</span>
                  <span className="block">с возможностью производства</span>
                  <span className="block">под Вашей торговой маркой</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
