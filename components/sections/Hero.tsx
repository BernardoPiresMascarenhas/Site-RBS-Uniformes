import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  FileText,
  Ruler,
  ShieldCheck,
  Shirt,
  Star,
  UsersRound,
} from "lucide-react";

import { VisitModal } from "@/components/VisitModal";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { testimonials } from "@/lib/content";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";
import { tones, type Tone } from "@/lib/theme";
import { cn, initials } from "@/lib/utils";

const highlights: {
  icon: typeof UsersRound;
  title: string;
  description: string;
  /** Cor do ícone — os textos continuam brancos. */
  tone: Tone;
}[] = [
  {
    icon: UsersRound,
    tone: "red",
    title: "Atendimento especializado",
    description: "Contamos com equipes especializadas desde a cotação até a entrega.",
  },
  {
    icon: Ruler,
    tone: "red",
    title: "Medição local",
    description: "Deslocamos um profissional da área para tirar as medidas de cada colaborador individualmente e sem custos adicionais.",
  },
  {
    icon: Shirt,
    tone: "red",
    title: "Visita sem compromisso",
    description: "Apresentamos as opções de uniformes de acordo com o que for solicitado mediante interesse e contato.",
  },
  {
    icon: BadgeCheck,
    tone: "red",
    title: "Entrega gratuita",
    description: "Entrega realizada pela RBS com acompanhamento da localização em tempo real.",
  },
];

export function Hero() {
  return (
    <section
      id="inicio"
      // superfície escura: todo o conteúdo usa os tokens do verde da marca
      data-surface="dark"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-brand-bg pb-8 pt-[calc(var(--header-h)+1rem)] sm:pb-10 lg:pb-12"
    >
      {/* ======================================================
          FOTO DE FUNDO

          Começa logo abaixo do header (--header-h): a faixa acima dela é o
          próprio fundo verde da seção, onde a navbar transparente se apoia.
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[var(--header-h)] -z-20 overflow-hidden"
      >
        <Image
          src="/hero/imagemFundoHero4.png"
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[70%_center] lg:object-center"
        />
      </div>

      {/* Véu verde-escuro: garante leitura do texto à esquerda e deixa a
          fotografia aparecer à direita (ver `.hero-scrim` em globals.css). */}
      <div
        aria-hidden="true"
        className="hero-scrim absolute inset-x-0 bottom-0 top-[var(--header-h)] -z-10"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          {/* ====================================================
              LADO ESQUERDO
          ==================================================== */}
          <div className="relative z-10 max-w-[680px] xl:max-w-[820px]">
            {/* Selo — etiqueta comercial no amarelo da logo */}
            <Reveal className="mb-5 inline-flex items-center gap-2 rounded-full bg-rbs-yellow px-4 py-1.5 font-display text-[0.8125rem] font-bold text-rbs-green-deep sm:text-sm">
              <ShieldCheck
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              />

              <span>Especialistas em uniformes para condomínios</span>
            </Reveal>

            {/* Título */}
            <Reveal
              as="h1"
              delay={90}
              // fluido no celular: a fonte acompanha a largura útil (tela menos
              // os 2×20px de margem). "A praticidade que todo" mede ~10,5× a
              // fonte, então cabe numa linha a partir de ~340px de tela
              className="text-[clamp(1.75rem,calc((100vw-2.5rem)/10.7),2.125rem)] font-extrabold leading-[1.08] tracking-tight sm:text-[2.8rem] lg:text-[3.05rem] xl:text-[3.5rem]"
            >
              {/* duas linhas fixas; se a 1ª não couber, `balance` reparte
                  "A praticidade / que todo" em vez de isolar "todo" */}
              <span className="block sm:whitespace-nowrap">A praticidade que todo</span>
              <span className="block">Síndico procura</span>
            </Reveal>

            {/* Traço amarelo sob o título */}
            <Reveal
              variant="scale"
              delay={180}
              aria-hidden="true"
              className="mt-5 h-1 w-16 rounded-full bg-rbs-yellow"
            />

            {/* Descrição */}
            <Reveal
              as="p"
              delay={240}
              className="mt-5 max-w-[620px] text-base leading-7 text-brand-text sm:text-lg sm:leading-8 xl:max-w-[680px]"
            >
              Conheça os diferenciais da RBS Uniformes, uma empresa com foco principal em atendimento à condomínios, simplificando a gestão de uniformes para Síndicos e Administradoras.
            </Reveal>

            {/* ==================================================
                BOTÕES — cores do `Button`; aqui só o layout de duas linhas
            ================================================== */}
            <Reveal
              delay={310}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <ButtonLink
                href="#contato"
                tone="accent"
                size="lg"
                className="min-h-[60px] flex-1 justify-between gap-3 px-5 py-3 text-left sm:max-w-[17.5rem]"
                icon={
                  <CalendarDays
                    className="h-5 w-5 shrink-0 stroke-[2.25]"
                    aria-hidden="true"
                  />
                }
              >
                <span className="flex flex-col items-start">
                  <strong className="text-[0.9375rem] font-bold">
                    Agendar visita gratuita
                  </strong>

                  {/* verde profundo cheio (sem opacidade): contraste forte no amarelo */}
                  <span className="mt-0.5 font-sans text-[0.75rem] font-medium">
                    Visita sem compromisso
                  </span>
                </span>
              </ButtonLink>

              <ButtonLink
                tone="secondary"
                size="lg"
                href={whatsappLink(defaultWhatsappMessage)}
                external
                // mais discreto que o amarelo: borda branca a meia força
                className="min-h-[60px] flex-1 justify-between gap-3 border-white/40 px-5 py-3 text-left hover:border-white/70 hover:bg-white/[0.06] sm:max-w-[17.5rem]"
                icon={
                  <FileText
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />
                }
              >
                <span className="flex flex-col items-start">
                  <strong className="text-[0.9375rem] font-bold">
                    Solicitar cotação
                  </strong>

                  <span className="mt-0.5 font-sans text-[0.75rem] font-normal opacity-75">
                    Receba sua proposta
                  </span>
                </span>
              </ButtonLink>
            </Reveal>

            {/* ==================================================
                MODAL + PROVA SOCIAL
            ================================================== */}
            <Reveal
              delay={390}
              className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <VisitModal />

              <span aria-hidden="true" className="hidden h-8 w-px bg-white/15 sm:block" />

              {/* Resumo da seção de avaliações: mesmos clientes, mesmo avatar
                  amarelo — e o bloco inteiro leva até lá. */}
              <a
                href="#avaliacoes"
                aria-label="Ver as avaliações dos clientes"
                className="group flex items-center gap-4 rounded-brand"
              >
                {/* Avatares */}
                <div className="flex -space-x-2" aria-hidden="true">
                  {testimonials.map((item) => (
                    <div
                      key={item.name}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-bg font-display text-[0.65rem] font-bold",
                        tones.yellow.box,
                      )}
                    >
                      {initials(item.name)}
                    </div>
                  ))}
                </div>

                <span aria-hidden="true" className="h-8 w-px bg-white/15" />

                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-3.5 w-3.5 fill-rbs-yellow text-rbs-yellow"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className="mt-1 flex items-center gap-1.5 text-[0.8125rem] text-brand-muted underline-offset-4 transition-colors duration-200 group-hover:text-brand-heading group-hover:underline">
                    {/* único toque vermelho do hero */}
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-rbs-red"
                    />
                    Síndicos e administradoras satisfeitos
                  </p>
                </div>
              </a>
            </Reveal>
          </div>

        </div>

        {/* ======================================================
            DIFERENCIAIS
        ====================================================== */}
        <Reveal
          delay={470}
          className="relative z-20 mt-9 overflow-hidden rounded-brand-lg border border-rbs-yellow bg-brand-bg shadow-brand-lg"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(
              ({ icon: Icon, title, description, tone }, index) => (
                <Reveal
                  key={title}
                  delay={560 + index * 90}
                  className={[
                    "flex items-center gap-3 px-4 py-2.5 lg:px-5",
                    "transition-colors duration-200 hover:bg-brand-heading/[0.04]",

                    index !== 0
                      ? "border-t border-rbs-yellow/40 sm:border-l sm:border-t-0"
                      : "",

                    index === 2
                      ? "sm:border-l-0 sm:border-t lg:border-l lg:border-t-0"
                      : "",
                  ].join(" ")}
                >
                  <Icon
                    className={cn("h-5 w-5 shrink-0 stroke-[1.75]", tones[tone].text)}
                    aria-hidden="true"
                  />

                  <div>
                    <h2 className="text-[0.8125rem] font-bold leading-tight">
                      {title}
                    </h2>

                    <p className="mt-0.5 text-xs leading-[1.35] text-brand-muted">
                      {description}
                    </p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
