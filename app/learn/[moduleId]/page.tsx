"use client"
import { ArrowLeft, ArrowRight, BookOpen, Play, CheckCircle, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Lesson {
  id: string
  title: string
  type: "video" | "article" | "quiz" | "interactive"
  duration: string
  completed: boolean
}

interface ModuleData {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  duration: string
  lessons: Lesson[]
  objectives: string[]
  prerequisites: string[]
}

const moduleData: Record<string, ModuleData> = {
  "earthquake-basics": {
    id: "earthquake-basics",
    title: "Earthquake Safety Fundamentals",
    description:
      "Learn the basics of earthquake preparedness, including Drop, Cover, and Hold techniques specific to Indian seismic zones.",
    category: "Earthquake Safety",
    difficulty: "Beginner",
    duration: "25 minutes",
    objectives: [
      "Fire Safety Basics",
      "Recognizing Alarm Signals",
      "Evacuation Procedure",
      "Evacuation Routes & Exits",
      "Orderly Movement",
    ],
    prerequisites: ["Basic understanding of natural disasters"],
    lessons: [
      {
        id: "Intro",
        title: "Fire Evacuation Startegy",
        type: "video",
        duration: "5 min",
        completed: true,
      },
      
      
      
    ],
  },
  "flood-response": {
    id: "flood-response",
    title: "Flood Emergency Response",
    description: "Understanding flood risks in India and proper evacuation procedures for monsoon-related flooding.",
    category: "Flood Safety",
    difficulty: "Intermediate",
    duration: "30 minutes",
    objectives: [
      "Understand monsoon patterns and flood risks in India",
      "Learn flood warning signs and early detection",
      "Master evacuation procedures and routes",
      "Practice water safety techniques",
      "Understand post-flood health and safety measures",
    ],
    prerequisites: ["Basic emergency response knowledge"],
    lessons: [
      {
        id: "monsoon-floods",
        title: "Monsoon and Flood Patterns in India",
        type: "video",
        duration: "6 min",
        completed: true,
      },
      {
        id: "flood-warnings",
        title: "Recognizing Flood Warning Signs",
        type: "article",
        duration: "5 min",
        completed: true,
      },
      {
        id: "evacuation-procedures",
        title: "School Evacuation During Floods",
        type: "interactive",
        duration: "10 min",
        completed: true,
      },
      {
        id: "water-safety",
        title: "Water Safety and Rescue Basics",
        type: "video",
        duration: "7 min",
        completed: false,
      },
      {
        id: "post-flood-safety",
        title: "Post-Flood Health and Safety",
        type: "article",
        duration: "4 min",
        completed: false,
      },
      {
        id: "flood-quiz",
        title: "Flood Response Assessment",
        type: "quiz",
        duration: "3 min",
        completed: false,
      },
    ],
  },
}

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.moduleId as string
  const module = moduleData[moduleId]

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <Button asChild>
            <Link href="/learn">Back to Learning</Link>
          </Button>
        </div>
      </div>
    )
  }

  const completedLessons = module.lessons.filter((lesson) => lesson.completed).length
  const progress = Math.round((completedLessons / module.lessons.length) * 100)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button asChild className="bg-black text-white hover:bg-gray-800" size="sm">
  <Link href="/learn">
    <ArrowLeft className="h-4 w-4 mr-2" />
    Back to Learning
  </Link>
</Button>

            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">{module.title}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Module Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{module.category}</Badge>
                <Badge variant="outline">{module.difficulty}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {module.duration}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{module.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{module.description}</p>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {completedLessons} of {module.lessons.length} lessons completed
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
            </div>

            {/* Lessons List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Lessons</h2>
              {module.lessons.map((lesson, index) => (
                <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                          {lesson.completed ? <CheckCircle className="h-5 w-5 text-green-500" /> : index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {lesson.type}
                            </Badge>
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Button
  asChild
  size="sm"
  className={
    module.category === "Earthquake Safety"
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-white text-black border border-black hover:bg-gray-100"
  }
>
  <Link href={`/lesson/${lesson.id}`}>
    {lesson.completed ? "Review" : "Start"}
    <Play className="h-4 w-4 ml-1" />
  </Link>
</Button>





                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {module.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {module.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {prerequisite}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
  <CardHeader>
    <CardTitle className="text-lg">Quick Actions</CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">
    <Button className="w-full bg-black text-white hover:bg-gray-800" size="sm">
      <Play className="h-4 w-4 mr-2" />
      Continue Learning
    </Button>

    <Button className="w-full bg-black text-white hover:bg-gray-800" size="sm">
      <Users className="h-4 w-4 mr-2" />
      Join Study Group
    </Button>

    <Button asChild className="w-full bg-black text-white hover:bg-gray-800" size="sm">
      <Link href="/drills">
        Practice Drill
        <ArrowRight className="h-4 w-4 ml-2" />
      </Link>
    </Button>
  </CardContent>
</Card>

          </div>
        </div>
      </div>
    </div>
  )
}
