"use client"

import { useEffect, useState } from "react"
import { Shield, AlertTriangle, BookOpen, Trophy } from "lucide-react"

export function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const elements = [
    { Icon: Shield, color: "text-orange-400", delay: "0s" },
    { Icon: AlertTriangle, color: "text-red-400", delay: "1s" },
    { Icon: BookOpen, color: "text-cyan-400", delay: "2s" },
    { Icon: Trophy, color: "text-purple-400", delay: "3s" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map(({ Icon, color, delay }, index) => (
        <div
          key={index}
          className={`absolute ${color} opacity-10`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: delay,
          }}
        >
          <Icon className="h-12 w-12 animate-float" />
        </div>
      ))}
    </div>
  )
}
