"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { PartnerImage } from "@/lib/partners";
import { cn } from "@/lib/utils";

/** Altura do card no desktop (lg:h-60) — base para estimar a largura das faixas. */
const CARD_HEIGHT = 240;
const GAP = 16;
/** Metade da faixa precisa cobrir telas muito largas, senão sobra vão no loop. */
const MIN_HALF_WIDTH = 2600;
/** Velocidade do deslize, em px/s — devagar o bastante para ler os letreiros. */
const SPEED = 32;

type Indexed = PartnerImage & { index: number };

/**
 * Fotos dos condomínios em duas faixas que deslizam em sentidos opostos.
 * Passar o mouse (ou focar com o teclado) pausa a faixa; clicar abre a foto
 * ampliada, com navegação por setas.
 *
 * Com `prefers-reduced-motion` a animação para (regra global em
 * globals.css) e a faixa vira rolagem horizontal comum.
 */
export function ClientsGallery({ photos }: { photos: PartnerImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  const indexed: Indexed[] = photos.map((photo, index) => ({ ...photo, index }));
  // fotos alternadas entre as faixas: misturam retrato e paisagem nas duas
  const rows = [
    indexed.filter((_, i) => i % 2 === 0),
    indexed.filter((_, i) => i % 2 === 1),
  ].filter((row) => row.length > 0);

  return (
    <>
      <div className="flex flex-col gap-4">
        {rows.map((row, i) => (
          <MarqueeRow
            key={i}
            items={row}
            reverse={i % 2 === 1}
            paused={active !== null}
            onOpen={setActive}
          />
        ))}
      </div>

      {active !== null ? (
        <Lightbox photos={photos} index={active} onChange={setActive} onClose={() => setActive(null)} />
      ) : null}
    </>
  );
}

function MarqueeRow({
  items,
  reverse,
  paused,
  onOpen,
}: {
  items: Indexed[];
  reverse: boolean;
  paused: boolean;
  onOpen: (index: number) => void;
}) {
  const copyWidth = items.reduce(
    (sum, photo) => sum + (CARD_HEIGHT * photo.width) / photo.height + GAP,
    0,
  );
  // quantas cópias da linha formam cada metade da faixa (o loop anda -50%)
  const copies = Math.max(1, Math.ceil(MIN_HALF_WIDTH / copyWidth));
  const track = Array.from({ length: copies * 2 }, (_, copy) =>
    items.map((photo) => ({ photo, copy })),
  ).flat();

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:overflow-x-auto">
      <div
        className="flex w-max animate-marquee gap-4 pr-4 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
        style={{
          animationDuration: `${Math.round((copyWidth * copies) / SPEED)}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : undefined,
        }}
      >
        {track.map(({ photo, copy }) => {
          // só a primeira cópia é navegável; as demais existem para o loop
          const clone = copy > 0;

          return (
            <button
              key={`${photo.src}-${copy}`}
              type="button"
              onClick={() => onOpen(photo.index)}
              aria-hidden={clone || undefined}
              tabIndex={clone ? -1 : undefined}
              aria-label={clone ? undefined : `Ampliar: ${photo.alt}`}
              className="group relative h-40 shrink-0 overflow-hidden rounded-brand-lg border border-brand-border bg-brand-surface shadow-brand sm:h-52 lg:h-60"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                src={photo.src}
                alt={clone ? "" : photo.alt}
                fill
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 320px, 240px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {/* Véu + ícone de ampliar no hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-rbs-green-deep/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-rbs-green-deep">
                  <Expand className="h-4 w-4" />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Lightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: PartnerImage[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];
  const total = photos.length;

  const go = useCallback(
    (step: number) => onChange((index + step + total) % total),
    [index, onChange, total],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  useEffect(() => closeRef.current?.focus(), []);

  const arrow =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fotos dos condomínios atendidos"
      data-surface="dark"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-rbs-green-deep/90 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className={cn(arrow, "absolute right-4 top-4 sm:right-6 sm:top-6")}
      >
        <X className="h-5 w-5" />
      </button>

      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-5xl items-center justify-center gap-3 sm:gap-5"
      >
        <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className={arrow}>
          <ChevronLeft className="h-5 w-5" />
        </button>

        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1024px) 900px, 90vw"
          className="h-auto max-h-[78vh] w-auto min-w-0 animate-fade-up rounded-brand-lg object-contain shadow-brand-lg"
          // fotos pequenas (vindas de celular) não esticam além de 1,5× — evita borrão
          style={{ maxWidth: `min(100%, ${Math.round(photo.width * 1.5)}px)` }}
        />

        <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className={arrow}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="font-display text-sm font-semibold text-brand-muted" aria-live="polite">
        {index + 1} / {total}
      </p>
    </div>,
    document.body,
  );
}
