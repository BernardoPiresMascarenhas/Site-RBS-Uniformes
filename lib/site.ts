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
  tagline: "Uniformes profissionais sob medida para a sua empresa",
  description:
    "Confecção de uniformes corporativos, industriais, hospitalares e escolares com tecidos de alta performance, modelagem sob medida e entrega no prazo.",

  // --- Contato (PLACEHOLDER) ---
  phoneDisplay: "(11) 90000-0000",
  /** Formato internacional, somente dígitos — usado nos links wa.me. */
  whatsapp: "5511900000000",
  email: "contato@rbsuniformes.com.br",
  address: {
    street: "Rua Exemplo, 000 — Sala 00",
    district: "Centro",
    city: "São Paulo",
    state: "SP",
    zip: "00000-000",
  },
  hours: "Segunda a sexta, das 8h às 18h",

  // --- Redes sociais (PLACEHOLDER) ---
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
  },

  // --- Números institucionais (PLACEHOLDER) ---
  stats: [
    { value: "+15", label: "anos de mercado" },
    { value: "+500", label: "empresas atendidas" },
    { value: "+200 mil", label: "peças produzidas por ano" },
    { value: "100%", label: "das peças conferidas" },
  ],
} as const;

/** Monta um link wa.me com mensagem pré-preenchida. */
export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  `Olá! Vim pelo site da ${site.name} e gostaria de solicitar um orçamento de uniformes.`;
