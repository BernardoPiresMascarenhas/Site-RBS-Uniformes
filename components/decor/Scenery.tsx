import { cn } from "@/lib/utils";

/**
 * Paisagem da logo em versão chapada: sol amarelo, prédios neutros e
 * montanhas verdes, com um toque de vermelho. As cores vêm da paleta da
 * marca (classes `fill-*`), sem brilho nem degradê.
 *
 * Três camadas: montanha de fundo, sol + prédios e montanha da frente. As
 * montanhas esticam com a largura da faixa (`preserveAspectRatio="none"`);
 * sol e prédios ficam num SVG próprio com proporção travada — senão o sol
 * viraria uma elipse — e se apoiam no vale da montanha da frente (~85%).
 */
export function MountainScape({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)}>
      {/* Montanha de fundo */}
      <svg
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0 260 L250 96 L400 175 L560 60 L760 200 L940 110 L1130 190 L1290 120 L1440 260 Z"
          className="fill-rbs-green-light"
        />
      </svg>

      {/* Sol + prédios — atrás das montanhas, à direita */}
      <svg
        viewBox="0 0 260 140"
        preserveAspectRatio="xMidYMax meet"
        className="absolute bottom-[4%] right-[3%] aspect-[260/140] h-[115%] sm:right-[5%]"
      >
        {/* raios */}
        <g className="fill-rbs-yellow">
          {Array.from({ length: 12 }).map((_, i) => (
            <polygon
              key={i}
              points="130,8 135,30 125,30"
              transform={`rotate(${(360 / 12) * i} 130 72)`}
            />
          ))}
        </g>
        <circle cx="130" cy="72" r="30" className="fill-rbs-yellow" />

        {/* prédios */}
        <rect x="40" y="58" width="34" height="82" className="fill-brand-surface stroke-brand-border" strokeWidth="2" />
        <rect x="74" y="80" width="24" height="60" className="fill-brand-border" />
        <rect x="178" y="48" width="32" height="92" className="fill-brand-surface stroke-brand-border" strokeWidth="2" />
        <rect x="210" y="74" width="22" height="66" className="fill-brand-border" />
        {/* janelas */}
        <g className="fill-brand-border">
          {[70, 84, 98, 112].map((y) => (
            <g key={y}>
              <rect x="47" y={y} width="7" height="5" />
              <rect x="60" y={y} width="7" height="5" />
              <rect x="185" y={y - 8} width="7" height="5" />
              <rect x="197" y={y - 8} width="7" height="5" />
            </g>
          ))}
        </g>
        {/* toques vermelhos: antena e uma janela acesa */}
        <rect x="192" y="36" width="4" height="12" className="fill-rbs-red" />
        <rect x="60" y="84" width="7" height="5" className="fill-rbs-red" />
      </svg>

      {/* Montanha da frente */}
      <svg
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0 260 L230 140 L430 220 L620 118 L820 232 L1010 156 L1220 236 L1440 168 L1440 260 Z"
          className="fill-rbs-green"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
