'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeroSection as HeroSectionType } from '@/types/hero';

interface HeroSectionProps {
  heroData?: HeroSectionType;
}

export default function HeroSection({ heroData }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Placeholder data structure for demonstration
  const defaultData = {
    headline: heroData?.headline || "Hello, I'm",
    title: heroData?.title || "Optivus",
    subtitle: heroData?.subtitle || "Full Stack Developer",
    description: heroData?.description || "I create exceptional digital experiences through clean code and innovative solutions. Passionate about building scalable applications that make a difference.",
    ctaText: heroData?.ctaText || "View My Work",
    ctaLink: heroData?.ctaLink || "#work",
    profileImage: heroData?.profileImage
  };

  return (
    <>
      {/* Launch Animation Overlay - Only show after mount to prevent hydration mismatch */}
      {mounted && <LaunchOverlay />}

      <section
        id="home"
        className="min-h-screen bg-slate-900 dark:bg-slate-950 flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20"
        aria-labelledby="hero-heading"
        role="banner"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left Column - Content */}
            <header className="text-white space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
              {/* Headline & Title Section */}
              <div className="space-y-3 sm:space-y-4">
                <p className="text-blue-400 text-lg sm:text-xl font-medium tracking-wide" role="text">
                  {defaultData.headline}
                </p>

                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent leading-tight"
                >
                  {defaultData.title}
                </h1>

                {defaultData.subtitle && (
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-300">
                    {defaultData.subtitle}
                  </h2>
                )}
              </div>

              {/* Description */}
              {defaultData.description && (
                <div className="flex justify-center lg:justify-start space-x-4">
                  {/* GitHub */}
                  <a
                    href="https://github.com/Hey-Viswa/Hey-Viswa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-slate-800/50 hover:bg-blue-600/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                    aria-label="Visit Optivus's GitHub profile"
                  >
                    <svg className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/biswaranjangiri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-slate-800/50 hover:bg-blue-600/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                    aria-label="Visit Optivus's LinkedIn profile"
                  >
                    <svg className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>

                  {/* Twitter */}
                  <a
                    href="https://x.com/Hey_viswa_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-slate-800/50 hover:bg-blue-600/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                    aria-label="Visit Optivus's Twitter profile"
                  >
                    <svg className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/theoptivus/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-slate-800/50 hover:bg-blue-600/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                    aria-label="Visit Optivus's Instagram profile"
                  >
                    <svg className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              )}

              {/* CTA Button */}
              {defaultData.ctaText && (
                <div className="pt-4 flex justify-center lg:justify-start">
                  <a
                    href={defaultData.ctaLink}
                    className="inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base sm:text-lg lg:text-xl rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border border-blue-500/30 group"
                    aria-label={`${defaultData.ctaText} - View Optivus's portfolio projects`}
                    role="button"
                  >
                    {defaultData.ctaText}
                    <svg
                      className="ml-3 w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              )}
            </header>

            {/* Right Column - Profile Image */}
            <div className="flex justify-center order-1 lg:order-2" role="img" aria-label="Optivus profile image">
              <div className="relative">
                {/* Decorative background - always rendered */}
                <div className="absolute -inset-4 bg-blue-600/10 rounded-full blur-2xl opacity-30"></div>
                <div className="absolute -inset-2 bg-slate-800/30 rounded-full"></div>

                {/* Profile Image Container */}
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-full overflow-hidden border-4 sm:border-6 border-slate-700/50 shadow-2xl">
                  {defaultData.profileImage?.asset?.url ? (
                    <Image
                      src={defaultData.profileImage.asset.url}
                      alt={`${defaultData.title} - Profile`}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                      <div className="text-slate-400 text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-bold">
                        {defaultData.title.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating circles - always rendered with animations */}
                <div className="absolute top-10 -right-4 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full opacity-80 animate-float-1"></div>
                <div className="absolute bottom-20 -left-5 w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full opacity-70 animate-float-2"></div>
                <div className="absolute top-1/3 -right-8 w-2 h-2 sm:w-3 sm:h-3 bg-blue-300 rounded-full opacity-60 animate-float-3"></div>
                <div className="absolute top-1/4 -left-4 w-3 h-3 bg-cyan-400 rounded-full opacity-75 animate-float-4"></div>
                <div className="absolute top-2/3 -left-7 w-2 h-2 bg-indigo-400 rounded-full opacity-70 animate-float-6"></div>

                {/* Orbital circles with continuous rotation */}
                <div className="absolute inset-0 animate-orbit-slow">
                  <div className="absolute -top-6 left-1/2 w-2 h-2 bg-cyan-300 rounded-full opacity-50"></div>
                </div>
                <div className="absolute inset-0 animate-orbit-reverse">
                  <div className="absolute top-1/2 -right-7 w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
                </div>

                {/* Additional animated background effects */}
                <div className="absolute -inset-4 bg-blue-600/10 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
                <div className="absolute -inset-2 bg-slate-800/30 rounded-full animate-float-bg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Separate component for launch overlay to prevent hydration issues
function LaunchOverlay() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center transition-all duration-1000 ${
        showAnimation ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center">
        <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent font-caveat animate-launch-logo mb-8">
          Optivus.
        </div>

        {/* Loading Animation */}
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden animate-loading-appear">
          <div className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full animate-progress-bar"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes launch-logo {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(30px);
          }
          40% {
            opacity: 1;
            transform: scale(1.2) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes progress-bar {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        @keyframes loading-appear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-launch-logo {
          animation: launch-logo 2s ease-out forwards;
        }

        .animate-progress-bar {
          animation: progress-bar 2.5s ease-out forwards;
          transform-origin: left;
        }

        .animate-loading-appear {
          animation: loading-appear 0.5s ease-out 1.5s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
