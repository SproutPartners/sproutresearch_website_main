'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ChevronDown, Menu, FileText } from 'lucide-react';
import { useUserAuth } from '@/contexts/UserAuthContext';
import Avatar from '../../../Components/Avatar';

export default function Header({ user, onMenuToggle, isSidebarOpen }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useUserAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      window.history.replaceState(null, '', '/login');
      window.history.pushState(null, '', '/login');
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      router.replace('/login');
    }
  };

  return (
    <header className="bg-blue-200 shadow-sm border-b border-gray-200 px-3 sm:px-5 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left - Menu Button (Mobile) + Welcome Message */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button
                type="button"
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-300 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          {/* Welcome Message */}
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
              <span className="hidden sm:inline">Sprout Research Portal</span>
              <span className="sm:hidden flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Sprout Research Portal
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
              Access your documents securely and efficiently
            </p>
          </div>
        </div>

        {/* Right - Avatar & Info */}
        <div className="relative flex-shrink-0">
          <button
                type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-300 transition-colors"
          >
            <Avatar user={user} size="sm" className="sm:w-8 sm:h-8" />
            <div className="text-left hidden sm:block">
              <div className="font-semibold text-gray-900 text-sm truncate max-w-32">
                {user?.fullName || 'Guest'}
              </div>
              <div className="text-xs text-gray-600 truncate max-w-32">
                {user?.email || 'No email'}
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="font-semibold text-gray-900 break-words">
                  {user?.fullName || 'Guest User'}
                </div>
                <div className="text-sm text-gray-600 mb-1 break-all">
                  {user?.email || 'No email'}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {user?.panCardNumber || 'No Pan Number'}
                </div>
                {user?.phone && (
                  <div className="text-sm text-gray-600 mb-1">
                    📞 {user.phone}
                  </div>
                )}
                {user?.subscriptionEnd && (
                  <div className="text-sm text-gray-600 mb-1">
                    ⏳ Expires: {user.subscriptionEnd}
                  </div>
                )}
                {user?.kycVerifiedOn && (
                  <div className="text-sm text-gray-600">
                    ✅ KYC: {user.kycVerifiedOn}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close dropdown on outside click */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
}