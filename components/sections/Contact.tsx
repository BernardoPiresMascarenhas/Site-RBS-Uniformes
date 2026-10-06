import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { QuoteForm } from "@/components/QuoteForm";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { defaultWhatsappMessage, site, whatsappLink } from "@/lib/site";
import { theme, tones, type Tone } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface Channel {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  /** Cor da caixa do ícone — distribuição discreta das cores da logo. */
  tone: Tone;
}

export function Contact() {
  const channels: Channel[] = [
    ...site.phoneNumbers.map((number) => ({
      icon: Phone,
      label: "Telefone fixo",
      value: number.display,
      href: `tel:+${number.digits}`,
      tone: "green" as Tone,
    })),
    ...site.whatsappNumbers.map((number) => ({
      icon: MessageCircle,
      label: "WhatsApp",
      value: number.display,
      href: whatsappLink(defaultWhatsappMessage, number.digits),
      external: true,
      tone: "green" as Tone,
    })),
    {
      icon: Mail,
      label: "E-mail",
      value: site.email,
      href: `mailto:${site.email}`,
      tone: "green",
    },
    {
      icon: MapPin,
      label: "Endereço",
      value: `${site.address.street} — ${site.address.district}, ${site.address.city}/${site.address.state}`,
      tone: "green",
    },
    {
      icon: Clock,
      label: "Atendimento",
      value: site.hours,
      tone: "green",
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
              Uniformize já os seus{" "}
              <span className="text-brand-accent">colaboradores</span>
            </>
          }
          description="Preencha o formulário com as informações solicitadas para um atendimento direcionado ou clique no botão do WhatsApp flutuante para um atendimento rápido."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex min-w-0 flex-col gap-6">
            <Reveal variant="left" className={cn("p-7 sm:p-8", theme.ui.card)}>
              <h3 className="text-xl">
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
                          tones[channel.tone].box,
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className={cn("block", theme.ui.caption)}>
                          {channel.label}
                        </span>
                        <span className="mt-0.5 block text-sm font-medium text-brand-heading">
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
              className="relative overflow-hidden rounded-brand-lg bg-brand-bg-alt p-7 shadow-brand-lg sm:p-8"
            >
              {/* Barra amarela no topo do card */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] bg-rbs-yellow"
              />
              <span className="mb-3 inline-flex rounded-full bg-rbs-yellow px-3 py-1 font-display text-[0.6875rem] font-bold uppercase tracking-[0.04em] text-rbs-green-deep">
                Atendimento rápido
              </span>
              <p className="font-display text-xl font-bold leading-snug tracking-tight text-brand-heading">
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
