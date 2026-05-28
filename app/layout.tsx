import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deluxe XP — Fragancias",
  description: "Catálogo de fragancias Deluxe XP. Decants y frascos completos disponibles.",
  openGraph: {
    title: "Deluxe XP — Fragancias",
    description: "Catálogo de fragancias Deluxe XP.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-brand-black text-brand-white antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
