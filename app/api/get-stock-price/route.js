// app/api/get-stock-price/route.js
import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    
    if (!symbol) {
      return NextResponse.json(
        { success: false, error: 'Stock symbol is required' },
        { status: 400 }
      );
    }

    // Try to get the quote for the symbol
    const quote = await yahooFinance.quote(symbol);
    
    if (quote && quote.regularMarketPrice) {
      return NextResponse.json({
        success: true,
        symbol: quote.symbol,
        price: quote.regularMarketPrice,
        currency: quote.currency || 'INR',
        marketState: quote.marketState,
        regularMarketTime: quote.regularMarketTime,
        previousClose: quote.regularMarketPreviousClose,
        dayHigh: quote.regularMarketDayHigh,
        dayLow: quote.regularMarketDayLow,
        volume: quote.regularMarketVolume
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Stock price not available' },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('Stock price fetch error:', error);
    
    // If the symbol is not found, try with different suffixes
    try {
      const { searchParams } = new URL(request.url);
      const originalSymbol = searchParams.get('symbol');
      
      // Try different exchange suffixes
      const suffixes = ['.NS', '.BO']; // NSE and BSE
      
      for (const suffix of suffixes) {
        if (!originalSymbol.includes('.')) {
          try {
            const modifiedSymbol = originalSymbol + suffix;
            const quote = await yahooFinance.quote(modifiedSymbol);
            
            if (quote && quote.regularMarketPrice) {
              return NextResponse.json({
                success: true,
                symbol: quote.symbol,
                price: quote.regularMarketPrice,
                currency: quote.currency || 'INR',
                marketState: quote.marketState,
                regularMarketTime: quote.regularMarketTime,
                previousClose: quote.regularMarketPreviousClose,
                dayHigh: quote.regularMarketDayHigh,
                dayLow: quote.regularMarketDayLow,
                volume: quote.regularMarketVolume
              });
            }
          } catch (suffixError) {
            continue; // Try next suffix
          }
        }
      }
    } catch (retryError) {
      console.error('Retry with suffixes failed:', retryError);
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch stock price' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { symbols } = await request.json();
    
    if (!symbols || !Array.isArray(symbols)) {
      return NextResponse.json(
        { success: false, error: 'Array of symbols is required' },
        { status: 400 }
      );
    }

    const results = await Promise.allSettled(
      symbols.map(async (symbol) => {
        try {
          const quote = await yahooFinance.quote(symbol);
          return {
            symbol: symbol,
            success: true,
            price: quote.regularMarketPrice,
            currency: quote.currency || 'INR',
            marketState: quote.marketState
          };
        } catch (error) {
          return {
            symbol: symbol,
            success: false,
            error: error.message
          };
        }
      })
    );

    const processedResults = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          symbol: symbols[index],
          success: false,
          error: 'Failed to fetch'
        };
      }
    });

    return NextResponse.json({
      success: true,
      results: processedResults
    });

  } catch (error) {
    console.error('Bulk stock price fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stock prices' },
      { status: 500 }
    );
  }
}