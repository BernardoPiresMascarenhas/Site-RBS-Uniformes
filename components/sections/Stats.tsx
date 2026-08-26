import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-premium-gold/20 bg-gradient-to-r from-premium-emerald-deep/70 via-premium-ink to-premium-emerald-deep/70">
      {/* Fio esmeralda no topo — leva o verde da montanha para dentro da faixa. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block h-px bg-gradient-to-r from-transparent via-premium-emerald-light/60 to-transparent"
      />
      <Container size="wide">
        {/* No mobile os números viram uma lista empilhada com divisórias
            horizontais — em duas colunas sobraria um item órfão e os rótulos
            longos quebrariam em várias linhas. */}
        <dl className="grid grid-cols-1 divide-y divide-brand-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {site.stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              variant="up"
              // escalonado: os três números entram em cascata, não em bloco
              delay={index * 130}
              className="px-4 py-6 text-center sm:py-10"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <CountUp
                  value={stat.value}
                  className={cn(
                    "block text-4xl leading-none lg:text-5xl",
                    theme.ui.statValue,
                  )}
                />
                <span className="mx-auto mt-2 block max-w-[16rem] text-[0.7rem] uppercase leading-relaxed tracking-[0.16em] text-brand-muted sm:text-xs sm:tracking-[0.12em] lg:text-sm">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
