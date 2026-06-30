"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Play, RotateCcw, CheckCircle, Clock, AlertTriangle, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useParams } from "next/navigation"

interface DrillScenario {
  id: string
  title: string
  description: string
  timeLimit: number
  actions: DrillAction[]
}

interface DrillAction {
  id: string
  text: string
  correct: boolean
  feedback: string
  points: number
}

interface DrillData {
  id: string
  title: string
  description: string
  type: string
  difficulty: string
  duration: string
  scenarios: DrillScenario[]
  instructions: string[]
}

const drillData: Record<string, DrillData> = {
  "earthquake-school-drill": {
    id: "earthquake-school-drill",
    title: "School Earthquake Drill",
    description: "Practice Drop, Cover, and Hold procedures in a classroom setting with evacuation routes.",
    type: "earthquake",
    difficulty: "Beginner",
    duration: "10 minutes",
    instructions: [
      "Follow the Drop, Cover, and Hold technique when shaking starts",
      "Stay calm and listen to your teacher's instructions",
      "Wait for the 'all clear' signal before evacuating",
      "Walk, don't run, to the designated assembly area",
      "Stay with your class and wait for attendance check",
    ],
    scenarios: [
      {
        id: "classroom-shake",
        title: "Earthquake Starts in Classroom",
        description: "You're in your classroom when you feel the ground shaking. What do you do first?",
        timeLimit: 15,
        actions: [
          {
            id: "drop-cover",
            text: "Immediately drop to hands and knees, take cover under desk",
            correct: true,
            feedback: "Excellent! Drop, Cover, and Hold is the correct first response.",
            points: 100,
          },
          {
            id: "run-outside",
            text: "Run outside immediately",
            correct: false,
            feedback: "Never run during shaking. You could fall or be hit by falling objects.",
            points: 0,
          },
          {
            id: "stand-doorway",
            text: "Stand in the doorway",
            correct: false,
            feedback: "Doorways are not safer than other locations. Take cover under a desk instead.",
            points: 20,
          },
        ],
      },
      {
        id: "evacuation-time",
        title: "Evacuation Decision",
        description: "The shaking has stopped. Your teacher gives the evacuation signal. What's your next step?",
        timeLimit: 20,
        actions: [
          {
            id: "walk-calmly",
            text: "Walk calmly to the nearest exit following evacuation route",
            correct: true,
            feedback: "Perfect! Always walk, never run during evacuation.",
            points: 100,
          },
          {
            id: "grab-belongings",
            text: "Quickly grab your bag and then evacuate",
            correct: false,
            feedback: "Don't waste time collecting belongings. Your safety is more important.",
            points: 10,
          },
          {
            id: "help-others",
            text: "Help injured classmates first, then evacuate",
            correct: false,
            feedback: "Alert teachers to injured students, but don't delay your own evacuation unless trained.",
            points: 30,
          },
        ],
      },
      {
        id: "assembly-area",
        title: "At Assembly Area",
        description: "You've reached the assembly area. What should you do now?",
        timeLimit: 15,
        actions: [
          {
            id: "stay-with-class",
            text: "Stay with your class and wait for attendance check",
            correct: true,
            feedback: "Correct! Staying organized helps teachers account for everyone's safety.",
            points: 100,
          },
          {
            id: "call-parents",
            text: "Immediately call your parents",
            correct: false,
            feedback: "Wait for official instructions. Phone lines may be needed for emergency services.",
            points: 20,
          },
          {
            id: "go-home",
            text: "Leave to go home if you live nearby",
            correct: false,
            feedback: "Never leave without permission. Teachers need to account for all students.",
            points: 0,
          },
        ],
      },
    ],
  },
}

export default function DrillPage() {
  const params = useParams()
  const drillId = params.drillId as string
  const drill = drillData[drillId]

  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [drillCompleted, setDrillCompleted] = useState(false)

  useEffect(() => {
    if (drill && currentScenario < drill.scenarios.length) {
      setTimeLeft(drill.scenarios[currentScenario].timeLimit)
      setIsActive(false)
      setSelectedAction(null)
      setShowFeedback(false)
    }
  }, [currentScenario, drill])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      if (!selectedAction) {
        setShowFeedback(true)
      }
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, selectedAction])

  if (!drill) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Drill Not Found</h1>
          <Button asChild>
            <Link href="/drills">Back to Drills</Link>
          </Button>
        </div>
      </div>
    )
  }

  const startScenario = () => {
    setIsActive(true)
    setTimeLeft(drill.scenarios[currentScenario].timeLimit)
  }

  const selectAction = (actionId: string) => {
    if (!isActive || selectedAction) return

    setSelectedAction(actionId)
    setIsActive(false)
    setShowFeedback(true)

    const action = drill.scenarios[currentScenario].actions.find((a) => a.id === actionId)
    if (action) {
      setScore((prev) => prev + action.points)
    }
  }

  const nextScenario = () => {
    if (currentScenario < drill.scenarios.length - 1) {
      setCurrentScenario((prev) => prev + 1)
    } else {
      setDrillCompleted(true)
    }
  }

  const restartDrill = () => {
    setCurrentScenario(0)
    setScore(0)
    setDrillCompleted(false)
    setSelectedAction(null)
    setShowFeedback(false)
    setIsActive(false)
  }

  const currentScenarioData = drill.scenarios[currentScenario]
  const progress = ((currentScenario + (showFeedback ? 1 : 0)) / drill.scenarios.length) * 100

  if (drillCompleted) {
    const finalScore = Math.round((score / (drill.scenarios.length * 100)) * 100)
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" size="sm" asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/drills">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Drills
              </Link>
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4">Drill Completed!</h1>
              <p className="text-muted-foreground text-lg">You've successfully completed the {drill.title}</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Your Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">{finalScore}%</div>
                  <p className="text-muted-foreground">Overall Score</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Scenarios Completed</span>
                    <span className="font-medium">
                      {drill.scenarios.length}/{drill.scenarios.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points Earned</span>
                    <span className="font-medium">
                      {score}/{drill.scenarios.length * 100}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button onClick={restartDrill} variant="outline" className="bg-black text-white hover:bg-gray-800">
                <RotateCcw className="h-4 w-4 mr-2" />
                Practice Again
              </Button>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="/drills">More Drills</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/drills">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Drills
              </Link>
            </Button>
            <div className="flex items-center gap-4">
              <Badge variant="outline">{drill.type}</Badge>
              <Badge variant="secondary">{drill.difficulty}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Drill Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{drill.title}</h1>
            <p className="text-muted-foreground text-lg mb-6">{drill.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Timer className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{drill.duration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Scenarios</p>
                      <p className="text-sm text-muted-foreground">{drill.scenarios.length} situations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Score</p>
                      <p className="text-sm text-muted-foreground">{score} points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  Scenario {currentScenario + 1} of {drill.scenarios.length}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </div>

          {/* Current Scenario */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{currentScenarioData.title}</CardTitle>
                {isActive && (
                  <div className="flex items-center gap-2 text-primary">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono text-lg">{timeLeft}s</span>
                  </div>
                )}
              </div>
              <CardDescription>{currentScenarioData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {!isActive && !showFeedback && (
                <div className="text-center py-8">
                  <Button onClick={startScenario} size="lg" className="bg-black text-white hover:bg-gray-800">
                    <Play className="h-5 w-5 mr-2" />
                    Start Scenario
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    You have {currentScenarioData.timeLimit} seconds to respond
                  </p>
                </div>
              )}

              {isActive && (
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>Choose your response quickly! Time is running out.</AlertDescription>
                  </Alert>

                  <div className="grid gap-3">
                    {currentScenarioData.actions.map((action) => (
                      <Button
                        key={action.id}
                        className="bg-black text-white hover:bg-gray-800 p-4 h-auto text-left justify-start"
                        onClick={() => selectAction(action.id)}
                        disabled={!!selectedAction}
                      >
                        {action.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {showFeedback && (
                <div className="space-y-4">
                  {selectedAction ? (
                    <>
                      {currentScenarioData.actions.map((action) => (
                        <div
                          key={action.id}
                          className={`p-4 rounded-lg border-2 ${
                            action.id === selectedAction
                              ? action.correct
                                ? "border-green-500 bg-green-50 dark:bg-green-950"
                                : "border-red-500 bg-red-50 dark:bg-red-950"
                              : action.correct
                              ? "border-green-500 bg-green-50 dark:bg-green-950"
                              : "border-border bg-muted"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {action.correct ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium mb-1">{action.text}</p>
                              <p className="text-sm text-muted-foreground">{action.feedback}</p>
                              {action.id === selectedAction && (
                                <p className="text-sm font-medium mt-2">Points earned: {action.points}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Time's up! You didn't select a response in time. In a real emergency, quick decision-making is
                        crucial.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-center pt-4">
                    <Button onClick={nextScenario} className="bg-black text-white hover:bg-gray-800">
                      {currentScenario < drill.scenarios.length - 1 ? "Next Scenario" : "Complete Drill"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          {!isActive && !showFeedback && (
            <Card>
              <CardHeader>
                <CardTitle>Safety Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {drill.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}