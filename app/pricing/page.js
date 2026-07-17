import Footer from '@/Components/FooterA11y';
import Header from '@/Components/Header';
import SubscriptionCards from '@/Components/SubscriptionCards';
import Image from 'next/image';

export default function ProcutPricing() {
  return (
    <>
    <Header />
    <main id="main-content" tabIndex={-1}>
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
                     Product Pricing
                    </h1>
                </div>
        </div>

        {/* Custom Flyer Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-center">
                <div className="w-full">
                    {/* Custom Flyer Design - Table Layout */}
                    <div className="bg-white border-2 border-gray-200 shadow-2xl rounded-xl overflow-hidden">
                        
                        {/* Header Section */}
                        <div className="bg-gray-200 p-4 sm:p-6 border-b border-gray-200">
                            
                            
                            {/* Product Title */}
                            <div className="text-center">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
                                    SPROUT RESEARCH - <span className="italic text-blue-800">Retail</span>
                                </h2>
                                <p className="text-m text-gray-600 mt-1">Research service focused on fundamental and forensic analysis</p>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <caption className="sr-only">
                                    Product pricing details for Sprout Research Retail subscriptions
                                </caption>
                                <tbody>
                                  
                                    <tr className="border-b border-gray-100">
                                        <th scope="row" className="bg-gray-50 p-4 sm:p-6 font-semibold text-gray-700 text-sm sm:text-base text-left">
                                            Suitable
                                        </th>
                                        <td className="bg-blue-50 p-4 sm:p-6 text-gray-800 text-sm sm:text-base text-center">
                                            Active Investors
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <th scope="row" className="bg-gray-50 p-4 sm:p-6 font-semibold text-gray-700 text-sm sm:text-base text-left">
                                            Numbers of stocks covered
                                        </th>
                                        <td className="bg-blue-50 p-4 sm:p-6 text-gray-800 text-sm sm:text-base text-center">
                                            35-40 stocks annually (approximately 3-4 stock ideas per month)
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <th scope="row" className="bg-gray-50 p-4 sm:p-6 font-semibold text-gray-700 text-sm sm:text-base text-left">
                                            Ideas covered
                                        </th>
                                        <td className="bg-blue-50 p-4 sm:p-6 text-gray-800 text-sm sm:text-base text-center">
                                            Long-term picks, Tactical picks, High-risk high-reward picks
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <th scope="row" className="bg-gray-50 p-4 sm:p-6 font-semibold text-gray-700 text-sm sm:text-base text-left">
                                            Research notes
                                        </th>
                                        <td className="bg-blue-50 p-4 sm:p-6 text-gray-800 text-sm sm:text-base text-center">
                                            Detailed research note on every recommendation
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <th scope="row" className="bg-gray-50 p-4 sm:p-6 font-semibold text-gray-700 text-sm sm:text-base text-left">
                                            Weekend Insights
                                        </th>
                                        <td className="bg-blue-50 p-4 sm:p-6 text-gray-800 text-sm sm:text-base text-center">
                                            Covers macro topics worldwide, channel checks, and sectors in the news
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <th scope="row" className="bg-gray-50 p-4 sm:p-6 font-semibold text-gray-700 text-sm sm:text-base text-left">
                                            Subscription Pricing
                                        </th>
                                        <td className="bg-blue-50 p-4 sm:p-6">
                                            {/* Two Subscription Cards */}
                                            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 sm:gap-6 max-w-3xl mx-auto">
                                              
                                              {/* Annual Subscription Card */}
                                              <div className="flex-1 max-w-xs mx-auto sm:mx-0">
                                                
                                                  <div className="relative bg-white rounded-2xl p-4 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between overflow-hidden">
                                                    {/* Background Pattern */}
                                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-60"></div>

                                                    {/* Content */}
                                                    <div className="relative flex-1">
                                                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                        Annual Plan
                                                      </h3>
                                                      <p className="text-xl font-bold text-blue-600 mb-3">
                                                        INR 25,000/-
                                                      </p>
                                                    </div>
                                                  </div>
                                              </div>

                                              {/* Half-Yearly Subscription Card */}
                                              <div className="flex-1 max-w-xs mx-auto sm:mx-0">
                                                
                                                 
                                                  <div className="relative bg-white rounded-2xl p-4 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between overflow-hidden">
                                                    {/* Background Pattern */}
                                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-60"></div>
                                                    
                                          

                                                    {/* Content */}
                                                    <div className="relative flex-1">
                                                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                        Half Yearly Plan
                                                      </h3>
                                                      <p className="text-xl font-bold text-blue-600 mb-3">
                                                        INR 15,000/-
                                                      </p>
                                                    </div>

                                                  
                                                  </div>
    
                                              </div>

                                              
                                              
                                              
                                            </div>
                                        </td>
                                    </tr>
                                     <tr className="border-b border-gray-100">
                                        <th scope="row" className="bg-gray-50 p-4 sm:p-6 font-semibold text-gray-700 text-sm sm:text-base text-left">
                                            Sprout Research Retail Investors
                                        </th>

                                        <td className="bg-blue-50 p-4 sm:p-6">
                                            <SubscriptionCards />
                                        </td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        

                    </div>
                </div>
            </div>
        </div>
    </div>

    </main>
    <Footer />
    </>
  );
}
