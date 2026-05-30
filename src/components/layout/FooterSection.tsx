import React from 'react';

const FooterSection = () => {
    return (
        <section className="w-full bg-surface border-t border-foreground mt-0">
            <div className="w-full max-w-[1920px] mx-auto flex flex-col items-center">
                {/* Social Links Row */}
                <div className="flex flex-wrap justify-center w-full">
                    {[
                        { name: 'Twitter', url: 'https://x.com/Hey_viswa_' },
                        { name: 'Instagram', url: 'https://www.instagram.com/theoptivus/' },
                        { name: 'GitHub', url: 'https://github.com/Hey-Viswa/Hey-Viswa' },
                        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/biswaranjangiri/' },
                        { name: 'YouTube', url: 'https://www.youtube.com/@theoptivus' }
                    ].map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[120px] md:min-w-[200px] py-6 flex items-center justify-center gap-2 border-r border-b border-foreground text-foreground hover:bg-accent hover:text-surface transition-colors font-mono uppercase tracking-widest text-xs"
                            aria-label={`${social.name} Profile`}
                        >
                            {social.name}
                            <span className="text-lg leading-none">↗</span>
                        </a>
                    ))}
                </div>



                {/* Copyright */}
                <div className="w-full flex justify-between items-center px-6 md:px-12 py-4 bg-background text-foreground font-mono text-xs uppercase tracking-widest">
                    <span>© {new Date().getFullYear()}</span>
                    <span>All Rights Reserved</span>
                </div>
            </div>
        </section>
    );
};

export default FooterSection;
