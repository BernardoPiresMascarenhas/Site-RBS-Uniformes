import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { theme, tones, type Tone } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Indicador acima de cada número. */
const markers: Tone[] = ["green", "red", "green"];

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-brand-primary/15 bg-brand-green-soft">
      <Container size="wide">
        {/* No mobile os números viram uma lista empilhada com divisórias
            horizontais — em duas colunas sobraria um item órfão e os rótulos
            longos quebrariam em várias linhas. */}
        <dl className="grid grid-cols-1 divide-y divide-brand-primary/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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
                <span
                  aria-hidden="true"
                  className={cn(
                    "mx-auto mb-4 block h-1 w-8 rounded-full",
                    tones[markers[index % markers.length]].dot,
                  )}
                />
                <CountUp
                  value={stat.value}
                  className={cn(
                    "block text-4xl leading-none lg:text-5xl",
                    theme.ui.statValue,
                  )}
                />
                <span className="mx-auto mt-2 block max-w-[16rem] text-sm leading-relaxed text-brand-muted lg:text-[0.9375rem]">
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
