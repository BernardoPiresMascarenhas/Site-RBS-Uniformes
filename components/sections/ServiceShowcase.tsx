"use client";

import { ChevronRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import type { PhotoModel } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Bloco de produto que abre a página do serviço — no formato de uma página de
 * venda: peça grande à esquerda, modelos logo abaixo dela e a descrição à
 * direita. No mobile a ordem vira título → peça → modelos → descrição, para que
 * o visitante chegue nas opções sem rolar.
 *
 * Só chegam aqui os modelos que já têm foto em `public/` — o servidor filtra os
 * demais (`resolvePhotoModels`). Veja `public/produtos/LEIA-ME.md`.
 *
 * Recebe só dados serializáveis (nada de ícones do lucide, que são componentes)
 * — é a fronteira entre a página server e este componente client.
 */
export function ServiceShowcase({
  title,
  eyebrow,
  headline,
  intro,
  introClosing,
  quickFacts,
  models,
}: {
  title: string;
  eyebrow: string;
  headline: string;
  intro: string;
  introClosing?: string;
  quickFacts: string[];
  models: PhotoModel[];
}) {
  const [model, setModel] = useState(models[0]);

  // Todas as fotos da linha ficam montadas no palco, empilhadas, e baixam junto
  // com a página: o clique só troca a opacidade. Enquanto a foto do modelo novo
  // não termina de carregar, a anterior continua na tela — nunca aparece o
  // palco vazio.
  const photos = Array.from(new Set(models.map((option) => option.photo)));
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(() => new Set());
  const [shown, setShown] = useState(models[0].photo);

  const visiblePhoto = loaded.has(model.photo) ? model.photo : shown;

  function handlePhotoLoad(src: string) {
    setLoaded((current) => new Set(current).add(src));

    if (src === model.photo) {
      setShown(src);
    }
  }

  function selectModel(option: PhotoModel) {
    setModel(option);

    if (loaded.has(option.photo)) {
      setShown(option.photo);
    }
  }

  const message = `Olá! Vim pelo site da ${site.name} e tenho interesse na linha de ${title}. Modelo: ${model.name}.`;

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
                "relative aspect-[5/4] overflow-hidden rounded-brand border border-premium-emerald/35 bg-gradient-to-br from-premium-emerald-deep via-premium-black to-premium-black sm:aspect-[4/3]",
              )}
            >
              {photos.map((photo) => {
                const visible = photo === visiblePhoto;

                return (
                  <Image
                    key={photo}
                    src={photo}
                    alt={visible ? `${model.name} da linha ${title}` : ""}
                    aria-hidden={visible ? undefined : true}
                    fill
                    // Largura REAL da coluna esquerda — subestimar aqui faz o
                    // navegador pedir um degrau menor e o CSS esticar a foto.
                    // No teto do Container (100rem) sobram 1440px de conteúdo;
                    // menos o gap-14 (56px), o grid 1.05fr/1fr deixa ~709px.
                    // Abaixo de lg a coluna some e o card ocupa o container.
                    sizes="(min-width: 1536px) 710px, (min-width: 1024px) 52vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                    // acima do padrão (75): o fundo da foto é um gradiente
                    // liso, onde a compressão vira faixa e mancha visíveis
                    quality={95}
                    // a primeira foto é a que aparece ao abrir a página; as
                    // demais baixam logo em seguida, antes do clique
                    priority={photo === models[0].photo}
                    loading={photo === models[0].photo ? undefined : "eager"}
                    onLoad={() => handlePhotoLoad(photo)}
                    className={cn(
                      "object-cover transition-opacity duration-300 motion-reduce:transition-none",
                      visible ? "opacity-100" : "opacity-0",
                    )}
                  />
                );
              })}
            </div>

            {/* Modelos */}
            <fieldset className="mt-6">
              <legend className="font-display text-[0.65rem] uppercase tracking-[0.24em] text-brand-muted">
                Modelo
              </legend>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {models.map((option) => {
                  const active = option.name === model.name;

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
                      <span
                        data-surface="dark"
                        className="relative block aspect-[4/3] w-full overflow-hidden rounded-brand bg-premium-black/95"
                      >
                        <Image
                          src={option.photo}
                          alt=""
                          fill
                          // 3 colunas dentro da coluna de ~709px, menos o
                          // gap-3 e o p-2 do botão: ~210px no desktop
                          sizes="(min-width: 1024px) 215px, (min-width: 640px) 30vw, 45vw"
                          quality={90}
                          className="object-cover"
                        />
                      </span>
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

            {introClosing ? (
              <p className="mt-4 font-display text-base uppercase leading-snug tracking-[0.06em] text-brand-green">
                {introClosing}
              </p>
            ) : null}

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
                Pedir uma cotação desta peça
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
              As imagens são meramente ilustrativas. Se quiser ver de perto e
              confirmar a cor, agende uma visita ou nos envie uma mensagem que
              enviamos um vídeo da peça escolhida.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
