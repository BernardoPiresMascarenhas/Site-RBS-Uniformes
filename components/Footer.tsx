import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Section";
import { navLinks } from "@/lib/content";
import { services, servicePath } from "@/lib/services";
import { site } from "@/lib/site";

/** O rodapé fecha em preto — a logo dourada brilha sobre o escuro. */
export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: Instagram, href: site.social.instagram, label: "Instagram" },
    { icon: Facebook, href: site.social.facebook, label: "Facebook" },
    { icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="relative border-t border-premium-gold/25 bg-premium-black">
      {/* Filete tricolor com as cores da logo */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block h-1 w-full bg-gradient-to-r from-premium-emerald via-premium-gold to-premium-red"
      />

      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo sizeClassName="h-24 sm:h-28" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-muted">
              {site.description}
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-brand border border-premium-gold/35 text-premium-gold transition-colors hover:bg-premium-gold hover:text-black"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Navegação">
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

          <FooterColumn title="Contato">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
              <span>
                {site.address.street}
                <br />
                {site.address.district} — {site.address.city}/{site.address.state}
                <br />
                CEP {site.address.zip}
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
                    <MessageCircle className="h-4 w-4 opacity-70" aria-hidden="true" />
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

      <div className="border-t border-premium-gold/15">
        <Container className="py-6 text-center text-xs text-brand-muted">
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
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-sm uppercase tracking-[0.24em] text-premium-gold">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm text-brand-text">{children}</ul>
    </div>
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
    <a href={href} className="transition-colors hover:text-premium-gold">
      {children}
    </a>
  );
}
