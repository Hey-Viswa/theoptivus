import { PortraitPrint } from '@/components/ui/PortraitPrint';
import type { Metadata } from 'next';
import { PROFILE } from '@/data/profile';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Biswaranjan Giri, a software engineer building web products, backend systems, and Android apps.',
};

export default function AboutPage() {
  return (
    <div className="site-width editorial-page">
      <header className="editorial-page-head">
        <h1 className="editorial-title">About me</h1>
      </header>
      <div className="about-layout">
        <PortraitPrint />
        <div className="about-copy">
          {PROFILE.bioParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <section aria-labelledby="experience-title">
            <h2 className="editorial-heading" id="experience-title">Experience</h2>
            {PROFILE.experience.map((item) => (
              <article key={item.company}>
                <h3>{item.role}, {item.company}</h3>
                <p className="editorial-label">{item.period} · {item.location}</p>
                <p>{item.summary}</p>
              </article>
            ))}
          </section>
          <section aria-labelledby="education-title">
            <h2 className="editorial-heading" id="education-title">Education</h2>
            {PROFILE.education.map((item) => (
              <article key={item.institution}>
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                <p className="editorial-label">{item.period} · {item.location}</p>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
