import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/data/site';
import { PROFILE } from '@/data/profile';
import { getFeaturedProjects } from '@/data/projects';
import { SYSTEM_BUILDS } from '@/data/systems';
import { FILM_PROFILE } from '@/data/film';
import { getSkillsByDomain } from '@/data/skills';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight, Mail } from '@/components/ui/Icons';
import {
  ScribbleUnderline,
  ScribbleCircle,
  SketchDivider,
  AsteriskDoodle,
  DoodleSpark,
  FilmSprocketStrip,
} from '@/components/ui/Scribbles';
import {
  ViswaDoodle,
  CameraDoodle,
  AndroidCodeDoodle,
  ClapperDoodle,
  SketchTape,
  MarginNote,
} from '@/components/ui/Characters';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const engineeringSkills = getSkillsByDomain().filter(
    (group) => group.domain !== 'Film & Visual Craft'
  );
  const primaryExperience = PROFILE.experience[0];
  const primaryEducation = PROFILE.education[0];

  return (
    <div className="animate-page-enter">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 pt-10 pb-14 md:pt-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left 7 Columns */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <DoodleSpark className="w-5 h-5 text-[var(--accent)] shrink-0" />
              <p className="font-hand text-2xl sm:text-[1.65rem] leading-none text-[var(--fg-secondary)]">
                hi, I’m Viswa — engineer &amp; director
              </p>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.15rem] font-semibold tracking-[-0.03em] leading-[1.12] text-[var(--fg-primary)]">
              I build{' '}
              <span className="relative inline-block">
                web &amp; Android
                <ScribbleUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-[var(--accent)]" />
              </span>{' '}
              systems, and shoot{' '}
              <span className="whitespace-nowrap">
                <span className="relative inline-block px-3 py-0.5">
                  films
                  <ScribbleCircle className="absolute -inset-x-1 -inset-y-1 w-[calc(100%+0.5rem)] h-[calc(100%+0.5rem)] text-[var(--accent)] pointer-events-none" />
                </span>
                .
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--fg-secondary)] leading-relaxed max-w-[54ch]">
              Working across backend architectures, Next.js, and native Kotlin
              + Jetpack Compose apps. I run{' '}
              <Link
                href="/work/freshkatta"
                className="font-medium text-[var(--fg-primary)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors"
              >
                FreshKatta
              </Link>{' '}
              solo in production, built a custom CMS for{' '}
              <Link
                href="/work/harsh-portfolio"
                className="font-medium text-[var(--fg-primary)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors"
              >
                Harsh Savale
              </Link>
              , and direct visual stories under{' '}
              <Link
                href="/film"
                className="font-medium text-[var(--fg-primary)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors"
              >
                @{SITE_CONFIG.filmHandle}
              </Link>
              .
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 bg-[var(--bg-inverse)] text-[#F6F5F0] hover:bg-[var(--accent)] rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
              >
                <span>View work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/film"
                className="inline-flex items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--fg-primary)] rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
              >
                <span>Film direction</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                <span>Contact</span>
              </Link>
            </div>

            {/* Dual-craft hand-drawn quick links (visible on mobile & desktop) */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[var(--fg-muted)]">
              <Link
                href="/work#systems"
                className="inline-flex items-center gap-2 hover:text-[var(--fg-primary)] transition-colors"
              >
                <AndroidCodeDoodle className="w-6 h-6 text-[var(--fg-primary)] shrink-0" />
                <span>Systems &amp; Kotlin</span>
              </Link>
              <Link
                href="/film"
                className="inline-flex items-center gap-2 hover:text-[var(--fg-primary)] transition-colors"
              >
                <CameraDoodle className="w-7 h-5 text-[var(--fg-primary)] shrink-0" />
                <span>Camera &amp; Edit (@{SITE_CONFIG.filmHandle})</span>
              </Link>
            </div>
          </div>

          {/* Right 5 Columns: Taped Sketchbook Portrait Print */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end pt-3 lg:pt-0">
            <div className="relative w-full max-w-[330px]">
              <SketchTape className="w-24 h-6 absolute -top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none" />
              <div className="portrait-print rounded-xl p-3 sm:p-4">
                <div className="relative aspect-square rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-portrait-mat)]">
                  <Image
                    src="/viswa.jpg"
                    alt="Viswaranjan Giri portrait"
                    fill
                    priority
                    sizes="330px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-3 px-1 flex items-baseline justify-between gap-2">
                  <span className="font-hand text-2xl text-[var(--fg-primary)] leading-none">
                    Viswa, Mumbai
                  </span>
                  <span className="font-mono text-xs text-[var(--fg-muted)]">
                    {SITE_CONFIG.nativeName} · @{SITE_CONFIG.handle}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 w-full max-w-[330px] flex justify-center lg:justify-end">
              <MarginNote
                text="usually behind a terminal or a lens"
                arrowVariant="up-right"
                arrowPosition="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fact Strip Bounded by Organic Rules */}
      <section aria-label="Highlights" className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10">
        <SketchDivider className="w-full h-3 text-[var(--border-strong)]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
          {PROFILE.facts.map((fact) => (
            <Link
              key={fact.index}
              href={fact.href ?? '/work'}
              className="group block py-5 sm:px-5 first:sm:pl-0 last:sm:pr-0 transition-colors"
            >
              <span className="block font-mono text-xs text-[var(--fg-muted)] mb-1">
                {fact.label}
              </span>
              <div className="font-display text-lg font-semibold tracking-tight text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors">
                {fact.value}
              </div>
              <p className="mt-0.5 text-xs text-[var(--fg-secondary)]">
                {fact.detail}
              </p>
            </Link>
          ))}
        </div>
        <SketchDivider className="w-full h-3 text-[var(--border-strong)]" />
      </section>

      {/* Selected Work (Uniform Visual Plates) */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 py-16 md:py-20">
        <Reveal>
          <SectionHeader
            title="Selected work"
            action={{ label: 'All projects', href: '/work' }}
            className="mb-4"
          />

          <div className="mb-10">
            <MarginNote
              text="shipped builds — click for notes"
              arrowVariant="down-left"
              arrowPosition="left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant={index < 2 ? 'featured' : 'grid'}
                priority={index < 2}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Systems & Native Android Builds */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 pb-16 md:pb-24">
        <Reveal>
          <SketchDivider className="w-full h-3 text-[var(--border-strong)] mb-10" />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex items-center gap-3.5">
              <AndroidCodeDoodle className="w-11 h-11 text-[var(--fg-primary)] shrink-0" />
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--fg-primary)]">
                  Under the hood
                </h2>
                <p className="text-sm text-[var(--fg-secondary)] mt-0.5">
                  Native Android, ML adjudication, Git internals &amp; distributed ledgers.
                </p>
              </div>
            </div>

            <Link
              href="/work#systems"
              className="group inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--fg-primary)] hover:text-[var(--accent)] transition-colors shrink-0 self-start sm:self-auto"
            >
              <span className="underline decoration-[var(--border-strong)] underline-offset-4 group-hover:decoration-[var(--accent)]">
                Explore systems
              </span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SYSTEM_BUILDS.map((build) => (
              <Link
                key={build.id}
                href="/work#systems"
                className="notebook-card rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--fg-muted)]">
                      <AsteriskDoodle className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{build.category}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[var(--fg-muted)]">
                      {build.status}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {build.name}
                  </h3>

                  <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                    {build.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
                  {build.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--fg-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Film & Visual Direction Strip */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 pb-16 md:pb-24">
        <Reveal>
          <FilmSprocketStrip className="w-full h-5 text-[var(--border-strong)]" />

          <div className="py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <CameraDoodle className="w-11 h-8 text-[var(--fg-primary)] shrink-0" />
                <ClapperDoodle className="w-10 h-9 text-[var(--fg-primary)] shrink-0" />
                <span className="font-hand text-2xl text-[var(--accent)] leading-none">
                  off the keyboard, behind the lens
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--fg-primary)] leading-[1.15]">
                {FILM_PROFILE.headline}
              </h2>

              <p className="text-sm sm:text-base text-[var(--fg-secondary)] leading-relaxed max-w-[58ch]">
                {FILM_PROFILE.summary}
              </p>
            </div>

            <div className="lg:col-span-5 notebook-card rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 font-mono text-xs text-[var(--fg-muted)]">
                <span>@{FILM_PROFILE.handle}</span>
                <span>4 craft pillars</span>
              </div>

              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                {FILM_PROFILE.cmsRoadmap.description}
              </p>

              <Link
                href="/film"
                className="group inline-flex items-center gap-2 bg-[var(--bg-inverse)] text-[#F6F5F0] hover:bg-[var(--accent)] rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                <span>Open film &amp; CMS roadmap</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <FilmSprocketStrip className="w-full h-5 text-[var(--border-strong)]" />
        </Reveal>
      </section>

      {/* Background Preview */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 pb-16 md:pb-24">
        <Reveal>
          <SectionHeader
            title="Background"
            action={{ label: 'About', href: '/about' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {primaryExperience && (
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--fg-muted)]">
                  <span>Internship</span>
                  <span>{primaryExperience.period}</span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--fg-primary)]">
                    {primaryExperience.role}
                  </h3>
                  <p className="text-sm text-[var(--fg-secondary)] mt-0.5">
                    {primaryExperience.company}
                  </p>
                </div>

                <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                  Built an internal Android Feedback Management System with REST
                  APIs in an enterprise SAP environment.
                </p>
              </div>
            )}

            {primaryEducation && (
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--fg-muted)]">
                  <span>Degree</span>
                  <span>{primaryEducation.period}</span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--fg-primary)]">
                    {primaryEducation.degree}
                  </h3>
                  <p className="text-sm text-[var(--fg-secondary)] mt-0.5">
                    {primaryEducation.institution}
                  </p>
                </div>

                <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                  Studying Computer Engineering in {primaryEducation.location}{' '}
                  while building production web and native Android software.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Skills Preview (6 Engineering Domains) */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 pb-16 md:pb-24">
        <Reveal>
          <SectionHeader
            title="Skills"
            action={{ label: 'Full stack', href: '/skills' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {engineeringSkills.map((group) => (
              <div
                key={group.domain}
                className="pt-4 border-t border-[var(--border-subtle)] space-y-1.5"
              >
                <h3 className="font-display text-base font-semibold tracking-tight text-[var(--fg-primary)]">
                  {group.domain}
                </h3>

                <p className="font-mono text-xs text-[var(--fg-secondary)] leading-relaxed">
                  {group.skills
                    .slice(0, 4)
                    .map((skill) => skill.name)
                    .join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Closing Contact with Character */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 pb-16 md:pb-24">
        <Reveal>
          <SketchDivider className="w-full h-3 text-[var(--border-strong)] mb-12" />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="flex items-start gap-4 max-w-xl">
              <ViswaDoodle className="w-16 h-16 text-[var(--fg-primary)] shrink-0 mt-0.5" />
              <div className="space-y-2.5">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--fg-primary)] leading-[1.15]">
                  Want to build or shoot something together?
                </h2>

                <p className="text-sm sm:text-base text-[var(--fg-secondary)] leading-relaxed">
                  Reach out about software engineering roles, native Android &amp;
                  CMS builds, or videography work.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <MarginNote
                text="say hi!"
                arrowVariant="right"
                arrowPosition="right"
              />
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-[var(--bg-inverse)] text-[#F6F5F0] hover:bg-[var(--accent)] rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
              >
                <span>Contact</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--border-strong)] hover:text-[var(--accent)] rounded-lg px-4 py-2.5 font-mono text-xs font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
