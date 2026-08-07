import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Uniformes que vestem a sua autoridade`,
  description: site.description,
};

export default function Page() {
  return <HomePage />;
}
