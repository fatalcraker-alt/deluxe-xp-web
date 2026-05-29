"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Decant, Completo } from "@/types/catalog";

interface DecantCardProps {
  product: Decant;
  index: number;
  onOpenModal: (p: Decant) => void;
}

function UsoBadge({ uso }: { uso: string }) {
  return (
    <span className="text-[10px] tracking-widest uppercase border border-brand-gray/30 text-brand-gray px-2 py-0.5">
      {uso}
    </span>
  );
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      onClick={() => onOpenModal(product)}
      className="group border border-brand-gray/20 bg-brand-black hover:border-brand-gray/50 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {product.imagen && (
        <div className="relative w-full aspect-[3/4] bg-brand-black overflow-hidden">
          <Image
            src={product.imagen}
            alt={product.nombre}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      )}
      <div className="p-5 flex-1 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif text-base text-brand-white leading-tight group-hover:text-brand-chalk transition-colors">{product.nombre}</h3>
            <p className="font-sans text-xs text-brand-gray mt-0.5">{product.marca}</p>
          </div>
          <UsoBadge uso={product.uso} />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="border border-brand-gray/15 p-2.5 text-center">
            <p className="font-sans text-[10px] text-brand-gray tracking-widest uppercase">5 ml</p>
            <p className="font-serif text-lg text-brand-white mt-0.5">${product.precio5ml}</p>
          </div>
          <div className="border border-brand-gray/15 p-2.5 text-center">
            <p className="font-sans text-[10px] text-brand-gray tracking-widest uppercase">10 ml</p>
            <p className="font-serif text-lg text-brand-white mt-0.5">${product.precio10ml}</p>
          </div>
        </div>

        <p className="font-sans text-[10px] text-brand-gray/40 text-center tracking-wider">Toca para ver detalles</p>
      </div>

      <div className="grid grid-cols-2 border-t border-brand-gray/15">
        <button
          onClick={e => add("5ml", 5, product.precio5ml, e)}
          className="py-2.5 text-[10px] tracking-widest uppercase font-sans text-brand-gray hover:bg-brand-white hover:text-brand-black transition-all duration-200 border-r border-brand-gray/15"
        >
          + 5ml
        </button>
        <button
          onClick={e => add("10ml", 10, product.precio10ml, e)}
          className="py-2.5 text-[10px] tracking-widest uppercase font-sans text-brand-gray hover:bg-brand-white hover:text-brand-black transition-all duration-200"
        >
          + 10ml
        </button>
      </div>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      onClick={() => onOpenModal(product)}
      className="group border border-brand-black/15 bg-brand-offwhite hover:border-brand-black/40 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {product.imagen && (
        <div className="relative w-full aspect-[3/4] bg-brand-offwhite overflow-hidden">
          <Image
            src={product.imagen}
            alt={product.nombre}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      )}
      <div className="p-5 flex-1 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif text-base text-brand-black leading-tight">{product.nombre}</h3>
            <p className="font-sans text-xs text-brand-gray mt-0.5">{product.marca}</p>
          </div>
          <span className="text-[10px] tracking-widest uppercase border border-brand-black/20 text-brand-gray px-2 py-0.5">{product.uso}</span>
        </div>

        <div className="border border-brand-black/10 p-3 text-center">
          <p className="font-sans text-[10px] text-brand-gray tracking-widest uppercase">{product.ml} ml — Completo</p>
          <p className="font-serif text-2xl text-brand-black mt-1">${product.precio.toLocaleString("es-MX")}</p>
        </div>

        <p className="font-sans text-[10px] text-brand-gray/40 text-center tracking-wider">Toca para ver detalles</p>
      </div>

      <button
        onClick={add}
        className="w-full py-3 text-[10px] tracking-widest uppercase font-sans text-brand-black border-t border-brand-black/10 hover:bg-brand-black hover:text-brand-white transition-all duration-200"
      >
        Agregar al carrito
      </button>
    </motion.div>
  );
}
