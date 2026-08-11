import { cn } from "@/lib/utils";

type Style = "social" | "polo" | "tshirt";

/**
 * Mockup vetorial da peça — é o que o cliente vê mudar de cor no visualizador
 * da página de serviço.
 *
 * Substituir por foto: quando houver material fotográfico, troque este
 * componente por um `next/image` por cor no `ServiceShowcase`. A API
 * (`style` + `body`/`accent`) foi mantida simples de propósito.
 */
export function UniformMockup({
  style = "polo",
  body,
  accent,
  className,
  label,
}: {
  style?: Style;
  /** Cor principal do corpo e das mangas. */
  body: string;
  /** Cor de gola, punhos e carcela. */
  accent: string;
  className?: string;
  /** Descrição para leitores de tela (ex.: "Polo piquê na cor azul royal"). */
  label: string;
}) {
  const longSleeve = style === "social";

  return (
    <svg
      viewBox="0 0 320 360"
      role="img"
      aria-label={label}
      className={cn("w-full", className)}
    >
      <defs>
        {/* Sombreado lateral — dá volume sem depender de foto. */}
        <linearGradient id={`shade-${style}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      <g>
        {/* Mangas */}
        {longSleeve ? (
          <>
            <path
              d="M112 42 L58 66 L26 152 L30 250 L74 258 L88 156 Z"
              fill={body}
            />
            <path
              d="M208 42 L262 66 L294 152 L290 250 L246 258 L232 156 Z"
              fill={body}
            />
            {/* Punhos */}
            <path d="M28 236 L74 244 L74 262 L30 254 Z" fill={accent} />
            <path d="M292 236 L246 244 L246 262 L290 254 Z" fill={accent} />
          </>
        ) : (
          <>
            <path d="M112 42 L54 70 L28 150 L76 170 L92 128 Z" fill={body} />
            <path d="M208 42 L266 70 L292 150 L244 170 L228 128 Z" fill={body} />
          </>
        )}

        {/* Corpo */}
        <path
          d="M112 42 L92 120 L92 322 Q160 336 228 322 L228 120 L208 42 Q160 78 112 42 Z"
          fill={body}
        />

        {/* Gola / decote */}
        {style === "tshirt" ? (
          <path
            d="M112 42 Q160 84 208 42 Q188 34 160 34 Q132 34 112 42 Z"
            fill={accent}
          />
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

        {/* Bolso (apenas na camisa social) */}
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

        {/* Aplicação do brasão — representa o bordado do condomínio */}
        <g opacity="0.9">
          <circle cx="206" cy="150" r="17" fill="#C9A227" opacity="0.28" />
          <circle
            cx="206"
            cy="150"
            r="17"
            fill="none"
            stroke="#C9A227"
            strokeWidth="2"
          />
          <path
            d="M196 156 L206 142 L216 156 Z"
            fill="#C9A227"
            opacity="0.9"
          />
        </g>

        {/* Barra e volume */}
        <path
          d="M92 300 Q160 314 228 300 L228 322 Q160 336 92 322 Z"
          fill="#000000"
          opacity="0.12"
        />
        <path
          d="M112 42 L92 120 L92 322 Q160 336 228 322 L228 120 L208 42 Q160 78 112 42 Z"
          fill={`url(#shade-${style})`}
        />
      </g>
    </svg>
  );
}
