'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '@/contexts/UserAuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CustomerStockTable from './components/CustomerStockTable';
import dynamic from 'next/dynamic';
import { getAllPdfs } from '../../lib/pdfService';
import { groupPdfsByYearAndMonth, setupAutoLogout, setupTabCloseLogout } from '../../lib/portalUtils';

const PdfViewer = dynamic(() => import('./components/PdfViewer'), {
  ssr: false
});

export default function PortalPage() {
  const { user, isAuthenticated, logout } = useUserAuth();
  const [pdfs, setPdfs] = useState([]);
  const [groupedPdfs, setGroupedPdfs] = useState({});
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedView, setSelectedView] = useState('pdf'); // 'pdf' or 'stocks'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
      return;
    }
  }, [isAuthenticated, loading, router]);

  // Handle back button and navigation
  useEffect(() => {
    window.history.replaceState(null, '', '/portal');
    
    const handlePopState = (event) => {
      if (!isAuthenticated) {
        window.history.replaceState(null, '', '/login');
        router.replace('/login');
        return;
      }
      window.history.pushState(null, '', '/portal');
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isAuthenticated, router]);

  // Load PDFs
  useEffect(() => {
    const loadPdfs = async () => {
      try {
        setLoading(true);
        const allPdfs = await getAllPdfs();
        setPdfs(allPdfs);
        setGroupedPdfs(groupPdfsByYearAndMonth(allPdfs));
      } catch (err) {
        setError('Failed to load documents');
        console.error('Error loading PDFs:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadPdfs();
    }
  }, [user]);

  // Security: Disable developer tools and various interactions
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 'p') 
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    const handleBeforePrint = (e) => {
      e.preventDefault();
      alert('Printing is not allowed');
      return false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('beforeprint', handleBeforePrint);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('beforeprint', handleBeforePrint);
    };
  }, []);

  // Handle responsive sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle PDF selection
  const handlePdfSelect = (pdf) => {
    setSelectedPdf(pdf);
    setSelectedView('pdf');
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Handle Stock view selection
  const handleStockSelect = () => {
    setSelectedPdf(null);
    setSelectedView('stocks');
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Show loading state
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portal...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-lg flex items-center justify-center">
            <svg aria-hidden="true" focusable="false" className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4 text-lg font-medium">{error}</p>
          <button
                type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Always visible at top */}
      <Header 
        user={user} 
        onMenuToggle={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-1 relative">
        {/* Sidebar - Responsive */}
        <Sidebar
          groupedPdfs={groupedPdfs}
          onPdfSelect={handlePdfSelect}
          selectedPdf={selectedPdf}
          selectedView={selectedView}
          onStockSelect={handleStockSelect}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
        
        {/* Main Viewer - Takes remaining space */}
        <div className="flex-1 lg:ml-0">
          {selectedView === 'stocks' ? (
            <CustomerStockTable user={user} />
          ) : (
            <PdfViewer
              pdf={selectedPdf}
              user={user}
            />
          )}
        </div>
      </div>
      
      {/* Loading overlay for PDF operations */}
      {loading && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-center">Loading documents...</p>
          </div>
        </div>
      )}
    </div>
  );
}