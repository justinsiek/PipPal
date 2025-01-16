"use client"

import { useState, useEffect } from 'react'
import CandlestickChart from './CandlestickChart'

const generateMockData = (symbol: string) => {
  const data = []
  const startDate = new Date('2023-01-01')
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
    const open = Math.random() * 100 + 50
    const close = Math.random() * 100 + 50
    data.push({
      date: date.toISOString().split('T')[0],
      open,
      high: Math.max(open, close) + Math.random() * 10,
      low: Math.min(open, close) - Math.random() * 10,
      close,
    })
  }
  return data
}

export default function CentralDisplay({ stockSymbol }: { stockSymbol: string }) {
  const [data, setData] = useState(generateMockData(stockSymbol))

  useEffect(() => {
    setData(generateMockData(stockSymbol))
  }, [stockSymbol])

  return (
    <div className="h-full bg-[#121212] rounded-3xl p-6 flex flex-col">
      <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
        {stockSymbol}
      </h2>
      <div className="flex-grow flex flex-col">
        <div className="h-1/2 w-full mb-4">
          <CandlestickChart ticker={stockSymbol} />
        </div>
        <div className="h-1/2 grid grid-cols-3 gap-4">
          <StockInfoCard title="Market Cap" value="$2.53T" change="+1.2%" />
          <StockInfoCard title="P/E Ratio" value="28.92" change="-0.5%" />
          <StockInfoCard title="EPS (TTM)" value="6.42" change="+12.3%" />
          <StockInfoCard title="Volume" value="52.3M" change="+23.4%" />
          <StockInfoCard title="Dividend Yield" value="0.53%" change="+0.1%" />
          <StockInfoCard title="Beta" value="1.12" />
          <StockInfoCard title="52 Week Range" value="$124.17 - $198.23" />
          <StockInfoCard title="Avg Volume" value="78.5M" />
          <StockInfoCard title="Price/Book" value="15.23" change="-0.8%" />
        </div>
      </div>
    </div>
  )
}

function StockInfoCard({ title, value, change }: { title: string; value: string; change?: string }) {
  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change && (
          <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  )
}

