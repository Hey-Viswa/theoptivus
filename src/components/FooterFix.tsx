import React from 'react';

interface SocialLink {
    name: string;
    href: string;
    icon?: React.ReactNode;
    label: string;
}

interface FooterFixProps {
    links: SocialLink[];
}

export default function FooterFix({ links }: FooterFixProps) {
    return (
        <div className="w-full py-6 pb-24 md:pb-6"> {/* Added bottom padding for mobile safety */}
            <div
                className="flex flex-wrap justify-center gap-6 md:gap-8 overflow-x-auto md:overflow-visible px-4 py-2 no-scrollbar"
                style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {links.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base font-body hover:underline decoration-accent underline-offset-4 whitespace-nowrap p-2"
                    >
                        {link.icon && <span>{link.icon}</span>}
                        <span className="uppercase tracking-widest">{link.name}</span>
                    </a>
                ))}
            </div>

            {/* Mobile Scroll Hint if needed (optional, visual only) */}
            <div className="md:hidden flex justify-center mt-2 opacity-30">
                <div className="w-12 h-1 bg-gray-700 rounded-full" />
            </div>
        </div>
    );
}
