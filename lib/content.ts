import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ClipboardList,
  Clock,
  FileText,
  Handshake,
  Layers,
  Package,
  Palette,
  Ruler,
  Scissors,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

/** Âncoras da home. O "/" na frente mantém os links funcionando nas páginas
 *  de serviço, que não têm essas seções. */
export const navLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Serviços", href: "/#catalogo" },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Visita", href: "/#visita" },
  { label: "Contato", href: "/#contato" },
];

export interface Differential {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const differentials: Differential[] = [
  {
    title: "Tecidos profissionais selecionados",
    description:
      "Tecidos de alta durabilidade e qualidade, conforto e que preservam a cor original por mais tempo.",
    icon: Layers,
  },
  {
    title: "Pontualidade e rapidez na entrega",
    description:
      "Do início da produção até a entrega, mantemos um processo rápido, organizado e dentro do prazo combinado.",
    icon: Clock,
  },
  {
    title: "Acabamento pensado e impecável",
    description:
      "Além do uniforme ser bonito, precisa durar, por isso cada costura tem um propósito e reforços onde é de mais facilidade rasgar.",
    icon: Scissors,
  },
  {
    title: "Modelagem e tamanho",
    description:
      "Veste bem e comporta da forma ideal no corpo, por isso o procedimento de tirar medidas no local. Garantindo mais conforto e praticidade nos movimentos do dia a dia.",
    icon: Ruler,
  },
  {
    title: "Bordados e identidade",
    description:
      "Utilizamos das máquinas de mais alta qualidade e tecnologia para os bordados de nossos clientes. Garantindo e preservando da melhor forma a imagem do condomínio e facilitando a identificação dos colaboradores.",
    icon: Palette,
  },
  {
    title: "Equipes de colaboradores da RBS",
    description:
      "Para tudo isso, contamos com profissionais de muita competência e seriedade com o que fazem. Garantindo profissionalismo, cuidado e dedicação com cada cliente e serviços prestados.",
    icon: Users,
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
    title: "VISITA E COTAÇÃO",
    description:
      "Nosso diferencial é analisarmos o que está sendo solicitado, fazemos a visita sem compromisso para conhecimento dos uniformes solicitados ou apenas fazemos o orçamento das peças solicitadas.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "medição dos colaboradores",
    description:
      "Efetuamos o processo de medidas dos colaboradores no local do condomínio com uma equipe especializada, sem deslocá-los para a loja, trazendo conforto e praticidade.",
    icon: Scissors,
  },
  {
    step: "03",
    title: "CONFECÇÃO DOS UNIFORMES",
    description:
      "Fabricamos os uniformes de acordo com o conversado e firmado na visita ou via WhatsApp, de forma dinâmica, organizada e mantendo o mais alto padrão de qualidade.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "ENTREGA E IDENTIFICAÇÃO",
    description:
      "Fazemos a entrega dos uniformes com entrega própria e gratuita, mantendo livre de qualquer tipo de dano. Os uniformes são embalados com o nome de cada colaborador, junto com a quantidade para melhor identificação.",
    icon: Package,
  },
];

export interface VisitStep {
  /** Rótulo da etapa, ex.: "1ª etapa". */
  step: string;
  title: string;
  /** Um ou mais parágrafos — cada item vira um <p> na seção e no pop-up. */
  paragraphs: string[];
  icon: LucideIcon;
}

/** Textos da seção "O que é a visita?" e do pop-up do hero. */
export const visit = {
  eyebrow: "Visita sem compromisso",
  title: "O que é a visita?",
  intro:
    "A visita é uma etapa de atendimento pensada para entender de perto o que o condomínio precisa e apresentar nossos uniformes de acordo com que vai ser solicitado. Todo o processo é simples, organizado e feito de acordo com a necessidade de cada condomínio.",
  subtitle: "A visita consiste em 4 etapas simples.",
  note: "A visita é gratuita e não gera nenhum compromisso de compra.",
};

export const visitSteps: VisitStep[] = [
  {
    step: "1ª etapa",
    title: "Solicitação da visita",
    paragraphs: [
      "O primeiro passo é simples: o síndico ou responsável pode solicitar o atendimento diretamente pelo nosso site ou pelo WhatsApp. A partir disso, nossa equipe entra em contato para entender melhor a solicitação e alinhar os próximos passos.",
    ],
    icon: CalendarCheck,
  },
  {
    step: "2ª etapa",
    title: "Entendimento da necessidade e demanda",
    paragraphs: [
      "Antes da visita, buscamos compreender o objetivo do atendimento. Pode ser apenas o interesse em conhecer nosso catálogo e nossas opções de uniformes, uma necessidade específica do condomínio ou até mesmo uma demanda já definida para renovação ou aquisição de peças.",
      "Essa etapa nos permite preparar um atendimento mais direcionado, evitando apresentações desnecessárias e tornando a visita mais objetiva.",
    ],
    icon: Target,
  },
  {
    step: "3ª etapa",
    title: "Atendimento no condomínio",
    paragraphs: [
      "Com a autorização e concordância do(a) síndico(a) ou responsável, nossa equipe se desloca até o condomínio para realizar o atendimento presencial.",
      "Durante a visita, apresentamos as opções disponíveis, esclarecemos dúvidas e, quando houver interesse, ajudamos a definir modelos, tecidos, cores e demais detalhes que farão parte do pedido.",
      "O objetivo é que o responsável tenha segurança para avaliar as opções antes de tomar qualquer decisão.",
    ],
    icon: Handshake,
  },
  {
    step: "4ª etapa",
    title: "Cotação e proposta",
    paragraphs: [
      "Caso exista uma demanda definida, reunimos as informações necessárias e elaboramos uma cotação de acordo com o que foi conversado e alinhado durante o atendimento.",
      "A proposta é então enviada para avaliação do condomínio, com as especificações e condições referentes ao pedido.",
      "A visita não representa nenhum compromisso de compra. Ela é uma oportunidade para conhecer nosso trabalho, tirar dúvidas e entender como podemos atender às necessidades do condomínio.",
    ],
    icon: FileText,
  },
];

export const sectors = [
  "PORTARIA",
  "ZELADORIA ",
  "ASG´S ",
  "VIGILÂNCIA ",
  "HIGIENIZAÇÃO",
];

export const faq = [
  {
    question: "QUAL O PRAZO DE ENTREGA DOS UNIFORMES?",
    answer:
      "O prazo é estipulado junto à cotação, tendo em vista a demanda e a quantidade solicitada, não depende de nenhum tipo de terceiros pois a entrega somos nós da RBS que efetuamos.",
  },
  {
    question: "CONSIGO COMPRAR A MESMA COR NA PRÓXIMA NECESSIDADE?",
    answer:
      "Todos os tecidos que utilizamos tem uma garantia de até 5 anos após última compra, resumindo, nossos clientes têm até 5 anos para comprar a mesma cor solicitada anteriormente uma vez.",
  },
  {
    question: "A VISITA É COBRADA JUNTO DA COTAÇÃO?",
    answer:
      "De forma alguma! A visita é gratuita e com o intuito de conhecer nossos uniformes. Nossos valores são justificados no serviço prestado e ainda sim oferecemos o melhor do mercado para nossos clientes.",
  },
  {
    question: "COMO FUNCIONA O PROCEDIMENTO DE MEDIDAS?",
    answer:
      "Tiramos as medidas de cada funcionário individualmente no local do condomínio, também sem custos, e na troca de plantão de cada funcionário.",
  },
  {
    question: "VOCÊS ATENDEM QUAIS CIDADES?",
    answer:
      "Atendemos a toda Belo Horizonte e região metropolitana.",
  },
  {
    question: "QUAL O VALOR MÍNIMO PARA O PEDIDO?",
    answer:
      "Não trabalhamos com pedido mínimo, é possível pedir em toda e qualquer valor e quantidade.",
  },
  {
    question: "O BORDADO É INCLUSO NO VALOR?",
    answer:
      "Sim, os bordados são inclusos no valor de cada item que pode ser bordado.",
  },
  {
    question: "QUAIS AS CONDIÇÕES DE PAGAMENTO E DESCONTOS?",
    answer:
      "Nossas condições de pagamento variam do valor total da cotação e com o desconto é o mesmo, quanto maior o pedido, maior o desconto que pode ser aplicável.",
  },
];

export const about = {
  eyebrow: "Sobre a RBS Uniformes",
  title:
    "Planejamento, compromisso e dedicação, são os pilares da nossa empresa.",
  paragraphs: [
    "Mediante pesquisa de mercado, nós da RBS percebemos que os condomínios enfrentam grande dificuldade em encontrar empresas de uniformes que ofereçam um atendimento presencial, exclusivo e prático.",
    "A partir dessas informações, criamos a RBS Uniformes, oferecendo diversos serviços em um só lugar. Realizamos visitas para apresentar nossa linha completa de produtos, sem custo de deslocamento, além de realizar a retirada das medidas de cada colaborador diretamente no condomínio e de acordo com seus respectivos turnos — porteiros, zeladores, recepcionistas e ASGs.",
    "Dessa forma, proporcionamos mais praticidade, economia de tempo e redução de custos para nossos clientes.",
    "Vale salientar que não há necessidade de os colaboradores se deslocarem até nossa empresa, como é comum no nosso ramo. Todo o processo pode ser realizado de forma prática e organizada diretamente no condomínio.",
    "Esta é apenas uma demonstração de como trabalhamos, com excelência, experiência e conhecimento especializado no atendimento a condomínios.",
    "Conosco, você encontrará uma solução completa em uniformes, com produtos para as mais diversas áreas e necessidades do seu condomínio.",
  ],
  /** Bloco visual ao lado do texto: foto da produção com a chamada por cima. */
  showcase: {
    photo: "/sobreRBS.jpeg",
    alt: "Bordadeira industrial da RBS Uniformes bordando peças em produção",
    headline: "Há décadas facilitando a gestão de uniformes.",
    title:
      "Nossos uniformes utilizam dos melhores equipamentos, de mais alta tecnologia.",
    items: [
      "Qualidade garantida em bordados e silks.",
      "Tecidos selecionados de grande duração.",
      "Produtos de marcas renomadas do mercado nacional.",
    ],
  },
};
