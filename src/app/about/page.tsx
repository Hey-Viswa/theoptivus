import Skills from '@/components/features/skills/Skills';
import Image from 'next/image';

export const metadata = {
    title: 'About | Viswa',
    description: 'Full-stack developer and UI engineer based in India.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Intro Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
                    <div>
                        <h1 className="text-6xl md:text-8xl font-display font-bold uppercase mb-10 leading-none">
                            About<br />
                            <span className="text-outline text-transparent stroke-white">Me</span>
                        </h1>
                        <div className="text-xl text-gray-300 space-y-6 leading-relaxed">
                            <p>
                                I'm <span className="text-white font-bold">Biswaranjan Giri</span>, a full-stack web developer who loves taking ideas from <span className="text-accent">"concept" to "production-ready"</span>.
                            </p>
                            <p>
                                I work across the MERN stack — building scalable backends, clean frontends, real-time features, and complete system architectures.
                            </p>
                            <p>
                                Currently in my 3rd year of Computer Engineering, I’m deeply focused on building reliable systems, solving meaningful problems, and growing with a strong engineering team.
                            </p>
                        </div>
                    </div>
                    <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                        {/* Placeholder for profile image - replace with actual image path */}
                        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-gray-500">
                            Profile Image Placeholder
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <Skills />

                {/* Experience Section */}
                <section className="py-20 border-t border-white/10 mt-20">
                    <h2 className="text-4xl font-display font-bold uppercase mb-16">Experience</h2>

                    <div className="space-y-20">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            <div className="text-gray-400 font-mono">Oct 2025 - Present</div>
                            <div className="md:col-span-3">
                                <h3 className="text-2xl font-bold mb-2">Founder & Full-Stack Engineer</h3>
                                <p className="text-accent mb-4">StudioFlow (Self-Built SaaS)</p>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Built a production-grade SaaS for creative teams to manage projects, revisions, invoicing, and payments.
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li>Designed system using Node.js, Express, MongoDB, React, WebSockets, Redis, AWS S3.</li>
                                    <li>Implemented RBAC V2, real-time collaboration, and automated workflows.</li>
                                    <li>Integrated Razorpay for milestone billing and webhook-driven entitlements.</li>
                                    <li>Deployed backend on Railway and frontend on Vercel.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            <div className="text-gray-400 font-mono">June 2023 - July 2023</div>
                            <div className="md:col-span-3">
                                <h3 className="text-2xl font-bold mb-2">Android Developer Intern</h3>
                                <p className="text-accent mb-4">JSW</p>
                                <p className="text-gray-400 leading-relaxed">
                                    Developed a Feedback Management System Android application integrated with ERP systems to enhance operational efficiency.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Education Section */}
                <section className="py-20 border-t border-white/10">
                    <h2 className="text-4xl font-display font-bold uppercase mb-16">Education</h2>

                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            <div className="text-gray-400 font-mono">2024 - 2027</div>
                            <div className="md:col-span-3">
                                <h3 className="text-2xl font-bold mb-2">B.E. in Computer Engineering</h3>
                                <p className="text-accent mb-4">Pillai HOC College of Engineering and Technology</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            <div className="text-gray-400 font-mono">2021 - 2024</div>
                            <div className="md:col-span-3">
                                <h3 className="text-2xl font-bold mb-2">Diploma in Computer Technology</h3>
                                <p className="text-accent mb-4">Government Polytechnic, Pen</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
