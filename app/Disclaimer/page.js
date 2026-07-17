import React from 'react'
import Image from 'next/image'
import Header from '@/Components/Header'
import Footer from '@/Components/FooterA11y'

const Page = () => {
  return (
    <>
    <Header/>
    <main id="main-content" tabIndex={-1}>
    <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] xl:h-[70vh]  overflow-hidden">
              <Image
                src="/images/pic5.jpg" // make sure this path is correct
                alt=""
                aria-hidden="true"
                fill
                className="object-cover object-center z-0"
                priority
              />
        
              <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-800 text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 z-10">
        
                <div className="flex flex-col justify-center items-center mb-6 sm:mb-8 md:mb-7 lg:mb-7">
                  
        
                  {/* Divider - Seamlessly connected to logo */}
                  <div className="text-2xl sm:text-2xl md:text-3xl lg:text-6xl font-sans lg:whitespace-nowrap">
                    <h1 className="leading-none">Disclaimer</h1>
                  </div>
                  
                </div>
        
        
                {/* Content Container */}
                <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4">
                  {/* First Paragraph */}
                  <div className="text-sm sm:text-base md:text-lg lg:text-lg max-w-7xl">
                    <p className="leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed">
                      Shikha Kapur (Proprietor of Sprout Research) is a SEBI registered Research Analyst (INH000019169) provides research services to various investors. No content on this website should be construed to be investment advice. You should consult a qualified financial advisor prior to making any actual investment or trading decisions. All information is a point of view, and is for educational and informational use only. The author accepts no liability for any interpretation of articles or comments on this website being used for actual investments. While we may talk about strategies or positions in the market, our intent is solely to showcase effective risk-management in dealing with financial instruments. This is purely an information service and any trading done on the basis of this information is at your own, sole risk.
                    </p>
                  </div>
                  
                </div>
              </div>
        </div>


                         {/* Two-column responsive details */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 ">
          {/* Left column */}
<div className='pl-3 lg:pl-20'>
  <div className="text-sm lg:text-base space-y-1 text-gray-900 leading-relaxed">
    <p className="font-semibold text-base lg:text-lg">SHIKHA KAPUR PROPRIETOR OF SPROUT RESEARCH</p>
    
    <p><span className="font-semibold">Trade Name:</span> SPROUT RESEARCH</p>
    
    <p><span className="font-semibold">Registration No.:</span> INH000019169</p>
    
    <p>
      <span className="font-semibold">Registered office Address:</span> A 35 FIRST FLOOR, Chittaranjan Park, NEW DELHI, NATIONAL CAPITAL TERRITORY OF DELHI, 110019
    </p>
    
    <p>
      <span className="font-semibold">Contact No:</span> 9811744587 <span className="font-semibold">Email Id:</span> shikhaa.kapur@gmail.com
    </p>
    
    <p>
      <span className="font-semibold">Compliance Officer:</span> Shikha Kapur <span className="font-semibold">Contact No:</span> 9811744587
    </p>
    
    <p><span className="font-semibold">Email Id:</span> shikhaa.kapur@gmail.com</p>
    
    <p>
      <span className="font-semibold">Grievance Officer:</span> Shikha Kapur <span className="font-semibold">Contact No:</span> 9811744587
    </p>
    
    <p><span className="font-semibold">Email ID:</span> shikhaa.kapur@gmail.com</p>
  </div>
</div>

          {/* Right column */}
          <div className='pl-6 lg:pl-20'>
            <h2 className="text-sm md:text-xl lg:text-2xl font-bold mb-4">Standard Warning</h2>
            <p className="text-sm md:text-xl lg:text-xl mb-8 ">
              “Investment in securities market are subject to market<br/>
               risks. Read all the related documents carefully before<br/>
                investing.”
            </p>

            <h2 className="text-sm md:text-xl lg:text-2xl font-bold mb-4">Disclaimers</h2>
            <p className="text-sm md:text-xl lg:text-xl">
              “Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors”
            </p>
          </div>
        </div>
    
    </main>
                  <Footer/>

    </>
  )
}

export default Page
