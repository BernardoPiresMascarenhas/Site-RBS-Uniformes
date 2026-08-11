import { About } from "@/components/sections/About";
import { Catalog } from "@/components/sections/Catalog";
import { Contact } from "@/components/sections/Contact";
import { Differentials } from "@/components/sections/Differentials";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Sectors } from "@/components/sections/Sectors";
import { Stats } from "@/components/sections/Stats";
import { Visit } from "@/components/sections/Visit";
import { SiteShell } from "@/components/SiteShell";

export function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Stats />
      <Catalog />
      <About />
      <Differentials />
      <Process />
      <Sectors />
      <Faq />
      <Visit />
      <Contact />
    </SiteShell>
  );
}
