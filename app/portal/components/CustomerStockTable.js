'use client';

import { useEffect, useRef, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Shield, TrendingUp, TrendingDown, RefreshCw, Eye, EyeOff, Target } from 'lucide-react';
import { preventContextMenu, preventKeyboardShortcuts } from '../../../lib/portalUtils';

export default function CustomerStockTable({ user }) {
  const containerRef = useRef(null);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showInactive, setShowInactive] = useState(false);

  // Security: Apply same protections as PDF viewer
  useEffect(() => {
    if (containerRef.current) {
      preventContextMenu(containerRef.current);
      preventKeyboardShortcuts(containerRef.current);
      containerRef.current.style.userSelect = 'none';
    }
  }, []);

  // Fetch stock recommendations (READ-ONLY)
  const fetchStocks = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'stockSuggestions'),
        orderBy('datePosted', 'desc')
      );
      
      const snapshot = await getDocs(q);
      const stocksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Update current prices
      await updateCurrentPrices(stocksData);
      
    } catch (err) {
      console.error('Error fetching stocks:', err);
      setError('Failed to load stock recommendations');
    } finally {
      setLoading(false);
    }
  };

  // Update current prices
  const updateCurrentPrices = async (stocksData) => {
    try {
      setUpdating(true);
      const updatedStocks = await Promise.all(
        stocksData.map(async (stock) => {
          try {
            const response = await fetch(`/api/get-stock-price?symbol=${stock.ticker}`);
            const data = await response.json();
            
            if (data.success) {
              return {
                ...stock,
                currentPrice: data.price,
                marketState: data.marketState
              };
            }
            return stock;
          } catch (error) {
            console.error(`Error updating price for ${stock.ticker}:`, error);
            return stock;
          }
        })
      );
      
      setStocks(updatedStocks);
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('Error updating prices:', error);
      setStocks(stocksData);
    } finally {
      setUpdating(false);
    }
  };

  // Calculate percentage gain/loss
  const calculatePercentage = (current, suggested) => {
    if (!current || !suggested) return 0;
    return (((current - suggested) / suggested) * 100);
  };

  // Calculate potential gain from suggested to exit price
  const calculatePotentialGain = (suggestedPrice, exitPrice) => {
    if (!suggestedPrice || !exitPrice) return 0;
    return (((exitPrice - suggestedPrice) / suggestedPrice) * 100);
  };

  // Refresh prices
  const refreshPrices = () => {
    updateCurrentPrices(stocks);
  };

  // Filter stocks based on showInactive toggle
  const filteredStocks = showInactive 
    ? stocks 
    : stocks.filter(stock => stock.isActive === true);

  useEffect(() => {
    fetchStocks();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white min-h-screen">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stock recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white min-h-screen">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-lg flex items-center justify-center">
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 mb-2">{error}</p>
          <button
                type="button"
            onClick={fetchStocks}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen" ref={containerRef}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 sticky top-0 z-20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Stock Recommendations</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Expert curated suggestions • {filteredStocks.length} showing 
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Show/Hide Inactive Toggle */}
            <button
                type="button"
              onClick={() => setShowInactive(!showInactive)}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm border ${
                showInactive 
                  ? 'bg-gray-100 text-gray-700 border-gray-300' 
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              {showInactive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">{showInactive ? 'Hide Inactive' : 'Show All'}</span>
            </button>

            {/* Last Updated */}
            {lastUpdated && (
              <div className="text-xs text-gray-500 hidden sm:block">
                Updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}

            {/* Refresh Button */}
            <button
                type="button"
              onClick={refreshPrices}
              disabled={updating}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${
                updating 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${updating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{updating ? 'Updating...' : 'Refresh'}</span>
            </button>

            {/* Protected Badge */}
            <div className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-blue-50 border border-blue-200 rounded">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="text-xs sm:text-sm text-blue-700">Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="relative flex-1 overflow-hidden bg-gray-50">
        {/* Watermarks - Same as PDF viewer */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Center watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="text-2xl sm:text-3xl lg:text-6xl font-bold text-gray-800 rotate-[-30deg] text-center whitespace-nowrap px-4">
              <div className="break-all">{user?.email || 'CONFIDENTIAL'}</div>
              <div className="mt-2">{user?.panCardNumber || 'RESTRICTED'}</div>
            </div>
          </div>

          {/* Top-right user info */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded shadow max-w-48 sm:max-w-none">
            <div className="break-all font-medium">{user?.fullName}</div>
            <div className="break-all">{user?.email}</div>
            <div className="break-all">{user?.phone}</div>
          </div>

          {/* Bottom-right timestamp */}
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-xs text-gray-700 opacity-80 bg-white px-2 py-1 rounded shadow max-w-48 break-words">
            {new Date().toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="h-full overflow-auto p-2 sm:p-6">
          {filteredStocks.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center p-8">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg text-gray-600 mb-2">
                  {showInactive ? 'No stock recommendations found' : 'No active recommendations'}
                </p>
                <p className="text-sm text-gray-500">
                  {showInactive ? 'Check back later for new suggestions' : 'Try showing all stocks to see inactive ones'}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Summary Stats */}
              {/* <div className="px-6 py-4 bg-gray-50 border-b">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{filteredStocks.length}</div>
                    <div className="text-sm text-gray-600">{showInactive ? 'Total' : 'Active'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {filteredStocks.filter(s => calculatePercentage(s.currentPrice, s.suggestedPrice) > 0).length}
                    </div>
                    <div className="text-sm text-gray-600">Profitable</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {filteredStocks.filter(s => calculatePercentage(s.currentPrice, s.suggestedPrice) < 0).length}
                    </div>
                    <div className="text-sm text-gray-600">In Loss</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700">
                      {filteredStocks.filter(s => s.marketState === 'REGULAR').length}
                    </div>
                    <div className="text-sm text-gray-600">Market Open</div>
                  </div>
                </div>
              </div> */}

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price on Recommendation</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Current Market Price</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStocks.map((stock) => {
                      const currentPercentage = calculatePercentage(stock.currentPrice, stock.suggestedPrice);
                      const isCurrentProfit = currentPercentage > 0;
                      const potentialPercentage = stock.recommendedExitPrice ? 
                        calculatePotentialGain(stock.suggestedPrice, stock.recommendedExitPrice) : null;
                      const isPotentialProfit = potentialPercentage && potentialPercentage > 0;
                      const datePosted = stock.datePosted?.toDate?.()?.toLocaleDateString() || 'N/A';

                      return (
                        <tr key={stock.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            {datePosted}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex flex-col items-center">
                              <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                {stock.ticker}
                                {stock.recommendedExitPrice && (
                                  <Target className="w-3 h-3 text-purple-600" />
                                )}
                              </div>
                              <div className="text-sm text-gray-500 truncate max-w-40">{stock.companyName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-medium text-blue-600">
                              ₹{stock.suggestedPrice?.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-medium text-gray-900">
                              ₹{stock.currentPrice?.toFixed(2) || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className={`text-sm font-medium ${isCurrentProfit ? 'text-green-600' : 'text-red-600'}`}>
                              {isCurrentProfit ? '+' : ''}{currentPercentage.toFixed(2)}%
                            </div>
                            <div className={`text-xs ${isCurrentProfit ? 'text-green-500' : 'text-red-500'}`}>
                              ₹{((stock.currentPrice || 0) - stock.suggestedPrice).toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              stock.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {stock.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tablet Table */}
              <div className="hidden md:block lg:hidden overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Suggested</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Exit</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStocks.map((stock) => {
                      const currentPercentage = calculatePercentage(stock.currentPrice, stock.suggestedPrice);
                      const isCurrentProfit = currentPercentage > 0;

                      return (
                        <tr key={stock.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <div className="flex flex-col items-center">
                              <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                                {stock.ticker}
                                {stock.recommendedExitPrice && (
                                  <Target className="w-3 h-3 text-purple-600" />
                                )}
                              </div>
                              <div className="text-xs text-gray-500 truncate max-w-32">{stock.companyName}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600 text-center">
                            ₹{stock.suggestedPrice?.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                            ₹{stock.currentPrice?.toFixed(2) || 'N/A'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-purple-600 text-center">
                            {stock.recommendedExitPrice ? 
                              `₹${stock.recommendedExitPrice.toFixed(2)}` : 
                              <span className="text-gray-400 text-xs">Not set</span>
                            }
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <div className={`text-sm font-medium ${isCurrentProfit ? 'text-green-600' : 'text-red-600'}`}>
                              {isCurrentProfit ? '+' : ''}{currentPercentage.toFixed(2)}%
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              stock.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {stock.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-200">
                {filteredStocks.map((stock) => {
                  const currentPercentage = calculatePercentage(stock.currentPrice, stock.suggestedPrice);
                  const isCurrentProfit = currentPercentage > 0;
                  const potentialPercentage = stock.recommendedExitPrice ? 
                    calculatePotentialGain(stock.suggestedPrice, stock.recommendedExitPrice) : null;
                  const isPotentialProfit = potentialPercentage && potentialPercentage > 0;
                  const datePosted = stock.datePosted?.toDate?.()?.toLocaleDateString() || 'N/A';

                  return (
                    <div key={stock.id} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {stock.ticker}
                            {stock.recommendedExitPrice && (
                              <Target className="w-3 h-3 text-purple-600" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500 break-words">{stock.companyName}</div>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          stock.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {stock.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                        <div className="bg-blue-50 p-2 rounded">
                          <div className="text-blue-700 text-xs font-medium">Suggested</div>
                          <div className="font-bold text-blue-900">₹{stock.suggestedPrice?.toFixed(2)}</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="text-gray-700 text-xs font-medium">Current</div>
                          <div className="font-bold text-gray-900">₹{stock.currentPrice?.toFixed(2) || 'N/A'}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Current P&L</div>
                          <div className={`font-medium ${isCurrentProfit ? 'text-green-600' : 'text-red-600'}`}>
                            {isCurrentProfit ? '+' : ''}{currentPercentage.toFixed(2)}%
                          </div>
                          <div className={`text-xs ${isCurrentProfit ? 'text-green-500' : 'text-red-500'}`}>
                            ₹{((stock.currentPrice || 0) - stock.suggestedPrice).toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Target P&L</div>
                          {potentialPercentage ? (
                            <>
                              <div className={`font-medium ${isPotentialProfit ? 'text-blue-600' : 'text-red-600'}`}>
                                {isPotentialProfit ? '+' : ''}{potentialPercentage.toFixed(2)}%
                              </div>
                              <div className={`text-xs ${isPotentialProfit ? 'text-blue-500' : 'text-red-500'}`}>
                                ₹{(stock.recommendedExitPrice - stock.suggestedPrice).toFixed(2)}
                              </div>
                            </>
                          ) : (
                            <div className="text-gray-400 text-xs">No target set</div>
                          )}
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                        <span>Date Posted: {datePosted}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}