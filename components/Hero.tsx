"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background subtle texture */}
      <div className="absolute inset-0 bg-brand-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Brand mark */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-sans text-xs text-brand-gray uppercase tracking-[0.4em]"
        >
          Fragancias
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-brand-white tracking-widest uppercase"
        >
          Deluxe XP
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-sans text-sm text-brand-chalk tracking-wider max-w-md mx-auto"
        >
          Encuentra tu fragancia. Pídela con un mensaje.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <a
            href="#decants"
            className="px-8 py-3 border border-brand-white text-brand-white text-sm tracking-widest uppercase hover:bg-brand-white hover:text-brand-black transition-all duration-300"
          >
            Ver Decants
          </a>
          <a
            href="#completos"
            className="px-8 py-3 bg-brand-white text-brand-black text-sm tracking-widest uppercase hover:bg-brand-offwhite transition-all duration-300"
          >
            Ver Completos
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-brand-gray text-xs tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-brand-gray to-transparent"
        />
      </motion.div>
    </section>
  );
}
