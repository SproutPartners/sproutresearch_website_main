'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FooterA11y = () => {
  const [mobileUsefulLinksOpen, setMobileUsefulLinksOpen] = useState(false);
  const [mobileLegalLinksOpen, setMobileLegalLinksOpen] = useState(false);

  return (
    <>
      <section aria-labelledby="risk-disclaimer-heading" className="bg-white py-12">
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <h2 id="risk-disclaimer-heading" className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
            Important Risk Disclaimer
          </h2>
          <ul className="mx-auto max-w-4xl space-y-3 text-left text-sm text-gray-800 md:text-base">
            <li className="flex items-start">
              <span aria-hidden="true" className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-700"></span>
              <span>Investments in securities market are subject to market risks. Read all the related documents carefully before investing.</span>
            </li>
            <li className="flex items-start">
              <span aria-hidden="true" className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-700"></span>
              <span>SEBI Registration does not guarantee performance or returns.</span>
            </li>
          </ul>
        </div>
      </section>

      <footer id="footer" className="bg-[#C6DDE9] py-12" role="contentinfo">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" aria-label="Sprout Research home" className="inline-flex items-center">
                <Image src="/images/HD.png" alt="Sprout Research logo" width={192} height={48} className="h-12 w-auto" priority />
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-gray-800">
                Partner with Sprout Research to access quality research opportunities. Our expertise supports robust risk management, delivering confidence and peace of mind for your financial future.
              </p>
              <div className="flex space-x-4" aria-label="Social media links">
                <a
                  aria-label="Sprout Research on X"
                  href="https://x.com/sproutresearch1?s=11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 transition-colors duration-300 hover:text-black"
                >
                  <svg aria-hidden="true" focusable="false" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"></path>
                  </svg>
                </a>
                <a
                  aria-label="Shikha Kapur on LinkedIn"
                  href="https://www.linkedin.com/in/shikha-kapur-8214167?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 transition-colors duration-300 hover:text-black"
                >
                  <svg aria-hidden="true" focusable="false" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM5 8H0v16h5V8Zm7.98 0H8.01v16h4.97v-8.4c0-4.67 6.03-5.05 6.03 0V24H24V13.87c0-7.88-8.92-7.59-11.02-3.71V8Z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <nav aria-label="Footer useful links">
              <h2 className="mb-4 hidden text-lg font-semibold text-gray-900 md:block">Useful Links</h2>
              <button
                type="button"
                aria-expanded={mobileUsefulLinksOpen}
                aria-controls="footer-useful-links"
                onClick={() => setMobileUsefulLinksOpen((current) => !current)}
                className="mb-4 flex w-full items-center justify-between rounded px-1 py-2 text-lg font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-100 md:hidden"
              >
                Useful Links
                <svg aria-hidden="true" focusable="false" className={`h-5 w-5 transition-transform duration-200 ${mobileUsefulLinksOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <ul id="footer-useful-links" className={`space-y-2 ${mobileUsefulLinksOpen ? 'block' : 'hidden'} md:block`}>
                <li><Link className="text-gray-800 hover:text-black" href="/">About Us</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/Research/Pcg">Private Clients Group research</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/Research/Retail">Retail research</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/Insights">Insights</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/pricing">Product Pricing</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/Contact">Contact Us</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/login">Log In</Link></li>
              </ul>
            </nav>

            <nav aria-label="Footer legal links">
              <h2 className="mb-4 hidden text-lg font-semibold text-gray-900 md:block">Legal</h2>
              <button
                type="button"
                aria-expanded={mobileLegalLinksOpen}
                aria-controls="footer-legal-links"
                onClick={() => setMobileLegalLinksOpen((current) => !current)}
                className="mb-4 flex w-full items-center justify-between rounded px-1 py-2 text-lg font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-100 md:hidden"
              >
                Legal
                <svg aria-hidden="true" focusable="false" className={`h-5 w-5 transition-transform duration-200 ${mobileLegalLinksOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <ul id="footer-legal-links" className={`space-y-2 ${mobileLegalLinksOpen ? 'block' : 'hidden'} md:block`}>
                <li><Link className="text-gray-800 hover:text-black" href="/Charter">Investor Charter</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/Grievance">Investor Grievance</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/Report">Investor Grievance Report</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/PrivacyPolicy">Privacy Policy</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/Terms">Terms and Conditions</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/Refund_Cancellation">Refund and Cancellation Policy</Link></li>
                <li><Link className="text-gray-800 hover:text-black" href="/Disclaimer">Disclaimer</Link></li>
              </ul>
            </nav>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Contact</h2>
              <address className="not-italic text-sm leading-relaxed text-gray-800">
                <p>Sprout Research</p>
                <p>A 35 First Floor, Chittaranjan Park, New Delhi, 110019</p>
                <p className="mt-2">
                  <a href="mailto:sproutresearch.equity@gmail.com" className="underline hover:text-black">
                    sproutresearch.equity@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+919811744587"
                    aria-label="Call Sprout Research at plus 91 98117 44587"
                    className="underline hover:text-black"
                  >
                    +91 98117 44587
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-300 pt-8 text-center text-sm text-gray-800">
            <p>&copy; 2026 Sprout Research. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterA11y;
