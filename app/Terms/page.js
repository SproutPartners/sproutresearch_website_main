import Footer from '@/Components/FooterA11y';
import Header from '@/Components/Header';
import Image from 'next/image';

export default function Terms() {
  return (
    <>
    <Header />
    
    <div className="min-h-screen bg-white">
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
                     Terms and Conditions
                    </h1>
                    
                </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-8">
            <div className="prose prose-lg max-w-none">
            <p className='mb-4'>Welcome to www.sproutresearch.in (the “Website”), owned by Sprout Research (“Sprout Research,” “we,” “us,” or “our”), whose proprietor is Shikha Kapur. In addition to the Terms of Use provided on the Sprout Research Website, we disclaim all liabilities and warranties with respect to the payment of fees (“Fees”) applicable to the programs you have opted for through the Sprout Research Website. Such Fees include, but are not limited to, subscription fees. By using the Website, the User agrees and understands that:</p>
            
            <div className="text-gray-700 leading-relaxed space-y-6">
                <ul className='list-decimal pl-6'>
                    <li>It is the User’s responsibility to make all necessary payments for the Fees well in advance of the specified due date set by Sprout Research.</li>
                    <li>The online payment facility provided by Sprout Research is not a banking or financial service but merely a facilitator for ease of payment (“Payment Gateway Service Provider”). The Payment Gateway Service Provider enables online payments, collection, and remittance of funds for transactions on the Sprout Research Website using existing authorized banking infrastructure and credit card payment gateway networks. By providing this payment facility, Sprout Research is neither acting as a trustee nor in a fiduciary capacity with respect to payments made by the User for services purchased on the Website. The User understands and agrees that all payments made through the Payment Gateway Service Provider may take one to two (1-2) working days to process. The User makes payments through the Payment Gateway Service Provider at their own risk. Sprout Research shall not be responsible for any failure or delay in processing Fees paid through the Payment Gateway Service Provider.</li>
                    <li><ul>While using any payment methods available on the Website, Sprout Research will not be responsible or assume any liability for any loss or damage arising directly or indirectly to the User due to:
                        <li>(a) Lack of authorization for any transactions;</li>
                        <li>(b) Payment issues arising from the transaction;</li>
                        <li>(c) Decline of a transaction for any reason; or</li>
                        <li>(d) Use or inability to use the payment page maintained by the Payment Gateway Service Provider.</li>
                      </ul>
                    </li>
                    <li>Sprout Research shall not be liable for any loss or damages suffered by the User due to any failure, delay, or interruption by the Payment Gateway Service Provider, including but not limited to partial or total failure of any network terminal, data processing system, computer tele-transmission, telecommunications system, or other circumstances solely within the control of the Payment Gateway Service Provider.</li>
                    <li>In the event that Sprout Research rejects services due to delayed payments by the User, the User shall submit a written request to us, accompanied by a payment receipt validating the payment made for the Information and Communication Technology (ICT)-enabled subscription(s). Upon verification of the payment receipt, Sprout Research will consider the request for a refund in accordance with its internal refund policies published on the company website</li>
                </ul>
                <p>Sprout Research and the Payment Gateway Service Provider will address complaints reported by the User, subject to their respective internal policies and rules</p>
            </div>
            </div>
        </div>
    </div>

    <Footer />
    </>
  );
}

