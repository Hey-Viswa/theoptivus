'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG, NAV_ITEMS, SOCIAL_LINKS } from '@/data/site';
import { ArrowUpRight } from '@/components/ui/Icons';
import { SignatureMark, SketchDivider } from '@/components/ui/Scribbles';
import { ViswaDoodle } from '@/components/ui/Characters';

export function SiteFooter() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-canvas)] text-[var(--fg-primary)]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10">
        <SketchDivider className="w-full h-3 text-[var(--border-strong)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-[var(--border-subtle)]">
          {/* Column 1: Identity & Direct Email */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ViswaDoodle className="w-10 h-10 text-[var(--fg-primary)] shrink-0" />
                <Link
                  href="/"
                  className="inline-flex items-center text-[var(--fg-primary)]"
                  aria-label={`${SITE_CONFIG.name} — Home`}
                >
                  <SignatureMark className="h-8 w-auto text-[var(--fg-primary)]" />
                </Link>
              </div>
              <p className="text-sm text-[var(--fg-secondary)]">
                {SITE_CONFIG.name}, {SITE_CONFIG.location}
              </p>
              <p className="font-mono text-xs text-[var(--fg-muted)]">
                @{SITE_CONFIG.handle} · @{SITE_CONFIG.filmHandle}
              </p>
            </div>

            <div className="font-mono text-xs">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-1.5 text-[var(--fg-primary)] hover:text-[var(--accent)] transition-colors"
              >
                <span>{SITE_CONFIG.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Mobile 2-Column Wrapper so Pages + Elsewhere fit side-by-side */}
          <div className="grid grid-cols-2 gap-8 md:contents">
            {/* Column 2: Pages */}
            <div className="md:col-span-3 space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
                Pages
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Socials & Back to Top */}
            <div className="md:col-span-4 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
                  Elsewhere
                </p>
                <ul className="space-y-2 text-sm">
                  {SOCIAL_LINKS.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
                      >
                        <span>{social.name}</span>
                        <span className="font-mono text-xs text-[var(--fg-muted)]">
                          {social.handle}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleBackToTop}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                >
                  <span>Back to top</span>
                  <span aria-hidden="true">↑</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-[var(--fg-muted)]">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}
          </p>
          <p>{SITE_CONFIG.location}</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
