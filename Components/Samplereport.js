import React, { useState, useEffect } from 'react';
import { Shield, Eye, X, FileText } from 'lucide-react';

const SampleReportSection = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const samplePdfUrl =
    "https://firebasestorage.googleapis.com/v0/b/sprout-insights.firebasestorage.app/o/pdfs%2F1755091621617_Sprout%20Research_Supriya%20Lifesciences.pdf?alt=media&token=2188df96-b92f-41ba-aca0-6f8e12cb1935";

  useEffect(() => {
    // Basic mobile detection
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const openViewer = () => {
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <div className="bg-white w-full py-16 px-6 sm:px-12 lg:px-24">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 mb-4">
          View Sample Research Report
        </h2>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">
          Get a preview of our detailed research methodology and analysis
          quality. This sample report showcases the depth and clarity of
          insights you'll receive with your subscription.
        </p>
      </div>

      {/* Preview Button */}
      {!isViewerOpen && (
        <div className="flex justify-center mb-8">
          <button
                type="button"
            onClick={openViewer}
            className="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex items-center space-x-4"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg font-bold">View Sample Report</span>
                <span className="text-xs text-blue-100">
                  See our research quality
                </span>
              </div>
              <Eye className="w-5 h-5 opacity-75 ml-2" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      )}

      {/* PDF Viewer */}
      {isViewerOpen && (
        <div className="bg-white border-2 border-gray-200 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-200 px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Sample Research Report
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Sprout Research - Professional Investment Analysis
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Sample Report
                </span>
              </div>
              <button
                type="button"
                onClick={closeViewer}
                className="p-2 border border-red-200 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Close viewer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* PDF Area */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Watermarks */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
                <Shield className="w-3 h-3" />
                <span>SAMPLE</span>
              </div>
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-800 text-xs px-3 py-2 rounded-lg shadow-lg border border-gray-200">
                <div className="font-semibold text-blue-600">Sprout Research</div>
                <div className="text-gray-600">{new Date().toLocaleDateString()}</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-5 rotate-12 text-6xl font-bold text-gray-800">
                SAMPLE REPORT
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Shield className="w-3 h-3" />
                <span>Subscribe for Complete Access to 35-40 Annual Reports</span>
              </div>
            </div>

            {/* PDF Viewer - Mobile uses Google Docs Viewer */}
            <div className="w-full border-2 border-gray-200 rounded-lg overflow-hidden shadow-inner bg-white">
              {isMobile ? (
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(
                    samplePdfUrl
                  )}&embedded=true`}
                  className="w-full h-[500px] sm:h-[650px] md:h-[750px] lg:h-[800px] border-0"
                  title="Sample Research Report Mobile"
                  style={{ background: 'white' }}
                />
              ) : (
                <iframe
                  src={`${samplePdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                  className="w-full h-[500px] sm:h-[650px] md:h-[750px] lg:h-[800px] border-0"
                  title="Sample Research Report Desktop"
                  style={{ background: 'white' }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleReportSection;
