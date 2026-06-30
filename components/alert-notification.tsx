"use client"

import { useState } from "react"
import { AlertTriangle, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AlertNotificationProps {
  alert: {
    id: string
    type: string
    severity: "low" | "moderate" | "high" | "critical"
    title: string
    description: string
    timestamp: string
  }
  onDismiss: (id: string) => void
  onAcknowledge: (id: string) => void
}

export function AlertNotification({ alert, onDismiss, onAcknowledge }: AlertNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 bg-red-50 dark:bg-red-950"
      case "high":
        return "border-orange-500 bg-orange-50 dark:bg-orange-950"
      case "moderate":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
      case "low":
        return "border-blue-500 bg-blue-50 dark:bg-blue-950"
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-950"
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => onDismiss(alert.id), 300)
  }

  const handleAcknowledge = () => {
    onAcknowledge(alert.id)
    handleDismiss()
  }

  if (!isVisible) return null

  return (
    <Card
      className={`fixed top-4 right-4 w-96 z-50 border-l-4 ${getSeverityColor(alert.severity)} animate-in slide-in-from-right duration-300`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <Badge variant={alert.severity === "critical" ? "destructive" : "default"}>
              {alert.severity.toUpperCase()}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <h3 className="font-semibold mb-1">{alert.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleAcknowledge}>
            <CheckCircle className="h-4 w-4 mr-1" />
            Acknowledge
          </Button>
          <Button variant="outline" size="sm" onClick={handleDismiss}>
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
