import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/projects';
import { getProjectImageUrl } from '@/lib/utils';
import DitherBackground from '@/components/ui/DitherBackground';
import DistortionImage from '@/components/ui/DistortionImage';
import KineticText from '@/components/ui/KineticText';

export const metadata: Metadata = {
    title: 'Work | Biswaranjan',
    description: 'Explore my latest projects and case studies.',
};

export const revalidate = 60;

export default async function WorkPage() {
    const { projects } = await getProjects({ limit: 50 });

    return (
        <div className="relative min-h-screen bg-background text-foreground flex flex-col pt-32 pb-20 overflow-hidden">
            {/* Dither Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DitherBackground className="w-full h-full" />
            </div>
            
            <div className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                {/* Header */}
                <div className="mb-20">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-6 block">02 // PORTFOLIO</span>
                    <KineticText>
                        <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-display font-black uppercase tracking-tight leading-[0.9]">
                            All <span className="font-serif italic normal-case font-normal text-[1.1em]">work</span>
                        </h1>
                    </KineticText>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16">
                    {projects.map((project, index) => {
                        const imageSource = project.thumbnail || project.heroFileId;
                        const imageUrl = getProjectImageUrl(imageSource);
                        
                        return (
                            <Link 
                                key={project.$id} 
                                href={`/work/${project.slug}`}
                                className="group block relative"
                            >
                                {/* Thumbnail Container — three.js RGB-shift on hover */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden border border-foreground bg-surface-alt mb-6">
                                    <DistortionImage
                                        src={imageUrl}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full"
                                    />
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 bg-foreground text-background text-[10px] uppercase font-mono font-bold px-3 py-1 z-10">
                                            Featured
                                        </div>
                                    )}
                                </div>
                                
                                {/* Info */}
                                <div className="bg-background p-5 sm:p-6 -mt-6 relative z-10 border border-foreground border-t-0 border-l-0 border-r-0">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-4">
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase">
                                            {project.title.split(' ').map((word, i, arr) => (
                                                i === arr.length - 1 ? (
                                                    <span key={i} className="font-serif italic normal-case font-normal highlight-yellow text-foreground px-2 py-0.5 ml-1 inline-block">
                                                        {word}
                                                    </span>
                                                ) : (
                                                    <span key={i}>{word} </span>
                                                )
                                            ))}
                                        </h2>
                                        {project.date && (
                                            <span className="text-xs font-mono font-bold text-foreground/50">{new Date(project.date).getFullYear()}</span>
                                        )}
                                    </div>
                                    <p className="text-xl text-foreground/80 font-serif italic normal-case font-normal line-clamp-3 mb-6 leading-relaxed">
                                        {project.shortDescription}
                                    </p>
                                    
                                    {/* Tech Stack Pills */}
                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-3">
                                            {project.techStack.slice(0, 4).map((tech, i) => (
                                                <span key={i} className="neo-pill">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 4 && (
                                                <span className="neo-pill bg-foreground text-background">
                                                    +{project.techStack.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                
                {projects.length === 0 && (
                    <div className="w-full border border-foreground p-20 flex flex-col items-center justify-center bg-surface-alt/20 text-center">
                        <div className="font-mono text-xs uppercase mb-4 text-foreground/50">SYSTEM MESSAGE</div>
                        <p className="text-3xl font-display font-black uppercase text-foreground mb-4">No Projects Found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
