import { ExternalLink, Quote, Star } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { googleReviewsUrl, testimonials } from "@/lib/content";
import { theme, tones, type Tone } from "@/lib/theme";
import { cn, initials } from "@/lib/utils";

/** Cor do avatar de cada depoimento. */
const avatarTones: Tone[] = ["yellow"];

/**
 * Depoimentos de clientes lado a lado (cinco colunas no desktop) e, abaixo,
 * uma faixa amarela com o convite para avaliar no Google. Superfície
 * verde-escura: contrasta com as seções claras vizinhas (Clientes e Dúvidas).
 */
export function Testimonials() {
  return (
    <Section id="avaliacoes" surface="dark">
      <Container>
        <SectionHeading
          eyebrow="Avaliações"
          eyebrowClassName="text-rbs-yellow"
          dividerClassName="bg-rbs-yellow"
          title="O que dizem nossos clientes"
          description="Síndicos e administradoras contam como foi trabalhar com a RBS Uniformes."
        />

        {/* 5 colunas a partir de xl; abaixo disso, 3 e 2 colunas, até 1 no celular */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {testimonials.map((item, index) => {
            const tone = tones[avatarTones[index % avatarTones.length]];

            return (
              <Reveal
                as="figure"
                key={item.name}
                delay={index * 90}
                className={cn("flex flex-col p-6", theme.ui.card, theme.ui.cardHover)}
              >
                <Quote
                  className="h-6 w-6 shrink-0 fill-rbs-yellow text-rbs-yellow"
                  aria-hidden="true"
                />
                <blockquote className="mb-6 mt-4 text-[0.9375rem] leading-[1.65] text-brand-text">
                  “{item.text}”
                </blockquote>
                {/* `mt-auto`: o nome fica na base, alinhado nos cinco cards;
                    o `mb-6` do texto garante o respiro mínimo */}
                <figcaption className="mt-auto flex items-center gap-3 border-t border-brand-border pt-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold",
                      tone.box,
                    )}
                  >
                    {initials(item.name)}
                  </span>
                  <span className="font-display text-base font-bold leading-tight text-brand-heading">
                    {item.name}
                  </span>
                </figcaption>
              </Reveal>
            );
          })}
        </div>

        {/* Convite para avaliar no Google */}
        <Reveal
          data-surface="light"
          className="mt-8 flex flex-col gap-6 rounded-brand-lg bg-rbs-yellow p-7 text-rbs-green-deep shadow-brand-lg sm:p-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex shrink-0 gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-rbs-green-deep text-rbs-green-deep" />
              ))}
            </div>
            <div>
              <p className="font-display text-xl font-bold leading-snug tracking-tight">
                É cliente da RBS Uniformes?
              </p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed">
                Venha deixar a sua avaliação no Google — ela ajuda outros síndicos
                a conhecer o nosso trabalho.
              </p>
            </div>
          </div>
          <ButtonLink
            href={googleReviewsUrl}
            external
            size="lg"
            className="w-full shrink-0 lg:w-auto"
            icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
          >
            Avaliar no Google
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
