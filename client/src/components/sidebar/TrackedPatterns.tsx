import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import PatternCheckbox from './PatternCheckbox'

interface TrackedPatternsProps {
  patterns: string[]
  trackedPatterns: string[]
  isExpanded: boolean
  onToggleExpanded: () => void
  onTogglePattern: (pattern: string) => void
}

export default function TrackedPatterns({ 
  patterns,
  trackedPatterns,
  isExpanded,
  onToggleExpanded,
  onTogglePattern
}: TrackedPatternsProps) {
  return (
    <div className="flex-grow overflow-y-auto">
      <button
        onClick={onToggleExpanded}
        className="flex items-center justify-between w-full text-lg font-semibold mb-2 text-gray-300 hover:text-white transition-colors duration-200"
      >
        <span>Indicators</span>
        <ChevronDown 
          className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </button>
      <motion.div 
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.15 }}
        className="space-y-2 overflow-hidden"
      >
        {patterns.map((pattern) => (
          <PatternCheckbox
            key={pattern}
            pattern={pattern}
            checked={trackedPatterns.includes(pattern)}
            onToggle={() => onTogglePattern(pattern)}
          />
        ))}
      </motion.div>
    </div>
  )
}