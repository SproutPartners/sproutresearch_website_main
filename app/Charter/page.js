'use client '
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/Components/Header'
import Footer from '@/Components/FooterA11y'

const Page = () => {
  return (
    <>
    <Header />
    <main id="main-content" tabIndex={-1}>

    <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] xl:h-[60vh]  overflow-hidden">
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
              <div className="text-2xl sm:text-2xl md:text-3xl lg:text-6xl font-sans mb-2 lg:mb-4 lg:whitespace-nowrap">
                <h1 className="leading-none">Investor Charter</h1>
              </div>
              
            </div>
    
    
            {/* Content Container */}
            <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4">
              {/* First Paragraph */}
              <div className="text-sm sm:text-base md:text-lg lg:text-lg max-w-7xl">
                <p className="leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed">
                  Sprout Research delivers comprehensive research services rooted in detailed fundamental and forensic analysis. Its mission is to safeguard your investments by employing strategic
                risk management and vigilant monitoring, enabling timely adjustments in response to evolving market conditions. Sprout Research excels in uncovering high-growth investment 
                opportunities ahead of the curve. Through rigorous analysis and a selective approach, it aims to provide you with a decisive edge in the ever-changing landscape of equity investing
                </p>
              </div>
              
            </div>
          </div>
    </div>

    <div className="mt-16 px-4 sm:px-8 lg:px-12">
  {/* Mobile Layout */}
  <div className="block md:hidden">
    {/* Heading */}
    <div className="text-center mb-8">
      <h2 className="font-semibold text-2xl sm:text-3xl leading-tight text-gray-800">
        Vision and Mission Statement for Investors
      </h2>
    </div>

    {/* Vision Card */}
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Vision</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Invest with knowledge & safety
          </p>
        </div>
      </div>
    </div>

    {/* Mission Card */}
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Mission</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Every investor should be able to invest in right investment products based on their needs, manage and monitor them to meet their goals, access reports and enjoy financial wellness.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Desktop Layout */}
  <div className="hidden md:grid grid-cols-2 gap-12 items-center">
    {/* Left Side - Heading */}
    <div>
      <h2 className="font-semibold text-3xl lg:text-4xl text-gray-800 leading-tight">
        Vision and Mission Statement for Investors
      </h2>
    </div>

    {/* Right Side - Vision and Mission Cards */}
    <div className="space-y-6">
      {/* Vision Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Invest with knowledge & safety
            </p>
          </div>
        </div>
      </div>

      {/* Mission Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Every investor should be able to invest in right investment products based on their needs, manage and monitor them to meet their goals, access reports and enjoy financial wellness.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>


    <div className="space-y-8 px-4 sm:px-8 lg:px-12 mt-20">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 leading-tight">
          Details of business transacted by the Research Analyst with respect to the investors
        </h2>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-semibold text-lg">01</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To publish research report based on the research activities of the RA
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-semibold text-lg">02</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To provide an independent unbiased view on securities
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-semibold text-lg">03</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To offer unbiased recommendation, disclosing the financial interests in recommended securities
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-semibold text-lg">04</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To provide research recommendation, based on analysis of publicly available information and known observations
              </p>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-semibold text-lg">05</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To conduct audit annually
              </p>
            </div>
          </div>
        </div>

        {/* Step 6 */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-semibold text-lg">06</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To ensure that all advertisements are in adherence to the provisions of the Advertisement Code for Research Analysts
              </p>
            </div>
          </div>
        </div>

        {/* Step 7 */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-semibold text-lg">07</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To maintain records of interactions, with all clients including prospective clients (prior to onboarding), where any conversation related to the research services has taken place
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Details of Services Provided to Investors */}
<div className="space-y-8 px-4 sm:px-8 lg:px-12 mt-20">
  {/* Heading */}
  <div className="text-center">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 leading-tight">
      Details of services provided to investors (No indicative Timelines)
    </h2>
  </div>
  
  <div className="space-y-6">
    {/* Onboarding of Clients */}
    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Onboarding of Clients
      </h2>
      <ol className="space-y-3 text-gray-700 text-base sm:text-lg">
        <li className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 font-semibold text-sm mt-1">1</span>
          <span>Sharing of terms and conditions of research services</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 font-semibold text-sm mt-1">2</span>
          <span>Completing KYC of fee paying clients</span>
        </li>
      </ol>
    </div>

    {/* Disclosure to Clients */}
    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Disclosure to Clients
      </h2>
      <ol className="space-y-4 text-gray-700 text-base sm:text-lg">
        <li className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 font-semibold text-sm mt-1">1</span>
          <span>To disclose, information that is material for the client to make an informed decision, including details of its business activity, disciplinary history, the terms and conditions of research services, details of associates, risks and conflicts of interest, if any</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 font-semibold text-sm mt-1">2</span>
          <span>To disclose the extent of use of Artificial Intelligence tools in providing research services</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 font-semibold text-sm mt-1">3</span>
          <span>To disclose, while distributing a third party research report, any material conflict of interest of such third party research provider or provide web address that directs a recipient to the relevant disclosures</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 font-semibold text-sm mt-1">4</span>
          <span>To disclose any conflict of interest of the activities of providing research services with other activities of the research analyst</span>
        </li>
      </ol>
    </div>

    {/* Other Services - Individual Cards */}
    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        To distribute research reports and recommendations to the clients without discrimination
      </h2>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        To maintain confidentiality w.r.t publication of the research report until made available in the public domain
      </h2>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        To respect data privacy rights of clients and take measures to protect unauthorized use of their confidential information
      </h2>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        To disclose the timelines for the services provided by the research analyst to clients and ensure adherence to the said timelines
      </h2>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        To provide clear guidance and adequate caution notice to clients when providing recommendations for dealing in complex and high-risk financial products/services
      </h2>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        To treat all clients with honesty and integrity
      </h2>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        To ensure confidentiality of information shared by clients unless such information is required to be provided in furtherance of discharging legal obligations or a client has provided specific consent to share such information
      </h2>
    </div>
  </div>
</div>

{/* Details of grievance redressal mechanism */}
<div className="space-y-8 px-4 sm:px-8 lg:px-12 mt-20">
  {/* Heading */}
  <div className="text-center">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 leading-tight">
      Details of grievance redressal mechanism and how to access it
    </h2>
  </div>

  <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
    <div className="space-y-6">
      {/* First main item */}
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 font-semibold text-sm mt-1">1</div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg mb-4">
            Investor can lodge complaint/grievance against Research Analyst in the following ways:
          </h3>
          
          <div className="space-y-4 ml-4">
            {/* Sub-bullets */}
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Mode of filing the complaint with research analyst</h4>
                <p className="text-gray-700 text-base leading-relaxed">
                  In case of any grievance / complaint, an investor may approach the concerned Research Analyst who shall strive to redress the grievance immediately, but not later than 21 days of the receipt of the grievance.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Mode of filing the complaint on SCORES or with Research Analyst Administration and Supervisory Body (RAASB)</h4>
                
                <div className="space-y-3 ml-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-500 mt-2.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-700 text-base">
                        SCORES 2.0 (a web based centralized grievance redressal system of SEBI for facilitating effective grievance redressal in time-bound manner)
                      </p>
                      <p className="text-blue-600 underline mt-1">https://scores.sebi.gov.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-500 mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-700 text-base">Two level review for complaint/grievance against Research Analyst:</span>
                  </div>
                  
                  <div className="ml-6 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-500 mt-2.5 flex-shrink-0"></div>
                      <span className="text-gray-700 text-base">First review done by designated body (RAASB)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-500 mt-2.5 flex-shrink-0"></div>
                      <span className="text-gray-700 text-base">Second review done by SEBI</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-500 mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-700 text-base">Email to designated email ID of RAASB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second main item */}
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 font-semibold text-sm mt-1">2</div>
        <p className="text-gray-800 text-base leading-relaxed">
          If the Investor is not satisfied with the resolution provided by the Market Participants, then the Investor has the option to file the complaint/ grievance on SMARTODR platform for its resolution through online conciliation or arbitration.
        </p>
      </div>
      
      {/* Address section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-800 text-base mb-3">With regard to physical complaints, investors may send their complaints to:</p>
        <div className="text-gray-700 text-base leading-relaxed">
          Office of Investor Assistance and Education,<br/>
          Securities and Exchange Board of India,<br/>
          SEBI Bhavan, Plot No. C4-A, 'G' Block,<br/>
          Bandra-Kurla Complex, Bandra (E),<br/>
          Mumbai – 400 051
        </div>
      </div>
    </div>
  </div>
</div>

{/* Expectations from the investors */}
<div className="space-y-8 px-4 sm:px-8 lg:px-12 mt-20 mb-10">
  {/* Heading */}
  <div className="text-left">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 leading-tight">
      Expectations from the investors (Responsibilities of investors)
    </h2>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Left side – Do's */}
    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Do's</h2>
      <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Always deal with SEBI registered Research Analyst.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Ensure that the Research Analyst has a valid registration certificate.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Check for SEBI registration number.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <div>
            <span>Please refer to the list of all SEBI registered Research Analyst which is available on SEBI website in the following link:</span>
            <br />
            <span className="text-blue-600 underline">SEBI Registered RAs</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Always pay attention towards disclosures made in the research reports before investing.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Pay your Research Analyst through banking channels only and maintain duly signed receipts mentioning the details of your payments. You may make payment of fees through Centralized Fee Collection Mechanism (CaFCoM) of RAASB if research analyst has opted for the mechanism. (Applicable for fee paying clients only)</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Before buying/ selling securities or applying in public offer, check for the research/ recommendation provided by your Research Analyst.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Ask all relevant questions and clear your doubts with your Research Analyst before acting on recommendation.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Seek clarifications and guidance on research recommendations from your Research Analyst, especially if it involves complex and high risk financial products and services.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Always be aware that you have the right to stop availing the service of a Research Analyst as per the terms of service agreed between you and your Research Analyst.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Always be sure that you have the right to provide feedback to your Research Analyst in respect of the services received.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Always be aware that you will not be bound by any clause prescribed by the research analyst, which is contravening any regulatory provisions.</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
          <span>Inform SEBI about Research Analyst offering assured or guaranteed returns.</span>
        </li>
      </ul>
    </div>

    {/* Right side – Don'ts and Rights */}
    <div className="space-y-6">
      {/* Don'ts Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Don'ts</h2>
        <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Do not provide funds for investment to the Research Analyst.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Don't fall prey to luring advertisements or market rumours.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Do not get attracted to limited period discount or other incentive, gifts, etc. offered by Research Analyst.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Do not share login credential and password of your trading, demat or bank accounts with the Research Analyst.</span>
          </li>
        </ul>
      </div>

      {/* Rights of investors Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Rights of investors</h2>
        <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to Privacy and Confidentiality</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to Transparent Practices</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to fair and Equitable Treatment</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to Adequate Information</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Rights to Initial and Continuing Disclosure</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to receive information about all the statutory and regulatory disclosures</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to Fair & True Advertisement</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to Awareness about Service Parameters and Turnaround Times</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to be Informed of the timelines for each service</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to be Heard and Satisfactory Grievance Redressal</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to have timely redressal</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to Exit from Financial product or service in accordance with the terms and conditions agreed with the research analyst</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to receive clear guidance and caution notice when dealing in Complex and High-Risk Financial Products and Services</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Additional Rights to vulnerable consumers</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to get access to services in a suitable manner even if differently abled</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right to provide feedback on the financial products and services used</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
            <span>Right against coercive, unfair, and one-sided clauses in financial agreements</span>
          </li>
        </ul>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> For registering any grievance, please visit "Investor Grievances page." SEBI SCORES can be accessed via{' '}
            <span className="text-blue-600 underline">www.scores.gov.in</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
    
    </main>
    <Footer/>

  
  </>
  )
}

export default Page
