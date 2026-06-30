import { Shield, Users, BookOpen, AlertTriangle, Trophy, MessageSquare, Sparkles, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full z-50 glass-effect border-b-2 border-green-500/30 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-slide-up">
              <div className="relative">
                <Shield className="h-8 w-8 text-green-500 animate-pulse-glow" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-float" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">CalamitySense</h1>
            </div>
            <nav className="hidden md:flex items-center gap-3">
              <Link href="/learn">
                <Button
                  variant="ghost"
                  className=" font bold hover:bg-green-100 hover:text-green-900 transition-all duration-300 px-4 py-2 text-base font-medium"
                >
                  Learn
                </Button>
              </Link>
              <Link href="/drills">
                <Button
                  variant="ghost"
                  className="hover:bg-blue-100 hover:text-blue-800 transition-all duration-300 px-4 py-2 text-base font-medium"
                >
                  Drills
                </Button>
              </Link>
              <Link href="/alerts">
                <Button
                  variant="ghost"
                  className="hover:bg-red-100 hover:text-red-800 transition-all duration-300 px-4 py-2 text-base font-medium"
                >
                  Alerts
                </Button>
              </Link>
              <Link href="/rewards">
                <Button
                  variant="ghost"
                  className="hover:bg-emerald-100 hover:text-emerald-800 transition-all duration-300 px-4 py-2 text-base font-medium"
                >
                  Rewards
                </Button>
              </Link>
              <Link href="/community">
                <Button
                  variant="ghost"
                  className="hover:bg-teal-100 hover:text-teal-800 transition-all duration-300 px-4 py-2 text-base font-medium"
                >
                  Community
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="hover:bg-green-100 hover:text-green-800 transition-all duration-300 px-4 py-2 text-base font-medium"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  variant="ghost"
                  className="hover:bg-blue-100 hover:text-blue-800 transition-all duration-300 px-4 py-2 text-base font-medium"
                >
                  Admin
                </Button>
              </Link>
            </nav>
            <div className="flex items-center gap-3 animate-slide-up">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="hover:scale-105 transition-transform duration-200 bg-white/90 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-white hover:text-slate-800 px-5 py-2"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 transition-all duration-300 text-white font-medium shadow-lg border-0 !bg-opacity-100 backdrop-blur-none px-5 py-2">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="pt-36 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 opacity-60"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-scale-in">
                <Zap className="h-4 w-4" />
                India's #1 Disaster Preparedness Platform
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-balance mb-6 leading-tight">
              Prepare Today, <span className="gradient-text animate-gradient">Save Lives Tomorrow</span>
            </h2>
            <p className="text-xl text-slate-600 text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
              Comprehensive disaster preparedness education platform for schools and colleges across India. Learn,
              practice, and stay prepared with interactive modules and virtual drills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 transition-all duration-300 animate-gradient shadow-lg"
                >
                  <Target className="h-5 w-5 mr-2" />
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Comprehensive Features
              </div>
            </div>
            <h3 className="text-4xl font-bold mb-4 gradient-text">Everything You Need for Safety</h3>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Build a disaster-resilient educational community with our comprehensive suite of tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:scale-105 transition-all duration-300 border border-green-200 shadow-lg hover:shadow-2xl animate-scale-in bg-white hover:bg-green-50">
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-fit group-hover:animate-pulse shadow-lg">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 mb-3">Interactive Learning</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Gamified disaster education with region-specific content for earthquakes, floods, and fires
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:scale-105 transition-all duration-300 border border-blue-200 shadow-lg hover:shadow-2xl animate-scale-in bg-white hover:bg-blue-50"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full w-fit group-hover:animate-pulse shadow-lg">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 mb-3">Virtual Drills</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Practice emergency procedures through immersive digital scenarios and earn badges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:scale-105 transition-all duration-300 border border-teal-200 shadow-lg hover:shadow-2xl animate-scale-in bg-white hover:bg-teal-50"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full w-fit group-hover:animate-pulse shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 mb-3">Real-Time Alerts</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Location-based disaster warnings and emergency notifications for your region
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:scale-105 transition-all duration-300 border border-indigo-200 shadow-lg hover:shadow-2xl animate-scale-in bg-white hover:bg-indigo-50"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full w-fit group-hover:animate-pulse shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 mb-3">Admin Dashboard</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Track preparedness scores, drill participation, and manage institutional safety
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:scale-105 transition-all duration-300 border border-amber-200 shadow-lg hover:shadow-2xl animate-scale-in bg-white hover:bg-amber-50"
              style={{ animationDelay: "0.4s" }}
            >
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full w-fit group-hover:animate-pulse shadow-lg">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 mb-3">Rewards & Gamification</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Earn points, badges, and rewards for completing drills and learning modules
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:scale-105 transition-all duration-300 border border-emerald-200 shadow-lg hover:shadow-2xl animate-scale-in bg-white hover:bg-emerald-50"
              style={{ animationDelay: "0.5s" }}
            >
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-fit group-hover:animate-pulse shadow-lg">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 mb-3">Community Hub</CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Connect with disaster resilience clubs and emergency communication tools
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 animate-gradient"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-2xl mx-auto animate-slide-up">
            <h3 className="text-4xl font-bold mb-4 text-white">Ready to Build a Safer Future?</h3>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Join thousands of students, teachers, and institutions already using CalamitySense to create
              disaster-resilient communities.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-white text-green-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6 animate-slide-up">
            <div className="relative">
              <Shield className="h-8 w-8 text-green-400" />
              <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-30"></div>
            </div>
            <span className="text-2xl font-bold text-white">CalamitySense</span>
          </div>
          <p className="text-slate-300 text-lg mb-4">
            Building disaster-resilient educational communities across India
          </p>
          <div className="flex justify-center gap-6 text-slate-400">
            <span className="hover:text-green-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-green-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-green-400 transition-colors cursor-pointer">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  )
}