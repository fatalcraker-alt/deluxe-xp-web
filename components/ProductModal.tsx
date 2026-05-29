"use client";

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

function UsoIndicator({ uso }: { uso: string }) {
  const isDia = uso === "día" || uso === "día/noche";
  const isNoche = uso === "noche" || uso === "día/noche";
  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center gap-1.5 ${isDia ? "opacity-100" : "opacity-25"}`}>
        <svg className="w-3.5 h-3.5 text-brand-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 101.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 001.06 1.06l1.59-1.59a.75.75 0 00-1.06-1.061l-1.59 1.59z" />
        </svg>
        <span className="font-sans text-[10px] tracking-widest uppercase text-brand-white">Día</span>
      </div>
      <div className="w-px h-3 bg-brand-gray/30" />
      <div className={`flex items-center gap-1.5 ${isNoche ? "opacity-100" : "opacity-25"}`}>
        <svg className="w-3 h-3 text-brand-white" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>
        <span className="font-sans text-[10px] tracking-widest uppercase text-brand-white">Noche</span>
      </div>
    </div>
  );
}

interface Props {
  product: Decant | Completo | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { addItem } = useCart();

  if (!product) return null;

  const detail = details[product.id] ?? null;
  const decant = isDecant(product) ? product : null;
  const completo = !isDecant(product) ? product : null;
  const imagen = (product as Decant & Completo).imagen;

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="w-full sm:max-w-xl bg-brand-black border border-brand-gray/20 max-h-[92vh] overflow-y-auto"
        >
          {/* Hero: imagen + info base */}
          <div className="relative">
            {imagen ? (
              <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-brand-black">
                <Image
                  src={imagen}
                  alt={product.nombre}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 640px) 100vw, 576px"
                />
                {/* Gradient overlay bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent pointer-events-none" />
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 bg-brand-black/60 backdrop-blur-sm border border-brand-gray/30 flex items-center justify-center text-brand-gray hover:text-brand-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Overlay text */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-gray/80">{product.marca}</p>
                  <h2 className="font-serif text-2xl sm:text-3xl text-brand-white mt-1 leading-tight">{product.nombre}</h2>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between p-6 border-b border-brand-gray/15">
                <div>
                  <p className="font-sans text-xs text-brand-gray tracking-widest uppercase">{product.marca}</p>
                  <h2 className="font-serif text-2xl text-brand-white mt-1 leading-tight">{product.nombre}</h2>
                </div>
                <button onClick={onClose} className="text-brand-gray hover:text-brand-white transition-colors p-1 ml-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Tags + uso */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2 flex-wrap">
                <span className="font-sans text-[10px] tracking-widest uppercase border border-brand-gray/30 text-brand-gray px-2 py-0.5">{product.genero}</span>
                <span className="font-sans text-[10px] tracking-widest uppercase border border-brand-gray/30 text-brand-gray px-2 py-0.5">{product.categoria}</span>
              </div>
              <UsoIndicator uso={product.uso} />
            </div>

            {/* Descripción */}
            {detail?.descripcion && (
              <p className="font-sans text-sm text-brand-chalk leading-relaxed border-l border-brand-gray/20 pl-4">
                {detail.descripcion}
              </p>
            )}

            {/* Notas olfativas */}
            {detail && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-brand-gray">Perfil olfativo</p>
                  <div className="flex-1 h-px bg-brand-gray/15" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Salida", notas: detail.notasTop },
                    { label: "Corazón", notas: detail.notasCorazon },
                    { label: "Fondo", notas: detail.notasFondo },
                  ].map(({ label, notas }) => (
                    <div key={label} className="space-y-2">
                      <p className="font-sans text-[9px] tracking-widest uppercase text-brand-gray/60">{label}</p>
                      <div className="space-y-1">
                        {notas.map(n => (
                          <p key={n} className="font-sans text-xs text-brand-chalk leading-snug">{n}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Temporada e intensidad */}
            {detail && (
              <div className="flex gap-0 border border-brand-gray/15">
                <div className="flex-1 p-3 border-r border-brand-gray/15">
                  <p className="font-sans text-[9px] tracking-widest uppercase text-brand-gray/60 mb-1">Temporada</p>
                  <p className="font-sans text-xs text-brand-chalk">{detail.temporada.join(" · ")}</p>
                </div>
                <div className="flex-1 p-3">
                  <p className="font-sans text-[9px] tracking-widest uppercase text-brand-gray/60 mb-1">Intensidad</p>
                  <p className="font-sans text-xs text-brand-chalk">{detail.intensidad}</p>
                </div>
              </div>
            )}

            {!detail && (
              <p className="font-sans text-xs text-brand-gray/40 text-center py-4 tracking-wider">
                Información detallada próximamente.
              </p>
            )}

            {/* CTA */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-brand-gray">Agregar al carrito</p>
                <div className="flex-1 h-px bg-brand-gray/15" />
              </div>
              {decant ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAdd("5ml", 5, decant.precio5ml)}
                    className="border border-brand-gray/25 p-4 text-center hover:border-brand-white hover:bg-brand-white/5 transition-all duration-200 group"
                  >
                    <p className="font-sans text-[10px] text-brand-gray group-hover:text-brand-white uppercase tracking-widest">5 ml</p>
                    <p className="font-serif text-xl text-brand-white mt-1">${decant.precio5ml}</p>
                  </button>
                  <button
                    onClick={() => handleAdd("10ml", 10, decant.precio10ml)}
                    className="border border-brand-gray/25 p-4 text-center hover:border-brand-white hover:bg-brand-white/5 transition-all duration-200 group"
                  >
                    <p className="font-sans text-[10px] text-brand-gray group-hover:text-brand-white uppercase tracking-widest">10 ml</p>
                    <p className="font-serif text-xl text-brand-white mt-1">${decant.precio10ml}</p>
                  </button>
                </div>
              ) : completo ? (
                <button
                  onClick={() => handleAdd(`${completo.ml}ml`, completo.ml, completo.precio)}
                  className="w-full border border-brand-gray/25 p-4 text-center hover:border-brand-white hover:bg-brand-white/5 transition-all duration-200 group"
                >
                  <p className="font-sans text-[10px] text-brand-gray group-hover:text-brand-white uppercase tracking-widest">{completo.ml} ml — Botella completa</p>
                  <p className="font-serif text-2xl text-brand-white mt-1">${completo.precio.toLocaleString("es-MX")}</p>
                </button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
