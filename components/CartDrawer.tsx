"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const WHATSAPP = "523313198549";

function buildWhatsAppUrl(
  items: ReturnType<typeof useCart>["items"],
  subtotal: number,
  porcentaje: number,
  monto: number,
  total: number
): string {
  let msg = "Hola! Quisiera hacer el siguiente pedido:\n\n";
  items.forEach(item => {
    msg += `• ${item.cantidad}x ${item.nombre} ${item.size} — $${(item.precioUnitario * item.cantidad).toLocaleString("es-MX")}\n`;
  });
  msg += `\nSubtotal: $${subtotal.toLocaleString("es-MX")}`;
  if (porcentaje > 0) {
    msg += `\nDescuento (${porcentaje * 100}%): -$${monto.toLocaleString("es-MX", { maximumFractionDigits: 0 })}`;
    msg += `\nTotal: $${total.toLocaleString("es-MX", { maximumFractionDigits: 0 })}`;
  }
  msg += "\n\n¿Pueden confirmarme disponibilidad?";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

export default function CartDrawer() {
  const {
    items, removeItem, updateCantidad, clearCart,
    itemCount, subtotal, subtotalDecants, porcentajeDescuento, montoDescuento, total,
    isOpen, closeCart,
  } = useCart();

  const nextTier = subtotalDecants < 500 ? 500 : subtotalDecants < 700 ? 700 : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-brand-black border-l border-brand-gray/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gray/15">
              <div>
                <h2 className="font-serif text-lg text-brand-white tracking-widest uppercase">Carrito</h2>
                {itemCount > 0 && (
                  <p className="font-sans text-xs text-brand-gray mt-0.5">{itemCount} {itemCount === 1 ? "artículo" : "artículos"}</p>
                )}
              </div>
              <button onClick={closeCart} className="text-brand-gray hover:text-brand-white transition-colors p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <p className="font-sans text-brand-gray text-sm">Tu carrito está vacío.</p>
                  <p className="font-sans text-brand-gray/50 text-xs">Agrega fragancias desde el catálogo.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.cartId} className="border border-brand-gray/15 p-4 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-serif text-sm text-brand-white leading-tight">{item.nombre}</p>
                        <p className="font-sans text-xs text-brand-gray mt-0.5">{item.size} — ${item.precioUnitario} c/u</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="text-brand-gray/50 hover:text-brand-white transition-colors text-xs mt-0.5"
                        aria-label="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateCantidad(item.cartId, -1)}
                          className="w-7 h-7 border border-brand-gray/30 text-brand-gray hover:border-brand-white hover:text-brand-white transition-colors text-sm flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="font-sans text-sm text-brand-white w-4 text-center">{item.cantidad}</span>
                        <button
                          onClick={() => updateCantidad(item.cartId, 1)}
                          className="w-7 h-7 border border-brand-gray/30 text-brand-gray hover:border-brand-white hover:text-brand-white transition-colors text-sm flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-serif text-sm text-brand-white">
                        ${(item.precioUnitario * item.cantidad).toLocaleString("es-MX")}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-brand-gray/15 px-6 py-5 space-y-4">
                {/* Discount hint */}
                {nextTier && (
                  <div className="bg-brand-gray/10 px-4 py-3 text-center">
                    <p className="font-sans text-xs text-brand-gray">
                      {subtotalDecants < 500
                        ? `Agrega $${(500 - subtotalDecants).toFixed(0)} más en decants y obtén 5% de descuento`
                        : `Agrega $${(700 - subtotalDecants).toFixed(0)} más en decants y obtén 10% de descuento`
                      }
                    </p>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-brand-gray">Subtotal</span>
                    <span className="text-brand-white">${subtotal.toLocaleString("es-MX")}</span>
                  </div>
                  {porcentajeDescuento > 0 && (
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-green-400">Descuento {porcentajeDescuento * 100}%</span>
                      <span className="text-green-400">−${montoDescuento.toLocaleString("es-MX", { maximumFractionDigits: 0 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif text-lg pt-1 border-t border-brand-gray/15">
                    <span className="text-brand-white">Total</span>
                    <span className="text-brand-white">${total.toLocaleString("es-MX", { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                {/* Discount rules */}
                <p className="font-sans text-[10px] text-brand-gray/50 text-center leading-relaxed">
                  Descuento aplica solo en decants · +$500 → 5% · +$700 → 10%
                </p>

                {/* CTA */}
                <a
                  href={buildWhatsAppUrl(items, subtotal, porcentajeDescuento, montoDescuento, total)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white font-sans text-xs tracking-widest uppercase hover:bg-[#20bd5a] transition-colors duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Pedir por WhatsApp
                </a>

                <button
                  onClick={clearCart}
                  className="w-full text-center font-sans text-xs text-brand-gray/50 hover:text-brand-gray transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
