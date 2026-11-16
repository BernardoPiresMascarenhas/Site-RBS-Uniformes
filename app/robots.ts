import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // só o endpoint do formulário; os rascunhos em /preview não são bloqueados aqui
        // de propósito: precisam ser rastreáveis para o Google ler o `noindex` deles
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
