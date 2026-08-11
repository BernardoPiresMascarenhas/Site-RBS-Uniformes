import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BellRing,
  Brush,
  ClipboardCheck,
  DoorOpen,
  Droplets,
  HardHat,
  KeyRound,
  PackageCheck,
  Palette,
  Ruler,
  Shirt,
  Sparkles,
  SprayCan,
  Thermometer,
  UserRoundCheck,
  Wind,
  Wrench,
} from "lucide-react";

/**
 * Os três serviços atendidos pela RBS. Cada um vira um card no catálogo da home
 * e uma página de venda própria em /servicos/[slug].
 *
 * ⚠️ CONTEÚDO EDITÁVEL: todo o texto das páginas de serviço mora aqui. Para
 * ajustar modelos, cores, peças ou benefícios de uma linha, mexa apenas neste
 * arquivo — nenhuma alteração de layout é necessária.
 */

/** Uma opção de cor do mockup. `body` pinta o corpo, `accent` gola e detalhes. */
export interface UniformColor {
  name: string;
  body: string;
  accent: string;
}

/** Um modelo dentro da linha — muda o desenho exibido no visualizador. */
export interface UniformModel {
  name: string;
  description: string;
  /** Silhueta usada no mockup. */
  style: "social" | "polo" | "tshirt";
}

export interface ServiceHighlight {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Service {
  slug: string;
  /** Nome curto, usado em cards, menus e no seletor do formulário. */
  title: string;
  /** Frase de apoio do card na home. */
  shortDescription: string;
  icon: LucideIcon;

  /** ---- Página de venda ---- */
  eyebrow: string;
  headline: string;
  intro: string;
  /** Bullets rápidos abaixo do título da página. */
  quickFacts: string[];
  highlights: ServiceHighlight[];
  /** Peças que costumam compor o kit da função. */
  pieces: string[];
  /** Modelos oferecidos — alimentam o seletor do visualizador. */
  models: UniformModel[];
  /** Cores disponíveis — alimentam o seletor do visualizador. */
  colors: UniformColor[];
  /** Personalizações possíveis (bordado, silk, etiqueta...). */
  customizations: string[];
}

/* Paleta de apoio: tons reaproveitados entre as linhas. */
const marinho = { name: "Azul marinho", body: "#1B2A45", accent: "#101A2C" };
const preto = { name: "Preto", body: "#171717", accent: "#0A0A0A" };
const grafite = { name: "Cinza grafite", body: "#3F444B", accent: "#2A2E33" };
const bordo = { name: "Bordô", body: "#5C1A22", accent: "#3D1116" };
const royal = { name: "Azul royal", body: "#1D4ED8", accent: "#153BA6" };
const verdeBandeira = { name: "Verde bandeira", body: "#0A7A44", accent: "#04502C" };
const cinzaClaro = { name: "Cinza claro", body: "#9AA1A9", accent: "#6E757D" };
const bege = { name: "Bege", body: "#B9A88C", accent: "#8E7F66" };
const branco = { name: "Branco", body: "#F1F0EC", accent: "#C9C6BC" };

export const services: Service[] = [
  {
    slug: "portaria",
    title: "Portaria",
    shortDescription:
      "O uniforme que recebe morador e visitante. Alfaiataria leve, caimento impecável e apresentação de primeira em todos os turnos.",
    icon: DoorOpen,

    eyebrow: "Linha Portaria",
    headline: "O porteiro é o cartão de visita do condomínio",
    intro:
      "Quem chega ao condomínio vê a portaria antes de ver qualquer outra coisa. A linha Portaria da RBS é pensada para isso: tecido que segura o caimento no plantão de 12 horas, cor que não desbota na lavagem semanal e um acabamento que passa autoridade sem parecer engessado.",
    quickFacts: [
      "Modelagem masculina, feminina e plus size",
      "Tecidos que aceitam lavagem frequente sem desbotar",
      "Bordado do brasão do condomínio incluso",
    ],
    highlights: [
      {
        title: "Apresentação impecável",
        description:
          "Tecido com toque de alfaiataria e baixo amarrotamento: o porteiro termina o turno com a mesma aparência com que começou.",
        icon: UserRoundCheck,
      },
      {
        title: "Conforto no plantão de 12h",
        description:
          "Malhas e tecidos com respirabilidade e elastano na medida certa, para quem passa o dia entre a guarita e a rua.",
        icon: Wind,
      },
      {
        title: "Identidade do condomínio",
        description:
          "Brasão bordado, cores do empreendimento e crachá padronizado — o morador reconhece a equipe de longe.",
        icon: BadgeCheck,
      },
      {
        title: "Reposição sem dor de cabeça",
        description:
          "Guardamos a ficha técnica e a grade de tamanhos: a peça de reposição sai idêntica à primeira, anos depois.",
        icon: PackageCheck,
      },
    ],
    pieces: [
      "Camisa social manga longa ou curta",
      "Calça social ou de brim leve",
      "Colete ou blazer institucional",
      "Gravata e acessórios",
      "Jaqueta para o turno da noite",
    ],
    models: [
      {
        name: "Camisa social manga longa",
        description:
          "O clássico da portaria: tecido misto com toque macio, punho abotoado e caimento reto.",
        style: "social",
      },
      {
        name: "Camisa social manga curta",
        description: "Mesma alfaiataria, pensada para o verão e para guaritas sem climatização.",
        style: "social",
      },
      {
        name: "Polo institucional",
        description:
          "Piquê de alta gramatura para portarias com dress code mais leve, sem perder a formalidade.",
        style: "polo",
      },
    ],
    colors: [marinho, preto, grafite, bordo, branco],
    customizations: [
      "Bordado computadorizado do brasão no peito",
      "Nome do colaborador bordado ou em etiqueta removível",
      "Vivos e recortes nas cores do condomínio",
      "Etiqueta interna personalizada com o nome do empreendimento",
    ],
  },
  {
    slug: "zeladoria",
    title: "Zeladoria",
    shortDescription:
      "Resistência para quem circula o dia inteiro entre garagem, casa de máquinas e área comum — sem perder a aparência de equipe.",
    icon: Wrench,

    eyebrow: "Linha Zeladoria",
    headline: "O uniforme que aguenta o dia inteiro de zeladoria",
    intro:
      "Zelador não fica parado: sobe escada, mexe em bomba d'água, recebe fornecedor e ainda atende morador. A linha Zeladoria usa tecidos de trama fechada e reforço nos pontos de maior atrito, para a peça durar o contrato inteiro e continuar apresentável na área comum.",
    quickFacts: [
      "Brim e sarja de alta gramatura com reforço nas costuras",
      "Bolsos dimensionados para ferramenta e rádio",
      "Faixas refletivas opcionais para serviço noturno",
    ],
    highlights: [
      {
        title: "Feito para o desgaste",
        description:
          "Costura reforçada nos ombros, entrepernas e bolsos — os três pontos que rasgam primeiro no uso pesado.",
        icon: HardHat,
      },
      {
        title: "Bolsos que resolvem",
        description:
          "Porta-ferramentas, bolso para rádio e passante de chaves posicionados para o trabalho de verdade, não para a foto.",
        icon: KeyRound,
      },
      {
        title: "Cor que não abre",
        description:
          "Tecidos com solidez de cor testada: mesmo com lavagem pesada e sol, o azul continua azul.",
        icon: Droplets,
      },
      {
        title: "Visual de equipe",
        description:
          "Mesmo sendo peça de trabalho, mantém o padrão visual da portaria — o condomínio inteiro fala a mesma língua.",
        icon: Sparkles,
      },
    ],
    pieces: [
      "Camisa de brim manga longa ou curta",
      "Calça de brim com reforço",
      "Polo em piquê para o dia a dia",
      "Jaqueta ou colete de trabalho",
      "Boné e acessórios",
    ],
    models: [
      {
        name: "Camisa de brim manga longa",
        description:
          "Brim leve com botões reforçados e bolso com aba — proteção sem esquentar demais.",
        style: "social",
      },
      {
        name: "Polo piquê reforçada",
        description:
          "Piquê de alta gramatura com gola que não enrola, ideal para quem alterna serviço e atendimento.",
        style: "polo",
      },
      {
        name: "Camiseta em malha",
        description: "Malha penteada para os serviços mais pesados e para o segundo uniforme do dia.",
        style: "tshirt",
      },
    ],
    colors: [royal, grafite, verdeBandeira, marinho, bege],
    customizations: [
      "Silk ou bordado com a função nas costas",
      "Faixa refletiva no peito e nas costas",
      "Bolso extra para ferramenta ou rádio",
      "Peça piloto aprovada antes da produção da grade",
    ],
  },
  {
    slug: "asg",
    title: "Auxiliar de Serviços Gerais (ASG)",
    shortDescription:
      "Conforto e higiene para a equipe de limpeza: tecidos leves, secagem rápida e cor que aguenta produto químico.",
    icon: SprayCan,

    eyebrow: "Linha ASG",
    headline: "Limpeza pesada, uniforme leve",
    intro:
      "A equipe de serviços gerais lava, varre, encera e ainda encara produto químico todo dia. A linha ASG prioriza tecido leve com secagem rápida, modelagem que permite agachar e esticar sem repuxar, e cores escolhidas para disfarçar o desgaste natural do trabalho.",
    quickFacts: [
      "Malha leve com secagem rápida",
      "Modelagem ampla, pensada para agachar e alcançar",
      "Cores testadas contra respingo de produto de limpeza",
    ],
    highlights: [
      {
        title: "Leveza o dia inteiro",
        description:
          "Gramatura pensada para quem trabalha em movimento: a peça não pesa nem gruda depois de duas horas de serviço.",
        icon: Wind,
      },
      {
        title: "Secagem rápida",
        description:
          "Tecidos que soltam a umidade depressa — essencial para quem lava área comum e trabalha perto d'água.",
        icon: Droplets,
      },
      {
        title: "Resistência ao produto",
        description:
          "Cores selecionadas para segurar o contato com produto de limpeza sem manchar de forma visível.",
        icon: Thermometer,
      },
      {
        title: "Higiene e troca",
        description:
          "Kits com peças suficientes para o rodízio de lavagem: sempre há uniforme limpo para o próximo turno.",
        icon: Brush,
      },
    ],
    pieces: [
      "Camiseta ou polo em malha",
      "Calça em brim leve ou tactel",
      "Avental de proteção",
      "Jaleco para serviços internos",
      "Boné e touca",
    ],
    models: [
      {
        name: "Camiseta em malha",
        description:
          "Malha penteada com gola reforçada — a peça mais usada no dia a dia da equipe de limpeza.",
        style: "tshirt",
      },
      {
        name: "Polo piquê",
        description: "Um degrau acima na apresentação, para a equipe que circula em área social.",
        style: "polo",
      },
      {
        name: "Conjunto em brim leve",
        description: "Camisa e calça combinando, para serviços externos e limpeza pesada.",
        style: "social",
      },
    ],
    colors: [cinzaClaro, royal, verdeBandeira, branco, grafite],
    customizations: [
      "Silk do nome do condomínio no peito e nas costas",
      "Identificação da função em cor contrastante",
      "Avental combinando com a cor da camiseta",
      "Kit com quantidade definida por colaborador",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

/** Caminho da página de venda de um serviço. */
export function servicePath(slug: string) {
  return `/servicos/${slug}`;
}

/* Ícones auxiliares reexportados para as seções que montam listas próprias. */
export const serviceListIcons = {
  pieces: Shirt,
  customizations: Palette,
  fit: Ruler,
  checklist: ClipboardCheck,
  alert: BellRing,
} satisfies Record<string, LucideIcon>;
