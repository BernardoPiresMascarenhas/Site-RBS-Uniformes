import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFab } from "@/components/WhatsAppFab";

/** Casca do site: navbar fixa, conteúdo e rodapé. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-brand focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-brand-on-primary"
      >
        Pular para o conteúdo
      </a>

      <Navbar />
      <main>{children}</main>
      <Footer />

      <WhatsAppFab />
    </div>
  );
}
