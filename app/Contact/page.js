'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import Header from '@/Components/Header';
import Footer from '@/Components/FooterA11y';

export default function Page() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    contact: '',
    queries: [],
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      queries: checked 
        ? [...prev.queries, name]
        : prev.queries.filter(query => query !== name)
    }));
  };

  const getQueryText = (queryKey) => {
    const queryMap = {
      query1: 'Get in touch to subscribe to our PCG research',
      query2: 'Register interest as a Corporate Entity / NRI for Sprout Research-Retail Subscription',
      query3: 'Subscribe to our weekly insights',
      query4: 'Other Queries'
    };
    return queryMap[queryKey] || queryKey;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.email || !formData.contact) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setStatusMessage('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(formData.contact.replace(/[-\s]/g, ''))) {
      setStatus('error');
      setStatusMessage('Please enter a valid contact number');
      return;
    }

    if (formData.queries.length === 0) {
      setStatus('error');
      setStatusMessage('Please select at least one query type');
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      // Initialize EmailJS
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

      // Format queries with bullet points for better readability
      const formattedQueries = formData.queries
        .map(query => `• ${getQueryText(query)}`)
        .join('\n');

      // Prepare template parameters matching the EmailJS template
      const templateParams = {
        from_name: formData.firstName,
        from_email: formData.email,
        contact_number: formData.contact,
        selected_queries: formattedQueries,
        message: formData.message || 'No additional message provided',
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT, // Make sure this is your CONTACT form template ID
        templateParams
      );

      if (result.text === 'OK') {
        setStatus('success');
        setStatusMessage('Thank you for your message! We\'ll get back to you soon. 🎉');
        
        // Reset form
        setFormData({
          firstName: '',
          email: '',
          contact: '',
          queries: [],
          message: ''
        });
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setStatusMessage('');
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setStatusMessage('Something went wrong. Please try again later.');
      
      // Reset error after 4 seconds
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 4000);
    }
  };

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
      <div className="relative min-h-screen bg-amber-950">
        {/* Background Image */}
        <Image
          src="/images/pic5.jpg"
          alt=""
          aria-hidden="true"
          fill
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />

        {/* Overlay Section */}
        <div className="relative z-10 flex min-h-[120vh] items-center justify-center px-4 py-12 sm:py-16">
          <h1 className="sr-only">Contact Sprout Research</h1>
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 sm:p-8 md:flex md:flex-row flex-col w-full max-w-6xl shadow-2xl min-h-[100vh]">

            {/* Left Contact Info */}
            <div className="md:w-1/2 w-full pr-0 md:pr-8 mb-6 md:mb-0 overflow-y-auto max-h-[90vh] md:max-h-none">
              <div className="rounded-2xl bg-white px-6 py-8 shadow-sm text-black [&_a]:text-blue-900 [&_a]:underline [&_h2]:text-black [&_h3]:text-black [&_li]:text-black [&_p]:text-black [&_span]:text-black">
              <h2 className="text-2xl sm:text-4xl md:text-4xl font-bold mb-8 mt-10 text-black">Contact Information</h2>
              
              {/* Basic Contact Details */}
              <ul className="space-y-4 sm:space-y-6 text-base sm:text-lg mb-8 text-black">
                <li>📞 +91-9811744587 / +91-7838135315</li>
                <li>📧 sproutresearch.equity@gmail.com</li>
                <li>📌 A 35 FIRST FLOOR, Chittaranjan Park, NEW DELHI, NATIONAL CAPITAL TERRITORY OF DELHI, 110019</li>
              </ul>

              {/* Research Analyst Information */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4 text-black">Research Analyst Information</h3>
                <div className="space-y-2 text-base sm:text-lg leading-relaxed text-black">
                  <p><span className="font-semibold text-black">Name:</span> Shikha Kapur</p>
                  <p><span className="font-semibold text-black">Proprietor:</span> Sprout Research</p>
                  <p><span className="font-semibold text-black">Trade Name:</span> Sprout Research</p>
                  <p><span className="font-semibold text-black">Type of RA:</span> Proprietorship</p>
                  <p><span className="font-semibold text-black">Registered Office:</span> A 35 First Floor, Chittaranjan Park, New Delhi, National Capital Territory Of Delhi, 110019</p>
                  <p><span className="font-semibold text-black">Registration Number:</span> INH000019169</p>
                  <p><span className="font-semibold text-black">BSE Enlistment Number:</span> 6441</p>
                  <p><span className="font-semibold text-black">Date of Registration:</span> 23 December 2024</p>
                  <p><span className="font-semibold text-black">Validity of Registration:</span> Perpetual</p>
                </div>
              </div>

              {/* Principal Officer/Grievance Officer/Compliance Officer */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4 text-black">Principal Officer/Grievance Officer/Compliance Officer</h3>
                <div className="space-y-2 text-base sm:text-lg leading-relaxed text-black">
                  <p><span className="font-semibold text-black">Name:</span> Shikha Kapur</p>
                  <p><span className="font-semibold text-black">Email:</span> shikha.kapur@gmail.com</p>
                  <p><span className="font-semibold text-black">Mobile:</span> 9811744587</p>
                </div>
              </div>

              {/* SEBI Office Details */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4 text-black">SEBI Office Details</h3>
                <div className="space-y-2 text-base sm:text-lg leading-relaxed text-black">
                  <p><span className="font-semibold text-black">Address:</span> SEBI Bhavan RKC, Bandra-Kurla Complex, Mumbai - 400051, Maharashtra, India</p>
                  <p>
                    <span className="font-semibold text-black">SEBI Score:</span> 
                    <a href="https://scores.sebi.gov.in/scores-home" 
                       className="text-blue-900 hover:text-blue-950 underline ml-1" 
                       target="_blank" 
                       rel="noopener noreferrer">
                      https://scores.sebi.gov.in/scores-home
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-black">Smart ODR:</span> 
                    <a href="https://smartodr.in/login" 
                       className="text-blue-900 hover:text-blue-950 underline ml-1" 
                       target="_blank" 
                       rel="noopener noreferrer">
                      https://smartodr.in/login
                    </a>
                  </p>
                </div>
              </div>
              </div>
            </div>

            {/* Right Form */}
            <form onSubmit={handleSubmit} className="md:w-1/2 w-full bg-white rounded-xl p-6 sm:p-8 mx-0 sm:mx-4 md:mx-0 shadow-lg space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-800 mb-6">Say Hello!</h2>

              {/* Status Messages */}
              {status === 'success' && (
                <div role="status" aria-live="polite" className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
                  ✅ {statusMessage}
                </div>
              )}

              {status === 'error' && (
                <div role="alert" aria-live="assertive" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
                  ❌ {statusMessage}
                </div>
              )}

              {/* First Name */}
              <label htmlFor="contact-first-name" className="sr-only">First name</label>
              <input
                id="contact-first-name"
                type="text"
                placeholder="First Name *"
                autoComplete="given-name"
                className="w-full p-3 border-2 border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={status === 'loading'}
              />

              {/* Email */}
              <label htmlFor="contact-email" className="sr-only">Email address</label>
              <input
                id="contact-email"
                type="email"
                placeholder="Email Address *"
                autoComplete="email"
                className="w-full p-3 border-2 border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={status === 'loading'}
              />

              {/* Phone */}
              <label htmlFor="contact-number" className="sr-only">Contact number</label>
              <input
                id="contact-number"
                type="tel"
                placeholder="Contact Number *"
                autoComplete="tel"
                className="w-full p-3 border-2 border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                required
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                disabled={status === 'loading'}
              />

              {/* Checkboxes */}
              <fieldset className="space-y-2">
                <legend className="font-semibold text-gray-700">Select Your Queries: *</legend>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    name="query1" 
                    className="h-4 w-4" 
                    checked={formData.queries.includes('query1')}
                    onChange={handleCheckboxChange}
                    disabled={status === 'loading'}
                  />
                  <span>Get in touch to subscribe to our PCG research</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    name="query2" 
                    className="h-4 w-4" 
                    checked={formData.queries.includes('query2')}
                    onChange={handleCheckboxChange}
                    disabled={status === 'loading'}
                  />
                  <span>Register interest as a Corporate Entity / NRI for Sprout Research-Retail Subscription</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    name="query3" 
                    className="h-4 w-4" 
                    checked={formData.queries.includes('query3')}
                    onChange={handleCheckboxChange}
                    disabled={status === 'loading'}
                  />
                  <span>Subscribe to our weekly insights</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    name="query4" 
                    className="h-4 w-4" 
                    checked={formData.queries.includes('query4')}
                    onChange={handleCheckboxChange}
                    disabled={status === 'loading'}
                  />
                  <span>Other Queries</span>
                </label>
              </fieldset>

              {/* Optional Message */}
              <label htmlFor="contact-message" className="sr-only">Your message</label>
              <textarea
                id="contact-message"
                placeholder="Your Message (Optional)"
                rows={4}
                className="w-full p-3 border-2 border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                disabled={status === 'loading'}
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-700 text-white py-3 rounded font-semibold hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
