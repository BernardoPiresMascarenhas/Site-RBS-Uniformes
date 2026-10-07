import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { UniformMockup } from "@/components/decor/UniformMockup";
import { ButtonLink } from "@/components/ui/Button";
import { CardCarousel, type CarouselSlide } from "@/components/ui/CardCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { resolveCover, resolveModelPhotos, resolvePhotoModels } from "@/lib/photos";
import { modelPath, services, servicePath } from "@/lib/services";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Catalog() {
  return (
    <Section id="catalogo" surface="light">
      <Container>
        <SectionHeading
          eyebrow="LINHAS DE UNIFORMES"
          eyebrowClassName="text-brand-red"
          dividerClassName="bg-rbs-yellow"
          title={
            <>
              Linhas de uniformes para cada{" "}
              <span className="text-brand-accent">área</span>
            </>
          }
          description={
            <>
              Cada uniforme é confeccionado de acordo com a função e o tipo de
              uso, com alta qualidade e durabilidade, das condições mais simples
              até as mais extremas!
            </>
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            // a capa do card é a foto declarada em `cover`; sem ela, cai na
            // foto do primeiro modelo da linha e, na falta das duas, no mockup
            // desenhado — a checagem roda aqui porque a seção é server
            const [firstModel] = resolveModelPhotos(service.models.slice(0, 1));
            const [firstColor] = firstModel.colors ?? service.colors;
            const coverPhoto = resolveCover(service.cover);
            const cover = coverPhoto ?? firstModel.photo;

            // carrossel com as peças que já têm foto; cada slide abre a peça
            // na página da linha
            const slides: CarouselSlide[] = resolvePhotoModels(service.models).map(
              (model) => ({
                src: model.photo,
                alt: `${model.name} da linha ${service.title}`,
                href: modelPath(service.slug, model.name),
                caption: model.name,
              }),
            );

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
                {/* Vitrine: carrossel das peças com foto; sem nenhuma foto, cai na
                    capa ou no mockup desenhado. */}
                {slides.length > 0 ? (
                  <CardCarousel
                    slides={slides}
                    className="aspect-[4/3] border-b border-brand-border bg-brand-green-soft"
                  />
                ) : (
                <div
                  // proporção fixa para os três cards ficarem alinhados, tenha
                  // a linha foto ou desenho
                  className={cn(
                    "relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-brand-border bg-brand-green-soft",
                    // a foto já traz o fundo embutido e ocupa o card inteiro
                    cover ? "p-0" : "px-8 py-8",
                  )}
                >
                  {cover ? (
                    <Image
                      src={cover}
                      alt={
                        coverPhoto
                          ? `Uniformes da linha ${service.title}`
                          : `${firstModel.name} da linha ${service.title}`
                      }
                      fill
                      sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 100vw"
                      // acima do padrão (75): o fundo escuro e liso das fotos é
                      // onde a compressão vira faixa e mancha visíveis
                      quality={90}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <UniformMockup
                      style={firstModel.style}
                      body={firstColor.body}
                      accent={firstColor.accent}
                      label={`${firstModel.name} da linha ${service.title} na cor ${firstColor.name.toLowerCase()}`}
                      className="h-44 w-auto transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                )}

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl leading-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {service.shortDescription}
                  </p>

                  {/* Cada peça abre a página da linha já nela (quando tem foto).
                      `flex-auto` estica as etiquetas para cada linha fechar
                      rente às bordas, sem sobra à direita. */}
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.models.map((model) => (
                      <li key={model.name} className="flex-auto">
                        <Link
                          href={modelPath(service.slug, model.name)}
                          className="block rounded-full bg-brand-bg px-3 py-1.5 text-center text-xs font-medium text-brand-muted transition-colors duration-200 hover:bg-brand-green-soft hover:text-brand-green"
                        >
                          {model.name}
                        </Link>
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
                      Ver mais
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
              Fale conosco
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
