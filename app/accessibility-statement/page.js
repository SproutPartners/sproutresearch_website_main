import Footer from '@/Components/FooterA11y';
import Header from '@/Components/Header';
import Image from 'next/image';

export default function AccessibilityStatementPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div className="min-h-screen bg-white">
          <div className="relative h-[20vh] w-full overflow-hidden sm:h-[20vh] md:h-[20vh] lg:h-[40vh]">
            <Image
              src="/images/pic5.jpg"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover object-top z-0"
              priority
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center text-black sm:px-8 lg:px-20">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Digital Accessibility Statement</h1>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-8">
            <div className="prose prose-lg max-w-none">
              <section className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-900">Commitment to Inclusive Access</h2>
                <p>
                  Shikha Kapur (Proprietor of Sprout Research), a SEBI-registered Research Analyst (Registration No.
                  INH000019169), is committed to ensuring that our website and digital services are accessible and
                  usable by all individuals, including persons with disabilities.
                </p>
                <p>We aim to align our digital presence with:</p>
                <ul className="list-disc pl-6">
                  <li>The Rights of Persons with Disabilities Act, 2016</li>
                  <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA (to the extent technically feasible)</li>
                  <li>Applicable regulatory best practices for entities operating in the financial sector</li>
                </ul>
              </section>

              <section className="mt-10 space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-900">Platform Environment</h2>
                <p>
                  While the hosting platform provides accessibility-supportive features, certain structural or
                  technical elements are governed by platform-level configurations.
                </p>
                <p>Within these constraints, we make reasonable efforts to ensure that our content is:</p>
                <ul className="list-disc pl-6">
                  <li>Clearly structured and easy to read</li>
                  <li>Compatible with commonly used assistive technologies</li>
                  <li>Navigable using a keyboard</li>
                  <li>Presented with appropriate colour contrast</li>
                  <li>Accompanied by alternative text, where applicable</li>
                </ul>
              </section>

              <section className="mt-10 space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-900">Ongoing Improvements</h2>
                <p>
                  We recognise that digital accessibility is an ongoing process. We periodically review our website
                  content and settings and implement improvements wherever feasible within the technical framework of
                  the hosting platform.
                </p>
                <p>
                  Where full technical modifications are not possible due to platform limitations, we endeavour to
                  provide assistance through alternative channels.
                </p>
              </section>

              <section className="mt-10 space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-900">Assistance and Support</h2>
                <p>
                  If you experience any difficulty accessing information on our website or require content in an
                  alternative format, please contact:
                </p>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <p className="font-semibold text-gray-900">Compliance / Accessibility Contact</p>
                  <p>Shikha Kapur</p>
                  <p>
                    Email:{' '}
                    <a className="underline hover:text-black" href="mailto:shikha.kapur@gmail.com">
                      shikha.kapur@gmail.com
                    </a>
                  </p>
                  <p>
                    Mobile:{' '}
                    <a
                      className="underline hover:text-black"
                      href="tel:+919811744587"
                      aria-label="Call Shikha Kapur at plus 91 98117 44587"
                    >
                      +91 98117 44587
                    </a>
                  </p>
                </div>
                <p>
                  We will make reasonable efforts to provide the requested information in an accessible format within
                  a reasonable timeframe.
                </p>
              </section>

              <section className="mt-10 space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-900">Review</h2>
                <p>This statement was last reviewed on: 21 July 2026.</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
