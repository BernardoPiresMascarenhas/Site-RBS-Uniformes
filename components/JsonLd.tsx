import { site } from "@/lib/site";

/**
 * Dados estruturados (schema.org) da empresa e do site, em JSON-LD.
 *
 * Só entra o que o próprio site já publica (nome, telefone, e-mail, endereço e
 * a logo). Fica de fora o que não está confirmado: redes sociais (os links em
 * `site.social` ainda são genéricos), horário, avaliações e CEP.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organizacao`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/icon.png`,
        description: site.description,
        email: site.email,
        telephone: `+${site.phoneNumbers[0].digits}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          addressCountry: "BR",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: `+${site.phoneNumbers[0].digits}`,
            email: site.email,
            areaServed: "BR",
            availableLanguage: "pt-BR",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#site`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "pt-BR",
        publisher: { "@id": `${site.url}/#organizacao` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON gerado aqui a partir de constantes; `<` escapado por segurança
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
