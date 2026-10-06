import { sectors } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Quantas vezes a lista se repete em CADA metade da faixa. Uma cópia só tem
 * ~750px: em telas largas ela não cobre a largura e, quando a animação volta
 * ao início, sobrava um vão vazio. Com 4 cópias a metade passa de 2.500px.
 */
const COPIES_PER_HALF = 4;

/** Duração base do marquee (32s em tailwind.config.ts) por cópia — mantém a
 *  velocidade de antes mesmo com a faixa mais longa. */
const SECONDS_PER_COPY = 32;

/**
 * Faixa contínua com os segmentos atendidos. A faixa tem duas metades
 * idênticas, para que a animação de marquee (translateX -50%) emende sem
 * salto.
 */
export function Sectors() {
  const loop = Array.from({ length: COPIES_PER_HALF * 2 }, () => sectors).flat();

  return (
    <section
      aria-label="Segmentos atendidos"
      className="overflow-hidden border-y border-brand-border bg-brand-bg-alt py-5"
    >
      <div
        className="flex w-max animate-marquee items-center gap-10 pr-10"
        style={{ animationDuration: `${COPIES_PER_HALF * SECONDS_PER_COPY}s` }}
      >
        {loop.map((sector, index) => (
          <span
            key={`${sector}-${index}`}
            className="flex shrink-0 items-center gap-10 whitespace-nowrap font-display text-[0.9375rem] font-bold text-rbs-green-deep"
          >
            {sector}
            <span
              aria-hidden="true"
              // separadores alternam vermelho e verde; cada metade tem um
              // número par de itens, então a alternância emenda sem repetir cor
              className={cn(
                "h-2 w-2 rounded-full",
                index % 2 === 0 ? "bg-rbs-red" : "bg-rbs-green",
              )}
            />
          </span>
        ))}
      </div>
    </section>
  );
}
