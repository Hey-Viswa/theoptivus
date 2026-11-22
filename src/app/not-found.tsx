import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from '@/components/ui/Icons';

export default function NotFound() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-12 space-y-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          <span>404</span>
          <span aria-hidden="true">/</span>
          <span className="text-[var(--fg-muted)]">Entry Not Found</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--fg-primary)] leading-[1.15]">
          This page does not exist in the index.
        </h1>

        <p className="text-base text-[var(--fg-secondary)] leading-relaxed">
          The route you requested may have moved or is no longer listed in the
          archive. Return to the overview or browse the selected engineering case
          studies.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--bg-inverse)] text-[#F6F5F0] hover:bg-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to overview</span>
          </Link>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors"
          >
            <span>Browse selected work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
