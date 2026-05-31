import Skills from '@/components/features/skills/Skills';
import Image from 'next/image';
import EducationAnimation from './EducationAnimation';

export default function AboutSection() {
    return (
        <section className="px-6 md:px-12 bg-background flex flex-col mt-0">
            <div className="flex-1 w-full grid-border-x grid-border-b flex flex-col relative">
                {/* Intro Section */}
                <div id="about" className="grid grid-cols-1 md:grid-cols-12 scroll-mt-32 border-b border-foreground">
                    <div className="md:col-span-8 p-8 md:p-12 md:border-r border-foreground text-foreground">
                        <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-8 block">01 // ABOUT</span>
                        <h2 className="text-6xl md:text-[6rem] font-display font-black mb-12 leading-[1.05] tracking-tight text-foreground uppercase">
                            Building <span className="font-serif italic normal-case font-normal text-5xl md:text-[6.5rem]">systems</span> <br className="hidden md:block" />
                            from the ground up
                        </h2>
                        <div className="text-2xl md:text-4xl text-foreground font-sans leading-relaxed max-w-4xl">
                            <span>Biswaranjan was built for projects that got <em className="highlight-yellow italic text-[1.1em] text-foreground">tired of waiting</em>—for scaling, for deployment, for progress. <strong className="font-bold">I move fast</strong>, think sharp. Architecture should be <em className="highlight-blue italic text-[1.1em]">compliant, bug-proof, and instant</em> — and that's <strong className="font-bold">exactly what I deliver</strong>. While others drag their feet, I'm rewriting the codebase. Trust isn't given. It's earned. <em className="highlight-yellow italic text-[1.1em] text-foreground">And I earn it daily.</em></span>
                        </div>
                    </div>
                    <div className="md:col-span-4 relative flex items-center justify-center p-8 md:p-12 bg-surface-alt/10 overflow-visible z-10">
                        <div className="w-[180%] max-w-none relative aspect-square origin-center transition-transform duration-500">
                            <Image
                                src="/images/gears.png"
                                alt="Abstract gears representing systems engineering"
                                fill
                                className="object-contain drop-shadow-xl filter sepia saturate-[200%] brightness-90 contrast-125"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Experience & Education Section */}
                <div id="about-more" className="scroll-mt-32">
                    
                    {/* Experience Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground">
                        <div className="md:col-span-4 p-8 md:p-12 md:border-r border-foreground bg-[#FFE600] text-foreground flex flex-col justify-center">
                            <span className="font-mono text-xs uppercase tracking-widest text-foreground/70 mb-4 block">02 // CAREER</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black mb-12 tracking-tight uppercase">
                                <span className="font-serif italic normal-case font-normal text-[1.1em]">Experience</span>
                            </h2>
                        </div>
                        <div className="md:col-span-8">
                            {/* Experience Item 1 */}
                            <div className="p-8 md:p-12 hover:bg-surface-alt transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground"><span className="italic font-serif">Software Developer</span> Intern</h3>
                                    <span className="text-xs font-mono uppercase font-bold tracking-widest text-foreground/50 whitespace-nowrap">July 2023</span>
                                </div>
                                <p className="text-lg italic text-foreground/70 mb-6">JSW, Dolvi</p>
                                <ul className="space-y-4 text-foreground/80 font-sans text-base md:text-lg leading-relaxed max-w-3xl">
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 shrink-0 rounded-full"></div>
                                        <span>Built and delivered an <span className="font-bold text-foreground">Android Feedback Management System</span> for internal use.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 shrink-0 rounded-full"></div>
                                        <span>Integrated <em className="font-serif text-lg text-foreground">REST APIs</em> and applied modern Android architecture patterns.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 shrink-0 rounded-full"></div>
                                        <span>Worked in an enterprise environment with exposure to <span className="font-bold text-foreground">SAP-based workflows</span>.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground text-foreground">
                        <div className="md:col-span-4 p-8 md:p-12 md:border-r border-foreground bg-accent text-background flex flex-col justify-center">
                            <span className="font-mono text-xs uppercase tracking-widest text-background/70 mb-4 block">03 // ACADEMICS</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black mb-12 tracking-tight uppercase">
                                <span className="font-serif italic normal-case font-normal text-[1.1em]">Education</span>
                            </h2>
                        </div>
                        <div className="md:col-span-8 flex flex-col md:flex-row">
                            {/* Edu Card 1 */}
                            <div className="flex-1 p-8 md:p-12 hover:bg-surface-alt transition-colors">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-4 text-foreground/50">Expected 2027</span>
                                <h3 className="text-xl md:text-2xl font-display font-bold mb-2 text-foreground leading-tight">Bachelor of Technology in <span className="italic font-serif">Computer Engineering</span></h3>
                                <p className="text-foreground/70 font-sans text-sm md:text-base">Pillai HOC College of Engineering and Technology</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Skills Section */}
                <div className="border-b border-foreground">
                    <Skills />
                </div>
            </div>
        </section>
    );
}
