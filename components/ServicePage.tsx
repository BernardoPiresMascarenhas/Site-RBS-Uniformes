import { ArrowRight, MessageCircle, Palette, Shirt } from "lucide-react";
import { getImageProps } from "next/image";
import Link from "next/link";

import { MountainScape } from "@/components/decor/Scenery";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Process } from "@/components/sections/Process";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { SiteShell } from "@/components/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { getEmbroideryPhotos } from "@/lib/partners";
import { resolvePhotoModels } from "@/lib/photos";
import { services, servicePath, type Service } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";
import { theme, tones, type Tone } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Página de venda de uma linha de uniforme. A ordem segue uma página de
 * produto: primeiro a peça com os modelos, depois os argumentos.
 */
const cycle: Tone[] = ["green", "yellow", "red"];
const toneAt = (index: number) => tones[cycle[index % cycle.length]].box;

/**
 * Cartela em `<picture>`: o navegador baixa só a arte do seu tamanho de tela
 * (vertical abaixo de 768px, horizontal a partir dali).
 */
function ColorChart({
  chart,
  alt,
}: {
  chart: NonNullable<Service["colorChart"]>;
  alt: string;
}) {
  const common = { alt, sizes: "(min-width: 1280px) 1200px, 100vw" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, ...chart.desktop });
  const { props: mobile } = getImageProps({ ...common, ...chart.mobile });

  return (
    <picture>
      {/* largura e altura na <source> reservam o espaço certo antes da
          imagem carregar, já que as duas artes têm proporções diferentes */}
      <source
        media="(min-width: 768px)"
        srcSet={desktopSrcSet}
        sizes={common.sizes}
        width={chart.desktop.width}
        height={chart.desktop.height}
      />
      <img {...mobile} className="h-auto w-full" />
    </picture>
  );
}

export async function ServicePage({ service }: { service: Service }) {
  const embroidery = await getEmbroideryPhotos();
  const message = `Olá! Vim pelo site da ${site.name} e gostaria de um orçamento da linha de ${service.title}.`;
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <SiteShell>
      <ServiceShowcase
        title={service.title}
        eyebrow={service.eyebrow}
        headline={service.headline}
        intro={service.intro}
        introClosing={service.introClosing}
        quickFacts={service.quickFacts}
        // a checagem dos arquivos acontece aqui, no servidor, porque
        // ServiceShowcase é um componente client; modelos sem foto ficam de fora
        models={resolvePhotoModels(service.models)}
        embroidery={embroidery}
      />

      {/* ---------------- Cartela de cores ---------------- */}
      {service.colorChart && (
        <Section surface="light">
          <Container>
            <SectionHeading
              eyebrow="Cartela de cores"
              title={
                <>
                  Escolha as cores da sua equipe de{" "}
                  <span className="text-brand-accent">{service.title}</span>
                </>
              }
            />

            <Reveal className={cn("mt-14 overflow-hidden", theme.ui.card)}>
              <ColorChart
                chart={service.colorChart}
                alt={`Cartela de cores disponíveis para a linha de ${service.title}`}
              />
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ---------------- Benefícios ---------------- */}
      <Section surface="light" tone="alt">
        <Container>
          <SectionHeading
            eyebrow="O QUE CADA LINHA PROPORCIONA?"
            title={
              <>
                Mais do que um uniforme para{" "}
                <span className="text-brand-accent">{service.title}</span>
              </>
            }
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {service.highlights.map((highlight, index) => {
              const HighlightIcon = highlight.icon;

              return (
                <Reveal
                  key={highlight.title}
                  delay={(index % 2) * 120}
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
                      tones.red.box,
                    )}
                  >
                    <HighlightIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg">
                      {highlight.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-brand-muted">
                      {highlight.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---------------- Faixa de conversão ---------------- */}
      <section className="relative isolate overflow-hidden bg-brand-green-soft py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="glow-green-bottom absolute inset-x-0 bottom-0 -z-10 h-72"
        />

        <Container className="relative text-center">
          <h2 className="mx-auto max-w-2xl text-2xl leading-tight tracking-tight sm:text-3xl">
            Gostaria de conhecer nossos uniformes, tecidos e cores?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
            Um de nossos representantes se dirige até o condomínio para apresentar nossos uniformes, modelos e cores, solicite já!
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink
              href={whatsappLink(message)}
              external
              size="lg"
              className="w-full whitespace-normal text-sm leading-snug sm:w-auto"
              icon={<MessageCircle className="h-4 w-4 shrink-0" />}
            >
              Agendar visita
            </ButtonLink>
            <ButtonLink
              tone="secondary"
              size="lg"
              href="/#contato"
              className="w-full whitespace-normal text-sm leading-snug sm:w-auto"
            >
              Solicitar cotação
            </ButtonLink>
          </div>
        </Container>

        <MountainScape className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 sm:h-36" />
      </section>

      {/* ---------------- Peças e personalização ---------------- */}
      <Section surface="light">
        <Container>
          <SectionHeading
            eyebrow="O que compõe"
            title="Conheça nossos kits para portaria"
            description="Nossos kit's vestem um funcionário dos pés á cabeça, conheça as ofertas, kit's básicos e completos."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal variant="left" className={cn("p-7 sm:p-8", theme.ui.card)}>
              <span
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center",
                  theme.ui.iconBox,
                  tones.green.box,
                )}
              >
                <Shirt className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg">
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
            </Reveal>

            <Reveal
              variant="right"
              delay={120}
              className={cn("p-7 sm:p-8", theme.ui.card)}
            >
              <span
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center",
                  theme.ui.iconBox,
                  tones.yellow.box,
                )}
              >
                <Palette className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg">
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
            </Reveal>
          </div>
        </Container>
      </Section>

      <Process />

      {/* ---------------- Outras linhas ---------------- */}
      <Section surface="light">
        <Container>
          <SectionHeading
            eyebrow="Outras linhas"
            title="uniformes para todas funções"
            description="Conheça outras linhas de uniformes para todas as áreas de seu condomínio."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {others.map((other, index) => {
              const OtherIcon = other.icon;

              return (
                <Reveal key={other.slug} delay={index * 120}>
                  <Link
                    href={servicePath(other.slug)}
                    className={cn(
                      "group flex h-full items-start gap-5 p-7",
                      theme.ui.card,
                      theme.ui.cardHover,
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-12 w-12 shrink-0 items-center justify-center",
                        theme.ui.iconBox,
                        toneAt(index + 1),
                      )}
                    >
                      <OtherIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="flex items-center gap-2 font-display text-lg font-bold text-brand-heading">
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
                </Reveal>
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
