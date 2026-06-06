interface MarqueeProps {
    items: string[];
    className?: string;
}

/**
 * Lightweight, CSS-driven infinite marquee (no pinning, no JS loop). Content is
 * duplicated once and translated -50% for a seamless loop. Brutalist ticker band:
 * charcoal bar, oversized display type, blue accent separators.
 */
export default function Marquee({ items, className = '' }: MarqueeProps) {
    const loop = [...items, ...items];

    return (
        <div
            className={`group overflow-hidden border-y border-foreground bg-foreground text-background ${className}`}
            aria-hidden="true"
        >
            <div className="flex w-max animate-marquee whitespace-nowrap py-4 md:py-5 [@media(pointer:fine)]:group-hover:[animation-play-state:paused]">
                {loop.map((item, i) => (
                    <span key={i} className="flex items-center">
                        <span className="font-display font-black uppercase tracking-tight text-2xl md:text-4xl px-6 md:px-8">
                            {item}
                        </span>
                        <span className="text-accent text-2xl md:text-3xl">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
