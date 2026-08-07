import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * A logo é usada solta, sem moldura: o arquivo `-transparente` tem o fundo
 * recortado, então ela se apoia direto no fundo da navbar/rodapé.
 * O tamanho é controlado pela altura (`sizeClassName`), com a largura em auto
 * para respeitar a proporção da arte.
 */
export function Logo({
  className,
  sizeClassName = "h-16 sm:h-20",
  showWordmark = false,
}: {
  className?: string;
  sizeClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label={`${site.name} — página inicial`}
    >
      <Image
        src={theme.logo.src}
        alt={theme.logo.alt}
        width={theme.logo.width}
        height={theme.logo.height}
        priority
        className={cn(
          "w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]",
          sizeClassName,
        )}
      />

      {/* A arte já traz "RBS UNIFORMES"; o wordmark ao lado é opcional. */}
      {showWordmark ? (
        <span className="hidden flex-col leading-none sm:flex">
          <span className="font-display text-lg font-bold tracking-[0.22em] text-brand-heading">
            RBS
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.35em] text-brand-muted">
            Uniformes
          </span>
        </span>
      ) : null}
    </Link>
  );
}
