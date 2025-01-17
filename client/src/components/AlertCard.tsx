import { LucideIcon } from 'lucide-react'

export type Alert = {
  type: string
  stock: string
  time: string
  icon: LucideIcon
  color: string
}

export function AlertCard({ alert }: { alert: Alert }) {
  return (
    <div
      className="bg-[#1e1e1e] rounded-xl px-4 py-3 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-colors duration-200"
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-medium ${alert.color}`}>
          {alert.type}
        </span>
        <alert.icon className={`h-5 w-5 ${alert.color}`} />
      </div>
      <div className="text-xl font-bold mb-1 text-white">{alert.stock}</div>
      <p className="text-sm text-gray-400">{alert.time}</p>
    </div>
  )
}