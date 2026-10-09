import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Deluxe XP — Fragancias",
  description:
    "Catálogo de fragancias Deluxe XP. Decants de 5ml y 10ml y frascos completos de las casas más buscadas. Pide por WhatsApp.",
  openGraph: {
    title: "Deluxe XP — Fragancias",
    description: "Decants y frascos completos. Encuentra tu fragancia.",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Deluxe XP — Fragancias" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deluxe XP — Fragancias",
    description: "Decants y frascos completos. Encuentra tu fragancia.",
    images: ["/og-image.png"],
  },
  // El ícono vive en app/icon.png y apple-icon.png (convención de Next); aquí lo del celular.
  metadataBase: new URL("https://deluxe-xp-web.vercel.app"),
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Deluxe XP", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans bg-brand-black text-brand-white antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
