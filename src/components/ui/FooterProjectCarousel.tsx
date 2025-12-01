'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { databases, COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';

interface Project {
    $id: string;
    title: string;
    slug: string;
    coverImage: string;
    tech: string[];
}

export default function FooterProjectCarousel() {
    const [projects, setProjects] = useState<Project[]>([]);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await databases.listDocuments(
                    DATABASE_ID,
                    COLLECTIONS.PROJECTS,
                    [
                        Query.orderDesc('date'),
                        Query.limit(6)
                    ]
                );
                setProjects(res.documents as unknown as Project[]);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (projects.length === 0 || !carouselRef.current) return;

        const carousel = carouselRef.current;
        const totalWidth = carousel.scrollWidth / 2; // Since we duplicate content

        gsap.to(carousel, {
            x: -totalWidth,
            duration: 20,
            ease: "none",
            repeat: -1,
        });

        // Hover pause effect
        const pause = () => gsap.globalTimeline.pause();
        const resume = () => gsap.globalTimeline.play();

        carousel.addEventListener('mouseenter', pause);
        carousel.addEventListener('mouseleave', resume);

        return () => {
            carousel.removeEventListener('mouseenter', pause);
            carousel.removeEventListener('mouseleave', resume);
            gsap.killTweensOf(carousel);
        };
    }, [projects]);

    if (projects.length === 0) return null;

    // Duplicate projects for infinite loop
    const displayProjects = [...projects, ...projects];

    return (
        <div className="w-full overflow-hidden py-10 bg-white">
            <div ref={carouselRef} className="flex gap-6 w-max px-6">
                {displayProjects.map((project, index) => (
                    <Link
                        key={`${project.$id}-${index}`}
                        href={`/projects/${project.slug}`}
                        className="relative w-[300px] h-[200px] md:w-[400px] md:h-[250px] flex-shrink-0 rounded-lg overflow-hidden group"
                        data-cursor="View"
                    >
                        <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        <div className="absolute bottom-4 left-4 z-10">
                            <h3 className="text-white font-display font-bold uppercase text-xl drop-shadow-lg">
                                {project.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
