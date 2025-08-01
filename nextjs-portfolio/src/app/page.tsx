import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import { client } from '@/sanity/client';
import { HERO_QUERY } from '@/constants/querys';
import { HeroSection as HeroSectionType } from '@/types/hero';

async function getHeroData(): Promise<HeroSectionType | undefined> {
  try {
    const heroData = await client.fetch(HERO_QUERY);
    return heroData || undefined;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return undefined;
  }
}

export default async function HomePage() {
  const heroData = await getHeroData();

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

        {/* Future sections with proper semantic structure */}
        {/*
        <section aria-labelledby="about-heading">
          <TechStackSection />
        </section>

        <section aria-labelledby="about-heading">
          <AboutSection />
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
      </main>
    </>
  );
}
