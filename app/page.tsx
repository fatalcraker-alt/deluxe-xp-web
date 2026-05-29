import Hero from "@/components/Hero";
import CatalogSection from "@/components/CatalogSection";
import MysteryBoxSection from "@/components/MysteryBoxSection";
import OffersSection from "@/components/OffersSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import decants from "@/data/decants.json";
import completos from "@/data/completos.json";
import { Decant, Completo } from "@/types/catalog";

export default function Home() {
  return (
    <main>
      <Hero />
      <CatalogSection
        id="decants"
        title="Decants"
        subtitle="Prueba antes de comprometerte — 5ml y 10ml de tus favoritos."
        products={decants as Decant[]}
      />
      <CatalogSection
        id="completos"
        title="Completos"
        subtitle="La experiencia completa. Hazlo tuyo."
        products={completos as Completo[]}
        dark={false}
      />
      <OffersSection />
      <MysteryBoxSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
