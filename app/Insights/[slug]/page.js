'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut , RotateCw, Maximize2, Minimize2, FileText } from 'lucide-react';
import Header from '@/Components/Header';
import Footer from '@/Components/FooterA11y';
import { getInsightBySlug, getInsights, incrementViewCount } from '@/lib/insightsService';
import { convertDriveLinkToEmbed } from '@/lib/slugUtils';
import { getHeroImageUrl } from '@/lib/cloudinary';

export default function IndividualInsightPage() {
  const { slug } = useParams();
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedInsights, setRelatedInsights] = useState([]);
  
  // PDF viewer states
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedInsight = await getInsightBySlug(slug);

        if (!fetchedInsight) {
          setError('Insight not found');
          return;
        }

        // Increment view count first and get updated insight
        const updatedInsight = await incrementViewCount(fetchedInsight.id);
        
        // Process the insight data with updated views
        const processed = {
          ...(updatedInsight || fetchedInsight),
          heroImageUrl: (updatedInsight || fetchedInsight).cloudinaryId 
            ? getHeroImageUrl((updatedInsight || fetchedInsight).cloudinaryId)
            : (updatedInsight || fetchedInsight).thumbnail,
          embedUrl: convertDriveLinkToEmbed((updatedInsight || fetchedInsight).pdfLink),
        };

        setInsight(processed);

        // Fetch related insights
        const all = await getInsights();
        const related = all
          .filter(i => i.id !== (updatedInsight || fetchedInsight).id)
          .slice(0, 3)
          .map(item => ({
            ...item,
            heroImageUrl: item.cloudinaryId 
              ? getHeroImageUrl(item.cloudinaryId)
              : item.thumbnail,
          }));
        setRelatedInsights(related);
        
        // Reset PDF states when switching insights
        setScale(1.0);
        setPdfLoading(true);
        setIsFullscreen(false);
        
      } catch (err) {
        console.error('Error fetching insight:', err);
        setError('Insight not available in the local preview.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // This will trigger when slug changes

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg font-medium text-gray-700">Loading insight...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        <div className="relative container mx-auto px-4 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Image Section */}
            {insight.heroImageUrl && (
              <div className="flex-shrink-0 order-1 lg:order-none">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <img 
                    key={insight.id} // Force re-render when insight changes
                    src={insight.heroImageUrl} 
                    alt={insight.title}
                    className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-2xl shadow-xl ring-1 ring-white/20"
                  />
                </div>
              </div>
            )}
            
            {/* Content Section */}
            <div className="flex-grow text-center lg:text-left order-2 lg:order-none">
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  {insight.title}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-6xl">
                  {insight.subtitle}
                </p>
                
                {/* Meta Information */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <span className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {insight.category || 'Insight'}
                  </span>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {insight.date}
                    </span>
                    
                    {(insight.views !== undefined && insight.views !== null) && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          {insight.views} {insight.views === 1 ? 'view' : 'views'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* PDF Viewer */}
        <div className={`${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-white' 
            : 'bg-white rounded-2xl shadow-lg border border-gray-200'
        } overflow-hidden`}>
          
          {/* PDF Controls */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-600" />
                <h3 className="font-medium text-gray-900">PDF Document</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={zoomOut}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                
                <button
                  onClick={resetZoom}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Reset zoom"
                >
                  <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
                </button>
                
                <button
                  onClick={zoomIn}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced PDF Embed */}
          <div className={`${
            isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-[800px]'
          } relative bg-gray-100`}>
            <iframe 
              key={insight.id} // Force re-render when insight changes
              src={`${insight.embedUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH&zoom=${Math.round(scale * 100)}`}
              className="w-full h-full border-0"
              title={insight.title}
              onLoad={() => setPdfLoading(false)}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${100 / scale}%`,
                height: `${100 / scale}%`,
              }}
            />
            
            {pdfLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span>Loading PDF...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Insights */}
        {relatedInsights.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Related Insights</h2>
              <div className="ml-4 h-px bg-gradient-to-r from-blue-500 to-transparent flex-grow"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedInsights.map(related => (
                <div key={related.id} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300">
                  {related.heroImageUrl && (
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                      <img 
                        src={related.heroImageUrl}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {related.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{related.date}</span>
                      <a 
                        href={`/Insights/${related.slug}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                      >
                        Read More
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
