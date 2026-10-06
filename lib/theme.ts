/**
 * Identidade visual do site: neutros claros, verde da marca como cor de
 * ação e o verde escuro como superfície de contraste. Amarelo e vermelho —
 * as outras duas cores da logo — entram como acentos pequenos (ver `tones`).
 *
 * As classes ficam em tokens (`brand-*`), não em cores literais, porque as
 * seções alternam entre superfície clara e verde-escura (ver `data-surface`
 * em `app/globals.css`) — o mesmo card precisa funcionar nas duas.
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
    card: "rounded-brand-lg border border-brand-border bg-brand-surface shadow-brand",
    /** Card em estado de destaque/hover: sobe pouco e a borda escurece. */
    cardHover:
      "transition duration-200 hover:-translate-y-0.5 hover:border-brand-muted/40 hover:shadow-brand-lg",
    /** Container de ícone dentro dos cards (a cor vem de `tones[x].box`). */
    iconBox: "rounded-brand",
    /** Etiqueta acima dos títulos de seção — discreta, em verde. */
    eyebrow:
      "font-display text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-brand-accent",
    /** Tipografia dos títulos de seção. */
    heading:
      "font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]",
    /** Traço curto abaixo dos títulos de seção. */
    divider: "h-1 w-12 rounded-full bg-brand-accent",
    /** Linha divisória de largura total. */
    rule: "h-px w-full bg-brand-border",
    /** Rótulo pequeno (legendas, nomes de campo, "Etapa 01"). */
    caption: "font-display text-[0.8125rem] font-semibold text-brand-muted",
    /** Campo de formulário. */
    field:
      "rounded-brand border border-brand-border bg-brand-surface-2 px-4 py-3 text-brand-heading placeholder:text-brand-muted focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20",
    /** Faixa de estatísticas. */
    statValue: "font-display font-extrabold tracking-tight text-rbs-green-dark",
  },
} as const;

/**
 * As três cores da logo como acentos. Cada tom tem:
 * - `box`: fundo suave + glyph, para caixas de ícone;
 * - `text`: cor de glyph/texto curto legível na superfície atual;
 * - `dot`: a cor pura, para marcadores e traços decorativos.
 *
 * Os tokens `brand-*` mudam com `data-surface`: no verde escuro o amarelo
 * vira o puro e o vermelho clareia, sem precisar de variante.
 */
export const tones = {
  green: {
    box: "bg-brand-green-soft text-brand-green",
    text: "text-brand-green",
    dot: "bg-brand-green",
  },
  yellow: {
    box: "bg-brand-yellow-soft text-brand-yellow",
    text: "text-brand-yellow",
    dot: "bg-rbs-yellow",
  },
  red: {
    box: "bg-brand-red-soft text-brand-red",
    text: "text-brand-red",
    dot: "bg-rbs-red",
  },
} as const;

export type Tone = keyof typeof tones;

/** Cores das etapas da visita — compartilhadas pela seção e pelo pop-up. */
export const visitStepTones: Tone[] = ["red"];
