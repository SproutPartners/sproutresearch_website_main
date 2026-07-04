'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const SubscriptionCards = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const individualOptions = {
    title: "Individual Subscription Options",
    sections: [ 
      {
        title: "Manual Subscription",
         points: [
          {
            text: "1-minute process"
          },
          {
            text: "Requires Aadhaar based e-sign on the Client Agreement"
          },
          {
            text: "We may reach out to you for fresh KYC, in case no previous KRA registration located Portal access granted within 72 hours"
          },
        ],
        buttonText: "Subscribe Now",
        buttonLink: "https://superprofile.bio/vp/689dc76243f46c0013d36f4c",
        highlight: true
      },
      {
        title: "Online Automated Subscription",
        points: [
          {
            text: "Completely automated 2-5-minute process"
          },
          {
            text: "Requires Aadhaar based OTP thrice – Digilocker and e-sign on KYC and Client Agreement"
          },
          {
            text: "Portal access granted within 48 hours"
          },

        ],
        buttonText: "Subscribe Now",
        buttonLink: "https://live.meon.co.in/sproutresearch/analyst",
        highlight: false
      }
    ]
  };

  const nriCorporateOptions = {
    title: "NRI and Corporates",
    sections: [
      {
        title: "Subscription Requirements",
        points: [
          {
            text: "Requires Aadhaar based e-sign on the Client Agreement"
          },
          {
            text: "We may reach out to you for fresh KYC, in case no previous KRA registration located Portal access granted within 72 hours"
          },
        ],
        buttonText: "Subscribe Now",
        buttonLink: "https://superprofile.bio/vp/689dc76243f46c0013d36f4c",
        highlight: true
      }
    ]
  };

  const Modal = ({ options, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
                type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{options.title}</h2>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {options.sections.map((section, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${
                  section.highlight 
                    ? 'from-blue-50 to-blue-100/50 border-blue-200' 
                    : 'from-gray-50 to-gray-100/50 border-gray-200'
                } rounded-2xl p-6 border-2 ${section.highlight ? 'ring-2 ring-blue-300/50' : ''}`}
              >
                
                <div className="mb-4">
                  <h3 className={`text-xl font-bold mb-1 ${
                    section.highlight ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-gray-600 text-sm">{section.subtitle}</p>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {section.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex">
                      <span className="font-semibold text-gray-700 min-w-fit mr-2">
                        {point.label}
                      </span>
                      <span className="text-gray-600">
                        {point.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Link
                    href={section.buttonLink}
                    className={`inline-flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      section.highlight
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
                    }`}
                  >
                    {section.buttonText}
                    <svg aria-hidden="true" focusable="false" className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Two Subscription Cards */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 sm:gap-6 max-w-3xl mx-auto">
        
        {/* Individual Investor Card */}
        <div className="flex-1 max-w-xs mx-auto sm:mx-0">
          <button
                type="button"
            onClick={() => openModal('individual')}
            className="group relative block w-full h-full"
          >
            <div className="relative bg-white rounded-2xl p-4 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-60"></div>
              
              {/* Icon Container */}
              <div className="relative mb-3">
                <div className="inline-flex p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                  <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="relative flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Individual Investor
                </h4>
              </div>

              {/* CTA */}
              <div className="relative">
                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg border border-blue-100 group-hover:from-blue-100 group-hover:to-blue-200/50 transition-all duration-300">
                  <span className="font-semibold text-blue-700 text-sm">Subscribe</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full group-hover:bg-blue-400 transition-colors delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-blue-200 rounded-full group-hover:bg-blue-300 transition-colors delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* NRI & Corporate Card */}
        <div className="flex-1 max-w-xs mx-auto sm:mx-0">
          <button
                type="button"
            onClick={() => openModal('nri')}
            className="group relative block w-full h-full"
          >
            <div className="relative bg-white rounded-2xl p-4 border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-slate-50 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-60"></div>
              
              

              {/* Icon Container */}
              <div className="relative mb-3">
                <div className="inline-flex p-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                  <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="relative flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-slate-600 transition-colors">
                  NRI & Corporate Investor
                </h4>
              </div>

              {/* CTA */}
              <div className="relative">
                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg border border-slate-200 group-hover:from-slate-100 group-hover:to-slate-200/50 transition-all duration-300">
                  <span className="font-semibold text-slate-600 text-sm">Subscribe</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-0.5 bg-slate-300 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-slate-400 to-slate-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'individual' && (
        <Modal 
          options={individualOptions}
          onClose={closeModal}
        />
      )}
      
      {activeModal === 'nri' && (
        <Modal 
          options={nriCorporateOptions}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default SubscriptionCards;