import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";

/**
 * Hero alternativo (V2) — proposta em teste, NÃO substitui o `Hero` original.
 * Visualização: /preview/hero-v2
 *
 * Direção: superfície clara, tipografia forte e uma única imagem tratada como
 * peça editorial. O verde fica restrito a detalhes (palavra de destaque,
 * ícones, um bloco de apoio atrás da foto); o amarelo marca só o CTA
 * principal. Benefícios, selos e avaliações saem da primeira dobra — já
 * existem nas seções logo abaixo (Diferenciais, Avaliações).
 */

/** Só diferenciais já confirmados no site (ver `differentials` em lib/content.ts)
 *  e que não repetem o subtítulo. */
const microInfo = [
  "Visita sem compromisso",
  "Medidas tiradas no local",
];

export function HeroV2() {
  return (
    <section
      id="inicio"
      data-surface="light"
      className="relative isolate overflow-hidden bg-rbs-offwhite pb-14 pt-[calc(var(--header-h)+2.5rem)] sm:pb-20 lg:flex lg:min-h-[min(100svh,880px)] lg:items-center lg:pb-20 lg:pt-[calc(var(--header-h)+3rem)]"
    >
      {/* Faixa creme à direita: separa as colunas sem usar cor forte */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[38%] bg-rbs-cream lg:block"
      />

      <Container className="w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-24">
          {/* ====================================================
              COLUNA ESQUERDA — mensagem
          ==================================================== */}
          <div className="max-w-[40rem]">
            <Reveal className="inline-flex items-center gap-2.5 font-display text-xs font-semibold uppercase tracking-[0.06em] text-rbs-green sm:text-[0.8125rem] sm:tracking-[0.08em]">
              <span aria-hidden="true" className="hidden h-px w-8 bg-rbs-yellow sm:block" />
              Especialistas em uniformes profissionais
            </Reveal>

            <Reveal
              as="h1"
              delay={90}
              className="mt-6 text-[clamp(2.4rem,9vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.025em] text-rbs-ink sm:text-[3.5rem] lg:text-[3.75rem] xl:text-[4.25rem]"
            >
              Uniformes que <span className="text-rbs-green">valorizam</span>{" "}
              a sua equipe.
            </Reveal>

            <Reveal
              as="p"
              delay={180}
              className="mt-6 max-w-[34rem] text-base leading-7 text-brand-muted sm:text-lg sm:leading-8"
            >
              Soluções em uniformes para condomínios, empresas, síndicos e
              administradoras, com atendimento prático e personalizado.
            </Reveal>

            <Reveal
              delay={260}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
            >
              <ButtonLink
                href="#contato"
                tone="accent"
                size="lg"
                className="w-full gap-3 shadow-[0_10px_24px_-12px_rgb(var(--rbs-yellow)/0.9)] sm:w-auto"
                icon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
              >
                Solicitar orçamento
              </ButtonLink>

              <a
                href="#sobre"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 font-display text-base font-semibold text-rbs-ink sm:justify-start"
              >
                <span className="border-b border-rbs-ink/25 pb-0.5 transition-colors duration-200 group-hover:border-rbs-green group-hover:text-rbs-green">
                  Conhecer a RBS
                </span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-rbs-green"
                  aria-hidden="true"
                />
              </a>
            </Reveal>

            <Reveal
              as="ul"
              delay={340}
              className="mt-8 flex flex-col gap-3 border-t border-brand-border pt-6 sm:flex-row sm:gap-8"
            >
              {microInfo.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-medium text-rbs-ink/80"
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rbs-green-soft text-rbs-green">
                    <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </Reveal>
          </div>

          {/* ====================================================
              COLUNA DIREITA — imagem editorial
          ==================================================== */}
          <Reveal variant="fade" delay={200} className="relative mx-auto w-full max-w-[28rem] lg:max-w-none">
            {/* Bloco verde de apoio, deslocado atrás da foto */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 top-10 left-10 rounded-[1.25rem] bg-rbs-green-deep sm:-bottom-5 sm:-right-5"
            />

            <div className="relative aspect-square overflow-hidden rounded-[1.25rem] shadow-[0_30px_60px_-30px_rgb(var(--rbs-ink)/0.45)] lg:aspect-[4/5] xl:aspect-square">
              {/* Recorte pela direita: o degradê verde da arte original fica
                  fora do quadro e a foto aparece limpa. */}
              <Image
                src="/hero/hero5.png"
                alt="Mesa de produção da RBS com camisas polo dobradas e máquina de costura"
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-right lg:object-[92%_center]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
