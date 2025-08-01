import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import { client } from '@/sanity/client';
import { HERO_QUERY } from '@/constants/querys';
import { HeroSection as HeroSectionType } from '@/types/hero';

async function getHeroData(): Promise<HeroSectionType | null> {
  try {
    const heroData = await client.fetch(HERO_QUERY);
    return heroData;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

const page = async () => {
  const heroData = await getHeroData();

  return (
    <main>
      <Navigation />
      <HeroSection heroData={heroData} />
      {/*<TechStackSection />*/}
      {/* <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <StorySection />
      <ContactSection /> */}
    </main>
  );
};

export default page;
