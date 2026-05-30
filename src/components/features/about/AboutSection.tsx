import Skills from '@/components/features/skills/Skills';
import Image from 'next/image';
import EducationAnimation from './EducationAnimation';

export default function AboutSection() {
    return (
        <section className="px-6 md:px-12 bg-background flex flex-col mt-0">
            <div className="flex-1 w-full grid-border-x grid-border-b flex flex-col relative">
                {/* Intro Section */}
                <div id="about" className="grid grid-cols-1 md:grid-cols-12 scroll-mt-32 border-b border-foreground">
                    <div className="md:col-span-8 p-8 md:p-12 md:border-r border-foreground">
                        <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-8 block">01 // ABOUT</span>
                        <h2 className="text-6xl md:text-[6rem] font-display font-black mb-12 leading-[1.05] tracking-tight text-foreground">
                            Building systems <br className="hidden md:block" />
                            from the <span className="highlight-blue text-surface">ground up</span>
                        </h2>
                        <div className="text-2xl md:text-4xl text-foreground font-sans leading-relaxed max-w-4xl">
                            <span>Biswaranjan was built for projects that got <span className="highlight-yellow">tired of waiting</span>—for scaling, for deployment, for progress. <span className="highlight-red">I move fast</span>, think sharp. Architecture should be <span className="highlight-yellow">compliant, bug-proof, and instant</span> — and that’s <span className="highlight-blue text-surface">exactly what I deliver</span>. While others drag their feet, I'm rewriting the codebase. Trust isn’t given. It’s earned. <span className="highlight-red text-surface">And I earn it daily.</span></span>
                        </div>
                    </div>
                    <div className="md:col-span-4 relative flex items-center justify-center p-8 md:p-12 overflow-hidden bg-surface-alt/20">
                        <div className="w-full relative aspect-square max-w-[600px] scale-125 md:scale-150 rotate-[30deg] origin-center transition-transform duration-1000">
                            <Image
                                src="/images/gears.png"
                                alt="Abstract gears representing systems engineering"
                                fill
                                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-700"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="border-b border-foreground">
                    <Skills />
                </div>

                {/* Experience & Education Section */}
                <div id="about-more" className="scroll-mt-32">
                    
                    {/* Experience Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground">
                        <div className="md:col-span-4 p-8 md:p-12 md:border-r border-foreground bg-surface-alt/10">
                            <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-4 block">02 // CAREER</span>
                            <h2 className="text-6xl md:text-[6rem] font-display font-black mb-12 leading-[1.05] tracking-tight text-foreground">
                                Experi<span className="highlight-yellow">ence</span>
                            </h2>
                        </div>
                        <div className="md:col-span-8">
                            {/* Experience Item 1 */}
                            <div className="p-8 md:p-12 border-b border-foreground hover:bg-surface transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                    <h3 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase">Founder &amp; Full-Stack Engineer</h3>
                                    <span className="text-sm font-mono uppercase font-bold border-2 border-foreground px-4 py-2 bg-background text-foreground whitespace-nowrap">Oct 2025 — Present</span>
                                </div>
                                <p className="font-mono font-bold mb-8 inline-block uppercase text-lg text-foreground/70">StudioFlow (Self-Built SaaS)</p>
                                <ul className="space-y-6 text-foreground font-sans text-xl md:text-3xl leading-relaxed">
                                    <li className="flex items-start gap-4">
                                        <div className="w-3 h-3 bg-foreground mt-3 shrink-0"></div>
                                        <span>Architected a <span className="highlight-blue text-surface">microservices backend</span> with <span className="highlight-yellow">Node.js, Express, and MongoDB</span>.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-3 h-3 bg-foreground mt-3 shrink-0"></div>
                                        <span>Implemented <span className="highlight-red text-surface">real-time collaboration</span> with WebSockets &amp; Redis.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-3 h-3 bg-foreground mt-3 shrink-0"></div>
                                        <span>Orchestrated <span className="highlight-yellow">CI/CD pipelines</span> via Railway &amp; Vercel.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Experience Item 2 */}
                            <div className="p-8 md:p-12 hover:bg-surface transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                    <h3 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase">Android Developer Intern</h3>
                                    <span className="text-sm font-mono uppercase font-bold border-2 border-foreground px-4 py-2 bg-background text-foreground whitespace-nowrap">Jun 2023 — Jul 2023</span>
                                </div>
                                <p className="font-mono font-bold mb-8 inline-block uppercase text-lg text-foreground/70">JSW</p>
                                <p className="text-foreground font-sans text-xl md:text-3xl leading-relaxed">
                                    Developed a <span className="highlight-red text-surface">mission-critical</span> Feedback Management System integrated with <span className="highlight-blue text-surface">enterprise ERPs</span>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 bg-surface-alt/10">
                        <div className="md:col-span-4 p-8 md:p-12 md:border-r border-foreground">
                            <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-4 block">03 // ACADEMICS</span>
                            <h2 className="text-6xl md:text-[6rem] font-display font-black mb-12 leading-[1.05] tracking-tight text-foreground">
                                Edu<span className="highlight-blue text-surface">cation</span>
                            </h2>
                        </div>
                        <div className="md:col-span-8 flex flex-col md:flex-row">
                            {/* Edu Card 1 */}
                            <div className="flex-1 p-8 md:p-12 md:border-r border-foreground border-b md:border-b-0 hover:bg-surface transition-colors">
                                <span className="text-sm font-mono font-bold uppercase tracking-widest block mb-8 text-foreground border-2 border-foreground px-4 py-2 w-fit bg-background">2024 — 2027</span>
                                <h3 className="text-3xl md:text-4xl font-display font-black mb-6 text-foreground leading-tight uppercase">B.E. in <span className="highlight-yellow">Computer Engineering</span></h3>
                                <p className="text-foreground/70 font-mono text-lg">Pillai HOC College of Engineering</p>
                            </div>

                            {/* Edu Card 2 */}
                            <div className="flex-1 p-8 md:p-12 hover:bg-surface transition-colors">
                                <span className="text-sm font-mono font-bold uppercase tracking-widest block mb-8 text-foreground border-2 border-foreground px-4 py-2 w-fit bg-background">2021 — 2024</span>
                                <h3 className="text-3xl md:text-4xl font-display font-black mb-6 text-foreground leading-tight uppercase">Diploma in <span className="highlight-red text-surface">Computer Tech</span></h3>
                                <p className="text-foreground/70 font-mono text-lg">Government Polytechnic, Pen</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
