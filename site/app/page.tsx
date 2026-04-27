import { getAllProjects, getFeaturedClientProjects } from "@/lib/content";
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { SideProjects } from "@/components/sections/side-projects";
import { Achievements } from "@/components/sections/achievements";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Animate } from "@/components/animate";

export default function HomePage() {
  const featured = getFeaturedClientProjects();
  const personal = getAllProjects("personal");

  return (
    <>
      <Hero />
      <Animate><FeaturedWork projects={featured} /></Animate>
      <Animate><Experience /></Animate>
      <Animate><Skills /></Animate>
      <Animate><SideProjects projects={personal} /></Animate>
      <Animate><Achievements /></Animate>
      <Animate><About /></Animate>
      <Animate><Contact /></Animate>
    </>
  );
}
