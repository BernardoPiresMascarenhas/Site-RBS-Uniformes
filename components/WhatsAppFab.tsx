"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Botão flutuante de WhatsApp — aparece depois da primeira dobra. */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(defaultWhatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={cn(
        // verde da marca, ícone branco
        "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-rbs-green text-white shadow-brand-lg transition-all duration-200 hover:bg-rbs-green-hover",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
