"use client";

import { motion } from "framer-motion";
import decants from "@/data/decants.json";
import completos from "@/data/completos.json";

const MARCAS = Array.from(
  new Set([...decants, ...completos].map(p => p.marca))
).sort();

const STATS = [
  { value: "35+", label: "Fragancias" },
  { value: "15", label: "Casas" },
  { value: "5/10ml", label: "Decants" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      {/* Fondo: spotlight radial + viñeta */}
      <div className="absolute inset-0 bg-brand-black" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(247,243,238,0.07), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-black" />

      {/* Wordmark fantasma */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="text-outline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] font-serif italic text-[42vw] leading-none select-none pointer-events-none"
      >
        XP
      </motion.span>

      {/* Contenido */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="block w-10 sm:w-16 h-px bg-brand-gray/40" />
          <p className="font-sans text-[10px] sm:text-xs text-brand-gray uppercase tracking-[0.5em]">
            Casa de fragancias
          </p>
          <span className="block w-10 sm:w-16 h-px bg-brand-gray/40" />
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[17vw] sm:text-8xl md:text-9xl text-brand-white leading-[0.95] tracking-tight"
        >
          Deluxe{" "}
          <span className="italic font-light text-brand-chalk">XP</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-lg sm:text-2xl text-brand-chalk/85 mt-7 max-w-xl text-balance font-light"
        >
          La fragancia correcta no se elige — se reconoce.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="font-sans text-xs sm:text-sm text-brand-gray tracking-wider mt-4"
        >
          Decants para descubrir. Completos para quedarte. Pide con un mensaje.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-10 w-full sm:w-auto"
        >
          <a
            href="#decants"
            className="px-10 py-4 bg-brand-offwhite text-brand-black text-[11px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-brand-white transition-colors duration-300 shadow-luxe-sm"
          >
            Explorar decants
          </a>
          <a
            href="#completos"
            className="px-10 py-4 border border-brand-gray/40 text-brand-chalk text-[11px] tracking-[0.25em] uppercase font-sans hover:border-brand-chalk hover:text-brand-white transition-all duration-300"
          >
            Frascos completos
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.15 }}
          className="flex items-center justify-center gap-8 sm:gap-12 pt-14"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-8 sm:gap-12">
              {i > 0 && <span className="block w-px h-8 bg-brand-gray/25" />}
              <div className="text-center">
                <p className="font-serif text-xl sm:text-2xl text-brand-white tabular-nums">
                  {s.value}
                </p>
                <p className="font-sans text-[9px] sm:text-[10px] text-brand-gray uppercase tracking-[0.3em] mt-1">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee de casas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="relative z-10 border-t border-brand-white/[0.06] py-5 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-black to-transparent z-10" />
        <div className="flex w-max animate-marquee">
          {[...MARCAS, ...MARCAS].map((marca, i) => (
            <span
              key={`${marca}-${i}`}
              className="flex items-center font-serif italic text-sm text-brand-gray/55 whitespace-nowrap"
            >
              <span className="px-8">{marca}</span>
              <span className="w-1 h-1 rounded-full bg-brand-gray/30" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
