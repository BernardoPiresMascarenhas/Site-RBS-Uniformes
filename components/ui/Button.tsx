import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Botão da marca. As cores saem dos tokens da superfície: na seção clara o
 * primário é verde com letra branca; no verde escuro ele inverte para branco
 * com letra verde — sem precisar de variante própria.
 */
const tones: Record<Tone, string> = {
  primary:
    "border border-transparent bg-brand-primary text-brand-on-primary hover:bg-brand-primary-hover",
  secondary:
    "border border-brand-primary/80 bg-transparent text-brand-primary hover:border-brand-primary hover:bg-brand-primary/[0.08]",
  ghost: "text-brand-heading hover:bg-brand-green-soft hover:text-brand-green",
  /**
   * Amarelo da logo com letra verde profunda. Uso pontual — o CTA principal
   * do hero —, nunca como botão padrão.
   */
  accent:
    "border border-transparent bg-rbs-yellow text-rbs-green-deep hover:bg-rbs-yellow-hover",
};

const shape = "rounded-brand font-display font-semibold";

interface BaseProps {
  tone?: Tone;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

type StyleProps = Omit<BaseProps, "children" | "icon">;

function classes({ tone = "primary", size = "md", className }: StyleProps) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors duration-200",
    "disabled:cursor-not-allowed disabled:opacity-60",
    shape,
    sizes[size],
    tones[tone],
    className,
  );
}

type ButtonProps = BaseProps & ComponentPropsWithoutRef<"button">;

export function Button({
  tone,
  size,
  className,
  children,
  icon,
  ...rest
}: ButtonProps) {
  return (
    <button className={classes({ tone, size, className })} {...rest}>
      {children}
      {icon}
    </button>
  );
}

type ButtonLinkProps = BaseProps & {
  href: string;
  external?: boolean;
};

export function ButtonLink({
  tone,
  size,
  className,
  children,
  icon,
  href,
  external,
}: ButtonLinkProps) {
  const cls = classes({ tone, size, className });

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}
