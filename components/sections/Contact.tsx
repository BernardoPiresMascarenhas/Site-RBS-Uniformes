import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { QuoteForm } from "@/components/QuoteForm";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { defaultWhatsappMessage, site, whatsappLink } from "@/lib/site";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface Channel {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export function Contact() {
  const channels: Channel[] = [
    ...site.phoneNumbers.map((number) => ({
      icon: Phone,
      label: "Telefone fixo",
      value: number.display,
      href: `tel:+${number.digits}`,
    })),
    ...site.whatsappNumbers.map((number) => ({
      icon: MessageCircle,
      label: "WhatsApp",
      value: number.display,
      href: whatsappLink(defaultWhatsappMessage, number.digits),
      external: true,
    })),
    {
      icon: Mail,
      label: "E-mail",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: MapPin,
      label: "Endereço",
      value: `${site.address.street} — ${site.address.district}, ${site.address.city}/${site.address.state}`,
    },
    {
      icon: Clock,
      label: "Atendimento",
      value: site.hours,
    },
  ];

  return (
    <Section
      id="contato"
      tone="alt"
      surface="light"
      className="overflow-hidden"
    >
      <Container>
        <SectionHeading
          eyebrow="SOLICITE UMA COTAÇÃO"
          title={
            <>
              UNIFORMIZE JÁ OS SEUS {" "}
              <span className="text-accent-sheen">COLABORADORES</span>
            </>
          }
          description="Preencha o formulário com as informações solicitadas para um atendimento direcionado ou clique no botão do WhatsApp flutuante para um atendimento rápido."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex min-w-0 flex-col gap-6">
            <Reveal variant="left" className={cn("p-7 sm:p-8", theme.ui.card)}>
              <h3 className="font-display text-xl uppercase tracking-[0.08em]">
                Canais de atendimento
              </h3>

              <ul className="mt-6 space-y-5">
                {channels.map((channel) => {
                  const Icon = channel.icon;

                  const content = (
                    <>
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center",
                          theme.ui.iconBox,
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-[0.16em] text-brand-muted">
                          {channel.label}
                        </span>
                        <span className="mt-1 block text-sm text-brand-heading">
                          {channel.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={`${channel.label}-${channel.value}`}>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          {...(channel.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="flex items-start gap-4 transition-opacity hover:opacity-80"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-4">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* Card de destaque sempre escuro, mesmo na seção clara. */}
            <Reveal
              variant="left"
              delay={120}
              data-surface="dark"
              // brilho esmeralda no canto superior direito, longe do texto
              className="relative overflow-hidden rounded-brand border border-premium-emerald/40 bg-gradient-to-tr from-premium-black via-premium-black to-premium-emerald/35 p-7 sm:p-8"
            >
              <p className="font-display text-lg uppercase leading-snug tracking-[0.06em] text-premium-gold-glow">
                Prefere resolver agora?
              </p>
              <p className="mt-2 text-sm text-brand-text">
                Chame no WhatsApp e receba o orçamento no mesmo dia.
              </p>

              <ButtonLink
                href={whatsappLink(defaultWhatsappMessage)}
                external
                className="mt-6 w-full"
                icon={<MessageCircle className="h-4 w-4" />}
              >
                Chamar no WhatsApp
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal variant="right" delay={100} className="min-w-0">
            <QuoteForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
