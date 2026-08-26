import { Plus } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { faq } from "@/lib/content";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Faq() {
  return (
    <Section surface="light">
      <Container size="content">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="O que as empresas costumam perguntar"
        />

        {/* <details> nativo: acessível e funcional sem JavaScript. */}
        <div className="mt-12 space-y-3">
          {faq.map((item, index) => (
            <Reveal
              as="details"
              key={item.question}
              delay={index * 80}
              className={cn("group", theme.ui.card)}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-base uppercase tracking-[0.06em] text-brand-heading">
                {item.question}
                <Plus
                  className="h-5 w-5 shrink-0 text-brand-green transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="border-t border-brand-border/70 px-6 py-5 text-sm leading-relaxed text-brand-muted">
                {item.answer}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
