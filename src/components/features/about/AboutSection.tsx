import Skills from '@/components/features/skills/Skills';
import Image from 'next/image';
import EducationAnimation from './EducationAnimation';
import KineticText from '@/components/ui/KineticText';

export default function AboutSection() {
    return (
        <section className="px-6 md:px-12 bg-background flex flex-col mt-0">
            <div className="flex-1 w-full grid-border-x grid-border-b flex flex-col relative">
                {/* Intro Section */}
                <div id="about" className="grid grid-cols-1 md:grid-cols-12 scroll-mt-32 border-b border-foreground">
                    <div className="md:col-span-8 p-8 md:p-12 md:border-r border-foreground text-foreground">
                        <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-8 block">01 // ABOUT</span>
                        <KineticText className="mb-12">
                            <h2 className="text-6xl md:text-[6rem] font-display font-black leading-[1.05] tracking-tight text-foreground uppercase">
                                Building <span className="font-serif italic normal-case font-normal text-5xl md:text-[6.5rem]">systems</span> <br className="hidden md:block" />
                                from the ground up
                            </h2>
                        </KineticText>
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
                        <div className="md:col-span-4 @container p-8 md:p-12 md:border-r border-foreground bg-[#FFE600] text-foreground flex flex-col justify-between">
                            <span className="font-mono text-xs uppercase tracking-widest text-foreground/70 mb-4 block">02 // CAREER</span>
                            <KineticText intensity={1.2}>
                                <h2 className="text-[clamp(1.5rem,15cqw,7rem)] font-display font-black tracking-tight uppercase leading-none break-words">
                                    <span className="font-serif italic normal-case font-normal text-[1.1em]">Experience</span>
                                </h2>
                            </KineticText>
                            <span aria-hidden className="mt-10 block font-display font-black leading-none text-[clamp(3.5rem,55cqw,11rem)] tracking-tighter text-foreground/10 select-none">01</span>
                        </div>
                        <div className="md:col-span-8">
                            {/* Experience Item 1 */}
                            <div className="group relative p-8 md:p-12 transition-colors duration-300 hover:bg-surface-alt border-l-2 border-transparent hover:border-accent">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline mb-6"><div className="md:col-span-3"><span className="font-display font-black text-4xl md:text-5xl leading-none tracking-tighter text-foreground/30 group-hover:text-accent transition-colors duration-300">’23</span><span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-foreground/40">JUL 2023</span></div><div className="md:col-span-9"><h3 className="text-2xl md:text-4xl font-display font-bold text-foreground leading-tight"><span className="italic font-serif">Software Developer</span> Intern</h3><p className="mt-1 text-base md:text-lg font-mono uppercase tracking-wide text-foreground/50">JSW · Dolvi</p></div></div>
                                <ul className="space-y-4 text-foreground/80 font-sans text-base md:text-lg leading-relaxed md:ml-[25%] max-w-2xl">
                                    <li className="flex items-start gap-4">
                                        <div className="w-3 h-[2px] bg-foreground/40 mt-3 shrink-0 group-hover:bg-accent group-hover:w-5 transition-all duration-300"></div>
                                        <span>Built and delivered an <span className="font-bold text-foreground">Android Feedback Management System</span> for internal use.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-3 h-[2px] bg-foreground/40 mt-3 shrink-0 group-hover:bg-accent group-hover:w-5 transition-all duration-300"></div>
                                        <span>Integrated <em className="font-serif text-lg text-foreground">REST APIs</em> and applied modern Android architecture patterns.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-3 h-[2px] bg-foreground/40 mt-3 shrink-0 group-hover:bg-accent group-hover:w-5 transition-all duration-300"></div>
                                        <span>Worked in an enterprise environment with exposure to <span className="font-bold text-foreground">SAP-based workflows</span>.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground text-foreground">
                        <div className="md:col-span-4 @container p-8 md:p-12 md:border-r border-foreground bg-accent text-background flex flex-col justify-between">
                            <span className="font-mono text-xs uppercase tracking-widest text-background/70 mb-4 block">03 // ACADEMICS</span>
                            <KineticText intensity={1.2}>
                                <h2 className="text-[clamp(1.5rem,15cqw,7rem)] font-display font-black tracking-tight uppercase leading-none break-words">
                                    <span className="font-serif italic normal-case font-normal text-[1.1em]">Education</span>
                                </h2>
                            </KineticText>
                            <span aria-hidden className="mt-10 block font-display font-black leading-none text-[clamp(3.5rem,55cqw,11rem)] tracking-tighter text-background/15 select-none">01</span>
                        </div>
                        <div className="md:col-span-8 flex flex-col md:flex-row">
                            {/* Edu Card 1 */}
                            <div className="group flex-1 p-8 md:p-12 transition-colors duration-300 hover:bg-surface-alt border-l-2 border-transparent hover:border-accent">
                                <div className="flex items-baseline gap-4 mb-6"><span className="font-display font-black text-6xl md:text-7xl leading-none tracking-tighter text-foreground/20 group-hover:text-accent transition-colors duration-300">’27</span><span className="neo-pill !text-[10px]">In Progress</span></div><h3 className="text-2xl md:text-3xl font-display font-bold mb-2 text-foreground leading-tight">Bachelor of Engineering in <span className="italic font-serif">Computer Engineering</span></h3><p className="font-mono text-sm uppercase tracking-wide text-foreground/50">Pillai HOC College of Engineering &amp; Technology</p>
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
