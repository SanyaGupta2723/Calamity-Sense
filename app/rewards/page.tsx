"use client"

import { useState } from "react"
import { Trophy, Star, Gift, Target, Shield, BookOpen, Crown, Medal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "learning" | "drills" | "community" | "special"
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
  earned: boolean
  earnedDate?: string
  progress?: number
  maxProgress?: number
  requirements: string[]
}

interface Reward {
  id: string
  title: string
  description: string
  cost: number
  type: "badge" | "certificate" | "privilege" | "physical"
  available: boolean
  claimed: boolean
  icon: string
}

interface LeaderboardEntry {
  id: string
  name: string
  avatar: string
  points: number
  level: number
  badges: number
  rank: number
  school: string
}

const achievements: Achievement[] = [
  {
    id: "first-steps",
    title: "First Steps",
    description: "Complete your first learning module",
    icon: "🎯",
    category: "learning",
    points: 100,
    rarity: "common",
    earned: true,
    earnedDate: "2024-01-10",
    requirements: ["Complete 1 learning module"],
  },
  {
    id: "earthquake-expert",
    title: "Earthquake Expert",
    description: "Master all earthquake safety modules",
    icon: "🏆",
    category: "learning",
    points: 500,
    rarity: "epic",
    earned: true,
    earnedDate: "2024-01-12",
    requirements: ["Complete all earthquake modules", "Score 90%+ on all quizzes"],
  },
  {
    id: "drill-master",
    title: "Drill Master",
    description: "Complete 10 virtual drills with excellent scores",
    icon: "⚡",
    category: "drills",
    points: 750,
    rarity: "epic",
    earned: false,
    progress: 6,
    maxProgress: 10,
    requirements: ["Complete 10 drills", "Average score 90%+"],
  },
  {
    id: "safety-champion",
    title: "Safety Champion",
    description: "Help 25 fellow students in the community",
    icon: "🛡️",
    category: "community",
    points: 300,
    rarity: "rare",
    earned: false,
    progress: 8,
    maxProgress: 25,
    requirements: ["Help 25 students", "Maintain positive rating"],
  },
  {
    id: "perfect-week",
    title: "Perfect Week",
    description: "Complete activities for 7 consecutive days",
    icon: "🔥",
    category: "special",
    points: 200,
    rarity: "rare",
    earned: false,
    progress: 4,
    maxProgress: 7,
    requirements: ["7-day learning streak"],
  },
  {
    id: "disaster-guru",
    title: "Disaster Preparedness Guru",
    description: "Achieve mastery in all disaster categories",
    icon: "👑",
    category: "learning",
    points: 1000,
    rarity: "legendary",
    earned: false,
    progress: 2,
    maxProgress: 5,
    requirements: ["Master all 5 disaster categories", "Complete advanced modules"],
  },
]

const rewards: Reward[] = [
  {
    id: "bronze-badge",
    title: "Bronze Safety Badge",
    description: "Digital badge for your profile",
    cost: 500,
    type: "badge",
    available: true,
    claimed: false,
    icon: "🥉",
  },
  {
    id: "silver-badge",
    title: "Silver Safety Badge",
    description: "Premium digital badge",
    cost: 1000,
    type: "badge",
    available: true,
    claimed: true,
    icon: "🥈",
  },
  {
    id: "certificate",
    title: "Disaster Preparedness Certificate",
    description: "Official completion certificate",
    cost: 2000,
    type: "certificate",
    available: true,
    claimed: false,
    icon: "📜",
  },
  {
    id: "early-access",
    title: "Early Access to New Modules",
    description: "Get new content before others",
    cost: 1500,
    type: "privilege",
    available: true,
    claimed: false,
    icon: "⭐",
  },
  {
    id: "safety-kit",
    title: "Emergency Safety Kit",
    description: "Physical emergency preparedness kit",
    cost: 5000,
    type: "physical",
    available: false,
    claimed: false,
    icon: "🎒",
  },
]

const leaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 3250,
    level: 15,
    badges: 8,
    rank: 1,
    school: "Delhi Public School",
  },
  {
    id: "2",
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2890,
    level: 13,
    badges: 6,
    rank: 2,
    school: "Mumbai International School",
  },
  {
    id: "3",
    name: "Rahul Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2650,
    level: 12,
    badges: 7,
    rank: 3,
    school: "Bangalore Public School",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2400,
    level: 11,
    badges: 5,
    rank: 4,
    school: "Hyderabad High School",
  },
  {
    id: "5",
    name: "Vikram Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2150,
    level: 10,
    badges: 4,
    rank: 5,
    school: "Chennai Public School",
  },
]

export default function RewardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("achievements");

  const userStats = {
    totalPoints: 2450,
    level: 12,
    nextLevelPoints: 3000,
    rank: 8,
    badges: 6,
  }

  const filteredAchievements =
    selectedCategory === "all" ? achievements : achievements.filter((a) => a.category === selectedCategory)
    

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900"
      case "epic":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900"
      case "rare":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900"
      case "common":
        return "text-gray-600 bg-gray-100 dark:bg-gray-800"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold">CalamitySense</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">Rewards & Achievements</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{userStats.totalPoints} XP</span>
              </div>
              <Button variant="outline" asChild className="border-black hover:border-black hover:text-black">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Progress Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Rewards & Achievements</h1>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.totalPoints}</p>
                    <p className="text-sm text-muted-foreground">Total XP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">Level {userStats.level}</p>
                    <p className="text-sm text-muted-foreground">Current Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Medal className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">#{userStats.rank}</p>
                    <p className="text-sm text-muted-foreground">Global Rank</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.badges}</p>
                    <p className="text-sm text-muted-foreground">Badges Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Level Progress */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Progress to Level {userStats.level + 1}</span>
                <span className="text-sm text-muted-foreground">
                  {userStats.totalPoints} / {userStats.nextLevelPoints} XP
                </span>
              </div>
              <Progress value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {userStats.nextLevelPoints - userStats.totalPoints} XP needed for next level
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="achievements" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="achievements"
              className={`${activeTab === "achievements" ? "border-2 border-green-600 text-green-600 rounded-lg font-semibold" : "text-gray-700 rounded-lg hover:bg-gray-100"}`}
            >
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className={`${activeTab === "rewards" ? "border-2 border-green-600 text-green-600 rounded-lg font-semibold" : "text-gray-700 rounded-lg hover:bg-gray-100"}`}
            >
              Rewards Store
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className={`${activeTab === "leaderboard" ? "border-2 border-green-600 text-green-600 rounded-lg font-semibold" : "text-gray-700 rounded-lg hover:bg-gray-100"}`}
            >
              Leaderboard
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements" className="space-y-6">
            {/* Category Filter */}
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className={`${
                  selectedCategory === "all"
                    ? "bg-black text-white hover:bg-black hover:text-white"
                    : "border-black hover:text-black"
                }`}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "learning" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("learning")}
                className={`${
                  selectedCategory === "learning"
                    ? "bg-black text-white hover:bg-black hover:text-white"
                    : "border-black hover:text-black"
                }`}
              >
                Learning
              </Button>
              <Button
                variant={selectedCategory === "drills" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("drills")}
                className={`${
                  selectedCategory === "drills"
                    ? "bg-black text-white hover:bg-black hover:text-white"
                    : "border-black hover:text-black"
                }`}
              >
                Drills
              </Button>
              <Button
                variant={selectedCategory === "community" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("community")}
                className={`${
                  selectedCategory === "community"
                    ? "bg-black text-white hover:bg-black hover:text-white"
                    : "border-black hover:text-black"
                }`}
              >
                Community
              </Button>
              <Button
                variant={selectedCategory === "special" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("special")}
                className={`${
                  selectedCategory === "special"
                    ? "bg-black text-white hover:bg-black hover:text-white"
                    : "border-black hover:text-black"
                }`}
              >
                Special
              </Button>
            </div>

            {/* Achievements Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`relative overflow-hidden ${
                    achievement.earned ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </div>
                      </div>
                      {achievement.earned && <Trophy className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                      <Badge variant="outline">{achievement.points} XP</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {!achievement.earned && achievement.progress !== undefined && (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress value={(achievement.progress! / achievement.maxProgress!) * 100} className="h-2" />
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-medium mb-1">Requirements:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {achievement.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span>•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {achievement.earned && achievement.earnedDate && (
                        <div className="text-xs text-muted-foreground">
                          Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Rewards Store</h2>
                <p className="text-muted-foreground">Redeem your XP for exclusive rewards</p>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Star className="h-5 w-5 text-yellow-500" />
                {userStats.totalPoints} XP Available
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <Card key={reward.id} className={reward.claimed ? "opacity-50" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{reward.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{reward.title}</CardTitle>
                          <CardDescription>{reward.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="capitalize">
                        {reward.type}
                      </Badge>
                      <Badge variant="secondary">{reward.cost} XP</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className={`w-full ${
                        reward.claimed ? 'bg-white text-black opacity-50' : 'bg-black text-white hover:bg-gray-800'
                      }`}
                      disabled={!reward.available || reward.claimed || userStats.totalPoints < reward.cost}
                      variant={reward.claimed ? "outline" : "default"}
                    >
                      {reward.claimed ? (
                        <>
                          <Trophy className="h-4 w-4 mr-2" />
                          Claimed
                        </>
                      ) : !reward.available ? (
                        "Coming Soon"
                      ) : userStats.totalPoints < reward.cost ? (
                        `Need ${reward.cost - userStats.totalPoints} more XP`
                      ) : (
                        <>
                          <Gift className="h-4 w-4 mr-2" />
                          Redeem
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Global Leaderboard</h2>
              <p className="text-muted-foreground">Top disaster preparedness champions</p>
            </div>

            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <Card
                  key={entry.id}
                  className={index < 3 ? "border-primary/50" : ""}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {index === 0 && <Crown className="h-6 w-6 text-yellow-500 absolute -top-2 -left-1" />}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              index === 0
                                ? "bg-yellow-500 text-white"
                                : index === 1
                                ? "bg-gray-400 text-white"
                                : index === 2
                                ? "bg-orange-500 text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {entry.rank}
                          </div>
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={entry.avatar || "/placeholder.svg"} alt={entry.name} />
                          <AvatarFallback>
                            {entry.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{entry.name}</h3>
                            <p className="text-sm text-muted-foreground">{entry.school}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-lg font-bold">
                              <Star className="h-4 w-4 text-yellow-500" />
                              {entry.points.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>Level {entry.level}</span>
                              <span>{entry.badges} badges</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Climb the Leaderboard!</h3>
                <p className="text-muted-foreground mb-4">
                  Complete more modules and drills to improve your ranking and earn more XP.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" asChild className="border-black hover:bg-black hover:text-white">
                    <Link href="/learn">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Learn More
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="border-black hover:bg-black hover:text-white">
                    <Link href="/drills">
                      <Target className="h-4 w-4 mr-2" />
                      Practice Drills
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}