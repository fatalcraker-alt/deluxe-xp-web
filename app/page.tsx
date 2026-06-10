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
      <OffersSection />
      <CatalogSection
        id="decants"
        number="02"
        title="Los Decants"
        subtitle="Prueba antes de comprometerte — 5ml y 10ml de tus favoritos, al precio justo."
        products={decants as Decant[]}
      />
      <CatalogSection
        id="completos"
        number="03"
        title="Los Completos"
        subtitle="La experiencia completa. El frasco en tu repisa."
        products={completos as Completo[]}
        dark={false}
      />
      <MysteryBoxSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
