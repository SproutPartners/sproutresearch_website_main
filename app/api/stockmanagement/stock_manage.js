'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const StockManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingStock, setEditingStock] = useState(null);

  // Fetch all stock suggestions
  const fetchSuggestions = async () => {
    try {
      const q = query(collection(db, 'stockSuggestions'), orderBy('datePosted', 'desc'));
      const snapshot = await getDocs(q);
      const suggestionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSuggestions(suggestionsData);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  // Search stocks using Yahoo Finance API
  const searchStocks = async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    try {
      const response = await fetch(`/api/search-stocks?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.results);
      } else {
        setMessage('Error searching stocks');
      }
    } catch (error) {
      console.error('Search error:', error);
      setMessage('Error searching stocks');
    } finally {
      setSearching(false);
    }
  };

  // Add stock suggestion
  const addSuggestion = async (stock, suggestedPrice, recommendedExitPrice = null) => {
    if (!suggestedPrice || suggestedPrice <= 0) {
      setMessage('Please enter a valid suggested price');
      return;
    }

    setLoading(true);
    try {
      let currentPrice = stock.regularMarketPrice || 0;
      
      if (!currentPrice) {
        try {
          const response = await fetch(`/api/get-stock-price?symbol=${stock.symbol}`);
          const priceData = await response.json();
          if (priceData.success) {
            currentPrice = priceData.price;
          }
        } catch (error) {
          console.log('Could not fetch current price, using 0');
        }
      }

      const suggestionData = {
        ticker: stock.symbol,
        companyName: stock.shortName || stock.longName || 'N/A',
        currentPrice: currentPrice,
        suggestedPrice: parseFloat(suggestedPrice),
        recommendedExitPrice: recommendedExitPrice ? parseFloat(recommendedExitPrice) : null,
        exchange: stock.exchange || 'NSE',
        isActive: true,
        status: 'active',
        datePosted: new Date(),
        createdAt: new Date()
      };

      await addDoc(collection(db, 'stockSuggestions'), suggestionData);

      setMessage('Stock suggestion added successfully!');
      fetchSuggestions();
      setSearchResults([]);
      setSearchQuery('');
    } catch (error) {
      console.error('Error adding suggestion:', error);
      setMessage('Error adding stock suggestion: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update stock suggestion
  const updateSuggestion = async (id, updates) => {
    setLoading(true);
    try {
      const stockRef = doc(db, 'stockSuggestions', id);
      
      await updateDoc(stockRef, {
        ...updates,
        updatedAt: new Date()
      });
      
      setMessage('Stock suggestion updated successfully!');
      fetchSuggestions();
      setEditingStock(null);
    } catch (error) {
      console.error('Error updating suggestion:', error);
      setMessage('Error updating stock suggestion');
    } finally {
      setLoading(false);
    }
  };

  // Delete stock suggestion
  const deleteSuggestion = async (id) => {
    if (!confirm('Are you sure you want to delete this stock suggestion?')) return;
    
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'stockSuggestions', id));
      setMessage('Stock suggestion deleted successfully!');
      fetchSuggestions();
    } catch (error) {
      console.error('Error deleting suggestion:', error);
      setMessage('Error deleting stock suggestion');
    } finally {
      setLoading(false);
    }
  };

  // Calculate percentage gain/loss
  const calculatePercentage = (basePrice, comparePrice) => {
    if (!basePrice || !comparePrice) return 0;
    return (((comparePrice - basePrice) / basePrice) * 100).toFixed(2);
  };

  // Calculate potential gain if exit price is set
  const calculatePotentialGain = (suggestedPrice, exitPrice) => {
    if (!suggestedPrice || !exitPrice) return 0;
    return (((exitPrice - suggestedPrice) / suggestedPrice) * 100).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Stock Search Section */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold mb-4">Search & Add Stock</h2>
        
        {message && (
          <div className={`p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company name or ticker symbol (e.g., RELIANCE, TCS)"
            className="flex-1 p-3 border rounded-lg"
            onKeyPress={(e) => e.key === 'Enter' && searchStocks()}
          />
          <button
                type="button"
            onClick={searchStocks}
            disabled={searching || !searchQuery.trim()}
            className={`px-6 py-3 rounded-lg text-white font-medium ${
              searching || !searchQuery.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-4 space-y-3">
            <h3 className="text-lg font-semibold">Search Results</h3>
            {searchResults.map((stock, index) => (
              <SearchResultCard 
                key={index} 
                stock={stock} 
                onAdd={addSuggestion}
                loading={loading}
              />
            ))}
          </div>
        )}
      </div>

      {/* Portfolio Summary */}
      <PortfolioSummary suggestions={suggestions} calculatePercentage={calculatePercentage} />

      {/* Existing Suggestions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Stock Suggestions ({suggestions.length})</h2>
          <div className="flex gap-2">
            <span className="text-sm text-green-600">● Active: {suggestions.filter(s => s.isActive).length}</span>
            <span className="text-sm text-gray-600">● Inactive: {suggestions.filter(s => !s.isActive).length}</span>
          </div>
        </div>
        
        {suggestions.length === 0 ? (
          <p className="text-gray-500">No stock suggestions added yet.</p>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                isEditing={editingStock === suggestion.id}
                onEdit={() => setEditingStock(suggestion.id)}
                onCancelEdit={() => setEditingStock(null)}
                onUpdate={(updates) => updateSuggestion(suggestion.id, updates)}
                onDelete={() => deleteSuggestion(suggestion.id)}
                onToggleActive={(isActive) => updateSuggestion(suggestion.id, { isActive })}
                calculatePercentage={calculatePercentage}
                calculatePotentialGain={calculatePotentialGain}
                loading={loading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Portfolio Summary Component
const PortfolioSummary = ({ suggestions, calculatePercentage }) => {
  const activeStocks = suggestions.filter(s => s.isActive);
  const inactiveStocks = suggestions.filter(s => !s.isActive);
  
  const totalActive = activeStocks.length;
  const totalInactive = inactiveStocks.length;
  
  const totalCurrentValue = activeStocks.reduce((sum, stock) => sum + (stock.currentPrice || 0), 0);
  const totalSuggestedValue = activeStocks.reduce((sum, stock) => sum + (stock.suggestedPrice || 0), 0);
  
  const averageGainLoss = activeStocks.length > 0 ? 
    activeStocks.reduce((sum, stock) => {
      const percentage = calculatePercentage(stock.suggestedPrice, stock.currentPrice);
      return sum + parseFloat(percentage);
    }, 0) / activeStocks.length : 0;

  const stocksWithExitPrice = activeStocks.filter(s => s.recommendedExitPrice);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Portfolio Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">Total Stocks</h3>
          <p className="text-2xl font-bold text-blue-600">{suggestions.length}</p>
          <p className="text-sm text-gray-600">Active: {totalActive}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">Active Suggestions</h3>
          <p className="text-2xl font-bold text-green-600">{totalActive}</p>
          <p className="text-sm text-gray-600">With Exit Price: {stocksWithExitPrice.length}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800">Inactive</h3>
          <p className="text-2xl font-bold text-gray-600">{totalInactive}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">Portfolio Value</h3>
          <p className="text-lg font-bold text-purple-600">₹{totalCurrentValue.toFixed(2)}</p>
          <p className="text-sm text-gray-600">vs Entry: ₹{totalSuggestedValue.toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded-lg ${averageGainLoss >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className={`font-semibold ${averageGainLoss >= 0 ? 'text-green-800' : 'text-red-800'}`}>
            Avg Performance
          </h3>
          <p className={`text-lg font-bold ${averageGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {averageGainLoss >= 0 ? '+' : ''}{averageGainLoss.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

// Search Result Card Component
const SearchResultCard = ({ stock, onAdd, loading }) => {
  const [suggestedPrice, setSuggestedPrice] = useState('');
  const [recommendedExitPrice, setRecommendedExitPrice] = useState('');
  
  const formatPrice = (price) => {
    if (!price || price === 0) return 'N/A';
    return price.toFixed(2);
  };
  
  const handleAdd = () => {
    onAdd(stock, suggestedPrice, recommendedExitPrice || null);
    setSuggestedPrice('');
    setRecommendedExitPrice('');
  };
  
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{stock.symbol}</h4>
          <p className="text-gray-600">{stock.shortName || stock.longName}</p>
          <p className="text-sm text-gray-500">Exchange: {stock.exchange}</p>
          <p className="text-lg font-medium mt-1">
            Current Price: ₹{formatPrice(stock.regularMarketPrice)}
          </p>
          {stock.regularMarketPrice === undefined && (
            <p className="text-xs text-orange-600">Price data unavailable</p>
          )}
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entry Price *
              </label>
              <input
                type="number"
                value={suggestedPrice}
                onChange={(e) => setSuggestedPrice(e.target.value)}
                placeholder="Enter price"
                className="w-32 p-2 border rounded"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exit Price (Optional)
              </label>
              <input
                type="number"
                value={recommendedExitPrice}
                onChange={(e) => setRecommendedExitPrice(e.target.value)}
                placeholder="Target price"
                className="w-32 p-2 border rounded"
                step="0.01"
              />
            </div>
          </div>
          <button
                type="button"
            onClick={handleAdd}
            disabled={loading || !suggestedPrice}
            className={`px-4 py-2 rounded text-white font-medium ${
              loading || !suggestedPrice
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Add Stock
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Suggestion Card Component
const SuggestionCard = ({ 
  suggestion, 
  isEditing, 
  onEdit, 
  onCancelEdit, 
  onUpdate, 
  onDelete, 
  onToggleActive,
  calculatePercentage,
  calculatePotentialGain,
  loading 
}) => {
  const [editSuggestedPrice, setEditSuggestedPrice] = useState(suggestion.suggestedPrice);
  const [editCurrentPrice, setEditCurrentPrice] = useState(suggestion.currentPrice);
  const [editRecommendedExitPrice, setEditRecommendedExitPrice] = useState(suggestion.recommendedExitPrice || '');
  
  const currentPercentage = calculatePercentage(suggestion.suggestedPrice, suggestion.currentPrice);
  const isCurrentProfit = currentPercentage > 0;
  
  const potentialPercentage = suggestion.recommendedExitPrice ? 
    calculatePotentialGain(suggestion.suggestedPrice, suggestion.recommendedExitPrice) : 0;
  const isPotentialProfit = potentialPercentage > 0;
  
  const handleSave = () => {
    const updates = {
      suggestedPrice: parseFloat(editSuggestedPrice),
      currentPrice: parseFloat(editCurrentPrice),
      recommendedExitPrice: editRecommendedExitPrice && editRecommendedExitPrice !== '' ? 
        parseFloat(editRecommendedExitPrice) : null
    };
    
    onUpdate(updates);
  };
  
  return (
    <div className={`border rounded-lg p-4 ${
      suggestion.isActive 
        ? 'border-green-200 bg-green-50' 
        : 'border-yellow-200 bg-yellow-50'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-lg">{suggestion.ticker}</h4>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              suggestion.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {suggestion.isActive ? 'Active' : 'Inactive'}
            </span>
            {suggestion.recommendedExitPrice && (
              <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                Exit Target Set
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-3">{suggestion.companyName}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Entry Price:</span>
              {isEditing ? (
                <input
                  type="number"
                  value={editSuggestedPrice}
                  onChange={(e) => setEditSuggestedPrice(e.target.value)}
                  className="w-full p-1 border rounded text-sm mt-1"
                  step="0.01"
                />
              ) : (
                <p className="font-medium">₹{suggestion.suggestedPrice?.toFixed(2)}</p>
              )}
            </div>
            
            <div>
              <span className="text-gray-500">Current Price:</span>
              {isEditing ? (
                <input
                  type="number"
                  value={editCurrentPrice}
                  onChange={(e) => setEditCurrentPrice(e.target.value)}
                  className="w-full p-1 border rounded text-sm mt-1"
                  step="0.01"
                />
              ) : (
                <p className="font-medium">₹{suggestion.currentPrice?.toFixed(2) || 'N/A'}</p>
              )}
            </div>
            
            <div>
              <span className="text-gray-500">Exit Target:</span>
              {isEditing ? (
                <input
                  type="number"
                  value={editRecommendedExitPrice}
                  onChange={(e) => setEditRecommendedExitPrice(e.target.value)}
                  placeholder="Set target"
                  className="w-full p-1 border rounded text-sm mt-1"
                  step="0.01"
                />
              ) : (
                <p className="font-medium">
                  {suggestion.recommendedExitPrice ? 
                    `₹${suggestion.recommendedExitPrice.toFixed(2)}` : 
                    <span className="text-gray-400">Not set</span>
                  }
                </p>
              )}
            </div>
            
            <div>
              <span className="text-gray-500">Current P&L:</span>
              <p className={`font-medium ${isCurrentProfit ? 'text-green-600' : 'text-red-600'}`}>
                {isCurrentProfit ? '+' : ''}{currentPercentage}%
              </p>
              <p className={`text-xs ${isCurrentProfit ? 'text-green-600' : 'text-red-600'}`}>
                ₹{(suggestion.currentPrice - suggestion.suggestedPrice).toFixed(2)}
              </p>
            </div>
            
            <div>
              <span className="text-gray-500">Target P&L:</span>
              {suggestion.recommendedExitPrice ? (
                <>
                  <p className={`font-medium ${isPotentialProfit ? 'text-blue-600' : 'text-red-600'}`}>
                    {isPotentialProfit ? '+' : ''}{potentialPercentage}%
                  </p>
                  <p className={`text-xs ${isPotentialProfit ? 'text-blue-600' : 'text-red-600'}`}>
                    ₹{(suggestion.recommendedExitPrice - suggestion.suggestedPrice).toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-gray-400 text-sm">No target</p>
              )}
            </div>
            
            <div>
              <span className="text-gray-500">Date Added:</span>
              <p className="font-medium text-xs">
                {suggestion.datePosted?.toDate?.()?.toLocaleDateString() || 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 ml-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm disabled:bg-gray-400"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onEdit}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onToggleActive(!suggestion.isActive)}
                disabled={loading}
                className={`px-3 py-1 rounded hover:opacity-80 text-sm disabled:bg-gray-400 ${
                  suggestion.isActive
                    ? 'bg-yellow-500 text-white'
                    : 'bg-green-500 text-white'
                }`}
              >
                {suggestion.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button
                type="button"
                onClick={onDelete}
                disabled={loading}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm disabled:bg-gray-400"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockManagement;