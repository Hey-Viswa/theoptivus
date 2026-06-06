import Hero from "@/components/features/hero/Hero";
import StatsBand from "@/components/features/stats/StatsBand";
import Marquee from "@/components/ui/Marquee";
import AboutSection from "@/components/features/about/AboutSection";
import FeaturedProjects from "@/components/features/projects/FeaturedProjects";
import Footer from "@/components/layout/Footer";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      <StatsBand />

      <Marquee
        items={[
          "Full-Stack",
          "Systems Design",
          "Next.js",
          "Firebase",
          "React",
          "Flutter",
          "Shipped in Production",
        ]}
      />

      <FeaturedProjects />

      <AboutSection />
      
      <Footer />
    </div>
  );
}

