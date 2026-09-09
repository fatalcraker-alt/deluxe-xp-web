"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import SectionHeading from "@/components/SectionHeading";

const PROMO_ID = "promo-sky-mandarin-mega";
const WHATSAPP = "523313198549";

export default function OffersSection() {
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);

  const addPromo = () => {
    addItem({
      cartId: PROMO_ID,
      productId: PROMO_ID,
      nombre: "Promo: Sky Mandarin + Mega",
      marca: "Afnan / Armaf",
      type: "decant",
      size: "10ml c/u",
      ml: 20,
      precioUnitario: 220,
    });
  };

  return (
    <section id="ofertas" className="relative bg-brand-black py-24 sm:py-32 px-5 sm:px-8 overflow-hidden scroll-mt-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          number="01"
          eyebrow="Por tiempo limitado"
          title="La oferta"
          subtitle="Las promociones rotan seguido — esta es la activa hoy."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          {/* Imagen con marco editorial desplazado */}
          <div className="relative order-1 md:order-none">
            <div className="absolute -top-3 -left-3 w-full h-full border border-brand-white/[0.12] pointer-events-none" />
            {!imgError ? (
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-brand-coal">
                <Image
                  src="/images/ofertas/sky-mandarin-mega.jpg"
                  alt="Promoción: Sky Mandarin + Odyssey Mega, decants de 10ml"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <div className="relative w-full aspect-[4/3] bg-brand-coal flex items-center justify-center">
                <div className="text-center space-y-2 px-4">
                  <p className="font-serif italic text-brand-chalk/70 text-lg">Sky Mandarin</p>
                  <p className="font-sans text-brand-gray/40 text-xs">+</p>
                  <p className="font-serif italic text-brand-chalk/70 text-lg">Odyssey Mega</p>
                </div>
              </div>
            )}
            <span className="absolute top-4 left-4 bg-brand-offwhite text-brand-black font-sans text-[9px] tracking-[0.3em] uppercase px-3 py-1.5">
              Promo activa
            </span>
          </div>

          {/* Contenido */}
          <div className="space-y-7">
            <div>
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-gray">
                Afnan · Armaf
              </p>
              <h3 className="font-serif text-4xl sm:text-5xl text-brand-white leading-[1.05] mt-3">
                Sky Mandarin{" "}
                <span className="font-light italic text-brand-chalk">&</span>{" "}
                Odyssey Mega
              </h3>
              <p className="font-sans text-sm text-brand-gray mt-4 leading-relaxed max-w-md">
                Dúo de decants de 10ml — cítrico fresco para el día, dulce
                ambarado para la noche. Los dos lados de la moneda.
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <p className="font-serif text-5xl text-brand-white tabular-nums">$220</p>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-brand-gray">
                10ml + 10ml
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={addPromo}
                className="px-9 py-4 bg-brand-offwhite text-brand-black font-sans text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-brand-white transition-colors duration-300 active:scale-[0.98]"
              >
                Agregar al carrito
              </button>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola! Me interesa la promo de Sky Mandarin + Odyssey Mega (10ml c/u) en $220. ¿Tienen disponible?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-9 py-4 border border-brand-gray/40 text-brand-chalk font-sans text-[11px] tracking-[0.25em] uppercase text-center hover:border-brand-chalk hover:text-brand-white transition-all duration-300"
              >
                Consultar
              </a>
            </div>

            <p className="font-sans text-[11px] text-brand-gray/50 tracking-wider">
              Las promociones cambian frecuentemente — escríbenos para conocer las más recientes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
