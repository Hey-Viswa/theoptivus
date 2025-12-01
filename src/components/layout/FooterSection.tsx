import React from 'react';

const FooterSection = () => {
    return (
        <section className="w-full bg-white pt-20 pb-4 flex justify-center items-center overflow-hidden">
            <div className="w-full px-4 md:px-8 flex flex-col items-center">
                {/* Social Links Row */}
                <div className="flex gap-8 mb-8">
                    {[
                        { name: 'TWITTER', url: 'https://x.com/Hey_viswa_' },
                        { name: 'INSTAGRAM', url: 'https://www.instagram.com/theoptivus/' },
                        { name: 'GITHUB', url: 'https://github.com/Hey-Viswa/Hey-Viswa' },
                        { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/biswaranjangiri/' },
                        { name: 'YOUTUBE', url: 'https://www.youtube.com/@theoptivus' }
                    ].map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 text-sm font-normal tracking-wide hover:opacity-75 transition-opacity duration-200 uppercase flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded-sm"
                            aria-label={`${social.name} Profile`}
                        >
                            {social.name} ↗
                        </a>
                    ))}
                </div>

                {/* Name */}
                <h1 className="font-sans font-black tracking-tighter leading-none text-center text-black text-[clamp(40px,13vw,300px)] w-full px-0 whitespace-nowrap">
                    BISWARANJAN
                </h1>
            </div>
        </section>
    );
};

export default FooterSection;
