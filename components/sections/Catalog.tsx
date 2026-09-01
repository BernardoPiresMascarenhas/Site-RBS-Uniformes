import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { UniformMockup } from "@/components/decor/UniformMockup";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { resolveModelPhotos } from "@/lib/photos";
import { services, servicePath } from "@/lib/services";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Catalog() {
  return (
    <Section id="catalogo" surface="light">
      <Container>
        <SectionHeading
          eyebrow="LINHAS DE UNIFORMES"
          title={
            <>
              UNIFORMES PARA CADA{" "}
              <span className="text-accent-sheen">Área</span>
            </>
          }
          description={
            <>
              Cada uniforme é confeccionado de acordo com a função e o tipo de
              uso, com alta qualidade e durabilidade, das condições mais simples
              até as mais extremas!
              <span className="mt-3 block font-medium text-brand-text">
                A RBS pensou nisso e essas são as opções que temos e
                recomendamos!
              </span>
            </>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            // a capa do card é a foto do primeiro modelo da linha; enquanto o
            // arquivo não existir em `public/`, o card desenha o mockup — a
            // checagem roda aqui porque a seção é um componente server
            const [firstModel] = resolveModelPhotos(service.models.slice(0, 1));
            const [firstColor] = firstModel.colors ?? service.colors;

            return (
              <Reveal
                as="article"
                key={service.slug}
                delay={index * 120}
                className={cn(
                  "group flex flex-col overflow-hidden",
                  theme.ui.card,
                  theme.ui.cardHover,
                )}
              >
                {/* Vitrine da peça: foto quando existir, mockup enquanto não. */}
                <div
                  data-surface="dark"
                  // proporção fixa para os três cards ficarem alinhados, tenha
                  // a linha foto ou desenho
                  className={cn(
                    "relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-brand-border/70 bg-gradient-to-br from-premium-emerald-deep via-premium-black to-premium-black",
                    // a foto já traz o fundo embutido e ocupa o card inteiro
                    firstModel.photo ? "p-0" : "px-8 py-8",
                  )}
                >
                  {firstModel.photo ? (
                    <Image
                      src={firstModel.photo}
                      alt={`${firstModel.name} da linha ${service.title}`}
                      fill
                      sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 100vw"
                      // acima do padrão (75): o fundo escuro e liso das fotos é
                      // onde a compressão vira faixa e mancha visíveis
                      quality={90}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <UniformMockup
                      style={firstModel.style}
                      body={firstColor.body}
                      accent={firstColor.accent}
                      label={`${firstModel.name} da linha ${service.title} na cor ${firstColor.name.toLowerCase()}`}
                      className="h-44 w-auto transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

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
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-brand-muted">
            Gostaria de ver de perto os nossos uniformes? Envie uma mensagem!
          </p>
          <ButtonLink tone="secondary" href="/#contato">
              FALE CONOSCO
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
