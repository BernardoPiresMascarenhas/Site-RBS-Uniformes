import type { ReactNode } from "react";

import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  tone = "default",
  surface,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "alt";
  /** Troca o jogo de tokens da seção, que intercala blocos escuros e claros. */
  surface?: "light" | "dark";
}) {
  return (
    <section
      id={id}
      data-surface={surface}
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-24 lg:py-28",
        // com `surface` definido a seção pinta o próprio fundo, senão herda
        surface ? (tone === "alt" ? "bg-brand-bg-alt" : "bg-brand-bg") : tone === "alt" && "bg-brand-bg-alt",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <span className={theme.ui.eyebrow}>{eyebrow}</span> : null}
      <h2 className={cn(theme.ui.heading, "max-w-3xl")}>{title}</h2>
      <span
        className={cn(theme.ui.divider, "max-w-xs")}
        aria-hidden="true"
      />
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
