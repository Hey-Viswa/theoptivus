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
      <section id="featured-skills" className="px-6 md:px-12 bg-background flex flex-col">
        <div className="flex-1 w-full grid-border flex flex-col items-center justify-center pt-20 px-8 relative">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-20 text-center text-foreground uppercase tracking-tight">
            My Tech Stack
          </h2>

          <div className="w-full max-w-7xl mx-auto mb-20">
            <SkillsGrid skills={featuredSkills} />
          </div>

          <div className="text-center w-full grid-border-t py-12">
            <Link
              href="/skills"
              className="editorial-btn uppercase text-sm inline-flex"
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
