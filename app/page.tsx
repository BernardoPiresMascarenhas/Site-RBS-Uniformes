import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
