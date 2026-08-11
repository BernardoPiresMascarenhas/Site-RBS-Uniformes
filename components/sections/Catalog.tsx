import { ArrowRight } from "lucide-react";

import { UniformMockup } from "@/components/decor/UniformMockup";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { services, servicePath } from "@/lib/services";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Catalog() {
  return (
    <Section id="catalogo" surface="light">
      <Container>
        <SectionHeading
          eyebrow="Nossos serviços"
          title={
            <>
              UNIFORMES PARA CADA{" "}
              <span className="text-accent-sheen">FUNÇÃO</span>
            </>
          }
          description={
            <>
              Cada uniforme é confeccionado de acordo com a função e o tipo de uso, com alta qualidade e durabilidade, das condições mais simples até as mais extremas!
              <span className="mt-3 block font-medium text-brand-text">
                A RBS pensou nisso e essas são as opções que temos e recomendamos!
              </span>
            </>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            const [firstColor] = service.colors;
            const [firstModel] = service.models;

            return (
              <article
                key={service.slug}
                className={cn(
                  "group flex flex-col overflow-hidden",
                  theme.ui.card,
                  theme.ui.cardHover,
                )}
              >
                {/* Vitrine da peça. Troque por foto quando houver material. */}
                <div
                  data-surface="dark"
                  className="relative flex items-center justify-center overflow-hidden border-b border-brand-border/70 bg-gradient-to-br from-premium-emerald-deep via-premium-black to-premium-black px-8 py-8"
                >
                  <UniformMockup
                    style={firstModel.style}
                    body={firstColor.body}
                    accent={firstColor.accent}
                    label={`${firstModel.name} da linha ${service.title} na cor ${firstColor.name.toLowerCase()}`}
                    className="h-44 w-auto transition-transform duration-500 group-hover:scale-105"
                  />

                  <span
                    className={cn(
                      "absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center",
                      theme.ui.iconBox,
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl uppercase leading-tight tracking-[0.08em]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {service.shortDescription}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.models.map((model) => (
                      <li
                        key={model.name}
                        className="rounded-brand border border-brand-border/80 px-3 py-1 text-xs text-brand-muted"
                      >
                        {model.name}
                      </li>
                    ))}
                  </ul>

                  {/* `mt-auto` alinha o botão na base dos três cards, mesmo com
                      títulos e listas de tamanhos diferentes. */}
                  <div className="mt-auto pt-7">
                    <ButtonLink
                      href={servicePath(service.slug)}
                      className="w-full"
                      icon={
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      }
                    >
                      Saiba mais
                    </ButtonLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-brand-muted">
            Precisa de uma peça que não está na lista? Desenvolvemos modelos exclusivos sob demanda.
          </p>
          <ButtonLink tone="secondary" href="/#contato">
            Falar com um consultor
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
