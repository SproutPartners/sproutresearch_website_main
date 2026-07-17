'use client';

import { useState, useEffect } from 'react';
import { getInsights } from '@/lib/insightsService';
import { getThumbnailUrl } from '@/lib/cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RecentInsightCard = ({ insight }) => {
  const router = useRouter();

  const handleReadMore = () => {
    // Navigate to the individual insight page
    router.push(`/Insights/${insight.slug}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <button
        type="button"
        onClick={handleReadMore}
        aria-label={`Read more about ${insight.title}`}
        className="relative w-full aspect-video bg-gray-100 cursor-pointer text-left"
      >
        <img
          src={insight.thumbnailUrl || insight.thumbnail}
          alt={insight.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/640x360/0066cc/ffffff?text=Insight+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        <div className="absolute inset-0 bg-blue-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 text-blue-600 px-4 py-2 rounded-lg font-medium">
            Read More
          </div>
        </div>
      </button>
      
      {/* Content Section */}
      <div className="p-6">
        {/* Header with Logo and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Image
              src="/images/HD.png"
              alt="Sprout Research Logo"
              width={80}
              height={45}
              priority
              className="object-contain"
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {insight.date}
          </div>
        </div>
        
        {/* Title */}
        <h3
          className="text-lg font-bold text-gray-900 mb-3 leading-tight line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
        >
          <button
            type="button"
            onClick={handleReadMore}
            aria-label={`Read more about ${insight.title}`}
            className="text-left"
          >
            {insight.title}
          </button>
        </h3>
        
        {/* Subtitle */}
        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
          {insight.subtitle}
        </p>
        
        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Read More Button */}
          <button
            type="button"
            onClick={handleReadMore}
            aria-label={`Read more about ${insight.title}`}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-sm"
          >
            Read More
          </button>
          
          {/* View Count */}
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            {insight.views || insight.viewCount || 0} Views
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingInsightCard = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="w-full aspect-video bg-gray-300"></div>
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
      <div className="h-6 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="h-8 bg-gray-300 rounded w-24"></div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  </div>
);

const RecentInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch insights on component mount
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const fetchedInsights = await getInsights();
        
        // Process insights to add optimized image URLs and get only first 2
        const processedInsights = fetchedInsights
          .slice(0, 2) // Get only first 2 insights
          .map(insight => ({
            ...insight,
            thumbnailUrl: insight.cloudinaryId 
              ? getThumbnailUrl(insight.cloudinaryId)
              : insight.thumbnail
          }));
        
        setInsights(processedInsights);
      } catch (err) {
        console.error('Error fetching insights:', err);
        setInsights([]);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  // Don't render if no insights and not loading
  if (!loading && insights.length === 0 && !error) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Recent Insights
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with our latest market analysis and industry trends
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md mx-auto">
              {error}
            </div>
          </div>
        )}

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12">
          {loading ? (
            // Loading State
            <>
              <LoadingInsightCard />
              <LoadingInsightCard />
            </>
          ) : (
            // Insights Cards
            insights.map((insight) => (
              <RecentInsightCard
                key={insight.id}
                insight={insight}
              />
            ))
          )}
        </div>

        {/* View All Button */}
        {!loading && insights.length > 0 && (
          <div className="text-center">
            <Link
              href="/Insights"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 hover:border-gray-400 px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              View all
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentInsights;
