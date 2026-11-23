import React from 'react';

export interface ScribbleProps {
  className?: string;
}

/**
 * Compact handwritten SVG signature mark ("Viswa.") with pen-blue ink period dot.
 */
export function SignatureMark({ className = 'h-7 w-auto' }: ScribbleProps) {
  return (
    <svg
      viewBox="0 0 118 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Capital V swept down & up */}
      <path
        pathLength={1}
        d="M5 9.5C9.2 19.5 13.8 27.6 15.8 28.4C18.2 29.2 24.5 14.5 29.5 6.8"
        stroke="currentColor"
        strokeWidth="2.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 'i' stem + dot */}
      <path
        pathLength={1}
        d="M32.5 16.5C32.1 20.5 31.8 24.8 32.6 26.8C33.1 28 35.1 26.6 36.8 24.4"
        stroke="currentColor"
        strokeWidth="1.95"
        strokeLinecap="round"
      />
      <circle cx="33.4" cy="10.8" r="1.35" fill="currentColor" />
      {/* 's' */}
      <path
        pathLength={1}
        d="M46.2 17.2C43.5 15.8 39.8 16.9 39.6 19.2C39.4 21.4 45.2 22.1 45 24.9C44.8 27.3 40.4 28.1 37.6 26.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 'w' */}
      <path
        pathLength={1}
        d="M49.5 17.2C50.2 22.2 51.6 26.8 53.2 26.8C54.9 26.8 56.5 21.5 57.9 18.2C58.8 22.6 60.2 26.7 62.1 26.7C64.2 26.7 66.2 20.5 67.3 16.8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 'a' + relaxed tail */}
      <path
        pathLength={1}
        d="M78.8 18.8C76.2 15.8 71.1 17.2 70.3 21.4C69.6 24.9 72.1 27.4 75.2 26.6C77.5 26 79.1 22.8 79.5 18.8C79.1 22.8 79.3 26.5 81.8 26.7C84.2 26.8 87.2 24.5 91.5 22.8"
        stroke="currentColor"
        strokeWidth="1.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Subtle underscore flourish */}
      <path
        pathLength={1}
        d="M14 31.8C36 30.6 64 29.8 88 30.9"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Pen-blue ink period */}
      <circle cx="98.5" cy="25.5" r="2.3" fill="var(--accent)" />
    </svg>
  );
}

/**
 * Two-pass organic hand-drawn wave underline.
 */
export function ScribbleUnderline({
  className = 'w-full h-3 text-[var(--accent)]',
}: ScribbleProps) {
  return (
    <svg
      viewBox="0 0 180 14"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        pathLength={1}
        d="M2.5 8.8C36.5 4.2 78.2 3.1 119.5 5.4C144.8 6.8 164.2 6.1 177.5 3.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        pathLength={1}
        d="M8.5 11.4C48.2 7.8 97.6 7.4 142.4 9.2C156.2 9.8 167.8 9.1 174.5 7.9"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/**
 * Imperfect open-ended hand-drawn ink oval loop.
 */
export function ScribbleCircle({
  className = 'w-full h-full text-[var(--accent)]',
}: ScribbleProps) {
  return (
    <svg
      viewBox="0 0 140 64"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        pathLength={1}
        d="M116 14.5C94.5 5.2 44.8 4.8 19.2 18.6C2.4 27.6 5.2 47.4 29.8 54.8C58.6 63.4 111.5 58.2 128.4 40.6C141.2 27.3 125.5 11.4 94.2 9.8"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface InkCalloutStrokeProps {
  variant?: 'pointer' | 'bracket' | 'underline';
  className?: string;
}

/**
 * Subtle single-stroke pen-blue callout mark for FNet case study annotations.
 */
export function InkCalloutStroke({
  variant = 'pointer',
  className = 'w-12 h-5 text-[var(--accent)]',
}: InkCalloutStrokeProps) {
  if (variant === 'bracket') {
    return (
      <svg
        viewBox="0 0 48 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={className}
      >
        <path
          pathLength={1}
          d="M3.5 3.5C2.6 8.6 2.5 13.4 3.5 17.2C14.8 16.1 28.2 15.9 44.5 16.9"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 'underline') {
    return (
      <svg
        viewBox="0 0 48 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={className}
      >
        <path
          pathLength={1}
          d="M2.5 13.5C14.5 10.2 28.5 9.8 45.5 11.8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        pathLength={1}
        d="M3 16.5C13.5 15.1 25.4 10.9 38.2 4.6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        pathLength={1}
        d="M32.4 3.4L39.2 4.1L35.4 9.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface CurvedArrowProps {
  variant?: 'down-left' | 'down-right' | 'up-right' | 'right' | 'left';
  className?: string;
}

/**
 * Sketchy hand-drawn ink arrow pointer for pairing with margin notes.
 */
export function CurvedArrow({
  variant = 'down-left',
  className = 'w-10 h-10 text-[var(--accent)]',
}: CurvedArrowProps) {
  const paths: Record<NonNullable<CurvedArrowProps['variant']>, { body: string; head: string }> = {
    'down-left': {
      body: 'M34 6C31.5 19.5 23.2 29.5 9.5 34.5',
      head: 'M16.5 27.5L8.2 35.2L18.5 38.2',
    },
    'down-right': {
      body: 'M8 6C11.5 19.5 20.5 29.5 34.5 34.5',
      head: 'M27.5 27.2L35.8 35.1L25.4 38.1',
    },
    'up-right': {
      body: 'M7 35C13.5 20.5 23.2 12.5 35.5 8.8',
      head: 'M26.8 6.5L36.8 8.3L31.4 16.8',
    },
    right: {
      body: 'M4 23C14.5 18.8 25.5 18.5 37.5 21.5',
      head: 'M29.8 14.5L38.8 21.8L29.2 27.8',
    },
    left: {
      body: 'M39 21C27.5 17.5 16.5 17.8 5.5 21.5',
      head: 'M13.5 14.2L4.5 21.8L14.2 27.8',
    },
  };

  const active = paths[variant];

  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        pathLength={1}
        d={active.body}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        pathLength={1}
        d={active.head}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Horizontal hand-drawn gentle organic ink rule to break rigid grid borders.
 */
export function SketchDivider({
  className = 'w-full h-3 text-[var(--border-strong)]',
}: ScribbleProps) {
  return (
    <svg
      viewBox="0 0 1200 14"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        pathLength={1}
        d="M2 7.2C185 5.8 392 8.4 614 6.7C825 5.1 1018 8.1 1198 6.4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Small hand-drawn 5-stroke asterisk mark for personal punctuation.
 */
export function AsteriskDoodle({
  className = 'w-4 h-4 text-[var(--accent)]',
}: ScribbleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        pathLength={1}
        d="M12.2 3.2L11.7 20.6M4.4 8.2L19.4 15.8M19.2 7.8L4.8 16.4M7.2 4.8L16.8 19.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Imperfect 4-point hand-drawn ink spark with tiny accent dot.
 */
export function DoodleSpark({
  className = 'w-6 h-6 text-[var(--accent)]',
}: ScribbleProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        pathLength={1}
        d="M15.8 3.2C16.2 10.6 16.4 13.8 25.5 15.4C17.2 16.8 16.2 19.4 15.2 28.4C14.6 19.8 13.8 17.1 5.5 15.8C13.6 14.3 15.1 11.4 15.8 3.2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25.5" cy="7.5" r="1.4" fill="currentColor" />
      <circle cx="7.2" cy="24.2" r="1.1" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

/**
 * Soft pen-blue ink marker wash behind a focal phrase.
 */
export function SketchHighlight({
  className = 'w-full h-full',
}: ScribbleProps) {
  return (
    <svg
      viewBox="0 0 180 44"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 27.5C38 22.8 118 20.5 174 24.8C171.5 31.2 166 36.2 156 37.4C102 39.2 44 40.2 9.5 36.2C4.2 35.5 3.5 29.8 6 27.5Z"
        fill="rgba(37, 78, 181, 0.12)"
      />
    </svg>
  );
}

/**
 * Minimal horizontal 35mm sprocket sketch divider for film sections.
 */
export function FilmSprocketStrip({
  className = 'w-full h-5 text-[var(--border-strong)]',
}: ScribbleProps) {
  const ticks = [48, 128, 208, 288, 368, 448, 528, 608, 688, 768, 848, 928, 1008, 1088, 1158];
  return (
    <svg
      viewBox="0 0 1200 22"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        pathLength={1}
        d="M2 5.5C280 4.6 620 6.2 1198 5.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        pathLength={1}
        d="M2 16.8C360 17.6 740 16.2 1198 17"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {ticks.map((x) => (
        <rect
          key={x}
          x={x}
          y="8"
          width="11"
          height="6.2"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.15"
        />
      ))}
    </svg>
  );
}
