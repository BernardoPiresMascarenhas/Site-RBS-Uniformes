"use client";

import { ChevronRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { UniformMockup } from "@/components/decor/UniformMockup";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import type { ShowcaseModel, UniformColor } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Bloco de produto que abre a página do serviço — no formato de uma página de
 * venda: peça grande à esquerda, modelos e cores logo abaixo dela e a descrição
 * à direita. No mobile a ordem vira título → peça → seletores → descrição, para
 * que o visitante chegue nas opções sem rolar.
 *
 * Cada modelo pode ter uma foto (`photo`); quando ela ainda não existe em
 * `public/`, o servidor manda `null` e o bloco desenha o mockup vetorial, que
 * também é o único que acompanha a cor selecionada. As fotos são produzidas em
 * uma cor só por modelo — daí a cartela de cores virar referência quando há
 * foto. Veja `public/produtos/LEIA-ME.md`.
 *
 * Recebe só dados serializáveis (nada de ícones do lucide, que são componentes)
 * — é a fronteira entre a página server e este componente client.
 */
export function ServiceShowcase({
  title,
  eyebrow,
  headline,
  intro,
  quickFacts,
  models,
  colors,
}: {
  title: string;
  eyebrow: string;
  headline: string;
  intro: string;
  quickFacts: string[];
  models: ShowcaseModel[];
  colors: UniformColor[];
}) {
  const [model, setModel] = useState(models[0]);
  const [color, setColor] = useState(models[0].colors?.[0] ?? colors[0]);

  // acessórios não saem em toda a cartela da linha (cinto e calçado, por
  // exemplo, só em preto e marrom): o modelo pode trazer a sua própria
  const palette = model.colors ?? colors;

  /** Troca o modelo e, se a cor atual não existir na cartela dele, reposiciona. */
  function selectModel(option: ShowcaseModel) {
    setModel(option);

    const options = option.colors ?? colors;

    if (!options.some((item) => item.name === color.name)) {
      setColor(options[0]);
    }
  }

  // com foto, a cor deixa de ser uma prévia e passa a ser só a escolha que
  // segue no WhatsApp — o texto de apoio muda junto
  const hasPhoto = models.some((option) => option.photo);

  const message = `Olá! Vim pelo site da ${site.name} e tenho interesse na linha de ${title}. Modelo: ${model.name}. Cor: ${color.name}.`;

  return (
    // padding-top maior que o normal: a navbar é fixa e mais alta no desktop,
    // onde ainda existe a barra de contatos acima do logo
    <Section surface="light" className="pt-32 sm:pt-40 lg:pt-44">
      <Container>
        <nav
          aria-label="Trilha de navegação"
          className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/" className="transition-colors hover:text-brand-accent">
            Início
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link
            href="/#catalogo"
            className="transition-colors hover:text-brand-accent"
          >
            Serviços
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-brand-heading">{title}</span>
        </nav>

        <div className="mt-7 max-w-3xl">
          <Reveal
            as="span"
            className="inline-flex items-center rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-brand-green"
          >
            {eyebrow}
          </Reveal>
          <Reveal
            as="h1"
            delay={90}
            className="mt-5 font-display text-3xl uppercase leading-[1.12] tracking-[0.04em] sm:text-4xl lg:text-5xl"
          >
            {headline}
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* ---------- Coluna visual: peça + seletores ---------- */}
          <Reveal variant="left" className="lg:sticky lg:top-28 lg:self-start">
            <div
              data-surface="dark"
              // no mobile a peça fica um pouco mais baixa que quadrada, para os
              // seletores caberem na primeira rolada
              className={cn(
                "relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-brand border border-premium-emerald/35 bg-gradient-to-br from-premium-emerald-deep via-premium-black to-premium-black sm:aspect-[4/3]",
                // a foto já vem com o fundo embutido e ocupa o card inteiro;
                // o mockup desenhado precisa da folga interna
                model.photo ? "p-0" : "p-6 sm:p-10",
              )}
            >
              {model.photo ? (
                <Image
                  key={model.photo}
                  src={model.photo}
                  alt={`${model.name} da linha ${title}`}
                  fill
                  // largura da coluna esquerda no desktop; abaixo disso ela
                  // ocupa a largura do container
                  sizes="(min-width: 1024px) 530px, (min-width: 640px) 90vw, 100vw"
                  // acima do padrão (75): o fundo é um gradiente escuro e liso,
                  // onde a compressão vira faixa e mancha visíveis
                  quality={90}
                  priority
                  className="animate-fade-up object-cover"
                />
              ) : (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(60% 60% at 50% 45%, rgba(201,162,39,0.12) 0%, transparent 70%)",
                    }}
                  />
                  <UniformMockup
                    style={model.style}
                    body={color.body}
                    accent={color.accent}
                    label={`${model.name} na cor ${color.name.toLowerCase()}`}
                    className="relative h-full max-h-72 w-auto drop-shadow-2xl transition-all duration-500 sm:max-h-80"
                  />
                </>
              )}
            </div>

            {/* Modelos — miniaturas na cor escolhida */}
            <fieldset className="mt-6">
              <legend className="font-display text-[0.65rem] uppercase tracking-[0.24em] text-brand-muted">
                Modelo
              </legend>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {models.map((option) => {
                  const active = option.name === model.name;
                  // a miniatura desenhada segue a cor escolhida, desde que a
                  // peça saia nela
                  const preview =
                    !option.colors ||
                    option.colors.some((item) => item.name === color.name)
                      ? color
                      : option.colors[0];

                  return (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => selectModel(option)}
                      aria-pressed={active}
                      className={cn(
                        "group flex flex-col items-center gap-2 rounded-brand border p-2 transition-all",
                        active
                          ? "border-brand-green bg-brand-green/[0.07] shadow-brand"
                          : "border-brand-border hover:border-brand-green/60",
                      )}
                    >
                      {option.photo ? (
                        <span
                          data-surface="dark"
                          className="relative block aspect-[4/3] w-full overflow-hidden rounded-brand bg-premium-black/95"
                        >
                          <Image
                            src={option.photo}
                            alt=""
                            fill
                            sizes="160px"
                            quality={90}
                            className="object-cover"
                          />
                        </span>
                      ) : (
                        <span
                          data-surface="dark"
                          className="flex w-full items-center justify-center rounded-brand bg-premium-black/95 py-3"
                        >
                          <UniformMockup
                            style={option.style}
                            body={preview.body}
                            accent={preview.accent}
                            label=""
                            className="h-14 w-auto"
                          />
                        </span>
                      )}
                      <span
                        className={cn(
                          "px-1 pb-1 text-center text-[0.65rem] leading-tight",
                          active ? "text-brand-heading" : "text-brand-muted",
                        )}
                      >
                        {option.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Cores */}
            <fieldset className="mt-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <legend className="font-display text-[0.65rem] uppercase tracking-[0.24em] text-brand-muted">
                  Cor
                </legend>
                <span className="text-xs uppercase tracking-[0.14em] text-brand-heading">
                  {color.name}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                {palette.map((option) => {
                  const active = option.name === color.name;

                  return (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setColor(option)}
                      aria-pressed={active}
                      aria-label={`Cor ${option.name}`}
                      title={option.name}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all",
                        active
                          ? "border-brand-green"
                          : "border-transparent hover:border-brand-green/40",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="h-8 w-8 rounded-full border border-black/25 shadow-inner"
                        style={{ backgroundColor: option.body }}
                      />
                    </button>
                  );
                })}
              </div>

              {hasPhoto ? (
                <p className="mt-3 text-xs leading-relaxed text-brand-muted">
                  A foto mostra o modelo em uma cor de referência. Toda a
                  cartela acima é produzida sob encomenda — a cor escolhida aqui
                  segue junto no seu pedido de orçamento.
                </p>
              ) : null}
            </fieldset>
          </Reveal>

          {/* ---------- Coluna de conteúdo ---------- */}
          <Reveal variant="right" delay={120} className="flex flex-col">
            <p className="font-display text-[0.65rem] uppercase tracking-[0.24em] text-brand-muted">
              Modelo selecionado
            </p>
            <h2 className="mt-2 font-display text-2xl uppercase leading-tight tracking-[0.06em]">
              {model.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              {model.description}
            </p>

            <span
              aria-hidden="true"
              className="my-7 block h-px w-full bg-gradient-to-r from-brand-border via-brand-border/40 to-transparent"
            />

            <p className="text-base leading-relaxed text-brand-text">{intro}</p>

            <ul className="mt-7 space-y-3">
              {quickFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-3 text-sm text-brand-text"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"
                  />
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={whatsappLink(message)}
                external
                size="lg"
                className="w-full whitespace-normal text-sm leading-snug sm:w-auto"
                icon={<MessageCircle className="h-4 w-4 shrink-0" />}
              >
                Pedir orçamento desta peça
              </ButtonLink>
              <ButtonLink
                tone="secondary"
                size="lg"
                href="/#contato"
                className="w-full whitespace-normal text-sm leading-snug sm:w-auto"
              >
                Agendar visita
              </ButtonLink>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-brand-muted">
              {hasPhoto
                ? "As imagens são ilustrativas do modelo e do acabamento: a cor final é confirmada na cartela de tecidos durante a visita, e o modelo escolhido já vai junto na mensagem do WhatsApp."
                : "A prévia é uma simulação para alinhar a conversa: a cor final é confirmada na cartela de tecidos durante a visita, e o modelo escolhido já vai junto na mensagem do WhatsApp."}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
