"use client"

import { useState } from "react"
import { BookOpen, Trophy, Users, Calendar, Target, TrendingUp, Star, Zap, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProgressRing } from "@/components/progress-ring"
import Link from "next/link"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  progress?: number
}

interface RecentActivity {
  id: string
  type: "module" | "drill" | "achievement"
  title: string
  description: string
  timestamp: string
  score?: number
  xp?: number
}

const achievements: Achievement[] = [
  {
    id: "first-module",
    title: "First Steps",
    description: "Complete your first learning module",
    icon: "🎯",
    earned: true,
  },
  {
    id: "earthquake-expert",
    title: "Earthquake Expert",
    description: "Master all earthquake safety modules",
    icon: "🏆",
    earned: true,
  },
  {
    id: "drill-master",
    title: "Drill Master",
    description: "Complete 5 virtual drills with 90+ score",
    icon: "⚡",
    earned: false,
    progress: 60,
  },
  {
    id: "community-helper",
    title: "Community Helper",
    description: "Help 10 fellow students in forums",
    icon: "🤝",
    earned: false,
    progress: 30,
  },
]

const recentActivities: RecentActivity[] = [
  {
    id: "1",
    type: "module",
    title: "Earthquake Safety Fundamentals",
    description: "Completed with excellent score",
    timestamp: "2 hours ago",
    score: 92,
    xp: 150,
  },
  {
    id: "2",
    type: "achievement",
    title: "Earthquake Expert",
    description: "Earned new achievement badge",
    timestamp: "2 hours ago",
    xp: 500,
  },
  {
    id: "3",
    type: "drill",
    title: "Fire Evacuation Drill",
    description: "Practiced emergency procedures",
    timestamp: "1 day ago",
    score: 87,
    xp: 120,
  },
  {
    id: "4",
    type: "module",
    title: "Flood Response Training",
    description: "Started new learning module",
    timestamp: "3 days ago",
  },
]

export default function StudentDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  // Mock user data
  const user = {
    name: "Arjun Sharma",
    grade: "10th Grade A",
    school: "Delhi Public School",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    weeklyXp: 350,
    weeklyGoal: 500,
  }

  const stats = {
    modulesCompleted: 4,
    totalModules: 8,
    drillsCompleted: 3,
    totalDrills: 6,
    averageScore: 89,
    streak: 7,
    rank: 8,
    totalUsers: 1247,
  }

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
              <span className="font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild className="bg-black text-white hover:bg-black">
  <Link href="/learn">Continue Learning</Link>
</Button>
<Button asChild className="bg-black text-white hover:bg-black">
  <Link href="/drills">Practice Drills</Link>
</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name.split(" ")[0]}!</h1>
              
              <p className="text-muted-foreground">
                {user.grade} • {user.school}
              </p>
            </div>
          </div>

          {/* Level Progress */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Level {user.level}</span>
                  <Badge variant="secondary">Rank #{stats.rank}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {user.xp} / {user.nextLevelXp} XP
                </span>
              </div>
              <Progress value={(user.xp / user.nextLevelXp) * 100} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {user.nextLevelXp - user.xp} XP needed for next level
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Modules Completed</p>
                  <p className="text-3xl font-bold">
                    {stats.modulesCompleted}/{stats.totalModules}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
              <div className="mt-4">
                <Progress value={(stats.modulesCompleted / stats.totalModules) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Drills Completed</p>
                  <p className="text-3xl font-bold">
                    {stats.drillsCompleted}/{stats.totalDrills}
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
              <div className="mt-4">
                <Progress value={(stats.drillsCompleted / stats.totalDrills) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold">{stats.averageScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+5%</span>
                <span className="text-muted-foreground ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Learning Streak</p>
                  <p className="text-3xl font-bold">{stats.streak}</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">days in a row</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Flood Emergency Response</h3>
                      <p className="text-sm text-muted-foreground">Lesson 4 of 6 • 60% complete</p>
                      <Progress value={60} className="h-2 mt-2" />
                    </div>
                    <Button asChild>
                      <Link href="/learn/flood-response">Continue</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <div className="text-right">
                        {activity.xp && (
                          <div className="flex items-center gap-1 text-sm text-yellow-600 mb-1">
                            <Star className="h-3 w-3" />+{activity.xp} XP
                          </div>
                        )}
                        {activity.score && (
                          <Badge variant="secondary" className="mb-1">
                            {activity.score}%
                          </Badge>
                        )}
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Weekly Goal
                </CardTitle>
                <CardDescription>Keep up the momentum!</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ProgressRing progress={(user.weeklyXp / user.weeklyGoal) * 100} size={120}>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.weeklyXp}</div>
                    <div className="text-xs text-muted-foreground">/ {user.weeklyGoal} XP</div>
                  </div>
                </ProgressRing>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Achievements
                </CardTitle>
                <CardDescription>Your earned badges and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.earned ? "bg-green-50 dark:bg-green-950" : "bg-muted/50"
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        {!achievement.earned && achievement.progress && (
                          <Progress value={achievement.progress} className="h-1 mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-black text-white hover:bg-black" asChild>
  <Link href="/rewards">
    <Gift className="h-4 w-4 mr-2" />
    View All Rewards
  </Link>
</Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-black text-white hover:bg-black" asChild>
  <Link href="/learn">
    <BookOpen className="h-4 w-4 mr-2" />
    Browse Modules
  </Link>
</Button>
<Button className="w-full justify-start bg-black text-white hover:bg-black" asChild>
  <Link href="/drills">
    <Target className="h-4 w-4 mr-2" />
    Practice Drills
  </Link>
</Button>
<Button className="w-full justify-start bg-black text-white hover:bg-black" asChild>
  <Link href="/community">
    <Users className="h-4 w-4 mr-2" />
    Join Community
  </Link>
</Button>
<Button className="w-full justify-start bg-black text-white hover:bg-black">
  <Calendar className="h-4 w-4 mr-2" />
  Schedule Practice
</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
