import React from 'react';

const FooterSection = () => {
    return (
        <section className="w-full bg-background border-t border-foreground mt-0">
            <div className="w-full flex flex-col items-center">
                {/* Social Links Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 w-full overflow-hidden">
                    {[
                        { name: 'Twitter', url: 'https://x.com/Hey_viswa_' },
                        { name: 'Instagram', url: 'https://www.instagram.com/theoptivus/' },
                        { name: 'GitHub', url: 'https://github.com/Hey-Viswa' },
                        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/biswaranjangiri/' },
                        { name: 'YouTube', url: 'https://www.youtube.com/@theoptivus' }
                    ].map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-6 flex items-center justify-center gap-2 border-r border-b border-foreground -mr-px -mb-px text-foreground hover:bg-foreground hover:text-background transition-colors font-mono uppercase tracking-widest text-xs"
                            aria-label={`${social.name} Profile`}
                        >
                            {social.name}
                            <span className="text-lg leading-none">↗</span>
                        </a>
                    ))}
                </div>



                {/* Copyright */}
                <div className="w-full flex justify-between items-center gap-3 px-6 md:px-12 py-4 bg-background text-foreground font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest">
                    <span>© {new Date().getFullYear()}</span>
                    <span>All Rights Reserved</span>
                </div>
            </div>
        </section>
    );
};

export default FooterSection;
