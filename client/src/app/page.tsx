"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import LeftSidebar from '../components/LeftSidebar'
import CentralDisplay from '../components/CentralPanel'
import RightSidebar from '../components/RightSidebar'

export default function Home() {
  const [selectedStock, setSelectedStock] = useState('AAPL')
  const [trackedStocks, setTrackedStocks] = useState(['AAPL', 'GOOGL', 'MSFT'])
  const [trackedPatterns, setTrackedPatterns] = useState(['Support', 'Resistance', 'Bullish Flag', 'Bearish Flag'])

  const handleTrackStock = (stock: string) => {
    setTrackedStocks(prev => [...new Set([...prev, stock])])
  }

  const handleUntrackStock = (stock: string) => {
    setTrackedStocks(prev => prev.filter(s => s !== stock))
  }

  const handleTogglePattern = (pattern: string) => {
    setTrackedPatterns(prev => 
      prev.includes(pattern) 
        ? prev.filter(p => p !== pattern) 
        : [...prev, pattern]
    )
  }

  return (
    <div className="flex h-screen p-4 gap-4 bg-[#0a0a0a]">
      <div className="w-1/5">
        <LeftSidebar 
          onSelectStock={setSelectedStock} 
          trackedStocks={trackedStocks}
          trackedPatterns={trackedPatterns}
          onTrackStock={handleTrackStock}
          onUntrackStock={handleUntrackStock}
          onTogglePattern={handleTogglePattern}
        />
      </div>
      <div className="w-3/5">
        <CentralDisplay 
          stockSymbol={selectedStock} 
          onTrackStock={handleTrackStock}
          onUntrackStock={handleUntrackStock}
          trackedStocks={trackedStocks}
          trackedPatterns={trackedPatterns}
        />
      </div>
      <div className="w-1/5">
        <RightSidebar />
      </div>
    </div>
  )
}

