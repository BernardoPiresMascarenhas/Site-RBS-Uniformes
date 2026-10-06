import { Plus } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { faq } from "@/lib/content";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Faq() {
  return (
    <Section id="duvidas" surface="light">
      <Container size="content">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          eyebrowClassName="text-brand-red"
          title="O que as empresas costumam perguntar"
        />

        {/* <details> nativo: acessível e funcional sem JavaScript. */}
        <div className="mt-10 space-y-3">
          {faq.map((item, index) => (
            <Reveal
              as="details"
              key={item.question}
              delay={index * 80}
              className={cn("group transition-colors duration-200 open:border-brand-muted/40 hover:border-brand-muted/40", theme.ui.card)}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-brand-lg p-6 font-display text-base font-bold text-brand-heading">
                {item.question}
                <Plus
                  className="h-5 w-5 shrink-0 text-brand-green transition-[transform,color] duration-300 group-open:rotate-45 group-open:text-brand-yellow group-hover:text-brand-yellow"
                  aria-hidden="true"
                />
              </summary>
              <p className="border-t border-brand-border px-6 py-5 text-sm leading-relaxed text-brand-muted">
                {item.answer}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
