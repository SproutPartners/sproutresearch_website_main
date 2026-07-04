// Utility functions for portal operations

export function groupPdfsByYearAndMonth(pdfs) {
  const grouped = {};
  
  pdfs.forEach(pdf => {
    const date = new Date(pdf.date);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString(); // Convert to 1-12 instead of 0-11
    
    if (!grouped[year]) {
      grouped[year] = {};
    }
    
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    
    grouped[year][month].push(pdf);
  });
  
  return grouped;
}

export function getMonthName(monthNumber) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  // monthNumber is now 1-12, so subtract 1 for array index
  return months[monthNumber - 1];
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Security utilities
export function preventContextMenu(element) {
  if (element) {
    element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }
}

export function preventKeyboardShortcuts(element) {
  if (element) {
    element.addEventListener('keydown', (e) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+C, Ctrl+A
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'p') ||
        (e.ctrlKey && e.key === 'c') ||
        (e.ctrlKey && e.key === 'a')
      ) {
        e.preventDefault();
        return false;
      }
    });
  }
}

export function setupAutoLogout(logoutFunction, timeoutMinutes = 30) {
  let logoutTimer;
  
  const resetTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(logoutFunction, timeoutMinutes * 60 * 1000);
  };
  
  // Reset timer on user activity
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, resetTimer, true);
  });
  
  // Initial timer
  resetTimer();
  
  // Cleanup function
  return () => {
    clearTimeout(logoutTimer);
    events.forEach(event => {
      document.removeEventListener(event, resetTimer, true);
    });
  };
}

// Auto-logout on tab close
export function setupTabCloseLogout(logoutFunction) {
  const handleBeforeUnload = (e) => {
    logoutFunction();
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}