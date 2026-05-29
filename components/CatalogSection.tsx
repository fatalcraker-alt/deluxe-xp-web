"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DecantCard, CompletoCard } from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { Decant, Completo, Uso, Genero, Categoria } from "@/types/catalog";

type UsoFilter = "todos" | Uso;
type GeneroFilter = "todos" | Genero;
type CatFilter = "todos" | Categoria;

interface Props {
  id: string;
  title: string;
  subtitle: string;
  products: Decant[] | Completo[];
  dark?: boolean;
}

function isDecant(p: Decant | Completo): p is Decant {
  return "precio5ml" in p;
}

export default function CatalogSection({ id, title, subtitle, products, dark = true }: Props) {
  const [uso, setUso] = useState<UsoFilter>("todos");
  const [genero, setGenero] = useState<GeneroFilter>("todos");
  const [cat, setCat] = useState<CatFilter>("todos");
  const [modal, setModal] = useState<Decant | Completo | null>(null);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const usoOk = uso === "todos" || p.uso === uso;
      const genOk = genero === "todos" || p.genero === genero;
      const catOk = cat === "todos" || p.categoria === cat;
      return usoOk && genOk && catOk;
    });
  }, [products, uso, genero, cat]);

  const bg = dark ? "bg-brand-black" : "bg-brand-offwhite";
  const titleColor = dark ? "text-brand-white" : "text-brand-black";
  const sub = dark ? "text-brand-gray" : "text-brand-gray";
  const base = dark
    ? "border border-brand-gray/25 text-brand-gray hover:border-brand-white hover:text-brand-white"
    : "border border-brand-black/20 text-brand-gray hover:border-brand-black hover:text-brand-black";
  const active = dark
    ? "border-brand-white text-brand-white bg-brand-white/5"
    : "border-brand-black text-brand-black bg-brand-black/5";

  const Btn = ({ value, current, onClick, label }: { value: string; current: string; onClick: () => void; label: string }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-200 font-sans ${base} ${current === value ? active : ""}`}
    >
      {label}
    </button>
  );

  return (
    <section id={id} className={`${bg} py-24 px-6`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-3"
        >
          <p className={`font-sans text-xs tracking-[0.4em] uppercase ${sub}`}>Catálogo</p>
          <h2 className={`font-serif text-4xl md:text-5xl ${titleColor} uppercase tracking-widest`}>{title}</h2>
          <p className={`font-sans text-sm ${sub} max-w-md mx-auto`}>{subtitle}</p>

          {/* Discount hint */}
          <p className={`font-sans text-[10px] ${sub} tracking-wider opacity-60`}>
            Decants: +$500 → 5% desc · +$700 → 10% desc
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {/* Uso */}
          <Btn value="todos" current={uso} onClick={() => setUso("todos")} label="Todo" />
          <Btn value="día" current={uso} onClick={() => setUso("día")} label="Día" />
          <Btn value="noche" current={uso} onClick={() => setUso("noche")} label="Noche" />
          <Btn value="día/noche" current={uso} onClick={() => setUso("día/noche")} label="Día/Noche" />

          <span className={`${dark ? "text-brand-gray/20" : "text-brand-black/15"} text-xs self-center`}>|</span>

          {/* Género */}
          <Btn value="todos" current={genero} onClick={() => setGenero("todos")} label="Todos" />
          <Btn value="hombre" current={genero} onClick={() => setGenero("hombre")} label="Hombre" />
          <Btn value="mujer" current={genero} onClick={() => setGenero("mujer")} label="Mujer" />
          <Btn value="unisex" current={genero} onClick={() => setGenero("unisex")} label="Unisex" />

          <span className={`${dark ? "text-brand-gray/20" : "text-brand-black/15"} text-xs self-center`}>|</span>

          {/* Categoría */}
          <Btn value="todos" current={cat} onClick={() => setCat("todos")} label="Todos" />
          <Btn value="diseñador" current={cat} onClick={() => setCat("diseñador")} label="Diseñador" />
          <Btn value="árabe" current={cat} onClick={() => setCat("árabe")} label="Árabe" />
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className={`text-center ${sub} font-sans text-sm py-16`}>Sin resultados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product, i) =>
              isDecant(product) ? (
                <DecantCard key={product.id} product={product} index={i} onOpenModal={setModal} />
              ) : (
                <CompletoCard key={product.id} product={product as Completo} index={i} onOpenModal={setModal} />
              )
            )}
          </div>
        )}

        <p className={`text-center ${sub} font-sans text-xs tracking-wider mt-8 opacity-60`}>
          {filtered.length} {filtered.length === 1 ? "fragancia" : "fragancias"}
        </p>
      </div>

      {/* Modal */}
      {modal && <ProductModal product={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
