import {
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  Palette,
  Truck,
} from "lucide-react";

import { MountainScape } from "@/components/decor/Scenery";
import { VisitSteps } from "@/components/VisitSteps";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { visit } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";
import { tones, type Tone } from "@/lib/theme";
import { cn } from "@/lib/utils";

const message = `Olá! Vim pelo site da ${site.name} e gostaria de agendar uma visita sem compromisso no meu condomínio.`;

/** Argumentos curtos que reforçam o convite, ao lado das etapas. */
const promises: { icon: typeof Truck; label: string; tone: Tone }[] = [
  { icon: Truck, label: "Uma equipe especializada se dirige até o condomínio", tone: "yellow" },
  { icon: Palette, label: "Apresenta o catálogo, tecidos, cores e modelos.", tone: "green" },
  { icon: BadgeCheck, label: "Sem compromisso de compra", tone: "yellow" },
];

/**
 * Seção que explica a visita técnica. Fica logo depois do FAQ e é a versão
 * COMPLETA (`visitSteps`) do que o pop-up do hero mostra resumido
 * (`visitStepsShort`) — as duas listas vivem em `lib/content.ts`.
 */
export function Visit() {
  return (
    <section
      id="visita"
      className="relative isolate overflow-hidden bg-brand-bg-alt pb-32 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24"
    >
      <Container className="relative">
        <SectionHeading
          eyebrow={visit.eyebrow}
          title={visit.title}
          description={visit.intro}
        />
        <Reveal
          as="p"
          delay={280}
          className="mt-3 text-center font-display text-base font-semibold text-brand-green"
        >
          {visit.subtitle}
        </Reveal>

        {/* Etapas — mesma altura, com "Ler mais" nas mais longas */}
        <VisitSteps />

        {/* Promessas + chamada */}
        <Reveal
          data-surface="dark"
          className="mt-12 flex flex-col items-center gap-8 rounded-brand-lg bg-brand-bg p-7 shadow-brand-lg sm:p-9 lg:flex-row lg:justify-between"
        >
          <ul className="grid w-full gap-4 sm:grid-cols-3 lg:max-w-2xl">
            {promises.map(({ icon: Icon, label, tone }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-sm text-brand-text"
              >
                <Icon
                  className={cn("h-5 w-5 shrink-0", tones[tone].text)}
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

      <MountainScape className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 sm:h-32" />
    </section>
  );
}
