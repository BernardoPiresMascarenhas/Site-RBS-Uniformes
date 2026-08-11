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
  tagline: "Uniformes de alta qualidade e confecção própria",
  description:
    "Confecção de uniformes corporativos, industriais, hospitalares e escolares com tecidos de alta performance, modelagem sob medida e entrega no prazo.",

  // --- Contato ---
  /** Telefone fixo. */
  phoneDisplay: "(31) 3653-9241",
  /** Mesmo fixo em formato internacional, para o link `tel:`. */
  phoneDigits: "553136539241",
  /** WhatsApp padrão (formato internacional, só dígitos) — usado nos links wa.me. */
  whatsapp: "5531999913191",
  /** Todos os WhatsApp divulgados. O primeiro é o número padrão acima. */
  whatsappNumbers: [
    { display: "(31) 99991-3191", digits: "5531999913191" },
    { display: "(31) 9 9249-6669", digits: "5531992496669" },
  ],
  email: "rbs.uniformes@gmail.com",
  address: {
    street: "Rua Exemplo, 000 — Sala 00",
    district: "Centro",
    city: "Belo Horizonte",
    state: "MG",
    zip: "00000-000",
  },
  hours: "Segunda a sábado, das 7h às 19h",

  // --- Redes sociais (PLACEHOLDER) ---
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
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
