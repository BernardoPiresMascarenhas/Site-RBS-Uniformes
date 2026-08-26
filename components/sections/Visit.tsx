import {
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  Palette,
  Truck,
} from "lucide-react";

import { MountainScape } from "@/components/decor/Scenery";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { visit, visitSteps } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";

const message = `Olá! Vim pelo site da ${site.name} e gostaria de agendar uma visita sem compromisso no meu condomínio.`;

/** Argumentos curtos que reforçam o convite, ao lado das etapas. */
const promises = [
  { icon: Truck, label: "Consultor vai até o condomínio" },
  { icon: Palette, label: "Mostruário de tecidos e cores" },
  { icon: BadgeCheck, label: "Gratuita e sem compromisso" },
];

/**
 * Seção que explica a visita técnica. Fica logo depois do FAQ e é o
 * detalhamento do mesmo conteúdo resumido no pop-up do hero — os dois leem
 * `visitSteps`, então editar as etapas atualiza os dois lugares.
 */
export function Visit() {
  return (
    <section
      id="visita"
      className="grain relative isolate scroll-mt-24 overflow-hidden bg-premium-black py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[26rem] opacity-70"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 100%, rgba(10,122,68,0.4) 0%, rgba(1,60,30,0.26) 42%, transparent 72%)",
        }}
      />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <Reveal
            as="span"
            className="font-display text-xs uppercase tracking-[0.42em] text-premium-gold"
          >
            {visit.eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="mt-4 max-w-3xl font-display text-3xl uppercase tracking-[0.06em] text-premium-gold-light sm:text-4xl lg:text-5xl"
          >
            {visit.title}
          </Reveal>
          <Reveal
            as="span"
            variant="scale"
            delay={160}
            aria-hidden="true"
            className="mt-4 block h-px w-full max-w-xs bg-gradient-to-r from-transparent via-premium-gold/60 to-transparent"
          />
          <Reveal
            as="p"
            delay={220}
            className="mt-6 max-w-2xl text-base leading-relaxed text-brand-text sm:text-lg"
          >
            {visit.intro}
          </Reveal>
          <Reveal
            as="p"
            delay={280}
            className="mt-3 font-display text-sm uppercase tracking-[0.16em] text-premium-emerald-glow"
          >
            {visit.subtitle}
          </Reveal>
        </div>

        {/* Etapas */}
        <ol className="relative mt-14 grid gap-6 lg:grid-cols-3">
          {/* Linha que costura as três etapas no desktop */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-premium-emerald/45 to-transparent lg:block"
          />

          {visitSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal
                as="li"
                key={step.step}
                delay={index * 130}
                className="relative flex flex-col rounded-brand border border-premium-gold/20 bg-premium-black/80 p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-premium-emerald/50"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-brand border border-premium-emerald/40 bg-premium-emerald/10 text-premium-emerald-light">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <span className="mt-6 font-display text-[0.7rem] uppercase tracking-[0.24em] text-premium-gold">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-lg uppercase leading-tight tracking-[0.06em] text-brand-heading">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {step.description}
                </p>
              </Reveal>
            );
          })}
        </ol>

        {/* Promessas + chamada */}
        <Reveal className="mt-12 flex flex-col items-center gap-8 rounded-brand border border-premium-emerald/25 bg-premium-emerald-deep/25 p-7 sm:p-9 lg:flex-row lg:justify-between">
          <ul className="grid w-full gap-4 sm:grid-cols-3 lg:max-w-2xl">
            {promises.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-sm text-brand-text"
              >
                <Icon
                  className="h-5 w-5 shrink-0 text-premium-emerald-light"
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            {/* Âncora interna: sem `external`, para rolar até o formulário em
                vez de abrir uma aba nova. */}
            <ButtonLink
              href="#contato"
              className="w-full whitespace-normal text-sm leading-snug lg:w-auto"
              icon={<ArrowRight className="h-4 w-4 shrink-0" />}
            >
              Agendar visita
            </ButtonLink>
            {/* Link externo: `external` adiciona target/rel do WhatsApp. */}
            <ButtonLink
              href={whatsappLink(message)}
              external
              tone="secondary"
              className="w-full whitespace-normal text-sm leading-snug lg:w-auto"
              icon={<MessageCircle className="h-4 w-4 shrink-0" />}
            >
              Solicitar pelo wpp
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal as="p" className="mt-6 text-center text-xs text-brand-muted">
          {visit.note}
        </Reveal>
      </Container>

      <MountainScape className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 opacity-70 sm:h-32" />
    </section>
  );
}
