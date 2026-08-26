import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/lib/content";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Process() {
  return (
    <Section tone="alt">
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Quatro etapas do briefing à entrega"
          description="Um processo previsível: você sabe em que fase o pedido está do começo ao fim."
        />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Linha de conexão entre as etapas (apenas em telas grandes) */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent lg:block"
          />

          {processSteps.map((step, index) => {
            const Icon = step.icon;

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
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center",
                      theme.ui.iconBox,
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span
                    className="font-display text-3xl font-bold text-brand-accent/30"
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-lg uppercase tracking-[0.08em]">
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
