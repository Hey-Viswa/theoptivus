import Hero from "@/components/features/hero/Hero";
import AboutSection from "@/components/features/about/AboutSection";
import WorksSection from "@/components/features/projects/WorksSection";
import { databases, COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';

interface Project {
  $id: string;
  title: string;
  slug: string;
  coverImage: string;
  tech: string[];
  summary: string;
  date: string;
}

async function getProjects() {
  try {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.PROJECTS,
      [
        Query.orderDesc('date')
      ]
    );
    return res.documents as unknown as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col">
      <Hero />
      <WorksSection projects={projects} />
      <AboutSection />
    </div>
  );
}
