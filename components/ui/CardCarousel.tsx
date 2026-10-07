"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

import { cn } from "@/lib/utils";

export interface CarouselSlide {
  src: string;
  alt: string;
  href: string;
  /** Nome da peça, usado no rótulo acessível do link e dos indicadores. */
  caption: string;
}

/** Tempo de cada foto na tela antes de passar para a próxima. */
const INTERVALO_MS = 3500;
/** Arrasto mínimo (px) para o toque contar como troca de slide e não clique. */
const LIMIAR_ARRASTO = 40;

/**
 * Vitrine em carrossel dos cards do catálogo: as fotos deslizam para o lado
 * sozinhas e cada uma leva para a peça correspondente na página da linha.
 *
 * Pausa com o mouse em cima ou com foco do teclado, e não anda sozinho para
 * quem pediu menos movimento no sistema (`prefers-reduced-motion`).
 */
export function CardCarousel({
  slides,
  className,
}: {
  slides: CarouselSlide[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);

  const total = slides.length;
  const go = useCallback(
    (index: number) => setActive(((index % total) + total) % total),
    [total],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || total < 2) return;
    const timer = window.setTimeout(() => go(active + 1), INTERVALO_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, reducedMotion, total, go]);

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === "mouse") return;
    dragStart.current = event.clientX;
    dragged.current = false;
  }

  function onPointerUp(event: PointerEvent) {
    if (dragStart.current === null) return;
    const delta = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) < LIMIAR_ARRASTO) return;
    dragged.current = true;
    go(delta < 0 ? active + 1 : active - 1);
  }

  const arrowClass =
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-heading shadow-md transition-opacity duration-200 hover:bg-white focus-visible:opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100";

  return (
    <div
      className={cn("group/carousel relative overflow-hidden", className)}
      role="region"
      aria-roledescription="carrossel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (dragStart.current = null)}
    >
      <div
        className="flex h-full touch-pan-y transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <Link
              key={slide.src}
              href={slide.href}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`Ver ${slide.caption}`}
              draggable={false}
              onClick={(event) => {
                // o toque que arrastou troca de slide, não abre a peça
                if (dragged.current) {
                  event.preventDefault();
                  dragged.current = false;
                }
              }}
              className="relative block h-full w-full shrink-0"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 100vw"
                // acima do padrão (75): o fundo escuro e liso das fotos é onde
                // a compressão vira faixa e mancha visíveis
                quality={90}
                // só a primeira entra no carregamento inicial; as demais vêm sob demanda
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
                className="object-cover transition-transform duration-500 group-hover/carousel:scale-[1.03]"
              />
            </Link>
          );
        })}
      </div>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(active - 1)}
            className={cn(arrowClass, "left-3")}
            aria-label="Foto anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            className={cn(arrowClass, "right-3")}
            aria-label="Próxima foto"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(index)}
                aria-label={`Mostrar ${slide.caption}`}
                aria-current={index === active}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === active ? "w-5 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
