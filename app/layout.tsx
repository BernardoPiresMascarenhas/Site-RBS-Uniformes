import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import { site } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Títulos, menu e botões — sem serifa, geométrica e firme. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "uniformes para condomínios",
    "uniforme de portaria",
    "uniforme de zeladoria",
    "uniforme ASG",
    "auxiliar de serviços gerais",
    "confecção de uniformes",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        {/* Sem JavaScript ninguém liga o `data-visible` das animações de
            entrada — aqui o conteúdo revelado volta a aparecer. */}
        <noscript>
          <style>
            {".reveal{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
