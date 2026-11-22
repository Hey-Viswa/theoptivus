import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowUpRight } from '@/components/ui/Icons';
import { ContactForm, DirectEmailCard } from '@/components/contact/ContactForm';
import { ViswaDoodle, MarginNote } from '@/components/ui/Characters';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Viswaranjan Giri for software engineering, native Android & CMS builds, or videography and visual direction collaborations.',
};

export default function ContactPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 py-12 md:py-20 pb-24">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ViswaDoodle className="w-12 h-12 text-[var(--fg-primary)] shrink-0" />
                <MarginNote
                  text="engineering, Android apps, CMS or shoots"
                  arrowVariant="down-left"
                  arrowPosition="left"
                />
              </div>

              <SectionHeader
                as="h1"
                title="Contact"
                description="Email me directly or send a note here."
                className="mb-2"
              />
            </div>

            <DirectEmailCard />

            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-1.5">
              <div className="flex items-center justify-between gap-2 font-mono text-xs text-[var(--fg-muted)]">
                <span>Location</span>
                <span>IST (UTC+5:30)</span>
              </div>
              <p className="font-display text-base font-semibold text-[var(--fg-primary)]">
                {SITE_CONFIG.location}
              </p>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                Open to full-stack, backend, and native Android roles, custom
                CMS builds, or creative direction collaborations.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
              <span className="block font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                Links
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group py-2 border-b border-[var(--border-subtle)] flex items-center justify-between gap-2 hover:border-[var(--accent)] transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-sm font-semibold text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {social.name}
                      </p>
                      <p className="font-mono text-[11px] text-[var(--fg-muted)] truncate">
                        {social.handle}
                      </p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="notebook-card rounded-xl p-6 sm:p-8">
              <div className="pb-5 mb-6 border-b border-[var(--border-subtle)]">
                <h2 className="font-display text-xl font-semibold text-[var(--fg-primary)]">
                  Send a message
                </h2>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
