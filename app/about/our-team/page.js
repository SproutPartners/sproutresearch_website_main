import React from 'react'
import Image from "next/image";
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <Header/>
      <div className="relative w-full h-[80vh]">
  <Image
    src="/images/pic5.jpg"
    alt="Decorative abstract blue financial background"
    fill
    className="object-cover object-top"
  />
  
  {/* Content overlay */}
  <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12">
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left content area */}
        <div className="flex-1 max-w-2xl">
          <div className=" p-6 md:p-8 ">
            <h2 className="text-2xl md:text-3xl lg:text-6xl font-bold text-gray-800 mb-4">
             Optimizing financial<br/>
              structures for growth
            </h2>
            <p className="text-gray-600 text-base md:text-lg lg:text-lg leading-relaxed mb-6">
              Connecting businesses with resources, expertise, and networks to 
              <br/>cultivate financial success
            </p>
             <Link href="/Contact" className="inline-block bg-white text-black px-6 sm:px-8 py-2 font-semibold border border-black rounded-full transition-transform duration-300 hover:-translate-y-2" aria-label="Enquire now on the contact page">
      Enquire Now
    </Link>
          </div>
        </div>
        
        {/* Right image area */}
        <div className="flex-1 max-w-md lg:max-w-lg">
          <div className="relative">
            <Image
              src="/images/tage.jpg"
              alt="Featured content"
              width={500}
              height={600}
              className="w-full h-auto rounded-2xl shadow-xl border-4 border-white/80"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
            {/* Optional overlay for the image */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>
{/* Main content section */}
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
          In today's dynamic and challenging financial environment, choosing the
          right path is essential for long-term business success. At <span className='font-bold'>Sprout
          Partners</span>, we understand the importance of tailored guidance and expert
          advice to help you stay ahead.
        </p>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Our team excels in providing<span className='font-bold'> strategic advice, financial restructuring</span>,
          forensic analysis, and developing<span className='font-bold'> advanced financial models </span> customized
          for various industries. With <span className='font-bold'>75 years of collective experience</span>, we
          provide the knowledge, insight, and strategic acumen needed to
          confidently navigate complexities and seize opportunities.
        </p>
        
      </div>

      {/* Image and Quote */}
      <div className="relative flex justify-center items-center h-full">
        {/* Image with Animation */}
       <div className="rounded-lg w-full max-w-md overflow-hidden">
  <Image
    src="/images/pic3.jpg"
    alt="Financial chart and market analysis visual"
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
        <div className="absolute bottom-2 right-3.5 bg-white p-6 rounded-lg shadow-lg border-l-8 border-dotted border-purple-500 max-w-[400px]">
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
{/* Foundation Section */}
<div id="Foundation" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    {/* Content Grid */}
    <div className="flex flex-col lg:flex-row gap-12 items-center h-auto">
      
      {/* Image Section - 40% width */}
      <div className="w-full lg:w-[40%] relative flex justify-center lg:justify-start items-center h-full order-1 lg:-translate-x-12 lg:-translate-y-4 transition">
        <div className="rounded-lg w-full max-w-md overflow-hidden">
          <Image
            src="/images/tage2.png"
            alt="Financial chart and market analysis visual"
            width={500}
            height={400}
            className="w-full h-auto object-cover"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>

      {/* Text Section - 60% width */}
      <div className="w-full lg:w-[60%] space-y-6 flex flex-col justify-center h-full order-2 lg:translate-x-8 lg:-translate-y-4 transition">
        <h2 className="font-bold text-4xl mb-14">Our Foundation</h2>

        <p className="text-lg md:text-lg text-gray-600 leading-relaxed ">
          At Sprout Partners, we are united by a shared vision – helping businesses and promoters 
          navigate both the straightforward and complex aspects of the financial world. What started as a 
          collaboration among seasoned professionals has evolved into a <span className='font-bold'>trusted advisory firm </span>
          dedicated to delivering financial clarity and driving success.
        </p>

        <p className="text-lg md:text-lg text-gray-600 leading-relaxed ">
          <span className='font-bold'>Our approach is rooted in partnership</span>. We collaborate closely with you to understand your\
          objectives, evaluate your financial landscape, and design strategies that provide confidence 
          and enduring outcomes. We have seen how the right guidance can transform a business, be it 
          through restructuring to enhance liquidity or planning infusions for sustainable growth. Our
          unwavering focus is on achieving long-term success for your organization.
        </p>
      </div>
    </div>
  </div>
</div>
{/*Team Section*/}
<div id="team" className="bg-white min-h-screen py-16 px-6">
  <h1 className="text-center font-bold text-6xl">THE SPROUT TEAM</h1>
  <p className="text-center text-lg mt-6 text-gray-600">
    With a diverse range of expertise and commitment to excellence, our team is dedicated to delivering strategic insights that drive results. Get to know our team.
  </p>

  {/* Grid container */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">

  {/* Member 1 */}
  <div className="bg-white px-8 py-10 shadow-xl hover:drop-shadow-[0_10px_15px_rgba(59,130,246,0.5)]  transition-all  duration-300 rounded-2xl flex flex-col items-center text-center min-h-[480px]">
    <Image
      src="/images/Shikha.png"
      alt="Shikha Kapur"
      width={160}
      height={160}
      className="w-40 h-40 object-cover rounded-xl border-[3px] border-gray-200 mb-4"
      style={{
        width: '160px',
        height: '160px',
      }}
    />
    <h3 className="text-2xl font-semibold mb-4">SHIKHA KAPUR</h3>
    <div className="flex gap-5 mb-4">
      <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer">
        <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-black hover:text-yellow-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v16h-4V8zM8.5 8h3.5v2.25h.05c.49-.92 1.69-1.89 3.45-1.89 3.69 0 4.5 2.43 4.5 5.59V24h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.89 1.95-2.89 3.97V24h-4V8z"/>
        </svg>
      </a>
      <a href="https://x.com/johndoe" target="_blank" rel="noopener noreferrer">
        <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-black hover:text-yellow-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.36 8.48 8.48 0 0 1-2.7 1.03 4.24 4.24 0 0 0-7.29 3.86A12.01 12.01 0 0 1 3.16 4.53a4.24 4.24 0 0 0 1.31 5.65A4.24 4.24 0 0 1 2.8 9.5v.05a4.25 4.25 0 0 0 3.4 4.16 4.26 4.26 0 0 1-1.11.15c-.27 0-.54-.03-.79-.08a4.24 4.24 0 0 0 3.96 2.95A8.5 8.5 0 0 1 2 19.54 12 12 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0 0 22.46 6z"/>
        </svg>
      </a>
    </div>
    <p className="text-gray-600 text-base max-w-md">
      Shikha brings nearly two decades of immersive experience in capital markets, offering a wealth of expertise. 
      Her proficiency in equities is deeply rooted in both fundamental and quantitative analysis methodologies.
       Before assuming her current position, she led the fundamental research division of an Alternative Investment Fund (AIF),
        where her responsibilities included overseeing a research team and evaluating unlisted companies for investment opportunities.
         She has also made significant contributions to the realm of governance practices within the Asia-Pacific region for a prominent
          global fund. She holds an MBA in Finance and a Bachelor's in Economics from Delhi University.
    </p>
  </div>

  {/* Member 2 */}
  <div className="bg-white px-8 py-10 shadow-xl hover:drop-shadow-[0_10px_15px_rgba(59,130,246,0.5)]  transition-all  duration-300 rounded-2xl flex flex-col items-center text-center min-h-[480px]">
    <Image
      src="/images/Sanjay.png"
      alt="Sanjay Dutt"
      width={160}
      height={160}
      className="w-40 h-40 object-cover rounded-xl border-[3px] border-gray-200 mb-4"
      style={{
        width: '160px',
        height: '160px',
      }}
    />
    <h3 className="text-2xl font-semibold mb-4 uppercase">SANJAY DUTT</h3>
    <div className="flex gap-5 mb-4">
      <a href="https://linkedin.com/in/janesmith" target="_blank" rel="noopener noreferrer">
        {/* LinkedIn icon */}
        <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-black hover:text-yellow-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v16h-4V8zM8.5 8h3.5v2.25h.05c.49-.92 1.69-1.89 3.45-1.89 3.69 0 4.5 2.43 4.5 5.59V24h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.89 1.95-2.89 3.97V24h-4V8z"/>
        </svg>
      </a>
      <a href="https://x.com/janesmith" target="_blank" rel="noopener noreferrer">
        {/* X icon */}
        <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-black hover:text-yellow-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.36 8.48 8.48 0 0 1-2.7 1.03 4.24 4.24 0 0 0-7.29 3.86A12.01 12.01 0 0 1 3.16 4.53a4.24 4.24 0 0 0 1.31 5.65A4.24 4.24 0 0 1 2.8 9.5v.05a4.25 4.25 0 0 0 3.4 4.16 4.26 4.26 0 0 1-1.11.15c-.27 0-.54-.03-.79-.08a4.24 4.24 0 0 0 3.96 2.95A8.5 8.5 0 0 1 2 19.54 12 12 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0 0 22.46 6z"/>
        </svg>
      </a>
    </div>
    <p className="text-gray-600 text-base max-w-md">
      Sanjay Dutt, an Advisor and Mentor, brings over 30 years of equity markets expertise, leveraging his
       deep experience as both an investor and a strategic consultant to businesses. As the founder
        of Quantum Securities P Ltd., established in 1994, he has a proven track record in the brokerage
         industry. Today, Sanjay works independently with public and private companies, guiding them on business 
         strategy, capital structuring, and fundraising. At Sprout, he actively engages in identifying and cultivating
          themes and opportunities within the public markets.
    </p>
  </div>

  {/* Member 3 */}
  <div className="bg-white px-8 py-10 shadow-xl hover:shadow-2xl hover:drop-shadow-[0_10px_15px_rgba(59,130,246,0.5)]  transition-all  duration-300 rounded-2xl flex flex-col items-center text-center min-h-[480px]">
    <Image
      src="/images/Nitin.png"
      alt="Nitin Mangal"
      width={160}
      height={160}
      className="w-40 h-40 object-cover rounded-xl border-[3px] border-gray-200 mb-4"
      style={{
        width: '160px',
        height: '160px',
      }}
    />
    <h3 className="text-2xl font-semibold mb-2 uppercase">NITIN MANGAL</h3>
    <p className="text-blue-600 font-semibold text-sm mb-4 uppercase">CONSULTANT</p>
    <div className="flex gap-5 mb-4">
      <a href="https://linkedin.com/in/rahulverma" target="_blank" rel="noopener noreferrer">
        <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-black hover:text-yellow-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v16h-4V8zM8.5 8h3.5v2.25h.05c.49-.92 1.69-1.89 3.45-1.89 3.69 0 4.5 2.43 4.5 5.59V24h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.89 1.95-2.89 3.97V24h-4V8z"/>
        </svg>
      </a>
      <a href="https://x.com/rahulverma" target="_blank" rel="noopener noreferrer">
        <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-black hover:text-yellow-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.36 8.48 8.48 0 0 1-2.7 1.03 4.24 4.24 0 0 0-7.29 3.86A12.01 12.01 0 0 1 3.16 4.53a4.24 4.24 0 0 0 1.31 5.65A4.24 4.24 0 0 1 2.8 9.5v.05a4.25 4.25 0 0 0 3.4 4.16 4.26 4.26 0 0 1-1.11.15c-.27 0-.54-.03-.79-.08a4.24 4.24 0 0 0 3.96 2.95A8.5 8.5 0 0 1 2 19.54 12 12 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0 0 22.46 6z"/>
        </svg>
      </a>
    </div>
    <p className="text-gray-600 text-base max-w-md">
      Nitin, a Chartered Accountant and forensic accounting expert, brings over 15 years of expertise in Indian equities.
       A trailblazer in Corporate Governance and Accounting Research, he pioneered a renowned research product for Institutional 
       Investors during his tenure with a leading Indian Broking house. Later, Nitin collaborated with a prominent North American research
        house, specializing in corporate governance and forensics, as an Asia Consultant covering Indian and the US equities. His 
        insights have been featured in prestigious financial newspapers such as The Wall Street Journal, Financial Times, and 
        Business Standard. A regular speaker at the CFA Society India and various investment conferences,
       Nitin is recognized for his insightful contributions to the industry.
    </p>
  </div>

  {/* Member 4 */}
  <div className="bg-white px-8 py-10 shadow-xl hover:drop-shadow-[0_10px_15px_rgba(59,130,246,0.5)]  transition-all duration-300 rounded-2xl flex flex-col items-center text-center min-h-[480px]">
    <Image
      src="/images/Manav.png"
      alt="Manav Khanna"
      width={160}
      height={160}
      className="w-40 h-40 object-cover rounded-xl border-[3px] border-gray-200 mb-4"
      style={{
        width: '160px',
        height: '160px',
      }}
    />
    <h3 className="text-2xl font-semibold mb-4">MANAV KHANNA </h3>
    <div className="flex gap-5 mb-4">
      <a href="https://linkedin.com/in/ayeshakhan" target="_blank" rel="noopener noreferrer">
        <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-black hover:text-yellow-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v16h-4V8zM8.5 8h3.5v2.25h.05c.49-.92 1.69-1.89 3.45-1.89 3.69 0 4.5 2.43 4.5 5.59V24h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.89 1.95-2.89 3.97V24h-4V8z"/>
        </svg>
      </a>
      <a href="https://x.com/ayeshakhan" target="_blank" rel="noopener noreferrer">
        <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-black hover:text-yellow-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.36 8.48 8.48 0 0 1-2.7 1.03 4.24 4.24 0 0 0-7.29 3.86A12.01 12.01 0 0 1 3.16 4.53a4.24 4.24 0 0 0 1.31 5.65A4.24 4.24 0 0 1 2.8 9.5v.05a4.25 4.25 0 0 0 3.4 4.16 4.26 4.26 0 0 1-1.11.15c-.27 0-.54-.03-.79-.08a4.24 4.24 0 0 0 3.96 2.95A8.5 8.5 0 0 1 2 19.54 12 12 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0 0 22.46 6z"/>
        </svg>
      </a>
    </div>
    <p className="text-gray-600 text-base max-w-md">
      Manav is a finance professional with nearly 6 years of experience, specializing in debt restructuring, M&A,
       and private equity. He began his career with internships at Standard Chartered and CX Partners, later 
       advancing to an associate role at EY's Debt & Special Situations Team. There, he managed significant debt
        raising, restructuring engagements, and the resolution of major IBC cases in India. He also gained valuable 
        experience working with Bharti Airtel's M&A team through EY. Most recently, Manav contributed to private 
        equity transactions with a sector-agnostic AIF based in Delhi. He holds a BBA in Financial Investment Analysis 
        from the Shaheed Sukhdev College of Business Studies, DU, and has cleared two levels of the CFA. Outside of work,
         he enjoys playing football and badminton and caring for community dogs.
    </p>
  </div>

</div>

</div>
<Footer/>




   
    </>
  )
}

export default page
