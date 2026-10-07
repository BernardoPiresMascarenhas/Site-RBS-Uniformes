import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/lib/content";
import { theme, tones, type Tone } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Todas as etapas em amarelo — contraste com o fundo verde. */
const stepTones: Tone[] = ["yellow"];

export function Process() {
  return (
    <Section surface="dark" className="fundo-tecido">
      <Container>
        <SectionHeading
          eyebrow="LOGÍSTICA DA RBS"
          title="Apenas quatro etapas da cotação à entrega."
          description="Dinâmico, descomplicado, cuidado e profissionalismo em todo processo."
        />

        <ol className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Linha de conexão entre as etapas (apenas em telas grandes) */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-12 hidden h-px bg-brand-accent/35 lg:block"
          />

          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const tone = tones[stepTones[index % stepTones.length]];

            return (
              <Reveal
                as="li"
                key={step.step}
                delay={index * 120}
                className={cn(
                  "relative flex flex-col p-7",
                  theme.ui.card,
                  theme.ui.cardHover,
                )}
              >
                {/* Traço curto no topo, na cor da etapa */}
                <span
                  aria-hidden="true"
                  className={cn("absolute left-7 top-0 h-[3px] w-10 rounded-b-full", tone.dot)}
                />
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center",
                      theme.ui.iconBox,
                      tone.box,
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span
                    className={cn("font-display text-3xl font-extrabold opacity-80", tone.text)}
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>
                </div>

                <h3 className="mt-6 text-lg">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {step.description}
                </p>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
