import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import { client } from '@/sanity/client';
import { HERO_QUERY, ABOUT_QUERY } from '@/constants/querys';
import { HeroSection as HeroSectionType } from '@/types/hero';
import { AboutSection as AboutSectionType } from '@/types/about';

async function getHeroData(): Promise<HeroSectionType | undefined> {
  try {
    const heroData = await client.fetch(HERO_QUERY);
    return heroData || undefined;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return undefined;
  }
}

async function getAboutData(): Promise<AboutSectionType | undefined> {
  try {
    const aboutData = await client.fetch(ABOUT_QUERY);
    console.log('Fetched About Data:', aboutData); // Debug log
    console.log('Resume data:', aboutData?.resume); // Specific resume debug
    return aboutData || undefined;
  } catch (error) {
    console.error('Error fetching about data:', error);
    return undefined;
  }
}

export default async function HomePage() {
  const heroData = await getHeroData();
  const aboutData = await getAboutData();

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-[200]"
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content" role="main">
        <HeroSection heroData={heroData} />

        {/* About Section */}
        <AboutSection aboutData={aboutData} />

        {/* Future sections with proper semantic structure */}
        {/*
        <section aria-labelledby="tech-heading">
          <TechStackSection />
        </section>

        <section aria-labelledby="projects-heading">
          <ProjectsSection />
        </section>

        <section aria-labelledby="experience-heading">
          <ExperienceSection />
        </section>

        <section aria-labelledby="story-heading">
          <StorySection />
        </section>

        <section aria-labelledby="contact-heading">
          <ContactSection />
        </section>
        */}

        {/* Footer */}
        {/*
        <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Optivus. All rights reserved.</p>
          </div>
        </footer>
        */}
      </main>
    </>
  );
}
