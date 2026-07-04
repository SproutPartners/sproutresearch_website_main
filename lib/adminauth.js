// lib/adminauth.js
import { createHash, randomBytes } from 'crypto';

// Configuration - Change these in production
const ADMIN_CONFIG = {
  username: 'admin', // Change this
  passwordHash: '4b1e25555d7ec7990e7932529394936df21a7ebb519a03bfbc2a5fd708acd542', // see gitignore
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  maxLoginAttempts: 500000,
  lockoutDuration: 70 * 60 * 1000, // 15 minutes
};

// In-memory storage for sessions and login attempts
let activeSessions = new Map();
let loginAttempts = new Map();

// Utility functions
const hashPassword = (password) => {
  return createHash('sha256').update(password).digest('hex');
};

const generateSessionToken = () => {
  return randomBytes(32).toString('hex');
};

const isAccountLocked = (identifier) => {
  const attempts = loginAttempts.get(identifier);
  if (!attempts) return false;
  
  return attempts.count >= ADMIN_CONFIG.maxLoginAttempts && 
         (Date.now() - attempts.lastAttempt) < ADMIN_CONFIG.lockoutDuration;
};

const recordLoginAttempt = (identifier, success) => {
  const current = loginAttempts.get(identifier) || { count: 0, lastAttempt: 0 };
  
  if (success) {
    loginAttempts.delete(identifier);
  } else {
    current.count++;
    current.lastAttempt = Date.now();
    loginAttempts.set(identifier, current);
  }
};

// Main authentication functions
export const authenticateUser = (username, password, clientId) => {
  // Check if account is locked
  if (isAccountLocked(clientId)) {
    return {
      success: false,
      error: 'Account temporarily locked due to too many failed attempts',
      lockoutRemaining: Math.ceil((ADMIN_CONFIG.lockoutDuration - (Date.now() - loginAttempts.get(clientId).lastAttempt)) / 1000)
    };
  }

  // Validate credentials
  const isValid = username === ADMIN_CONFIG.username && 
                  hashPassword(password) === ADMIN_CONFIG.passwordHash;

  if (isValid) {
    // Generate session
    const sessionToken = generateSessionToken();
    const expiresAt = Date.now() + ADMIN_CONFIG.sessionTimeout;
    
    activeSessions.set(sessionToken, {
      username,
      createdAt: Date.now(),
      expiresAt,
      clientId
    });

    recordLoginAttempt(clientId, true);

    return {
      success: true,
      sessionToken,
      expiresAt
    };
  } else {
    recordLoginAttempt(clientId, false);
    return {
      success: false,
      error: 'Invalid username or password'
    };
  }
};

export const validateSession = (sessionToken) => {
  const session = activeSessions.get(sessionToken);
  
  if (!session) {
    return { valid: false, error: 'Invalid session' };
  }

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(sessionToken);
    return { valid: false, error: 'Session expired' };
  }

  return { valid: true, session };
};

export const extendSession = (sessionToken) => {
  const session = activeSessions.get(sessionToken);
  if (session && Date.now() <= session.expiresAt) {
    session.expiresAt = Date.now() + ADMIN_CONFIG.sessionTimeout;
    activeSessions.set(sessionToken, session);
    return true;
  }
  return false;
};

export const logout = (sessionToken) => {
  return activeSessions.delete(sessionToken);
};

export const cleanupExpiredSessions = () => {
  const now = Date.now();
  for (const [token, session] of activeSessions.entries()) {
    if (now > session.expiresAt) {
      activeSessions.delete(token);
    }
  }
};

// Cleanup expired sessions every 5 minutes
if (typeof window === 'undefined') { // Server-side only
  setInterval(cleanupExpiredSessions, 5 * 60 * 1000);
}

// Client-side session management
export const clientAuth = {
  setSession: (token, expiresAt) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_session', token);
      localStorage.setItem('admin_session_expires', expiresAt.toString());
    }
  },
  
  getSession: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_session');
      const expires = localStorage.getItem('admin_session_expires');
      
      if (token && expires && Date.now() < parseInt(expires)) {
        return token;
      }
      
      // Clean up expired session
      clientAuth.clearSession();
    }
    return null;
  },
  
  clearSession: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_session');
      localStorage.removeItem('admin_session_expires');
    }
  },
  
  isLoggedIn: () => {
    return clientAuth.getSession() !== null;
  }
};