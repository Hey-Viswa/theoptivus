import React from 'react';
import { CurvedArrow, type CurvedArrowProps } from '@/components/ui/Scribbles';

export interface DoodleProps {
  className?: string;
}

/**
 * Minimalist ink character matching Viswa's curly hair + square glasses.
 */
export function ViswaDoodle({ className = 'w-14 h-14 text-[var(--fg-primary)]' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Shoulders / dark tee suggestion */}
      <path
        d="M21 80C22.8 68.5 31.2 63.2 44 63.2C56.8 63.2 65.2 68.5 67 80"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      {/* Neck */}
      <path
        d="M38.5 56.5V63.5M49.5 56.5V63.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      {/* Jawline / face contour */}
      <path
        d="M27.5 36.5C27.2 49.5 33.8 57.5 44 57.5C54.2 57.5 60.8 49.5 60.5 36.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      {/* Messy curly hair top */}
      <path
        d="M24.2 35.5C20.5 31.2 21.8 23.2 28.4 22.8C28.8 15.6 37.4 12.2 44.2 15.8C49.5 11.8 59.4 14.5 60.2 22.2C66.5 23.2 67.2 31.5 63.2 35.8"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hair curls */}
      <path
        d="M32.5 26.8C36.8 23.2 42.5 24.5 45.8 27.6C49.4 23.8 55.2 24.8 58.2 28.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Signature square-frame glasses */}
      <rect
        x="28.2"
        y="34.2"
        width="13.5"
        height="10.2"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="2.15"
      />
      <rect
        x="46.3"
        y="34.2"
        width="13.5"
        height="10.2"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="2.15"
      />
      <path
        d="M41.7 38.6H46.3M28.2 38.2L25.5 37.5M59.8 38.2L62.5 37.5"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinecap="round"
      />
      {/* Pupils */}
      <circle cx="35.1" cy="39.3" r="1.45" fill="currentColor" />
      <circle cx="52.9" cy="39.3" r="1.45" fill="currentColor" />
      {/* Slight wry smile + nose stroke */}
      <path
        d="M43.8 40.5C43.2 43.2 43.2 44.6 44.6 45.4"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <path
        d="M38.8 50.2C41.8 52.2 46.5 52.1 49.5 49.8"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      {/* Subtle waving hand + terracotta spark */}
      <path
        d="M70.5 54.5C73.2 47.8 77.4 45.2 79.2 48.2C80.5 50.4 78.6 56.2 75.5 60.2"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <circle cx="77.5" cy="38.5" r="2.2" fill="var(--accent)" />
    </svg>
  );
}

/**
 * Hand-drawn cinema camera sketch with terracotta REC tally light.
 */
export function CameraDoodle({ className = 'w-12 h-9 text-[var(--fg-primary)]' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Top carry handle */}
      <path
        d="M17 13.5V9.2C17 7.9 18 7 19.4 7H35.5C36.8 7 37.8 8 37.8 9.2V13.5"
        stroke="currentColor"
        strokeWidth="1.95"
        strokeLinecap="round"
      />
      {/* Camera body */}
      <rect
        x="11"
        y="14"
        width="32"
        height="22"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.0"
      />
      {/* Cinema matte box / lens */}
      <path
        d="M43 20.2L55.2 15.8C56.4 15.4 57.5 16.2 57.5 17.5V32.5C57.5 33.8 56.4 34.6 55.2 34.2L43 29.8"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinejoin="round"
      />
      {/* Terracotta REC dot */}
      <circle cx="19" cy="21" r="2.6" fill="var(--accent)" />
      {/* Side film wheel detail */}
      <circle cx="31.5" cy="25.5" r="4.2" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="31.5" cy="25.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * Hand-drawn Android smartphone + Kotlin/Compose bracket sketch.
 */
export function AndroidCodeDoodle({
  className = 'w-11 h-11 text-[var(--fg-primary)]',
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Phone outline with slight organic tilt */}
      <rect
        x="14"
        y="9"
        width="28"
        height="40"
        rx="5"
        transform="rotate(-3 28 29)"
        stroke="currentColor"
        strokeWidth="2.0"
      />
      {/* Top speaker notch */}
      <path
        d="M23.5 13.5L31.5 13.1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Inside code brackets </> */}
      <path
        d="M23.2 25.5L19.4 29.1L23.5 32.5"
        stroke="var(--accent)"
        strokeWidth="2.0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.4 25.1L36.5 28.4L32.8 32.2"
        stroke="var(--accent)"
        strokeWidth="2.0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.4 24.2L26.4 33.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Compose UI card pill */}
      <path
        d="M21 39.2H35.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/**
 * Hand-drawn director's slate / clapperboard.
 */
export function ClapperDoodle({ className = 'w-12 h-11 text-[var(--fg-primary)]' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 64 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Slate body */}
      <rect
        x="11"
        y="22"
        width="40"
        height="26"
        rx="3.2"
        stroke="currentColor"
        strokeWidth="2.0"
      />
      {/* Hinged top clapper */}
      <path
        d="M10.5 18.5L47.5 8.5L49.8 16.2L12.5 22.4L10.5 18.5Z"
        stroke="currentColor"
        strokeWidth="1.95"
        strokeLinejoin="round"
      />
      {/* Diagonal stripes */}
      <path
        d="M19.5 16.2L23 20.4M29.5 13.6L33 17.8M39.5 10.9L43 15.1"
        stroke="var(--accent)"
        strokeWidth="2.0"
        strokeLinecap="round"
      />
      {/* Slate lines */}
      <path
        d="M17.5 31.5H44.5M17.5 39H34.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.65"
      />
      <circle cx="43.5" cy="39" r="2.1" fill="var(--accent)" />
    </svg>
  );
}

/**
 * Translucent warm masking-tape strip SVG to pin portrait/cards like a sketchbook print.
 */
export function SketchTape({ className = 'w-24 h-6' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 4.5L114.5 2.5L111.5 10.2L116 18.4L112 27.5L5.5 29.2L8.8 20.5L4 12.2L6 4.5Z"
        fill="rgba(230, 222, 200, 0.85)"
        stroke="rgba(20, 21, 23, 0.14)"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path
        d="M14 10.5H104"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface MarginNoteProps {
  text: string;
  arrowVariant?: CurvedArrowProps['variant'];
  arrowPosition?: 'left' | 'right';
  className?: string;
}

/**
 * Handwritten Caveat marginalia paired with an organic ink arrow.
 * Always rendered on BOTH mobile and desktop (no hidden breakpoint classes).
 */
export function MarginNote({
  text,
  arrowVariant = 'down-left',
  arrowPosition = 'left',
  className = '',
}: MarginNoteProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {arrowPosition === 'left' && (
        <CurvedArrow
          variant={arrowVariant}
          className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--accent)] shrink-0"
        />
      )}
      <span className="font-hand text-lg sm:text-xl leading-none text-[var(--accent)]">
        {text}
      </span>
      {arrowPosition === 'right' && (
        <CurvedArrow
          variant={arrowVariant}
          className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--accent)] shrink-0"
        />
      )}
    </div>
  );
}
