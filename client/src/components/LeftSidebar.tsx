"use client"

import { useState } from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

const allPatterns = [
  'Bullish Flag', 'Bearish Flag', 'Double Top', 'Double Bottom',
  'Head and Shoulders', 'Inverse Head and Shoulders', 'Triangle',
  'Wedge', 'Cup and Handle', 'Rounding Bottom'
]

interface LeftSidebarProps {
  onSelectStock: (stock: string) => void
  trackedStocks: string[]
  trackedPatterns: string[]
  onTrackStock: (stock: string) => void
  onUntrackStock: (stock: string) => void
  onTogglePattern: (pattern: string) => void
}

export default function LeftSidebar({
  onSelectStock,
  trackedStocks,
  trackedPatterns,
  onTrackStock,
  onUntrackStock,
  onTogglePattern
}: LeftSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isExpanded, setIsExpanded] = useState(true)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onTrackStock(searchTerm.toUpperCase())
      setSearchTerm('')
    }
  }

  return (
    <div className="h-full bg-[#121212] rounded-3xl p-6 overflow-hidden flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        PipPal
      </h2>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search and track stocks..."
            className="w-full bg-[#1e1e1e] text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </form>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-300">Tracked Stocks</h3>
        <div className="space-y-2">
        {trackedStocks.map((stock) => (
            <div
              onClick={() => onSelectStock(stock)}
              key={stock}
              className="group flex items-center justify-between bg-white/5 hover:bg-white/[0.07] rounded-xl p-3 border border-white/[0.05] transition-all duration-200 cursor-pointer"
            >
              <button
                className="text-white/90 group-hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                {stock}
              </button>
              <button
                onClick={() => onUntrackStock(stock)}
                className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-lg font-semibold mb-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          <span>Tracked Patterns</span>
          <ChevronDown className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} size={20} />
        </button>
        <motion.div 
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-2 overflow-hidden"
        >
          {allPatterns.map((pattern) => (
            <div key={pattern} className="flex items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id={pattern}
                  checked={trackedPatterns.includes(pattern)}
                  onChange={() => onTogglePattern(pattern)}
                  className="peer h-4 w-4 appearance-none rounded-sm border 
                    border-purple-500 bg-[#1e1e1e] checked:border-purple-500 checked:bg-purple-500 hover:cursor-pointer opacity-75"
                />
                <svg
                  className="pointer-events-none absolute h-4 w-4 hidden peer-checked:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <label htmlFor={pattern} className="ml-2 text-gray-300 hover:text-white cursor-pointer">
                {pattern}
              </label>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

