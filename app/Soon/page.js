'use client'
import React from 'react'
import Link from 'next/link'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import Image from 'next/image';
import Subscribe from '@/Components/Subscribe'

const page = () => {
  return (
    
    
    <>
        <Header />

        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
          <Image
            src="/images/pic5.jpg" // make sure this path is correct
            alt="Decorative abstract blue financial background"
            fill
            className="object-cover object-top z-0"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-black text-center px-4 sm:px-8 lg:px-20 z-10">
            
        
            {/* Heading with animated underline */}
            
            
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-5xl 2xl:text-4xl font-medium mb-1 sm:mb-2 text-center leading-tight">
              We’ll be back shortly
            </h1> 
            <p className="text-sm sm:text-base md:text-lg flex items-center lg:text-lg max-w-4xl lg:whitespace-nowrap text-center mb-4 lg:mb-4 italic">
              We have currently paused new purchases of our Sprout Research-Retail subscription.Interested?<br/> Please share your e-mail ID in the form below and we would notify you when we resume taking further subscriptions.
            </p>
           
        
            {/* Paragraphs  */}
            {/*
         <div className="text-xs sm:text-sm md:text-base lg:text-lg max-w-5xl text-center space-y-0.5 sm:space-y-1 px-2">
              <p className="leading-tight">
                Sprout Research delivers comprehensive research services rooted in detailed fundamental and forensic analysis. Its
              </p>
              <p className="leading-tight">
                mission is to safeguard your investments by employing strategic risk management and vigilant monitoring, enabling timely
              </p>
              <p className="leading-tight">
                adjustments in response to evolving market conditions. Sprout Research excels in uncovering high-growth investment
              </p>
              <p className="leading-tight">
                opportunities ahead of the curve. Through rigorous analysis and a selective approach, it aims to provide you with a decisive
              </p>
              <p className="leading-tight">
                edge in the ever-changing landscape of equity investing.
              </p>
            </div>*/}
          </div>
        </div>

        <Subscribe/>

        <Footer/>
    </>
  )
}

export default page