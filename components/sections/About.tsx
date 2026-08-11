import { Check, Scissors } from "lucide-react";

import { SunBurst } from "@/components/decor/Scenery";
import { ButtonLink } from "@/components/ui/Button";
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
          {/*
            Bloco visual. Substitua por uma foto da fábrica/equipe quando houver
            material fotográfico — o container já está no formato correto.
          */}
          <div className="relative order-last lg:order-first">
            {/* Este card é sempre escuro, mesmo dentro da seção clara —
                `data-surface="dark"` devolve os tokens escuros ao subconjunto. */}
            <div
              data-surface="dark"
              className={cn(
                // `pb-20` reserva espaço para o selo que avança sobre a base do card
                "relative flex aspect-[4/3] flex-col justify-end overflow-hidden p-8 pb-20",
                "rounded-brand border border-premium-emerald/35 bg-gradient-to-br from-premium-emerald-deep via-premium-black to-premium-black",
              )}
            >
              <SunBurst className="absolute -right-16 -top-16 h-64 w-64 opacity-25" />

              <Scissors
                className="absolute left-8 top-8 h-10 w-10 text-premium-gold/70"
                aria-hidden="true"
              />

              <p className="relative max-w-xs font-display text-2xl uppercase leading-snug tracking-[0.08em] text-premium-gold-light">
                Do croqui à entrega, tudo acontece dentro de casa.
              </p>
              <p className="relative mt-3 max-w-[14rem] text-sm text-brand-muted">
                {/* herda os tokens escuros do card acima */}
                Corte, costura, bordado e controle de qualidade sob o mesmo teto.
              </p>
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
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow={about.eyebrow}
              title={about.title}
            />

            <div className="mt-6 space-y-5 text-base leading-relaxed text-brand-muted">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-8 space-y-3">
              {about.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-brand-text">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <ButtonLink href="#contato" className="mt-9">
              Conversar com um consultor
            </ButtonLink>

            <span className={cn("mt-10 block", theme.ui.divider)} aria-hidden="true" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
