import AboutSection from '@/components/features/about/AboutSection';
import DitherBackground from '@/components/ui/DitherBackground';

export const metadata = {
    title: 'About | Viswa',
    description: 'Full-stack developer and UI engineer based in India.',
};

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-background">
            <div className="fixed inset-0 z-0 opacity-100 pointer-events-none">
                <DitherBackground className="w-full h-full" />
            </div>
            <div className="relative z-10 pt-24">
                <AboutSection />
            </div>
        </div>
    );
}
