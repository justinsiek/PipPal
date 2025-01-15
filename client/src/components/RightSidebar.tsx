"use client"

import { AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react'

const alerts = [
  { type: 'Bullish Breakout', stock: 'AAPL', time: '5 min ago', icon: TrendingUp, color: 'text-green-400' },
  { type: 'Bearish Pattern', stock: 'GOOGL', time: '15 min ago', icon: TrendingDown, color: 'text-red-400' },
  { type: 'Volume Spike', stock: 'TSLA', time: '30 min ago', icon: AlertTriangle, color: 'text-yellow-400' },
  { type: 'Moving Average Crossover', stock: 'AMZN', time: '1 hour ago', icon: Activity, color: 'text-blue-400' },
]

export default function RightSidebar() {
  return (
    <div className="h-full bg-[#121212] rounded-3xl p-6 overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
        Live Alerts
      </h2>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] rounded-xl p-4 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-colors duration-200"
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
        ))}
      </div>
    </div>
  )
}

