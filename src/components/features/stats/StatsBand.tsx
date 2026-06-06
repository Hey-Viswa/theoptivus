// Oversized-number stat band — the "big stat" signature move, in the site's
// cream + blue + Space Grotesk language. Light borders + generous whitespace.

const STATS: { value: string; label: string; accent?: boolean }[] = [
    { value: '04', label: 'Apps in production' },
    { value: '5+', label: 'Core stacks shipped' },
    { value: '100%', label: 'Production-ready, not MVPs' },
    { value: 'LIVE', label: 'freshkatta.in shipped', accent: true },
];

export default function StatsBand() {
    return (
        <section id="stats" className="bg-background border-y border-foreground/15">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-14 sm:py-20 md:py-28">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-8 sm:mb-14 block">
                    03 // By the numbers
                </span>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-6 sm:gap-x-10 md:gap-x-16">
                    {STATS.map((s) => (
                        <div key={s.label}>
                            <div
                                className={`font-display font-black tracking-tighter leading-[0.85] text-5xl sm:text-7xl md:text-8xl lg:text-9xl ${
                                    s.accent ? 'text-accent' : 'text-foreground'
                                }`}
                            >
                                {s.value}
                            </div>
                            <div className="mt-3 sm:mt-5 font-mono text-xs md:text-sm uppercase tracking-widest text-foreground/60 max-w-[16ch] leading-relaxed">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
