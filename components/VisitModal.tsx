"use client";

import { HelpCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ButtonLink } from "@/components/ui/Button";
import { visit, visitSteps } from "@/lib/content";

/**
 * Botão do hero + pop-up explicando como funciona a visita técnica.
 *
 * Diálogo próprio (sem lib): fecha no Esc, no clique fora e no X, e trava o
 * scroll do body enquanto está aberto — mesmo padrão do menu mobile.
 *
 * No mobile ele vira um bottom sheet colado na base da tela: cabeçalho e
 * botões ficam fixos (o X sempre visível) e só a lista de etapas rola, para
 * que o conteúdo nunca estoure a viewport nem esconda o fechar.
 *
 * O diálogo sai por um portal no `body`. O botão vive dentro do hero, que é
 * `isolate` e tem camadas próprias (a coluna de texto é `z-10`, o painel de
 * diferenciais é `z-20`): renderizado ali dentro, o `z-[60]` ficaria preso no
 * contexto de empilhamento da coluna e o pop-up abriria por baixo dos
 * diferenciais — e também por baixo da navbar `z-50` e do FAB `z-40`.
 */
export function VisitModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // `document` só existe no cliente: o portal espera a hidratação.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-brand border border-premium-gold/30 px-5 py-2.5 font-display text-xs uppercase tracking-[0.16em] text-premium-gold-light transition-colors hover:border-premium-gold/60 hover:bg-premium-gold/10 hover:text-premium-gold sm:border-transparent sm:px-2 sm:text-sm sm:hover:bg-transparent"
      >
        <HelpCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        Como funciona a visita?
      </button>

      {open && mounted
        ? createPortal(
            <div
              // Acima da navbar (z-50) e do FAB (z-40) — o portal garante que o
              // z-index seja comparado na raiz, e não dentro do hero.
              className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
              onClick={() => setOpen(false)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-visita"
                onClick={(event) => event.stopPropagation()}
                // teto de altura na viewport: em telas baixas o diálogo encolhe
                // e a lista de etapas rola, em vez de estourar a tela
                className="flex max-h-[88svh] w-full animate-fade-up flex-col overflow-hidden rounded-t-brand-lg border border-premium-gold/35 bg-premium-black text-left shadow-brand-lg sm:max-h-[calc(100svh-4rem)] sm:max-w-xl sm:rounded-brand"
              >
                {/* Cabeçalho fixo — o X acompanha a rolagem da lista. */}
                <div className="shrink-0 border-b border-premium-gold/20 px-5 pb-5 pt-4 sm:px-9 sm:pb-6 sm:pt-7">
                  {/* Alça visual do bottom sheet (só no mobile). */}
                  <span
                    aria-hidden="true"
                    className="mx-auto mb-4 block h-1 w-10 rounded-full bg-premium-gold/35 sm:hidden"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-premium-gold sm:text-xs sm:tracking-[0.36em]">
                        {visit.eyebrow}
                      </span>
                      <h2
                        id="titulo-visita"
                        className="mt-2 font-display text-xl uppercase leading-tight tracking-[0.05em] text-premium-gold-light sm:mt-3 sm:text-3xl"
                      >
                        {visit.title}
                      </h2>
                    </div>

                    <button
                      ref={closeRef}
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Fechar"
                      className="-mr-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-brand border border-premium-gold/35 text-premium-gold transition-colors hover:bg-premium-gold/10"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Corpo rolável — `overscroll-contain` evita arrastar a página atrás. */}
                {/* sem `flex-1`: o diálogo tem altura de conteúdo até bater no
                `max-h`, e só então esta faixa encolhe e passa a rolar */}
                <div className="min-h-0 shrink overflow-y-auto overscroll-contain px-5 py-6 sm:px-9 sm:py-7">
                  <p className="text-sm leading-relaxed text-brand-text sm:text-base">
                    {visit.subtitle}
                  </p>

                  <ol className="mt-6 space-y-5">
                    {visitSteps.map((step) => {
                      const Icon = step.icon;

                      return (
                        <li key={step.step} className="flex gap-3.5 sm:gap-4">
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-brand border border-premium-emerald/40 bg-premium-emerald/12 text-premium-emerald-light sm:h-11 sm:w-11">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div>
                            <span className="block font-display text-[0.65rem] uppercase tracking-[0.22em] text-premium-gold">
                              {step.step}
                            </span>
                            <h3 className="mt-1 font-display text-sm uppercase tracking-[0.1em] text-brand-heading">
                              {step.title}
                            </h3>
                            <div className="mt-1.5 space-y-2 text-sm leading-relaxed text-brand-muted">
                              {step.paragraphs.map((paragraph) => (
                                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {/* Rodapé fixo. Fecha o pop-up ao seguir qualquer um dos dois
                caminhos — a âncora #contato rola a página por trás do overlay.
                O padding extra respeita a barra de gestos do iOS. */}
                <div
                  onClick={() => setOpen(false)}
                  className="shrink-0 flex flex-col gap-3 border-t border-premium-gold/20 bg-premium-black px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:flex-row sm:px-9 sm:py-6"
                >
                  <ButtonLink
                    href="#contato"
                    className="w-full text-sm sm:w-auto sm:text-base"
                  >
                    Agendar visita
                  </ButtonLink>
                  <ButtonLink
                    href="#visita"
                    tone="secondary"
                    className="w-full text-sm sm:w-auto sm:text-base"
                  >
                    Ver mais detalhes
                  </ButtonLink>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
