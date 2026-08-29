/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded Pages for extreme performance and split bundle sizes
const Home = React.lazy(() => import('./pages/Home'));
const GetCertified = React.lazy(() => import('./pages/GetCertified'));
const PaidTestPage = React.lazy(() => import('./pages/PaidTestPage'));
const TestPage = React.lazy(() => import('./pages/TestPage'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));

// Lightweight premium PageLoader fallback in monochrome style
const PageLoader = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center animate-subtle-fade">
    <div className="relative w-16 h-16">
      {/* Outer spinning ring */}
      <div className="absolute inset-0 rounded-full border-4 border-neutral-200 border-t-black dark:border-neutral-800 dark:border-t-white animate-spin"></div>
      {/* Inner glowing pulsing orb */}
      <div className="absolute inset-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 animate-pulse flex items-center justify-center">
     
      </div>
    </div>
    <span className="mt-4 text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 animate-pulse">
      Loading ...
    </span>
  </div>
);

export default function App() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      document.documentElement.classList.remove('dark');
    } else {
      document.body.classList.remove('light-mode');
      document.documentElement.classList.add('dark');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs font-black uppercase tracking-wider transition-all duration-300 hover:text-black dark:hover:text-white ${
      isActive 
        ? 'text-black dark:text-white border-b-2 border-black dark:border-white pb-1' 
        : 'opacity-75 text-neutral-600 dark:text-neutral-400'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-3 px-4 text-sm font-black uppercase tracking-wider transition-all rounded-xl ${
      isActive 
        ? 'text-black dark:text-white bg-black/5 dark:bg-white/5' 
        : 'opacity-80 hover:bg-black/5 dark:hover:bg-white/5'
    }`;

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col justify-between">
        {/* Navigation Bar Header */}
        <header className="sticky top-0 z-40 w-full glass border-b transition-all duration-300" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            {/* Logo Brand */}
            <Link to="/" className="flex items-center gap-3 group select-none">
              <img 
                src="/vidyate-tech-hub-main-logo.webp" 
                alt="Vidyate Tech Hub Logo" 
                className="w-16 h-16 rounded-full group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation Link Actions */}
            <nav className="hidden md:flex items-center gap-8 ml-auto mr-8">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/get-certified" className={navLinkClass}>
                Get Certified
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </nav>

            {/* Header Right Actions (Toggle + Mobile Button) */}
            <div className="flex items-center gap-4">
              {/* Light/Dark Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl glass border hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                style={{ borderColor: 'var(--glass-border)' }}
                aria-label="Toggle Theme Mode"
              >
                <span className="material-symbols-rounded text-xl" style={{ color: isLightMode ? '#000000' : '#ffffff' }}>
                  {isLightMode ? 'dark_mode' : 'light_mode'}
                </span>
              </button>

              {/* Mobile Drawer Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-xl glass border flex items-center justify-center transition-all"
                style={{ borderColor: 'var(--glass-border)' }}
                aria-label="Toggle Navigation Menu"
              >
                <span className="material-symbols-rounded text-xl" style={{ color: 'var(--text-main)' }}>
                  {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>

          {/* Responsive Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div 
              className="md:hidden glass border-b border-t absolute top-20 left-0 w-full p-4 space-y-2 animate-subtle-fade shadow-2xl"
              style={{ borderColor: 'var(--glass-border)' }}
            >
              <NavLink to="/" end onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
                Home
              </NavLink>
              <NavLink to="/get-certified" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
                Get Certified
              </NavLink>
              <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
                Contact
              </NavLink>
            </div>
          )}
        </header>

        {/* Main Workspace Frame container */}
        <main className="flex-grow py-8 relative">
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/get-certified" element={<GetCertified />} />
              <Route path="/paid-certification-test/:courseId" element={<PaidTestPage />} />
              <Route path="/test-page" element={<TestPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </React.Suspense>
        </main>

        {/* Dynamic Premium Footer */}
        <footer className="glass border-t mt-16 transition-all duration-300" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
              {/* Left Column Description */}
              <div className="md:col-span-2 space-y-4">
                <img 
                  src="/vidyate-tech-hub-main-logo.webp" 
                  alt="Vidyate Tech Hub Logo" 
                  className="w-16 h-16  rounded-full"
                />
                <p className="opacity-50 text-xs max-w-sm leading-relaxed font-medium">
                  India's premier digital academic hub for Computer Science, Electronics, and Mechanical Engineering students. We simplify coding structures, silicon microchips, and applied thermodynamics laws.
                </p>
              </div>

              {/* Middle Column Pathways */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                  Easy Navigation
                </h4>
                <ul className="space-y-2.5 text-xs font-bold">
                  <li>
                    <Link to="/" className="opacity-60 hover:opacity-100 transition-opacity">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/get-certified" className="opacity-60 hover:opacity-100 transition-opacity">
                      Get Certified
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="opacity-60 hover:opacity-100 transition-opacity">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="opacity-60 hover:opacity-100 transition-opacity">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Right Column Compliance Links */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                  Legal & Trust
                </h4>
                <ul className="space-y-2.5 text-xs font-bold">
                  <li>
                    <Link to="/about" className="opacity-60 hover:opacity-100 transition-opacity">
                      Discover Our Mission
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="opacity-60 hover:opacity-100 transition-opacity">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="opacity-60 hover:opacity-100 transition-opacity">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Copyright Meta */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-black uppercase tracking-wider text-theme-muted">
              <p>© {new Date().getFullYear()} Vidyate Tech Hub. All rights reserved.</p>
              <div className="flex gap-6">
              </div>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}
