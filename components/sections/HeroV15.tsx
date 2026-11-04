import Image from "next/image";
import { CalendarDays, FileText, ShieldCheck, Star } from "lucide-react";

import { VisitModal } from "@/components/VisitModal";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { testimonials } from "@/lib/content";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";
import { cn, initials } from "@/lib/utils";

/**
 * Hero V1.5 — refinamento do `Hero` original (V1), em teste.
 * Visualização: /preview/hero-v1-5
 *
 * Mesmos textos, links e prova social da V1; muda só o acabamento:
 * véu verde mais curto (a foto respira no centro e à direita), título com
 * mais presença, CTAs mais compactos e faixa de confiança organizada.
 */

/** Véu do desktop: escuro só sob o texto, some antes do centro da foto. */
const scrimDesktop = [
  // leve sombra sob o header
  "linear-gradient(180deg, rgb(var(--rbs-green-deep) / 0.35) 0%, transparent 14%)",
  // base: assenta a faixa de confiança e a transição para a próxima seção
  "linear-gradient(0deg, rgb(var(--rbs-green-deep) / 0.34) 0%, transparent 20%)",
  // horizontal progressivo
  "linear-gradient(90deg, rgb(var(--rbs-green-deep) / 0.94) 0%, rgb(var(--rbs-green-deep) / 0.86) 24%, rgb(var(--rbs-green-deep) / 0.56) 39%, rgb(var(--rbs-green-deep) / 0.2) 53%, rgb(var(--rbs-green-deep) / 0.04) 67%, transparent 78%)",
].join(", ");

/** Véu do celular/tablet: o texto ocupa a largura toda, então o véu é
 *  vertical — mais leve no meio, onde a foto aparece entre os blocos. */
const scrimMobile = [
  "linear-gradient(180deg, rgb(var(--rbs-green-deep) / 0.86) 0%, rgb(var(--rbs-green-deep) / 0.7) 45%, rgb(var(--rbs-green-deep) / 0.82) 100%)",
  "linear-gradient(90deg, rgb(var(--rbs-green-deep) / 0.3) 0%, transparent 70%)",
].join(", ");

const ctaBase =
  "group h-auto min-h-[3.5rem] w-full justify-start gap-3.5 whitespace-normal rounded-xl px-4 py-2.5 text-left transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rbs-green-deep motion-safe:hover:-translate-y-px sm:w-auto sm:min-w-[15.5rem] sm:pr-6";

const ctaIcon =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200";

export function HeroV15() {
  return (
    <section
      id="inicio"
      data-surface="dark"
      className="relative isolate overflow-hidden bg-brand-bg pb-12 pt-[calc(var(--header-h)+3rem)] sm:pb-16 sm:pt-[calc(var(--header-h)+4rem)] lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pb-16 lg:pt-[calc(var(--header-h)+3.5rem)]"
    >
      {/* ======================================================
          FOTO DE FUNDO — mesma imagem e enquadramento da V1
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[var(--header-h)] -z-20 overflow-hidden"
      >
        <Image
          src="/hero/hero5.png"
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[70%_center] lg:object-center"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[var(--header-h)] -z-10 lg:hidden"
        style={{ background: scrimMobile }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[var(--header-h)] -z-10 hidden lg:block"
        style={{ background: scrimDesktop }}
      />

      <Container size="wide" className="relative">
        <div className="max-w-[40rem] lg:max-w-[44rem] 2xl:max-w-[50rem]">
          {/* Selo */}
          <Reveal className="inline-flex items-center gap-2 rounded-full bg-rbs-yellow py-1.5 pl-3 pr-3.5 font-display text-xs font-bold sm:pr-4 sm:text-[0.8125rem] text-rbs-green-deep">
            <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Especialistas em uniformes para condomínios</span>
          </Reveal>

          {/* Título — mesmas duas linhas da V1 */}
          <Reveal
            as="h1"
            delay={90}
            // celular: a fonte acompanha a largura útil para "A praticidade
            // que todo" caber numa linha (~11× a fonte, com folga)
            className="mt-6 text-[clamp(1.75rem,calc((100vw-2.5rem)/11.4),2.25rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-white sm:mt-7 sm:text-[3rem] lg:text-[3.325rem] xl:text-[3.6875rem] 2xl:text-[4.275rem]"
          >
            <span className="block sm:whitespace-nowrap">A praticidade que todo</span>
            <span className="block">Síndico procura</span>
          </Reveal>

          {/* Traço amarelo */}
          <Reveal
            variant="scale"
            delay={160}
            aria-hidden="true"
            className="mt-6 h-[3px] w-14 origin-left rounded-full bg-rbs-yellow"
          />

          {/* Descrição */}
          <Reveal
            as="p"
            delay={220}
            className="mt-6 max-w-[36rem] text-base leading-7 text-white/80 sm:text-[1.0625rem] sm:leading-8 2xl:max-w-[40rem] 2xl:text-lg"
          >
            Conheça os diferenciais da RBS Uniformes, uma empresa com foco principal em atendimento à condomínios, simplificando a gestão de uniformes para Síndicos e Administradoras.
          </Reveal>

          {/* ==================================================
              CTAs — ícone à esquerda em caixa própria, título e
              subtítulo em duas linhas compactas
          ================================================== */}
          <Reveal
            delay={290}
            className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4"
          >
            <ButtonLink
              href="#contato"
              tone="accent"
              className={cn(
                ctaBase,
                "shadow-[0_10px_28px_-14px_rgb(var(--rbs-yellow)/0.85)] hover:shadow-[0_14px_32px_-14px_rgb(var(--rbs-yellow)/0.95)]",
              )}
            >
              <span className={cn(ctaIcon, "bg-rbs-green-deep/10 group-hover:bg-rbs-green-deep/15")}>
                <CalendarDays className="h-[1.125rem] w-[1.125rem] stroke-[2.25]" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <strong className="text-[0.9375rem] font-bold leading-tight">
                  Agendar visita gratuita
                </strong>
                <span className="mt-0.5 font-sans text-xs font-medium leading-tight text-rbs-green-deep/80">
                  Visita sem compromisso
                </span>
              </span>
            </ButtonLink>

            <ButtonLink
              tone="secondary"
              href={whatsappLink(defaultWhatsappMessage)}
              external
              className={cn(
                ctaBase,
                "border-white/25 bg-white/[0.06] text-white backdrop-blur-sm hover:border-white/45 hover:bg-white/[0.11]",
              )}
            >
              <span className={cn(ctaIcon, "bg-white/10 group-hover:bg-white/15")}>
                <FileText className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <strong className="text-[0.9375rem] font-bold leading-tight">
                  Solicitar cotação
                </strong>
                <span className="mt-0.5 font-sans text-xs font-normal leading-tight text-white/70">
                  Receba sua proposta
                </span>
              </span>
            </ButtonLink>
          </Reveal>

          {/* ==================================================
              FAIXA DE CONFIANÇA — visita + prova social, em tom baixo
          ================================================== */}
          <Reveal
            delay={360}
            className="mt-9 flex flex-col gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-4"
          >
            <VisitModal triggerClassName="inline-flex min-h-[44px] items-center gap-2 self-start rounded-lg font-display text-sm font-semibold text-white/90 underline-offset-4 transition-colors duration-200 hover:text-rbs-yellow hover:underline sm:self-auto" />

            <span aria-hidden="true" className="hidden h-9 w-px bg-white/15 sm:block" />

            <a
              href="#avaliacoes"
              aria-label="Ver as avaliações dos clientes"
              className="group flex items-center gap-4 self-start rounded-lg sm:self-auto"
            >
              <div className="flex shrink-0 -space-x-1" aria-hidden="true">
                {testimonials.map((item) => (
                  <div
                    key={item.name}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-rbs-yellow font-display text-[0.625rem] font-bold text-rbs-green-deep ring-2 ring-rbs-green-deep"
                  >
                    {initials(item.name)}
                  </div>
                ))}
              </div>

              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-3.5 w-3.5 fill-rbs-yellow text-rbs-yellow"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-1.5 flex items-baseline gap-2 text-sm leading-snug text-white/75 underline-offset-4 transition-colors duration-200 group-hover:text-white group-hover:underline">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 -translate-y-px rounded-full bg-rbs-red" />
                  Síndicos e administradoras satisfeitos
                </p>
              </div>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
