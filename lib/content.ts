import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ChefHat,
  ClipboardList,
  Clock,
  Factory,
  GraduationCap,
  HardHat,
  Headset,
  Layers,
  Package,
  Palette,
  Ruler,
  Scissors,
  Shirt,
  ShieldCheck,
  Stethoscope,
  Briefcase,
} from "lucide-react";

export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

export interface Category {
  slug: string;
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
}

export const categories: Category[] = [
  {
    slug: "corporativos",
    title: "Uniformes Corporativos",
    description:
      "Peças que traduzem a identidade da sua marca no atendimento, no escritório e no ponto de venda.",
    items: ["Camisas sociais", "Polos", "Blazers e coletes", "Saias e calças"],
    icon: Briefcase,
  },
  {
    slug: "industriais",
    title: "Uniformes Industriais",
    description:
      "Resistência para o chão de fábrica, com tecidos técnicos e conformidade com as normas de segurança.",
    items: ["Macacões", "Calças de brim", "Camisas NR", "Jaquetas e coletes"],
    icon: HardHat,
  },
  {
    slug: "hospitalares",
    title: "Uniformes Hospitalares",
    description:
      "Conforto para longos plantões e tecidos que suportam lavagem industrial sem perder a cor.",
    items: ["Scrubs", "Jalecos", "Pijamas cirúrgicos", "Aventais"],
    icon: Stethoscope,
  },
  {
    slug: "escolares",
    title: "Uniformes Escolares",
    description:
      "Kits completos para instituições de ensino, com malharia durável e reposição garantida no ano letivo.",
    items: ["Camisetas", "Agasalhos", "Shorts e bermudas", "Mochilas"],
    icon: GraduationCap,
  },
  {
    slug: "gastronomia",
    title: "Gastronomia e Hotelaria",
    description:
      "Uniformes de cozinha e serviço pensados para ambientes quentes e rotinas de alto giro.",
    items: ["Dólmãs", "Aventais", "Chapéus e bandanas", "Camisas de salão"],
    icon: ChefHat,
  },
  {
    slug: "promocionais",
    title: "Esportivos e Promocionais",
    description:
      "Linhas para eventos, campanhas internas e times, com personalização total em tempo reduzido.",
    items: ["Camisetas de evento", "Abadás", "Jerseys esportivos", "Bonés"],
    icon: Shirt,
  },
];

export interface Differential {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const differentials: Differential[] = [
  {
    title: "Atendimento personalizado",
    description:
      "Um consultor acompanha o pedido do briefing à reposição — sem central de atendimento, sem retrabalho.",
    icon: Headset,
  },
  {
    title: "Tecidos de alta qualidade",
    description:
      "Trabalhamos com fornecedores homologados e testamos encolhimento, solidez de cor e resistência antes de produzir.",
    icon: Layers,
  },
  {
    title: "Pontualidade na entrega",
    description:
      "Cronograma acordado por escrito e produção acompanhada por etapas, com status enviado ao cliente.",
    icon: Clock,
  },
  {
    title: "Modelagem sob medida",
    description:
      "Grade completa, modelagens masculina, feminina e plus size, com peça piloto aprovada antes da produção.",
    icon: Ruler,
  },
  {
    title: "Personalização completa",
    description:
      "Bordado computadorizado, silkscreen, transfer e etiquetas personalizadas feitos internamente.",
    icon: Palette,
  },
  {
    title: "Capacidade para grandes volumes",
    description:
      "Estrutura preparada para pedidos recorrentes e contratos de longo prazo, com estoque de reposição.",
    icon: Factory,
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Briefing e orçamento",
    description:
      "Entendemos a operação, o ambiente de uso e a identidade da marca para indicar tecido e modelagem.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Modelagem e piloto",
    description:
      "Desenvolvemos a peça piloto e ajustamos a grade de tamanhos até a aprovação formal do cliente.",
    icon: Scissors,
  },
  {
    step: "03",
    title: "Produção e controle",
    description:
      "Corte, costura e personalização com conferência de qualidade peça a peça antes da embalagem.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Entrega e reposição",
    description:
      "Entrega separada por colaborador ou por unidade, com programa de reposição contínua.",
    icon: Package,
  },
];

export const sectors = [
  "Indústria",
  "Saúde",
  "Educação",
  "Varejo",
  "Logística",
  "Alimentação",
  "Construção civil",
  "Serviços",
  "Hotelaria",
  "Automotivo",
];

export const faq = [
  {
    question: "Qual é a quantidade mínima por pedido?",
    answer:
      "O mínimo varia conforme a linha e o tipo de personalização. Peças de malha costumam ter mínimos menores que peças de alfaiataria. Envie a sua necessidade que retornamos com a viabilidade e o orçamento.",
  },
  {
    question: "Qual é o prazo de produção?",
    answer:
      "O prazo é definido junto com o orçamento, considerando volume, tecido e tipo de personalização. Ele é registrado em contrato e acompanhado por etapas até a entrega.",
  },
  {
    question: "É possível criar um modelo exclusivo para a minha empresa?",
    answer:
      "Sim. Desenvolvemos modelagem exclusiva a partir da identidade visual da marca, incluindo escolha de tecido, cores, recortes e etiqueta personalizada.",
  },
  {
    question: "Vocês fazem peça piloto antes da produção?",
    answer:
      "Sim. A peça piloto é produzida e aprovada pelo cliente antes de liberarmos a produção em escala — é o que garante o caimento correto de toda a grade.",
  },
  {
    question: "Vocês atendem outras cidades e estados?",
    answer:
      "Atendemos empresas em todo o Brasil, com envio por transportadora ou correio e a possibilidade de entrega separada por unidade.",
  },
  {
    question: "Como funciona a reposição de peças?",
    answer:
      "Mantemos a ficha técnica e a modelagem do cliente registradas, o que permite repor peças ao longo do contrato com o mesmo padrão do pedido original.",
  },
];

export const about = {
  eyebrow: "Sobre a RBS Uniformes",
  title: "Uniforme é a primeira impressão que a sua empresa causa",
  paragraphs: [
    "A RBS Uniformes nasceu para resolver um problema comum: uniformes que desbotam, encolhem e não voltam a tempo. Cuidamos de todas as etapas — desenvolvimento, modelagem, corte, costura e personalização — para que a peça entregue seja exatamente a peça aprovada.",
    "Trabalhamos com tecidos homologados e controle de qualidade em cada lote, atendendo indústrias, hospitais, escolas, redes de varejo e empresas de serviços. Do primeiro pedido à reposição do quinto ano de contrato, o padrão é o mesmo.",
  ],
  bullets: [
    "Ficha técnica e modelagem arquivadas para reposição idêntica",
    "Controle de qualidade peça a peça antes da expedição",
    "Consultor dedicado do briefing ao pós-venda",
  ],
};
