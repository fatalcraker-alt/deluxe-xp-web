"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

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
      className={`fixed top-0 w-full z-40 transition-all duration-400 ${
        scrolled
          ? "bg-brand-black/95 backdrop-blur-sm border-b border-brand-gray/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-sm text-brand-white tracking-widest uppercase">
          Deluxe XP
        </a>

        <nav className="hidden sm:flex items-center gap-8">
          <a href="#decants" className="font-sans text-xs text-brand-gray hover:text-brand-white transition-colors tracking-widest uppercase">Decants</a>
          <a href="#completos" className="font-sans text-xs text-brand-gray hover:text-brand-white transition-colors tracking-widest uppercase">Completos</a>
          <a href="#mystery" className="font-sans text-xs text-brand-gray hover:text-brand-white transition-colors tracking-widest uppercase">Mystery</a>
        </nav>

        <button
          onClick={openCart}
          className="relative p-2 text-brand-gray hover:text-brand-white transition-colors"
          aria-label="Abrir carrito"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-white text-brand-black text-[9px] flex items-center justify-center font-sans font-bold">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
