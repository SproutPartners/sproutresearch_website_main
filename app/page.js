'use client'

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import React from 'react';
import Header from "@/Components/Header";
import Footer from "@/Components/FooterA11y";
import Newsletter from "@/Components/Newsletter";
import RecentInsights from "@/Components/RecentInsights";

export default function Home() {
   const [activeSection, setActiveSection] = useState('retail');

  // Function to handle the toggle button click
  const handleToggle = () => {
    setActiveSection((prevSection) =>
      prevSection === 'retail' ? 'institutional' : 'retail'
    );
  };
  return (
    
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>

      {/* Section 1 */}
      <div className="relative w-full h-[80vh]">
  <Image
    src="/images/pic5.jpg"
    alt=""
    aria-hidden="true"
    fill
    className="object-cover object-top"
  />

  <div className="absolute inset-0 flex flex-col justify-center items-center text-black text-center px-4 sm:px-8 lg:px-20">
    
    {/* Heading  */}
    <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-sans mb-6 lg:mb-8 lg:whitespace-nowrap">
      Independent Quality Stock Research 
    </h1>

    {/* Paragraphs  */}
    <p className="text-sm sm:text-base md:text-lg lg:text-lg max-w-5xl lg:whitespace-nowrap">
    Sprout Research provides meticulously curated stock ideas through in-depth fundamental 
    </p>
    <p className="text-sm sm:text-base md:text-lg lg:text-lg max-w-5xl lg:whitespace-nowrap">
     analysis, forensic scrutiny, and on-ground primary research. Our focus is on delivering high-
    </p>
    <p className="text-sm sm:text-base md:text-lg lg:text-lg  mb-6 lg:mb-10 max-w-5xl lg:whitespace-nowrap">
     quality investments while prioritizing risk management for your confidence and peace of mind.
    </p>
    

    <Link
      href="/Contact"
      aria-label="Enquire now on the contact page"
      className="inline-block rounded-full border border-black bg-white px-6 py-2 font-semibold text-black transition-transform duration-300 hover:-translate-y-2 sm:px-8"
    >
      Enquire Now
    </Link>
  </div>
</div>



      {/* Mission & Philosophy Section - Insert between Section 1 and 2 */}
      <section className=" bg-gray-300 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 bg-white py-16 max-w-screen">
          <h2 className="sr-only">Our mission and philosophy</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-h-vh">
            
            {/* Left Side - Mission and Philosophy Cards */}
            <div className="space-y-4 flex flex-col justify-center">
              
              {/* Mission Card */}
              <div className="group"> 
                <div className="bg-[#D4E6F0] rounded-3xl p-8 lg:p-12 ">
                  
                  <div className="flex flex-row items-center">
                  {/* Mission Icon */}
                  <div className="mb-2 mr-4">
                     <Image 
                      src="/images/LEAVESONLY.png" 
                      alt="" 
                      aria-hidden="true"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Mission Content */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4 transition-colors duration-300">
                    Our Mission
                  </h2>
                  
                  </div>
                  <p className="text-black text-base lg:text-lg leading-relaxed transition-colors duration-300">
                    We emphasize <span className="text-black font-semibold">quality over quantity</span>, offering stock ideas grounded in rigorous analysis to strengthen your investment thesis and minimize market risks.
                  </p>
                </div>
              </div>

              {/* Philosophy Card */}
              <div className="group">
                <div className="bg-[#D4E6F0] rounded-3xl p-8 lg:p-12 ">

                  <div className="flex flex-row items-center">
                    {/* Philosophy Icon */}
                  <div className="mb-2 mr-4">
                    <Image 
                      src="/images/LEAVESONLY.png" 
                      alt="" 
                      aria-hidden="true"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Philosophy Content */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4 transition-colors duration-300">
                    Our Philosophy
                  </h2>
                  </div>
                  
                  
                  {/* Quote */}
                  <div className="mb-4">
                    <blockquote className="text-xl font-bold text-black italic">
                      "Risk Management before Return Management"
                    </blockquote>
                  </div>
                  
                  <p className="text-black text-base lg:text-lg leading-relaxed transition-colors duration-300">
                    We conduct <span className="text-black font-semibold">governance-level scrutiny</span> to help you build a portfolio of high-quality stocks with conviction.
                  </p>
                </div>
              </div>
              
            </div>

            {/* Right Side - Image */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative ">
                {/* Add your image here */}
                <div className="w-full max-w-lvh h-96 lg:h-[500px] bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl overflow-hidden ">
                  {/* Placeholder for image - replace with your actual image */}
                  <img 
                    src="/images/pic1.jpg" 
                    alt="Investment Strategy" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* If no image available, use this placeholder */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                    <div className="text-center text-white">
                      <svg aria-hidden="true" focusable="false" className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <p className="text-lg font-medium opacity-75">Your Image Here</p>
                    </div>
                  </div>
                </div>
                
            
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
     {/* Section 2 */}
      <section id="about" className="py-20 bg-gray-50 w-full min-h-screen">
        <div className="container max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Why Choose Sprout Research ?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Empower your portfolio with well – researched stock ideas. We prioritize companies with strong fundamentals and sustainable growth, steering clear of short-term market fads.
          </p>
        </div>

          {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex justify-center mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-full w-20 h-20 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">EXPERIENCE</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              With over two decades of experience navigating the stock market’s highs and lows, we bring our expertise and dedication to every stock idea
            </p>
          </div>
        {/* Feature 2 */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2  w-full h-full">
          <div className="flex justify-center mb-6">
          <div className="bg-white border-2 border-gray-300 rounded-full w-20 h-20 flex items-center justify-center">
          <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">IN-DEPTH FUNDAMENTAL ANALYSIS</h3>
      <p className="text-gray-600 text-center leading-relaxed">
      We conduct thorough fundamental analysis to evaluate a company’s intrinsic value, ensuring our clients make informed investment decisions based on solid financial data
      </p>
    </div>
          {/* Feature 3 */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex justify-center mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-full w-20 h-20 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">FORENSIC AUDIT EXPERTISE</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Our forensic analysis uncovers hidden risks and irregularities, helping you avoid costly mistakes by providing a clear picture of a company’s true financial health
            </p>
          </div>
    {/* Feature 4 */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex justify-center mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-full w-20 h-20 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 005.656 5.656l1.172-1.172M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656L13 4.828" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">DIRECT CLIENT ENGAGEMENT</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              We work directly with you, bypassing intermediaries, to deliver personalized insights and recommendations tailored to your investment goals
            </p>
          </div>
    {/* Feature 5 */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex justify-center mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-full w-20 h-20 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 3v2m0 0l6 6m-6-6L6 11m6-6v14m9 0H3" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">UNBIASED <br/>RESEARCH</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Our reports are free from market hype or external pressures, focusing solely on data-driven insights to guide your portfolio decisions
            </p>
          </div>
      {/* Feature 6 */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex justify-center mb-6">
              <div className="bg-white border-2 border-gray-300 rounded-full w-20 h-20 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 2a10 10 0 100 20 10 10 0 000-20zm3 8l-2 6-6 2 2-6 6-2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">TRANSPARENT METHODOLOGY</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              We provide clear, detailed explanations of our analysis process, ensuring you understand the reasoning behind every recommendation
            </p>
          </div>
        </div>
      </div>

      </section>



      {/* Section 3 */}
      <section id="research" className="py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto px-2">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Our Process
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Let us guide you through every stage of your journey.
            </p>
          </div>

          {/* Grid: Process steps + image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            {/* Process Steps */}
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:bg-blue-100 bg-gray-100 rounded-lg px-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Idea Generation </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our advanced quantitative model combs through extensive data, pinpointing promising prospects. By integrating global market trends, sector-specific knowledge, and individual stock analysis, we uncover unique investment opportunities.
                    </p>
                  </div>
                </div>
                <div className="w-0.5 h-8 bg-gray-300 ml-6 mt-4"></div>
              </div>

              {/* Step 2 */}
              <div className="transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:bg-blue-100 bg-gray-100 rounded-lg px-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">In-Depth Analysis</h3>
                    <p className="text-gray-600 leading-relaxed">
                     We emphasize the integrity of financial performance, beginning with a thorough assessment of critical financial metrics. This is followed by comprehensive research into each company to ensure dependable insights
                    </p>
                  </div>
                </div>
                <div className="w-0.5 h-8 bg-gray-300 ml-6 mt-4"></div>
              </div>

              {/* Step 3 */}
              <div className="transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:bg-blue-100 bg-gray-100 rounded-lg px-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Strategic Roadmap</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The result of our approach is a clear, actionable research report crafted to elevate and inform your investment strategy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Image */}
            <div className="w-full h-100">
              <Image
                src="/images/pic4.jpg"
                alt="Our Process"
                width={300}
                height={200}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    


      {/* Section 4 */}
      <section id="get-to-know-us" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    {/* Section Title */}
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
      Get to Know Us
    </h2>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">
      {/* Text Content */}
      <div className="space-y-6 flex flex-col justify-center h-full">
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Founded by Shikha Kapur, a capital markets expert with nearly 20 years of experience, 
          Sprout Research combines deep expertise in equities with fundamental and quantitative analysis. 
          Shikha’s commitment to governance and clarity empowers investors to navigate complex markets confidently.
        </p>
        
      <Link
        href="/about/our-team"
        aria-label="Read more about the Sprout Research team"
        className="inline-flex justify-center rounded-full border-2 border-gray-300 px-6 py-2 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 lg:justify-start"
      >
        Read More
      </Link>
      </div>

      {/* Image and Quote */}
      <div className="relative flex justify-center items-center h-full">
  {/* Image with Animation */}
  <div className="rounded-lg w-full max-w-md overflow-hidden">
    <Image
      src="/images/pic3.jpg"
      alt="Financial Charts"
      width={500}
      height={300}
      className="w-full h-auto object-cover"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  </div>

  {/* Quote with Dotted Border */}
  <div className="absolute bottom-2 right-3.5 bg-white p-6 rounded-s shadow-lg border-l-8 border-dotted border-purple-500 max-w-[400px]">
    <p className="text-gray-700 italic text-lg">
      "We don't have to be smarter than the rest. We have to be more
      disciplined than the rest"
    </p>
    <p className="text-gray-900 font-semibold mt-2 text-right">
      – Warren Buffett
    </p>
  </div>
</div>
    </div>
  </div>
      </section>


      {/* Section 5 – Our Services */}
      <section id="services" className="w-full bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              All-encompassing solutions for your business’s financial journey
            </p>
          </div>

          {/* Content Grid */}
          <div className="min-h min-w-auto bg-gray-100 flex items-center justify-center p-4 font-sans">
                
                <div className="bg-white p-8 rounded-xl w-full max-w-4xl lg:mt-[-120px] ">
                  {          /* Title 
                  <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
                    Investment Information
                  </h1>
                  */}

                  {/* Toggle Button Container */}
                  <div className="flex justify-center mb-8">
                      <button
                        onClick={handleToggle}
                        type="button"
                        aria-label="Toggle between retail and private client services"
                        aria-pressed={activeSection === 'institutional'}
                        className="relative flex items-center rounded-full border-2 border-gray-700 bg-white p-1 shadow-inner cursor-pointer transition-all duration-300 ease-in-out w-90 h-14"
                      >
                        {/* Background for the active toggle */}
                        <div
                          className={`absolute w-1/2 h-12 rounded-full border border-gray-700 bg-blue-100 shadow-md transform transition-all duration-300 ease-in-out
                            ${activeSection === 'retail' ? 'translate-x-0' : 'translate-x-full'}`}
                        ></div>

                        {/* Retail Option */}
                        <span
                          className={`relative flex-1 text-center text-lg sm:text-xl font-semibold py-2 px-2 sm:px-4 rounded-full transition-colors duration-300 ease-in-out
                            ${activeSection === 'retail' ? 'text-black' : 'text-gray-950'}`}
                        >
                          Retail
                        </span>

                        {/* Institutional Option */}
                        <span
                          className={`relative flex-1 text-center text-lg sm:text-xl font-semibold py-2 px-2 sm:px-4 rounded-full transition-colors duration-300 ease-in-out
                            ${activeSection === 'institutional' ? 'text-black' : 'text-gray-950'}`}
                        >
                          Private Client
                        </span>
                      </button>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 bg-gray-100 rounded-lg  ">
                    {activeSection === 'retail' ? (
                      // Retail Content
                      <div className="animate-fade-in">
                        <h2 className="text-3xl font-semibold text-black mb-4">
                          Retail
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Our research is designed to bridge the gap between complex financial analysis and the needs of retail investors. We focus on high-growth opportunities across various market capitalizations, from small-cap gems to established large-cap stocks
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                          <li><span className="font-bold">Robust Fundamental and Forensic Analysis</span> for informed decision-making</li>
                          <li><span className="font-bold">Independent and Unbiased Research</span> for objective and trustworthy analysis</li>
                          <li><span className="font-bold">Practical stock ideas for Active investors</span> with short- to medium-term focus</li>
                          <li><span className="font-bold">Clear, Actionable Insights</span> that are easy to understand</li>
                          <li>
                            <span className="font-bold">Affordable subscription pricing:</span>
                            <ol className="list-decimal list-inside pl-6">
                              <li>Half-yearly: INR 15,000/-</li>
                              <li>Annual: INR 25,000/-</li>
                            </ol>
                          </li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed italic mt-4">
                         Tailored for young, emerging, and cost-conscious investors, our affordable subscription plans deliver professional-grade research, empowering beginners to confidently invest in the stock market without breaking the bank.
                        </p>
                        {/* Button for Retail Section */}
                        <div className="mt-6 text-center">
                          <a
                            href="/Research/Retail"
                            aria-label="Know more about Sprout Research Retail"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                          >
                            Know More 
                          </a>
                        </div>
                      </div>
                    ) : (
                      // Institutional Content
                      <div className="animate-fade-in">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-8">
                          Private Client Group (PCG)
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          We provide in-depth research services for private clients, including corporations, high-net-worth individuals (HNIs), and family offices. Our offerings include detailed fundamental and forensic analysis tailored for medium- to long-term investments with significant exposure
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Our curated annual selection of investment ideas is chosen for strong growth potential, supported by comprehensive analysis, quarterly updates, and insights from public documents and channel checks.
                        </p>
                        
                        
                        {/* Button for Institutional Section */}
                        <div className="mt-10 text-center">
                          <a
                            href="/Research/Pcg"
                            aria-label="Know more about Sprout Research Private Client Group"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                          >
                           Know More
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
          </div>
                
        </div>
      </section>

      {/* Recent Insights Section */}
      <RecentInsights />

      <Newsletter/>

      {/* Regulatory Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Regulatory Information
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to transparency and regulatory compliance
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Research Analyst Information Card */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Research Analyst</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="text-gray-600 ml-2">Shikha Kapur</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Proprietor:</span>
                  <span className="text-gray-600 ml-2">Sprout Research</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Type:</span>
                  <span className="text-gray-600 ml-2">Proprietorship</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Registration Number:</span>
                  <span className="text-gray-600 ml-2 font-mono">INH000019169</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">BSE Enlistment:</span>
                  <span className="text-gray-600 ml-2 font-mono">6441</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Registration Date:</span>
                  <span className="text-gray-600 ml-2">23 December 2024</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Validity:</span>
                  <span className="text-green-700 ml-2 font-semibold">Perpetual</span>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Contact Details</h3>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700 block mb-1">Principal/Grievance/Compliance Officer:</span>
                  <span className="text-gray-600">Shikha Kapur</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 block mb-1">Email:</span>
                  <a href="mailto:shikha.kapur@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                    shikhaa.kapur@gmail.com
                  </a>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 block mb-1">Mobile:</span>
                  <a
                    href="tel:9811744587"
                    aria-label="Call Principal Officer Shikha Kapur at plus 91 98117 44587"
                    className="text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    +91 98117 44587
                  </a>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 block mb-1">Registered Office:</span>
                  <span className="text-gray-600">
                    A 35 First Floor, Chittaranjan Park,<br />
                    New Delhi, NCT of Delhi - 110019
                  </span>
                </div>
              </div>
            </div>

            {/* SEBI Information Card */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">SEBI Information</h3>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700 block mb-2">SEBI Office Address:</span>
                  <span className="text-gray-600">
                    SEBI Bhavan RKC,<br />
                    Bandra-Kurla Complex,<br />
                    Mumbai - 400051, Maharashtra
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <span className="font-semibold text-gray-700 block mb-2">Important Links:</span>
                  <div className="space-y-2">
                    <a 
                      href="https://scores.sebi.gov.in/scores-home" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 transition-colors underline"
                    >
                      SEBI SCORES Portal
                    </a>
                    <a 
                      href="https://smartodr.in/login" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 transition-colors underline"
                    >
                      Smart ODR Platform
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
