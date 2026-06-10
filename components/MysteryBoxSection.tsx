"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const WHATSAPP = "523313198549";
const MSG = encodeURIComponent("Hola! Me interesa el Mystery Box. ¿Qué opciones tienen disponibles?");

const PASOS = [
  { n: "i", titulo: "Cuéntanos de ti", desc: "Tu estilo, lo que usas, lo que buscas — o déjalo 100% sorpresa." },
  { n: "ii", titulo: "Curamos tu caja", desc: "Selección a mano de decants y completos pensada para tu perfil." },
  { n: "iii", titulo: "La abres", desc: "Fragancias que no habrías elegido — y que no vas a soltar." },
];

export default function MysteryBoxSection() {
  return (
    <section id="mystery" className="relative bg-brand-black py-24 sm:py-32 px-5 sm:px-8 overflow-hidden scroll-mt-10">
      {/* Glow de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 75% 50%, rgba(247,243,238,0.05), transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          number="04"
          eyebrow="Exclusivo"
          title="Mystery Box"
          subtitle="No sabes exactamente qué viene. Sabemos que te va a gustar."
        />

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Pasos */}
          <motion.ol
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-0 divide-y divide-brand-white/[0.07] border-y border-brand-white/[0.07]"
          >
            {PASOS.map(paso => (
              <li key={paso.n} className="py-6 grid grid-cols-[48px_1fr] gap-5 items-baseline">
                <span className="font-serif italic text-2xl text-brand-gray/60">{paso.n}</span>
                <div>
                  <h3 className="font-serif text-xl text-brand-white">{paso.titulo}</h3>
                  <p className="font-sans text-sm text-brand-gray mt-1.5 leading-relaxed">
                    {paso.desc}
                  </p>
                </div>
              </li>
            ))}
          </motion.ol>

          {/* Caja + CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-8"
          >
            {/* Caja sellada estilizada */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
              <div className="absolute inset-0 bg-brand-coal border border-brand-white/[0.1] shadow-luxe" />
              <div className="absolute -top-2.5 -right-2.5 w-full h-full border border-brand-white/[0.08] pointer-events-none" />
              {/* Listón vertical */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-brand-offwhite/[0.06] border-x border-brand-white/[0.07]" />
              {/* Sello */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-brand-chalk/40 flex items-center justify-center bg-brand-black/60 backdrop-blur-sm">
                <span className="font-serif italic text-2xl text-brand-chalk animate-shimmer select-none">
                  XP
                </span>
              </div>
              <p className="absolute bottom-5 inset-x-0 text-center font-sans text-[9px] tracking-[0.4em] uppercase text-brand-gray/70">
                Curada con criterio
              </p>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP}?text=${MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-brand-offwhite text-brand-black text-[11px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-brand-white transition-colors duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Pedir mi Mystery Box
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
