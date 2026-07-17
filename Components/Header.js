'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const serviceLinks = [
  { href: '/Research/Retail', label: 'Retail' },
  { href: '/Research/Pcg', label: 'Private Clients (PCG)' },
];

const baseLinkClass = 'group relative inline-flex items-center text-black hover:text-black';

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isServicesActive = pathname.startsWith('/Research');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        setMenuOpen(false);
        setMobileServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const closeMenus = () => {
    setServicesOpen(false);
    setMenuOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className="bg-white p-4 text-black" role="banner">
      <nav aria-label="Primary navigation" className="container mx-auto flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="Sprout Research home"
          className="ml-4 flex items-center space-x-3 md:ml-10"
          onClick={closeMenus}
        >
          <Image src="/images/HD.png" alt="Sprout Research logo" width={176} height={96} className="h-16 w-auto" />
        </Link>

        <ul className="mr-10 hidden items-center space-x-8 text-xl font-medium md:flex">
          <li>
            <Link href="/" className={`${baseLinkClass} ${pathname === '/' ? 'font-semibold' : ''}`}>
              About Us
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-[2px] w-full origin-right bg-black transition-transform duration-300 ${
                  pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          </li>

          <li className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              aria-controls="desktop-services-menu"
              onClick={() => setServicesOpen((current) => !current)}
              className={`${baseLinkClass} ${isServicesActive ? 'font-semibold' : ''}`}
            >
              Services
              <svg
                aria-hidden="true"
                focusable="false"
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-[2px] w-full origin-right bg-black transition-transform duration-300 ${
                  isServicesActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </button>

            {servicesOpen && (
              <div
                id="desktop-services-menu"
                className="absolute left-0 top-full z-50 mt-2 w-64 rounded-md border border-gray-200 bg-white shadow-lg"
              >
                <div className="py-2">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      className="block px-4 py-2 text-base font-medium text-black transition-colors duration-200 hover:bg-gray-100 hover:text-black"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          <li>
            <Link href="/Insights" className={`${baseLinkClass} ${pathname === '/Insights' ? 'font-semibold' : ''}`}>
              Insights
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-[2px] w-full origin-right bg-black transition-transform duration-300 ${
                  pathname === '/Insights' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          </li>

          <li>
            <Link href="/pricing" className={`${baseLinkClass} ${pathname === '/pricing' ? 'font-semibold' : ''}`}>
              Pricing
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-[2px] w-full origin-right bg-black transition-transform duration-300 ${
                  pathname === '/pricing' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          </li>

          <li>
            <Link href="/Contact" className={`${baseLinkClass} ${pathname === '/Contact' ? 'font-semibold' : ''}`}>
              Contact Us
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-[2px] w-full origin-right bg-black transition-transform duration-300 ${
                  pathname === '/Contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          </li>

          <li>
            <Link href="/login" className={`${baseLinkClass} ${pathname === '/login' ? 'font-semibold' : ''}`}>
              Log In
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-[2px] w-full origin-right bg-black transition-transform duration-300 ${
                  pathname === '/login' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          </li>
        </ul>

        <div className="pr-4 md:hidden">
          <button
            type="button"
            aria-label={menuOpen ? 'Close main menu' : 'Open main menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-main-menu"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex items-center justify-center rounded-md p-2 text-black"
          >
            {menuOpen ? (
              <svg aria-hidden="true" focusable="false" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg aria-hidden="true" focusable="false" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-main-menu" className="space-y-4 px-6 pb-6 text-xl font-medium text-black md:hidden">
          <div>
            <Link href="/" onClick={closeMenus} className="inline-flex items-center">
              About Us
            </Link>
          </div>

          <div>
            <button
              type="button"
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services-menu"
              onClick={() => setMobileServicesOpen((current) => !current)}
              className="flex w-full items-center gap-2 text-left"
            >
              Services
              <svg
                aria-hidden="true"
                focusable="false"
                className={`h-4 w-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileServicesOpen && (
              <div id="mobile-services-menu" className="mt-2 space-y-2 pl-4">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className="block text-lg font-medium text-black transition-colors duration-200 hover:text-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <Link href="/Insights" onClick={closeMenus} className="inline-flex items-center">
              Insights
            </Link>
          </div>

          <div>
            <Link href="/pricing" onClick={closeMenus} className="inline-flex items-center">
              Pricing
            </Link>
          </div>

          <div>
            <Link href="/Contact" onClick={closeMenus} className="inline-flex items-center">
              Contact Us
            </Link>
          </div>

          <div>
            <Link href="/login" onClick={closeMenus} className="inline-flex items-center">
              Log In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
