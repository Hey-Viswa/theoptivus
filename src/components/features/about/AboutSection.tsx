import Skills from '@/components/features/skills/Skills';
import Image from 'next/image';

export default function AboutSection() {
    return (
        <section id="about" className="min-h-screen py-20 px-6 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Intro Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
                    <div>
                        <h2 className="text-6xl md:text-8xl font-display font-bold uppercase mb-10 leading-none">
                            About<br />
                            <span className="text-outline text-transparent stroke-white">Me</span>
                        </h2>
                        <div className="text-xl text-gray-300 space-y-6 leading-relaxed">
                            <p>
                                I'm <span className="text-white font-bold">Biswaranjan Giri</span>, a <span className="text-accent">Full-Stack & Android Developer</span> who thrives on solving complex engineering challenges.
                            </p>
                            <p>
                                My journey is defined by a relentless pursuit of <span className="text-white">performance, scalability, and user-centric design</span>. Whether it's architecting a distributed backend or crafting a pixel-perfect mobile interface, I build systems that are robust, efficient, and delightful to use.
                            </p>
                            <p>
                                Currently pursuing my Computer Engineering degree, I combine academic depth with hands-on production experience, bridging the gap between theoretical concepts and real-world impact.
                            </p>
                        </div>
                    </div>
                    <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group">
                        <Image
                            src="/viswa.png"
                            alt="Biswaranjan Giri"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    </div>
                </div>

                {/* Skills Section */}
                <Skills />

                {/* Experience Section */}
                <div className="py-20 border-t border-white/10 mt-20">
                    <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-16 flex items-center gap-4">
                        <span className="w-3 h-3 bg-accent rounded-full"></span>
                        Experience
                    </h2>

                    <div className="space-y-12 relative border-l border-white/10 ml-3 md:ml-0 md:border-none">
                        {/* Experience Item 1 */}
                        <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pl-8 md:pl-0">
                            {/* Timeline Dot (Mobile) */}
                            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-accent rounded-full md:hidden"></div>

                            <div className="md:col-span-3 text-gray-400 font-mono text-sm md:text-base pt-1">
                                Oct 2025 - Present
                            </div>
                            <div className="md:col-span-9 relative">
                                <div className="absolute -inset-4 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                <h3 className="text-2xl font-bold mb-1 group-hover:text-accent transition-colors">Founder & Full-Stack Engineer</h3>
                                <p className="text-white/80 mb-4 font-medium">StudioFlow (Self-Built SaaS)</p>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Architected and built a production-grade SaaS platform for creative agencies, handling everything from project management to automated billing.
                                </p>
                                <ul className="space-y-3 text-gray-400 text-sm md:text-base">
                                    <li className="flex items-start gap-3">
                                        <span className="text-accent mt-1.5">▹</span>
                                        <span>Engineered a scalable microservices-ready backend using <span className="text-white">Node.js, Express, and MongoDB</span>.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-accent mt-1.5">▹</span>
                                        <span>Implemented real-time collaboration features with <span className="text-white">WebSockets and Redis</span>.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-accent mt-1.5">▹</span>
                                        <span>Integrated <span className="text-white">Razorpay</span> for complex milestone-based billing and automated invoicing.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-accent mt-1.5">▹</span>
                                        <span>Orchestrated deployment pipelines using <span className="text-white">Railway (Backend)</span> and <span className="text-white">Vercel (Frontend)</span>.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Experience Item 2 */}
                        <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pl-8 md:pl-0">
                            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-gray-600 group-hover:bg-accent transition-colors rounded-full md:hidden"></div>

                            <div className="md:col-span-3 text-gray-400 font-mono text-sm md:text-base pt-1">
                                June 2023 - July 2023
                            </div>
                            <div className="md:col-span-9 relative">
                                <div className="absolute -inset-4 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                <h3 className="text-2xl font-bold mb-1 group-hover:text-accent transition-colors">Android Developer Intern</h3>
                                <p className="text-white/80 mb-4 font-medium">JSW</p>
                                <p className="text-gray-400 leading-relaxed">
                                    Developed a mission-critical Feedback Management System integrated with enterprise ERPs, significantly improving operational feedback loops.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education Section */}
                <div className="py-20 border-t border-white/10">
                    <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-16 flex items-center gap-4">
                        <span className="w-3 h-3 bg-white rounded-full"></span>
                        Education
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Edu Card 1 */}
                        <div className="group p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="text-accent font-mono text-sm mb-4">2024 - 2027</div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">B.E. in Computer Engineering</h3>
                            <p className="text-gray-400">Pillai HOC College of Engineering and Technology</p>
                        </div>

                        {/* Edu Card 2 */}
                        <div className="group p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="text-accent font-mono text-sm mb-4">2021 - 2024</div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">Diploma in Computer Technology</h3>
                            <p className="text-gray-400">Government Polytechnic, Pen</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
