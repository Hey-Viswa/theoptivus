'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'work', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#work', label: 'Work', id: 'work' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/30 shadow-lg' 
        : 'bg-white/5 dark:bg-slate-900/5 backdrop-blur-md border-b border-white/10 dark:border-slate-700/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center animate-slide-down">
            <a href="#home" className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent font-caveat hover:from-blue-300 hover:via-blue-400 hover:to-blue-500 transition-all duration-300">
              Optivus.
            </a>
          </div>

          {/* Desktop Menu with Fixed Pill Animation */}
          <div className="hidden md:flex items-center bg-white/5 dark:bg-slate-800/20 rounded-full p-1 animate-slide-down-delayed backdrop-blur-sm border border-white/10 dark:border-slate-700/20">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-4 lg:px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  activeSection === item.id 
                    ? 'text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg transform scale-105' 
                    : 'text-slate-200 dark:text-slate-300 hover:text-blue-400 dark:hover:text-blue-400 hover:bg-white/10 dark:hover:bg-slate-700/30'
                }`}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center animate-slide-down-delayed">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-200 dark:text-slate-300 hover:text-blue-400 dark:hover:text-blue-400 focus:outline-none p-2 rounded-lg bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-down-fast">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 dark:bg-slate-900/20 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-lg mx-2 sm:mx-4 mb-4 shadow-xl">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300 rounded-lg ${
                    activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-md'
                      : 'text-slate-200 dark:text-slate-300 hover:text-blue-400 dark:hover:text-blue-400 hover:bg-white/10 dark:hover:bg-slate-800/20'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down-fast {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
        }

        .animate-slide-down-delayed {
          animation: slide-down 0.8s ease-out 0.2s both;
        }

        .animate-slide-down-fast {
          animation: slide-down-fast 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}
