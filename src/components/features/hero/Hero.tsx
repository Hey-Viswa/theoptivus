import DitherBackground from '@/components/ui/DitherBackground';
import CanvasText from '@/components/ui/CanvasText';

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col bg-background overflow-hidden"
        >
            {/* ── WebGL Bayer Dithering Background ── */}
            <div className="absolute inset-0 z-0 opacity-100">
                <DitherBackground className="w-full h-full" />
            </div>

            {/* ── Centered hero content ── */}
            <div className="relative z-[2] flex-1 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.08] tracking-tight text-foreground mb-8 max-w-5xl pointer-events-auto">
                    Building{' '}
                    <span className="highlight-blue italic font-serif font-normal normal-case text-background">production-grade</span>{' '}
                    SaaS &amp;{' '}
                    <span className="highlight-yellow italic font-serif font-normal normal-case text-foreground">modern</span>{' '}
                    web apps.
                </h1>
                <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mb-10 font-sans">
                    Full-stack developer specializing in Android, MERN Stack, and System Design.
                    Architectures that are compliant, bug-proof, &amp; instant.
                </p>
                <div className="flex items-center gap-4 pointer-events-auto">
                    <a href="#works" className="editorial-btn bg-foreground text-background px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold hover:bg-accent transition-colors duration-200">
                        View Work
                    </a>
                    <a href="#contact" className="editorial-btn border border-foreground text-foreground px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-colors duration-200">
                        Contact
                    </a>
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="relative z-[2] mx-6 md:mx-12">
                <div className="border-t border-foreground/20 flex items-center justify-between py-5 px-4 md:px-8">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/40">Full-Stack Developer</span>
                    <div className="flex items-center gap-4 font-mono text-xs uppercase text-foreground/40">
                        <span>Systems Builder</span>
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>Creator</span>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/40">Available for Freelance</span>
                </div>
            </div>
        </section>
    );
}
