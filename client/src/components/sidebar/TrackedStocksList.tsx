import { X } from 'lucide-react'

interface TrackedStocksListProps {
  stocks: string[]
  onSelectStock: (stock: string) => void
  onUntrackStock: (stock: string) => void
}

export default function TrackedStocksList({ stocks, onSelectStock, onUntrackStock }: TrackedStocksListProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-300">Tracked Stocks</h3>
      <div className="space-y-2">
        {stocks.map((stock) => (
          <div
            onClick={() => onSelectStock(stock)}
            key={stock}
            className="group flex items-center justify-between bg-white/5 hover:bg-white/[0.07] rounded-xl p-3 border border-white/[0.05] transition-all duration-200 cursor-pointer"
          >
            <button className="text-white/90 group-hover:text-gray-400 transition-colors duration-200 font-medium">
              {stock}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onUntrackStock(stock)
              }}
              className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}