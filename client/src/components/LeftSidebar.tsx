"use client"

import { useState } from 'react'
import Logo from './sidebar/Logo'
import SearchForm from './sidebar/SearchForm'
import TrackedStocksList from './sidebar/TrackedStocksList'
import TrackedPatterns from './sidebar/TrackedPatterns'

const allPatterns = [
  'Support', 'Resistance', 'Bullish Flag', 'Bearish Flag', 'Volume Spike'
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
      onSelectStock(searchTerm.toUpperCase())
      setSearchTerm('')
    }
  }

  return (
    <div className="h-full bg-[#121212] rounded-3xl p-6 overflow-hidden flex flex-col">
      <Logo />
      <SearchForm 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmit={handleSearch}
      />
      <TrackedStocksList 
        stocks={trackedStocks}
        onSelectStock={onSelectStock}
        onUntrackStock={onUntrackStock}
      />
      <TrackedPatterns 
        patterns={allPatterns}
        trackedPatterns={trackedPatterns}
        isExpanded={isExpanded}
        onToggleExpanded={() => setIsExpanded(!isExpanded)}
        onTogglePattern={onTogglePattern}
      />
    </div>
  )
}