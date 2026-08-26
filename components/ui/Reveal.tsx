"use client";

import {
  createElement,
  useEffect,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

/** Direção de onde o elemento entra. As classes vivem em `globals.css`. */
const variants = {
  up: "reveal-up",
  down: "reveal-down",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  fade: "",
} as const;

export type RevealVariant = keyof typeof variants;

/**
 * Revela o conteúdo quando ele entra na viewport.
 *
 * O estado escondido é só uma classe CSS (`.reveal`), então o HTML do servidor
 * já vem com o conteúdo — nada depende de JavaScript para existir na página,
 * e o `<noscript>` do layout devolve a visibilidade se o JS não rodar.
 *
 * `prefers-reduced-motion` é respeitado no CSS: quem pediu menos movimento vê
 * tudo imediatamente, sem transição.
 */
export function Reveal({
  children,
  className,
  as = "div",
  variant = "up",
  delay = 0,
  /** Repete a animação toda vez que o elemento reentra na tela. */
  once = true,
  ...rest
}: {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  once?: boolean;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!node) return;

    // Navegador sem suporte: mostra sem animar em vez de esconder para sempre.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
          return;
        }

        if (!once) setVisible(false);
      },
      // a margem negativa embaixo segura a entrada até o elemento subir um
      // pouco na tela, em vez de disparar no primeiro pixel visível
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, once]);

  return createElement(
    as,
    {
      ...rest,
      ref: setNode,
      "data-visible": visible ? "true" : "false",
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
      className: cn("reveal", variants[variant], className),
    },
    children,
  );
}
