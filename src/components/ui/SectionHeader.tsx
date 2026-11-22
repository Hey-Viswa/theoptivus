import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Icons';

export interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeader({
  title,
  description,
  action,
  as: HeadingTag = 'h2',
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 ${className}`}
    >
      <div className="space-y-2 max-w-2xl">
        <HeadingTag className="font-display text-2xl sm:text-3xl md:text-[2.15rem] font-semibold tracking-tight text-[var(--fg-primary)] leading-[1.16]">
          {title}
        </HeadingTag>

        {description && (
          <p className="text-sm sm:text-base text-[var(--fg-secondary)] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          <Link
            href={action.href}
            className="group inline-flex items-center gap-2 font-mono text-xs text-[var(--fg-primary)] hover:text-[var(--accent)] underline decoration-[var(--border-strong)] underline-offset-4 hover:decoration-[var(--accent)] transition-colors"
          >
            <span>{action.label}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
