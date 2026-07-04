'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'About Us' },
  { href: '/Insights', label: 'Insights' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/Contact', label: 'Contact Us' },
  { href: '/login', label: 'Log In' },
]

const serviceLinks = [
  { href: '/Research/Retail', label: 'Retail' },
  { href: '/Research/Pcg', label: 'Private Clients (PCG)' },
]

const Header = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false)
      }
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setServicesOpen(false)
        setMobileServicesOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const isActive = (href) => pathname === href
  const isServiceActive = pathname.startsWith('/Research')

  const navClass = (active) =>
    `relative inline-flex items-center text-black hover:text-black ${active ? 'font-semibold' : ''}`

  const underlineClass = (active) =>
    `absolute -bottom-1 left-0 h-[2px] w-full origin-right bg-black transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`

  return (
    <header className="bg-white p-4 text-black" role="banner">
      <nav aria-label="Primary navigation" className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" aria-label="Sprout Research home" className="ml-4 flex items-center space-x-3 md:ml-10">
          <Image src="/images/HD.png" alt="Sprout Research logo" width={176} height={96} className="h-16 w-auto" priority />
        </Link>

        <ul className="mr-10 hidden items-center space-x-8 text-xl font-medium md:flex">
          <li>
            <Link href="/" className={`group ${navClass(isActive('/'))}`}>
              About Us
              <span aria-hidden="true" className={underlineClass(isActive('/'))} />
            </Link>
          </li>

          <li className="relative" ref={servicesRef}>
            <button
                type="button"
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              aria-controls="desktop-services-menu"
              onClick={() => setServicesOpen((open) => !open)}
              className={`group ${navClass(isServiceActive)}`}
            >
              Services
              <svg aria-hidden="true" focusable="false" className={`ml-1 h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span aria-hidden="true" className={underlineClass(isServiceActive)} />
            </button>

            {servicesOpen && (
              <ul id="desktop-services-menu" className="absolute left-0 top-full z-50 mt-2 w-56 rounded-md border border-gray-200 bg-white py-2 shadow-lg">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:text-black"
                      onClick={() => setServicesOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`group ${navClass(isActive(link.href))}`}>
                {link.label}
                <span aria-hidden="true" className={underlineClass(isActive(link.href))} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="pr-4 md:hidden">
          <button
                type="button"
            type="button"
            aria-label={menuOpen ? 'Close main menu' : 'Open main menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-main-menu"
            onClick={() => setMenuOpen((open) => !open)}
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
        <nav id="mobile-main-menu" aria-label="Mobile navigation" className="px-6 pb-6 text-xl font-medium text-black md:hidden">
          <ul className="space-y-4">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)} className="block py-1">About Us</Link>
            </li>
            <li>
              <button
                type="button"
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-menu"
                onClick={() => setMobileServicesOpen((open) => !open)}
                className="flex w-full items-center gap-2 py-1 text-left"
              >
                Services
                <svg aria-hidden="true" focusable="false" className={`h-4 w-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileServicesOpen && (
                <ul id="mobile-services-menu" className="mt-2 space-y-2 pl-4 text-base">
                  {serviceLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} onClick={() => setMenuOpen(false)} className="block py-1 text-gray-800">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {navLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMenuOpen(false)} className="block py-1">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
