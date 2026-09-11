import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { about } from "@/lib/content";
import { site } from "@/lib/site";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <Section id="sobre" tone="alt" surface="light" className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Bloco visual: foto da produção com a chamada sobreposta. */}
          <Reveal variant="left" className="relative order-last lg:order-first">
            {/* Este card é sempre escuro, mesmo dentro da seção clara —
                `data-surface="dark"` devolve os tokens escuros ao subconjunto. */}
            <div
              data-surface="dark"
              className={cn(
                // `pb-20` reserva espaço para o selo que avança sobre a base do card
                "relative flex flex-col justify-end overflow-hidden p-8 pb-20",
                // No celular a coluna é estreita e o texto ocupa mais linhas do
                // que cabe em 4:3 — ali o card cresce com o conteúdo. De sm em
                // diante a proporção fixa volta, para alinhar com o texto ao lado.
                "min-h-[24rem] sm:aspect-[4/3] sm:min-h-0",
                "rounded-brand border border-premium-emerald/35 bg-premium-black",
              )}
            >
              <Image
                src={about.showcase.photo}
                alt={about.showcase.alt}
                fill
                // a coluna é metade do Container (1440px) menos o gap-14
                sizes="(min-width: 1024px) 692px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                quality={90}
                className="object-cover"
              />

              {/* Escurecimento de baixo para cima — sem ele o texto brigaria
                  com as áreas claras da máquina. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-premium-black via-premium-black/80 to-premium-black/10"
              />

              <p className="relative font-display text-xl uppercase leading-snug tracking-[0.08em] text-premium-gold-light sm:text-2xl lg:text-3xl">
                {about.showcase.headline}
              </p>

              {/* Subtítulo: mesmo tipo, um degrau menor e em branco, para não
                  competir com a chamada dourada acima. */}
              <p className="relative mt-3 font-display text-base uppercase leading-snug tracking-[0.08em] text-brand-heading sm:text-lg lg:text-xl">
                {about.showcase.title}
              </p>

              <ul className="relative mt-4 space-y-2 text-sm text-brand-text">
                {about.showcase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-premium-gold"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-surface="dark"
              className="absolute -bottom-6 right-4 hidden rounded-brand border border-premium-gold/40 bg-premium-black px-6 py-5 shadow-gold sm:block lg:-right-6"
            >
              <p className="font-display text-3xl font-bold text-gold-sheen">
                {site.stats[0].value}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-muted">
                {site.stats[0].label}
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow={about.eyebrow}
              title={about.title}
              // a frase do "sobre" é longa: no degrau padrão (lg:text-5xl) ela
              // quebra em 5 linhas dentro da coluna de ~692px do grid de 2
              // colunas. Um degrau abaixo fecha em 3.
              titleClassName="lg:text-4xl"
            />

            <Reveal className="mt-6 space-y-5 text-base leading-relaxed text-brand-muted">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal variant="scale" className="mt-9">
              <ButtonLink href="#contato">
                Conversar com um consultor
              </ButtonLink>
            </Reveal>

            <span
              className={cn("mt-10 block", theme.ui.divider)}
              aria-hidden="true"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
