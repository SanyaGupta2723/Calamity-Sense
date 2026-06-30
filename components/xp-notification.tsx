"use client"

import { useState, useEffect } from "react"
import { Star, Trophy, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface XPNotificationProps {
  points: number
  reason: string
  type?: "xp" | "achievement" | "level-up"
  onComplete?: () => void
}

export function XPNotification({ points, reason, type = "xp", onComplete }: XPNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onComplete?.(), 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  const getIcon = () => {
    switch (type) {
      case "achievement":
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case "level-up":
        return <Zap className="h-6 w-6 text-purple-500" />
      default:
        return <Star className="h-6 w-6 text-yellow-500" />
    }
  }

  const getColor = () => {
    switch (type) {
      case "achievement":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
      case "level-up":
        return "border-purple-500 bg-purple-50 dark:bg-purple-950"
      default:
        return "border-blue-500 bg-blue-50 dark:bg-blue-950"
    }
  }

  if (!isVisible) return null

  return (
    <Card
      className={`fixed bottom-4 right-4 w-80 z-50 border-l-4 ${getColor()} animate-in slide-in-from-bottom duration-300`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div className="flex-1">
            <p className="font-semibold">
              {type === "level-up" ? "Level Up!" : type === "achievement" ? "Achievement Unlocked!" : `+${points} XP`}
            </p>
            <p className="text-sm text-muted-foreground">{reason}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
