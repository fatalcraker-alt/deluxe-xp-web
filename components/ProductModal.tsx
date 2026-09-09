"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Decant, Completo, ProductDetail } from "@/types/catalog";
import productDetails from "@/data/product-details.json";

type Details = Record<string, ProductDetail>;
const details = productDetails as Details;

function isDecant(p: Decant | Completo): p is Decant {
  return "precio5ml" in p;
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 101.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 001.06 1.06l1.59-1.59a.75.75 0 00-1.06-1.061l-1.59 1.59z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface Props {
  product: Decant | Completo | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { addItem } = useCart();

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const detail = details[product.id] ?? null;
  const decant = isDecant(product) ? product : null;
  const completo = !isDecant(product) ? product : null;
  const imagen = (product as Decant & Completo).imagen;
  const isDia = product.uso === "día" || product.uso === "día/noche";
  const isNoche = product.uso === "noche" || product.uso === "día/noche";

  const handleAdd = (size: string, ml: number, precio: number) => {
    addItem({
      cartId: `${product.id}-${size}`,
      productId: product.id,
      nombre: product.nombre,
      marca: product.marca,
      type: decant ? "decant" : "completo",
      size,
      ml,
      precioUnitario: precio,
    });
  };

  const notas = detail
    ? [
        { label: "Salida", desc: "Primera impresión", notas: detail.notasTop },
        { label: "Corazón", desc: "El carácter", notas: detail.notasCorazon },
        { label: "Fondo", desc: "Lo que permanece", notas: detail.notasFondo },
      ]
    : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-black/85 z-50 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={product.nombre}
      >
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", damping: 32, stiffness: 320 }}
          onClick={e => e.stopPropagation()}
          className="w-full sm:max-w-4xl bg-brand-coal border border-brand-white/[0.08] shadow-luxe-lg max-h-[94dvh] sm:max-h-[88vh] overflow-y-auto sm:overflow-hidden grid sm:grid-cols-[44%_56%]"
        >
          {/* Columna imagen */}
          <div className="relative bg-brand-black h-60 sm:h-auto sm:min-h-[560px]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(247,243,238,0.12), transparent 72%)",
              }}
            />
            {imagen && (
              <Image
                src={imagen}
                alt={product.nombre}
                fill
                className="object-contain p-8 sm:p-12"
                sizes="(max-width: 640px) 100vw, 400px"
              />
            )}
            {/* Botón cerrar (mobile: sobre la imagen) */}
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="sm:hidden absolute top-4 right-4 w-11 h-11 bg-brand-black/60 backdrop-blur-sm border border-brand-white/15 flex items-center justify-center text-brand-chalk"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Columna contenido */}
          <div className="relative sm:overflow-y-auto sm:max-h-[88vh]">
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="hidden sm:flex absolute top-5 right-5 w-10 h-10 border border-brand-white/10 items-center justify-center text-brand-gray hover:text-brand-white hover:border-brand-white/30 transition-colors z-10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6 sm:p-10 space-y-7">
              {/* Encabezado */}
              <div>
                <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-brand-gray">
                  {product.marca}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-white mt-2 leading-tight pr-10">
                  {product.nombre}
                </h2>
                {/* Meta */}
                <div className="flex items-center gap-4 mt-4 flex-wrap">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-chalk/80">
                    {product.genero}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-brand-gray/40" />
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-chalk/80">
                    {product.categoria}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-brand-gray/40" />
                  <span className="flex items-center gap-2.5">
                    <span className={`flex items-center gap-1 ${isDia ? "text-brand-chalk" : "text-brand-gray/30"}`}>
                      <SunIcon className="w-3.5 h-3.5" />
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase">Día</span>
                    </span>
                    <span className={`flex items-center gap-1 ${isNoche ? "text-brand-chalk" : "text-brand-gray/30"}`}>
                      <MoonIcon className="w-3 h-3" />
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase">Noche</span>
                    </span>
                  </span>
                </div>
              </div>

              {/* Descripción */}
              {detail?.descripcion && (
                <p className="font-serif italic text-base sm:text-lg text-brand-chalk/90 leading-relaxed font-light">
                  “{detail.descripcion}”
                </p>
              )}

              {/* Pirámide olfativa */}
              {detail && (
                <div>
                  <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-gray mb-4">
                    Pirámide olfativa
                  </p>
                  <div className="divide-y divide-brand-white/[0.06] border-y border-brand-white/[0.06]">
                    {notas.map(({ label, desc, notas: ns }) => (
                      <div key={label} className="py-3.5 grid grid-cols-[88px_1fr] gap-4 items-baseline">
                        <div>
                          <p className="font-serif italic text-sm text-brand-white">{label}</p>
                          <p className="font-sans text-[9px] text-brand-gray/70 tracking-wider mt-0.5">{desc}</p>
                        </div>
                        <p className="font-sans text-xs text-brand-chalk/85 leading-relaxed">
                          {ns.join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Temporada + intensidad */}
              {detail && (
                <div className="flex gap-10">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-brand-gray mb-1.5">
                      Temporada
                    </p>
                    <p className="font-serif italic text-sm text-brand-chalk">
                      {detail.temporada.join(" · ")}
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-brand-gray mb-1.5">
                      Intensidad
                    </p>
                    <p className="font-serif italic text-sm text-brand-chalk">{detail.intensidad}</p>
                  </div>
                </div>
              )}

              {!detail && (
                <p className="font-sans text-xs text-brand-gray/50 tracking-wider py-2">
                  Información detallada próximamente.
                </p>
              )}

              {/* CTA */}
              <div className="pt-2 pb-2">
                {decant ? (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { size: "5ml", ml: 5, precio: decant.precio5ml },
                      { size: "10ml", ml: 10, precio: decant.precio10ml },
                    ].map(opt => (
                      <button
                        key={opt.size}
                        onClick={() => handleAdd(opt.size, opt.ml, opt.precio)}
                        className="group bg-brand-offwhite hover:bg-brand-white text-brand-black p-4 text-left transition-colors duration-300 active:scale-[0.98]"
                      >
                        <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-brand-black/55">
                          Decant {opt.size}
                        </p>
                        <p className="flex items-center justify-between mt-1">
                          <span className="font-serif text-2xl tabular-nums">${opt.precio}</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </p>
                      </button>
                    ))}
                  </div>
                ) : completo ? (
                  <button
                    onClick={() => handleAdd(`${completo.ml}ml`, completo.ml, completo.precio)}
                    className="w-full bg-brand-offwhite hover:bg-brand-white text-brand-black p-5 text-left transition-colors duration-300 active:scale-[0.99]"
                  >
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-brand-black/55">
                      Frasco completo · {completo.ml} ml
                    </p>
                    <p className="flex items-center justify-between mt-1">
                      <span className="font-serif text-3xl tabular-nums">
                        ${completo.precio.toLocaleString("es-MX")}
                      </span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </p>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
