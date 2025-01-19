import { motion } from 'framer-motion';

interface StockInfoCardProps {
  title: string;
  value: string;
  change?: string;
}

export default function StockInfoCard({ title, value, change }: StockInfoCardProps) {
  return (
    <div className="flex flex-col justify-between bg-white/5 backdrop-blur-sm border border-white/[0.05] 
      transition-all duration-200 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white/90">{value}</span>
        {change && (
          <motion.span 
            initial={false}
            animate={{ 
              scale: [1, 1.05, 1],
              transition: { duration: 0.2 }
            }}
            className={`text-sm font-medium px-2 py-1 rounded-lg
              ${change.startsWith('+') 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
          >
            {change}
          </motion.span>
        )}
      </div>
    </div>
  )
} 