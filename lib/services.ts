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

/** Modelo com foto confirmada em `public/` — o único que a página de serviço exibe. */
export type PhotoModel = Omit<UniformModel, "photo"> & { photo: string };

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
  /**
   * Foto de capa do card no catálogo da home, em `public/`. Sem ela, a capa
   * continua sendo a foto do primeiro modelo da linha — e, na falta das duas,
   * o mockup desenhado. Veja `resolveCover`.
   */
  cover?: string;

  /** ---- Página de venda ---- */
  eyebrow: string;
  headline: string;
  intro: string;
  /** Frase de fecho do intro, exibida em destaque na própria linha. */
  introClosing?: string;
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
    cover: "/produtos/portaria-camisa-social-masculina.png",

    eyebrow: "Linha Portaria",
    headline: "O porteiro é o cartão de visita do condomínio",
    intro:
      "Os uniformes da portaria são os que devem permanecer bem apresentáveis e ser de grande duração. Temos tecidos variados para camisaria, calçados em couro legítimo, calças sociais e jeans, jaquetas, cintos, gravatas e meias.",
    introClosing: "Vista seus porteiros dos pés à cabeça.",
    quickFacts: [
      "Modelos masculinos, femininos, tamanhos plus size e sob medida.",
      "Tecidos resistentes e de maior dificuldade para desbotar.",
      "Bordados de alta qualidade inclusos no valor das camisas e jaquetas. (Se não quiser incluir o bordado, adicione uma observação.)",
    ],
    highlights: [
      {
        title: "Apresentação",
        description:
          "Uniforme alinhado e padronizado, fácil de passar, não amarrota, alta durabilidade. Mantém os colaboradores bem apresentados durante todo o expediente.",
        icon: UserRoundCheck,
      },
      {
        title: "Durabilidade e Conforto",
        description:
          "Tecidos resistentes, não vão rasgar facilmente, confortáveis, leves e de fácil transpiração, para dias frios e dias quentes, ambientes refrigerados ou ventilação natural.",
        icon: Wind,
      },
      {
        title: "Identificação do Funcionário e Condomínio.",
        description:
          "Bordados de alta qualidade, personalizamos para você um novo modelo de bordado e também copiar e até melhorar o atual bordado utilizado.",
        icon: BadgeCheck,
      },
      {
        title: "Reposição de tecido e cor garantida.",
        description:
          "Todos nossos tecidos possuem uma garantia da qual é confirmado que terão a mesma cor e tecido num período de 5 anos após última compra.",
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
        name: "Camisa social masculina manga curta",
        description:
          "A camisa mais usada para portaria, bordado do condomínio, com 1 bolso, nesse modelo manga curta. Consulte os tipos de tecidos e composição.",
        style: "social",
        photo: "/produtos/portaria-camisa-social-masculina.webp",
      },
      {
        name: "Camisa social feminina manga curta",
        description:
          "Segue a mesma proposta da masculina: pinças para ajustar ao corpo e modelagem própria.",
        style: "social-feminina",
        photo: "/produtos/camisa-social-feminina-branca-vivo.png",
      },
      {
        name: "Calça social masculina",
        description:
          "Em oxford, com 2 bolsos no modelo faca e 2 bolsos embutidos com botão, passantes, fecho com gancho e botão.",
        style: "calca",
        photo: "/produtos/portaria-calca-social-masculina.webp",
        colors: [marinho, preto, grafite],
      },
      {
        name: "Calça social feminina",
        description:
          "Cós mais alto para maior conforto, 2 botões e bolsos traseiros, modelo slim.",
        style: "calca-feminina",
        photo: "/produtos/portaria-calca-social-feminina.webp",
        colors: [marinho, preto, grafite],
      },
      {
        name: "Jaqueta",
        description:
          "Para dias frios ou com muita ventania: jaqueta forrada com tecido 100% algodão, elástico na barra e punhos, com zíper e 2 bolsos laterais.",
        style: "jaqueta",
        photo: "/produtos/jaqueta-preta.png",
        colors: [marinho, preto, grafite, bordo],
      },
      {
        name: "Calçado social",
        description:
          "Revestido de couro legítimo, nos modelos sport (sem cadarço) e clássico (com cadarço). Altíssima durabilidade.",
        style: "sapato",
        photo: "/produtos/portaria-calcado-social.webp",
        colors: [preto, marrom],
      },
      {
        name: "Meia social",
        description:
          "Material poliamida, meia social preta básica.",
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
          "Em couro dupla face, podendo usar no preto e no marrom, com passador de cinto nas 2 cores.",
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
    cover: "/produtos/jaleco-oxford-cinza.png",
    eyebrow: "Linha Zeladoria",
    headline: "O uniforme que aguenta o dia inteiro de zeladoria",
    intro:
      "Uniformes para zeladoria tendem e devem ser mais resistentes. Por isso temos uniformes resistentes e pesados, leves e de fácil transpiração, calçados antiderrapantes, impermeáveis e de couro, bonés, calças em brim e muito mais.",
    introClosing: "Todo uniforme para zeladoria que for necessário nós temos.",
    quickFacts: [
      "Tecidos em malha, brim 100% algodão etc.",
      "Costuras reforçadas e o melhor acabamento.",
      "Alta resistência em todos os uniformes.",
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
      "Camisa em malha gola O e gola polo",
      "Calça com elástico",
      "Jaqueta de trabalho",
      "Bota em couro",
      "Bota de borracha cano curto e cano alto",
      "Boné",
    ],
    models: [
      {
        name: "Jaleco com 3 bolsos",
        description:
          "Jaleco com 3 bolsos, sendo 1 bordado. Os botões podem ser cobertos ou expostos, em manga longa e curta.",
        style: "social",
        photo: "/produtos/jaleco-oxford-cinza.png",
        colors: [branco, cinzaClaro, royal, marinho],
      },
      {
        name: "Camisa em malha gola O",
        description:
          "A peça mais usada quando se trata de melhor mobilidade e transpiração, sem gerar muito calor e mantendo bem apresentável ao mesmo tempo.",
        style: "tshirt",
        photo: "/produtos/zeladoria-camisa-malha-gola-o.webp",
      },
      {
        name: "Camisa em malha gola polo",
        description:
          "A peça mais usada quando se trata de melhor mobilidade e transpiração, sem gerar muito calor e mantendo bem apresentável ao mesmo tempo. Mesma malha da gola O, no acabamento polo.",
        style: "tshirt",
        photo: "/produtos/camisa-polo-cinza-bolso.png",
      },
      {
        name: "Calça com elástico",
        description:
          "Ótima durabilidade e boa composição com o restante dos uniformes: elástico total e 4 bolsos, podendo adicionar mais 2 nas pernas, com ou sem tampa. Confira os tecidos disponíveis!",
        style: "calca",
        photo: "/produtos/calca-caqui-elastico.png",
        colors: [marinho, grafite, preto, royal],
      },
      {
        name: "Jaqueta",
        description:
          "Para o serviço externo e o começo da manhã: fechamento em zíper, punho e barra em ribana e bolsos na altura da cintura.",
        style: "jaqueta",
        photo: "/produtos/jaqueta-preta.png",
        colors: [marinho, grafite, royal, preto],
      },
      {
        name: "Bota em couro",
        description:
          "Altíssima durabilidade, em couro com elástico, preta e sem biqueira.",
        style: "bota",
        photo: "/produtos/bota-couro-elastico.png",
        colors: [preto],
      },
      {
        name: "Bota de borracha cano curto",
        description:
          "Impermeável e antiderrapante, para lavagem de garagem, calçada e área comum. Cano curto, mais leve no dia a dia.",
        style: "bota",
        photo: "/produtos/bota-borracha-cano-curto.png",
        colors: [preto, branco],
      },
      {
        name: "Bota de borracha cano alto",
        description:
          "Cano alto e material impermeável para lavagem pesada e dias de chuva — o pé fica seco no turno inteiro, com solado antiderrapante.",
        style: "bota",
        photo: "/produtos/bota-borracha-cano-alto.png",
        colors: [preto, branco, verdeBandeira],
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
    cover: "/produtos/camisa-polo-cinza-bolso.png",
    eyebrow: "Linha ASG",
    headline: "Limpeza pesada, uniforme leve",
    intro:
      "A linha de uniformes para ASGs é desenvolvida de acordo com o tipo de uso e as condições às quais os colaboradores estão expostos. Por isso, selecionamos materiais de alta qualidade, desenvolvidos para oferecer resistência à água, aos produtos químicos e ao desgaste causado pelos movimentos cotidianos, subir escada, se agachar e etc.",
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
      "Camisa em malha gola O e gola polo",
      "Jaleco com 3 bolsos",
      "Jaqueta",
      "Calça com elástico",
      "Calçado antiderrapante",
      "Bota impermeável cano curto e cano alto",
      "Bota em couro",
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
        name: "Camisa em malha gola polo",
        description:
          "Mesma malha leve da camisa gola O, no acabamento polo com bolso — um pouco mais apresentável sem perder a mobilidade e a transpiração.",
        style: "tshirt",
        photo: "/produtos/camisa-polo-cinza-bolso.png",
      },
      {
        name: "Jaleco com 3 bolsos",
        description:
          "Três bolsos para pano, borrifador e celular, em tecido que segura o respingo de produto de limpeza. Protege a roupa e sai do corpo em um segundo.",
        style: "social",
        photo: "/produtos/jaleco-oxford-cinza.png",
        colors: [branco, cinzaClaro, royal, marinho],
      },
      {
        name: "Jaqueta",
        description:
          "Para a limpeza de área externa e o começo da manhã: fechamento em zíper, punho e barra em ribana e bolsos na altura da cintura.",
        style: "jaqueta",
        photo: "/produtos/jaqueta-preta.png",
        colors: [marinho, grafite, royal, preto],
      },
      {
        name: "Calça com elástico",
        description:
          "Cós com elástico e cordão: veste rápido, não aperta ao agachar e dispensa cinto. Tecido leve que seca depressa para quem trabalha perto d'água.",
        style: "calca",
        photo: "/produtos/calca-caqui-elastico.png",
        colors: [marinho, grafite, preto, royal],
      },
      {
        name: "Calçado antiderrapante",
        description:
          "Calçado de alta durabilidade, solado com aderência, modelo BB65, leve e bonito.",
        style: "sapato",
        photo: "/produtos/calcado-softworks.png",
        colors: [preto, branco],
      },
      {
        name: "Bota impermeável",
        description:
          "Cano alto e material impermeável para lavagem de garagem, escada e área comum — o pé fica seco no turno inteiro, com o mesmo solado antiderrapante.",
        style: "bota",
        photo: "/produtos/bota-borracha-cano-alto.png",
        colors: [preto, branco, verdeBandeira],
      },
      {
        name: "Bota de borracha cano curto",
        description:
          "Impermeável e antiderrapante, para lavagem de garagem, calçada e área comum. Cano curto, mais leve no dia a dia.",
        style: "bota",
        photo: "/produtos/bota-borracha-cano-curto.png",
        colors: [preto, branco],
      },
      {
        name: "Bota em couro",
        description:
          "Altíssima durabilidade, em couro com elástico, preta e sem biqueira.",
        style: "bota",
        photo: "/produtos/bota-couro-elastico.png",
        colors: [preto],
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
