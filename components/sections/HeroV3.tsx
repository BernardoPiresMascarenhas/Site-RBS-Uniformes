import { CalendarDays, FileText, ShieldCheck, Star } from "lucide-react";

import { VisitModal } from "@/components/VisitModal";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { testimonials } from "@/lib/content";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";
import { cn, initials } from "@/lib/utils";

/**
 * Hero V3 — em teste. Visualização: /preview/hero-v3
 *
 * Mesmo estilo, textos e CTAs da V1.5 (a da home), mas sem a foto de fundo:
 * fundo branco, com o verde numa meia-lua à esquerda atrás do texto, e à
 * direita fotos enquadradas no jeito da V2 — a fábrica (hero5) e uma segunda
 * foto (hero7) sobreposta no canto, por enquanto só de teste.
 */

/** Meia-lua verde: quase lisa, com um degradê discreto que clareia só um
 *  pouco perto da curva. */
const moon =
  "linear-gradient(90deg, rgb(var(--rbs-green-deep)) 0%, rgb(var(--rbs-green-deep)) 55%, rgb(var(--rbs-green-dark)) 100%)";

const ctaBase =
  "group h-auto min-h-[3.5rem] w-full justify-start gap-3.5 whitespace-normal rounded-xl px-4 py-2.5 text-left transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rbs-green-deep motion-safe:hover:-translate-y-px sm:w-auto sm:min-w-[15.5rem] sm:pr-6";

const ctaIcon =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200";

export function HeroV3() {
  return (
    <section
      id="inicio"
      data-surface="dark"
      className="relative isolate overflow-hidden bg-white pb-12 pt-[calc(var(--header-h)+3rem)] sm:pb-16 sm:pt-[calc(var(--header-h)+4rem)] lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pb-16 lg:pt-[calc(var(--header-h)+3.5rem)]"
    >
      {/* Meia-lua verde à esquerda (desktop): elipse bem mais alta que a seção,
          então só a curva da direita aparece. Um halo claro atrás suaviza a
          borda contra o branco. */}
      <div
        aria-hidden="true"
        className="absolute -left-[27%] -top-[28%] -bottom-[28%] -z-10 hidden w-[86%] rounded-r-[50%] bg-rbs-green/10 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute -left-[27%] -top-[28%] -bottom-[28%] -z-10 hidden w-[83%] rounded-r-[50%] shadow-[24px_0_60px_-30px_rgb(var(--rbs-green-deep)/0.5)] lg:block"
        style={{ background: moon }}
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 xl:gap-20">
        <div className="relative max-w-[40rem] lg:max-w-none 2xl:max-w-[50rem]">
          {/* celular/tablet: o verde fica atrás do texto e fecha em curva embaixo */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-5 -bottom-12 -top-[calc(var(--header-h)+3rem)] -z-10 rounded-b-[50%_3rem] sm:-inset-x-8 sm:-top-[calc(var(--header-h)+4rem)] lg:hidden"
            style={{ background: moon }}
          />
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
            className="mt-6 text-[clamp(1.75rem,calc((100vw-2.5rem)/11.4),2.25rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-white sm:mt-7 sm:text-[3rem] lg:text-[2.75rem] xl:text-[3.25rem] 2xl:text-[3.9rem]"
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

          {/* ==================================================
              FOTOS ENQUADRADAS — fábrica em destaque e uma segunda
              foto sobreposta no canto (teste)
          ================================================== */}
          <Reveal
            variant="fade"
            delay={200}
            className="relative mx-auto mt-6 w-full max-w-[22rem] pb-12 pl-8 sm:max-w-[28rem] lg:ml-auto lg:mr-8 lg:mt-0 lg:max-w-[27rem] xl:mr-14 xl:max-w-[30rem] 2xl:max-w-[34rem]"
          >
            {/* Bloco verde-claro de apoio, deslocado atrás da foto principal */}
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 bottom-20 left-20 rounded-[1.25rem] bg-rbs-green-soft"
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] shadow-[0_24px_48px_-24px_rgb(var(--rbs-ink)/0.45)]">
              {/* recorte pela direita: o degradê verde da arte original fica fora do quadro */}
              <Photo
                src="/hero/hero5.png"
                alt="Fábrica da RBS: mesa de produção com camisas polo dobradas e máquinas de costura"
                fill
                priority
                sizes="(min-width: 1024px) 34rem, 80vw"
                className="object-cover object-[88%_center]"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-[55%] overflow-hidden rounded-[1rem] border-4 border-white shadow-[0_20px_40px_-18px_rgb(var(--rbs-ink)/0.5)]">
              <div className="relative aspect-[4/3]">
                <Photo
                  src="/hero/hero7.png"
                  alt="Profissional da RBS tirando medidas de um funcionário no condomínio"
                  fill
                  sizes="(min-width: 1024px) 19rem, 45vw"
                  className="object-cover object-[62%_center]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
