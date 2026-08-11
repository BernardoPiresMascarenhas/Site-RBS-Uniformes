import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

import { MountainScape, SunBurst } from "@/components/decor/Scenery";
import { VisitModal } from "@/components/VisitModal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";
import { theme } from "@/lib/theme";

/** Primeira dobra — preto, ouro e alto contraste. */
export function Hero() {
  return (
    <section
      id="inicio"
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-premium-black pb-32 pt-32 sm:pb-40 sm:pt-36"
    >
      {/* Luz do sol ajustada:
          Centralizada (50% 50%) para irradiar de forma proporcional em todas as direções.
          Opacidade reduzida (de 0.22/0.26 para 0.12/0.15) para diminuir a claridade.
          Máscara removida para evitar o corte abrupto na parte inferior. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[10%] -z-10 h-[24rem] w-[30rem] -translate-x-1/2 opacity-[0.12] blur-3xl sm:h-[36rem] sm:w-[50rem] sm:opacity-[0.15] lg:h-[42rem] lg:w-[64rem]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, #F2E3B0 0%, #E7D5A0 20%, #C9A227 45%, #7E6519 70%, transparent 100%)",
        }}
      />
      
      {/* Halo esmeralda subindo das montanhas — faz o verde da base conversar
          com o resto da dobra em vez de ficar preso na silhueta. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[26rem] opacity-70"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 100%, rgba(10,122,68,0.42) 0%, rgba(1,60,30,0.28) 42%, transparent 72%)",
        }}
      />
      
      {/* O wrapper cuida do posicionamento: a animação de rotação vive no SVG
          interno para não conflitar com o `translate` do container. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[6%] -z-10 h-[22rem] w-[22rem] -translate-x-1/2 opacity-[0.07] sm:h-[34rem] sm:w-[34rem] sm:opacity-[0.1]"
      >
        <SunBurst className="h-full w-full animate-slow-spin" rays={20} />
      </div>

      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-premium-gold/40 bg-premium-gold/10 px-4 py-2 text-[0.7rem] uppercase tracking-[0.32em] text-premium-gold-light">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Atendimento Exclusivo á Condomínios
          </span>

          <h1 className="font-display text-4xl uppercase leading-[1.08] tracking-[0.04em] text-premium-gold-light sm:text-6xl lg:text-7xl">
            OS UNIFORMES SÃO O ESPELHO
            <span className="mt-2 block text-gold-sheen">DO SEU CONDOMÍNIO</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-brand-text sm:text-lg">
            Conheça os diferenciais da RBS Uniformes, uma empresa com foco principal em atendimento à condomínios, simplificando a gestão de uniformes para Síndicos e Administradoras.
          </p>

          {/* `whitespace-normal` e a fonte menor evitam que o rótulo longo
              estoure a largura da tela no celular. */}
          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <ButtonLink
              href="#contato"
              size="lg"
              className="whitespace-normal px-6 text-xs leading-snug sm:px-8 sm:text-base"
              icon={<ArrowRight className="h-4 w-4 shrink-0" />}
            >
              SOLICITE UMA VISITA SEM COMPROMISSOS
            </ButtonLink>
            <ButtonLink
              tone="secondary"
              size="lg"
              href={whatsappLink(defaultWhatsappMessage)}
              external
              className="whitespace-normal px-6 text-xs leading-snug sm:px-8 sm:text-base"
              icon={<MessageCircle className="h-4 w-4 shrink-0" />}
            >
              SOLICITE UMA COTAÇÃO
            </ButtonLink>
          </div>

          <VisitModal />

          <ul className="mt-14 grid w-full grid-cols-1 gap-px overflow-hidden rounded-brand border border-premium-emerald/35 bg-premium-emerald/25 sm:grid-cols-3">
            {theme.heroHighlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-3 bg-premium-black/90 px-5 py-5"
              >
                <Icon
                  className="h-4 w-4 text-premium-emerald-light"
                  aria-hidden="true"
                />
                <span className="font-display text-xs uppercase tracking-[0.2em] text-brand-heading">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <MountainScape className="absolute inset-x-0 bottom-0 -z-10 h-52 sm:h-64" />
    </section>
  );
}