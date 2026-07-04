// Authentication utilities for portal

export function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
}

export function setCurrentUser(user) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}

export function clearCurrentUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}

export function getUserInitials(name) {
  if (!name) return 'U';
  const nameArray = name.split(' ');
  if (nameArray.length === 1) {
    return nameArray[0].charAt(0).toUpperCase();
  }
  return nameArray[0].charAt(0).toUpperCase() + nameArray[1].charAt(0).toUpperCase();
}

export function generateUserToken() {
  const user = getCurrentUser();
  if (!user) return null;
  
  // Simple token generation - in production, use proper JWT
  return btoa(JSON.stringify({
    userId: user.id,
    email: user.email,
    timestamp: Date.now()
  }));
}

export function validateUserSession() {
  const user = getCurrentUser();
  if (!user) return false;
  
  // Check if session is still valid (e.g., not expired)
  const sessionStart = user.sessionStart;
  const now = Date.now();
  const sessionDuration = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
  
  return sessionStart && (now - sessionStart) < sessionDuration;
}