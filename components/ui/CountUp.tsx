"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * `useLayoutEffect` avisa quando roda no servidor. Como o valor final já é o
 * que sai do SSR, no servidor não há nada a fazer e o `useEffect` serve.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Quebra "+2500" em `{ prefix: "+", target: 2500, suffix: "" }` e "100%" em
 * `{ prefix: "", target: 100, suffix: "%" }`.
 *
 * O separador de milhar é preservado: se o texto original tem ponto, o número
 * animado também é formatado em pt-BR, para a faixa não mudar de estilo no
 * meio da contagem.
 */
function parse(value: string) {
  const match = value.match(/^(\D*?)([\d.,]+)(\D*)$/);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const target = Number(digits.replace(/[.,]/g, ""));
  if (!Number.isFinite(target)) return null;

  return { prefix, target, suffix, grouped: /[.,]/.test(digits) };
}

/** Desacelera no fim, para o número "assentar" no valor final. */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Número que conta de zero até o valor final quando entra na tela.
 *
 * O HTML do servidor já traz o valor final (bom para busca e para quem está
 * sem JavaScript). No cliente o zero é aplicado antes da primeira pintura,
 * então não existe piscada do valor final antes da contagem começar.
 */
export function CountUp({
  value,
  className,
  duration = 1800,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  // `null` = ainda não animou, então renderiza o valor final (SSR e no-JS).
  const [current, setCurrent] = useState<number | null>(null);

  const target = parsed?.target ?? 0;
  const animatable = parsed !== null && target > 0;

  useIsomorphicLayoutEffect(() => {
    if (!animatable) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCurrent(0);
  }, [animatable]);

  useEffect(() => {
    if (!animatable) return;

    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") {
      setCurrent(target);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      setCurrent(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [animatable, target, duration]);

  if (!parsed) return <span className={className}>{value}</span>;

  const shown = current ?? target;

  return (
    <span
      ref={ref}
      // `tabular-nums` trava a largura dos dígitos: sem isso a faixa inteira
      // treme enquanto os números trocam.
      className={cn("tabular-nums", className)}
    >
      {parsed.prefix}
      {parsed.grouped ? shown.toLocaleString("pt-BR") : shown}
      {parsed.suffix}
    </span>
  );
}
