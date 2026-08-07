import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Botão da marca: cantos retos, superfície dourada com brilho e borda metálica.
 *
 * O primário lê `--btn-primary-bg`/`--btn-primary-fg`, que mudam com a
 * superfície: ouro sobre preto na seção escura, grafite com letra champanhe
 * na seção clara.
 */
const tones: Record<Tone, string> = {
  primary:
    "bg-[image:var(--btn-primary-bg)] text-[rgb(var(--btn-primary-fg))] shadow-brand hover:brightness-110",
  secondary:
    "border border-brand-accent/60 bg-transparent text-brand-accent hover:border-brand-accent hover:bg-brand-accent/10",
  ghost: "text-brand-heading hover:text-brand-accent",
};

const shape = "rounded-brand font-display uppercase tracking-[0.18em]";

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
    "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300",
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
