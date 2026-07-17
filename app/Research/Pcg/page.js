'use client'
import React from 'react'
import Link from 'next/link'
import Header from '@/Components/Header'
import Footer from '@/Components/FooterA11y'
import Image from 'next/image';



const page = () => {
  const advantages = [
    {
      id: 1,
      image: "/images/rmage1.png",
      title: "Curated Selection",
      description: "Receive 12-15 meticulously researched investment ideas each year, carefully chosen for their growth potential and supported by comprehensive analysis."
    },
    {
      id: 2,
      image: "/images/rmage2.png",
      title: "Flash Ideas",
      description: "Discover quick insights on opportunities where we provide brief but impactful investment arguments."
    },
    {
      id: 3,
      image: "/images/rmage3.png",
      title: "Focus on Excellence",
      description: "Our approach targets high-growth potential across various market capitalizations, ensuring a diversified portfolio of top-tier opportunities."
    },
    {
      id: 4,
      image: "/images/rmage4.png",
      title: "Comprehensive Insights",
      description: "Benefit from in-depth analysis that backs each recommendation, providing you with a clear understanding of the investment's potential."
    },
    {
      id: 5,
      image: "/images/rmage5.png",
      title: "Strategic Guidance",
      description: "Gain access to precise entry and exit strategies for every investment, tailored to maximize your returns."
    },
    {
      id: 6,
      image: "/images/rmage6.png",
      title: "Continuous Monitoring",
      description: "Stay updated with regular reviews and updates on all existing recommendations, ensuring you are always informed on the latest developments."
    }
  ];
  

  return (
  <>
    <Header/>
    <main id="main-content" tabIndex={-1}>

    {/* Background Image and Content */}
    <div className="relative w-full h-[40vh] sm:h-[60vh] md:h-[70vh] lg:h-[70vh] xl:h-[70vh]  overflow-hidden">
      <Image
        src="/images/pic5.jpg" // make sure this path is correct
        alt=""
        aria-hidden="true"
        fill
        className="object-cover object-center z-0"
        priority
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-800 text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 z-10">
        {/* Logo Section */}
        {/* <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-2 sm:px-4 mb-4 sm:mb-6 md:mb-8 lg:mb-12 relative z-20'>
          
          <div className="h-12 xs:h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 2xl:h-32 rounded-lg overflow-hidden flex items-center justify-center sm:-mx-1 relative z-20">
            <Image
              src="/images/HD.png"
              alt="Logo"
              className="object-contain w-full h-full"
              width={400}
              height={200}
            />
          </div>
          
          
          <div className="h-12 xs:h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 2xl:h-32 text-gray-600 text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight rounded-lg overflow-hidden flex items-center justify-center sm:-mx-1 relative z-20">
            <h1 className="leading-none">|</h1>
          </div>
          
          
          <div className="h-12 xs:h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 2xl:h-32 rounded-lg overflow-hidden flex items-center justify-center sm:-mx-1 relative z-20">
            <Image
              src="/images/Trudence.png"
              alt="Logo"
              style={{ filter: 'brightness(100%)' }}
              className="object-contain w-full h-full"
              width={400}
              height={200}
            />
          </div>
        </div> */}

        <div className="flex flex-col justify-center items-center mb-6 sm:mb-8 md:mb-7 lg:mb-7">
          

          {/* Divider - Seamlessly connected to logo */}
          <div className="text-2xl sm:text-2xl md:text-3xl lg:text-6xl font-sans mb-2 lg:mb-4 lg:whitespace-nowrap">
            <h1 className="leading-none">Sprout Research-PCG</h1>
          </div>
          {/* <div className="text-sm sm:text-base md:text-lg lg:text-lg max-w-4xl lg:whitespace-nowrap text-center mb-4 lg:mb-4 italic">
            <p>Rigorous fundamental and forensic analysis tailored for corporations, HNIs, Family Offices and more</p>
          </div> */}
          
        </div>


        {/* Content Container */}
        <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4">
          {/* First Paragraph */}
          <div className="text-sm sm:text-base md:text-lg lg:text-lg max-w-7xl">
            <p className="leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed">
              Sprout Research PCG ("Private Client Group") subscription provides tailored research for corporations, HNIs, and family offices. Through rigorous fundamental and forensic analysis supported by proactive monitoring, our research strives to safeguard and grow your investments over medium to long-term.
            </p>
          </div>
          
          {/* Second Paragraph */}
          
        </div>
      </div>
    </div>

    {/*section 3  */}
    <section id="about" className="bg-gray-100 w-full py-16 lg:py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="sr-only">Private Client Group research process highlights</h2>
        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 lg:mt-32 w-full min-h-[300px] sm:min-h-[350px] lg:h-3/4 flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Early Identification</h3>
            <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed flex-grow">
              To stay ahead in competitive markets, early identification of opportunities is critical. This involves leveraging advanced screening tools, such as AI-driven data analytics platforms, predictive algorithms, and proprietary databases, to uncover undervalued or emerging prospects before they become mainstream
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 lg:mt-12 w-full min-h-[280px] sm:min-h-[320px] lg:h-2/3 flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Rigorous Analysis</h3>
            <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed flex-grow">
              Once potential opportunities are identified, conducting exhaustive due diligence is essential to validate the investment thesis. This process involves a comprehensive evaluation of quantitative and qualitative factors
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 lg:mt-32 w-full min-h-[300px] sm:min-h-[350px] lg:h-3/4 flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Thematic Overlay</h3>
            <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed flex-grow">
              Aligning investments with transformative macro trends ensures long-term growth potential. This approach requires ongoing monitoring of global trends and the flexibility to adapt as new themes emerge, ensuring alignment with the forces shaping the future economy
            </p>
          </div>
        </div>
      </div>
    </section>


    {/*Section 4 with Image and Text */}
    <div className="bg-white w-full min-h-screen py-16 px-6 sm:px-12 lg:px-24">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium mb-16">
            Sprout Research Advantage
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage) => (
              <div
                key={advantage.id}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer border border-gray-100"
              >
                {/* Circular Image Container */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-blue-400 transition- duration-300 group-hover:rotate-6 transform">
                    <img
                      src={advantage.image}
                      alt={advantage.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay effect */}
                    
                  </div>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-bold text-center text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {advantage.title}
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {advantage.description}
                </p>
                
                {/* Animated bottom border */}
                <div className="mt-6 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
    </div>

    {/* Section 5 with Research Reports */}
    {/* <div className="bg-white w-full min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
        Why SPROUT Research?
      </h1>
      <p className='text-center text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 mb-12    '>We prioritize protecting your investments with a strategic approach to risk management, ensuring your<br/>
      capital remains safeguarded while pursuing growth.</p>

      <div className="flex flex-col ">
        <div className="bg-white p-6 rounded-lg border border-black shadow transition flex-col flex items-start space-x-6 min-h-[200px]  ">
          
          <div>
            <ol className="list-decimal list-inside text-gray-800 space-y-4 text-base md:text-2xl ">
        <li> <span className='font-bold'>Pioneering Insights:</span> Our recommendations often center on companies poised for exponential growth, frequently overlooked by larger institutional investors.</li>
        <li><span className='font-bold'>Fundamental Excellence:</span> Each recommendation is underpinned by thorough analysis of business models, market opportunities, and competitive landscapes.</li>
        <li><span className='font-bold'>Proactive Oversight:</span> Our vigilant monitoring ensures timely adjustments to our recommendations as market conditions evolve.</li>
        <li><span className='font-bold'>Risk Mitigation:</span> We provide clear exit strategies to protect your investments, demonstrating our commitment to preserving and growing your capital.</li>
        <li><span className='font-bold'>Optimized Returns:</span> Our timely alerts are designed to help you maximize returns at the opportune moment.</li>
      </ol>
          
            
                
                    
          </div>
        </div>

        </div>
    </div> */}

    {/* Section 6 with Research Reports */}
    {/* <div className="bg-white w-full min-h-screen py-16 px-6 sm:px-12 lg:px-24 ">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-12">
        Our Methodology: From Identification to Realization
      </h1>
      

      <div className="flex flex-col ">

        <div className="bg-white p-6 rounded-lg border border-black shadow transition flex-col flex items-start space-x-6 min-h-[200px]  ">
          
          <div>
            <ol className="list-decimal list-inside text-gray-800 space-y-4 text-base md:text-2xl ">
        <li> <span className='font-bold'>Systematic Screening:</span> We employ advanced algorithms and expert insight to identify companies with exceptional growth potential.</li>
        <li><span className='font-bold'>Comprehensive Due Diligence: </span> Our team conducts exhaustive research, including financial analysis, management assessments, and competitive positioning evaluations.</li>
        <li><span className='font-bold'>Sophisticated Modeling:</span> We develop detailed financial models to stress-test our hypotheses and project future performance under various scenarios.</li>
        <li><span className='font-bold'>Strategic Recommendations:</span> Each investment idea is presented with a comprehensive report, including nuanced risk assessment.</li>
        <li><span className='font-bold'>Ongoing Evaluation:</span>We maintain constant vigilance over our recommendations, providing timely updates and adjusting our stance as market dynamics shift.</li>
      </ol>
          
            
                
                    
          </div>
        </div>

        </div>
    </div> */}

    {/* Subscribe Button */}
    <section id="ready-to-work" className="bg-white py-8 mb-1">
  <div className="container max-w-7xl mx-auto px-10">
    <div className="flex flex-col md:flex-row justify-center items-center">
      {/* Button */}
      <div>
        <Link
          href="/Contact"
          className="inline-flex flex-col rounded-2xl items-center bg-blue-50 text-gray-700 px-10 py-6 border border-gray-300 font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-2 transition-transform"
        >
          <span className="text-2xl font-bold">Get in touch to subscribe</span>
        </Link>
      </div>
    </div>
  </div>
    </section>

    {/* Section 8 Thematic Research Reports */}
    <div className="bg-white w-full min-h-screen py-16 px-6 sm:px-12 lg:px-24">
    <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-12">
      Below are some sample illustrations of the Research
    </h2>

    <div className="flex flex-col ">
      {/* Report 1 */}
      <div className="bg-white p-6 rounded-lg border border-black shadow transition flex-col flex items-start space-x-6 min-h-[400px] ">
        <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">KEY MARITIME ANCILLARY PLAYER </h2>
          <p className="text-gray-600 text-sm">Unearthing the Depths…</p>
              <div className=" sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
              <p>Executive Summary</p>
              <p>The company, commanding over 80% of its market, enjoys robust revenue visibility backed by a healthy pipeline of contracts. With a massive market opportunity
                  projected over the next decade, and strategic support from Maritime India Vision 2030, the company is poised for sustained growth. To support this growth…</p>
        </div>
      </div>

      {/* Report 2 */}
      <div className="bg-white p-6 rounded-lg shadow  transition flex flex-col items-start space-x-6 border border-black min-h-[400px]  ">
        <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">A MICROFINANCE PLAYER</h2>
          <p className="text-gray-600 text-sm">Emerging Stronger from a Period of Stress…</p>
              <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
              <p>Executive Summary</p>
              <p>The microfinance (MFI) sector is witnessing early signs of recovery, underpinned by improved collections and reduced borrower stress. Recent rate cuts and 
                  enhanced liquidity measures by the RBI have played a pivotal role in fostering a more resilient lending environment. These macroeconomic tailwinds have
                  alleviated pressure on borrowers, driving stabilization in the sector and setting the stage for a potential rebound in asset quality and profitability…</p>

        </div>
      </div>

      {/* Report 3 */}
      <div className="bg-white p-6 rounded-lg shadow  transition flex flex-col items-start space-x-6 border border-black min-h-[400px] ">
       <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">ELECTRIFYING INDIA</h2>
          <p className="text-gray-600 text-sm">Capitalizing on Transmission & Distribution Growth</p>
              <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
          <p>Executive Summary</p>
          <p>Expanding transmission networks and grid interconnectivity is key to stabilizing renewable energy. While electrification is the future, progress is hindered by
              technological, economic, and political challenges. Governments and MNCs are investing heavily in greener grids and advanced transmission technologies,
              making electricity transmission the biggest beneficiary of the global energy shift. India’s transmission sector has…</p>
              
                
        </div>
      </div>

      {/* Report 4 */}
      <div className="bg-white p-6 rounded-lg shadow  transition flex flex-col items-start space-x-6 border border-black min-h-[400px] ">
       <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">CASH FLOWS AT THE CORE</h2>
          <p className="text-gray-600 text-sm">Comfortable valuations for stable cashflows</p>
              <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
              <p>Executive Summary</p>
              <p>As uncertainty clouds the market, attempts to predict its bottom have left most observers as uncertain as anyone else. Expectations for the Union Budget 2025
                  remain subdued, with little clarity on critical issues such as Trump tariffs on India, potential rate cuts, currency stabilization, or the trajectory of foreign money
                    flows. Amid this uncertainty, it’s…</p>
              
                </div>
      </div>

      {/* Report 5 */}
      <div className="bg-white p-6 rounded-lg shadow  transition flex flex-col items-start space-x-6 border border-black min-h-[400px] ">
        <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
        <div>
          <h2 className="ttext-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">FINANCIAL SERVICES PLAYER</h2>
          <p className="text-gray-600 text-sm">Re-rating candidate post amalgamation</p>
              <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
              <p>Executive Summary</p>
              <p>The company is a comprehensive financial services platform offering loans, investments, insurance, and payments through its subsidiaries and joint ventures.
                  The company’s NBFC arm ranks among the top private sector NBFCs, while its other key businesses include housing finance, life insurance (JV), and asset
                    management.</p>
                  </div>
      </div>

      {/* Report 6 */}
      <div className="bg-white p-6 rounded-lg shadow  transition flex flex-col items-start space-x-6 border border-black min-h-[400px] ">
        <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">A QUALITY CEMENT COMPANY</h2>
          <p className="text-gray-600 text-sm">Green in the grey…</p>
              <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
              <p>Executive Summary</p>
              <p>The quality cement company, backed by a strong group, has a capacity of 4.40 MTPA. Though constituting less than 1% of India’s total cement capacity, it stands
              out as a compelling investment opportunity for the following three key reasons…</p>
             </div>
      </div>

      {/* Report 7 */}
      <div className="bg-white p-6 rounded-lg shadow  transition flex flex-col items-start space-x-6 border border-black min-h-[400px] ">
        <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">PREMIUM LUBRICANT PLAYER</h2>
          <p className="text-gray-600 text-sm">Strong and Stable Cash flows …</p>
              <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
              <p>Executive Summary</p>
              <p>The company stands as a premier investment opportunity in the lubricants sector, fortified by its strong parentage and an enduring legacy of market leadership.
              Over the decade from 2013 to 2023, the company showcased consistent growth, achieving a revenue CAGR of 4.7% and profit CAGR of 5.4%…</p>
              </div>
      </div>

      {/* Report 8 */}
      <div className="bg-white p-6 rounded-lg shadow  transition flex flex-col items-start space-x-6 border border-black  min-h-[400px] ">
        <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">THEMATIC IDEA</h2>
          <p className="text-gray-600 text-sm">Atomization of Clean Energy…</p>
              <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
              <p>Executive Summary</p>
              <p>rillions of dollars are being funnelled into greening global supply chains, marking the most transformative shift since the coal revolution of the 19th century.
              While this transition will be complex and gradual, significant progress is underway in renewable energy, electric batteries, and advanced nuclear technologies.
              Key milestones include the planned 2028 revival of the Three Mile Island nuclear plant….
              </p>
             </div>
      </div>

      {/* Report 9 */}
      <div className="bg-white p-6 rounded-lg shadow  transition flex flex-col items-start space-x-6 border border-black min-h-[400px] ">
        <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">LEADING BITUMEN AND LOGISTICS PLAYER</h2>
          <p className="text-gray-600 text-sm">Embarking on a Long Voyage…</p>
              <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
              <p>Executive Summary</p>
              <p>The company is a leading supplier of bitumen products and provides logistics services for Liquefied Petroleum Gas (LPG) and bituminous products. Through its
                  UAE-based 100% subsidiary, the company has also expanded into the ship operating….
              </p>
              </div>
      </div>

      {/* Report 10 */}
      <div className="bg-white p-6 rounded-lg shadow  transition flex flex-col items-start space-x-6 border border-black min-h-[400px] ">
        <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">A Regional Hospital Player</h2>
          <p className="text-gray-600 text-sm">Compelling Valuations amidst Expansion …</p>
              <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
          <p>Executive Summary</p>
          <p>The company, a Coimbatore-based hospital chain, is embarking on significant expansion, combining brownfield and greenfield projects. This expansion will boost its total bed capacity from….</p>
             </div>
      </div>

      {/* Report 11 */}
    <div className="bg-white p-6 rounded-lg shadow  transition flex flex-col items-start space-x-6 border border-black min-h-[400px] ">
      <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">Likely Turnaround in Real Estate and Hospitality</h2>
        <p className="text-gray-600 text-sm">Land aggregator coming out of woods…</p>
        <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
        <p>Executive Summary</p>
        <p>The company faced significant challenges during the last decade but has since made considerable progress in overcoming this difficult phase. For the last 2
             years, the company has been actively cleansing its balance sheet and improving corporate governance and disclosure practices.  Further, successful one-time….</p>
            
      </div>
    </div>

    {/* Report 12 */}
    <div className="bg-white p-6 rounded-lg shadow transition flex flex-col items-start space-x-6 border border-black min-h-[400px] ">
      <img src="/images/HD.png" alt="Sprout Research logo" className="h-15" />
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">Chemical Player with visibility and turnaround</h2>
        <p className="text-gray-600 text-lg">Turns around with visibility in greenshoots…</p>
            <div className="sm:w-[100px] md:w-[200px] lg:w-[700px] h-1 bg-blue-900 mt-7"></div>
        <p>Executive Summary</p>
        <p>The company has faced significant challenges in the past, including difficulties recovering from the NSEL commodity financing crisis, high leverage, and issues
             with capital misallocation. However, we believe these challenges are now largely behind them…</p>
             
      </div>
    </div>

      
      </div>
    </div>

    </main>
    <Footer/>

  </>

  )
}

export default page 
