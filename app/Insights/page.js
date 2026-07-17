'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router' to 'next/navigation'
import Header from '@/Components/Header';
import Footer from '@/Components/FooterA11y';
import { getInsights, incrementViewCount } from '@/lib/insightsService';
import { getThumbnailUrl, getHeroImageUrl } from '@/lib/cloudinary';
import Newsletter from '@/Components/Newsletter';
import Image from 'next/image';
import Link from 'next/link';

const InsightCard = ({ insight, onReadMore }) => {
  const router = useRouter();

  const handleReadMore = (e) => {
    e.preventDefault();
    // Navigate to individual insight page instead of opening PDF
    router.push(`/Insights/${insight.slug}`); // uppercase I
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 md:mb-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Mobile Layout - Stacked */}
      <div className="block md:hidden">
        {/* Image with proper 16:9 aspect ratio */}
        <div className="relative w-full aspect-video bg-gray-100">
          <img
            src={insight.thumbnailUrl || insight.thumbnail}
            alt={insight.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/640x360/0066cc/ffffff?text=Insight+Image";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Top Section */}
          <div className="flex items-center justify-between mb-4">
            {/* Brand/Logo */}
            <div className="flex items-center mb-4">
                    <div className="text-sm text-gray-600 font-medium tracking-wide">
                      <Image
                        src="/images/HD.png"
                        alt="Sprout Research Logo"
                        width={110}
                        height={62}
                        priority
                        className="object-contain"
                      />

                    </div>
                  </div>
          
            {/* Date */}
            <div className="text-sm text-gray-500 font-medium">
              {insight.date}
            </div>
          </div>
        
          {/* Main Heading */}
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight">
            {insight.title}
          </h2>
          
          {/* Sub Heading */}
          <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
            {insight.subtitle}
          </p>
          
          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
            {/* Read More Button */}
            <button
              type="button"
              onClick={handleReadMore}
              aria-label={`Read more about ${insight.title}`}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-sm w-full sm:w-auto"
            >
              Read More
            </button>
            
            {/* View Count */}
            <div className="flex items-center justify-center sm:justify-start text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              {insight.viewCount} Views
            </div>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Layout - Side by side */}
      <div className="hidden md:flex">
        {/* Image Container with proper 16:9 aspect ratio */}
        <div className="w-2/5 lg:w-1/3 xl:w-2/5 flex-shrink-0  bg-blue-50">
          <div className="relative flex flex-col items-center justify-center w-full h-full ">
            {/* 16:9 Aspect Ratio Container */}
            <div className="aspect-video w-full border-8 border-gray-300  rounded-b-md   bg-white overflow-hidden">
              <img
                src={insight.thumbnailUrl || insight.thumbnail}
                alt={insight.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/640x360/0066cc/ffffff?text=Insight+Image";
                }}
              />
            </div>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="w-3/5 lg:w-2/3 xl:w-3/5 flex flex-col justify-between p-6 lg:p-8">
          <div className="flex-grow">
            {/* Top Section */}
            <div className="flex items-center justify-between mb-6">
              {/* Brand/Logo */}
              <div className="flex items-center mb-4">
                    <div className="text-sm text-gray-600 font-medium tracking-wide">
                      <Image
                        src="/images/HD.png"
                        alt="Sprout Research Logo"
                        width={110}
                        height={62}
                        priority
                        className="object-contain"
                      />

                    </div>
                </div>
            
              {/* Date */}
              <div className="text-sm text-gray-500 font-medium">
                {insight.date}
              </div>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {insight.title}
            </h2>
            
            {/* Sub Heading */}
            <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-6">
              {insight.subtitle}
            </p>
          </div>
          
          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
            {/* Read More Button */}
            <button
              type="button"
              onClick={handleReadMore}
              aria-label={`Read more about ${insight.title}`}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm lg:text-base"
            >
              Read More
            </button>
            
            {/* View Count */}
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              {insight.viewCount} Views
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingCard = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 md:mb-8 animate-pulse">
    {/* Mobile Loading */}
    <div className="block md:hidden">
      <div className="w-full aspect-video bg-gray-300"></div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between mb-4">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <div className="h-10 bg-gray-300 rounded-lg w-full sm:w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-20 mx-auto sm:mx-0"></div>
        </div>
      </div>
    </div>

    {/* Desktop Loading */}
    <div className="hidden md:flex">
      <div className="w-2/5 lg:w-1/3 xl:w-2/5 flex-shrink-0 bg-white">
        <div className="aspect-video w-full bg-gray-300"></div>
      </div>
      <div className="w-3/5 lg:w-2/3 xl:w-3/5 p-6 lg:p-8 flex flex-col justify-between">
        <div className="flex-grow">
          <div className="flex justify-between mb-6">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-6 w-3/4"></div>
        </div>
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedInsights, setDisplayedInsights] = useState(5);
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();

  // Fetch insights on component mount
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const fetchedInsights = await getInsights();
        
        // Process insights to add optimized image URLs
        const processedInsights = fetchedInsights.map(insight => ({
          ...insight,
          thumbnailUrl: insight.cloudinaryId 
            ? getThumbnailUrl(insight.cloudinaryId)
            : insight.thumbnail,
          heroImageUrl: insight.cloudinaryId 
            ? getHeroImageUrl(insight.cloudinaryId)
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

  const handleReadMore = async (insight) => {
    try {
      // Increment view count in database
      await incrementViewCount(insight.id);
      
      // Update local state
      setInsights(prevInsights =>
        prevInsights.map(item =>
          item.id === insight.id
            ? { ...item, viewCount: item.viewCount + 1 }
            : item
        )
      );

      // Navigate to individual insight page
      router.push(`/Insights/${insight.slug}`);
    } catch (error) {
      console.error('Error handling read more:', error);
      // Still navigate even if view count update fails
      router.push(`/Insights/${insight.slug}`);
    }
  };

  const handleFeaturedReadMore = async (insight) => {
    try {
      // Increment view count in database
      await incrementViewCount(insight.id);
      
      // Update local state
      setInsights(prevInsights =>
        prevInsights.map(item =>
          item.id === insight.id
            ? { ...item, viewCount: item.viewCount + 1 }
            : item
        )
      );

      // Navigate to individual insight page
      router.push(`/Insights/${insight.slug}`);
    } catch (error) {
      console.error('Error handling read more:', error);
      // Still navigate even if view count update fails
      router.push(`/Insights/${insight.slug}`);
    }
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedInsights(prev => prev + 5);
      setLoadingMore(false);
    }, 500);
  };

  // Get the insights to display (excluding the featured one)
  const remainingInsights = insights.slice(1);
  const visibleInsights = remainingInsights.slice(0, displayedInsights);
  const hasMoreInsights = remainingInsights.length > displayedInsights;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main id="main-content" tabIndex={-1}>
        <h1 className="sr-only">Sprout Research Insights</h1>
        {/* Featured Hero Section - Latest Insight */}
        {!loading && insights.length > 0 && (
          <div className="relative bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200/50 to-blue-200/50"></div>
              <div className="w-full h-full bg-cover bg-center" 
                   style={{
                     backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="%23a855f7" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="1000" height="1000" fill="url(%23grid)"/></svg>')`
                   }}>
              </div>
            </div>
            
            <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Content Side */}
                <div className="order-2 lg:order-1">
                  {/* Brand/Logo */}
                  <div className="flex items-center mb-4">
                    <div className="text-sm text-gray-600 font-medium tracking-wide">
                      <Image
                        src="/images/HD.png"
                        alt="Sprout Research Logo"
                        width={110}
                        height={62}
                        priority
                        className="object-contain"
                      />

                    </div>
                  </div>
                  
                  {/* Date */}
                  <div className="text-sm text-gray-600 mb-4">
                    {insights[0].date}
                  </div>
                  
                  {/* Main Heading */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {insights[0].title}
                  </h1>
                  
                  {/* Sub Heading */}
                  <p className="text-gray-700 text-base lg:text-lg mb-8 leading-relaxed max-w-2xl">
                    {insights[0].subtitle}
                  </p>
                  
                  {/* Bottom Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Read More Button */}
                    <button
                      type="button"
                      onClick={() => handleFeaturedReadMore(insights[0])}
                      aria-label={`Read more about ${insights[0].title}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-fit"
                    >
                      Read More
                    </button>
                    
                    {/* View Count */}
                    <div className="text-sm text-gray-600 font-medium">
                      {insights[0].viewCount} Views
                    </div>
                  </div>
                </div>
                
                {/* Image Side */}
                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                      {/* Hero image with proper aspect ratio */}
                      <div className="aspect-video w-full bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={insights[0].heroImageUrl || insights[0].thumbnail}
                          alt={insights[0].title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/640x360/0066cc/ffffff?text=Insight+Image";
                          }}
                        />
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-200/50 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-200/50 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading Hero Section */}
        {loading && (
          <div className="relative bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 overflow-hidden">
            <div className="container mx-auto px-4 py-12 lg:py-20">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="order-2 lg:order-1 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded mb-4 w-24"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-20"></div>
                  <div className="h-12 bg-gray-300 rounded mb-6"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-8 w-3/4"></div>
                  <div className="h-12 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="order-1 lg:order-2 animate-pulse">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="aspect-video w-full bg-gray-300 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Newsletter Subscription Section */}
        <Newsletter />

        {/* Other Insights Section */}
        <div className="container mx-auto px-4 py-16">
          {/* Section Header */}
          {!loading && insights.length > 1 && (
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                More Insights
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore our previous analysis and market insights to stay ahead of industry trends
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          )}

          {/* Insights List - Show limited insights with pagination */}
          <div className="max-w-6xl mx-auto">
            {!loading && visibleInsights.length > 0 ? (
              <>
                {visibleInsights.map((insight) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    onReadMore={handleReadMore}
                  />
                ))}
                
                {/* Load More Loading Cards */}
                {loadingMore && (
                  <>
                    {[1, 2].map((i) => (
                      <LoadingCard key={`loading-${i}`} />
                    ))}
                  </>
                )}
              </>
            ) : !loading && insights.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No insights available at the moment.</p>
                <p className="text-gray-400 text-sm mt-2">Check back soon for new market analysis and trends.</p>
              </div>
            ) : null}
          </div>

          {/* Load More Button */}
          {!loading && hasMoreInsights && (
            <div className="text-center mt-12">
              <button 
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading More...
                  </div>
                ) : (
                  `Load More Insights (${remainingInsights.length - displayedInsights} remaining)`
                )}
              </button>
            </div>
          )}

          {/* Show total count when all insights are displayed */}
          {!loading && remainingInsights.length > 0 && !hasMoreInsights && (
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
                Showing all {remainingInsights.length} insights
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
