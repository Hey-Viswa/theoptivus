'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Close,
  Expand,
} from '@/components/ui/Icons';

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectGalleryProps {
  items?: readonly GalleryItem[];
  gallery?: readonly GalleryItem[];
  images?: readonly GalleryItem[];
  projectTitle?: string;
  className?: string;
}

export function ProjectGallery({
  items,
  gallery,
  images,
  projectTitle = 'Project',
  className = '',
}: ProjectGalleryProps) {
  const slides = items ?? gallery ?? images ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const total = slides.length;
  const safeIndex = total > 0 ? Math.min(activeIndex, total - 1) : 0;
  const currentSlide = slides[safeIndex];

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, handlePrev, handleNext]);

  if (total === 0 || !currentSlide) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Primary Exhibition Stage */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
        <div className="bg-[var(--bg-subtle)]/70 p-3 sm:p-5 border-b border-[var(--border-subtle)]">
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] group">
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt || `${projectTitle} screenshot ${safeIndex + 1}`}
              fill
              priority={safeIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 92vw, 1100px"
              className="object-cover object-top"
            />
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label={`Expand ${currentSlide.caption || currentSlide.alt || projectTitle} in full-screen lightbox`}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs bg-[var(--bg-surface)]/95 text-[var(--fg-primary)] border border-[var(--border-strong)] shadow-sm hover:bg-[var(--bg-inverse)] hover:text-[#F6F5F0] transition-colors cursor-pointer"
            >
              <Expand className="w-3.5 h-3.5" />
              <span>Expand</span>
            </button>
          </div>
        </div>

        {/* Caption & Controls Bar */}
        <div className="px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-surface)]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 font-mono text-xs px-2.5 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--fg-primary)] border border-[var(--border-subtle)]">
              {safeIndex + 1} / {total}
            </span>
            <p className="text-xs sm:text-sm text-[var(--fg-secondary)] truncate">
              {currentSlide.caption || currentSlide.alt}
            </p>
          </div>

          {total > 1 && (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous screenshot"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next screenshot"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Thumbnail Strip */}
      {total > 1 && (
        <div
          role="tablist"
          aria-label={`${projectTitle} gallery thumbnails`}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {slides.map((slide, idx) => {
            const isSelected = idx === safeIndex;
            return (
              <button
                key={`${slide.src}-${idx}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={`View screenshot ${idx + 1}: ${slide.caption || slide.alt}`}
                onClick={() => setActiveIndex(idx)}
                className={`group text-left rounded-xl p-2 border transition-all cursor-pointer bg-[var(--bg-surface)] ${
                  isSelected
                    ? 'border-[var(--fg-primary)] ring-2 ring-[var(--fg-primary)]/10'
                    : 'border-[var(--border-subtle)] opacity-75 hover:opacity-100 hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 45vw, 260px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-2 px-1 flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[11px] ${
                      isSelected ? 'text-[var(--accent)] font-semibold' : 'text-[var(--fg-muted)]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="text-xs text-[var(--fg-secondary)] truncate">
                    {slide.caption || slide.alt}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Accessible Full-Screen Lightbox */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} screenshot lightbox`}
          className="fixed inset-0 z-[90] flex flex-col bg-[var(--bg-inverse)]/95 text-[#F6F5F0] backdrop-blur-md"
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/10 text-[#F6F5F0]">
                {safeIndex + 1} / {total}
              </span>
              <p className="text-sm text-[#F6F5F0]/90 truncate">
                {currentSlide.caption || currentSlide.alt}
              </p>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs bg-white/10 text-[#F6F5F0] hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Close className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>

          {/* Lightbox Stage */}
          <div
            className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden"
            onClick={closeLightbox}
          >
            <div
              className="relative w-full max-w-6xl aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-[#0E0F11] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentSlide.src}
                alt={currentSlide.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 sm:left-6 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-[#F6F5F0] border border-white/15 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-4 sm:right-6 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-[#F6F5F0] border border-white/15 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectGallery;
