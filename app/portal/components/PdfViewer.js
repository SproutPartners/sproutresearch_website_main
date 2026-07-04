'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Plus, Minus, Shield, ZoomIn, ZoomOut } from 'lucide-react';
import {
  preventContextMenu,
  preventKeyboardShortcuts,
} from '../../../lib/portalUtils';

// Configure PDF.js worker for production
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

export default function PdfViewer({ pdf, user }) {
  const containerRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState(0);

  const options = useMemo(() => ({
    cMapUrl: 'https://unpkg.com/pdfjs-dist@2.14.305/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@2.14.305/standard_fonts/',
  }), []);

  // Handle responsive scaling
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width);
        
        // Only set initial scale if scale hasn't been set yet (first load)
        if (scale === 1.0) { // Only on initial load
          if (width < 640) { // mobile
            setScale(0.6);
          } else if (width < 1024) { // tablet
            setScale(0.8);
          } else { // desktop
            setScale(1.0);
          }
      }
    }
  };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [pdf]);

  useEffect(() => {
    if (containerRef.current) {
      preventContextMenu(containerRef.current);
      preventKeyboardShortcuts(containerRef.current);
      containerRef.current.style.userSelect = 'none';
    }
  }, []);

  useEffect(() => {
    // Reset page when document changes
    setPageNumber(1);
  }, [pdf]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.4));
  };

  if (!pdf) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white min-h-screen">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <Shield className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg text-gray-600 mb-2">Select a document to view</p>
          <p className="text-sm text-gray-500">Choose from the documents in the sidebar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen" ref={containerRef}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 sticky top-0 z-20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          {/* Document Info */}
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
              {pdf.heading}
            </h2>
            {pdf.subheading && (
              <p className="text-xs sm:text-sm text-gray-600 break-words">
                {pdf.subheading}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
            {/* Navigation */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="px-2 sm:px-3 py-1 bg-gray-50 rounded text-xs sm:text-sm text-gray-700 min-w-0">
                <span className="hidden sm:inline">Page </span>
                {pageNumber} of {numPages}
              </div>
              
              <button
                type="button"
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-gray-300" />

            {/* Zoom Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={zoomOut}
                className="p-2 border rounded hover:bg-gray-100 transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut size={16} />
              </button>
              
              <div className="px-2 py-1 bg-gray-50 rounded text-xs text-gray-700 min-w-12 text-center">
                {Math.round(scale * 100)}%
              </div>
              
              <button
                type="button"
                onClick={zoomIn}
                className="p-2 border rounded hover:bg-gray-100 transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Protected Badge */}
            <div className="flex items-center space-x-2 px-2 sm:px-3 py-1 bg-blue-50 border border-blue-200 rounded">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="text-xs sm:text-sm text-blue-700">Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Area */}
      <div className="relative flex-1 overflow-hidden bg-gray-50">
        {/* Watermarks */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Center watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-800 rotate-[-30deg] text-center whitespace-nowrap px-4">
              <div className="break-all">{user?.email || 'CONFIDENTIAL'}</div>
              <div className="mt-2">{user?.panCardNumber || 'Pan Number'}</div>
            </div>
          </div>

          {/* Top-right badge */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 bg-transparent text-gray-800 text-xs px-2 py-1 rounded shadow max-w-70 sm:max-w-none">
            <div className="break-all">{user?.fullName}</div>
            <div className="break-all">{user?.email}</div>
            <div className="break-all">{user?.phone}</div>
          </div>

          {/* Bottom-right timestamp */}
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-xs text-gray-700 opacity-80 bg-white px-2 py-1 rounded shadow max-w-48 break-words">
            {new Date().toLocaleString()}
          </div>
        </div>

        {/* PDF Document */}
        <div className="flex justify-center items-start h-full overflow-auto p-2 sm:p-4">
          <Document
            file={pdf.pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            loading={
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <div className="text-sm text-gray-600">Loading PDF...</div>
                </div>
              </div>
            }
            error={
              <div className="flex items-center justify-center h-64">
                <div className="text-center p-4">
                  <div className="text-red-600 mb-2">Error loading PDF</div>
                  <div className="text-sm text-gray-600">Please try refreshing the page</div>
                </div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              width={containerWidth < 640 ? Math.min(containerWidth - 32, 400) : undefined}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}