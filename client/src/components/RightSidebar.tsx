"use client"

import { AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { AlertCard, type Alert } from './AlertCard'

const alerts: Alert[] = [
  { type: 'Bull Flag Confirmation', stock: 'AAPL', time: '5 min ago', icon: TrendingUp, color: 'text-green-400' },
  { type: 'Bear Flag Confirmation', stock: 'GOOGL', time: '15 min ago', icon: TrendingDown, color: 'text-red-400' },
  { type: 'Volume Spike', stock: 'TSLA', time: '30 min ago', icon: AlertTriangle, color: 'text-yellow-400' },
]

export default function RightSidebar() {
  return (
    <div className="h-full bg-[#121212] rounded-3xl p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
        Live Alerts
      </h2>
      <div className="overflow-y-auto flex-1 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <AlertCard key={index} alert={alert} />
          ))}
        </div>
      </div>
    </div>
  )
}

