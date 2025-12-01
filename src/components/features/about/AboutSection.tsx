import Skills from '@/components/features/skills/Skills';
import Image from 'next/image';
import EducationAnimation from './EducationAnimation';

export default function AboutSection() {
    return (
        <section className="min-h-screen py-20 px-6 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Intro Section */}
                <div id="about" className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 scroll-mt-32">
                    <div>
                        <h2 className="text-4xl md:text-8xl font-display font-bold uppercase mb-10 leading-none">
                            About<br />
                            <span className="text-outline text-transparent stroke-white">Me</span>
                        </h2>
                        <div className="text-xl text-gray-300 space-y-6 leading-relaxed">
                            <p>
                                I'm <span className="text-white font-bold">Biswaranjan Giri</span>, a <span className="text-accent">Full-Stack & Android Developer</span> who loves building things from scratch — clean, scalable, and efficient.
                            </p>
                            <p>
                                I’ve learned most of what I know by building real projects, not just theory. Whether it’s architecting a backend system, designing mobile flows, or solving tricky bugs, I enjoy working end-to-end and making products that actually work in the real world.
                            </p>
                            <p>
                                Right now, I’m building <span className="text-white">StudioFlow</span>, a multi-tenant SaaS platform for studios and creators. Working on this product has taught me real engineering:
                                <span className="text-white"> RBAC systems, billing logic, notifications, data isolation, failure debugging, refactoring</span>, and shipping features like a real production app.
                            </p>
                            <p>
                                I’m currently pursuing my Computer Engineering degree, and I combine classroom concepts with hands-on experience — learning more by doing than by reading. My goal is simple:
                                to build products that solve real problems and help me grow into a strong software engineer.
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

                {/* Experience & Education Section */}
                <div id="about-more" className="scroll-mt-32">
                    {/* Experience Section */}
                    <div className="py-20 border-t border-white/10 mt-20">
                        <h2 className="text-4xl md:text-8xl font-display font-bold uppercase mb-20 text-center">
                            Experience
                        </h2>

                        <div className="space-y-12 relative">
                            {/* Timeline Line */}
                            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block"></div>

                            {/* Experience Item 1 */}
                            <div className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                                {/* Date (Left for Desktop) */}
                                <div className="md:text-right order-1 md:order-1">
                                    <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent font-mono text-sm mb-2 md:mb-0">
                                        Oct 2025 - Present
                                    </div>
                                </div>

                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-accent rounded-full z-10 hidden md:block group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

                                {/* Content (Right for Desktop) */}
                                <div className="order-2 md:order-2">
                                    <div className="relative p-8 rounded-3xl bg-neutral-900/40 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                        <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-accent transition-colors">Founder & Full-Stack Engineer</h3>
                                        <p className="text-white/60 mb-6 font-medium tracking-wide">StudioFlow (Self-Built SaaS)</p>
                                        <p className="text-gray-400 leading-relaxed mb-6">
                                            Architected and built a production-grade SaaS platform for creative agencies, handling everything from project management to automated billing.
                                        </p>
                                        <ul className="space-y-3 text-gray-400 text-sm">
                                            <li className="flex items-start gap-3">
                                                <span className="text-accent mt-1.5">▹</span>
                                                <span>Engineered a scalable microservices-ready backend using <span className="text-white font-medium">Node.js, Express, and MongoDB</span>.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-accent mt-1.5">▹</span>
                                                <span>Implemented real-time collaboration features with <span className="text-white font-medium">WebSockets and Redis</span>.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-accent mt-1.5">▹</span>
                                                <span>Integrated <span className="text-white font-medium">Razorpay</span> for complex milestone-based billing and automated invoicing.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-accent mt-1.5">▹</span>
                                                <span>Orchestrated deployment pipelines using <span className="text-white font-medium">Railway (Backend)</span> and <span className="text-white font-medium">Vercel (Frontend)</span>.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Experience Item 2 */}
                            <div className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                                {/* Content (Left for Desktop) */}
                                <div className="order-2 md:order-1">
                                    <div className="relative p-8 rounded-3xl bg-neutral-900/40 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                        <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-accent transition-colors">Android Developer Intern</h3>
                                        <p className="text-white/60 mb-6 font-medium tracking-wide">JSW</p>
                                        <p className="text-gray-400 leading-relaxed">
                                            Developed a mission-critical Feedback Management System integrated with enterprise ERPs, significantly improving operational feedback loops.
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-gray-600 group-hover:border-accent rounded-full z-10 hidden md:block group-hover:scale-125 transition-all duration-300"></div>

                                {/* Date (Right for Desktop) */}
                                <div className="md:text-left order-1 md:order-2">
                                    <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:text-accent transition-colors font-mono text-sm mb-2 md:mb-0">
                                        June 2023 - July 2023
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="py-20 border-t border-white/10">
                        <h2 className="text-4xl md:text-8xl font-display font-bold uppercase mb-20 text-center">
                            Education
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Edu Card 1 */}
                            <div className="group relative p-10 rounded-[2rem] bg-neutral-900/40 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                                <EducationAnimation />

                                <div className="relative z-10">
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs mb-6">
                                        2024 - 2027
                                    </div>
                                    <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-accent transition-colors">B.E. in Computer Engineering</h3>
                                    <p className="text-gray-400 text-lg">Pillai HOC College of Engineering and Technology</p>
                                </div>
                            </div>

                            {/* Edu Card 2 */}
                            <div className="group relative p-10 rounded-[2rem] bg-neutral-900/40 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                                <EducationAnimation />

                                <div className="relative z-10">
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:text-white transition-colors font-mono text-xs mb-6">
                                        2021 - 2024
                                    </div>
                                    <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-accent transition-colors">Diploma in Computer Technology</h3>
                                    <p className="text-gray-400 text-lg">Government Polytechnic, Pen</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
