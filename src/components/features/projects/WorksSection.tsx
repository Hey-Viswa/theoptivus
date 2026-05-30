import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project';
import { getProjectImageUrl } from '@/lib/utils';

interface WorksSectionProps {
    projects: Project[];
}

export default function WorksSection({ projects }: WorksSectionProps) {
    const displayProjects = projects.slice(0, 4);

    const getGridClass = () => {
        if (displayProjects.length === 1) {
            return "grid grid-cols-1 max-w-3xl mx-auto";
        } else if (displayProjects.length === 2) {
            return "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10";
        } else {
            return "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10";
        }
    };

    return (
        <section id="works" className="px-6 md:px-12 bg-background flex flex-col mt-0">
            <div className="flex-1 w-full grid-border-x grid-border-b relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                    {/* Left Column: Sticky Title */}
                    <div className="lg:col-span-4 p-8 md:p-12 lg:border-r border-foreground bg-[#FF5E5E] text-background relative">
                        <div className="sticky top-32">
                            <span className="font-mono text-xs uppercase tracking-widest text-background/70 mb-8 block">02 // PORTFOLIO</span>
                            <h2 className="text-6xl md:text-[6rem] font-display font-black mb-8 tracking-tight leading-[0.9] text-background uppercase border-b border-background/20 pb-12">
                                Selected<br/>work
                            </h2>
                            <div className="text-xl text-background font-sans leading-relaxed max-w-sm">
                                <span>A curated selection of projects that showcase <span className="highlight-blue text-foreground">full-stack thinking</span> and <span className="highlight-yellow text-foreground">engineering precision</span>.</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Projects / Carousel Container */}
                    <div className="lg:col-span-8 p-8 md:p-12 bg-background flex flex-col justify-center">
                        {displayProjects.length > 0 ? (
                            <div className={getGridClass()}>
                                {displayProjects.map((project, index) => {
                                    const imageSource = project.thumbnail || project.heroFileId;
                                    const imageUrl = getProjectImageUrl(imageSource);
                                    const colorClasses = [
                                        'bg-accent/5 hover:bg-accent/10', 
                                        'bg-[#FFE600]/10 hover:bg-[#FFE600]/20', 
                                        'bg-[#FF5E5E]/5 hover:bg-[#FF5E5E]/10', 
                                        'bg-[#00E5FF]/5 hover:bg-[#00E5FF]/10'
                                    ];
                                    const bgClass = colorClasses[index % colorClasses.length];

                                    return (
                                        <article
                                            key={project.$id}
                                            className={`group block relative border border-foreground overflow-hidden transition-colors ${bgClass}`}
                                        >
                                            <Link href={`/work/${project.slug}`}>
                                                {/* Image Container */}
                                                <div className="relative aspect-[16/10] overflow-hidden border-b border-foreground">
                                                    <Image
                                                        src={imageUrl}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                                    />
                                                    {/* Featured Badge */}
                                                    {project.featured && (
                                                        <div className="absolute top-0 right-0 bg-foreground text-background font-mono text-[10px] uppercase px-3 py-1 font-bold">
                                                            Featured
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 md:p-8 space-y-4">
                                                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2">
                                                        <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground uppercase">
                                                            {project.title}
                                                        </h3>
                                                        {project.date && (
                                                            <span className="text-xs text-foreground font-mono font-bold bg-accent/10 px-2 py-1 border border-accent/20 w-fit">
                                                                {new Date(project.date).getFullYear()}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-foreground/70 text-base md:text-lg leading-relaxed line-clamp-2 font-sans">
                                                        {project.shortDescription}
                                                    </p>

                                                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-foreground/10">
                                                        {project.techStack?.slice(0, 4).map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="text-[10px] font-mono uppercase px-2 py-1 bg-background text-foreground border border-foreground"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                        {project.techStack && project.techStack.length > 4 && (
                                                            <span className="text-[10px] font-mono text-foreground px-2 py-1">
                                                                +{project.techStack.length - 4}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="w-full border border-foreground p-20 flex flex-col items-center justify-center bg-surface-alt/20 text-center h-full min-h-[500px]">
                                <div className="font-mono text-xs uppercase mb-4 text-foreground/50">SYSTEM MESSAGE</div>
                                <p className="text-3xl font-display font-black uppercase text-foreground mb-4">No Projects Found.</p>
                                <p className="text-sm font-mono text-foreground">Check back later for exciting new work.</p>
                            </div>
                        )}

                        {displayProjects.length > 0 && projects.length > 4 && (
                            <div className="mt-16 flex justify-center border-t border-foreground pt-12">
                                <Link
                                    href="/work"
                                    className="editorial-btn uppercase text-sm inline-flex"
                                >
                                    View all projects
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
