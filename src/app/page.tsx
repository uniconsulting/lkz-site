import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { CatalogPreview } from "@/components/sections/catalog-preview";
import { CatalogProductsGrid } from "@/components/sections/catalog-products-grid";
import { B2BCalculatorSection } from "@/components/sections/b2b-calculator";
import { PartnershipContactSection } from "@/components/sections/partnership-contact-section";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header />
      <Hero />
      <CatalogPreview />
      <CatalogProductsGrid />
      <B2BCalculatorSection />
      <PartnershipContactSection />
      <Footer />
    </main>
  );
}
