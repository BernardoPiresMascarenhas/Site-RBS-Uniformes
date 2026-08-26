import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Tetos de largura do conteúdo.
 *
 * O fundo de cada seção é pintado pela própria `<section>`, que é sempre
 * 100% da viewport — estes valores limitam só o conteúdo dentro dela.
 *
 * - `content` é largura de leitura: usada onde o texto corre em uma coluna só
 *   e uma linha larga demais cansaria (FAQ).
 * - `default` atende a maioria das seções, que são grades de cards.
 * - `wide` é para as faixas que devem encostar quase na borda: header, hero e
 *   a faixa de números.
 * - `fluid` não tem teto — só o respiro lateral.
 *
 * O teto existe para telas ultrawide: sem ele, a 2560px o menu e as grades
 * ficariam esparramados demais.
 */
const sizes = {
  content: "max-w-[64rem]",
  default: "max-w-[100rem]",
  wide: "max-w-[115rem]",
  fluid: "",
} as const;

export type ContainerSize = keyof typeof sizes;

/**
 * Respiro lateral, em degraus: 20px no celular, 32px no tablet, 40px no
 * desktop, 56px em telas grandes e 80px em monitores muito largos.
 *
 * É `px-*` em vez de `w-[calc(100vw-…)]` de propósito: `100vw` inclui a
 * barra de rolagem e provocaria scroll horizontal no Windows.
 */
const gutter = "px-5 sm:px-8 lg:px-10 xl:px-14 2xl:px-20";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
}) {
  return (
    <div className={cn("mx-auto w-full", gutter, sizes[size], className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  tone = "default",
  surface,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "alt";
  /** Troca o jogo de tokens da seção, que intercala blocos escuros e claros. */
  surface?: "light" | "dark";
}) {
  return (
    <section
      id={id}
      data-surface={surface}
      className={cn(
        "relative py-20 sm:py-24 lg:py-28",
        // com `surface` definido a seção pinta o próprio fundo, senão herda
        surface
          ? tone === "alt"
            ? "bg-brand-bg-alt"
            : "bg-brand-bg"
          : tone === "alt" && "bg-brand-bg-alt",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  // As partes entram em cascata: etiqueta, título, divisor e texto. Como todo
  // cabeçalho de seção passa por aqui, o site inteiro herda o mesmo ritmo.
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal as="span" className={theme.ui.eyebrow}>
          {eyebrow}
        </Reveal>
      ) : null}

      <Reveal as="h2" delay={80} className={cn(theme.ui.heading, "max-w-3xl")}>
        {title}
      </Reveal>

      <Reveal
        as="span"
        variant="scale"
        delay={160}
        className={cn(theme.ui.divider, "max-w-xs")}
        aria-hidden="true"
      />

      {description ? (
        <Reveal
          as="p"
          delay={220}
          className="max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg"
        >
          {description}
        </Reveal>
      ) : null}
    </div>
  );
}
