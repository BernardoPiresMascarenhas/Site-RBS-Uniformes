"use client";

import { ZoomIn } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { PhotoZoom } from "@/components/PhotoZoom";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

export interface ProductGalleryImage {
  /** Caminho em `public/`. */
  src: string;
  alt: string;
  /** Selo discreto sobre a foto quando ela está na posição principal, ex.: "Foto ilustrativa". */
  note?: string;
}

/** Duração da troca (ms) — o mesmo valor vai para o CSS. */
const SWAP_MS = 560;

/**
 * Galeria de uma peça: uma foto grande e, no canto inferior esquerdo, uma
 * miniatura quadrada com a outra foto. Clicar na miniatura faz as duas
 * trocarem de lugar — a pequena cresce até ocupar o quadro enquanto a grande
 * encolhe até o quadradinho, num movimento contínuo.
 *
 * Como a troca funciona (sem biblioteca de animação):
 * cada foto é uma camada do tamanho do quadro inteiro, sempre com a mesma
 * imagem renderizada em alta resolução. Na posição de miniatura, a camada é
 * reduzida com `scale` (a partir do canto superior esquerdo), deslocada com
 * `translate` e recortada num quadrado central com `clip-path`. Trocar de
 * papel só troca esses três valores — o navegador interpola `transform` e
 * `clip-path` juntos, sem mexer no layout (o quadro nunca muda de tamanho).
 * As contas usam unidades de container (`cqw`/`cqh`), então a primeira pintura
 * já sai certa, sem medir nada em JS.
 *
 * O tamanho da miniatura é uma fração da altura do quadro (`--k`), ajustada por
 * tela para ficar entre ~90 px no celular e ~130–140 px no desktop.
 *
 * Com mais de duas fotos, a miniatura mostra sempre a próxima.
 * `prefers-reduced-motion`: a troca é imediata, sem movimento.
 */
export function ProductImageGallery({
  images,
  label,
  sizes,
  priority,
  className,
}: {
  images: ProductGalleryImage[];
  /** Nome da peça, para leitores de tela. */
  label: string;
  /** `sizes` das fotos — largura real do quadro. */
  sizes: string;
  /** A primeira foto é a da primeira dobra: carrega com prioridade. */
  priority?: boolean;
  /** Proporção, borda e fundo do quadro (ex.: `aspect-[4/3]`). */
  className?: string;
}) {
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const go = useCallback(
    (next: number) => {
      if (count < 2) return;
      setIndex(((next % count) + count) % count);
      // durante a troca, o contorno e a sombra da miniatura saem de cena — eles
      // ficam parados no canto e não podem "emoldurar" uma foto em movimento
      setSwapping(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setSwapping(false), SWAP_MS);
    },
    [count],
  );
  const closeZoom = useCallback(() => setZoomOpen(false), []);

  const thumbIndex = (index + 1) % count;
  const current = images[index];
  const thumb = images[thumbIndex];

  return (
    <div role="region" aria-roledescription="galeria" aria-label={`Fotos: ${label}`}>
      <div
        className={cn(
          "relative overflow-hidden [container-type:size]",
          // fração da altura do quadro ocupada pela miniatura, e sua distância das bordas
          "[--k:0.32] [--m:12px] sm:[--k:0.24] sm:[--m:20px] md:[--k:0.2] lg:[--k:0.3] xl:[--k:0.25]",
          // passar o mouse na miniatura a ergue um pouco (foto, contorno e sombra juntos)
          "[--lift:0px] [@media(hover:hover)]:[&:has([data-thumb]:hover)]:[--lift:-3px]",
          className,
        )}
      >
        {images.map((image, slide) => {
          const role = slide === index ? "main" : slide === thumbIndex ? "thumb" : "hidden";
          return (
            // invólucro: só a elevação do hover, com tempo próprio (mais curto que a troca)
            <div
              key={image.src}
              aria-hidden={role === "main" ? undefined : true}
              className="pointer-events-none absolute inset-0 transition-transform duration-200 ease-out motion-reduce:transition-none"
              style={{
                // a foto que encolhe passa por cima da que cresce: parece sair da frente
                zIndex: role === "main" ? 0 : 1,
                transform: role === "main" ? undefined : "translateY(var(--lift))",
              }}
            >
            <div
              className="absolute inset-0 origin-top-left motion-reduce:!transition-none"
              style={layerStyle(role)}
            >
              <Photo
                src={image.src}
                alt={role === "main" ? image.alt : ""}
                fill
                sizes={sizes}
                priority={priority && slide === 0}
                // a miniatura já está na tela e é ela que vai crescer: baixa em
                // alta resolução, mas sem disputar a rede com a principal
                loading="eager"
                fetchPriority={slide === 0 ? undefined : "low"}
                draggable={false}
                className="object-cover"
              />
            </div>
            </div>
          );
        })}

        {/* Foto grande: clicar amplia */}
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 z-10 cursor-zoom-in"
        />

        {count > 1 ? (
          <>
            {/* sombra da miniatura (fora do recorte da camada, que cortaria a sombra) */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute z-[1] rounded-[10px] shadow-[0_10px_28px_-8px_rgba(15,23,42,0.45),0_2px_6px_rgba(15,23,42,0.18)]",
                "transition-[opacity,transform] duration-200 motion-reduce:transition-none",
                swapping ? "opacity-0" : "opacity-100",
              )}
              style={{ ...thumbBox, transform: "translateY(var(--lift))" }}
            />

            {/* Miniatura: botão do tamanho exato do quadradinho */}
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={`Ver foto: ${thumb.alt}${thumb.note ? ` (${thumb.note.toLowerCase()})` : ""}`}
              data-thumb=""
              className={cn(
                "absolute z-20 cursor-pointer rounded-[10px] outline-none",
                "transition-transform duration-200 ease-out motion-reduce:transition-none",
                "focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
              )}
              style={{ ...thumbBox, transform: "translateY(var(--lift))" }}
            >
              {/* contorno branco */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 rounded-[10px] border-2 border-white/95",
                  "transition-opacity duration-200 motion-reduce:transition-none",
                  swapping ? "opacity-0" : "opacity-100",
                )}
              />
            </button>
          </>
        ) : null}

        {/* Selo da foto principal (ex.: foto ilustrativa) */}
        {images.map((image, slide) =>
          image.note ? (
            <span
              key={image.src}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-white/90 px-2.5 py-1 font-display text-[0.6875rem] font-semibold text-brand-muted shadow-brand backdrop-blur sm:left-4 sm:top-4",
                "transition-opacity duration-300 motion-reduce:transition-none",
                slide === index ? "opacity-100 delay-200" : "opacity-0",
              )}
            >
              {image.note}
            </span>
          ) : null,
        )}

        {/* Ampliar: abre a foto que está na posição principal */}
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label={`Ampliar foto: ${current.alt}`}
          className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-white/95 px-3.5 py-2 font-display text-xs font-semibold text-brand-heading shadow-brand backdrop-blur transition-colors duration-200 hover:border-brand-green hover:text-brand-green"
        >
          <ZoomIn className="h-4 w-4" aria-hidden="true" />
          Ampliar
        </button>
      </div>

      {/* anuncia a troca para leitores de tela */}
      <p className="sr-only" aria-live="polite">
        {count > 1
          ? `Foto ${index + 1} de ${count}: ${current.alt}${current.note ? ` (${current.note.toLowerCase()})` : ""}`
          : null}
      </p>

      <PhotoZoom
        src={current.src}
        alt={current.alt}
        note={current.note}
        position={count > 1 ? `${index + 1} de ${count}` : undefined}
        open={zoomOpen}
        onClose={closeZoom}
        onPrev={count > 1 ? () => go(index - 1) : undefined}
        onNext={count > 1 ? () => go(index + 1) : undefined}
      />
    </div>
  );
}

/**
 * Caixa da miniatura no quadro: quadrada, `--k` da altura, a `--m` das bordas
 * esquerda e inferior.
 */
const thumbBox: CSSProperties = {
  left: "var(--m)",
  bottom: "var(--m)",
  width: "calc(var(--k) * 100cqh)",
  height: "calc(var(--k) * 100cqh)",
};

/** Raio visível dos cantos da miniatura. */
const THUMB_RADIUS = 10;

/**
 * Posição de cada camada. As três funções (`translate`, `scale`, `clip-path`)
 * têm a mesma forma nos dois papéis, para o navegador interpolar entre eles.
 *
 * Miniatura: a camada (quadro inteiro, W × H) é reduzida por `--k` a partir do
 * canto superior esquerdo e recortada no quadrado central H × H — que, reduzido,
 * vira o quadradinho de `--k`·H. O `translate` leva esse quadrado até a `--m`
 * das bordas esquerda e inferior.
 */
function layerStyle(role: "main" | "thumb" | "hidden"): CSSProperties {
  // laterais cortadas para sobrar o quadrado central (no tamanho cheio)
  const side = "calc((100cqw - 100cqh) / 2)";
  const transition = `transform ${SWAP_MS}ms cubic-bezier(0.65, 0, 0.25, 1), clip-path ${SWAP_MS}ms cubic-bezier(0.65, 0, 0.25, 1), opacity 200ms ease`;

  if (role === "main") {
    return {
      transform: "translate3d(0px, 0px, 0px) scale(1)",
      clipPath: "inset(0px 0px 0px 0px round 0px)",
      transition,
    };
  }

  return {
    transform: `translate3d(calc(var(--m) - var(--k) * ${side}), calc(100cqh - var(--m) - var(--k) * 100cqh), 0px) scale(var(--k))`,
    clipPath: `inset(0px ${side} 0px ${side} round calc(${THUMB_RADIUS}px / var(--k)))`,
    opacity: role === "hidden" ? 0 : 1,
    transition,
  };
}
