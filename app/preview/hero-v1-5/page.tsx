import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { HeroV15 } from "@/components/sections/HeroV15";

/**
 * Preview do hero V1.5 (refinamento da V1): a home completa, trocando só o
 * hero. Para remover o teste, apague esta pasta e `HeroV15.tsx`.
 */
export const metadata: Metadata = {
  title: "Preview — Hero V1.5",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HomePage hero={<HeroV15 />} />;
}
