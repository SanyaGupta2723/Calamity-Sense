"use client"

import { useState } from "react"
import { BookOpen, CheckCircle, Clock, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Module {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  completed: boolean
  category: "earthquake" | "flood" | "fire" | "cyclone" | "general"
  lessons: number
  rating: number
}

const modules: Module[] = [
  {
    id: "earthquake-basics",
    title: "Earthquake Safety Fundamentals",
    description: "Learn the basics of earthquake preparedness, including Drop, Cover, and Hold techniques.",
    duration: "25 min",
    difficulty: "Beginner",
    progress: 100,
    completed: true,
    category: "earthquake",
    lessons: 5,
    rating: 4.8,
  },
  {
    id: "flood-response",
    title: "Flood Emergency Response",
    description: "Understanding flood risks in India and proper evacuation procedures.",
    duration: "30 min",
    difficulty: "Intermediate",
    progress: 60,
    completed: false,
    category: "flood",
    lessons: 6,
    rating: 4.7,
  },
  {
    id: "fire-safety",
    title: "Fire Safety in Schools",
    description: "Fire prevention, detection, and evacuation strategies for educational institutions.",
    duration: "20 min",
    difficulty: "Beginner",
    progress: 0,
    completed: false,
    category: "fire",
    lessons: 4,
    rating: 4.9,
  },
  {
    id: "cyclone-preparedness",
    title: "Cyclone Preparedness for Coastal Regions",
    description: "Special focus on cyclone safety for schools in coastal areas of India.",
    duration: "35 min",
    difficulty: "Advanced",
    progress: 0,
    completed: false,
    category: "cyclone",
    lessons: 7,
    rating: 4.6,
  },
  {
    id: "first-aid-basics",
    title: "Emergency First Aid",
    description: "Essential first aid skills every student and teacher should know.",
    duration: "40 min",
    difficulty: "Intermediate",
    progress: 25,
    completed: false,
    category: "general",
    lessons: 8,
    rating: 4.8,
  },
]

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredModules =
    selectedCategory === "all" ? modules : modules.filter((module) => module.category === selectedCategory)

  const completedModules = modules.filter((m) => m.completed).length
  const totalProgress = Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-semibold">CalamitySense</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">Learning Modules</span>
            </div>
            <Button asChild className="border-black bg-black text-white hover:bg-gray-800 hover:text-white">
  <Link href="/dashboard">Dashboard</Link>
</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Learning Modules</h1>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{completedModules}</p>
                    <p className="text-sm text-muted-foreground">Completed Modules</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{modules.length - completedModules}</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">{totalProgress}%</p>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Learning Progress</span>
              <span className="text-sm text-muted-foreground">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </div>
        </div>

        {/* Category Filter */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
  <TabsList className="grid w-full grid-cols-6 gap-2">
    <TabsTrigger value="all" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
      All
    </TabsTrigger>
    <TabsTrigger value="earthquake" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
      Earthquake
    </TabsTrigger>
    <TabsTrigger value="flood" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
      Flood
    </TabsTrigger>
    <TabsTrigger value="fire" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
      Fire
    </TabsTrigger>
    <TabsTrigger value="cyclone" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
      Cyclone
    </TabsTrigger>
    <TabsTrigger value="general" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
      General
    </TabsTrigger>
  </TabsList>
</Tabs>


        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{module.title}</CardTitle>
                    <CardDescription className="text-sm">{module.description}</CardDescription>
                  </div>
                  {module.completed && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />}
                </div>
                <div className="flex items-center gap-2 mt-3">
                 <Badge
  variant={
    module.difficulty === "Beginner"
      ? "secondary"
      : module.difficulty === "Intermediate"
        ? "default"
        : "destructive"
  }
  className={
    module.difficulty === "Beginner"
      ? "bg-green-100 text-green-800"
      : module.difficulty === "Intermediate"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800"
  }
>
  {module.difficulty}
</Badge>

                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{module.duration}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{module.lessons} lessons</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{module.progress}%</span>
                    </div>
                    <Progress 
  value={module.progress} 
  className="h-2 rounded-full bg-gray-200 [&>div]:bg-green-600 [&>div]:rounded-full" 
/>

                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{module.rating}</span>
                    </div>
                    <Button asChild size="sm" className="bg-black text-white hover:bg-black">
  <Link href={`/learn/${module.id}`}>
    {module.progress > 0 ? "Continue" : "Start"}
    <ArrowRight className="h-4 w-4 ml-1" />
  </Link>
</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No modules found</h3>
            <p className="text-muted-foreground">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
