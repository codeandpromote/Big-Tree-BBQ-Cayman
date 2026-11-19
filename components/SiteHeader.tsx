'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#story', label: 'Our Story' },
  { href: '#menu', label: 'The Menu' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#visit', label: 'Visit Us' },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F6F2]/95 backdrop-blur-sm border-b border-[#E4E1DA]">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="font-serif text-2xl font-medium tracking-[-0.01em] text-[#141312] whitespace-nowrap shrink-0 transition-opacity duration-150 hover:opacity-75"
        >
          Big Tree BBQ
        </a>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4641]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#141312] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#843E1A] after:transition-all after:duration-150 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (desktop) + accessible mobile menu trigger */}
        <div className="flex items-center shrink-0">
          <a
            href="#visit"
            className="hidden md:inline-flex items-center justify-center min-h-[40px] px-5 py-2 text-sm font-medium text-[#F7F6F2] bg-[#141312] hover:bg-[#843E1A] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Plan Your Visit
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center text-[#141312] hover:bg-[#EAE7DF] transition-colors duration-150"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation-panel"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#E4E1DA] bg-[#F7F6F2] px-6 py-5"
        >
          <ul className="flex flex-col divide-y divide-[#E4E1DA]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[48px] items-center text-base font-medium text-[#141312] hover:text-[#843E1A] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <a
              href="#visit"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center bg-[#141312] px-5 py-3 text-sm font-medium text-[#F7F6F2] hover:bg-[#843E1A] transition-colors"
            >
              Plan Your Visit
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
