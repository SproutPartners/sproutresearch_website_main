'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '@/contexts/UserAuthContext';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUserAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await login(email, password);
      if (result.success) {
        setMessage('Login successful! Redirecting...');
        setMessageType('success');
        setTimeout(() => {
          router.push('/portal');
        }, 1000);
      } else {
        setMessage(result.message || 'Login failed');
        setMessageType('error');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col md:flex-row">
        {/* Left side with logo and name */}
        <div className="md:w-1/2 w-full bg-[#0D1B2A] flex flex-col items-center justify-center p-10 text-white">
          <Image src="/images/HD.png" alt="Company Logo" width={400} height={400} />
          <h1 className="mt-4 text-3xl md:text-4xl font-bold">Retail Portal</h1>
        </div>

        {/* Right side with login form */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-[#F8F9FB] p-8">
          <div className="w-full max-w-sm bg-white p-8 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Log into your Account</h2>

            {message && (
              <div className={`mb-4 p-3 rounded text-sm border transition-all ${
                messageType === 'success'
                  ? 'text-green-700 bg-green-100 border-green-300'
                  : 'text-red-700 bg-red-100 border-red-300'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-900 mb-1">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full px-4 py-2 border-2 border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-900 mb-1">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full px-4 py-2 border-2 border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
