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

// Render a project title with its last word flipped to serif-italic blue accent.
function TitleWords({ title }: { title: string }) {
    const words = title.split(' ');
    return (
        <>
            {words.map((word, i) =>
                i === words.length - 1 ? (
                    <span key={i} className="font-serif italic normal-case font-normal text-accent ml-1 inline-block">
                        {word}
                    </span>
                ) : (
                    <span key={i}>{word} </span>
                )
            )}
        </>
    );
}

export default async function WorkPage() {
    const { projects } = await getProjects({ limit: 50 });
    const [feature, ...rest] = projects;

    return (
        <div className="relative min-h-dvh bg-background text-foreground flex flex-col pt-32 pb-20 overflow-hidden">
            {/* Dither Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DitherBackground className="w-full h-full" />
            </div>

            <div className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                {/* Header */}
                <div className="mb-16 md:mb-24">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-6 block">02 // PORTFOLIO</span>
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-foreground pb-8">
                        <KineticText>
                            <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-display font-black uppercase tracking-tight leading-[0.85]">
                                All <span className="font-serif italic normal-case font-normal text-[1.1em]">work</span>
                            </h1>
                        </KineticText>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-foreground/60 max-w-[22ch] lg:text-right">
                            {projects.length} selected builds — production systems, shipped end&#8209;to&#8209;end.
                        </p>
                    </div>
                </div>

                {/* Featured project — full-bleed hero card */}
                {feature && (
                    <Link
                        href={`/work/${feature.slug}`}
                        className="group block relative border border-foreground bg-surface-alt overflow-hidden mb-16 md:mb-24"
                    >
                        <div className="relative aspect-[16/10] md:aspect-[21/9] w-full overflow-hidden">
                            <DistortionImage
                                src={getProjectImageUrl(feature.thumbnail || feature.heroFileId)}
                                alt={feature.title}
                                className="absolute inset-0 w-full h-full"
                            />
                            <span className="absolute top-4 left-4 md:top-6 md:left-6 font-mono text-[10px] uppercase tracking-widest bg-foreground text-background px-3 py-1.5 z-10">
                                01 / Featured
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-6 sm:p-8 md:p-12 border-t border-foreground bg-background">
                            <div className="md:col-span-8">
                                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase leading-[0.9] mb-5">
                                    <TitleWords title={feature.title} />
                                </h2>
                                <p className="text-lg md:text-2xl text-foreground/75 font-serif italic normal-case font-normal leading-relaxed max-w-2xl">
                                    {feature.shortDescription}
                                </p>
                            </div>
                            <div className="md:col-span-4 flex flex-col justify-between gap-8">
                                {feature.techStack && feature.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-3">
                                        {feature.techStack.slice(0, 6).map((tech, i) => (
                                            <span key={i} className="neo-pill">{tech}</span>
                                        ))}
                                    </div>
                                )}
                                <span className="font-mono text-sm uppercase tracking-widest font-bold inline-flex items-center gap-2 text-foreground group-hover:text-accent transition-colors duration-300">
                                    View case study
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Rest — numbered editorial grid */}
                {rest.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
                        {rest.map((project, i) => {
                            const imageUrl = getProjectImageUrl(project.thumbnail || project.heroFileId);
                            const idx = String(i + 2).padStart(2, '0');

                            return (
                                <Link key={project.$id} href={`/work/${project.slug}`} className="group block relative">
                                    {/* Index row */}
                                    <div className="flex items-center gap-4 mb-5">
                                        <span className="font-display font-black text-2xl md:text-3xl leading-none tabular-nums text-foreground/25 group-hover:text-accent transition-colors duration-300">
                                            {idx}
                                        </span>
                                        <div className="h-px flex-1 bg-foreground/15 group-hover:bg-accent/40 transition-colors duration-300" />
                                        {project.date && (
                                            <span className="font-mono text-xs font-bold text-foreground/40">
                                                {new Date(project.date).getFullYear()}
                                            </span>
                                        )}
                                    </div>

                                    {/* Image */}
                                    <div className="relative aspect-[4/3] w-full overflow-hidden border border-foreground bg-surface-alt mb-6">
                                        <DistortionImage src={imageUrl} alt={project.title} className="absolute inset-0 w-full h-full" />
                                        {project.featured && (
                                            <span className="absolute top-4 right-4 bg-foreground text-background text-[10px] uppercase font-mono font-bold px-3 py-1 z-10">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase leading-[0.95] mb-3">
                                        <TitleWords title={project.title} />
                                    </h3>
                                    <p className="text-base md:text-lg text-foreground/70 font-serif italic normal-case font-normal line-clamp-2 mb-5 leading-relaxed">
                                        {project.shortDescription}
                                    </p>

                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-2.5">
                                            {project.techStack.slice(0, 4).map((tech, t) => (
                                                <span key={t} className="neo-pill">{tech}</span>
                                            ))}
                                            {project.techStack.length > 4 && (
                                                <span className="neo-pill bg-foreground text-background">
                                                    +{project.techStack.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                )}

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
