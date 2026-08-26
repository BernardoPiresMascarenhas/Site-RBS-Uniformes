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
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";

const highlights = [
  {
    icon: UsersRound,
    title: "Atendimento especializado",
    description: "Foco total em condomínios e seus profissionais.",
  },
  {
    icon: Ruler,
    title: "Visita para medição",
    description: "Vamos até seu condomínio sem compromisso.",
  },
  {
    icon: Shirt,
    title: "Uniformes sob medida",
    description: "Conforto, qualidade e padronização para sua equipe.",
  },
  {
    icon: BadgeCheck,
    title: "Qualidade garantida",
    description: "Materiais selecionados e acabamento profissional.",
  },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#050605] pb-8 pt-[calc(var(--header-h)+1rem)] text-white sm:pb-10 lg:pb-12"
    >
      {/* ======================================================
          FUNDO ESCURO DO HERO

          Esta camada ocupa inclusive a região atrás do Header.
          Assim o Navbar continua legível mesmo sendo transparente.
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-40 bg-[#050605]"
      />

      {/* ======================================================
          FOTO DE FUNDO

          IMPORTANTE:
          Diferente da versão anterior, a foto NÃO usa mais inset-0.

          Ela começa exatamente depois da altura reservada para o
          Header através de --header-h.

          Desktop:
          --header-h = 152px

          Tablet:
          --header-h = 120px

          Mobile:
          --header-h = 104px
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[var(--header-h)] -z-30 overflow-hidden"
      >
        <Image
          src="/hero/imagemFundoHero2.png"
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          className="
            object-cover
            object-[42%_center]
            lg:object-center
          "
        />
      </div>

      {/* ======================================================
          TRANSIÇÃO ENTRE HEADER E FOTO

          Evita uma linha perceptível exatamente no ponto em que
          a imagem começa.
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[var(--header-h)] -z-20 h-24"
        style={{
          background:
            "linear-gradient(180deg, #050605 0%, rgba(5,6,5,0.78) 22%, rgba(5,6,5,0.30) 58%, transparent 100%)",
        }}
      />

      {/* ======================================================
          VÉU ESCURO

          Começa junto com a fotografia, em vez de cobrir também
          todo o Header.
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[var(--header-h)] -z-20 bg-[#050604]/50 lg:bg-[#050604]/22"
      />

      {/* ======================================================
          GRADIENTE DA ESQUERDA

          Mantém uma área limpa para o título sem apagar demais
          a camisa que já está embutida na fotografia.
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[var(--header-h)] -z-20"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,5,4,0.95) 0%, rgba(5,6,5,0.90) 23%, rgba(5,6,5,0.70) 42%, rgba(6,7,6,0.32) 60%, rgba(6,7,6,0.08) 76%, transparent 91%)",
        }}
      />

      {/* ======================================================
          VINHETA SUPERIOR DA FOTO

          Serve apenas para integrar suavemente a foto ao fundo
          do Header, sem jogar uma sombra pesada sobre a camisa.
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[var(--header-h)] -z-10"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(4,5,4,0.45) 0%,
              rgba(4,5,4,0.14) 10%,
              transparent 23%
            ),
            linear-gradient(
              0deg,
              rgba(4,5,4,0.76) 0%,
              rgba(4,5,4,0.32) 10%,
              transparent 28%
            )
          `,
        }}
      />

      {/* ======================================================
          REALCE DOURADO

          Bem discreto porque a própria fotografia já possui
          iluminação dourada.
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[var(--header-h)] -z-10 hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse 28% 54% at 75% 38%, rgba(212,170,72,0.06) 0%, rgba(158,111,31,0.025) 42%, transparent 75%)",
        }}
      />

      <Container size="wide" className="relative">
        {/* ======================================================
            CONTEÚDO PRINCIPAL
        ====================================================== */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          {/* ====================================================
              LADO ESQUERDO
          ==================================================== */}
          <div className="relative z-10 max-w-[680px] xl:max-w-[820px]">
            {/* Badge */}
            <Reveal className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#c8a64c]/55 bg-black/30 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#e1c573] backdrop-blur-sm sm:px-5 sm:text-[0.78rem] sm:tracking-[0.14em]">
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-[#d5b34e]"
                aria-hidden="true"
              />

              <span>Especialistas em uniformes para condomínios</span>
            </Reveal>

            {/* Título */}
            <Reveal
              as="h1"
              delay={90}
              className="font-display text-[2.1rem] uppercase leading-[1.05] tracking-[0.015em] text-[#f0e3c2] sm:text-[2.9rem] lg:text-[3.15rem] xl:text-[3.6rem]"
            >
              Os uniformes
              <br />
              são o espelho
              <br />

              <span className="text-[#d1ad4c]">
                do seu condomínio.
              </span>
            </Reveal>

            {/* Linha */}
            <Reveal
              variant="scale"
              delay={180}
              className="mt-4 h-[3px] w-16 bg-[#c8a344]"
            />

            {/* Descrição */}
            <Reveal
              as="p"
              delay={240}
              className="mt-4 max-w-[620px] text-[0.95rem] leading-7 text-white/70 sm:text-[1.08rem] sm:leading-8 xl:max-w-[680px]"
            >
              Uniformes profissionais sob medida para portaria, limpeza,
              manutenção e administração. Mais organização, padronização e
              valorização para o seu condomínio.
            </Reveal>

            {/* ==================================================
                BOTÕES
            ================================================== */}
            <Reveal
              delay={310}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <ButtonLink
                href="#contato"
                size="lg"
                className="min-h-[60px] flex-1 justify-start gap-3 rounded-md border border-[#d4b45c] bg-[#d4b45c] px-5 py-3 text-left text-[#111] shadow-[0_10px_30px_rgba(200,163,68,0.12)] transition hover:bg-[#e2c774] sm:max-w-[17.5rem]"
                icon={
                  <CalendarDays
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />
                }
              >
                <span className="flex flex-col items-start">
                  <strong className="text-[0.8rem] font-bold uppercase tracking-[0.04em] sm:text-[0.88rem]">
                    Agendar visita gratuita
                  </strong>

                  <span className="mt-1 text-[0.62rem] font-normal uppercase tracking-[0.18em] opacity-60 sm:text-[0.66rem]">
                    Visita sem compromisso
                  </span>
                </span>
              </ButtonLink>

              <ButtonLink
                tone="secondary"
                size="lg"
                href={whatsappLink(defaultWhatsappMessage)}
                external
                className="min-h-[60px] flex-1 justify-start gap-3 rounded-md border border-[#b9913b]/80 bg-black/30 px-5 py-3 text-left text-[#d5b65e] backdrop-blur-sm transition hover:border-[#d4b45c] hover:bg-[#d4b45c]/10 sm:max-w-[17.5rem]"
                icon={
                  <FileText
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />
                }
              >
                <span className="flex flex-col items-start">
                  <strong className="text-[0.8rem] font-bold uppercase tracking-[0.04em] sm:text-[0.88rem]">
                    Solicitar cotação
                  </strong>

                  <span className="mt-1 text-[0.62rem] font-normal uppercase tracking-[0.18em] text-white/55 sm:text-[0.66rem]">
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
              className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <VisitModal />

              <div className="flex items-center gap-3">
                {/* Avatares */}
                <div className="flex -space-x-2">
                  {["S", "A", "M", "C"].map((letter, index) => (
                    <div
                      key={`${letter}-${index}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#080808] bg-[#262626] text-[0.6rem] font-semibold text-white"
                    >
                      {letter}
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-3.5 w-3.5 fill-[#e1b842] text-[#e1b842]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className="mt-1 text-[0.74rem] text-white/65 sm:text-[0.82rem]">
                    Síndicos e administradoras satisfeitos
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ====================================================
              LADO DIREITO

              Desktop:
              a camisa já faz parte da própria foto.

              Mobile:
              exibimos a camisa PNG porque o crop vertical da
              fotografia não consegue preservar bem o manequim.
          ==================================================== */}
          <Reveal
            variant="right"
            delay={200}
            className="relative z-10 flex min-h-[250px] items-center justify-center sm:min-h-[295px] lg:hidden"
          >
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[62%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
              style={{
                background: "rgba(190,143,43,0.055)",
              }}
            />

            <div className="relative z-10 aspect-[3/4] w-full max-w-[240px] sm:max-w-[280px]">
              <Image
                src="/hero/heromobile1.png"
                alt="Camisa social verde da RBS Uniformes"
                fill
                priority
                sizes="(max-width: 640px) 240px, 280px"
                className="object-contain object-center drop-shadow-[0_30px_35px_rgba(0,0,0,0.45)]"
              />
            </div>
          </Reveal>
        </div>

        {/* ======================================================
            DIFERENCIAIS
        ====================================================== */}
        <Reveal
          delay={470}
          className="relative z-20 mt-6 overflow-hidden rounded-xl border border-[#a47e2e]/45 bg-[#0b0a07]/92 shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur-md lg:mt-7"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(
              ({ icon: Icon, title, description }, index) => (
                <Reveal
                  key={title}
                  delay={560 + index * 90}
                  className={[
                    "flex min-h-[72px] items-center gap-3 px-4 py-3 lg:px-5",
                    "transition-colors duration-300 hover:bg-[#a47e2e]/10",

                    index !== 0
                      ? "border-t border-[#a47e2e]/20 sm:border-l sm:border-t-0"
                      : "",

                    index === 2
                      ? "sm:border-l-0 sm:border-t lg:border-l lg:border-t-0"
                      : "",
                  ].join(" ")}
                >
                  <Icon
                    className="h-6 w-6 shrink-0 stroke-[1.35] text-[#d3ac4b]"
                    aria-hidden="true"
                  />

                  <div>
                    <h2 className="font-display text-[0.7rem] uppercase leading-[1.4] tracking-[0.08em] text-[#ddbd6c] xl:text-[0.76rem]">
                      {title}
                    </h2>

                    <p className="mt-1 text-[0.66rem] leading-[1.45] text-white/55 xl:text-[0.7rem]">
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