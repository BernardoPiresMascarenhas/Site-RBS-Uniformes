import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { HeroV4 } from "@/components/sections/HeroV4";

/**
 * Preview do hero V4 (refinamento da V3): a home completa, trocando só o hero. Para remover o teste, apague
 * esta pasta e `HeroV4.tsx`.
 */
export const metadata: Metadata = {
  title: "Preview — Hero V4",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HomePage hero={<HeroV4 />} />;
}
