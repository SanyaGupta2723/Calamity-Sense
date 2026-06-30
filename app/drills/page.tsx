"use client"

import { useState } from "react"
import { Play, Clock, Users, Trophy, CheckCircle, AlertTriangle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Drill {
  id: string
  title: string
  description: string
  type: "Natural" | "Non-Natural" | "flood" | "cyclone" | "general"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  participants: number
  completed: boolean
  score?: number
  lastAttempt?: string
  scenarios: number
}

const drills: Drill[] = [
  {
    id: "earthquake-school-drill",
    title: "School Earthquake Drill",
    description: "Practice Drop, Cover, and Hold procedures in a classroom setting with evacuation routes.",
    type: "Natural",
    difficulty: "Beginner",
    duration: "10 min",
    participants: 1247,
    completed: true,
    score: 92,
    lastAttempt: "2 days ago",
    scenarios: 3,
  },
  {
    id: "fire-evacuation-drill",
    title: "Fire Evacuation Drill",
    description: "Navigate through smoke-filled corridors and practice proper evacuation procedures.",
    type: "Natural",
    difficulty: "Intermediate",
    duration: "15 min",
    participants: 892,
    completed: true,
    score: 87,
    lastAttempt: "1 week ago",
    scenarios: 4,
  },
  {
    id: "flood-response-drill",
    title: "Monsoon Flood Response",
    description: "Learn to respond to sudden flooding during school hours with proper safety measures.",
    type: "Natural",
    difficulty: "Advanced",
    duration: "20 min",
    participants: 634,
    completed: false,
    lastAttempt: "3 days ago",
    scenarios: 5,
  },
  {
    id: "cyclone-shelter-drill",
    title: "Cyclone Shelter Procedures",
    description: "Practice taking shelter during cyclone warnings and post-storm safety checks.",
    type: "Natural",
    difficulty: "Intermediate",
    duration: "18 min",
    participants: 423,
    completed: false,
    scenarios: 4,
  },
  {
    id: "multi-hazard-drill",
    title: "Multi-Hazard Emergency Response",
    description: "Advanced drill combining multiple disaster scenarios in sequence.",
    type: "Natural",
    difficulty: "Advanced",
    duration: "25 min",
    participants: 156,
    completed: false,
    scenarios: 6,
  },
  {
    id: "road-collapse-drill",
    title: "Road Collapse Response Drill",
    description: "Practice safe evacuation and emergency response steps when a road or ground surface suddenly collapses (sinkhole scenario).",
    type: "Non-Natural",
    difficulty: "Advanced",
    duration: "18 min",
    participants: 312,
    completed: false,
    score: 58,
    lastAttempt: "Not attempted",
    scenarios: 5,
  }
]

export default function DrillsPage() {
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredDrills = selectedType === "all" ? drills : drills.filter((drill) => drill.type === selectedType)

  const completedDrills = drills.filter((d) => d.completed).length
  const averageScore = Math.round(
    drills.filter((d) => d.score).reduce((acc, d) => acc + (d.score || 0), 0) / drills.filter((d) => d.score).length,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary  text-green-500 animate-pulse-glow" />
                <span className="font-semibold">CalamitySense</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">Virtual Drills</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild className="border-black hover:border-black hover:text-black">
                <Link href="/learn">Learning Modules</Link>
              </Button>
              <Button variant="outline" asChild className="border-black hover:border-black hover:text-black">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Virtual Emergency Drills</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Practice emergency procedures through interactive simulations and improve your disaster response skills.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{completedDrills}</p>
                    <p className="text-sm text-muted-foreground">Completed Drills</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">{averageScore}%</p>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">1.2K+</p>
                    <p className="text-sm text-muted-foreground">Total Participants</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{drills.length - completedDrills}</p>
                    <p className="text-sm text-muted-foreground">Available Drills</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Drill Type Filter */}
        <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-6">
          <TabsList className="flex justify-start gap-6">
            <TabsTrigger
              value="all"
              className={`w-48 py-2 text-sm font-medium rounded-md border ${
                selectedType === "all"
                  ? "border-green-500 text-green-600"
                  : "border-gray-400 text-gray-700"
              }`}
            >
              All Drills
            </TabsTrigger>

            <TabsTrigger
              value="Natural"
              className={`w-48 py-2 text-sm font-medium rounded-md border ${
                selectedType === "earthquake"
                  ? "border-green-500 text-green-600"
                  : "border-gray-400 text-gray-700"
              }`}
            >
              Natural
            </TabsTrigger>

            <TabsTrigger
              value="Non-Natural"
              className={`w-200 py-2 text-sm font-medium rounded-md border ${
                selectedType === "fire"
                  ? "border-green-500 text-green-600"
                  : "border-gray-400 text-gray-700"
              }`}
            >
              Non-Natural
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Drills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrills.map((drill) => (
            <Card key={drill.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{drill.title}</CardTitle>
                    <CardDescription className="text-sm">{drill.description}</CardDescription>
                  </div>
                  {drill.completed && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge
                    className={
                      drill.difficulty === "Beginner"
                        ? "!bg-green-800 !text-white"
                        : drill.difficulty === "Intermediate"
                          ? "!bg-blue-800 !text-white"
                          : "!bg-red-800 !text-white"
                    }
                  >
                    {drill.difficulty}
                  </Badge>

                  <Badge variant="outline" className="capitalize">
                    {drill.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {drill.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {drill.participants} participants
                    </div>
                  </div>

                  {/* Always show score & progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Last Score</span>
                      <span className="text-sm text-muted-foreground">
                        {drill.score !== undefined ? `${drill.score}%` : "64%"}
                      </span>
                    </div>
                    <Progress value={drill.score ?? 0} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {drill.lastAttempt ? `Completed ${drill.lastAttempt}` : "Not attempted"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{drill.scenarios} scenarios</span>
                    <Button asChild size="sm" className="bg-black text-white hover:bg-black active:bg-black">
                      <Link href={`/drills/${drill.id}`}>
                        {drill.completed ? "Practice Again" : "Start Drill"}
                        <Play className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrills.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No drills found</h3>
            <p className="text-muted-foreground">Try selecting a different category.</p>
          </div>
        )}

        {/* Quick Start Section */}
        <div className="mt-12 bg-muted/30 rounded-lg p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">New to Emergency Drills?</h3>
            <p className="text-muted-foreground mb-6">
              Start with our beginner-friendly earthquake drill to learn the basics of emergency response.
            </p>
            <Button asChild size="lg" className="bg-black text-white hover:bg-black/90">
              <Link href="/drills/earthquake-school-drill">
                <span>Start Your First Drill</span>
                <Play className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
