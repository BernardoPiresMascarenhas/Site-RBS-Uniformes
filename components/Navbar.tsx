"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { navLinks } from "@/lib/content";
import { defaultWhatsappMessage, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * `true`: o header já abre claro sobre o hero. `false`: volta ao header
 * transparente sobre o hero, que só fica claro ao rolar a página.
 */
const HEADER_CLARO_NO_HERO = true;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Só a home abre sobre o hero verde-escuro; as demais páginas começam claras.
  const overHero = usePathname() === "/";
  // Barra sólida (clara, texto escuro) ao rolar, com o menu aberto ou fora
  // da home. Sobre o hero ela fica transparente e usa os tokens escuros —
  // a menos que `HEADER_CLARO_NO_HERO` esteja ligado.
  const solid = HEADER_CLARO_NO_HERO || scrolled || open || !overHero;

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
      data-surface={solid ? "light" : "dark"}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        solid
          ? cn(
              "border-b border-brand-border bg-white shadow-brand",
            )
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container size="wide" className="flex items-center justify-between gap-4 py-2">
        <Logo sizeClassName="h-[4.5rem] sm:h-20" />

        {/* 9 itens: o menu completo só cabe a partir de xl (1280px); abaixo disso
            vale o botão de menu */}
        <nav className="hidden items-center gap-6 xl:flex 2xl:gap-8" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative font-display text-[0.9375rem] font-semibold text-brand-heading",
                // o texto não muda de cor: o hover é só o traço amarelo
                "after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-0 after:rounded-full after:bg-rbs-yellow after:transition-all after:duration-200 hover:after:w-full focus-visible:after:w-full",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Sempre o verde da marca, inclusive sobre o hero. */}
          <span data-surface="light" className="hidden sm:inline-flex">
            <ButtonLink
              href={whatsappLink(defaultWhatsappMessage)}
              external
              size="sm"
            >
              Solicitar orçamento
            </ButtonLink>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-brand border border-brand-border text-brand-heading transition-colors hover:border-brand-green hover:text-brand-green xl:hidden"
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
          "overflow-hidden border-t border-brand-border bg-brand-bg-alt transition-[max-height,opacity] duration-300 xl:hidden",
          // aberto: até a base da tela, com rolagem se os 9 itens não couberem
          open
            ? "max-h-[calc(100svh-var(--header-h-compact))] overflow-y-auto opacity-100"
            // fechado: sem borda, senão o filete de 1px soma à altura do header
            // e desalinha a rolagem das âncoras
            : "max-h-0 border-t-0 opacity-0",
        )}
      >
        <Container size="wide" className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-brand border-l-[3px] border-transparent px-3 py-3 font-display text-base font-semibold text-brand-heading transition-colors hover:border-rbs-yellow hover:bg-brand-bg"
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
