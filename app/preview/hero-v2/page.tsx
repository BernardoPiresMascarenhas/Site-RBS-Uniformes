import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { HeroV2 } from "@/components/sections/HeroV2";

/**
 * Preview do hero alternativo: a home completa, trocando só o hero.
 * A home original continua em "/". Para remover o teste, apague esta pasta
 * e `components/sections/HeroV2.tsx`.
 */
export const metadata: Metadata = {
  title: "Preview — Hero V2",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HomePage hero={<HeroV2 />} />;
}
