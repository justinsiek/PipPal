"use client"

import { useState, useEffect } from 'react'
import CandlestickChart from './CandlestickChart'
import { TrendingUp, TrendingDown } from 'lucide-react'
import StockInfoCard from './StockInfoCard'

interface CentralDisplayProps {
  stockSymbol: string;
  onTrackStock: (stock: string) => void;
  onUntrackStock: (stock: string) => void;
  trackedStocks: string[];
  trackedPatterns: string[];
}

export default function CentralDisplay({ 
  stockSymbol, 
  onTrackStock, 
  onUntrackStock,
  trackedStocks,
  trackedPatterns
}: CentralDisplayProps) {
  const [stockPrice, setStockPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [candlestickData, setCandlestickData] = useState([]);
  
  const [trendlines, setTrendlines] = useState<{
    support: { slope: number; intercept: number };
    resistance: { slope: number; intercept: number };
  } | undefined>(undefined);

  const [visibleTrendlines, setVisibleTrendlines] = useState<{
    support: boolean;
    resistance: boolean;
  }>(() => ({
    support: trackedPatterns.includes('Support'),
    resistance: trackedPatterns.includes('Resistance'),
  }));

  const isTracked = trackedStocks.includes(stockSymbol);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/stock-data?ticker=${stockSymbol}`);
        const data = await response.json();
        setStockPrice(data.currentPrice);
        setPriceChange(data.changePercent);
        setCandlestickData(data.candlestickData);
        setTrendlines(data.trendlines);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
    // Refresh data every minute
    const interval = setInterval(fetchStockData, 60000);
    return () => clearInterval(interval);
  }, [stockSymbol]);

  useEffect(() => {
    setVisibleTrendlines({
      support: trackedPatterns.includes('Support'),
      resistance: trackedPatterns.includes('Resistance'),
    });
  }, [trackedPatterns]);

  const handleTrackClick = () => {
    if (isTracked) {
      onUntrackStock(stockSymbol);
    } else {
      onTrackStock(stockSymbol);
    }
  };

  return (
    <div className="h-full bg-[#121212] rounded-3xl p-6 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold mb-2 text-white">
          {stockSymbol}
        </h2>
        <button 
          onClick={handleTrackClick}
          className={`
            px-4 py-2 rounded-xl font-medium
            backdrop-blur-sm border transition-all duration-200
            ${isTracked 
              ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30' 
              : 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20 hover:border-green-500/30'
            }
          `}
        >
          {isTracked ? 'Untrack' : 'Track'}
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold text-white">
          ${stockPrice?.toFixed(2) || '---'}
        </span>
        <span className={`flex items-center ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'} text-sm font-medium`}>
          {priceChange >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
          {priceChange >= 0 ? '+' : ''}{priceChange}%
        </span>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="h-1/2 w-full mb-4">
        <CandlestickChart 
          data={candlestickData} 
          trendlines={trendlines}
          visibleTrendlines={visibleTrendlines}
        />
        </div>
        <div className="h-1/2 grid grid-cols-3 gap-4">
          <StockInfoCard title="RSI (14)" value="65.32" change="+2.1%" />
          <StockInfoCard title="VWAP" value="$425.87" change="-0.14%" />
          <StockInfoCard title="ATR" value="3.42" change="+0.8%" />
          <StockInfoCard title="Volume" value="52.3M" change="+23.4%" />
          <StockInfoCard title="Bid/Ask Spread" value="$0.02" />
          <StockInfoCard title="20-Day SMA" value="$422.14" change="+0.8%" />
          <StockInfoCard title="Day Range" value="$421.33 - $427.85" />
          <StockInfoCard title="Level 2 Depth" value="12.5M" />
          <StockInfoCard title="Volume/MA Ratio" value="1.23" change="+15.2%" />
        </div>
      </div>
    </div>
  )
}

