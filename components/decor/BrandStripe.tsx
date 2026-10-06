import { cn } from "@/lib/utils";

/**
 * Filete com as três cores da logo em blocos chapados (sem degradê). As
 * larguras são proporções; a altura e a posição vêm de `className`.
 */
export function BrandStripe({
  className,
  green = 65,
  yellow = 22,
  red = 13,
  greenClassName = "bg-rbs-green",
}: {
  className?: string;
  green?: number;
  yellow?: number;
  red?: number;
  /** Tom do verde — mais claro sobre o rodapé verde-escuro. */
  greenClassName?: string;
}) {
  return (
    <span aria-hidden="true" className={cn("flex w-full", className)}>
      <span className={greenClassName} style={{ flexGrow: green }} />
      <span className="bg-rbs-yellow" style={{ flexGrow: yellow }} />
      <span className="bg-rbs-red" style={{ flexGrow: red }} />
    </span>
  );
}
