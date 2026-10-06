"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { visitSteps } from "@/lib/content";
import { theme, tones, visitStepTones } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Cards das etapas da visita, todos com a altura de texto da 1ª etapa (a
 * mais curta). Quando o texto de uma etapa passa dessa altura, ele fica
 * cortado com um esmaecido e aparece o botão "Ler mais".
 *
 * A altura é medida no navegador (e remedida ao redimensionar), porque o
 * número de linhas muda com a largura da coluna. Até medir, vale um teto
 * aproximado (`FALLBACK`), para a página não abrir com os cards esticados.
 */
const FALLBACK = 208;

export function VisitSteps() {
  const bodies = useRef<(HTMLDivElement | null)[]>([]);
  const [limit, setLimit] = useState<number | null>(null);
  const [full, setFull] = useState<number[]>([]);
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  const measure = useCallback(() => {
    const heights = bodies.current.map((el) => el?.scrollHeight ?? 0);
    setFull(heights);
    setLimit(heights[0] || FALLBACK);
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    bodies.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [measure]);

  function toggle(index: number) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  const collapsed = limit ?? FALLBACK;

  return (
    // `items-start`: abrir um card não estica os vizinhos da mesma linha
    <ol className="relative mt-12 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Linha que costura as quatro etapas no desktop */}
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 top-14 hidden h-px bg-brand-border lg:block"
      />

      {visitSteps.map((step, index) => {
        const Icon = step.icon;
        const tone = tones[visitStepTones[index % visitStepTones.length]];
        // 2px de folga: arredondamento da medida não vira um "Ler mais" à toa
        const overflows = (full[index] ?? 0) > collapsed + 2;
        const expanded = open.has(index);
        const bodyId = `etapa-visita-${index}`;

        return (
          <Reveal
            as="li"
            key={step.step}
            delay={index * 130}
            className={cn("relative flex flex-col p-7 lg:p-8", theme.ui.card, theme.ui.cardHover)}
          >
            <span className={cn("inline-flex h-14 w-14 items-center justify-center", theme.ui.iconBox, tone.box)}>
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>

            <span className={cn("mt-5", theme.ui.caption, tone.text)}>{step.step}</span>
            {/* altura de 2 linhas no desktop: os parágrafos dos quatro
                cards começam na mesma linha */}
            <h3 className="mt-1 text-lg leading-snug lg:min-h-[3.4rem]">{step.title}</h3>

            <div
              id={bodyId}
              className="relative mt-3 overflow-hidden transition-[max-height] duration-500 ease-out"
              style={{
                maxHeight: expanded ? full[index] || undefined : index === 0 ? undefined : collapsed,
              }}
            >
              <div
                ref={(el) => {
                  bodies.current[index] = el;
                }}
                className="space-y-4 text-[0.9375rem] leading-[1.7] text-brand-muted [text-wrap:pretty]"
              >
                {step.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>

              {/* esmaecido sobre a última linha enquanto o texto está cortado */}
              {overflows && !expanded ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-brand-surface to-transparent"
                />
              ) : null}
            </div>

            {/* Mesma altura de rodapé em todos os cards — com ou sem botão —
                para que fiquem do mesmo tamanho enquanto fechados. */}
            <div className="mt-4 h-6">
              {overflows ? (
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={expanded}
                  aria-controls={bodyId}
                  className="inline-flex items-center gap-1 rounded-brand font-display text-sm font-bold text-brand-green transition-colors duration-200 hover:text-brand-primary-hover"
                >
                  {expanded ? "Ler menos" : "Ler mais"}
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>
              ) : null}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
