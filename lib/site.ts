/**
 * Dados da empresa usados pelas duas versões do site.
 *
 * ⚠️ PLACEHOLDERS: telefone, e-mail, endereço, redes sociais e números
 * institucionais abaixo são fictícios e existem apenas para preencher o
 * layout. Substitua por informações reais antes de publicar.
 */
export const site = {
  name: "RBS Uniformes",
  legalName: "RBS Uniformes Ltda",
  tagline: "Atendimento Exclusivo a Condomínios",
  /**
   * Endereço público do site (sem barra final). É o host que responde 200 em
   * produção: `rbsuniforme.com.br` (sem www) redireciona para o `www`. Se o
   * domínio principal na Vercel mudar, troque aqui — canônicas, sitemap,
   * robots e dados estruturados seguem esta constante.
   */
  url: "https://www.rbsuniforme.com.br",
  /** Título da home nos resultados de busca e nas abas. */
  title: "RBS Uniformes: Atendimento Exclusivo a Condomínios",
  /** Descrição usada nas meta tags (SEO) e nos compartilhamentos. */
  description:
    "Uniformes para Portaria, Zeladoria e ASG´s, unindo durabilidade, conforto e praticidade em um só uniforme há mais de 30 anos.",
  /** Frase curta exibida abaixo da logo no rodapé. */
  footerText:
    "Empresa especializada no atendimento a condomínios, a única em Belo Horizonte, trazendo comodidade e satisfação aos nossos clientes há mais de 30 anos.",
  /** Slogan exibido logo abaixo do `footerText`, em linha própria. */
  footerSlogan: "“Trabalhamos para quem trabalha”",

  // --- Contato ---
  /** Telefone fixo principal — é o que aparece no menu e no rodapé. */
  phoneDisplay: "(31) 3653-9241",
  /** Mesmo fixo em formato internacional, para o link `tel:`. */
  phoneDigits: "553136539241",
  /** Todos os fixos divulgados. O primeiro é o número padrão acima. */
  phoneNumbers: [
    { display: "(31) 3653-9241", digits: "553136539241" },
    { display: "(31) 3586-0793", digits: "553135860793" },
  ],
  /** WhatsApp padrão (formato internacional, só dígitos) — usado nos links wa.me. */
  whatsapp: "5531999913191",
  /** Todos os WhatsApp divulgados. O primeiro é o número padrão acima. */
  whatsappNumbers: [
    { display: "(31) 99991-3191", digits: "5531999913191" },
    { display: "(31) 99249-6669", digits: "5531992496669" },
  ],
  email: "rbs.uniformes@gmail.com",
  address: {
    street: "Rua Sabará, 350",
    district: "Colégio Batista",
    city: "Belo Horizonte",
    state: "MG",
    /** Vazio esconde a linha do CEP no rodapé. */
    zip: "",
  },
  hours: "Segunda a sábado, das 7h às 19h",

  // --- Redes sociais (PLACEHOLDER) ---
  social: {
    instagram: "https://www.instagram.com/rbsuniformes/",
  },

  // --- Números institucionais (PLACEHOLDER) ---
  stats: [
    { value: "+30", label: "anos de mercado" },
    { value: "+2500", label: "Condomínios Atendidos" },
    { value: "100%", label: "de experiência no ramo" },
  ],
} as const;

/** Monta um link wa.me com mensagem pré-preenchida. */
export function whatsappLink(message: string, number: string = site.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  `Olá! Vim pelo site da ${site.name} e gostaria de solicitar um orçamento de uniformes.`;
