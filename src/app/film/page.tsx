import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/site';
import { FILM_PROFILE } from '@/data/film';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight, ArrowUpRight } from '@/components/ui/Icons';
import {
  ScribbleUnderline,
  FilmSprocketStrip,
  SketchDivider,
} from '@/components/ui/Scribbles';
import {
  CameraDoodle,
  ClapperDoodle,
  ViswaDoodle,
  MarginNote,
} from '@/components/ui/Characters';

export const metadata: Metadata = {
  title: 'Film & Visual',
  description: `Cinematography, editing, sound design, and technical visual essays by ${SITE_CONFIG.name} (@${FILM_PROFILE.handle}).`,
};

export default function FilmPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 pt-12 pb-24 md:pt-20">
      <Reveal>
        {/* Header */}
        <section className="space-y-6 pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <CameraDoodle className="w-12 h-9 text-[var(--fg-primary)] shrink-0" />
            <span className="font-mono text-xs text-[var(--fg-muted)]">
              @{FILM_PROFILE.handle} · {FILM_PROFILE.eyebrow}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[var(--fg-primary)] leading-[1.1]">
              Film &amp;{' '}
              <span className="relative inline-block">
                Visual
                <ScribbleUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-[var(--accent)]" />
              </span>{' '}
              Direction
            </h1>

            <MarginNote
              text="24fps, deliberate framing, real sound"
              arrowVariant="down-left"
              arrowPosition="left"
              className="shrink-0"
            />
          </div>

          <p className="text-base sm:text-lg text-[var(--fg-secondary)] leading-relaxed max-w-[62ch]">
            {FILM_PROFILE.summary}
          </p>
        </section>

        <FilmSprocketStrip className="w-full h-5 text-[var(--border-strong)]" />

        {/* 4 Craft Pillars */}
        <section className="py-12 md:py-16">
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--fg-primary)]">
              Craft &amp; Focus
            </h2>
            <span className="font-mono text-xs text-[var(--fg-muted)]">
              01 — 04
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {FILM_PROFILE.pillars.map((pillar) => (
              <article
                key={pillar.index}
                className="notebook-card rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 font-mono text-xs text-[var(--fg-muted)]">
                    <span>{pillar.index}</span>
                    <span>{pillar.discipline}</span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[var(--fg-primary)]">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <ul className="pt-3 border-t border-[var(--border-subtle)] space-y-1.5">
                  {pillar.notes.map((note) => (
                    <li
                      key={note}
                      className="flex items-start gap-2 font-mono text-xs text-[var(--fg-muted)]"
                    >
                      <span className="text-[var(--accent)]" aria-hidden="true">
                        •
                      </span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <SketchDivider className="w-full h-3 text-[var(--border-strong)]" />

        {/* Director Slate & Self-Hosted CMS Plan */}
        <section className="pt-12 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3">
                <ClapperDoodle className="w-11 h-10 text-[var(--fg-primary)] shrink-0" />
                <span className="font-mono text-xs text-[var(--accent)] font-medium">
                  {FILM_PROFILE.cmsRoadmap.status}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--fg-primary)] leading-[1.15]">
                Building my own engineering &amp; director CMS.
              </h2>

              <p className="text-sm sm:text-base text-[var(--fg-secondary)] leading-relaxed">
                {FILM_PROFILE.cmsRoadmap.description}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/work/harsh-portfolio"
                  className="group inline-flex items-center gap-2 bg-[var(--bg-inverse)] text-[#F6F5F0] hover:bg-[var(--accent)] rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  <span>See Harsh Savale’s CMS</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>

                <a
                  href={FILM_PROFILE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--fg-primary)] rounded-lg px-4 py-2.5 font-mono text-xs transition-colors"
                >
                  <span>Instagram @yoitsviswa</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 notebook-card rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
                <span className="font-mono text-xs text-[var(--fg-muted)]">
                  cms-schema / film-entry.ts
                </span>
                <ViswaDoodle className="w-9 h-9 text-[var(--fg-primary)]" />
              </div>

              <div className="divide-y divide-[var(--border-subtle)]">
                {FILM_PROFILE.cmsRoadmap.schemaPreview.map((field) => (
                  <div
                    key={field.key}
                    className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                  >
                    <div className="flex items-baseline gap-2 shrink-0">
                      <code className="font-mono text-xs font-semibold text-[var(--fg-primary)]">
                        {field.key}
                      </code>
                      <span className="font-mono text-[11px] text-[var(--accent)]">
                        {field.type}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--fg-secondary)] sm:text-right">
                      {field.purpose}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <span className="font-hand text-xl text-[var(--accent)] leading-none">
                  shoots, edits &amp; tech essays welcome
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--fg-primary)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
                >
                  <span>Book a shoot or talk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
