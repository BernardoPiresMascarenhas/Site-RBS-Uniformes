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
  Scissors,
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
  /** Público da peça. Sem valor, é unissex e aparece nos dois filtros. */
  gender?: "masculino" | "feminino";
  /**
   * Família da peça. Modelos com o mesmo `group` viram um card só no seletor,
   * e cada um vira uma opção de cor dentro dele (ver `colorName`/`swatch`).
   */
  group?: string;
  /** Nome da cor desta variação, exibido no seletor de cores. */
  colorName?: string;
  /** Cor da bolinha no seletor de cores (hex, ou um gradiente CSS para peça bicolor). */
  swatch?: string;
  /**
   * Cartela própria da peça, quando ela não sai em todas as cores da linha —
   * calçado e cinto, por exemplo, só existem em preto e marrom. Sem isso, vale
   * a cartela da linha (`Service.colors`).
   */
  colors?: UniformColor[];
  /**
   * Categoria da peça no seletor da página da linha (Camisas, Jalecos…). Sem
   * valor, sai do nome da peça — ver `modelCategory`.
   */
  category?: ModelCategory;
  /** Esconde a peça das etiquetas dos cards da página inicial (continua na página da linha). */
  hideInCatalog?: boolean;
  /**
   * Fotos extras da peça, exibidas depois de `photo` na galeria do produto
   * (`ProductImageGallery`). Arquivo ausente em `public/` é ignorado.
   */
  gallery?: GalleryImage[];
}

/** Foto extra da galeria de uma peça. */
export interface GalleryImage {
  /** Caminho em `public/`. */
  src: string;
  /** Texto alternativo: descreve o que está na foto. */
  alt: string;
  /** Selo sobre a foto, ex.: "Foto ilustrativa" quando não é a mesma peça. */
  note?: string;
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

export interface ChartImage {
  src: string;
  width: number;
  height: number;
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
  /**
   * Cartela de cores da linha, em `public/cor/`: a arte horizontal vale do
   * tablet para cima e a vertical, no celular.
   */
  colorChart?: {
    desktop: ChartImage;
    mobile: ChartImage;
  };

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
    colorChart: {
      desktop: { src: "/cor/corPortaria1.png", width: 1448, height: 662 },
      mobile: { src: "/cor/corPortariaMobile.png", width: 941, height: 1672 },
    },
    title: "Portaria",
    shortDescription:
      "Os uniformes da portaria são primordiais para identificação dos funcionários e também para agregar valor ao condomínio, mantendo conforto, padrão e durabilidade no mesmo uniforme.",
    icon: DoorOpen,

    eyebrow: "Linha Portaria",
    headline: "O porteiro é o cartão de visita do condomínio",
    intro:
      "Os uniformes da portaria são primordiais para identificação dos funcionários e também para agregar valor ao condomínio, mantendo conforto, padrão e durabilidade no mesmo uniforme.",
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
        name: "Camisa Social Masculina Manga Curta Icelandic",
        group: "Camisa Social Masculina Manga Curta",
        colorName: "Icelandic",
        gender: "masculino",
        swatch: "#ACBAD1",
        description:
          "A camisa mais usada para portaria, bordado do condomínio, com 1 bolso, nesse modelo manga curta. Consulte os tipos de tecidos e composição.",
        style: "social",
        photo: "/produtos/portaria-camisa-social-masculina-manga-curta-icelandic-c.webp",
      },
      {
        name: "Camisa Social Masculina Manga Curta Azul",
        group: "Camisa Social Masculina Manga Curta",
        colorName: "Azul",
        gender: "masculino",
        swatch: "#6F9BD1",
        description:
          "A camisa mais usada para portaria, bordado do condomínio, com 1 bolso, nesse modelo manga curta. Consulte os tipos de tecidos e composição.",
        style: "social",
        photo: "/produtos/portaria-camisa-social-masculina-manga-curta-azul.webp",
      },
      {
        name: "Camisa Social Masculina Manga Curta Azul Prisma",
        group: "Camisa Social Masculina Manga Curta",
        colorName: "Azul prisma",
        gender: "masculino",
        swatch: "#A3C7EA",
        description:
          "A camisa mais usada para portaria, bordado do condomínio, com 1 bolso, nesse modelo manga curta. Consulte os tipos de tecidos e composição.",
        style: "social",
        photo: "/produtos/portaria-camisa-social-masculina-manga-curta-azul-prisma.webp",
      },
      {
        name: "Camisa Social Masculina Manga Curta Azul Motorista",
        group: "Camisa Social Masculina Manga Curta",
        colorName: "Azul motorista",
        gender: "masculino",
        swatch: "#8AA6CF",
        description:
          "A camisa mais usada para portaria, bordado do condomínio, com 1 bolso, nesse modelo manga curta. Consulte os tipos de tecidos e composição.",
        style: "social",
        photo: "/produtos/portaria-camisa-social-masculina-manga-curta-azul-motorista.webp",
      },
      {
        name: "Camisa Social Masculina Manga Curta Cinza",
        group: "Camisa Social Masculina Manga Curta",
        colorName: "Cinza",
        gender: "masculino",
        swatch: "#9AAAA0",
        description:
          "A camisa mais usada para portaria, bordado do condomínio, com 1 bolso, nesse modelo manga curta. Consulte os tipos de tecidos e composição.",
        style: "social",
        photo: "/produtos/portaria-camisa-social-masculina-manga-curta-cor-cinza.webp",
      },
      {
        name: "Camisa Social Masculina Manga Longa Azul Claro",
        group: "Camisa Social Masculina Manga Longa",
        colorName: "Azul claro",
        swatch: "#B9D0EA",
        gender: "masculino",
        description:
          "Camisa social com bordado do condomínio e bolso, no modelo manga longa. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/portaria-camisa-social-manga-longa-azul-claro.webp",
      },
      {
        name: "Camisa Social Masculina Manga Longa Azul Motorista",
        group: "Camisa Social Masculina Manga Longa",
        colorName: "Azul motorista",
        gender: "masculino",
        swatch: "#8EA5CE",
        description:
          "Camisa social com bordado do condomínio e bolso, no modelo manga longa. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/portaria-camisa-social-manga-longa-azul-motorista.webp",
      },
      {
        name: "Camisa Social Masculina Manga Longa Ice",
        group: "Camisa Social Masculina Manga Longa",
        colorName: "Ice",
        gender: "masculino",
        swatch: "#ADB8CF",
        description:
          "Camisa social com bordado do condomínio e bolso, no modelo manga longa. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/portaria-camisa-social-manga-longa-ice.webp",
      },
      {
        name: "Camisa Social Masculina Manga Longa Cinza Claro",
        group: "Camisa Social Masculina Manga Longa",
        colorName: "Cinza claro",
        gender: "masculino",
        swatch: "#C4C4C6",
        description:
          "Camisa social com bordado do condomínio e bolso, no modelo manga longa. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/portaria-camisa-social-manga-longa-cinza-claro.webp",
      },
      {
        name: "Camisa Social Masculina Manga Longa Verde Claro",
        group: "Camisa Social Masculina Manga Longa",
        colorName: "Verde claro",
        gender: "masculino",
        swatch: "#99CBC1",
        description:
          "Camisa social com bordado do condomínio e bolso, no modelo manga longa. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/portaria-camisa-social-manga-longa-verde-claro.webp",
      },
      {
        name: "Camisa Social Masculina Manga Longa Preta",
        group: "Camisa Social Masculina Manga Longa",
        colorName: "Preta",
        gender: "masculino",
        swatch: "#3A3A3D",
        description:
          "Camisa social com bordado do condomínio e bolso, no modelo manga longa. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/portaria-camisa-social-manga-longa-preto.webp",
      },
      {
        name: "Camisa Social Masculina Manga Curta com Detalhe Amarela com Vivo Azul Marinho",
        group: "Camisa Social Masculina Manga Curta com Detalhe",
        colorName: "Amarela com vivo azul marinho",
        gender: "masculino",
        swatch: "linear-gradient(135deg, #F1E3A4 50%, #1B2A45 50%)",
        description:
          "Camisa social com vivo contrastante no abotoamento e nas mangas, bordado do condomínio e 1 bolso. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/portaria-camisa-social-masculina-com-detalhes-em-vivo-no-abotoamento-e-mangas.webp",
      },
      {
        name: "Camisa Social Masculina Manga Curta com Detalhe Azul com Vivo Preto",
        group: "Camisa Social Masculina Manga Curta com Detalhe",
        colorName: "Azul com vivo preto",
        gender: "masculino",
        swatch: "linear-gradient(135deg, #6F9BD1 50%, #171717 50%)",
        description:
          "Camisa social com vivo preto no abotoamento e nas mangas, bordado do condomínio e 1 bolso. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/portaria-camisa-social-masculina-com-detalhes-no-abotoamento-em-vivo-preto-e-mangas.webp",
      },
      {
        name: "Camisa Social Masculina Manga Longa com Detalhe Amarela",
        group: "Camisa Social Masculina Manga Longa com Detalhe",
        colorName: "Amarela com vivo azul marinho",
        gender: "masculino",
        swatch: "linear-gradient(135deg, #F1E3A4 50%, #1B2A45 50%)",
        description:
          "Camisa social manga longa com vivo contrastante no abotoamento e nos punhos, bordado do condomínio e 1 bolso. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/portaria-manga-longa-com-detalhe-amarela.webp",
      },
      {
        name: "Camisa Social Masculina Manga Longa com Detalhe Azul Claro",
        group: "Camisa Social Masculina Manga Longa com Detalhe",
        colorName: "Azul claro",
        gender: "masculino",
        swatch: "#A9C6E6",
        description:
          "Camisa social manga longa com 2 bolsos com lapela e bordado do condomínio. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/portaria-manga-longa-com-detalhe.webp",
      },
      {
        name: "Blusete Feminina Manga Curta Verde Água",
        group: "Blusete Feminina Manga Curta",
        colorName: "Verde água",
        gender: "feminino",
        swatch: "#D5E8DF",
        description:
          "Segue a mesma proposta da camisa masculina: pinças para ajustar ao corpo e modelagem própria.",
        style: "social-feminina",
        photo: "/produtos/portaria-blusete-feminina-verde-agua2.webp",
      },
      {
        name: "Blusete Feminina Manga Curta Rosa",
        group: "Blusete Feminina Manga Curta",
        colorName: "Rosa",
        gender: "feminino",
        swatch: "#C9757A",
        description:
          "Segue a mesma proposta da camisa masculina: pinças para ajustar ao corpo e modelagem própria.",
        style: "social-feminina",
        photo: "/produtos/portaria-blusete-feminina-cor-rosa.webp",
      },
      {
        name: "Camisa Social Feminina Manga Longa Preta",
        group: "Camisa Social Feminina Manga Longa",
        colorName: "Preta",
        gender: "feminino",
        swatch: "#3A3A3D",
        description:
          "Camisa social feminina manga longa com bordado, pinças para ajustar ao corpo e modelagem própria. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social-feminina",
        photo: "/produtos/portaria-camisa-social-feminina-manga-longa-preta.webp",
        // foto vestida na miniatura da galeria
        gallery: [
          {
            src: "/produtosNovos/portaria_foto_mulher_jaleco_com_detalhe.jpeg",
            alt: "Funcionária vestindo a camisa social feminina manga longa preta com logotipo bordado",
          },
        ],
      },
      {
        name: "Camisa Social Feminina Manga Longa Branca",
        group: "Camisa Social Feminina Manga Longa",
        colorName: "Branca",
        gender: "feminino",
        swatch: "#F4F4F2",
        description:
          "Camisa social feminina manga longa com bordado, pinças para ajustar ao corpo e modelagem própria. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social-feminina",
        photo: "/produtos/portaria-camisa-social-feminina-manga-longa-branca.webp",
      },
      {
        name: "Camisa Social Feminina Manga Longa Rosa",
        group: "Camisa Social Feminina Manga Longa",
        colorName: "Rosa",
        gender: "feminino",
        swatch: "#C9757A",
        description:
          "Camisa social feminina manga longa com bordado, pinças para ajustar ao corpo e modelagem própria. Consulte os tipos de tecidos e composição.",
        hideInCatalog: true,
        style: "social-feminina",
        photo: "/produtos/portaria-camisa-social-feminina-manga-longa-rosa.webp",
      },
      {
        name: "Camisa Social Feminina Manga Curta com Detalhe Amarela com Vivo Azul Marinho",
        group: "Camisa Social Feminina Manga Curta com Detalhe",
        colorName: "Amarela com vivo azul marinho",
        gender: "feminino",
        swatch: "linear-gradient(135deg, #F1E3A4 50%, #1B2A45 50%)",
        description:
          "Mesma proposta da masculina, com vivo contrastante no abotoamento e nas mangas: pinças para ajustar ao corpo e modelagem própria.",
        hideInCatalog: true,
        style: "social-feminina",
        photo: "/produtos/portaria-camisa-social-feminina-com-detalhes-em-vivo-no-abotoamento-e-mangas.webp",
      },
      {
        name: "Camisa Social Feminina Manga Curta com Detalhe Azul com Vivo Preto",
        group: "Camisa Social Feminina Manga Curta com Detalhe",
        colorName: "Azul com vivo preto",
        gender: "feminino",
        swatch: "linear-gradient(135deg, #6F9BD1 50%, #171717 50%)",
        description:
          "Mesma proposta da masculina, com vivo preto no abotoamento e nas mangas: pinças para ajustar ao corpo e modelagem própria.",
        hideInCatalog: true,
        style: "social-feminina",
        photo: "/produtos/portaria-camisa-social-feminina-com-detalhes-no-abotoamento-em-vivo-preto-e-mangas.webp",
      },
      {
        name: "Camisa Social Feminina Manga Longa com Detalhe Azul com Vivo Azul Marinho",
        group: "Camisa Social Feminina Manga Longa com Detalhe",
        colorName: "Azul com vivo azul marinho",
        gender: "feminino",
        swatch: "linear-gradient(135deg, #6F9BD1 50%, #1B2A45 50%)",
        description:
          "Camisa social feminina manga longa com vivo contrastante no abotoamento e nos punhos, bordado e 1 bolso: pinças para ajustar ao corpo e modelagem própria.",
        hideInCatalog: true,
        style: "social-feminina",
        photo: "/produtos/portaria-camisa-social-feminina-manga-longa-com-detalhe-azul.webp",
      },
      {
        name: "Blusete Social Manga 3/4 Rosa",
        group: "Blusete Social Manga 3/4",
        colorName: "Rosa",
        gender: "feminino",
        swatch: "#C9677A",
        description:
          "Camisa social feminina com manga 3/4 e punho, pinças para ajustar ao corpo e modelagem própria. Consulte os tipos de tecidos e composição.",
        style: "social-feminina",
        photo: "/produtos/portaria-camisa-social-feminina-manga-3-4-rosa.webp",
      },
      {
        name: "Calça Social Feminina em Oxford",
        colorName: "Preta",
        swatch: "#171717",
        gender: "feminino",
        description:
          "Calça social feminina em oxford, com cós alto, pregas e fecho com botões. Consulte os tipos de tecidos e composição.",
        style: "calca",
        photo: "/produtos/portaria-calca-social-feminina-em-oxford-preto.webp",
      },
      {
        name: "Calça Social em Oxford",
        colorName: "Preta",
        swatch: "#171717",
        gender: "masculino",
        description:
          "Em oxford, com 2 bolsos no modelo faca e 2 bolsos embutidos com botão, passantes, fecho com gancho e botão.",
        style: "calca",
        photo: "/produtos/portaria-calca-social-preta-em-oxford.webp",
      },
      {
        name: "Blazer Masculino em Oxford",
        colorName: "Preto",
        swatch: "#171717",
        gender: "masculino",
        description:
          "Blazer masculino em oxford preto, para uma apresentação mais formal na portaria.",
        style: "jaqueta",
        photo: "/produtos/portaria-blazer-masculino-em-oxford-pret.webp",
      },
      {
        name: "Jaqueta Forrada",
        colorName: "Preta",
        swatch: "#171717",
        description:
          "Para dias frios ou com muita ventania: jaqueta forrada com tecido 100% algodão, elástico na barra e punhos, com zíper e 2 bolsos laterais.",
        style: "jaqueta",
        photo: "/produtos/jaqueta-preta-forrada-100-algodao-2-bolsos.webp",
      },
      {
        name: "Gravata Tradicional",
        colorName: "Preta",
        swatch: "#171717",
        description:
          "Gravata em tecido que não amassa, lisa ou com listra na cor do condomínio.",
        style: "gravata",
        photo: "/produtos/portaria-gravata-tradicional.webp",
      },
      {
        name: "Gravata com Nó Pronto",
        colorName: "Preta",
        swatch: "#171717",
        description:
          "Versão com nó pronto e elástico, mais prática na troca de turno.",
        style: "gravata",
        photo: "/produtos/portaria-gravata-no-pronto.webp",
      },
      {
        name: "Cinto em Couro Dupla Face",
        colorName: "Preto e marrom",
        swatch: "linear-gradient(135deg, #171717 50%, #4A3324 50%)",
        description:
          "Em couro dupla face, podendo usar no preto e no marrom, com passador de cinto nas 2 cores.",
        style: "cinto",
        photo: "/produtos/portaria-cinto.webp",
        colors: [preto, marrom],
      },
      {
        name: "Meia Social em Poliamida",
        colorName: "Preta",
        swatch: "#171717",
        description:
          "Material poliamida, meia social preta básica.",
        style: "meia",
        photo: "/produtos/portaria-meia-social-de-poliamida.webp",
      },
      {
        name: "Calçado Social em Couro Legítimo Modelo Sport",
        colorName: "Preto",
        swatch: "#171717",
        description:
          "Revestido de couro legítimo, modelo sport sem cadarço, com elástico nas laterais para calçar com facilidade. Altíssima durabilidade.",
        style: "sapato",
        photo: "/produtos/portaria-calcado-social-couro-sport.webp",
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
    colorChart: {
      desktop: { src: "/cor/corZeladoria.png", width: 1448, height: 1086 },
      mobile: { src: "/cor/corZeladoriaMobile.png", width: 941, height: 1672 },
    },
    title: "Zeladoria",
    shortDescription:
      "Uniformes de alta resistência e confortável é mais que o essencial para alguém que zela pelo condomínio, pensado em quem e nas condições que vai ser utilizado. Um uniforme coringa para quem atua em várias áreas do prédio.",
    icon: Wrench,
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
        title: "Durabilidade garantida",
        description:
          "Usamos tecidos resistentes, próprios para quem trabalha na zeladoria.",
        icon: HardHat,
      },
      {
        title: "Costura reforçada nos pontos certos",
        description:
          "Reforçamos gavião, entrepernas e bolsos, justamente nas partes que mais sofrem com o uso diário mediante solicitação. É um cuidado que ajuda o uniforme a durar mais.",
        icon: Scissors,
      },
      {
        title: "Espaço para o que precisa estar à mão",
        description:
          "Bolsos funcionais para guardar ferramentas pequenas, chaves e outros itens utilizados durante o expediente.",
        icon: KeyRound,
      },
      {
        title: "Boa apresentação em todos os ambientes",
        description:
          "Modelagem, cores e acabamentos que ajudam a manter uma aparência organizada e profissional diante dos moradores e visitantes.",
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
        name: "Jaleco Masculino Manga Curta Caqui",
        group: "Jaleco Masculino Manga Curta",
        colorName: "Caqui",
        swatch: "#CFC3A6",
        description:
          "Jaleco com 3 bolsos, sendo 1 bordado. Os botões podem ser cobertos ou expostos, em manga longa e curta.",
        style: "social",
        photo: "/produtos/asg-e-zeladoria-jaleco-em-brim-caqui.webp",
      },
      {
        name: "Jaleco Masculino Manga Curta Azul Marinho",
        group: "Jaleco Masculino Manga Curta",
        colorName: "Azul marinho",
        gender: "masculino",
        swatch: "#1E2A44",
        description:
          "Jaleco com 3 bolsos, sendo 1 bordado. Os botões podem ser cobertos ou expostos, em manga longa e curta.",
        style: "social",
        photo: "/produtos/asg-e-zeladoria-jaleco-masculino-em-brim-azul-marinho.webp",
      },
      {
        name: "Jaleco Masculino Manga Curta Bege com Detalhes em Verde Petróleo",
        group: "Jaleco Masculino Manga Curta",
        colorName: "Bege com detalhes em verde petróleo",
        swatch: "linear-gradient(135deg, #E4DDCF 50%, #1F4E5A 50%)",
        description:
          "Jaleco com 3 bolsos, sendo 1 bordado. Os botões podem ser cobertos ou expostos, em manga longa e curta.",
        style: "social",
        photo: "/produtos/asg-e-zeladoria-jaleco-em-brim-cinza-com-detalhes-em-verde.webp",
      },
      {
        name: "Jaleco Masculino Manga Curta com Detalhe",
        colorName: "Azul marinho com detalhes em vermelho",
        swatch: "linear-gradient(135deg, #1E2A44 50%, #D62B30 50%)",
        gender: "masculino",
        description:
          "Jaleco com 3 bolsos, sendo 1 bordado. Os botões podem ser cobertos ou expostos, em manga longa e curta.",
        style: "social",
        photo: "/produtos/portaria-jaleco-masculino-em-brim-azul-marinho-com-detalhe-em-vermelho.webp",
      },
      {
        name: "Jaleco em Brim Manga Longa",
        colorName: "Bege com detalhes em verde petróleo",
        swatch: "linear-gradient(135deg, #E4DDCF 50%, #1F4E5A 50%)",
        description:
          "Jaleco em brim manga longa, com gola e punhos em verde petróleo e 3 bolsos, sendo 1 bordado.",
        hideInCatalog: true,
        style: "social",
        photo: "/produtos/zeladoria-jaleco-brim-bege-verde-petroleo-manga-longa.webp",
      },
      {
        name: "Camisa em Malha Gola O Cinza",
        group: "Camisa em Malha Gola O",
        colorName: "Cinza",
        swatch: "#A3A3A3",
        description:
          "A peça mais usada quando se trata de melhor mobilidade e transpiração, sem gerar muito calor e mantendo bem apresentável ao mesmo tempo.",
        style: "tshirt",
        photo: "/produtos/asg-e-zeladoria-camisa-em-malha-cinza.webp",
      },
      {
        name: "Camisa em Malha Gola O Azul Marinho",
        group: "Camisa em Malha Gola O",
        colorName: "Azul marinho",
        gender: "masculino",
        swatch: "#1E2A4A",
        description:
          "A peça mais usada quando se trata de melhor mobilidade e transpiração, sem gerar muito calor e mantendo bem apresentável ao mesmo tempo.",
        style: "tshirt",
        photo: "/produtos/asg-e-zeladoria-camisa-masculina-em-malha-azul-marinho2.webp",
      },
      {
        name: "Camisa em Malha Gola O Vermelha",
        group: "Camisa em Malha Gola O",
        colorName: "Vermelha",
        swatch: "#D62B30",
        description:
          "A peça mais usada quando se trata de melhor mobilidade e transpiração, sem gerar muito calor e mantendo bem apresentável ao mesmo tempo.",
        style: "tshirt",
        photo: "/produtos/asg-e-zeladoria-camisa-em-malha-vermelha.webp",
      },
      {
        name: "Camisa Manga Longa em Malha PV Gola Olímpica Azul Marinho",
        group: "Camisa Manga Longa em Malha PV Gola Olímpica",
        colorName: "Azul marinho",
        swatch: "#192138",
        description:
          "Malha PV (poliéster e viscose) em manga longa com gola olímpica: leve, com boa transpiração e mais proteção para os braços no serviço externo.",
        hideInCatalog: true,
        style: "tshirt",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-gola-olimpica-azul-marinho.webp",
      },
      {
        name: "Camisa Manga Longa em Malha PV Gola Olímpica Cinza",
        group: "Camisa Manga Longa em Malha PV Gola Olímpica",
        colorName: "Cinza",
        swatch: "#9B9B9D",
        description:
          "Malha PV (poliéster e viscose) em manga longa com gola olímpica: leve, com boa transpiração e mais proteção para os braços no serviço externo.",
        hideInCatalog: true,
        style: "tshirt",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-gola-olimpica-cinza.webp",
      },
      {
        name: "Camisa Manga Longa em Malha PV Gola Olímpica Cinza Escuro",
        group: "Camisa Manga Longa em Malha PV Gola Olímpica",
        colorName: "Cinza escuro",
        swatch: "#48484D",
        description:
          "Malha PV (poliéster e viscose) em manga longa com gola olímpica: leve, com boa transpiração e mais proteção para os braços no serviço externo.",
        hideInCatalog: true,
        style: "tshirt",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-gola-olimpica-cinza-escuro.webp",
      },
      {
        name: "Camisa Manga Longa em Malha PV Gola Olímpica Verde Escuro",
        group: "Camisa Manga Longa em Malha PV Gola Olímpica",
        colorName: "Verde escuro",
        swatch: "#26392E",
        description:
          "Malha PV (poliéster e viscose) em manga longa com gola olímpica: leve, com boa transpiração e mais proteção para os braços no serviço externo.",
        hideInCatalog: true,
        style: "tshirt",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-gola-olimpica-verde-escuro.webp",
      },
      {
        name: "Camisa Manga Longa em Malha PV Gola Olímpica Vermelha",
        group: "Camisa Manga Longa em Malha PV Gola Olímpica",
        colorName: "Vermelha",
        swatch: "#C8102E",
        description:
          "Malha PV (poliéster e viscose) em manga longa com gola olímpica: leve, com boa transpiração e mais proteção para os braços no serviço externo.",
        hideInCatalog: true,
        style: "tshirt",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-gola-olimpica-vermelha.webp",
      },
      {
        name: "Camisa Polo Manga Longa em Malha PV Cinza Escuro",
        group: "Camisa Polo Manga Longa em Malha PV",
        colorName: "Cinza escuro",
        swatch: "#434348",
        description:
          "Mesma malha PV em manga longa, no acabamento polo com botões — um pouco mais apresentável, com a mesma leveza e transpiração.",
        hideInCatalog: true,
        style: "polo",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-polo-cinza-escuro.webp",
      },
      {
        name: "Camisa Polo Manga Longa em Malha PV Azul Escuro",
        group: "Camisa Polo Manga Longa em Malha PV",
        colorName: "Azul escuro",
        swatch: "#182645",
        description:
          "Mesma malha PV em manga longa, no acabamento polo com botões — um pouco mais apresentável, com a mesma leveza e transpiração.",
        hideInCatalog: true,
        style: "polo",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-polo-azul-escuro.webp",
      },
      {
        name: "Camisa Polo Manga Longa em Malha PV Cinza Claro",
        group: "Camisa Polo Manga Longa em Malha PV",
        colorName: "Cinza claro",
        swatch: "#9A9A9C",
        description:
          "Mesma malha PV em manga longa, no acabamento polo com botões — um pouco mais apresentável, com a mesma leveza e transpiração.",
        hideInCatalog: true,
        style: "polo",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-polo-cinza-claro.webp",
      },
      {
        name: "Camisa Polo Manga Longa em Malha PV Verde Escuro",
        group: "Camisa Polo Manga Longa em Malha PV",
        colorName: "Verde escuro",
        swatch: "#233429",
        description:
          "Mesma malha PV em manga longa, no acabamento polo com botões — um pouco mais apresentável, com a mesma leveza e transpiração.",
        hideInCatalog: true,
        style: "polo",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-polo-verde-escuro.webp",
      },
      {
        name: "Camisa Polo Masculina em Malha",
        colorName: "Verde escuro",
        swatch: "#1F4D36",
        gender: "masculino",
        description:
          "Mesma malha leve da camisa gola O, no acabamento polo com bolso — um pouco mais apresentável sem perder a mobilidade e a transpiração.",
        style: "polo",
        photo: "/produtos/asg-e-zeladoria-camisa-polo-masculina-verde-escuro.webp",
      },
      {
        name: "Calça com Elástico Total e 4 Bolsos Preta (oxford)",
        group: "Calça com Elástico Total e 4 Bolsos",
        colorName: "Preta (oxford)",
        swatch: "#1A1A1A",
        description:
          "Em brim, oxford ou prada, com 4 bolsos, elástico total e cordão, dispensa cinto e garante mais conforto ao agachar.",
        style: "calca",
        photo: "/produtos/asg-e-zeladoria-calca-em-oxford.webp",
      },
      {
        name: "Calça com Elástico Total e 4 Bolsos Caqui (brim)",
        group: "Calça com Elástico Total e 4 Bolsos",
        colorName: "Caqui (brim)",
        swatch: "#8F907F",
        description:
          "Em brim, oxford ou prada, com 4 bolsos, elástico total e cordão, dispensa cinto e garante mais conforto ao agachar.",
        style: "calca",
        photo: "/produtos/asg-e-zeladoria-calca-com-elastico-total-e-4-bolsos-em-brim-caqui.webp",
      },
      {
        name: "Calça com Elástico Total e 4 Bolsos Preta (oxford ou prada)",
        group: "Calça com Elástico Total e 4 Bolsos",
        colorName: "Preta (oxford ou prada)",
        swatch: "#232323",
        description:
          "Em oxford ou prada, com 4 bolsos, elástico total e cordão, dispensa cinto e garante mais conforto ao agachar.",
        style: "calca",
        photo: "/produtos/asg-zeladoria-calca-elastico-oxford-prada-cordao.webp",
      },
      {
        name: "Calça Jeans Masculina",
        colorName: "Azul escuro",
        swatch: "#1C2840",
        gender: "masculino",
        description:
          "Calça jeans masculina, resistente para o dia a dia da zeladoria.",
        style: "calca",
        photo: "/produtos/zeladoria-calca-jeans-masculina.webp",
      },
      {
        name: "Boné em Brim",
        colorName: "Cinza",
        swatch: "#6B6E72",
        description:
          "Boné em brim com aba estruturada e regulagem atrás, para o serviço no sol. Recebe o bordado do condomínio na frente.",
        style: "bone",
        photo: "/produtos/zeladoria-bone.webp",
      },
      {
        name: "Jaqueta Forrada",
        colorName: "Preta",
        swatch: "#171717",
        description:
          "Para dias frios ou com muita ventania: jaqueta forrada com tecido 100% algodão, elástico na barra e punhos, com zíper e 2 bolsos laterais.",
        style: "jaqueta",
        photo: "/produtos/jaqueta-preta-forrada-100-algodao-2-bolsos.webp",
      },
      {
        name: "Meia em Algodão",
        colorName: "Branca ou preta",
        swatch: "linear-gradient(135deg, #F1F0EC 50%, #171717 50%)",
        description:
          "Meias de algodão nas cores branca e preta, para o uso diário com bota ou calçado de trabalho.",
        style: "meia",
        photo: "/produtos/asg-e-zeladoria-meias-de-algodao.webp",
      },
      {
        name: "Bota em Couro",
        description:
          "Altíssima durabilidade, em couro com elástico, preta e sem biqueira.",
        style: "bota",
        photo: "/produtos/bota-couro-elastico.png",
        colors: [preto],
      },
      {
        name: "Bota de Borracha Cano Curto",
        description:
          "Impermeável e antiderrapante, para lavagem de garagem, calçada e área comum. Cano curto, mais leve no dia a dia.",
        style: "bota",
        photo: "/produtos/bota-borracha-cano-curto.png",
        colors: [preto, branco],
      },
      {
        name: "Bota de Borracha Cano Alto",
        description:
          "Cano alto e material impermeável para lavagem pesada e dias de chuva — o pé fica seco no turno inteiro, com solado antiderrapante.",
        style: "bota",
        photo: "/produtos/bota-borracha-cano-alto.png",
        colors: [preto, branco, verdeBandeira],
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
    colorChart: {
      desktop: { src: "/cor/corAsg.png", width: 1448, height: 1086 },
      mobile: { src: "/cor/corAsgMobile.png", width: 941, height: 1672 },
    },
    title: "Auxiliar de Serviços Gerais (ASG)",
    shortDescription:
      "Pensado para quem trabalha com produtos de limpeza, água e mais. Trabalhamos com tecidos leves e próprios para prevenir manchas, secagem rápida e conforto. Tudo em um só uniforme.",
    icon: SprayCan,
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
        title: "Conforto para acompanhar o expediente",
        description:
          "Modelagens e tecidos escolhidos para permitir liberdade de movimento, sem atrapalhar na hora de varrer, lavar ou organizar os ambientes.",
        icon: Wind,
      },
      {
        title: "Mais resistência no uso diário",
        description:
          "Costuras reforçadas e tecidos adequados para acompanhar o contato frequente com água, produtos de limpeza e atividades que exigem bastante da peça.",
        icon: Droplets,
      },
      {
        title: "Fácil de cuidar e manter",
        description:
          "Peças pensadas para a lavagem frequente, com materiais que ajudam a conservar a aparência e a estrutura do uniforme.",
        icon: Brush,
      },
      {
        title: "Apresentação sempre em dia",
        description:
          "Uniformes com bom caimento, acabamento cuidadoso e cores que ajudam a manter uma boa aparência durante o expediente.",
        icon: BadgeCheck,
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
        name: "Jaleco Masculino Manga Curta Caqui",
        group: "Jaleco Masculino Manga Curta",
        colorName: "Caqui",
        swatch: "#CFC3A6",
        description:
          "Jaleco com 3 bolsos, sendo 1 bordado. Os botões podem ser cobertos ou expostos, em manga longa e curta.",
        style: "social",
        photo: "/produtos/asg-e-zeladoria-jaleco-em-brim-caqui.webp",
      },
      {
        name: "Jaleco Masculino Manga Curta Azul Marinho",
        group: "Jaleco Masculino Manga Curta",
        colorName: "Azul marinho",
        gender: "masculino",
        swatch: "#1E2A44",
        description:
          "Jaleco com 3 bolsos, sendo 1 bordado. Os botões podem ser cobertos ou expostos, em manga longa e curta.",
        style: "social",
        photo: "/produtos/asg-e-zeladoria-jaleco-masculino-em-brim-azul-marinho.webp",
      },
      {
        name: "Jaleco Masculino Manga Curta Bege com Detalhes em Verde Petróleo",
        group: "Jaleco Masculino Manga Curta",
        colorName: "Bege com detalhes em verde petróleo",
        swatch: "linear-gradient(135deg, #E4DDCF 50%, #1F4E5A 50%)",
        description:
          "Jaleco com 3 bolsos, sendo 1 bordado. Os botões podem ser cobertos ou expostos, em manga longa e curta.",
        style: "social",
        photo: "/produtos/asg-e-zeladoria-jaleco-em-brim-cinza-com-detalhes-em-verde.webp",
      },
      {
        name: "Jaleco Masculino Manga Curta com Detalhe",
        colorName: "Azul marinho com detalhes em vermelho",
        swatch: "linear-gradient(135deg, #1E2A44 50%, #D62B30 50%)",
        gender: "masculino",
        description:
          "Jaleco com 3 bolsos, sendo 1 bordado. Os botões podem ser cobertos ou expostos, em manga longa e curta.",
        style: "social",
        photo: "/produtos/portaria-jaleco-masculino-em-brim-azul-marinho-com-detalhe-em-vermelho.webp",
      },
      {
        name: "Camisa em Malha Gola O Cinza",
        group: "Camisa em Malha Gola O",
        colorName: "Cinza",
        swatch: "#A3A3A3",
        description:
          "A peça mais usada quando se trata de melhor mobilidade e transpiração, sem gerar muito calor e mantendo bem apresentável ao mesmo tempo.",
        style: "tshirt",
        photo: "/produtos/asg-e-zeladoria-camisa-em-malha-cinza.webp",
      },
      {
        name: "Camisa em Malha Gola O Azul Marinho",
        group: "Camisa em Malha Gola O",
        colorName: "Azul marinho",
        gender: "masculino",
        swatch: "#1E2A4A",
        description:
          "A peça mais usada quando se trata de melhor mobilidade e transpiração, sem gerar muito calor e mantendo bem apresentável ao mesmo tempo.",
        style: "tshirt",
        photo: "/produtos/asg-e-zeladoria-camisa-masculina-em-malha-azul-marinho2.webp",
      },
      {
        name: "Camisa em Malha Gola O Vermelha",
        group: "Camisa em Malha Gola O",
        colorName: "Vermelha",
        swatch: "#D62B30",
        description:
          "A peça mais usada quando se trata de melhor mobilidade e transpiração, sem gerar muito calor e mantendo bem apresentável ao mesmo tempo.",
        style: "tshirt",
        photo: "/produtos/asg-e-zeladoria-camisa-em-malha-vermelha.webp",
      },
      {
        name: "Camisa Manga Longa em Malha PV Gola Olímpica Azul Marinho",
        group: "Camisa Manga Longa em Malha PV Gola Olímpica",
        colorName: "Azul marinho",
        swatch: "#192138",
        description:
          "Malha PV (poliéster e viscose) em manga longa com gola olímpica: leve, com boa transpiração e mais proteção para os braços no serviço externo.",
        hideInCatalog: true,
        style: "tshirt",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-gola-olimpica-azul-marinho.webp",
      },
      {
        name: "Camisa Manga Longa em Malha PV Gola Olímpica Cinza",
        group: "Camisa Manga Longa em Malha PV Gola Olímpica",
        colorName: "Cinza",
        swatch: "#9B9B9D",
        description:
          "Malha PV (poliéster e viscose) em manga longa com gola olímpica: leve, com boa transpiração e mais proteção para os braços no serviço externo.",
        hideInCatalog: true,
        style: "tshirt",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-gola-olimpica-cinza.webp",
      },
      {
        name: "Camisa Manga Longa em Malha PV Gola Olímpica Cinza Escuro",
        group: "Camisa Manga Longa em Malha PV Gola Olímpica",
        colorName: "Cinza escuro",
        swatch: "#48484D",
        description:
          "Malha PV (poliéster e viscose) em manga longa com gola olímpica: leve, com boa transpiração e mais proteção para os braços no serviço externo.",
        hideInCatalog: true,
        style: "tshirt",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-gola-olimpica-cinza-escuro.webp",
      },
      {
        name: "Camisa Manga Longa em Malha PV Gola Olímpica Verde Escuro",
        group: "Camisa Manga Longa em Malha PV Gola Olímpica",
        colorName: "Verde escuro",
        swatch: "#26392E",
        description:
          "Malha PV (poliéster e viscose) em manga longa com gola olímpica: leve, com boa transpiração e mais proteção para os braços no serviço externo.",
        hideInCatalog: true,
        style: "tshirt",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-gola-olimpica-verde-escuro.webp",
      },
      {
        name: "Camisa Manga Longa em Malha PV Gola Olímpica Vermelha",
        group: "Camisa Manga Longa em Malha PV Gola Olímpica",
        colorName: "Vermelha",
        swatch: "#C8102E",
        description:
          "Malha PV (poliéster e viscose) em manga longa com gola olímpica: leve, com boa transpiração e mais proteção para os braços no serviço externo.",
        hideInCatalog: true,
        style: "tshirt",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-gola-olimpica-vermelha.webp",
      },
      {
        name: "Camisa Polo Manga Longa em Malha PV Cinza Escuro",
        group: "Camisa Polo Manga Longa em Malha PV",
        colorName: "Cinza escuro",
        swatch: "#434348",
        description:
          "Mesma malha PV em manga longa, no acabamento polo com botões — um pouco mais apresentável, com a mesma leveza e transpiração.",
        hideInCatalog: true,
        style: "polo",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-polo-cinza-escuro.webp",
      },
      {
        name: "Camisa Polo Manga Longa em Malha PV Azul Escuro",
        group: "Camisa Polo Manga Longa em Malha PV",
        colorName: "Azul escuro",
        swatch: "#182645",
        description:
          "Mesma malha PV em manga longa, no acabamento polo com botões — um pouco mais apresentável, com a mesma leveza e transpiração.",
        hideInCatalog: true,
        style: "polo",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-polo-azul-escuro.webp",
      },
      {
        name: "Camisa Polo Manga Longa em Malha PV Cinza Claro",
        group: "Camisa Polo Manga Longa em Malha PV",
        colorName: "Cinza claro",
        swatch: "#9A9A9C",
        description:
          "Mesma malha PV em manga longa, no acabamento polo com botões — um pouco mais apresentável, com a mesma leveza e transpiração.",
        hideInCatalog: true,
        style: "polo",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-polo-cinza-claro.webp",
      },
      {
        name: "Camisa Polo Manga Longa em Malha PV Verde Escuro",
        group: "Camisa Polo Manga Longa em Malha PV",
        colorName: "Verde escuro",
        swatch: "#233429",
        description:
          "Mesma malha PV em manga longa, no acabamento polo com botões — um pouco mais apresentável, com a mesma leveza e transpiração.",
        hideInCatalog: true,
        style: "polo",
        photo: "/produtos/asg-zeladoria-manga-longa-malha-pv-polo-verde-escuro.webp",
      },
      {
        name: "Camisa Polo Masculina em Malha",
        colorName: "Verde escuro",
        swatch: "#1F4D36",
        gender: "masculino",
        description:
          "Mesma malha leve da camisa gola O, no acabamento polo com bolso — um pouco mais apresentável sem perder a mobilidade e a transpiração.",
        style: "polo",
        photo: "/produtos/asg-e-zeladoria-camisa-polo-masculina-verde-escuro.webp",
      },
      {
        name: "Jaleco Feminino Manga Curta com Detalhe",
        colorName: "Preto com vivo branco",
        swatch: "linear-gradient(135deg, #171717 50%, #F1F0EC 50%)",
        gender: "feminino",
        description:
          "Jaleco feminino com 3 bolsos, sendo 1 bordado, e vivo branco na gola, nas mangas e nos bolsos.",
        style: "social-feminina",
        photo: "/produtos/asg-jaleco-feminino-preto-com-03-bolsos-e-vivo-branco.webp",
      },
      {
        name: "Calça com Elástico Total e 4 Bolsos Preta (oxford)",
        group: "Calça com Elástico Total e 4 Bolsos",
        colorName: "Preta (oxford)",
        swatch: "#1A1A1A",
        description:
          "Em brim, oxford ou prada, com 4 bolsos, elástico total e cordão, dispensa cinto e garante mais conforto ao agachar.",
        style: "calca",
        photo: "/produtos/asg-e-zeladoria-calca-em-oxford.webp",
      },
      {
        name: "Calça com Elástico Total e 4 Bolsos Caqui (brim)",
        group: "Calça com Elástico Total e 4 Bolsos",
        colorName: "Caqui (brim)",
        swatch: "#8F907F",
        description:
          "Em brim, oxford ou prada, com 4 bolsos, elástico total e cordão, dispensa cinto e garante mais conforto ao agachar.",
        style: "calca",
        photo: "/produtos/asg-e-zeladoria-calca-com-elastico-total-e-4-bolsos-em-brim-caqui.webp",
      },
      {
        name: "Calça com Elástico Total e 4 Bolsos Preta (oxford ou prada)",
        group: "Calça com Elástico Total e 4 Bolsos",
        colorName: "Preta (oxford ou prada)",
        swatch: "#232323",
        description:
          "Em oxford ou prada, com 4 bolsos, elástico total e cordão, dispensa cinto e garante mais conforto ao agachar.",
        style: "calca",
        photo: "/produtos/asg-zeladoria-calca-elastico-oxford-prada-cordao.webp",
      },
      {
        name: "Jaqueta Forrada",
        colorName: "Preta",
        swatch: "#171717",
        description:
          "Para dias frios ou com muita ventania: jaqueta forrada com tecido 100% algodão, elástico na barra e punhos, com zíper e 2 bolsos laterais.",
        style: "jaqueta",
        photo: "/produtos/jaqueta-preta-forrada-100-algodao-2-bolsos.webp",
      },
      {
        name: "Meia em Algodão",
        colorName: "Branca ou preta",
        swatch: "linear-gradient(135deg, #F1F0EC 50%, #171717 50%)",
        description:
          "Meias de algodão nas cores branca e preta, para o uso diário com bota ou calçado de trabalho.",
        style: "meia",
        photo: "/produtos/asg-e-zeladoria-meias-de-algodao.webp",
      },
      {
        name: "Calçado Antiderrapante",
        description:
          "Calçado de alta durabilidade, solado com aderência, modelo BB65, leve e bonito.",
        style: "sapato",
        photo: "/produtos/calcado-softworks.png",
        colors: [preto, branco],
      },
      {
        name: "Bota Impermeável",
        description:
          "Cano alto e material impermeável para lavagem de garagem, escada e área comum — o pé fica seco no turno inteiro, com o mesmo solado antiderrapante.",
        style: "bota",
        photo: "/produtos/bota-borracha-cano-alto.png",
        colors: [preto, branco, verdeBandeira],
      },
      {
        name: "Bota de Borracha Cano Curto",
        description:
          "Impermeável e antiderrapante, para lavagem de garagem, calçada e área comum. Cano curto, mais leve no dia a dia.",
        style: "bota",
        photo: "/produtos/bota-borracha-cano-curto.png",
        colors: [preto, branco],
      },
      {
        name: "Bota em Couro",
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

/** Categorias do seletor de modelos, na ordem em que aparecem. */
export const modelCategories = [
  "Camisas",
  "Jalecos",
  "Calças",
  "Jaquetas e blazers",
  "Calçados e botas",
  "Acessórios",
] as const;

export type ModelCategory = (typeof modelCategories)[number];

/**
 * Categoria da peça: a declarada em `category` ou, sem ela, a deduzida pelo
 * começo do nome. O que não se encaixa em nada vai para "Acessórios".
 */
export function modelCategory(model: Pick<UniformModel, "name" | "group" | "category">): ModelCategory {
  if (model.category) return model.category;
  const title = modelTitle(model);
  if (/^(Camisa|Blusete)/.test(title)) return "Camisas";
  if (title.startsWith("Jaleco")) return "Jalecos";
  if (title.startsWith("Calça ")) return "Calças";
  if (/^(Jaqueta|Blazer)/.test(title)) return "Jaquetas e blazers";
  if (/^(Calçado|Bota)/.test(title)) return "Calçados e botas";
  return "Acessórios";
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

/** Título da peça, sem a cor: o nome da família (`group`) ou o próprio nome. */
export function modelTitle(model: Pick<UniformModel, "name" | "group">) {
  return model.group ?? model.name;
}

/** Título + cor, para legendas, textos alternativos e mensagens. */
export function modelLabel(model: Pick<UniformModel, "name" | "group" | "colorName">) {
  const title = modelTitle(model);
  return model.colorName ? `${title} — ${model.colorName}` : title;
}

/** Caminho da página de venda de um serviço. */
export function servicePath(slug: string) {
  return `/servicos/${slug}`;
}

/** Identificador de um modelo na URL: "Calça social masculina" → "calca-social-masculina". */
export function modelSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Página da linha já abrindo num modelo (`?modelo=`). Se o modelo ainda não
 * tem foto, a página ignora o parâmetro e abre no modelo padrão.
 */
export function modelPath(slug: string, modelName: string) {
  return `${servicePath(slug)}?modelo=${modelSlug(modelName)}`;
}

/* Ícones auxiliares reexportados para as seções que montam listas próprias. */
export const serviceListIcons = {
  pieces: Shirt,
  customizations: Palette,
  fit: Ruler,
  checklist: ClipboardCheck,
  alert: BellRing,
} satisfies Record<string, LucideIcon>;
