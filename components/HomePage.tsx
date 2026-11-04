import { About } from "@/components/sections/About";
import { Catalog } from "@/components/sections/Catalog";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { Differentials } from "@/components/sections/Differentials";
import { Faq } from "@/components/sections/Faq";
import { HeroV15 } from "@/components/sections/HeroV15";
import { Process } from "@/components/sections/Process";
import { Sectors } from "@/components/sections/Sectors";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Visit } from "@/components/sections/Visit";
import { SiteShell } from "@/components/SiteShell";
import type { ReactNode } from "react";

/** `hero` permite testar outra versão (ver /preview/hero-v2) sem mexer na home. */
export function HomePage({ hero = <HeroV15 /> }: { hero?: ReactNode }) {
  return (
    <SiteShell>
      {hero}
      <Stats />
      <Catalog />
      <About />
      <Differentials />
      <Process />
      <Sectors />
      <Clients />
      <Testimonials />
      <Faq />
      <Visit />
      <Contact />
    </SiteShell>
  );
}
