interface StockInfoCardProps {
  title: string;
  value: string;
  change?: string;
}

export default function StockInfoCard({ title, value, change }: StockInfoCardProps) {
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