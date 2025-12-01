import Hero from "@/components/features/hero/Hero";
import AboutSection from "@/components/features/about/AboutSection";
import WorksSection from "@/components/features/projects/WorksSection";
import { getProjects } from "@/lib/projects";
import { getSkills } from "@/lib/skills";
import SkillsGrid from "@/components/skills/SkillsGrid";
import Link from "next/link";

export default async function Home() {
  const { projects } = await getProjects({ featured: true, limit: 4 });
  const { skills: featuredSkills } = await getSkills({ featured: true, limit: 12 });

  return (
    <div className="flex flex-col">
      <Hero />

      <WorksSection projects={projects} />

      {/* Featured Skills Section */}
      <section id="featured-skills" className="py-20 px-6 bg-background border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-display font-bold uppercase mb-20 text-center">
            My Tech Stack
          </h2>

          <SkillsGrid skills={featuredSkills} className="mb-20" />

          <div className="text-center">
            <Link
              href="/skills"
              className="inline-block px-8 py-4 border border-white/20 rounded-full text-lg font-display uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              View All Skills
            </Link>
          </div>
        </div>
      </section>

      <AboutSection />
    </div>
  );
}
