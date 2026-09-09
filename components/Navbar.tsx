"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { href: "#ofertas", label: "Ofertas" },
  { href: "#decants", label: "Decants" },
  { href: "#completos", label: "Completos" },
  { href: "#mystery", label: "Mystery" },
];

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-500 ease-luxe ${
        scrolled
          ? "bg-brand-black/85 backdrop-blur-md border-b border-brand-white/[0.06] shadow-luxe-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-serif text-base text-brand-white tracking-[0.25em] uppercase select-none"
        >
          Deluxe&nbsp;<span className="italic font-light text-brand-chalk">XP</span>
        </a>

        <nav className="hidden md:flex items-center gap-9" aria-label="Secciones">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-sans text-[11px] text-brand-gray hover:text-brand-white transition-colors duration-300 tracking-[0.22em] uppercase py-2"
            >
              {l.label}
              <span className="absolute left-0 -bottom-0.5 h-px w-full bg-brand-chalk origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-luxe" />
            </a>
          ))}
        </nav>

        <button
          onClick={openCart}
          className="relative flex items-center justify-center w-11 h-11 text-brand-chalk hover:text-brand-white transition-colors duration-300"
          aria-label={`Abrir carrito${itemCount > 0 ? ` (${itemCount} artículos)` : ""}`}
        >
          <svg className="w-[21px] h-[21px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
            />
          </svg>
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className="absolute top-1 right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-brand-offwhite text-brand-black text-[10px] flex items-center justify-center font-sans font-semibold tabular-nums"
              >
                {itemCount > 9 ? "9+" : itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
}
