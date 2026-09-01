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

/**
 * Silhuetas que o mockup vetorial (`components/decor/UniformMockup.tsx`) sabe
 * desenhar. Para oferecer uma peça nova, acrescente o estilo aqui e o desenho
 * correspondente lá.
 */
export type UniformStyle =
  | "social"
  | "social-feminina"
  | "polo"
  | "tshirt"
  | "calca"
  | "calca-feminina"
  | "jaqueta"
  | "sapato"
  | "meia"
  | "gravata"
  | "cinto"
  | "bone"
  | "bota";

/** Um modelo dentro da linha — muda o desenho exibido no visualizador. */
export interface UniformModel {
  name: string;
  description: string;
  /** Silhueta usada no mockup. */
  style: UniformStyle;
  /**
   * Foto do modelo, em `public/`. Enquanto o arquivo não existir a página cai
   * de volta no mockup desenhado (`UniformMockup`) — veja `resolveModelPhotos`.
   */
  photo: string;
  /**
   * Cartela própria da peça, quando ela não sai em todas as cores da linha —
   * calçado e cinto, por exemplo, só existem em preto e marrom. Sem isso, vale
   * a cartela da linha (`Service.colors`).
   */
  colors?: UniformColor[];
}

/**
 * Modelo já preparado para exibição. `photo` vira `null` quando o arquivo ainda
 * não foi colocado em `public/` — nesse caso o visualizador desenha o mockup.
 */
export type ShowcaseModel = Omit<UniformModel, "photo"> & { photo: string | null };

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
  /**
   * Cartela padrão da linha — vale para todo modelo que não declara a sua.
   * Alimenta o seletor de cores do visualizador.
   */
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
const marrom = { name: "Marrom", body: "#4A3324", accent: "#2C1E14" };
const branco = { name: "Branco", body: "#F1F0EC", accent: "#C9C6BC" };

export const services: Service[] = [
  {
    slug: "portaria",
    title: "Portaria",
    shortDescription:
      "A uniformização da portaria é essencial para agregar mais valor á imagem do seu condomínio, e um uniforme alinhado e resistente faz toda a diferença para passar uma boa impressão na hora.",
    icon: DoorOpen,

    eyebrow: "Linha Portaria",
    headline: "O porteiro é o cartão de visita do condomínio",
    intro:
      "Quem chega ao condomínio vê a portaria antes de ver qualquer outra coisa. A linha Portaria da RBS é pensada para isso: tecido que segura o caimento no plantão de 12 horas, cor que não desbota na lavagem semanal e um acabamento que passa autoridade sem parecer engessado.",
    quickFacts: [
      "Kit completo: da camisa ao cinto, sem precisar de outro fornecedor",
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
      "Camisa social masculina e feminina",
      "Calça social masculina e feminina",
      "Jaqueta para o turno da noite",
      "Calçado social masculino e feminino",
      "Meia social",
      "Gravata",
      "Cinto",
    ],
    models: [
      {
        name: "Camisa social masculina",
        description:
          "O clássico da portaria: tecido misto com toque macio, punho abotoado, bolso no peito e caimento reto. Sai em manga longa ou curta.",
        style: "social",
        photo: "/produtos/portaria-camisa-social-masculina.webp",
      },
      {
        name: "Camisa social feminina",
        description:
          "Mesmo tecido e mesma cartela da masculina, em modelagem própria: pences na cintura, cava mais alta e decote acabado. Manga longa ou curta.",
        style: "social-feminina",
        photo: "/produtos/portaria-camisa-social-feminina.webp",
      },
      {
        name: "Calça social masculina",
        description:
          "Corte reto com vinco, cós com passantes e bolsos embutidos. Tecido que segura o caimento no plantão de 12 horas.",
        style: "calca",
        photo: "/produtos/portaria-calca-social-masculina.webp",
        colors: [marinho, preto, grafite],
      },
      {
        name: "Calça social feminina",
        description:
          "Cós ajustado ao quadril e perna levemente afunilada, no mesmo tecido da masculina — o conjunto da equipe fica idêntico.",
        style: "calca-feminina",
        photo: "/produtos/portaria-calca-social-feminina.webp",
        colors: [marinho, preto, grafite],
      },
      {
        name: "Jaqueta",
        description:
          "Para o turno da noite e o posto externo: fechamento em zíper, gola alta, punho e barra em ribana. Aceita o brasão bordado no peito.",
        style: "jaqueta",
        photo: "/produtos/portaria-jaqueta.webp",
        colors: [marinho, preto, grafite, bordo],
      },
      {
        name: "Calçado social",
        description:
          "Solado antiderrapante e palmilha acolchoada para quem passa o turno em pé, com acabamento de sapato social. Numeração masculina e feminina.",
        style: "sapato",
        photo: "/produtos/portaria-calcado-social.webp",
        colors: [preto, marrom],
      },
      {
        name: "Meia social",
        description:
          "Meia de cano alto em algodão com punho que não marca a perna, com reforço no calcanhar e na ponta. Vai no kit para o visual fechar até embaixo.",
        style: "meia",
        photo: "/produtos/portaria-meia-social.webp",
        colors: [preto, marinho, grafite, branco],
      },
      {
        name: "Gravata",
        description:
          "Gravata em tecido que não amassa, lisa ou com listra na cor do condomínio. Também sai na versão com nó pronto e elástico, mais prática na troca de turno.",
        style: "gravata",
        photo: "/produtos/portaria-gravata.webp",
        colors: [marinho, preto, bordo, grafite],
      },
      {
        name: "Cinto",
        description:
          "Cinto social com fivela discreta, na largura certa para os passantes da calça — combina com o calçado e fecha a padronização do uniforme.",
        style: "cinto",
        photo: "/produtos/portaria-cinto.webp",
        colors: [preto, marrom],
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
      "Uniformes de alta resistência e confortável é mais que o essencial para alguém que zela pelo condomínio, pensado em quem e nas condições que vai ser utilizado. Um uniforme coringa para quem atua em várias áreas do prédio.",
    icon: Wrench,

    eyebrow: "Linha Zeladoria",
    headline: "O uniforme que aguenta o dia inteiro de zeladoria",
    intro:
      "Zelador não fica parado: sobe escada, mexe em bomba d'água, recebe fornecedor e ainda atende morador. A linha Zeladoria usa tecidos de trama fechada e reforço nos pontos de maior atrito, para a peça durar o contrato inteiro e continuar apresentável na área comum.",
    quickFacts: [
      "Kit completo: do jaleco à bota, sem precisar de outro fornecedor",
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
      "Jaleco com 3 bolsos",
      "Camisa em malha",
      "Calça com elástico",
      "Jaqueta de trabalho",
      "Bota em couro",
      "Boné",
    ],
    models: [
      {
        name: "Jaleco com 3 bolsos",
        description:
          "Três bolsos dimensionados para ferramenta, rádio e caneta, com botões reforçados. Protege a roupa no serviço sujo e sai do corpo em um segundo para atender morador.",
        style: "social",
        photo: "/produtos/zeladoria-jaleco-3-bolsos.webp",
        colors: [branco, cinzaClaro, royal, marinho],
      },
      {
        name: "Camisa em malha",
        description:
          "Malha penteada que respira no serviço pesado, com gola reforçada que não enrola na lavagem. É a peça mais usada no dia a dia da zeladoria.",
        style: "tshirt",
        photo: "/produtos/zeladoria-camisa-malha.webp",
      },
      {
        name: "Calça com elástico",
        description:
          "Cós com elástico e cordão: veste rápido, não aperta ao agachar e dispensa ajuste de cinto. Reforço no joelho e no fundo, onde a calça rasga primeiro.",
        style: "calca",
        photo: "/produtos/zeladoria-calca-elastico.webp",
        colors: [marinho, grafite, preto, royal],
      },
      {
        name: "Jaqueta",
        description:
          "Para o serviço externo e o começo da manhã: fechamento em zíper, punho e barra em ribana e bolsos na altura da cintura.",
        style: "jaqueta",
        photo: "/produtos/zeladoria-jaqueta.webp",
        colors: [marinho, grafite, royal, preto],
      },
      {
        name: "Bota em couro",
        description:
          "Couro com solado antiderrapante e bico reforçado, para quem sobe escada, mexe em bomba d'água e circula em área molhada. Numeração masculina e feminina.",
        style: "bota",
        photo: "/produtos/zeladoria-bota-couro.webp",
        colors: [preto, marrom],
      },
      {
        name: "Boné",
        description:
          "Boné em brim com aba estruturada e regulagem atrás, para o serviço no sol. Recebe o bordado do condomínio na frente.",
        style: "bone",
        photo: "/produtos/zeladoria-bone.webp",
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
      "Pensado para quem trabalha com produtos de limpeza, água e mais. Trabalhamos com tecidos leves e próprios para prevenir manchas, secagem rápida e conforto. Tudo em um só uniforme.",
    icon: SprayCan,

    eyebrow: "Linha ASG",
    headline: "Limpeza pesada, uniforme leve",
    intro:
      "A equipe de serviços gerais lava, varre, encera e ainda encara produto químico todo dia. A linha ASG prioriza tecido leve com secagem rápida, modelagem que permite agachar e esticar sem repuxar, e cores escolhidas para disfarçar o desgaste natural do trabalho.",
    quickFacts: [
      "Kit completo: da camisa ao calçado, sem precisar de outro fornecedor",
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
      "Camisa em malha",
      "Jaleco com 3 bolsos",
      "Jaqueta",
      "Calça com elástico",
      "Calçado antiderrapante",
      "Bota impermeável",
    ],
    models: [
      {
        name: "Camisa em malha",
        description:
          "Malha leve com secagem rápida e gola reforçada. Modelagem ampla para agachar e alcançar sem repuxar — é a peça mais usada no dia a dia da equipe.",
        style: "tshirt",
        photo: "/produtos/asg-camisa-malha.webp",
      },
      {
        name: "Jaleco com 3 bolsos",
        description:
          "Três bolsos para pano, borrifador e celular, em tecido que segura o respingo de produto de limpeza. Protege a roupa e sai do corpo em um segundo.",
        style: "social",
        photo: "/produtos/asg-jaleco-3-bolsos.webp",
        colors: [branco, cinzaClaro, royal, marinho],
      },
      {
        name: "Jaqueta",
        description:
          "Para a limpeza de área externa e o começo da manhã: fechamento em zíper, punho e barra em ribana e bolsos na altura da cintura.",
        style: "jaqueta",
        photo: "/produtos/asg-jaqueta.webp",
        colors: [marinho, grafite, royal, preto],
      },
      {
        name: "Calça com elástico",
        description:
          "Cós com elástico e cordão: veste rápido, não aperta ao agachar e dispensa cinto. Tecido leve que seca depressa para quem trabalha perto d'água.",
        style: "calca",
        photo: "/produtos/asg-calca-elastico.webp",
        colors: [marinho, grafite, preto, royal],
      },
      {
        name: "Calçado antiderrapante",
        description:
          "Solado com aderência em piso molhado e ensaboado, fechado na frente para conter respingo de produto. Numeração masculina e feminina.",
        style: "sapato",
        photo: "/produtos/asg-calcado-antiderrapante.webp",
        colors: [preto, branco],
      },
      {
        name: "Bota impermeável",
        description:
          "Cano alto e material impermeável para lavagem de garagem, escada e área comum — o pé fica seco no turno inteiro, com o mesmo solado antiderrapante.",
        style: "bota",
        photo: "/produtos/asg-bota-impermeavel.webp",
        colors: [preto, branco, verdeBandeira],
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
