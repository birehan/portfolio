import { getAllProjects, getFeaturedClientProjects } from "@/lib/content";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Services } from "@/components/sections/services";
import { SideProjects } from "@/components/sections/side-projects";
import { Achievements } from "@/components/sections/achievements";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  const featured = getFeaturedClientProjects();
  const personal = getAllProjects("personal");

  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedWork projects={featured} />
      <Experience />
      <Skills />
      <Services />
      <SideProjects projects={personal} />
      <Achievements />
      <About />
      <Contact />
    </>
  );
}
