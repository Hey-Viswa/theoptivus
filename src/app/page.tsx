import Hero from "@/components/features/hero/Hero";
import AboutSection from "@/components/features/about/AboutSection";
import FeaturedProjects from "@/components/features/projects/FeaturedProjects";
import Footer from "@/components/layout/Footer";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      <FeaturedProjects />

      <AboutSection />
      
      <Footer />
    </div>
  );
}

