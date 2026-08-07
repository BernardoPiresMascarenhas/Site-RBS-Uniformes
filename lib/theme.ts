import type { LucideIcon } from "lucide-react";
import { Award, Gem, Sparkles } from "lucide-react";

/**
 * Identidade visual do site: fundo preto, ouro metálico e alto contraste.
 *
 * As classes ficam em tokens (`brand-*`), não em cores literais, porque as
 * seções alternam entre superfície escura e clara (ver `data-surface` em
 * `app/globals.css`) — o mesmo card precisa funcionar nas duas.
 */
export const theme = {
  /**
   * Versão da logo com fundo recortado (o arquivo original, com fundo chapado,
   * continua em /public para uso em material impresso).
   */
  logo: {
    src: "/logopremiumtransparente1.png",
    alt: "RBS Uniformes — sol dourado sobre montanhas verdes",
    /** Proporção do arquivo — evita layout shift no next/image. */
    width: 1536,
    height: 1024,
  },
  ui: {
    /** Card padrão. */
    card: "rounded-brand border border-brand-border/70 bg-brand-surface shadow-brand",
    /** Card em estado de destaque/hover. */
    cardHover:
      "transition duration-300 hover:-translate-y-1 hover:border-brand-accent/60 hover:shadow-brand-lg",
    /** Container de ícone dentro dos cards. */
    iconBox:
      "rounded-brand border border-brand-accent/35 bg-brand-accent/10 text-brand-accent",
    /** Etiqueta acima dos títulos de seção. */
    eyebrow: "font-display text-xs uppercase tracking-[0.42em] text-brand-accent",
    /** Tipografia dos títulos de seção. */
    heading:
      "font-display text-3xl uppercase tracking-[0.06em] sm:text-4xl lg:text-5xl",
    /** Divisor decorativo. */
    divider:
      "h-px w-full bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent",
    /** Campo de formulário. */
    field:
      "rounded-brand border border-brand-border bg-brand-surface-2 px-4 py-3 text-brand-heading placeholder:text-brand-muted/80 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent",
    /** Faixa de estatísticas. */
    statValue: "text-accent-sheen font-display",
  },
  /** Trio de destaques exibido no hero. */
  heroHighlights: [
    { icon: Gem, label: "Tecidos nobres" },
    { icon: Award, label: "Acabamento premium" },
    { icon: Sparkles, label: "Modelagem exclusiva" },
  ] satisfies { icon: LucideIcon; label: string }[],
} as const;
