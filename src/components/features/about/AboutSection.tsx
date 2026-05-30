import Skills from '@/components/features/skills/Skills';
import Image from 'next/image';
import EducationAnimation from './EducationAnimation';

export default function AboutSection() {
    return (
        <section className="px-6 md:px-12 bg-background flex flex-col mt-0">
            <div className="flex-1 w-full grid-border-x grid-border-b flex flex-col relative">
                {/* Intro Section */}
                <div id="about" className="grid grid-cols-1 md:grid-cols-12 scroll-mt-32 border-b border-foreground">
                    <div className="md:col-span-8 p-8 md:p-12 md:border-r border-foreground bg-background text-foreground">
                        <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-8 block">01 // ABOUT</span>
                        <h2 className="text-6xl md:text-[6rem] font-display font-black mb-12 leading-[1.05] tracking-tight text-foreground">
                            Building systems <br className="hidden md:block" />
                            from the <span className="highlight-yellow">ground up</span>
                        </h2>
                        <div className="text-2xl md:text-4xl text-foreground font-sans leading-relaxed max-w-4xl">
                            <span>Biswaranjan was built for projects that got <span className="highlight-yellow">tired of waiting</span>—for scaling, for deployment, for progress. <span className="highlight-blue">I move fast</span>, think sharp. Architecture should be <span className="highlight-yellow">compliant, bug-proof, and instant</span> — and that’s <span className="highlight-blue">exactly what I deliver</span>. While others drag their feet, I'm rewriting the codebase. Trust isn’t given. It’s earned. <span className="highlight-blue">And I earn it daily.</span></span>
                        </div>
                    </div>
                    <div className="md:col-span-4 relative flex items-center justify-center p-8 md:p-12 overflow-hidden bg-surface-alt/10">
                        <div className="w-full relative aspect-square max-w-[600px] scale-125 md:scale-150 rotate-[30deg] origin-center transition-transform duration-1000 group">
                            <Image
                                src="/images/gears.png"
                                alt="Abstract gears representing systems engineering"
                                fill
                                className="object-contain filter sepia saturate-[300%] hue-rotate-[200deg] brightness-90 contrast-125 group-hover:sepia-0 group-hover:saturate-100 group-hover:hue-rotate-0 transition-all duration-700"
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
                        <div className="md:col-span-4 p-8 md:p-12 md:border-r border-foreground bg-background text-foreground">
                            <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-4 block">02 // CAREER</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black mb-12 tracking-tight text-foreground uppercase">
                                Experience
                            </h2>
                        </div>
                        <div className="md:col-span-8">
                            {/* Experience Item 1 */}
                            <div className="p-8 md:p-12 border-b border-foreground bg-accent/5 hover:bg-accent/10 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">Founder &amp; Full-Stack Engineer</h3>
                                    <span className="text-xs font-mono uppercase font-bold border border-foreground px-3 py-1 bg-background text-foreground whitespace-nowrap">Oct 2025 — Present</span>
                                </div>
                                <p className="text-lg italic text-foreground/70 mb-6">StudioFlow (Self-Built SaaS)</p>
                                <ul className="space-y-4 text-foreground/80 font-sans text-base md:text-lg leading-relaxed max-w-3xl">
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 shrink-0 rounded-full"></div>
                                        <span>Architected a <span className="font-bold text-foreground">microservices backend</span> with <span className="font-mono text-sm bg-surface-alt px-1">Node.js, Express, and MongoDB</span>.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 shrink-0 rounded-full"></div>
                                        <span>Implemented <em className="font-serif text-lg text-foreground">real-time collaboration</em> with WebSockets &amp; Redis.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 shrink-0 rounded-full"></div>
                                        <span>Orchestrated robust <span className="font-bold text-foreground">CI/CD pipelines</span> via Railway &amp; Vercel.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Experience Item 2 */}
                            <div className="p-8 md:p-12 bg-[#FFE600]/10 hover:bg-[#FFE600]/20 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">Android Developer Intern</h3>
                                    <span className="text-xs font-mono uppercase font-bold border border-foreground px-3 py-1 bg-background text-foreground whitespace-nowrap">Jun 2023 — Jul 2023</span>
                                </div>
                                <p className="text-lg italic text-foreground/70 mb-6">JSW Group</p>
                                <p className="text-foreground/80 font-sans text-base md:text-lg leading-relaxed max-w-3xl">
                                    Developed a <span className="font-bold text-foreground">mission-critical</span> Feedback Management System integrated directly with <em className="font-serif text-lg text-foreground">enterprise ERPs</em>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 bg-surface text-foreground">
                        <div className="md:col-span-4 p-8 md:p-12 md:border-r border-foreground">
                            <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-4 block">03 // ACADEMICS</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black mb-12 tracking-tight text-foreground uppercase">
                                Education
                            </h2>
                        </div>
                        <div className="md:col-span-8 flex flex-col md:flex-row">
                            {/* Edu Card 1 */}
                            <div className="flex-1 p-8 md:p-12 md:border-r border-foreground border-b md:border-b-0 bg-[#FF5E5E]/5 hover:bg-[#FF5E5E]/10 transition-colors">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-4 text-foreground/50">2024 — 2027</span>
                                <h3 className="text-xl md:text-2xl font-display font-bold mb-2 text-foreground leading-tight">B.E. in <span className="italic font-serif">Computer Engineering</span></h3>
                                <p className="text-foreground/70 font-sans text-sm md:text-base">Pillai HOC College of Engineering</p>
                            </div>

                            {/* Edu Card 2 */}
                            <div className="flex-1 p-8 md:p-12 bg-[#00E5FF]/5 hover:bg-[#00E5FF]/10 transition-colors">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-4 text-foreground/50">2021 — 2024</span>
                                <h3 className="text-xl md:text-2xl font-display font-bold mb-2 text-foreground leading-tight">Diploma in <span className="italic font-serif">Computer Tech</span></h3>
                                <p className="text-foreground/70 font-sans text-sm md:text-base">Government Polytechnic, Pen</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
