import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { differentials } from "@/lib/content";
import { theme, tones, type Tone } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Só as caixas de ícone mudam de cor; os cards continuam neutros. */
const iconTones: Tone[] = ["yellow"];

export function Differentials() {
  return (
    <Section id="diferenciais" surface="light">
      <Container>
        <SectionHeading
          eyebrow="Por que escolher a RBS"
          title={
            <>
              O que diferencia os uniformes da RBS dos{" "}
              <span className="text-brand-accent">de outras empresas?</span>
            </>
          }
          // linha mais larga + `text-wrap: balance` do h2: quebra em duas
          // linhas de tamanho parecido no desktop
          titleClassName="max-w-4xl"
          description="Seis fatores que mostram o que temos que diferente."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    tones[iconTones[index % iconTones.length]].box,
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <h3 className="text-lg">
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
