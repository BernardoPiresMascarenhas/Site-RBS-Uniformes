import { ArrowUpRight, Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { categories } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Catalog() {
  return (
    <Section id="catalogo" surface="light">
      <Container>
        <SectionHeading
          eyebrow="Linhas de uniformes"
          title={
            <>
              Um catálogo para cada{" "}
              <span className="text-accent-sheen">operação</span>
            </>
          }
          description="Desenvolvemos as peças a partir da rotina real da sua equipe: ambiente, jornada, frequência de lavagem e a imagem que a empresa quer transmitir."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const message = `Olá! Gostaria de um orçamento da linha de ${category.title} da ${site.name}.`;

            return (
              <article
                key={category.slug}
                className={cn(
                  "group flex flex-col p-7",
                  theme.ui.card,
                  theme.ui.cardHover,
                )}
              >
                <span
                  className={cn(
                    "mb-6 inline-flex h-14 w-14 items-center justify-center",
                    theme.ui.iconBox,
                  )}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>

                <h3 className="font-display text-xl uppercase tracking-[0.08em]">
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {category.description}
                </p>

                <ul className="mt-6 space-y-2 border-t border-brand-border/70 pt-5">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-brand-text">
                      <Check
                        className="h-4 w-4 shrink-0 text-brand-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-1.5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent transition-colors hover:text-brand-accent-strong"
                >
                  Pedir orçamento
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-brand-muted">
            Precisa de uma peça que não está na lista? Desenvolvemos modelos exclusivos sob demanda.
          </p>
          <ButtonLink tone="secondary" href="#contato">
            Ver todas as possibilidades
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
