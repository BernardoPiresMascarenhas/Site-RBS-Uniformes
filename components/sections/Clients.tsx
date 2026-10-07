import Image from "next/image";

import { PhotoMarquee } from "@/components/PhotoMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { getAdministrators, getClientPhotos, getSuppliers, type PartnerImage } from "@/lib/partners";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Prova social: condomínios atendidos (fotos dos letreiros), administradoras
 * parceiras e fornecedores. O conteúdo vem das pastas `public/clientes/`,
 * `public/administradoras/` e `public/fornecedores/` — ver `lib/partners.ts`.
 */
export async function Clients() {
  const [photos, administrators, suppliers] = await Promise.all([
    getClientPhotos(),
    getAdministrators(),
    getSuppliers(),
  ]);

  if (photos.length === 0 && administrators.length === 0 && suppliers.length === 0) {
    return null;
  }

  return (
    <Section id="clientes" surface="light" tone="alt" className="overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Clientes e fornecedores"
          eyebrowClassName="text-brand-red"
          dividerClassName="bg-rbs-yellow"
          title={
            <>
              Condomínios que vestem{" "}
              <span className="text-brand-accent">RBS</span>
            </>
          }
          description="Alguns dos condomínios que atendemos. Clique em uma foto para ampliar."
        />
      </Container>

      {/* As faixas ocupam a largura toda da tela, fora do Container. */}
      {photos.length > 0 ? (
        <Reveal className="mt-12">
          <PhotoMarquee photos={photos} label="Fotos dos condomínios atendidos" />
        </Reveal>
      ) : null}

      {administrators.length > 0 || suppliers.length > 0 ? (
        <Container className="mt-14 space-y-6">
          {administrators.length > 0 ? (
            <LogoCard
              eyebrow="Administradoras"
              title="Administradoras que confiam na RBS"
              description="Trabalhamos lado a lado com administradoras de condomínios que indicam e aprovam o nosso atendimento."
              logos={administrators}
              columns={4}
            />
          ) : null}

          {suppliers.length > 0 ? (
            <LogoCard
              eyebrow="Fornecedores"
              title="Marcas que garantem a qualidade"
              description="Trabalhamos com tecidos e calçados de fabricantes reconhecidos no mercado nacional."
              logos={suppliers}
              columns={3}
            />
          ) : null}
        </Container>
      ) : null}
    </Section>
  );
}

/**
 * Card com texto à esquerda e grade de logos à direita (administradoras e
 * fornecedores). A grade é um flex centralizado em vez de grid: quando a
 * conta não fecha (ex.: 7 logos em 4 colunas), a última linha fica no meio
 * em vez de deixar um buraco à direita.
 */
function LogoCard({
  eyebrow,
  title,
  description,
  logos,
  columns,
}: {
  eyebrow: string;
  title: string;
  description: string;
  logos: PartnerImage[];
  columns: 3 | 4;
}) {
  return (
    <Reveal
      className={cn(
        "grid items-center gap-8 p-7 sm:p-9 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12",
        theme.ui.card,
      )}
    >
      <div>
        <span className={cn(theme.ui.eyebrow, "text-brand-yellow")}>{eyebrow}</span>
        <h3 className="mt-2 text-2xl leading-tight tracking-tight">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">{description}</p>
      </div>

      <ul className="flex flex-wrap justify-center gap-3">
        {logos.map((logo) => (
          <li
            key={logo.src}
            className={cn(
              "group flex h-24 basis-[calc(50%-0.375rem)] items-center justify-center rounded-brand-lg border border-brand-border bg-brand-bg-alt px-5 transition-colors duration-200 hover:border-brand-muted/40 hover:bg-brand-surface sm:h-28 sm:basis-[calc(33.333%-0.5rem)]",
              columns === 4 && "xl:basis-[calc(25%-0.75rem)]",
            )}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="160px"
              // logos sempre nas cores originais, em qualquer tela
              className="max-h-14 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-16"
            />
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
