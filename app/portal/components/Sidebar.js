'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Calendar, X, TrendingUp } from 'lucide-react';
import { getMonthName, formatDate } from '../../../lib/portalUtils';

export default function Sidebar({ 
  groupedPdfs = {}, 
  onPdfSelect, 
  selectedPdf, 
  isOpen, 
  onClose,
  onStockSelect,
  selectedView
}) {
  const [expandedYears, setExpandedYears] = useState({});
  const [expandedMonths, setExpandedMonths] = useState({});

  // Auto-expand current year and month on mobile
  useEffect(() => {
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1).toString();
    
    if (groupedPdfs[currentYear]) {
      setExpandedYears(prev => ({ ...prev, [currentYear]: true }));
      if (groupedPdfs[currentYear][currentMonth]) {
        setExpandedMonths(prev => ({ ...prev, [`${currentYear}-${currentMonth}`]: true }));
      }
    }
  }, [groupedPdfs]);

  const toggleYear = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  const toggleMonth = (year, month) => {
    const key = `${year}-${month}`;
    setExpandedMonths(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePdfClick = (pdf) => {
    onPdfSelect(pdf);
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleStockClick = () => {
    onStockSelect();
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-0 left-0 h-screen
        w-80 sm:w-96 lg:w-80 
        bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        z-50 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
        pt-16 lg:pt-0
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
                type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Portal Menu
          </h2>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-4">
          {/* Stock Recommendations Section */}
          {/* <div className="mb-6">
            <button
                type="button"
              onClick={handleStockClick}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                selectedView === 'stocks'
                  ? 'bg-green-50 border border-green-200 shadow-sm'
                  : 'hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              <div className={`p-2 rounded ${
                selectedView === 'stocks' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <TrendingUp className={`w-4 h-4 ${
                  selectedView === 'stocks' ? 'text-green-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className={`text-sm font-medium ${
                  selectedView === 'stocks' ? 'text-green-900' : 'text-gray-900'
                }`}>
                  Stock Tracker
                </div>
                <div className="text-xs text-gray-500">
                  View expert stock picks
                </div>
              </div>
              {selectedView === 'stocks' && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </button>
          </div> */}

          {/* Documents Section */}
          <div>
            <div className="flex items-center space-x-2 px-3 py-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-900">Documents</h3>
            </div>

            {Object.keys(groupedPdfs).length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No documents available</p>
              </div>
            ) : (
              <div className="space-y-2">
                {Object.entries(groupedPdfs)
                  .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort years desc
                  .map(([year, months]) => (
                    <div key={year} className="mb-2">
                      {/* Year Header */}
                      <button
                type="button"
                        onClick={() => toggleYear(year)}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        {expandedYears[year] ? (
                          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                        )}
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900 flex-1">{year}</span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {Object.values(months).reduce((total, pdfs) => total + pdfs.length, 0)}
                        </span>
                      </button>

                      {/* Year Content */}
                      {expandedYears[year] && (
                        <div className="ml-4 mt-2 space-y-1">
                          {Object.entries(months)
                            .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort months desc
                            .map(([month, pdfs]) => (
                              <div key={month}>
                                {/* Month Header */}
                                <button
                type="button"
                                  onClick={() => toggleMonth(year, month)}
                                  className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                                >
                                  {expandedMonths[`${year}-${month}`] ? (
                                    <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                                  )}
                                  <span className="text-sm font-medium text-gray-700 flex-1">
                                    {getMonthName(parseInt(month))}
                                  </span>
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    {pdfs.length}
                                  </span>
                                </button>

                                {/* Month Content - PDFs */}
                                {expandedMonths[`${year}-${month}`] && (
                                  <div className="ml-4 mt-1 space-y-1">
                                    {pdfs
                                      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date desc
                                      .map((pdf) => (
                                        <button
                type="button"
                                          key={pdf.id}
                                          onClick={() => handlePdfClick(pdf)}
                                          className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                                            selectedPdf?.id === pdf.id && selectedView === 'pdf'
                                              ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
                                              : 'hover:bg-gray-50 hover:shadow-sm'
                                          }`}
                                        >
                                          <div className="flex items-start space-x-2">
                                            <FileText className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                              selectedPdf?.id === pdf.id && selectedView === 'pdf' ? 'text-blue-600' : 'text-gray-400'
                                            }`} />
                                            <div className="flex-1 min-w-0">
                                              <div className={`text-sm font-medium break-words ${
                                                selectedPdf?.id === pdf.id && selectedView === 'pdf' ? 'text-blue-900' : 'text-gray-900'
                                              }`}>
                                                {pdf.heading}
                                              </div>
                                              {pdf.subheading && (
                                                <div className="text-xs text-gray-500 break-words mt-1">
                                                  {pdf.subheading}
                                                </div>
                                              )}
                                              <div className="text-xs text-gray-400 mt-1">
                                                {formatDate(pdf.date)}
                                              </div>
                                            </div>
                                          </div>
                                        </button>
                                      ))}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}