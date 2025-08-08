'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { PortableTextComponents } from '@portabletext/react';
import { AboutSection as AboutSectionType } from '@/types/about';

interface AboutSectionProps {
  aboutData?: AboutSectionType;
}

// Social media icons
const SocialIcons = {
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  dribbble: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
    </svg>
  ),
  // ...existing icons...
};

// Arrow icon for external links
const ArrowIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

// PortableText components for rich text rendering
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 text-slate-300 leading-relaxed text-lg font-epilogue">{children}</p>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold text-white mb-4 font-epilogue">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-4 italic text-slate-300 mb-6 font-epilogue bg-slate-800/20 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({ children }) => <em className="text-blue-400">{children}</em>,
  },
};

export default function AboutSection({ aboutData }: AboutSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Debug: Log the aboutData to see what we're receiving
  useEffect(() => {
    console.log('AboutSection - Full aboutData:', aboutData);
    console.log('AboutSection - Resume data specifically:', aboutData?.resume);
    console.log('AboutSection - Resume URL:', aboutData?.resume?.asset?.url);
  }, [aboutData]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!aboutData) {
    return (
      <section className="min-h-screen bg-slate-900 dark:bg-slate-950 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-epilogue">Loading content...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="bg-slate-900 dark:bg-slate-950 py-20 lg:py-28 px-4 sm:px-6 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background Design Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>

        {/* Author Name Label - Professional UI/UX Designer Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-4 px-8 py-3 bg-slate-800/40 backdrop-blur-sm rounded-full border border-slate-700/30 hover:bg-slate-800/60 transition-all duration-300">
            {/* UI/UX Design Icon - Updated with better representation */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center gap-1">
                {/* UI Icon - Monitor/Screen */}
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="12" rx="1" strokeWidth={1.5}/>
                  <path d="M7 20h10M12 16v4" strokeLinecap="round" strokeWidth={1.5}/>
                </svg>

                {/* Slash separator */}
                <div className="text-slate-400 text-sm font-light">/</div>

                {/* UX Icon - User/Person */}
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}/>
                  <circle cx="12" cy="7" r="4" strokeWidth={1.5}/>
                </svg>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>

            <span className="text-sm font-bold text-white tracking-[0.2em] uppercase font-epilogue">
              {aboutData.authorName || 'UI/UX Designer & Developer'}
            </span>

            {/* Decorative dot */}
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Section Title - WHO AM I */}
        <h2
          id="about-heading"
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight font-epilogue"
        >
          Who Am I<span className="text-blue-400">?</span>
        </h2>

        {/* Professional Introduction */}
        <div className="mb-12">
          <p className="text-2xl sm:text-3xl text-slate-300 leading-relaxed font-epilogue font-light mb-8 max-w-4xl">
            A passionate <span className="text-blue-400 font-semibold">UI/UX Designer</span> and
            <span className="text-blue-400 font-semibold"> Full-Stack Developer</span> with extensive experience
            creating exceptional digital experiences.
          </p>
        </div>

        {/* Bio/Description */}
        {aboutData.bio && (
          <div className="mb-16 prose prose-invert prose-xl max-w-4xl">
            <PortableText
              value={aboutData.bio}
              components={portableTextComponents}
            />
          </div>
        )}

        {/* Portrait Video/Image - Full Width Styled Container */}
        {(aboutData.portraitVideo?.asset?.url || aboutData.portraitImage?.asset) && (
          <div className="mb-16">
            <div className="relative w-full max-w-5xl mx-auto">
              {/* Video/Image Container with Professional Styling */}
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] rounded-3xl overflow-hidden border border-slate-700/30 bg-slate-800/30 group shadow-2xl">
                {/* Gradient Overlay for Better Visual Appeal */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 z-10"></div>

                {aboutData.portraitVideo?.asset?.url ? (
                  // Video takes priority if available
                  <video
                    src={aboutData.portraitVideo.asset.url}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : aboutData.portraitImage?.asset && (
                  // Fallback to image if no video
                  <Image
                    src={aboutData.portraitImage.asset.url || aboutData.portraitImage.asset._ref}
                    alt={aboutData.portraitImage.alt || `Portrait of ${aboutData.authorName}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                  />
                )}

                {/* Subtle bottom gradient for text overlay if needed */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent z-20"></div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-400/50 z-20"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-blue-400/50 z-20"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-blue-400/50 z-20"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-400/50 z-20"></div>
              </div>

              {/* Background glow effect */}
              <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-2xl opacity-50"></div>
            </div>
          </div>
        )}

        {/* My Expertise Section - Full Width Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 font-epilogue text-center lg:text-left">My Expertise</h3>

          {/* UI/UX Skills Highlight - Wider Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-8 hover:bg-slate-800/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-4 font-epilogue">UI/UX Design</h4>
              <p className="text-slate-300 leading-relaxed font-epilogue">
                Creating intuitive, user-centered designs with extensive experience in wireframing, prototyping,
                and user research. Specialized in modern design systems and accessibility.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-8 hover:bg-slate-800/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-4 font-epilogue">Full-Stack Development</h4>
              <p className="text-slate-300 leading-relaxed font-epilogue">
                Building scalable web applications with modern technologies. Expert in React, Next.js,
                Node.js, and database design with a focus on performance and user experience.
              </p>
            </div>
          </div>

          {/* Professional Skills Grid - Wider Layout */}
          {aboutData.skills && aboutData.skills.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <h4 className="text-xl font-semibold text-white mb-8 font-epilogue text-center lg:text-left">Technical Skills</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {aboutData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group bg-slate-800/20 backdrop-blur-sm rounded-xl border border-slate-700/30 p-4 text-center hover:bg-slate-800/40 hover:border-blue-500/30 transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-slate-300 group-hover:text-white font-medium font-epilogue text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Social Media Links - Full Width Layout */}
        {aboutData.socialLinks && aboutData.socialLinks.length > 0 && (
          <div className="mb-16 max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-6 font-epilogue">Let&#39;s Connect</h3>
            <div className="flex flex-wrap gap-4">
              {aboutData.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-4 border-2 border-slate-700/50 hover:border-blue-500/50 rounded-xl transition-all duration-300 hover:bg-slate-800/50 hover:scale-105"
                >
                  <div className="text-slate-400 group-hover:text-blue-400 transition-colors">
                    {SocialIcons[link.icon as keyof typeof SocialIcons]}
                  </div>
                  <span className="text-slate-300 group-hover:text-white font-medium font-epilogue capitalize">
                    {link.platform}
                  </span>
                  <div className="text-slate-400 group-hover:text-blue-400 transition-colors">
                    {ArrowIcon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Awards & Recognition - Full Width */}
        {aboutData.awards && aboutData.awards.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-8 font-epilogue">
              Recognition & Achievements
            </h3>
            <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-8">
              <div className="space-y-6">
                {aboutData.awards.map((award, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b border-slate-700/30 last:border-b-0">
                    <h4 className="text-slate-300 font-medium font-epilogue leading-relaxed text-lg">
                      {award.title}
                    </h4>
                    <span className="text-blue-400 font-semibold font-epilogue tabular-nums text-lg">
                      {award.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action - Centered */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold font-epilogue rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              View My Work
            </button>

            {/* Resume Download Button - Updated with download functionality */}
            {aboutData.resume?.asset?.url ? (
              <a
                href={aboutData.resume.asset.url}
                download={aboutData.resume.title || 'Resume.pdf'}
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white font-semibold font-epilogue rounded-xl transition-all duration-300 hover:bg-slate-800/50 hover:scale-105"
                aria-label={`Download ${aboutData.resume.title || 'Resume'} as PDF`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {aboutData.resume.title || 'Download Resume'}
              </a>
            ) : (
              <button
                className="px-8 py-4 border-2 border-slate-700/50 text-slate-500 font-semibold font-epilogue rounded-xl cursor-not-allowed opacity-50"
                disabled
                title="Resume not available"
              >
                Resume Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
