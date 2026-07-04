'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check auth status from API
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/validate');
if (response.ok) {
  const userData = await response.json();
  setUser({
    phone: userData.phone,
    fullName: userData.fullName, // This works now!
    email: userData.email,
    subscriptionEnd: userData.subscriptionEnd,
    panCardNumber: userData.panCardNumber,
    kycVerifiedOn: userData.kycVerifiedOn,
    authenticated: true
  });

      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login API call (no manual JWT handling)
  const login = async (email, password) => {
    try {
      const response = await fetch('/api/user/logincheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        await checkAuthStatus();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Network error occurred' };
    }
  };

  // Update logout function in UserAuthContext
const logout = async () => {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    
    // Clear browser history and prevent back navigation
    window.history.replaceState(null, '', '/login');
    router.replace('/login');
    
    // Optional: Clear any cached data
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

  // Add isAuthenticated helper
  const isAuthenticated = user && user.authenticated;

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuthStatus,
    isAuthenticated // Add this
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
}