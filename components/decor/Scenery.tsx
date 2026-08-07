import { cn } from "@/lib/utils";

/**
 * Silhueta de montanhas com crista dourada — eco direto da logo.
 */
export function MountainScape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 260"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("pointer-events-none w-full", className)}
    >
      <defs>
        <linearGradient id="mtn-emerald" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A7A44" />
          <stop offset="55%" stopColor="#04502C" />
          <stop offset="100%" stopColor="#01230F" />
        </linearGradient>
        <linearGradient id="mtn-ridge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#846A1C" stopOpacity="0" />
          <stop offset="45%" stopColor="#E7D5A0" />
          <stop offset="100%" stopColor="#846A1C" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M0 260 L250 96 L400 175 L560 60 L760 200 L940 110 L1130 190 L1290 120 L1440 260 Z"
        fill="url(#mtn-emerald)"
        opacity="0.55"
      />
      <path
        d="M0 260 L230 140 L430 220 L620 118 L820 232 L1010 156 L1220 236 L1440 168 L1440 260 Z"
        fill="#01230F"
      />
      <path
        d="M0 260 L230 140 L430 220 L620 118 L820 232 L1010 156 L1220 236 L1440 168"
        fill="none"
        stroke="url(#mtn-ridge)"
        strokeWidth="2"
      />
    </svg>
  );
}

/**
 * Sol raiado — versão vetorial do símbolo da logo, em ouro metálico.
 */
export function SunBurst({
  className,
  rays = 16,
}: {
  className?: string;
  rays?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      <defs>
        <radialGradient id="sun-gold" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#EFE2B6" />
          <stop offset="60%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#7E6519" />
        </radialGradient>
      </defs>

      <g fill="url(#sun-gold)">
        {Array.from({ length: rays }).map((_, i) => (
          <polygon
            key={i}
            points="100,2 106,44 94,44"
            transform={`rotate(${(360 / rays) * i} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="52" />
      </g>
    </svg>
  );
}
