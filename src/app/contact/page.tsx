import type { Metadata } from 'next';
import { ContactForm, DirectEmailCard } from '@/components/contact/ContactForm';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${SITE_CONFIG.name} about software engineering roles, projects, and collaborations.`,
};

export default function ContactPage() {
  return (
    <div className="site-width editorial-page contact-page">
      <header className="editorial-page-head">
        <p className="editorial-label">
          {SITE_CONFIG.name} · {SITE_CONFIG.location}
        </p>
        <h1 className="editorial-title">Contact</h1>
        <p className="editorial-intro">
          Have a role in mind, something to build, or a question about my work? I’d like to hear
          from you.
        </p>
      </header>

      <div className="contact-layout">
        <aside className="contact-sidebar" aria-label="Contact details">
          <DirectEmailCard />
          <p>
            {SITE_CONFIG.role} · {SITE_CONFIG.location}
          </p>
          <ul className="contact-socials" aria-label="Social links">
            {SOCIAL_LINKS.map(({ name, href }) => (
              <li key={name}>
                <a
                  className="text-link inline-flex min-h-[44px] items-center"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
            Send a note using the form, or reach me directly by email. If direct form delivery isn’t
            active in your browser, submitting prepares a ready-to-send email draft.
          </p>
        </aside>

        <section
          className="contact-letter mt-4 md:mt-0"
          aria-labelledby="contact-letter-heading"
        >
          <h2 className="editorial-heading" id="contact-letter-heading">
            Send a note
          </h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
