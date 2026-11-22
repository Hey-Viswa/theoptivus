import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/data/site';
import { PROFILE } from '@/data/profile';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight, ArrowUpRight, Mail } from '@/components/ui/Icons';
import { ScribbleCircle, SketchDivider } from '@/components/ui/Scribbles';
import {
  SketchTape,
  ViswaDoodle,
  CameraDoodle,
  MarginNote,
} from '@/components/ui/Characters';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Viswaranjan Giri — software engineer and visual director in Mumbai building backend systems, Kotlin + Jetpack Compose Android apps, headless CMS platforms, and films.',
};

export default function AboutPage() {
  const githubLink =
    SOCIAL_LINKS.find((item) => item.name === 'GitHub')?.href ??
    'https://github.com/Hey-Viswa';

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 pb-20 md:pb-28">
      {/* Identity */}
      <section className="py-12 md:py-20">
        <Reveal>
          <SectionHeader
            as="h1"
            title="About"
            description="Viswaranjan Giri · Software Engineer & Visual Director, Mumbai"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <div className="relative w-full max-w-[330px] pt-2">
                <SketchTape className="w-24 h-6 absolute -top-1 left-1/2 -translate-x-1/2 z-10 pointer-events-none" />
                <div className="portrait-print rounded-xl p-3 sm:p-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-portrait-mat)] border border-[var(--border-subtle)]">
                    <Image
                      src={SITE_CONFIG.avatar}
                      alt={`${SITE_CONFIG.name} portrait`}
                      fill
                      priority
                      sizes="330px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="pt-3 px-1 flex items-baseline justify-between gap-2">
                    <span className="font-hand text-2xl text-[var(--fg-primary)] leading-none">
                      Viswa, Mumbai
                    </span>
                    <span className="font-mono text-xs text-[var(--fg-muted)]">
                      {SITE_CONFIG.nativeName} · @{SITE_CONFIG.handle}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 w-full max-w-[330px] flex items-center justify-between gap-3">
                <MarginNote
                  text="engineer by trade, director by habit"
                  arrowVariant="up-right"
                  arrowPosition="right"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-7 pt-1">
              <div className="flex flex-wrap items-center gap-3 pb-1">
                <ViswaDoodle className="w-10 h-10 text-[var(--fg-primary)] shrink-0" />
                <CameraDoodle className="w-10 h-8 text-[var(--fg-primary)] shrink-0" />
                <span className="font-mono text-xs text-[var(--fg-muted)]">
                  @{SITE_CONFIG.handle} · @{SITE_CONFIG.filmHandle}
                </span>
              </div>

              <div className="space-y-5 max-w-[60ch] text-base sm:text-lg text-[var(--fg-secondary)] leading-[1.72]">
                {PROFILE.bioParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[var(--bg-inverse)] text-[#F6F5F0] hover:bg-[var(--accent)] transition-colors"
                >
                  <span>View work</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/film"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--fg-primary)] transition-colors"
                >
                  <span>Film &amp; Visuals</span>
                </Link>

                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-2 py-2 font-mono text-xs text-[var(--fg-secondary)] hover:text-[var(--accent)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SketchDivider className="w-full h-3 text-[var(--border-strong)]" />

      {/* Experience */}
      <section className="py-12 md:py-16">
        <Reveal>
          <SectionHeader title="Experience" />

          <div className="space-y-8">
            {PROFILE.experience.map((exp) => (
              <article
                key={`${exp.company}-${exp.period}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
              >
                <div className="lg:col-span-4 space-y-1.5">
                  <p className="font-mono text-xs text-[var(--fg-muted)]">
                    {exp.period}
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--fg-primary)]">
                    {exp.company}
                  </h3>
                  <p className="font-mono text-xs text-[var(--fg-muted)]">
                    {exp.location}
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <h4 className="font-display text-lg sm:text-xl font-semibold text-[var(--fg-primary)]">
                    {exp.role}
                  </h4>

                  <p className="text-sm sm:text-base text-[var(--fg-secondary)] leading-relaxed max-w-[60ch]">
                    {exp.summary}
                  </p>

                  <ul className="space-y-2 pt-1">
                    {exp.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-[var(--fg-secondary)] leading-relaxed"
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <SketchDivider className="w-full h-3 text-[var(--border-strong)]" />

      {/* Education */}
      <section className="py-12 md:py-16">
        <Reveal>
          <SectionHeader title="Education" />

          <div className="space-y-6">
            {PROFILE.education.map((edu) => (
              <article
                key={edu.degree}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
              >
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="relative inline-flex items-center justify-center px-3 py-1 font-display text-2xl font-semibold text-[var(--fg-primary)]">
                      <span>’27</span>
                      <ScribbleCircle className="absolute inset-0 w-full h-full text-[var(--accent)]" />
                    </span>
                    <div className="space-y-0.5">
                      <p className="font-mono text-xs text-[var(--fg-primary)] font-medium">
                        {edu.period}
                      </p>
                      <p className="font-mono text-[11px] text-[var(--fg-muted)]">
                        {edu.status}
                      </p>
                    </div>
                  </div>
                  <p className="font-mono text-xs text-[var(--fg-muted)] pt-1">
                    {edu.location}
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-1.5">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--fg-primary)]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--fg-secondary)]">
                    {edu.institution}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <SketchDivider className="w-full h-3 text-[var(--border-strong)]" />

      {/* How I work */}
      <section className="py-12 md:py-16">
        <Reveal>
          <SectionHeader title="How I work" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {PROFILE.principles.map((principle) => (
              <article
                key={principle.index}
                className="notebook-card rounded-xl p-5 flex flex-col gap-2"
              >
                <span className="font-mono text-xs text-[var(--fg-muted)]">
                  {principle.index}
                </span>
                <h3 className="font-display text-lg font-semibold text-[var(--fg-primary)]">
                  {principle.title}
                </h3>
                <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <SketchDivider className="w-full h-3 text-[var(--border-strong)]" />

      {/* Links */}
      <section className="py-12 md:py-16">
        <Reveal>
          <SectionHeader title="Links" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="group sm:col-span-2 lg:col-span-1 pt-3 border-t border-[var(--border-subtle)] flex flex-col justify-between gap-2.5 hover:border-[var(--accent)] transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                  Email
                </span>
                <Mail className="w-4 h-4 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors" />
              </div>
              <p className="font-display text-sm font-semibold text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors break-all">
                {SITE_CONFIG.email}
              </p>
            </a>

            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group pt-3 border-t border-[var(--border-subtle)] flex flex-col justify-between gap-2.5 hover:border-[var(--accent)] transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                    {social.name}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <p className="font-display text-sm font-semibold text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {social.handle}
                </p>
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
