import { ArrowRight, MessageCircle, Palette, Shirt } from "lucide-react";
import Link from "next/link";

import { MountainScape } from "@/components/decor/Scenery";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Process } from "@/components/sections/Process";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { SiteShell } from "@/components/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { services, servicePath, type Service } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Página de venda de uma linha de uniforme. A ordem segue uma página de
 * produto: primeiro a peça com modelos e cores, depois os argumentos.
 */
export function ServicePage({ service }: { service: Service }) {
  const message = `Olá! Vim pelo site da ${site.name} e gostaria de um orçamento da linha de ${service.title}.`;
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <SiteShell>
      <ServiceShowcase
        title={service.title}
        eyebrow={service.eyebrow}
        headline={service.headline}
        intro={service.intro}
        quickFacts={service.quickFacts}
        models={service.models}
        colors={service.colors}
      />

      {/* ---------------- Benefícios ---------------- */}
      <Section surface="light" tone="alt">
        <Container>
          <SectionHeading
            eyebrow="Por que esta linha funciona"
            title={
              <>
                Pensada para a rotina de{" "}
                <span className="text-accent-sheen">{service.title}</span>
              </>
            }
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {service.highlights.map((highlight) => {
              const HighlightIcon = highlight.icon;

              return (
                <div
                  key={highlight.title}
                  className={cn(
                    "flex flex-col gap-5 p-7 sm:flex-row",
                    theme.ui.card,
                    theme.ui.cardHover,
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 shrink-0 items-center justify-center",
                      theme.ui.iconBox,
                    )}
                  >
                    <HighlightIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg uppercase tracking-[0.08em]">
                      {highlight.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-brand-muted">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---------------- Faixa escura de conversão ---------------- */}
      <section className="grain relative isolate overflow-hidden bg-premium-black py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-72 opacity-70"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 100%, rgba(10,122,68,0.4) 0%, rgba(1,60,30,0.26) 42%, transparent 72%)",
          }}
        />

        <Container className="relative text-center">
          <h2 className="mx-auto max-w-2xl font-display text-2xl uppercase leading-tight tracking-[0.05em] text-premium-gold-light sm:text-3xl">
            Quer ver o tecido e o caimento de perto?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-brand-text sm:text-base">
            Um consultor leva o mostruário até o condomínio, tira as medidas da
            equipe e monta a proposta na hora — sem custo e sem compromisso.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink
              href={whatsappLink(message)}
              external
              size="lg"
              className="w-full whitespace-normal text-sm leading-snug sm:w-auto"
              icon={<MessageCircle className="h-4 w-4 shrink-0" />}
            >
              Agendar visita gratuita
            </ButtonLink>
            <ButtonLink
              tone="secondary"
              size="lg"
              href="/#contato"
              className="w-full whitespace-normal text-sm leading-snug sm:w-auto"
            >
              Solicitar orçamento
            </ButtonLink>
          </div>
        </Container>

        <MountainScape className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 opacity-80 sm:h-36" />
      </section>

      {/* ---------------- Peças e personalização ---------------- */}
      <Section surface="light">
        <Container>
          <SectionHeading
            eyebrow="O que compõe o kit"
            title="Peças e personalização"
            description="A composição do kit é fechada na visita, de acordo com o número de colaboradores e o rodízio de lavagem do condomínio."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className={cn("p-7 sm:p-8", theme.ui.card)}>
              <span
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center",
                  theme.ui.iconBox,
                )}
              >
                <Shirt className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg uppercase tracking-[0.08em]">
                Peças da linha
              </h3>
              <ul className="mt-5 space-y-3">
                {service.pieces.map((piece) => (
                  <li
                    key={piece}
                    className="flex items-start gap-3 border-b border-brand-border/60 pb-3 text-sm text-brand-text last:border-0 last:pb-0"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"
                    />
                    {piece}
                  </li>
                ))}
              </ul>
            </div>

            <div className={cn("p-7 sm:p-8", theme.ui.card)}>
              <span
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center",
                  theme.ui.iconBox,
                )}
              >
                <Palette className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg uppercase tracking-[0.08em]">
                Personalização
              </h3>
              <ul className="mt-5 space-y-3">
                {service.customizations.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-brand-border/60 pb-3 text-sm text-brand-text last:border-0 last:pb-0"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Process />

      {/* ---------------- Outras linhas ---------------- */}
      <Section surface="light">
        <Container>
          <SectionHeading
            eyebrow="Outras linhas"
            title="O condomínio inteiro uniformizado"
            description="A maioria dos clientes fecha as três linhas juntas — o padrão visual fica coerente e o custo por peça cai."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {others.map((other) => {
              const OtherIcon = other.icon;

              return (
                <Link
                  key={other.slug}
                  href={servicePath(other.slug)}
                  className={cn(
                    "group flex items-start gap-5 p-7",
                    theme.ui.card,
                    theme.ui.cardHover,
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 shrink-0 items-center justify-center",
                      theme.ui.iconBox,
                    )}
                  >
                    <OtherIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="flex items-center gap-2 font-display text-lg uppercase tracking-[0.08em] text-brand-heading">
                      {other.title}
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-brand-green transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-brand-muted">
                      {other.shortDescription}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <Faq />
      <Contact />
    </SiteShell>
  );
}
