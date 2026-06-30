"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  MessageCircle,
  Trophy,
  Calendar,
  Plus,
  Heart,
  MessageSquare,
  Share2,
  Award,
  Target,
  Zap,
  Shield,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const userStats = { totalPoints: 2450 } // Mock user stats based on images

  const clubs = [
    {
      id: 1,
      name: "Earthquake Response Team",
      members: 234,
      description: "Learn and practice earthquake safety protocols",
      category: "Earthquake",
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      isJoined: true,
    },
    {
      id: 2,
      name: "Flood Safety Champions",
      members: 189,
      description: "Monsoon preparedness and flood response training",
      category: "Flood",
      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
      isJoined: false,
    },
    {
      id: 3,
      name: "Fire Safety Heroes",
      members: 156,
      description: "Fire prevention and emergency evacuation experts",
      category: "Fire",
      color: "bg-gradient-to-r from-red-500 to-pink-500",
      isJoined: true,
    },
    {
      id: 4,
      name: "Cyclone Preparedness Squad",
      members: 98,
      description: "Coastal disaster preparedness and cyclone safety",
      category: "Cyclone",
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
      isJoined: false,
    },
  ]

  const posts = [
    {
      id: 1,
      author: "Priya Sharma",
      avatar: "/diverse-student-girl.png",
      time: "2 hours ago",
      content:
        "Just completed the earthquake drill simulation! Got 95% accuracy. The Drop, Cover, Hold technique really works. Thanks to everyone who shared tips! 🏆",
      likes: 24,
      comments: 8,
      shares: 3,
      club: "Earthquake Response Team",
      badges: ["Drill Master", "Safety Champion"],
    },
    {
      id: 2,
      author: "Arjun Patel",
      avatar: "/student-boy.png",
      time: "4 hours ago",
      content:
        "Our school just installed new fire safety equipment! Here's what I learned about fire extinguisher types during today's training session. PASS technique is crucial - Pull, Aim, Squeeze, Sweep!",
      likes: 18,
      comments: 12,
      shares: 7,
      club: "Fire Safety Heroes",
      badges: ["Fire Expert", "Community Leader"],
    },
    {
      id: 3,
      author: "Sneha Reddy",
      avatar: "/teacher-woman.png",
      time: "6 hours ago",
      content:
        "Monsoon season is approaching! Remember to keep emergency kits ready. I've created a checklist for flood preparedness. Let me know if you need any tips for your region!",
      likes: 31,
      comments: 15,
      shares: 12,
      club: "Flood Safety Champions",
      badges: ["Flood Expert", "Mentor"],
    },
  ]

  const competitions = [
    {
      id: 1,
      title: "National Disaster Preparedness Quiz",
      description: "Test your knowledge across all disaster types",
      participants: 1247,
      prize: "₹10,000 + Certificates",
      deadline: "15 days left",
      difficulty: "Advanced",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
    {
      id: 2,
      title: "Emergency Response Video Challenge",
      description: "Create educational videos on disaster safety",
      participants: 89,
      prize: "₹5,000 + Recognition",
      deadline: "8 days left",
      difficulty: "Intermediate",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "School Safety Audit Competition",
      description: "Assess and improve your school's safety measures",
      participants: 156,
      prize: "Safety Equipment + Certificates",
      deadline: "22 days left",
      difficulty: "Beginner",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm fixed top-0 w-full z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold">CalamitySense</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">Community</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{userStats.totalPoints} XP</span>
              </div>
              <Button variant="outline" asChild className="border-black hover:border-black hover:text-black">
                <Link href="/dashboard">My Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              Community Hub
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 gradient-text">Connect & Learn Together</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Join disaster resilience clubs, share experiences, and participate in safety competitions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <TabsTrigger
              value="feed"
              className={
                activeTab === "feed"
                  ? "border-2 border-green-600 text-green-600 rounded-lg font-semibold"
                  : "text-gray-700 rounded-lg hover:bg-gray-100"
              }
            >
              <MessageCircle className="h-4 w-4" />
              Community Feed
            </TabsTrigger>
            <TabsTrigger
              value="clubs"
              className={
                activeTab === "clubs"
                  ? "border-2 border-green-600 text-green-600 rounded-lg font-semibold"
                  : "text-gray-700 rounded-lg hover:bg-gray-100"
              }
            >
              <Users className="h-4 w-4" />
              Clubs
            </TabsTrigger>
            <TabsTrigger
              value="competitions"
              className={
                activeTab === "competitions"
                  ? "border-2 border-green-600 text-green-600 rounded-lg font-semibold"
                  : "text-gray-700 rounded-lg hover:bg-gray-100"
              }
            >
              <Trophy className="h-4 w-4" />
              Competitions
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className={
                activeTab === "events"
                  ? "border-2 border-green-600 text-green-600 rounded-lg font-semibold"
                  : "text-gray-700 rounded-lg hover:bg-gray-100"
              }
            >
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feed" className="space-y-6">
            {/* Create Post */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-orange-500" />
                  Share Your Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What did you learn today? Share your disaster preparedness tips..."
                  className="min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-orange-100">
                      #earthquake
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-cyan-100">
                      #flood
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-red-100">
                      #fire
                    </Badge>
                  </div>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Share Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post, index) => (
                <Card
                  key={post.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-orange-200">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-800">{post.author}</h3>
                            {post.badges.map((badge, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs bg-gradient-to-r from-orange-100 to-red-100 text-orange-700"
                              >
                                <Award className="h-3 w-3 mr-1" />
                                {badge}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-slate-500">
                            {post.time} • {post.club}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 mb-4 leading-relaxed">{post.content}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="clubs" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {clubs.map((club, index) => (
                <Card
                  key={club.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-full ${club.color} text-white`}>
                        <Users className="h-6 w-6" />
                      </div>
                      <Badge
                        variant={club.isJoined ? "default" : "outline"}
                        className={club.isJoined ? "bg-green-500" : ""}
                      >
                        {club.isJoined ? "Joined" : "Join"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{club.name}</CardTitle>
                    <CardDescription className="text-slate-600">{club.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{club.members} members</span>
                      </div>
                      <Button
                        variant={club.isJoined ? "outline" : "default"}
                        size="sm"
                        className={
                          club.isJoined
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        }
                      >
                        {club.isJoined ? "View Club" : "Join Club"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="competitions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {competitions.map((competition, index) => (
                <Card
                  key={competition.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-full ${competition.color} text-white`}>
                        <Trophy className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        {competition.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{competition.title}</CardTitle>
                    <CardDescription className="text-slate-600">{competition.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Participants:</span>
                        <p className="font-semibold text-slate-800">{competition.participants}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Prize:</span>
                        <p className="font-semibold text-slate-800">{competition.prize}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-orange-600">
                        <Target className="h-4 w-4" />
                        <span className="text-sm font-medium">{competition.deadline}</span>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Zap className="h-4 w-4 mr-2" />
                        Participate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm animate-scale-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl gradient-text">Upcoming Events</CardTitle>
                <CardDescription>Join live sessions, workshops, and community meetups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">National Earthquake Drill Day</h3>
                        <p className="text-sm text-slate-600">March 15, 2024 • 10:00 AM IST</p>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm mb-4">
                      Participate in the nationwide earthquake preparedness drill with schools across India
                    </p>
                    <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500">
                      Register Now
                    </Button>
                  </div>

                  <div className="p-6 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Flood Safety Workshop</h3>
                        <p className="text-sm text-slate-600">March 20, 2024 • 2:00 PM IST</p>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm mb-4">
                      Interactive workshop on monsoon preparedness and flood response techniques
                    </p>
                    <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500">
                      Join Workshop
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}