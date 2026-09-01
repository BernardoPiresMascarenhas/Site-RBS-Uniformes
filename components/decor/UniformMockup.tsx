import type { UniformStyle } from "@/lib/services";
import { cn } from "@/lib/utils";

/**
 * Mockup vetorial da peça — é o que o cliente vê mudar de cor no visualizador
 * da página de serviço.
 *
 * Cada valor de `style` desenha uma silhueta diferente (camisa, calça, jaqueta,
 * calçado, meia, gravata, cinto). O catálogo de estilos mora em
 * `UniformStyle`, em `lib/services.ts`.
 *
 * Substituir por foto: quando houver material fotográfico, basta soltar o
 * arquivo em `public/produtos/` — o `ServiceShowcase` troca sozinho. A API
 * (`style` + `body`/`accent`) foi mantida simples de propósito.
 */

/* ---------------------------------------------------------------------------
 * Caminhos reaproveitados entre as camisas
 * ------------------------------------------------------------------------- */

const CORPO_RETO =
  "M112 42 L92 120 L92 322 Q160 336 228 322 L228 120 L208 42 Q160 78 112 42 Z";
/** Mesma camisa com marcação de cintura — usada na modelagem feminina. */
const CORPO_AJUSTADO =
  "M114 44 L96 116 L110 206 Q96 270 100 322 Q160 336 220 322 Q224 270 210 206 L224 116 L206 44 Q160 78 114 44 Z";

const MANGA_LONGA_ESQ = "M112 42 L58 66 L26 152 L30 250 L74 258 L88 156 Z";
const MANGA_LONGA_DIR = "M208 42 L262 66 L294 152 L290 250 L246 258 L232 156 Z";
const PUNHO_ESQ = "M28 236 L74 244 L74 262 L30 254 Z";
const PUNHO_DIR = "M292 236 L246 244 L246 262 L290 254 Z";
const MANGA_CURTA_ESQ = "M112 42 L54 70 L28 150 L76 170 L92 128 Z";
const MANGA_CURTA_DIR = "M208 42 L266 70 L292 150 L244 170 L228 128 Z";

/** Aplicação do brasão do condomínio — representa o bordado no peito. */
function Brasao({ cx, cy, r = 17 }: { cx: number; cy: number; r?: number }) {
  return (
    <g opacity="0.9">
      <circle cx={cx} cy={cy} r={r} fill="#C9A227" opacity="0.28" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#C9A227" strokeWidth="2" />
      <path
        d={`M${cx - 10} ${cy + 6} L${cx} ${cy - 8} L${cx + 10} ${cy + 6} Z`}
        fill="#C9A227"
        opacity="0.9"
      />
    </g>
  );
}

export function UniformMockup({
  style = "polo",
  body,
  accent,
  className,
  label,
}: {
  style?: UniformStyle;
  /** Cor principal da peça. */
  body: string;
  /** Cor de golas, punhos, cós, solado e demais detalhes. */
  accent: string;
  className?: string;
  /** Descrição para leitores de tela (ex.: "Bota impermeável na cor preta"). */
  label: string;
}) {
  // o gradiente é idêntico entre as peças; o id só muda por estilo para não
  // repetir a mesma definição em cada mockup da página
  const shade = `shade-${style}`;
  const sombra = `url(#${shade})`;

  return (
    <svg
      viewBox="0 0 320 360"
      role="img"
      aria-label={label}
      className={cn("w-full", className)}
    >
      <defs>
        {/* Sombreado lateral — dá volume sem depender de foto. */}
        <linearGradient id={shade} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {desenhar({ style, body, accent, sombra })}
    </svg>
  );
}

type Desenho = {
  style: UniformStyle;
  body: string;
  accent: string;
  /** `url(#...)` do gradiente de volume. */
  sombra: string;
};

function desenhar(props: Desenho) {
  switch (props.style) {
    case "calca":
    case "calca-feminina":
      return <Calca {...props} />;
    case "jaqueta":
      return <Jaqueta {...props} />;
    case "sapato":
      return <Sapato {...props} />;
    case "meia":
      return <Meia {...props} />;
    case "gravata":
      return <Gravata {...props} />;
    case "cinto":
      return <Cinto {...props} />;
    case "bone":
      return <Bone {...props} />;
    case "bota":
      return <Bota {...props} />;
    default:
      return <Camisa {...props} />;
  }
}

/* ---------------------------------------------------------------------------
 * Camisas: social masculina e feminina, polo e camiseta
 * ------------------------------------------------------------------------- */

function Camisa({ style, body, accent, sombra }: Desenho) {
  const feminina = style === "social-feminina";
  const social = style === "social" || feminina;
  const corpo = feminina ? CORPO_AJUSTADO : CORPO_RETO;

  return (
    <g>
      {/* Mangas — longas na social, curtas na polo e na camiseta */}
      {social ? (
        <>
          <path d={MANGA_LONGA_ESQ} fill={body} />
          <path d={MANGA_LONGA_DIR} fill={body} />
          <path d={PUNHO_ESQ} fill={accent} />
          <path d={PUNHO_DIR} fill={accent} />
        </>
      ) : (
        <>
          <path d={MANGA_CURTA_ESQ} fill={body} />
          <path d={MANGA_CURTA_DIR} fill={body} />
        </>
      )}

      <path d={corpo} fill={body} />

      {/* Gola / decote */}
      {style === "tshirt" ? (
        <path
          d="M112 42 Q160 84 208 42 Q188 34 160 34 Q132 34 112 42 Z"
          fill={accent}
        />
      ) : feminina ? (
        <>
          {/* Decote em V com lapelas — modelagem feminina */}
          <path d="M114 44 L160 100 L134 110 L106 60 Z" fill={accent} />
          <path d="M206 44 L160 100 L186 110 L214 60 Z" fill={accent} />
          <rect x="153" y="100" width="14" height="222" fill={accent} opacity="0.5" />
          {[128, 158, 188].map((y) => (
            <circle key={y} cx="160" cy={y} r="4" fill="#F5F1E6" opacity="0.85" />
          ))}
          {/* Pences: a marcação que diferencia a modelagem feminina */}
          <path
            d="M124 150 Q120 208 128 258"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            opacity="0.16"
          />
          <path
            d="M196 150 Q200 208 192 258"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            opacity="0.16"
          />
        </>
      ) : (
        <>
          {/* Carcela com botões */}
          <rect
            x="152"
            y="60"
            width="16"
            height={style === "social" ? "262" : "96"}
            fill={accent}
            opacity="0.55"
          />
          {/* Colarinho */}
          <path d="M118 40 L160 74 L128 92 L104 58 Z" fill={accent} />
          <path d="M202 40 L160 74 L192 92 L216 58 Z" fill={accent} />
          {[86, 116, 146].map((y) => (
            <circle key={y} cx="160" cy={y} r="4" fill="#F5F1E6" opacity="0.85" />
          ))}
        </>
      )}

      {/* Bolso — só na camisa social masculina */}
      {style === "social" ? (
        <rect
          x="106"
          y="150"
          width="46"
          height="52"
          rx="3"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          opacity="0.7"
        />
      ) : null}

      <Brasao cx={206} cy={150} />

      {/* Barra e volume */}
      <path
        d={
          feminina
            ? "M100 300 Q160 314 220 300 L220 322 Q160 336 100 322 Z"
            : "M92 300 Q160 314 228 300 L228 322 Q160 336 92 322 Z"
        }
        fill="#000000"
        opacity="0.12"
      />
      <path d={corpo} fill={sombra} />
    </g>
  );
}

/* ---------------------------------------------------------------------------
 * Calça social
 * ------------------------------------------------------------------------- */

function Calca({ style, body, accent, sombra }: Desenho) {
  const feminina = style === "calca-feminina";

  // a modelagem feminina sai do mesmo cós, com quadril marcado e perna mais
  // afunilada da coxa para baixo
  const pernas = feminina
    ? "M104 64 L216 64 Q226 120 202 344 L170 344 L160 182 L150 344 L118 344 Q94 120 104 64 Z"
    : "M98 64 L222 64 L216 344 L172 344 L160 170 L148 344 L104 344 Z";

  const cos = feminina
    ? { x: 102, largura: 116 }
    : { x: 96, largura: 128 };

  return (
    <g>
      <path d={pernas} fill={body} />

      {/* Vinco central de cada perna — a marca da calça social */}
      <path
        d="M128 72 L122 342"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        opacity="0.18"
      />
      <path
        d="M192 72 L198 342"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        opacity="0.18"
      />

      {/* Bolsos embutidos */}
      <path
        d="M106 74 Q118 100 136 106"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        opacity="0.65"
      />
      <path
        d="M214 74 Q202 100 184 106"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        opacity="0.65"
      />

      <path d={pernas} fill={sombra} />

      {/* Cós, passantes e fechamento */}
      <rect x={cos.x} y="38" width={cos.largura} height="28" fill={accent} />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={cos.x + 10 + i * ((cos.largura - 28) / 3)}
          y="34"
          width="7"
          height="36"
          rx="2"
          fill="#000000"
          opacity="0.28"
        />
      ))}
      <path
        d="M160 68 L160 108"
        fill="none"
        stroke="#000000"
        strokeWidth="3"
        opacity="0.22"
      />
      <circle cx="160" cy="52" r="4" fill="#F5F1E6" opacity="0.8" />
    </g>
  );
}

/* ---------------------------------------------------------------------------
 * Jaqueta
 * ------------------------------------------------------------------------- */

function Jaqueta({ body, accent, sombra }: Desenho) {
  return (
    <g>
      <path d={MANGA_LONGA_ESQ} fill={body} />
      <path d={MANGA_LONGA_DIR} fill={body} />
      {/* Punhos em ribana */}
      <path d={PUNHO_ESQ} fill={accent} />
      <path d={PUNHO_DIR} fill={accent} />

      <path d={CORPO_RETO} fill={body} />

      {/* Gola alta */}
      <path d="M112 42 Q160 76 208 42 L204 26 Q160 58 116 26 Z" fill={accent} />

      {/* Zíper central */}
      <rect x="155" y="46" width="10" height="262" fill={accent} />
      <rect x="157" y="46" width="6" height="262" fill="#000000" opacity="0.25" />
      <circle cx="160" cy="300" r="6" fill="#C9A227" opacity="0.85" />

      {/* Bolsos embutidos na altura da cintura */}
      <path
        d="M104 226 L138 240"
        stroke={accent}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M216 226 L182 240"
        stroke={accent}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.75"
      />

      <Brasao cx={206} cy={150} />

      {/* Barra em ribana */}
      <path
        d="M92 292 Q160 306 228 292 L228 322 Q160 336 92 322 Z"
        fill={accent}
      />
      <path d={CORPO_RETO} fill={sombra} />
    </g>
  );
}

/* ---------------------------------------------------------------------------
 * Calçado social
 * ------------------------------------------------------------------------- */

const SAPATO_CABEDAL =
  "M52 234 Q50 212 72 202 L130 180 Q152 172 170 158 L198 136 Q216 124 234 132 Q254 142 258 172 L262 232 Z";

function Sapato({ body, accent, sombra }: Desenho) {
  return (
    <g>
      {/* Solado e salto */}
      <path
        d="M44 252 Q42 238 60 234 L246 228 Q266 226 268 244 L268 254 Q268 266 252 266 L58 266 Q44 266 44 252 Z"
        fill={accent}
      />
      <path
        d="M44 250 L268 244"
        stroke="#000000"
        strokeWidth="3"
        opacity="0.25"
      />

      <path d={SAPATO_CABEDAL} fill={body} />

      {/* Peito do pé com cadarço, recortados no contorno do cabedal */}
      <clipPath id="sapato-cabedal">
        <path d={SAPATO_CABEDAL} />
      </clipPath>
      <g clipPath="url(#sapato-cabedal)">
        <path d="M182 148 L236 178 L216 206 L166 172 Z" fill={accent} opacity="0.5" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${190 + i * 12} ${152 + i * 9} L${212 + i * 12} ${176 + i * 9}`}
            stroke="#F5F1E6"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
        ))}
      </g>

      {/* Costura da biqueira */}
      <path
        d="M104 190 Q114 214 112 236"
        fill="none"
        stroke="#000000"
        strokeWidth="3"
        opacity="0.28"
      />
      {/* Traseira do cano */}
      <path
        d="M244 138 Q258 158 260 196"
        fill="none"
        stroke="#000000"
        strokeWidth="3"
        opacity="0.22"
      />

      <path d={SAPATO_CABEDAL} fill={sombra} />
    </g>
  );
}

/* ---------------------------------------------------------------------------
 * Bota de cano alto
 * ------------------------------------------------------------------------- */

/** Mesma orientação do calçado: bico à esquerda, cano subindo à direita. */
const BOTA_CANO =
  "M166 80 L246 80 L252 248 L52 248 Q34 244 36 224 Q44 202 82 194 L146 176 Q166 168 166 142 Z";
const BOTA_SOLADO =
  "M36 250 L248 244 Q260 244 260 257 L260 263 Q260 275 246 275 L50 275 Q36 275 35 263 Q34 252 36 250 Z";

function Bota({ body, accent, sombra }: Desenho) {
  return (
    <g>
      <path d={BOTA_SOLADO} fill={accent} />
      {/* Ranhuras do solado antiderrapante */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M${58 + i * 28} 252 L${58 + i * 28} 274`}
          stroke="#000000"
          strokeWidth="4"
          opacity="0.28"
        />
      ))}

      <path d={BOTA_CANO} fill={body} />

      {/* Costura do peito do pé e reforço do bico */}
      <clipPath id="bota-cano">
        <path d={BOTA_CANO} />
      </clipPath>
      <g clipPath="url(#bota-cano)">
        <path
          d="M88 200 Q104 224 102 248"
          fill="none"
          stroke="#000000"
          strokeWidth="3"
          opacity="0.25"
        />
        <path
          d="M166 150 Q150 186 150 248"
          fill="none"
          stroke="#000000"
          strokeWidth="3"
          opacity="0.2"
        />
      </g>

      <path d={BOTA_CANO} fill={sombra} />

      {/* Cano superior e alça de calçar */}
      <path d="M164 76 L248 76 L250 108 L164 108 Z" fill={accent} />
      <path
        d="M250 84 Q268 88 266 112"
        fill="none"
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ---------------------------------------------------------------------------
 * Meia social
 * ------------------------------------------------------------------------- */

/** Cano na vertical e pé voltado para a esquerda, com sola embaixo. */
const MEIA =
  "M118 64 L202 64 L202 220 Q202 258 178 272 L112 292 Q78 302 72 278 Q68 256 96 250 L114 228 Q118 222 118 210 Z";

function Meia({ body, accent, sombra }: Desenho) {
  return (
    <g>
      <path d={MEIA} fill={body} />

      {/* Reforços de calcanhar e ponta — recortados no contorno da meia */}
      <clipPath id="meia-corpo">
        <path d={MEIA} />
      </clipPath>
      <g clipPath="url(#meia-corpo)" opacity="0.55">
        <ellipse cx="192" cy="244" rx="32" ry="40" fill={accent} />
        <ellipse cx="86" cy="276" rx="32" ry="28" fill={accent} />
      </g>

      <path d={MEIA} fill={sombra} />

      {/* Punho canelado */}
      <rect x="116" y="36" width="88" height="32" fill={accent} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${126 + i * 14} 36 L${126 + i * 14} 68`}
          stroke="#000000"
          strokeWidth="2"
          opacity="0.2"
        />
      ))}
    </g>
  );
}

/* ---------------------------------------------------------------------------
 * Gravata
 * ------------------------------------------------------------------------- */

const GRAVATA_LAMINA = "M134 82 L186 82 L198 252 L160 304 L122 252 Z";

function Gravata({ body, accent, sombra }: Desenho) {
  return (
    <g>
      {/* Pontas do colarinho, para dar a leitura da peça */}
      <path d="M120 30 L156 62 L134 72 L112 44 Z" fill="#FFFFFF" opacity="0.16" />
      <path d="M200 30 L164 62 L186 72 L208 44 Z" fill="#FFFFFF" opacity="0.16" />

      <path d={GRAVATA_LAMINA} fill={body} />

      {/* Listras diagonais, cortadas no contorno da lâmina */}
      <clipPath id="gravata-lamina">
        <path d={GRAVATA_LAMINA} />
      </clipPath>
      <g clipPath="url(#gravata-lamina)">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M100 ${104 + i * 44} L210 ${64 + i * 44}`}
            stroke={accent}
            strokeWidth="12"
            opacity="0.55"
          />
        ))}
      </g>

      <path d={GRAVATA_LAMINA} fill={sombra} />

      {/* Nó */}
      <path d="M136 38 L184 38 L192 76 L160 92 L128 76 Z" fill={body} />
      <path d="M136 38 L184 38 L192 76 L160 92 L128 76 Z" fill="#000000" opacity="0.18" />
      <path d="M136 38 L184 38 L192 76 L160 92 L128 76 Z" fill={sombra} />
    </g>
  );
}

/* ---------------------------------------------------------------------------
 * Boné
 * ------------------------------------------------------------------------- */

/** Boné de perfil: copa à direita, aba projetando para a frente (esquerda). */
const BONE_COPA = "M102 240 Q98 132 176 132 Q248 138 248 240 Z";
const BONE_ABA =
  "M104 224 Q54 228 28 250 Q52 270 106 264 Q136 260 142 244 Q130 228 104 224 Z";

function Bone({ body, accent, sombra }: Desenho) {
  return (
    <g>
      <path d={BONE_COPA} fill={body} />

      {/* Costuras dos gomos e ilhoses de ventilação */}
      <clipPath id="bone-copa">
        <path d={BONE_COPA} />
      </clipPath>
      <g clipPath="url(#bone-copa)">
        <path
          d="M124 238 Q130 152 176 134"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          opacity="0.55"
        />
        <path
          d="M214 238 Q210 154 178 134"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          opacity="0.55"
        />
        <circle cx="200" cy="186" r="4" fill="#000000" opacity="0.35" />
        <circle cx="230" cy="200" r="4" fill="#000000" opacity="0.35" />
      </g>

      {/* Bordado na frente do boné */}
      <Brasao cx={152} cy={196} r={15} />

      <path d={BONE_COPA} fill={sombra} />

      {/* Botão do topo */}
      <circle cx="178" cy="133" r="8" fill={accent} />

      {/* Aba */}
      <path d={BONE_ABA} fill={accent} />
      <path
        d="M44 252 Q82 240 122 248"
        fill="none"
        stroke="#000000"
        strokeWidth="3"
        opacity="0.28"
      />
      <path d={BONE_ABA} fill={sombra} />
    </g>
  );
}

/* ---------------------------------------------------------------------------
 * Cinto
 * ------------------------------------------------------------------------- */

/**
 * Tira dobrada: sai da fivela, contorna à direita e volta com a ponta furada.
 * Os dois arcos da dobra têm raios diferentes (50 e 18) para a tira manter a
 * mesma espessura na curva — por isso o ponto de controle externo fica fora do
 * viewBox, o que só afeta a curvatura.
 */
const CINTO_TIRA =
  "M96 138 L240 138 Q340 188 240 238 L84 238 L52 222 L84 206 L240 206 Q276 188 240 170 L96 170 Z";

function Cinto({ body, accent, sombra }: Desenho) {
  return (
    <g>
      <path d={CINTO_TIRA} fill={body} />
      <path
        d={CINTO_TIRA}
        fill="none"
        stroke={accent}
        strokeWidth="3"
        opacity="0.55"
      />

      {/* Furos de regulagem */}
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={100 + i * 24}
          cy="222"
          r="5"
          fill="#000000"
          opacity="0.45"
        />
      ))}

      <path d={CINTO_TIRA} fill={sombra} />

      {/* Fivela metálica, centrada na altura da tira de cima */}
      <rect
        x="34"
        y="124"
        width="68"
        height="60"
        rx="10"
        fill="none"
        stroke="#C9A227"
        strokeWidth="10"
      />
      <rect x="58" y="150" width="52" height="9" rx="4" fill="#C9A227" />
    </g>
  );
}
