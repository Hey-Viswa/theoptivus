import ParticleText from '@/components/ui/ParticleText';
import DitherBackground from '@/components/ui/DitherBackground';

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-[100svh] flex flex-col overflow-hidden bg-background"
        >
            {/* ── Dither effect — hero only ── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DitherBackground className="w-full h-full" />
            </div>

            {/* ── Centered hero content (full-bleed particle name) ── */}
            <div className="relative z-[2] flex-1 flex flex-col items-center justify-center text-center w-full pt-28 sm:pt-24 pb-6 pointer-events-none">
                <span className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-foreground/60 mb-2 md:mb-4 block px-6 pointer-events-auto">
                    Full-Stack Developer — Systems Builder
                </span>

                {/* Interactive particle name — drag your cursor through the letters */}
                <h1 className="sr-only">Biswaranjan — Full-Stack Developer</h1>
                <ParticleText
                    text={"BISWA\nRANJAN"}
                    className="w-full h-[clamp(150px,40vh,420px)] sm:h-[clamp(200px,48vh,520px)] md:h-[56vh] px-4 sm:px-0 pointer-events-none"
                />

                <p className="text-base sm:text-lg md:text-2xl text-foreground/70 max-w-xl md:max-w-2xl mt-2 md:mt-4 mb-8 md:mb-10 px-6 font-sans pointer-events-auto">
                    Building{' '}
                    <span className="highlight-blue italic font-serif font-normal normal-case text-background">production-grade</span>{' '}
                    SaaS &amp; modern web apps.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto px-6 pointer-events-auto">
                    <a href="/work" className="editorial-btn bg-foreground text-background px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold hover:bg-accent transition-colors duration-200">
                        View Work
                    </a>
                    <a href="/contact" className="editorial-btn border border-foreground bg-background/60 text-foreground px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-colors duration-200">
                        Contact
                    </a>
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="relative z-[2] w-full">
                <div className="border-y border-foreground bg-foreground text-background flex items-center justify-between gap-2 sm:gap-3 py-4 px-4 md:px-12 text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold shadow-2xl">
                    <span className="whitespace-nowrap">Full-Stack Developer</span>
                    <div className="hidden sm:flex items-center gap-3">
                        <span>Systems Builder</span>
                        <span className="w-1.5 h-1.5 bg-background rounded-full" />
                        <span>Creator</span>
                    </div>
                    <span className="hidden sm:inline whitespace-nowrap">Available for Freelance</span>
                </div>
            </div>
        </section>
    );
}

