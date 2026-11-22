'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG, NAV_ITEMS } from '@/data/site';
import { Check, Copy, Menu, Close, ArrowUpRight } from '@/components/ui/Icons';
import { SignatureMark, ScribbleUnderline } from '@/components/ui/Scribbles';
import { ViswaDoodle } from '@/components/ui/Characters';

export function SiteHeader() {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isMobileMenuOpen = openPathname === pathname;

  const closeMobileMenu = useCallback(() => {
    setOpenPathname(null);
  }, []);

  const toggleMobileMenu = () => {
    setOpenPathname((prev) => (prev === pathname ? null : pathname));
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${SITE_CONFIG.email}`;
    }
  };

  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-[var(--bg-canvas)]/92 backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div className="max-w-[1200px] mx-auto h-full px-5 sm:px-6 md:px-10 flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="inline-flex items-center text-[var(--fg-primary)] focus-visible:rounded-sm shrink-0"
          aria-label={`${SITE_CONFIG.name} — Home`}
        >
          <SignatureMark className="h-7 w-auto text-[var(--fg-primary)]" />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const active = isRouteActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1.5 text-sm font-medium transition-colors duration-150 ${
                  active
                    ? 'text-[var(--fg-primary)]'
                    : 'text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]'
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <ScribbleUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-[var(--accent)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Compact 1-tap Email Copy for Mobile */}
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label={
              copied
                ? 'Email address copied'
                : `Copy email address ${SITE_CONFIG.email}`
            }
            className="sm:hidden inline-flex items-center gap-1.5 h-10 px-3 rounded-lg text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="text-[var(--accent)] font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--fg-muted)]" />
                <span>Email</span>
              </>
            )}
          </button>

          {/* Desktop / Tablet Copy Email */}
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label={
              copied
                ? 'Email address copied'
                : `Copy email address ${SITE_CONFIG.email}`
            }
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors duration-150 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="text-[var(--accent)] font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--fg-muted)]" />
                <span>Copy email</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={
              isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <Close className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-[var(--bg-inverse)]/25 backdrop-blur-[2px] md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="relative z-50 md:hidden bg-[var(--bg-canvas)] border-b border-[var(--border-strong)] shadow-lg"
          >
            <div className="max-w-[1200px] mx-auto px-5 py-5 flex flex-col gap-3">
              <div className="flex items-center gap-3 pb-2 border-b border-[var(--border-subtle)]">
                <ViswaDoodle className="w-11 h-11 text-[var(--fg-primary)] shrink-0" />
                <div>
                  <p className="font-hand text-xl leading-tight text-[var(--accent)]">
                    hey — pick a page
                  </p>
                  <p className="font-mono text-[11px] text-[var(--fg-muted)]">
                    @{SITE_CONFIG.handle} · @{SITE_CONFIG.filmHandle}
                  </p>
                </div>
              </div>

              <nav aria-label="Mobile navigation links" className="flex flex-col">
                {NAV_ITEMS.map((item) => {
                  const active = isRouteActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      aria-current={active ? 'page' : undefined}
                      className={`min-h-[48px] flex items-center justify-between px-1 py-3 border-b border-[var(--border-subtle)] last:border-b-0 text-base font-medium transition-colors ${
                        active
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--fg-primary)] hover:text-[var(--accent)]'
                      }`}
                    >
                      <span className="relative inline-block">
                        {item.label}
                        {active && (
                          <ScribbleUnderline className="absolute -bottom-1 left-0 w-full h-2 text-[var(--accent)]" />
                        )}
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-70" />
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-muted)]">
                    Email
                  </p>
                  <p className="font-mono text-xs text-[var(--fg-primary)] truncate mt-0.5">
                    {SITE_CONFIG.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="shrink-0 inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-primary)] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span className="text-[var(--accent)]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[var(--fg-muted)]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default SiteHeader;
