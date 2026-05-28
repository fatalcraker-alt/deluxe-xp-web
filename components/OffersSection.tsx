"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const PROMO_ID = "promo-sky-mandarin-mega";
const WHATSAPP = "523313198549";

export default function OffersSection() {
  const { addItem } = useCart();

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
    <section id="ofertas" className="bg-brand-black border-t border-brand-gray/10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-10"
        >
          <div className="space-y-3">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-brand-gray">Promociones</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-white uppercase tracking-widest">Ofertas</h2>
          </div>

          {/* Promo activa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-brand-gray/25 p-8 space-y-5 max-w-md mx-auto"
          >
            <div className="space-y-1">
              <span className="font-sans text-[10px] tracking-widest uppercase text-brand-gray border border-brand-gray/30 px-2 py-0.5">Activa</span>
            </div>
            <h3 className="font-serif text-2xl text-brand-white leading-tight">
              Sky Mandarin<br />
              <span className="text-brand-gray text-lg">+</span><br />
              Odyssey Mega
            </h3>
            <p className="font-sans text-xs text-brand-gray tracking-wider">10ml + 10ml — Decants</p>
            <div className="border-t border-brand-gray/15 pt-5 space-y-4">
              <p className="font-serif text-4xl text-brand-white">$220</p>
              <button
                onClick={addPromo}
                className="w-full py-3 bg-brand-white text-brand-black font-sans text-xs tracking-widest uppercase hover:bg-brand-offwhite transition-colors duration-200"
              >
                Agregar al carrito
              </button>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola! Me interesa la promo de Sky Mandarin + Odyssey Mega (10ml c/u) en $220. ¿Tienen disponible?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 border border-brand-gray/30 text-brand-gray font-sans text-xs tracking-widest uppercase hover:border-brand-white hover:text-brand-white transition-all duration-200"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </motion.div>

          <p className="font-sans text-xs text-brand-gray/40 tracking-wider">
            Las promociones cambian frecuentemente. Escríbenos para conocer las más recientes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
