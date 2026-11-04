import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { Hero } from "@/components/sections/Hero";

/** Preview do hero original (V1), para comparação. A home usa a V1.5. */
export const metadata: Metadata = {
  title: "Preview — Hero V1 (original)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HomePage hero={<Hero />} />;
}
