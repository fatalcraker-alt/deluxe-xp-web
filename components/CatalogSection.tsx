"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DecantCard, CompletoCard } from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import SectionHeading from "@/components/SectionHeading";
import { Decant, Completo, Uso, Genero, Categoria } from "@/types/catalog";

type UsoFilter = "todos" | Uso;
type GeneroFilter = "todos" | Genero;
type CatFilter = "todos" | Categoria;

interface Props {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  products: Decant[] | Completo[];
  dark?: boolean;
}

function isDecant(p: Decant | Completo): p is Decant {
  return "precio5ml" in p;
}

function normalize(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function CatalogSection({ id, number, title, subtitle, products, dark = true }: Props) {
  const [uso, setUso] = useState<UsoFilter>("todos");
  const [genero, setGenero] = useState<GeneroFilter>("todos");
  const [cat, setCat] = useState<CatFilter>("todos");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<Decant | Completo | null>(null);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return products.filter(p => {
      const usoOk = uso === "todos" || p.uso === uso;
      const genOk = genero === "todos" || p.genero === genero;
      const catOk = cat === "todos" || p.categoria === cat;
      const qOk = q === "" || normalize(`${p.nombre} ${p.marca}`).includes(q);
      return usoOk && genOk && catOk && qOk;
    });
  }, [products, uso, genero, cat, query]);

  const bg = dark ? "bg-brand-black" : "bg-brand-offwhite";
  const muted = "text-brand-gray";
  const chipBase = dark
    ? "text-brand-gray hover:text-brand-white"
    : "text-brand-gray hover:text-brand-black";
  const chipActive = dark
    ? "bg-brand-offwhite text-brand-black"
    : "bg-brand-black text-brand-offwhite";
  const inputCls = dark
    ? "bg-brand-coal border-brand-white/[0.08] text-brand-white placeholder:text-brand-gray/60 focus:border-brand-white/25"
    : "bg-brand-white border-brand-black/[0.08] text-brand-black placeholder:text-brand-gray/70 focus:border-brand-black/30";

  const Chip = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-3.5 py-2 min-h-[36px] text-[10px] tracking-[0.18em] uppercase font-sans transition-all duration-300 ${
        active ? chipActive : chipBase
      }`}
    >
      {label}
    </button>
  );

  const FilterGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center gap-1">
      <span className={`font-serif italic text-xs ${muted} mr-2 select-none`}>{label}</span>
      {children}
    </div>
  );

  return (
    <section id={id} className={`${bg} py-24 sm:py-32 px-5 sm:px-8 scroll-mt-10`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          number={number}
          eyebrow="Catálogo"
          title={title}
          subtitle={subtitle}
          dark={dark}
        />

        {/* Búsqueda + filtros */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 space-y-5"
        >
          <div className="relative max-w-sm">
            <svg
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${muted} pointer-events-none`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por nombre o casa…"
              aria-label={`Buscar en ${title}`}
              className={`w-full h-12 pl-11 pr-4 border font-sans text-sm tracking-wide outline-none transition-colors duration-300 ${inputCls}`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <FilterGroup label="Uso">
              <Chip active={uso === "todos"} onClick={() => setUso("todos")} label="Todo" />
              <Chip active={uso === "día"} onClick={() => setUso("día")} label="Día" />
              <Chip active={uso === "noche"} onClick={() => setUso("noche")} label="Noche" />
              <Chip active={uso === "día/noche"} onClick={() => setUso("día/noche")} label="Mixto" />
            </FilterGroup>
            <FilterGroup label="Para">
              <Chip active={genero === "todos"} onClick={() => setGenero("todos")} label="Todos" />
              <Chip active={genero === "hombre"} onClick={() => setGenero("hombre")} label="Él" />
              <Chip active={genero === "mujer"} onClick={() => setGenero("mujer")} label="Ella" />
              <Chip active={genero === "unisex"} onClick={() => setGenero("unisex")} label="Unisex" />
            </FilterGroup>
            <FilterGroup label="Casa">
              <Chip active={cat === "todos"} onClick={() => setCat("todos")} label="Todas" />
              <Chip active={cat === "diseñador"} onClick={() => setCat("diseñador")} label="Diseñador" />
              <Chip active={cat === "árabe"} onClick={() => setCat("árabe")} label="Árabe" />
            </FilterGroup>
          </div>

          <p className={`font-sans text-[11px] ${muted} tracking-wider tabular-nums`} aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "fragancia" : "fragancias"}
            {title === "Decants" && (
              <span className="opacity-60"> · +$500 → 5% desc · +$700 → 10% desc</span>
            )}
          </p>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <p className={`font-serif italic text-xl ${dark ? "text-brand-chalk/70" : "text-brand-black/60"}`}>
              Nada por aquí…
            </p>
            <p className={`font-sans text-sm ${muted}`}>
              Prueba con otra búsqueda o limpia los filtros.
            </p>
            <button
              onClick={() => { setQuery(""); setUso("todos"); setGenero("todos"); setCat("todos"); }}
              className={`font-sans text-[10px] tracking-[0.25em] uppercase underline underline-offset-4 ${chipBase}`}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((product, i) =>
              isDecant(product) ? (
                <DecantCard key={product.id} product={product} index={i} onOpenModal={setModal} />
              ) : (
                <CompletoCard key={product.id} product={product as Completo} index={i} onOpenModal={setModal} />
              )
            )}
          </div>
        )}
      </div>

      {modal && <ProductModal product={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
