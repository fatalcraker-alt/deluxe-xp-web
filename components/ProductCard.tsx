"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Decant, Completo } from "@/types/catalog";

function UsoBadge({ uso, dark }: { uso: string; dark: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase font-sans px-2.5 py-1 backdrop-blur-sm ${
        dark
          ? "bg-brand-black/55 text-brand-chalk/90"
          : "bg-brand-white/75 text-brand-black/70"
      }`}
    >
      <span className={`w-1 h-1 rounded-full ${dark ? "bg-brand-chalk/70" : "bg-brand-black/50"}`} />
      {uso}
    </span>
  );
}

const cardMotion = (index: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] as const },
});

interface DecantCardProps {
  product: Decant;
  index: number;
  onOpenModal: (p: Decant) => void;
}

export function DecantCard({ product, index, onOpenModal }: DecantCardProps) {
  const { addItem } = useCart();

  const add = (size: string, ml: number, precio: number, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      cartId: `${product.id}-${size}`,
      productId: product.id,
      nombre: product.nombre,
      marca: product.marca,
      type: "decant",
      size,
      ml,
      precioUnitario: precio,
    });
  };

  return (
    <motion.article
      {...cardMotion(index)}
      onClick={() => onOpenModal(product)}
      className="group bg-brand-coal border border-brand-white/[0.06] hover:border-brand-white/[0.16] hover:shadow-luxe hover:-translate-y-1 transition-all duration-500 ease-luxe flex flex-col cursor-pointer"
    >
      {/* Imagen con spotlight */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <div
          className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(247,243,238,0.10), transparent 72%)",
          }}
        />
        {product.imagen && (
          <Image
            src={product.imagen}
            alt={product.nombre}
            fill
            className="object-contain p-6 group-hover:scale-[1.06] transition-transform duration-700 ease-luxe"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        <div className="absolute top-3 left-3">
          <UsoBadge uso={product.uso} dark />
        </div>
        {/* Hint de detalle */}
        <div className="absolute bottom-0 inset-x-0 flex justify-center pb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-brand-chalk/80 bg-brand-black/55 backdrop-blur-sm px-3 py-1.5">
            Ver detalles
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-5 pt-4 pb-5 flex-1 flex flex-col">
        <p className="font-sans text-[10px] text-brand-gray tracking-[0.28em] uppercase">
          {product.marca}
        </p>
        <h3 className="font-serif text-lg text-brand-white leading-snug mt-1.5 group-hover:text-brand-chalk transition-colors duration-300">
          {product.nombre}
        </h3>

        <div className="h-px bg-brand-white/[0.07] mt-4 mb-3" />

        {/* Precios = botones de agregar */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {[
            { size: "5ml", ml: 5, precio: product.precio5ml },
            { size: "10ml", ml: 10, precio: product.precio10ml },
          ].map(opt => (
            <button
              key={opt.size}
              onClick={e => add(opt.size, opt.ml, opt.precio, e)}
              aria-label={`Agregar ${product.nombre} ${opt.size} al carrito`}
              className="group/btn relative min-h-[56px] px-3 py-2.5 bg-brand-smoke/60 hover:bg-brand-offwhite text-left transition-colors duration-300 active:scale-[0.97]"
            >
              <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-brand-gray group-hover/btn:text-brand-black/55 transition-colors">
                {opt.size}
              </span>
              <span className="flex items-center justify-between mt-0.5">
                <span className="font-serif text-base text-brand-white group-hover/btn:text-brand-black transition-colors tabular-nums">
                  ${opt.precio}
                </span>
                <svg
                  className="w-3.5 h-3.5 text-brand-gray group-hover/btn:text-brand-black transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

interface CompletoCardProps {
  product: Completo;
  index: number;
  onOpenModal: (p: Completo) => void;
}

export function CompletoCard({ product, index, onOpenModal }: CompletoCardProps) {
  const { addItem } = useCart();

  const add = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      cartId: `${product.id}-${product.ml}ml`,
      productId: product.id,
      nombre: product.nombre,
      marca: product.marca,
      type: "completo",
      size: `${product.ml}ml`,
      ml: product.ml,
      precioUnitario: product.precio,
    });
  };

  return (
    <motion.article
      {...cardMotion(index)}
      onClick={() => onOpenModal(product)}
      className="group bg-brand-white border border-brand-black/[0.06] hover:border-brand-black/[0.14] hover:shadow-luxe-light hover:-translate-y-1 transition-all duration-500 ease-luxe flex flex-col cursor-pointer"
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <div
          className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(10,10,10,0.05), transparent 72%)",
          }}
        />
        {product.imagen && (
          <Image
            src={product.imagen}
            alt={product.nombre}
            fill
            className="object-contain p-6 group-hover:scale-[1.06] transition-transform duration-700 ease-luxe"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        <div className="absolute top-3 left-3">
          <UsoBadge uso={product.uso} dark={false} />
        </div>
        <div className="absolute top-3 right-3">
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase bg-brand-black text-brand-offwhite px-2.5 py-1">
            {product.ml} ml
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 flex justify-center pb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-brand-black/70 bg-brand-white/80 backdrop-blur-sm px-3 py-1.5">
            Ver detalles
          </span>
        </div>
      </div>

      <div className="px-5 pt-4 pb-5 flex-1 flex flex-col">
        <p className="font-sans text-[10px] text-brand-gray tracking-[0.28em] uppercase">
          {product.marca}
        </p>
        <h3 className="font-serif text-lg text-brand-black leading-snug mt-1.5">
          {product.nombre}
        </h3>

        <div className="h-px bg-brand-black/[0.07] mt-4 mb-3" />

        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-brand-gray">
              Frasco completo
            </p>
            <p className="font-serif text-2xl text-brand-black mt-0.5 tabular-nums">
              ${product.precio.toLocaleString("es-MX")}
            </p>
          </div>
          <button
            onClick={add}
            aria-label={`Agregar ${product.nombre} al carrito`}
            className="w-11 h-11 bg-brand-black text-brand-offwhite flex items-center justify-center hover:bg-brand-smoke transition-colors duration-300 active:scale-[0.94]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
