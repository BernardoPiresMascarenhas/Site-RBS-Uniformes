import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { BrandStripe } from "@/components/decor/BrandStripe";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { navLinks } from "@/lib/content";
import { services, servicePath } from "@/lib/services";
import { site } from "@/lib/site";

/** O rodapé fecha no verde escuro da marca — a logo aparece intacta sobre ele. */
export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: Instagram, href: site.social.instagram, label: "Instagram" },
    { icon: Facebook, href: site.social.facebook, label: "Facebook" },
    { icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer data-surface="dark" className="relative bg-brand-bg">
      {/* Filete tricolor no topo */}
      <BrandStripe
        className="absolute inset-x-0 top-0 h-1"
        green={60}
        yellow={25}
        red={15}
        greenClassName="bg-rbs-green-mint"
      />

      <Container size="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <Reveal className="lg:col-span-1">
            <Logo sizeClassName="h-24 sm:h-28" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-muted">
              {site.footerText}
            </p>
            <p className="mt-3 max-w-xs text-sm font-semibold leading-relaxed text-brand-heading">
              {site.footerSlogan}
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-brand border border-brand-heading/20 text-brand-heading transition-colors duration-200 hover:border-rbs-yellow hover:text-rbs-yellow"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>

          <FooterColumn title="Navegação" delay={100}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Serviços atendidos">
            {services.map((service) => (
              <li key={service.slug}>
                <FooterLink href={servicePath(service.slug)}>
                  {service.title}
                </FooterLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contato" delay={260}>
            <li className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 opacity-70"
                aria-hidden="true"
              />
              <span>
                {site.address.street}
                <br />
                {site.address.district} — {site.address.city}/
                {site.address.state}
                {site.address.zip ? (
                  <>
                    <br />
                    CEP {site.address.zip}
                  </>
                ) : null}
              </span>
            </li>
            <li>
              <FooterLink href={`tel:+${site.phoneDigits}`}>
                <span className="flex items-center gap-3">
                  <Phone className="h-4 w-4 opacity-70" aria-hidden="true" />
                  {site.phoneDisplay}
                </span>
              </FooterLink>
            </li>
            {site.whatsappNumbers.map((number) => (
              <li key={number.digits}>
                <FooterLink href={`https://wa.me/${number.digits}`}>
                  <span className="flex items-center gap-3">
                    <MessageCircle
                      className="h-4 w-4 opacity-70"
                      aria-hidden="true"
                    />
                    {number.display}
                  </span>
                </FooterLink>
              </li>
            ))}
            <li>
              <FooterLink href={`mailto:${site.email}`}>
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4 opacity-70" aria-hidden="true" />
                  {site.email}
                </span>
              </FooterLink>
            </li>
            <li className="text-brand-muted">{site.hours}</li>
          </FooterColumn>
        </div>
      </Container>

      <div className="border-t border-brand-border">
        <Container size="wide" className="py-6 text-center text-xs text-brand-muted">
          <p>
            © {year} {site.legalName}. Todos os direitos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <h3 className="text-base font-bold">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm text-brand-text">{children}</ul>
    </Reveal>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="transition-colors duration-200 hover:text-rbs-yellow">
      {children}
    </a>
  );
}
