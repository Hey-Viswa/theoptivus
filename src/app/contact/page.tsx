import type { Metadata } from 'next';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/data/site';
import { ContactForm, DirectEmailCard } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Biswaranjan Giri about software engineering roles, projects, and collaborations.',
};

export default function ContactPage() {
  return (
    <div className="site-width editorial-page contact-page">
      <header className="editorial-page-head">
        <h1 className="editorial-title">Contact</h1>
        <p className="editorial-intro">Have a role in mind, something to build, or a question about my work? I’d like to hear from you.</p>
      </header>

      <div className="contact-layout">
        <aside className="contact-sidebar" aria-label="Contact details">
          <DirectEmailCard />
          <p>{SITE_CONFIG.location}</p>
          <ul className="contact-socials" aria-label="Social links">
            {SOCIAL_LINKS.map(({ name, href }) => (
              <li key={name}><a className="text-link" href={href}>{name}</a></li>
            ))}
          </ul>
        </aside>
        <section className="contact-letter" aria-labelledby="contact-letter-heading">
          <h2 className="editorial-heading" id="contact-letter-heading">Send a note</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
