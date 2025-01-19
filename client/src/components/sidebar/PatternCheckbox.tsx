import { motion } from 'framer-motion'

interface PatternCheckboxProps {
  pattern: string
  checked: boolean
  onToggle: () => void
}

export default function PatternCheckbox({ pattern, checked, onToggle }: PatternCheckboxProps) {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={pattern}
          checked={checked}
          onChange={onToggle}
          className="peer h-5 w-5 appearance-none rounded-lg border-2
            border-gray-500/30 bg-[#1e1e1e] 
            checked:border-gray-400/30 checked:bg-white/[0.08]
            hover:border-gray-400/30 hover:cursor-pointer
            checked:hover:border-gray-300/30
            transition-colors duration-200"
        />
        <motion.svg
          initial={false}
          animate={{ 
            opacity: checked ? 1 : 0,
            scale: checked ? 1 : 0.8
          }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute h-5 w-5 p-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline 
            className="text-gray-300" 
            points="20 6 9 17 4 12"
          />
        </motion.svg>
      </div>
      <label 
        htmlFor={pattern} 
        className="ml-3 text-gray-400 hover:text-gray-300 cursor-pointer transition-colors duration-200"
      >
        {pattern}
      </label>
    </div>
  )
}