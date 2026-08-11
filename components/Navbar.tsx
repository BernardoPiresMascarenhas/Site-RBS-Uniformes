"use client";

import { Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { navLinks } from "@/lib/content";
import { defaultWhatsappMessage, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body enquanto o menu mobile estiver aberto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-premium-gold/25 bg-black/85 shadow-[0_10px_40px_-24px_rgba(252,182,9,0.6)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      {/* Barra utilitária — some no mobile e ao rolar */}
      <div
        className={cn(
          "hidden bg-gradient-to-r from-premium-emerald-deep via-black to-premium-red-deep text-premium-gold-light transition-all duration-300 lg:block",
          scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-12 opacity-100",
        )}
      >
        <Container className="flex items-center justify-between py-2 text-xs">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 tracking-wide hover:underline"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {site.email}
          </a>

          <div className="flex items-center gap-5">
            <a
              href={`tel:+${site.phoneDigits}`}
              className="flex items-center gap-2 hover:underline"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {site.phoneDisplay}
            </a>

            {/* Um ícone do WhatsApp para os dois números */}
            <span className="flex items-center gap-3">
              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {site.whatsappNumbers.map((number) => (
                <a
                  key={number.digits}
                  href={whatsappLink(defaultWhatsappMessage, number.digits)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${number.display}`}
                  className="hover:underline"
                >
                  {number.display}
                </a>
              ))}
            </span>
          </div>
        </Container>
      </div>

      <Container className="flex items-center justify-between gap-4 py-3">
        <Logo sizeClassName="h-20 sm:h-24" />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative font-display text-sm uppercase tracking-[0.18em] text-brand-text transition-colors hover:text-premium-gold",
                "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-premium-gold after:transition-all after:duration-300 hover:after:w-full",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={whatsappLink(defaultWhatsappMessage)}
            external
            size="sm"
            className="hidden sm:inline-flex"
          >
            Solicitar orçamento
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-brand border border-premium-gold/40 text-premium-gold lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={cn(
          "overflow-hidden border-t border-premium-gold/20 bg-black/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 border-transparent opacity-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-brand px-3 py-3 font-display text-base uppercase tracking-[0.16em] text-brand-heading transition-colors hover:bg-premium-gold/10 hover:text-premium-gold"
            >
              {link.label}
            </a>
          ))}
          <ButtonLink
            href={whatsappLink(defaultWhatsappMessage)}
            external
            className="mt-3 w-full"
            icon={<MessageCircle className="h-4 w-4" />}
          >
            Falar no WhatsApp
          </ButtonLink>
          <p className="mt-3 px-3 text-xs text-brand-muted">
            {site.name} · {site.phoneDisplay}
          </p>
        </Container>
      </div>
    </header>
  );
}
