import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicePage } from "@/components/ServicePage";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

/** Gera /servicos/portaria, /servicos/zeladoria e /servicos/asg no build. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getService(params.slug);

  if (!service) return {};

  return {
    title: `Uniformes para ${service.title}`,
    description: service.shortDescription,
    alternates: { canonical: `/servicos/${service.slug}` },
    openGraph: {
      title: `Uniformes para ${service.title} | ${site.name}`,
      description: service.shortDescription,
      type: "article",
      locale: "pt_BR",
      siteName: site.name,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);

  if (!service) notFound();

  return <ServicePage service={service} />;
}
