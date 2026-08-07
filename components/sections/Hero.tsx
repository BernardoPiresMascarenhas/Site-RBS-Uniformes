import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

import { MountainScape, SunBurst } from "@/components/decor/Scenery";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";
import { theme } from "@/lib/theme";

/** Primeira dobra — preto, ouro e alto contraste. */
export function Hero() {
  return (
    <section
      id="inicio"
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-premium-black pb-40 pt-36"
    >
      {/* Brilho dourado central */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[18%] -z-10 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #C9A227 0%, #7E6519 35%, transparent 70%)",
        }}
      />
      {/* O wrapper cuida do posicionamento: a animação de rotação vive no SVG
          interno para não conflitar com o `translate` do container. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[6%] -z-10 h-[34rem] w-[34rem] -translate-x-1/2 opacity-[0.07]"
      >
        <SunBurst className="h-full w-full animate-slow-spin" rays={20} />
      </div>

      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-premium-gold/40 bg-premium-gold/10 px-4 py-2 text-[0.7rem] uppercase tracking-[0.32em] text-premium-gold-light">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Confecção própria
          </span>

          <h1 className="font-display text-4xl uppercase leading-[1.08] tracking-[0.04em] text-premium-gold-light sm:text-6xl lg:text-7xl">
            Uniformes que vestem
            <span className="mt-2 block text-gold-sheen">a sua autoridade</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-brand-text sm:text-lg">
            Alfaiataria corporativa, linhas industriais e coleções personalizadas
            desenvolvidas peça a peça — tecidos nobres, modelagem exclusiva e um
            acabamento que a sua equipe sente no primeiro dia de uso.
          </p>

          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <ButtonLink
              href="#contato"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Solicitar orçamento
            </ButtonLink>
            <ButtonLink
              tone="secondary"
              size="lg"
              href={whatsappLink(defaultWhatsappMessage)}
              external
              icon={<MessageCircle className="h-4 w-4" />}
            >
              Falar no WhatsApp
            </ButtonLink>
          </div>

          <ul className="mt-14 grid w-full grid-cols-1 gap-px overflow-hidden rounded-brand border border-premium-gold/25 bg-premium-gold/20 sm:grid-cols-3">
            {theme.heroHighlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-3 bg-premium-black/90 px-5 py-5"
              >
                <Icon className="h-4 w-4 text-premium-gold" aria-hidden="true" />
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
