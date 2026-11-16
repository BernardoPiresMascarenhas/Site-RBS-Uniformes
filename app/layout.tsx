import type { Metadata } from "next";
import localFont from "next/font/local";

import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

import "./globals.css";

/*
 * Fontes servidas pelo próprio projeto (app/fonts), e não baixadas do Google
 * no build: com `next/font/google`, uma falha de rede numa das compilações da
 * Vercel gerou classes diferentes no HTML e no CSS, e o texto caiu em Times
 * New Roman. Arquivos variáveis (todos os pesos num arquivo só), subconjunto
 * latin — cobre o português. Origem: Fontsource, licença OFL-1.1.
 */

/** Texto corrido. */
const inter = localFont({
  src: "./fonts/Inter-latin-wght.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

/** Títulos, menu e botões — sem serifa, geométrica e firme. */
const manrope = localFont({
  src: "./fonts/Manrope-latin-wght.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "uniformes para condomínios",
    "uniforme de portaria",
    "uniforme de zeladoria",
    "uniforme ASG",
    "auxiliar de serviços gerais",
    "confecção de uniformes",
  ],
  // a canônica é definida em cada página indexável (home e /servicos/[slug]);
  // aqui não, para os rascunhos em /preview não apontarem para a home
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    // a imagem vem de app/opengraph-image.png
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    // a imagem vem de app/twitter-image.png
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
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
