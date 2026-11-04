"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

const ZOOM = 2.5;

/**
 * Visualizador em tela cheia da foto de uma peça, com zoom.
 *
 * - Clique (ou toque) na foto alterna entre a foto inteira e o zoom de 2,5×;
 *   com zoom, a área ampliada acompanha o mouse/dedo.
 * - Botões + / − fazem o mesmo, e Esc fecha.
 *
 * Renderizado num portal no `<body>`: o card da peça fica dentro de um
 * `Reveal`, cujo `transform` prenderia um `position: fixed` à coluna.
 */
export function PhotoZoom({
  src,
  alt,
  open,
  onClose,
}: {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setZoomed(false);
    setOrigin("50% 50%");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function follow(event: MouseEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    setOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  }

  if (!open || !mounted) return null;

  const control =
    "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 disabled:opacity-40";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada: ${alt}`}
      className="fixed inset-0 z-[60] flex flex-col bg-rbs-ink/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Barra de controles */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="min-w-0 truncate font-display text-sm font-semibold text-white/90">
          {alt}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className={control}
            onClick={() => setZoomed(false)}
            disabled={!zoomed}
            aria-label="Diminuir zoom"
          >
            <Minus className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={control}
            onClick={() => setZoomed(true)}
            disabled={zoomed}
            aria-label="Aumentar zoom"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            ref={closeRef}
            type="button"
            className={cn(control, "ml-2")}
            onClick={onClose}
            aria-label="Fechar"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Foto */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-6 sm:pb-6">
        <div
          className={cn(
            "relative aspect-[4/3] max-h-full w-full max-w-[min(100%,calc((100svh-6rem)*4/3))] overflow-hidden rounded-brand-lg bg-white",
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in",
          )}
          onClick={(event) => {
            event.stopPropagation();
            follow(event);
            setZoomed((value) => !value);
          }}
          onPointerMove={(event) => {
            if (zoomed) follow(event);
          }}
          style={{ touchAction: zoomed ? "none" : "auto" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            quality={95}
            className="object-contain transition-transform duration-200 ease-out motion-reduce:transition-none"
            style={{
              transform: zoomed ? `scale(${ZOOM})` : "scale(1)",
              transformOrigin: origin,
            }}
          />
        </div>
      </div>

      <p className="pb-4 text-center text-xs text-white/60" aria-hidden="true">
        {zoomed ? "Mova para explorar · clique para voltar" : "Clique na foto para ampliar"}
      </p>
    </div>,
    document.body,
  );
}
