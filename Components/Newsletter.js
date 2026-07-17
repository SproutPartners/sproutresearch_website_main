'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Initialize EmailJS with your public key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

      // Send email
      const templateParams = {
        user_email: email,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        message: `New newsletter subscription from: ${email}`,
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (result.text === 'OK') {
        setStatus('success');
        setMessage('Thank you for subscribing! 🎉');
        setEmail('');
        
        // Reset status after 4 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 4000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      
      // Reset error after 4 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 4000);
    }
  };

  return (
   <section className="bg-blue-50 rounded-2xl py-10 px-6 sm:px-12 lg:px-24 shadow-md">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          Sign up for our Insights
        </h2>
        <p className="text-sm sm:text-base italic text-gray-600 mb-6">
          Weekly Insights delivered straight to your inbox.
        </p>

        {status === 'success' && (
          <div className="text-green-600 text-lg font-semibold mb-4">
            ✅ {message}
          </div>
        )}

        {status === 'error' && (
          <div className="text-red-600 text-lg font-semibold mb-4">
            ❌ {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <label htmlFor="newsletter-email" className="sr-only">
            Enter your email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white sm:w-2/3 px-4 py-3 rounded-lg border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
