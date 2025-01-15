"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onTrackStock(searchTerm.toUpperCase())
      setSearchTerm('')
    }
  }

  return (
    <div className="h-full bg-[#121212] rounded-3xl p-6 overflow-hidden flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
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
            <motion.div
              key={stock}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-[#1e1e1e] rounded-lg p-2"
            >
              <button
                onClick={() => onSelectStock(stock)}
                className="text-cyan-300 hover:text-cyan-100 transition-colors duration-200"
              >
                {stock}
              </button>
              <button
                onClick={() => onUntrackStock(stock)}
                className="text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2 text-gray-300">Tracked Patterns</h3>
        <div className="space-y-2">
          {allPatterns.map((pattern) => (
            <div key={pattern} className="flex items-center">
              <input
                type="checkbox"
                id={pattern}
                checked={trackedPatterns.includes(pattern)}
                onChange={() => onTogglePattern(pattern)}
                className="mr-2 form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
              />
              <label htmlFor={pattern} className="text-gray-300 hover:text-white cursor-pointer">
                {pattern}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

