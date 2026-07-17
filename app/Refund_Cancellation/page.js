import Footer from '@/Components/FooterA11y';
import Header from '@/Components/Header';
import Image from 'next/image';

export default function Refund_canci() {
  return (
    <>
    <Header />
    <main id="main-content" tabIndex={-1}>
    
    <div className="max-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative w-full h-[20vh] sm:h-[20vh] md:h-[20vh] lg:h-[40vh] overflow-hidden">
                  <Image
                    src="/images/pic5.jpg" // make sure this path is correct
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-cover object-top z-0"
                    priority
                  />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-black text-center px-4 sm:px-8 lg:px-20 z-10">
                    {/* Heading with animated underline */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                     Refund & Cancellation Policies
                    </h1>
                </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-4">
            <div className="prose prose-lg max-w-none">
            
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p>We value our customers and are committed to providing best services. Our clients need to realize that we do not offer a 100% guarantee on our Reports and hence cannot offer any refund on subscriptions regardless of the individual client’s performance. Once a service has been subscribed to and a payment has been made for the same, it can’t be cancelled or refunded in any case. If for some unforeseen reason, the client is not satisfied with our services, they may write us to seek direction. We will give our best effort to increase the satisfaction levels in such cases.</p>
                <ul className='list-disc pl-6'>
                    <li>No refunds will be offered on any subscription.</li>
                    <li>If the different subscription access is wrongfully delivered (different subscription instead of the subscription mentioned in the order confirmation) then we are open to extending full refund. If the client intimates this within 30 days of date of subscription, we will process the refund within 15 days of such intimation</li>
                    <li>No refunds would be given if the customer has provided wrong or incomplete email address</li>
                    <li>Kindly make the payment after reading all terms and conditions, disclaimers and refund policy.</li>
                </ul>
                <p>Sprout Research owns and have full right to www.sproutresearch.in </p>
            </div>
            </div>
        </div>
    </div>

    </main>
    <Footer />
    </>
  );
}

