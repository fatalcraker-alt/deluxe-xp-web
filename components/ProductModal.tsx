"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Decant, Completo, ProductDetail } from "@/types/catalog";
import productDetails from "@/data/product-details.json";

type Details = Record<string, ProductDetail>;
const details = productDetails as Details;

function isDecant(p: Decant | Completo): p is Decant {
  return "precio5ml" in p;
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
        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="w-full sm:max-w-lg bg-brand-black border border-brand-gray/20 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-brand-gray/15">
            <div>
              <p className="font-sans text-xs text-brand-gray tracking-widest uppercase">{product.marca}</p>
              <h2 className="font-serif text-2xl text-brand-white mt-1 leading-tight">{product.nombre}</h2>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="font-sans text-[10px] tracking-widest uppercase border border-brand-gray/30 text-brand-gray px-2 py-0.5">{product.uso}</span>
                <span className="font-sans text-[10px] tracking-widest uppercase border border-brand-gray/30 text-brand-gray px-2 py-0.5">{product.genero}</span>
                <span className="font-sans text-[10px] tracking-widest uppercase border border-brand-gray/30 text-brand-gray px-2 py-0.5">{product.categoria}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-brand-gray hover:text-brand-white transition-colors p-1 ml-4 flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Descripción */}
            {detail?.descripcion && (
              <p className="font-sans text-sm text-brand-chalk leading-relaxed">{detail.descripcion}</p>
            )}

            {/* Notas olfativas */}
            {detail && (
              <div className="space-y-3">
                <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-gray">Notas olfativas</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Salida", notas: detail.notasTop },
                    { label: "Corazón", notas: detail.notasCorazon },
                    { label: "Fondo", notas: detail.notasFondo },
                  ].map(({ label, notas }) => (
                    <div key={label} className="border border-brand-gray/15 p-3 space-y-2">
                      <p className="font-sans text-[10px] tracking-widest uppercase text-brand-gray">{label}</p>
                      <ul className="space-y-1">
                        {notas.map(n => (
                          <li key={n} className="font-sans text-xs text-brand-chalk">{n}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Temporada e intensidad */}
            {detail && (
              <div className="flex gap-6">
                <div>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-brand-gray mb-1">Temporada</p>
                  <p className="font-sans text-xs text-brand-chalk">{detail.temporada.join(" · ")}</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-brand-gray mb-1">Intensidad</p>
                  <p className="font-sans text-xs text-brand-chalk">{detail.intensidad}</p>
                </div>
              </div>
            )}

            {/* Sin detalle */}
            {!detail && (
              <p className="font-sans text-xs text-brand-gray/50 text-center py-4">
                Información detallada próximamente.
              </p>
            )}

            {/* Agregar al carrito */}
            <div className="border-t border-brand-gray/15 pt-5 space-y-3">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-gray">Agregar al carrito</p>
              {decant ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAdd("5ml", 5, decant.precio5ml)}
                    className="border border-brand-gray/30 p-3 text-center hover:border-brand-white hover:bg-brand-white/5 transition-all duration-200 group"
                  >
                    <p className="font-sans text-xs text-brand-gray group-hover:text-brand-white uppercase tracking-wider">5 ml</p>
                    <p className="font-serif text-lg text-brand-white mt-1">${decant.precio5ml}</p>
                  </button>
                  <button
                    onClick={() => handleAdd("10ml", 10, decant.precio10ml)}
                    className="border border-brand-gray/30 p-3 text-center hover:border-brand-white hover:bg-brand-white/5 transition-all duration-200 group"
                  >
                    <p className="font-sans text-xs text-brand-gray group-hover:text-brand-white uppercase tracking-wider">10 ml</p>
                    <p className="font-serif text-lg text-brand-white mt-1">${decant.precio10ml}</p>
                  </button>
                </div>
              ) : completo ? (
                <button
                  onClick={() => handleAdd(`${completo.ml}ml`, completo.ml, completo.precio)}
                  className="w-full border border-brand-gray/30 p-4 text-center hover:border-brand-white hover:bg-brand-white/5 transition-all duration-200 group"
                >
                  <p className="font-sans text-xs text-brand-gray group-hover:text-brand-white uppercase tracking-wider">{completo.ml} ml — Completo</p>
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
