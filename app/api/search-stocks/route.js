// app/api/search-stocks/route.js
import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Search for stocks
    const searchResults = await yahooFinance.search(query, {
      quotesCount: 15,
      newsCount: 0,
    });

    // Filter for Indian stocks (NSE/BSE) and format results
    const indianStocks = searchResults.quotes
      ?.filter(stock => {
        const symbol = stock.symbol || '';
        const exchange = stock.exchange || '';
        
        // Filter for Indian exchanges
        return exchange.includes('NSI') || 
               exchange.includes('BSE') || 
               symbol.includes('.NS') || 
               symbol.includes('.BO') ||
               exchange === 'NSE' ||
               exchange === 'BSE' ||
               exchange.includes('National Stock Exchange') ||
               exchange.includes('Bombay Stock Exchange');
      })
      .map(stock => ({
        symbol: stock.symbol,
        shortName: stock.shortname || stock.longname,
        longName: stock.longname,
        exchange: stock.exchange,
        regularMarketPrice: stock.regularMarketPrice,
        currency: stock.currency || 'INR',
        marketCap: stock.marketCap,
        sector: stock.sector,
        industry: stock.industry
      })) || [];

    // If no Indian stocks found, try to get basic info for the search term
    if (indianStocks.length === 0) {
      try {
        // Try adding .NS (NSE) suffix if not present
        const searchSymbol = query.toUpperCase().includes('.NS') ? 
          query.toUpperCase() : 
          `${query.toUpperCase()}.NS`;
        
        const quote = await yahooFinance.quote(searchSymbol);
        
        if (quote) {
          indianStocks.push({
            symbol: quote.symbol,
            shortName: quote.shortName || quote.longName,
            longName: quote.longName,
            exchange: quote.fullExchangeName || 'NSE',
            regularMarketPrice: quote.regularMarketPrice,
            currency: quote.currency || 'INR',
            marketCap: quote.marketCap,
            sector: quote.sector,
            industry: quote.industry
          });
        }
      } catch (error) {
        // If NSE doesn't work, try BSE (.BO)
        try {
          const searchSymbolBSE = query.toUpperCase().includes('.BO') ? 
            query.toUpperCase() : 
            `${query.toUpperCase()}.BO`;
          
          const quoteBSE = await yahooFinance.quote(searchSymbolBSE);
          
          if (quoteBSE) {
            indianStocks.push({
              symbol: quoteBSE.symbol,
              shortName: quoteBSE.shortName || quoteBSE.longName,
              longName: quoteBSE.longName,
              exchange: quoteBSE.fullExchangeName || 'BSE',
              regularMarketPrice: quoteBSE.regularMarketPrice,
              currency: quoteBSE.currency || 'INR',
              marketCap: quoteBSE.marketCap,
              sector: quoteBSE.sector,
              industry: quoteBSE.industry
            });
          }
        } catch (bseError) {
          console.log('Stock not found in BSE either');
        }
      }
    }

    // Sort results by relevance (exact matches first, then by market cap if available)
    indianStocks.sort((a, b) => {
      const queryUpper = query.toUpperCase();
      
      // Exact symbol matches first
      if (a.symbol.toUpperCase().includes(queryUpper) && !b.symbol.toUpperCase().includes(queryUpper)) {
        return -1;
      }
      if (!a.symbol.toUpperCase().includes(queryUpper) && b.symbol.toUpperCase().includes(queryUpper)) {
        return 1;
      }
      
      // Then by market cap (higher first)
      if (a.marketCap && b.marketCap) {
        return b.marketCap - a.marketCap;
      }
      
      return 0;
    });

    return NextResponse.json({
      success: true,
      results: indianStocks.slice(0, 10), // Limit to top 10 results
      total: indianStocks.length,
      query: query
    });

  } catch (error) {
    console.error('Stock search error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search stocks',
        message: error.message 
      },
      { status: 500 }
    );
  }
}