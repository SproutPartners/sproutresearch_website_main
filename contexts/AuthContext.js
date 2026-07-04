// contexts/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { clientAuth } from '@/lib/adminauth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = clientAuth.getSession();
      if (token) {
        // Validate session with server
        const response = await fetch('/admin/api/auth/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionToken: token }),
        });

        if (response.ok) {
          const { valid, session } = await response.json();
          if (valid) {
            setIsAuthenticated(true);
            setUser({ username: session.username });
          } else {
            clientAuth.clearSession();
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          clientAuth.clearSession();
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clientAuth.clearSession();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('/admin/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username, 
          password,
          clientId: navigator.userAgent + Date.now() // Simple client identification
        }),
      });

      const data = await response.json();

      if (data.success) {
        clientAuth.setSession(data.sessionToken, data.expiresAt);
        setIsAuthenticated(true);
        setUser({ username });
        return { success: true };
      } else {
        return { success: false, error: data.error, lockoutRemaining: data.lockoutRemaining };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      const token = clientAuth.getSession();
      if (token) {
        await fetch('/admin/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionToken: token }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clientAuth.clearSession();
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};