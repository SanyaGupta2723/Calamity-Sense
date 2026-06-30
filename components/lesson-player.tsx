// components/LessonPlayer.tsx
"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface LessonPlayerProps {
  lesson: {
    id: string
    title: string
    type: "video" | "article" | "quiz" | "interactive"
    content: any
  }
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
}

export function LessonPlayer({ lesson, onComplete, onNext, onPrevious }: LessonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const handleComplete = () => {
    setProgress(100)
    onComplete()
  }

  // Handle Video Lessons
  if (lesson.type === "video") {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{lesson.title}</CardTitle>
            <Badge variant="secondary">Video</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
            <video 
              controls 
              className="w-full aspect-video rounded-lg"
            >
              <source src="/videos/lesson1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={onPrevious}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button onClick={handleComplete}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete
              </Button>
              <Button onClick={onNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Handle Article Lessons
  if (lesson.type === "article") {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{lesson.title}</CardTitle>
            <Badge variant="outline">Article</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none mb-6">
            <h3>Understanding India's Seismic Zones</h3>
            <p>
              India is divided into four seismic zones (II, III, IV, and V) based on the severity of earthquakes expected
              in different regions. Understanding your local seismic zone helps in better preparedness.
            </p>
            <h4>Zone V (Very High Risk)</h4>
            <p>
              Includes areas like Kashmir, parts of Himachal Pradesh, Uttarakhand, Gujarat, and the northeastern states.
              These regions can experience earthquakes of intensity IX or higher on the MSK scale.
            </p>
            <h4>Zone IV (High Risk)</h4>
            <p>
              Covers Delhi, northern parts of Bihar, Uttar Pradesh, and parts of Maharashtra. These areas may experience
              earthquakes of intensity VII to VIII.
            </p>
            <h4>Zone III (Moderate Risk)</h4>
            <p>
              Includes Kerala, Goa, parts of Karnataka, and central India. Earthquakes of intensity VI to VII are
              possible.
            </p>
            <h4>Zone II (Low Risk)</h4>
            <p>
              Covers parts of Rajasthan, Madhya Pradesh, and southern India. These areas typically experience earthquakes
              of intensity V or lower.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleComplete}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Read
            </Button>
            <Button onClick={onNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Handle Interactive Lessons
  if (lesson.type === "interactive") {
    // ... (This section remains unchanged from your previous code)
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{lesson.title}</CardTitle>
            <Badge variant="default">Interactive</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-8 mb-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Drop, Cover, and Hold Practice</h3>
              <p className="text-muted-foreground mb-6">
                Practice the earthquake safety technique by following the interactive steps below.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    currentStep >= 0 ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <h4 className="font-semibold mb-2">1. DROP</h4>
                  <p className="text-sm text-muted-foreground">Drop to your hands and knees immediately</p>
                </div>
                <div
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    currentStep >= 1 ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <h4 className="font-semibold mb-2">2. COVER</h4>
                  <p className="text-sm text-muted-foreground">Take cover under a desk or table</p>
                </div>
                <div
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    currentStep >= 2 ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <h4 className="font-semibold mb-2">3. HOLD</h4>
                  <p className="text-sm text-muted-foreground">Hold on to your shelter and protect your head</p>
                </div>
              </div>

              <Button
                onClick={() => {
                  if (currentStep < 2) {
                    setCurrentStep(currentStep + 1)
                    setProgress((currentStep + 1) * 33.33)
                  } else {
                    handleComplete()
                  }
                }}
                className="mb-4"
              >
                {currentStep < 2 ? `Practice Step ${currentStep + 1}` : "Complete Practice"}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentStep(0)
                setProgress(0)
              }}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart
            </Button>
            <Button onClick={onNext} disabled={progress < 100}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Fallback for unknown types
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">Lesson Type Not Supported</h3>
      <p className="text-gray-500">
        The lesson type '{lesson.type}' is not currently supported.
      </p>
    </div>
  )
}