import { sectors } from "@/lib/content";

/**
 * Faixa contínua com os segmentos atendidos. A lista é duplicada para que a
 * animação de marquee (translateX -50%) emende sem salto.
 */
export function Sectors() {
  const loop = [...sectors, ...sectors];

  return (
    <section
      aria-label="Segmentos atendidos"
      className="overflow-hidden border-y border-premium-gold/20 bg-premium-black py-5"
    >
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {loop.map((sector, index) => (
          <span
            key={`${sector}-${index}`}
            className="flex shrink-0 items-center gap-10 whitespace-nowrap font-display text-sm uppercase tracking-[0.28em] text-premium-gold/70"
          >
            {sector}
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-premium-emerald-light"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
