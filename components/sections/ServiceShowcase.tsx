"use client";

import { ChevronRight, MessageCircle, ZoomIn } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { PhotoMarquee } from "@/components/PhotoMarquee";
import { PhotoZoom } from "@/components/PhotoZoom";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { embroidery as embroideryText } from "@/lib/content";
import type { PartnerImage } from "@/lib/partners";
import {
  modelCategories,
  modelCategory,
  modelLabel,
  modelSlug,
  modelTitle,
  type ModelCategory,
  type PhotoModel,
} from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";
import { theme } from "@/lib/theme";
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
type GenderFilter = "todos" | "masculino" | "feminino";

const genderOptions: { value: GenderFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
];

/**
 * Fundo da bolinha de cor. Gradiente (peça bicolor) usa `border-box` sem
 * repetição — senão ele se repete sob a borda e aparece um pedaço da outra cor
 * na beirada do círculo.
 */
function swatchStyle(swatch = "#ccc"): CSSProperties {
  return swatch.includes("gradient")
    ? { backgroundImage: swatch, backgroundOrigin: "border-box", backgroundRepeat: "no-repeat" }
    : { backgroundColor: swatch };
}

/** Família da peça: variações de cor com o mesmo `group` contam como uma. */
function familyOf(option: PhotoModel) {
  return modelTitle(option);
}

/** Roda `run` quando o navegador estiver ocioso; devolve a função que cancela. */
function whenIdle(run: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(run, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(run, 300);
  return () => window.clearTimeout(id);
}

export function ServiceShowcase({
  title,
  eyebrow,
  headline,
  intro,
  introClosing,
  quickFacts,
  models,
  embroidery = [],
}: {
  title: string;
  eyebrow: string;
  headline: string;
  intro: string;
  introClosing?: string;
  quickFacts: string[];
  models: PhotoModel[];
  /** Fotos das matrizes de bordado (lidas no servidor, ver `lib/partners.ts`). */
  embroidery?: PartnerImage[];
}) {
  const [model, setModel] = useState(models[0]);

  // As fotos da linha ficam empilhadas no palco e o clique só troca a opacidade
  // — a troca é instantânea. Mas só entram no palco (e só baixam) as que já
  // fazem sentido: a foto aberta, as outras cores dela, as vizinhas no seletor
  // e a do card em que o visitante encosta o mouse ou o dedo. As demais entram
  // quando forem escolhidas. Enquanto a foto do modelo novo não termina de
  // carregar, a anterior continua na tela — nunca aparece o palco vazio.
  const [mounted, setMounted] = useState<ReadonlySet<string>>(() => new Set([models[0].photo]));
  const photos = Array.from(new Set(models.map((option) => option.photo))).filter((photo) =>
    mounted.has(photo),
  );
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(() => new Set());
  const [shown, setShown] = useState(models[0].photo);

  const visiblePhoto = loaded.has(model.photo) ? model.photo : shown;

  const [zoomOpen, setZoomOpen] = useState(false);
  const closeZoom = useCallback(() => setZoomOpen(false), []);

  /** Coloca fotos no palco, para começarem a baixar. */
  const want = useCallback((...sources: string[]) => {
    setMounted((current) => {
      if (sources.every((src) => current.has(src))) return current;
      const next = new Set(current);
      sources.forEach((src) => next.add(src));
      return next;
    });
  }, []);

  // pode ser chamada de novo a cada renderização (ver `Photo`): só age na primeira vez
  function handlePhotoLoad(src: string) {
    setLoaded((current) => (current.has(src) ? current : new Set(current).add(src)));

    if (src === model.photo) {
      setShown(src);
    }
  }

  const photoRef = useRef<HTMLDivElement>(null);

  /**
   * Os cards de modelo ficam abaixo da foto grande: ao escolher um deles, se a
   * foto saiu da tela, a página sobe até ela para mostrar a troca.
   */
  function revealPhoto() {
    const box = photoRef.current?.getBoundingClientRect();
    if (!box || (box.top >= 0 && box.bottom <= window.innerHeight)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: window.scrollY + box.top - 120, behavior: reduce ? "auto" : "smooth" });
  }

  function selectModel(option: PhotoModel) {
    setModel(option);
    want(option.photo);

    if (loaded.has(option.photo)) {
      setShown(option.photo);
    }
  }

  // Chegando por um tópico do catálogo (`?modelo=`), abre já naquele modelo.
  // Lido no cliente porque a página é estática; modelo sem foto não está em
  // `models` e cai no padrão.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("modelo");
    const match = wanted && models.find((option) => modelSlug(option.name) === wanted);
    if (match) {
      selectModel(match);
      setCategory(modelCategory(match));
    }
    // só na montagem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Filtro por público e famílias de peça ----
  // Só aparece quando a linha tem peças masculinas E femininas; peças sem
  // `gender` (unissex) entram nos dois filtros.
  const hasGenderSplit =
    models.some((option) => option.gender === "feminino") &&
    models.some((option) => option.gender === "masculino");
  const [gender, setGender] = useState<GenderFilter>("todos");

  const filteredModels =
    gender === "todos"
      ? models
      : models.filter((option) => !option.gender || option.gender === gender);

  // ---- Categorias (Camisas, Jalecos…) ----
  // Só as que têm peça no filtro de público atual. Abre na categoria do
  // modelo escolhido; trocar de categoria não troca a peça da foto até o
  // visitante clicar num card.
  const categories = modelCategories
    .map((name) => ({
      name,
      count: new Set(
        filteredModels.filter((option) => modelCategory(option) === name).map(familyOf),
      ).size,
    }))
    .filter((item) => item.count > 0);
  const [categoryChoice, setCategory] = useState<ModelCategory>(() => modelCategory(models[0]));
  const category = categories.some((item) => item.name === categoryChoice)
    ? categoryChoice
    : categories[0]?.name ?? categoryChoice;

  // No celular a fileira de categorias rola para o lado: mantém a ativa à
  // vista (só rola a fileira, nunca a página).
  const tabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!row || !tab) return;
    const left = tab.offsetLeft - row.offsetLeft;
    if (left < row.scrollLeft || left + tab.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollLeft = left - 20;
    }
  }, [category]);

  // Variações de cor da mesma peça (`group`) viram um card só.
  const families: { key: string; variants: PhotoModel[] }[] = [];
  for (const option of filteredModels.filter((item) => modelCategory(item) === category)) {
    const key = familyOf(option);
    const family = families.find((item) => item.key === key);
    if (family) family.variants.push(option);
    else families.push({ key, variants: [option] });
  }

  const colorVariants = filteredModels.filter(
    (option) => familyOf(option) === familyOf(model),
  );

  // Antecipa as próximas fotos: depois que a da vez terminou de carregar (ela
  // tem prioridade na rede) e com o navegador ocioso, entram as outras cores da
  // peça e as duas peças seguintes (e a anterior) do seletor.
  const currentLoaded = loaded.has(model.photo);
  useEffect(() => {
    if (!currentLoaded) return;

    const at = families.findIndex((family) => family.key === familyOf(model));
    const neighbours = [
      ...families.slice(at + 1, at + 3),
      ...(at > 0 ? [families[at - 1]] : []),
    ].map((family) => family.variants[0]);

    return whenIdle(() => want(...[...colorVariants, ...neighbours].map((option) => option.photo)));
    // `families` e `colorVariants` são derivados de `model`, `category` e `gender`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLoaded, model, category, gender, want]);

  function changeGender(next: GenderFilter) {
    setGender(next);
    const stillVisible =
      next === "todos" || !model.gender || model.gender === next;
    if (!stillVisible) {
      const first = models.find((option) => !option.gender || option.gender === next);
      if (first) selectModel(first);
    }
  }

  const message = `Olá! Vim pelo site da ${site.name} e tenho interesse na linha de ${title}. Modelo: ${modelLabel(model)}.`;

  const colorMessage = `Olá! Vim pelo site da ${site.name} e estou procurando outra cor para ${modelLabel(model)}.`;

  return (
    // padding-top maior que o normal: a navbar é fixa e mais alta no desktop,
    // onde ainda existe a barra de contatos acima do logo
    <Section surface="light" className="pt-32 sm:pt-40 lg:pt-44">
      <Container>
        <nav
          aria-label="Trilha de navegação"
          className="flex flex-wrap items-center gap-1.5 text-sm text-brand-muted"
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
            className="inline-flex items-center rounded-full bg-brand-green-soft px-4 py-1.5 font-display text-[0.8125rem] font-semibold text-brand-green"
          >
            {eyebrow}
          </Reveal>
          <Reveal
            as="h1"
            delay={90}
            className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl"
          >
            {headline}
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* ---------- Coluna visual: peça + seletores ---------- */}
          <Reveal variant="left" className="lg:self-start">
            <div
              ref={photoRef}
              // no mobile a peça fica um pouco mais baixa que quadrada, para os
              // seletores caberem na primeira rolada
              className={cn(
                "relative aspect-[5/4] overflow-hidden rounded-brand-lg border border-brand-border bg-brand-green-soft sm:aspect-[4/3]",
              )}
            >
              {photos.map((photo) => {
                const visible = photo === visiblePhoto;

                return (
                  <Photo
                    key={photo}
                    src={photo}
                    alt={visible ? `${modelLabel(model)} da linha ${title}` : ""}
                    aria-hidden={visible ? undefined : true}
                    fill
                    // Largura REAL da coluna esquerda — subestimar aqui faz o
                    // navegador pedir um degrau menor e o CSS esticar a foto.
                    // No teto do Container (100rem) sobram 1440px de conteúdo;
                    // menos o gap-14 (56px), o grid 1.05fr/1fr deixa ~709px.
                    // Abaixo de lg a coluna some e o card ocupa o container.
                    sizes="(min-width: 1536px) 710px, (min-width: 1024px) 52vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                    // a primeira foto é a que aparece ao abrir a página e tem
                    // prioridade; as outras já estão no palco só para a troca
                    // ser instantânea e baixam depois, com prioridade baixa
                    priority={photo === models[0].photo}
                    loading="eager"
                    fetchPriority={photo === models[0].photo ? undefined : "low"}
                    onLoad={() => handlePhotoLoad(photo)}
                    className={cn(
                      "object-cover transition-opacity duration-300 motion-reduce:transition-none",
                      visible ? "opacity-100" : "opacity-0",
                    )}
                  />
                );
              })}

              {/* Zoom: clicar na foto ou no botão abre o visualizador */}
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                aria-label={`Ampliar foto: ${modelLabel(model)}`}
                className="absolute inset-0 z-10 cursor-zoom-in"
              />
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                tabIndex={-1}
                className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-white/95 px-3.5 py-2 font-display text-xs font-semibold text-brand-heading shadow-brand backdrop-blur transition-colors duration-200 hover:border-brand-green hover:text-brand-green"
              >
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
                Ampliar
              </button>
            </div>

            <PhotoZoom
              src={visiblePhoto}
              alt={modelLabel(model)}
              open={zoomOpen}
              onClose={closeZoom}
            />

            {/* Cores da peça selecionada */}
            {model.colorName ? (
              <fieldset className="mt-5">
                <legend className={theme.ui.caption}>
                  Cor:{" "}
                  <span className="font-normal text-brand-heading">{model.colorName}</span>
                </legend>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex flex-wrap gap-2.5">
                  {colorVariants.map((option) => {
                    const active = option.name === model.name;
                    return (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => selectModel(option)}
                        onPointerEnter={() => want(option.photo)}
                        aria-pressed={active}
                        aria-label={option.colorName ?? option.name}
                        title={option.colorName ?? option.name}
                        className={cn(
                          "h-9 w-9 rounded-full border border-black/10 ring-offset-2 ring-offset-brand-bg transition-shadow duration-200",
                          active
                            ? "ring-2 ring-brand-green"
                            : "hover:ring-2 hover:ring-brand-border",
                        )}
                        style={swatchStyle(option.swatch)}
                      />
                    );
                  })}
                </div>

                {/* Cor que não está na cartela */}
                <p className="min-w-[14rem] flex-1 text-sm leading-snug text-brand-muted">
                  <span className="block font-display font-semibold text-brand-heading">
                    A cor que você procura não está aqui? Nós temos!
                  </span>
                  <Link
                    href="/#contato"
                    className="font-semibold text-brand-green underline-offset-4 hover:underline"
                  >
                    Agende uma visita
                  </Link>{" "}
                  ou{" "}
                  <a
                    href={whatsappLink(colorMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-green underline-offset-4 hover:underline"
                  >
                    nos chame no WhatsApp
                  </a>
                </p>
                </div>
              </fieldset>
            ) : null}

          </Reveal>

          {/* ---------- Coluna de conteúdo ---------- */}
          <Reveal variant="right" delay={120} className="order-3 flex min-w-0 flex-col lg:order-none">
            <p className={theme.ui.caption}>
              Modelo selecionado
            </p>
            <h2 className="mt-1 text-2xl leading-tight">
              {modelTitle(model)}
            </h2>
            {model.colorName ? (
              <p className="mt-1 text-sm text-brand-muted">
                Cor: <span className="text-brand-heading">{model.colorName}</span>
              </p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              {model.description}
            </p>

            <span
              aria-hidden="true"
              className={cn("my-7 block", theme.ui.rule)}
            />

            <p className="text-base leading-relaxed text-brand-text">{intro}</p>

            {introClosing ? (
              <p className="mt-4 font-display text-base font-bold leading-snug text-brand-green">
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

          {/* ---------- Modelos ----------
              Largura toda, 6 por linha no desktop, abaixo da peça e da descrição.
              No celular vem logo depois da peça (order-2), antes da descrição. */}
          <Reveal className="order-2 min-w-0 lg:order-none lg:col-span-2">
              {/* min-w-0: fieldset tem min-width: min-content por padrão e a fileira
                  de categorias alargaria a página no celular */}
              <fieldset className="min-w-0">
                <legend className="sr-only">Modelo</legend>
                {/* rótulo visível + filtro na mesma linha */}
                <div className="flex min-h-[2.25rem] items-center justify-between gap-3">
                  <span aria-hidden="true" className={theme.ui.caption}>
                    Modelo
                  </span>

                  {hasGenderSplit ? (
                    <div
                      role="group"
                      aria-label="Filtrar por público"
                      className="inline-flex rounded-full border border-brand-border bg-brand-surface p-1"
                    >
                      {genderOptions.map((option) => {
                        const active = gender === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => changeGender(option.value)}
                            aria-pressed={active}
                            className={cn(
                              "rounded-full px-3.5 py-1.5 font-display text-xs font-semibold transition-colors duration-200",
                              active
                                ? "bg-brand-green text-white"
                                : "text-brand-muted hover:text-brand-heading",
                            )}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                {/* Categorias: no celular a fileira rola para o lado */}
                {categories.length > 1 ? (
                  <div
                    ref={tabsRef}
                    role="tablist"
                    aria-label="Categorias de peças"
                    className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
                  >
                    {categories.map((item) => {
                      const active = item.name === category;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setCategory(item.name)}
                          className={cn(
                            "inline-flex shrink-0 items-center gap-2 rounded-brand border px-4 py-2.5 font-display text-sm font-semibold transition-colors duration-200",
                            active
                              ? "border-brand-green bg-brand-green text-white"
                              : "border-brand-border bg-brand-surface text-brand-heading hover:border-brand-green/60 hover:text-brand-green",
                          )}
                        >
                          {item.name}
                          <span
                            className={cn(
                              "rounded-full px-1.5 text-xs font-medium",
                              active ? "bg-white/20 text-white" : "bg-brand-bg text-brand-muted",
                            )}
                          >
                            {item.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                <div
                  role={categories.length > 1 ? "tabpanel" : undefined}
                  aria-label={categories.length > 1 ? category : undefined}
                  className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
                >
                  {families.map(({ key, variants }) => {
                    const active = key === familyOf(model);
                    // card da família ativa mostra a cor escolhida
                    const shown = active ? model : variants[0];

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          if (!active) selectModel(variants[0]);
                        revealPhoto();
                        }}
                        aria-pressed={active}
                        // encostar no card já traz a foto grande, para o clique ser instantâneo
                        onPointerEnter={() => want(variants[0].photo)}
                        onFocus={() => want(variants[0].photo)}
                        className={cn(
                          "group flex flex-col items-center gap-2 rounded-brand border p-2 transition-all",
                          active
                            ? "border-brand-green bg-brand-green/[0.07] shadow-brand"
                            : "border-brand-border hover:border-brand-green/60",
                        )}
                      >
                        <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-brand bg-brand-green-soft">
                          <Photo
                            src={shown.photo}
                            alt=""
                            fill
                            // 3 colunas dentro da coluna de ~709px, menos o
                            // gap-3 e o p-2 do botão: ~210px no desktop
                            sizes="(min-width: 1024px) 215px, (min-width: 640px) 30vw, 45vw"
                            className="object-cover"
                          />
                        </span>
                        <span
                          className={cn(
                            "px-1 text-center text-xs leading-tight",
                            active ? "text-brand-heading" : "text-brand-muted",
                          )}
                        >
                          {key}
                        </span>
                        {variants.length > 1 ? (
                          <span className="flex items-center gap-1 pb-1" aria-label={`${variants.length} cores`}>
                            {variants.map((variant) => (
                              <span
                                key={variant.name}
                                aria-hidden="true"
                                className="h-2.5 w-2.5 rounded-full border border-black/10"
                                style={swatchStyle(variant.swatch)}
                              />
                            ))}
                          </span>
                        ) : (
                          <span className="pb-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
          </Reveal>
        </div>

        {/* ---------- Bordados ----------
            Faixa na largura toda, abaixo da peça e da descrição: uma linha só
            deslizando, com ~6 matrizes visíveis de cada vez no desktop. */}
        {embroidery.length > 0 ? (
          <Reveal className="mt-14 border-t border-brand-border pt-10 lg:mt-20">
            <div className="max-w-3xl">
              <span className={cn(theme.ui.eyebrow, "text-brand-red")}>Personalização</span>
              <h3 className="mt-2 text-xl leading-tight tracking-tight sm:text-2xl">
                {embroideryText.title}
              </h3>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-brand-muted">
                {embroideryText.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="mt-7">
              <PhotoMarquee
                photos={embroidery}
                label="Matrizes de bordado computadorizado"
                size="md"
                rows={1}
              />
            </div>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
