import Image from "next/image";

import { PhotoMarquee } from "@/components/PhotoMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { getClientPhotos, getSuppliers } from "@/lib/partners";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Prova social: condomínios atendidos (fotos dos letreiros) e fornecedores.
 * O conteúdo vem das pastas `public/clientes/` e `public/fornecedores/` —
 * ver `lib/partners.ts`.
 */
export async function Clients() {
  const [photos, suppliers] = await Promise.all([getClientPhotos(), getSuppliers()]);

  if (photos.length === 0 && suppliers.length === 0) return null;

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

      {suppliers.length > 0 ? (
        <Container>
          <Reveal
            className={cn(
              "mt-14 grid items-center gap-8 p-7 sm:p-9 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12",
              theme.ui.card,
            )}
          >
            <div>
              <span className={cn(theme.ui.eyebrow, "text-brand-yellow")}>Fornecedores</span>
              <h3 className="mt-2 text-2xl leading-tight tracking-tight">
                Marcas que garantem a qualidade
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                Trabalhamos com tecidos e calçados de fabricantes reconhecidos no mercado nacional.
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
              {suppliers.map((logo) => (
                <li
                  key={logo.src}
                  className="group flex h-24 items-center justify-center rounded-brand-lg border border-brand-border bg-brand-bg-alt px-5 transition-colors duration-200 hover:border-brand-muted/40 hover:bg-brand-surface sm:h-28"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    sizes="160px"
                    // no desktop os logos ficam neutros e ganham cor no hover;
                    // no celular (sem hover) aparecem sempre coloridos
                    className="max-h-14 w-auto max-w-full object-contain transition duration-300 sm:max-h-16 md:opacity-75 md:grayscale md:group-hover:opacity-100 md:group-hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      ) : null}
    </Section>
  );
}
