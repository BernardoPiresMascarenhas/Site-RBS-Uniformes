import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { differentials } from "@/lib/content";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Differentials() {
  return (
    <Section id="diferenciais" surface="light">
      <Container>
        <SectionHeading
          eyebrow="Por que escolher a RBS"
          title={
            <>
              O que separa um uniforme comum
              <span className="block text-accent-sheen">
                de um uniforme RBS
              </span>
            </>
          }
          description="Seis compromissos que valem para o pedido de 30 peças e para o contrato de 30 mil."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.title}
                // a cascata segue a leitura: 3 colunas no desktop, 1 no mobile
                delay={(index % 3) * 110}
                className={cn(
                  "relative flex flex-col p-7",
                  theme.ui.card,
                  theme.ui.cardHover,
                )}
              >
                <span
                  className={cn(
                    "mb-5 inline-flex h-12 w-12 items-center justify-center",
                    theme.ui.iconBox,
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <h3 className="font-display text-lg uppercase tracking-[0.08em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
