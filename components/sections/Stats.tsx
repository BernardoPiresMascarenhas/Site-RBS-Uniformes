import { Container } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Stats() {
  return (
    <section className="relative border-y border-premium-gold/20 bg-premium-ink">
      <Container>
        <dl className="grid grid-cols-2 divide-brand-border lg:grid-cols-4 lg:divide-x">
          {site.stats.map((stat) => (
            <div key={stat.label} className="px-2 py-8 text-center sm:py-10">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  className={cn(
                    "block text-3xl sm:text-4xl lg:text-5xl",
                    theme.ui.statValue,
                  )}
                >
                  {stat.value}
                </span>
                <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-brand-muted sm:text-sm sm:tracking-[0.12em]">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
