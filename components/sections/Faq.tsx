import { Plus } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { faq } from "@/lib/content";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Faq() {
  return (
    <Section surface="light">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="O que as empresas costumam perguntar"
        />

        {/* <details> nativo: acessível e funcional sem JavaScript. */}
        <div className="mt-12 space-y-3">
          {faq.map((item) => (
            <details key={item.question} className={cn("group", theme.ui.card)}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-base uppercase tracking-[0.06em] text-brand-heading">
                {item.question}
                <Plus
                  className="h-5 w-5 shrink-0 text-brand-accent transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="border-t border-brand-border/70 px-6 py-5 text-sm leading-relaxed text-brand-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
