'use client'

import React, { useState } from 'react'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import Image from "next/image";
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  // Carousel data - you can easily modify this to add more services
  const carouselData = [
    {
      title: "Our Expertise",
      items: [
        "Market Analysis: Identify trends, opportunities, and risks",
        "Evaluate companies' intrinsic value using relevant valuation techniques",
        "Channel checks, on-ground research and insights from the respective industry",
        "Gain clarity on private companies with hard-to-access data, including financials, growth potential, and market positioning"
      ]
    },
    {
      title: "Our Approach",
      items: [
        "Advanced Analytics:",
        "We employ cutting-edge tools and methodologies to analyze complex datasets, providing insights that go beyond surface-level observations",
        "Our advanced models enable trend forecasting and scenario planning to guide strategic decision-making",
        "Thorough Analysis of Public Documents:",
        "We dive deep into public records, reports, and open-source intelligence to uncover critical details often overlooked",
        "Our meticulous approach ensures every relevant piece of information is identified and integrated into the analysis",
      ]
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)
  }

  return (
    <>
      <Header/>

      {/* Section 1 */}
      <div className="relative w-full h-[80vh]">
        <Image
          src="/images/pic5.jpg"
          alt="Decorative abstract blue financial background"
          fill
          className="object-cover object-top"
          priority
        />
      
         <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 lg:px-20 font-inter">
          <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full mx-auto p-4 md:p-0 rounded-xl ">
          
            
            <div className="w-full md:w-3/5 p-6 sm:p-8 flex flex-col items-center md:items-start text-center md:text-left gap-4">
              {/* Main Heading - Using text from the provided image */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Optimizing financial<br className="hidden sm:inline"/> structures for growth
              </h1>

              {/* Subheading/Description - Using text from the provided image */}
              <p className="text-base sm:text-lg text-gray-700 mt-2 max-w-md">
                Connecting businesses with resources, expertise, and networks to
                cultivate financial success
              </p>

              {/* Call to Action Button - Using text from the provided image */}
              <Link href="/Contact" className="inline-block bg-white text-black px-6 sm:px-8 py-2 font-semibold border border-black rounded-full transition-transform duration-300 hover:-translate-y-2" aria-label="Enquire now on the contact page">
                Enquire Now
              </Link>
            </div>

            <div className="w-full md:w-2xl h-60 flex justify-center md:justify-end pr-0 md:pr-8 mb-6 md:mb-0">
              <Image
                src="/images/aboutserv1.jpg"
                alt="Optimizing Financial Structures"
                width={320}
                height={240}
                className="w-full max-w-xs md:max-w-none h-auto object-cover rounded-xl shadow-lg"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Section 2 - Services Section */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              OUR SERVICES
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              All-encompassing solutions for your business financial journey
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Side - Research Section */}
            <div className="space-y-8">
              {/* Research Header with Icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Research</h3>
              </div>

              {/* Research Image */}
              <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/aboutserv2.jpg"
                  alt="Research and Analytics"
                  fill
                  className="object-cover"
                />
                {/* Overlay with glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>

              </div>

              {/* Research Description */}
              <div className="space-y-4">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  At Sprout Partners, we excel in delivering comprehensive research on both <span className="font-semibold text-blue-600">listed</span> and <span className="font-semibold text-blue-600">unlisted companies</span>, equipping businesses with actionable insights to make informed decisions. Our data-driven approach combines deep market expertise, industry-specific analysis, on-ground channel checks, and meticulous examination of financial and other critical documents—all within a robust regulatory framework.
                </p>
              </div>
            </div>

            {/* Right Side - Carousel Section */}
            <div className="bg-blue-200/50 rounded-2xl p-8 sm:p-10 shadow-lg">
              
              {/* Carousel Content */}
              <div className="min-h-[300px] sm:min-h-[320px]">
                <div className="space-y-6">
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    {carouselData[currentSlide].title}:
                  </h4>
                  
                  <div className="space-y-4">
                    {carouselData[currentSlide].items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Carousel Footer */}
              <div className="flex items-center justify-center mt-6 sm:mt-8">
                
                {/* Navigation Buttons */}
                <div className="flex justify-center gap-2">
                  <button
                type="button"
                    onClick={prevSlide}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 text-black" />
                  </button>
                  <button
                type="button"
                    onClick={nextSlide}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5 text-black" />
                  </button>
                </div>

              </div>
            </div>

          </div>

          

        </div>
      </section>

      {/* Section 3 - Services Section */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Side - Research Section */}
            <div className="space-y-8">
              {/* Research Header with Icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Fundraising Solutions</h3>
              </div>

              {/* Research Image */}
              <div className="relative w-full h-60 sm:h-60 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/aboutserv3.png"
                  alt="Fundraising Solutions"
                  fill
                  className="object-cover"
                />
                {/* Overlay with glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>

              </div>

              {/* Fundrazing solution Description */}
              <div className="space-y-4">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  At Sprout Partners, we specialize in advising and facilitating strategic capital-raising solutions for businesses. Our expertise encompasses both primary funding and secondary transaction opportunities. By collaborating with your companys finance team and key stakeholders, we streamline the process of securing capital from public markets, private investors, and institutional channels, ensuring a seamless and efficient experience.
                </p>
              </div>
            </div>

            {/* Right Side - Carousel Section */}
            <div className="bg-blue-200/50 rounded-2xl p-8 sm:p-10 shadow-lg">
              
              {/* Content */}
              <div className="min-h-[300px] sm:min-h-[320px]">
                <div className="space-y-6">
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                   Our Expertise
                  </h4>
                  
                  <div className="flex flex-col gap-5">
                   
                      <div  className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                          Develop a tailored strategy to meet your capital needs. Identify and access the best funding sources, including public offerings, private placements, and debt financing
                        </p>
                      </div>

                      <div  className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                        
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                          Leverage our network to connect with public markets, private equity firms, banks, and institutional investors
                        </p>
                      </div>

                      <div  className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                        
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                          Guide your team through every step, from preparing financial documents to engaging with stakeholders
                        </p>
                        
                      </div>

                      <div  className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                          Regulatory Expertise: Ensure compliance with all regulatory requirements for smooth fundraising execution
                        </p>
                      </div>
                    
                  </div>
                </div>
              </div>


            </div>

          </div>

          

        </div>
      </section>

      {/* Section 4 - Services Section */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Side - Research Section */}
            <div className="space-y-8">
              {/* Research Header with Icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Advisory Services</h3>
              </div>

              {/* Research Image */}
              <div className="relative w-full h-60 sm:h-60 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/aboutserv4.png"
                  alt="Advisory Services"
                  fill
                  className="object-cover"
                />
                {/* Overlay with glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>

              </div>

              {/* Fundrazing solution Description */}
              <div className="space-y-4">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  At Sprout Partners, we deliver expert advisory services designed to help corporates optimize their financial and capital structures. Our customized solutions empower businesses to achieve long-term stability, enhance operational efficiency, and drive sustainable growth.  
                </p>
              </div>
            </div>

            {/* Right Side - Carousel Section */}
            <div className="bg-blue-200/50 rounded-2xl p-8 sm:p-10 shadow-lg">
              
              {/* Content */}
              <div className="min-h-[300px] sm:min-h-[320px]">
                <div className="space-y-6">
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                   Our domain
                  </h4>
                  
                  <div className="flex flex-col gap-5">
                   
                      <div  className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                          Reorganize debt and equity to improve liquidity and financial health; and develop strategies to reduce financial stress and optimize cost of capital  
                        </p>
                      </div>

                      <div  className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                        
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                          Assess and design the ideal balance of debt, equity, and other financing sources; align capital structures with business goals and market conditions
                        </p>
                      </div>

                      <div  className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                        
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                          Offer actionable insights to improve financial performance and investor confidence; evaluate and implement alternatives such as refinancing, divestitures, and recapitalization
                        </p>
                        
                      </div>
                    
                  </div>
                </div>
              </div>


            </div>

          </div>

          

        </div>
      </section>

      <Footer/>
    </>
  )
}

export default Page
