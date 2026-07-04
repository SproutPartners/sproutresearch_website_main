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
      // Using yahoo-finance2 npm package (you'll need to install: npm install yahoo-finance2)
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
  const addSuggestion = async (stock, suggestedPrice) => {
    if (!suggestedPrice || suggestedPrice <= 0) {
      setMessage('Please enter a valid suggested price');
      return;
    }

    setLoading(true);
    try {
      // If no current price from search, try to fetch it
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

      await addDoc(collection(db, 'stockSuggestions'), {
        ticker: stock.symbol,
        companyName: stock.shortName || stock.longName || 'N/A',
        currentPrice: currentPrice,
        suggestedPrice: parseFloat(suggestedPrice),
        exchange: stock.exchange || 'NSE',
        isActive: true,
        datePosted: new Date(),
        createdAt: new Date()
      });

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
  const calculatePercentage = (current, suggested) => {
    if (!current || !suggested) return 0;
    return (((current - suggested) / suggested) * 100).toFixed(2);
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

      {/* Existing Suggestions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Stock Suggestions ({suggestions.length})</h2>
        
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
                loading={loading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Search Result Card Component
const SearchResultCard = ({ stock, onAdd, loading }) => {
  const [suggestedPrice, setSuggestedPrice] = useState('');
  
  // Format price display
  const formatPrice = (price) => {
    if (!price || price === 0) return 'N/A';
    return price.toFixed(2);
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
        <div className="flex gap-2 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Suggested Buy Price
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
          <button
                type="button"
            onClick={() => onAdd(stock, suggestedPrice)}
            disabled={loading || !suggestedPrice}
            className={`px-4 py-2 rounded text-white font-medium ${
              loading || !suggestedPrice
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

// Suggestion Card Component
const SuggestionCard = ({ 
  suggestion, 
  isEditing, 
  onEdit, 
  onCancelEdit, 
  onUpdate, 
  onDelete, 
  onToggleActive, 
  calculatePercentage,
  loading 
}) => {
  const [editPrice, setEditPrice] = useState(suggestion.suggestedPrice);
  
  const percentage = calculatePercentage(suggestion.currentPrice, suggestion.suggestedPrice);
  const isProfit = percentage > 0;
  
  return (
    <div className={`border rounded-lg p-4 ${suggestion.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-lg">{suggestion.ticker}</h4>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              suggestion.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {suggestion.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="text-gray-600">{suggestion.companyName}</p>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Current Price:</span>
              <p className="font-medium">₹{suggestion.currentPrice?.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">Suggested Price:</span>
              {isEditing ? (
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(parseFloat(e.target.value))}
                  className="w-24 p-1 border rounded text-sm"
                  step="0.01"
                />
              ) : (
                <p className="font-medium">₹{suggestion.suggestedPrice?.toFixed(2)}</p>
              )}
            </div>
            <div>
              <span className="text-gray-500">Gain/Loss:</span>
              <p className={`font-medium ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                {isProfit ? '+' : ''}{percentage}%
              </p>
            </div>
            <div>
              <span className="text-gray-500">Date Posted:</span>
              <p className="font-medium">
                {suggestion.datePosted?.toDate?.()?.toLocaleDateString() || 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => onUpdate({ suggestedPrice: editPrice })}
                disabled={loading}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
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
                className={`px-3 py-1 rounded hover:opacity-80 text-sm ${
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
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
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