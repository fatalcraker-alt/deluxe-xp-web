"use client";

import { motion } from "framer-motion";

interface Props {
  number: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}

export default function SectionHeading({ number, eyebrow, title, subtitle, dark = true }: Props) {
  const titleColor = dark ? "text-brand-white" : "text-brand-black";
  const accent = dark ? "text-brand-chalk" : "text-brand-black/70";
  const muted = dark ? "text-brand-gray" : "text-brand-gray";
  const rule = dark ? "bg-brand-white/10" : "bg-brand-black/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14"
    >
      <div className="flex items-baseline gap-5">
        <span className={`font-serif italic text-sm ${muted} tabular-nums shrink-0`}>
          {number}
        </span>
        <div className={`h-px flex-1 ${rule}`} />
        <p className={`font-sans text-[10px] tracking-[0.45em] uppercase ${muted} shrink-0`}>
          {eyebrow}
        </p>
      </div>
      <h2 className={`font-serif text-5xl sm:text-6xl md:text-7xl ${titleColor} mt-6 leading-[1.02] tracking-tight`}>
        {title.split(" ").map((word, i, arr) =>
          i === arr.length - 1 && arr.length > 1 ? (
            <span key={i} className={`italic font-light ${accent}`}>
              {word}
            </span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </h2>
      {subtitle && (
        <p className={`font-sans text-sm ${muted} mt-5 max-w-md leading-relaxed`}>{subtitle}</p>
      )}
    </motion.div>
  );
}
