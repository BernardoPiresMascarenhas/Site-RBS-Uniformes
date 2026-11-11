import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { HeroV3 } from "@/components/sections/HeroV3";

/**
 * Preview do hero V3 (degradê verde sem foto de fundo + fotos enquadradas à
 * direita): a home completa, trocando só o hero. Para remover o teste, apague
 * esta pasta e `HeroV3.tsx`.
 */
export const metadata: Metadata = {
  title: "Preview — Hero V3",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HomePage hero={<HeroV3 />} />;
}
