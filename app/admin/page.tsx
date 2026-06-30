"use client"

import { useState } from "react"
import {
  Users,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Download,
  Settings,
  Bell,
  Shield,
  BarChart3,
  PieChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface StudentData {
  id: string
  name: string
  grade: string
  modulesCompleted: number
  drillsCompleted: number
  averageScore: number
  lastActivity: string
  status: "active" | "inactive" | "at-risk"
}

interface ClassData {
  id: string
  name: string
  teacher: string
  students: number
  preparednessScore: number
  lastDrill: string
  completionRate: number
}

const mockStudents: StudentData[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    grade: "10th A",
    modulesCompleted: 4,
    drillsCompleted: 3,
    averageScore: 92,
    lastActivity: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    name: "Priya Patel",
    grade: "10th A",
    modulesCompleted: 5,
    drillsCompleted: 4,
    averageScore: 88,
    lastActivity: "1 day ago",
    status: "active",
  },
  {
    id: "3",
    name: "Rahul Kumar",
    grade: "10th B",
    modulesCompleted: 2,
    drillsCompleted: 1,
    averageScore: 65,
    lastActivity: "1 week ago",
    status: "at-risk",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    grade: "9th A",
    modulesCompleted: 3,
    drillsCompleted: 2,
    averageScore: 85,
    lastActivity: "3 days ago",
    status: "active",
  },
  {
    id: "5",
    name: "Vikram Singh",
    grade: "9th B",
    modulesCompleted: 1,
    drillsCompleted: 0,
    averageScore: 45,
    lastActivity: "2 weeks ago",
    status: "inactive",
  },
]

const mockClasses: ClassData[] = [
  {
    id: "1",
    name: "10th Grade A",
    teacher: "Mrs. Sharma",
    students: 35,
    preparednessScore: 87,
    lastDrill: "3 days ago",
    completionRate: 89,
  },
  {
    id: "2",
    name: "10th Grade B",
    teacher: "Mr. Gupta",
    students: 32,
    preparednessScore: 76,
    lastDrill: "1 week ago",
    completionRate: 72,
  },
  {
    id: "3",
    name: "9th Grade A",
    teacher: "Ms. Verma",
    students: 38,
    preparednessScore: 82,
    lastDrill: "2 days ago",
    completionRate: 84,
  },
  {
    id: "4",
    name: "9th Grade B",
    teacher: "Mr. Joshi",
    students: 34,
    preparednessScore: 69,
    lastDrill: "2 weeks ago",
    completionRate: 65,
  },
]

export default function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [selectedGrade, setSelectedGrade] = useState("all")

  const totalStudents = mockStudents.length
  const activeStudents = mockStudents.filter((s) => s.status === "active").length
  const atRiskStudents = mockStudents.filter((s) => s.status === "at-risk").length
  const averagePreparedness = Math.round(
    mockClasses.reduce((acc, c) => acc + c.preparednessScore, 0) / mockClasses.length,
  )

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
              <span className="font-medium">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="border-black hover:border-black hover:text-black">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm" className="border-black hover:border-black hover:text-black">
  <Settings className="h-4 w-4 mr-2" />
  Settings
</Button>
              <Button size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Send Alert
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor disaster preparedness across your institution and track student progress.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-8">
  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
    <SelectTrigger className="w-40 bg-black text-white hover:bg-black focus:bg-black">
      <SelectValue />
    </SelectTrigger>
    <SelectContent className="bg-black text-white border-white">
      <SelectItem value="7d" className="hover:bg-black focus:bg-black text-white">Last 7 days</SelectItem>
      <SelectItem value="30d" className="hover:bg-black focus:bg-black text-white">Last 30 days</SelectItem>
      <SelectItem value="90d" className="hover:bg-black focus:bg-black text-white">Last 90 days</SelectItem>
      <SelectItem value="1y" className="hover:bg-black focus:bg-black text-white">Last year</SelectItem>
    </SelectContent>
  </Select>
  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
    <SelectTrigger className="w-40 bg-black text-white hover:bg-black focus:bg-black">
      <SelectValue />
    </SelectTrigger>
    <SelectContent className="bg-black text-white border-white">
      <SelectItem value="all" className="hover:bg-black focus:bg-black text-white">All Grades</SelectItem>
      <SelectItem value="9" className="hover:bg-black focus:bg-black text-white">9th Grade</SelectItem>
      <SelectItem value="10" className="hover:bg-black focus:bg-black text-white">10th Grade</SelectItem>
      <SelectItem value="11" className="hover:bg-black focus:bg-black text-white">11th Grade</SelectItem>
      <SelectItem value="12" className="hover:bg-black focus:bg-black text-white">12th Grade</SelectItem>
    </SelectContent>
  </Select>
</div>
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold">{totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+12%</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-3xl font-bold">{activeStudents}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">
                  {Math.round((activeStudents / totalStudents) * 100)}% engagement rate
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">At-Risk Students</p>
                  <p className="text-3xl font-bold">{atRiskStudents}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">Need immediate attention</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Preparedness</p>
                  <p className="text-3xl font-bold">{averagePreparedness}%</p>
                </div>
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <Progress value={averagePreparedness} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 gap-2">
  <TabsTrigger value="overview" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
    Overview
  </TabsTrigger>
  <TabsTrigger value="students" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
    Students
  </TabsTrigger>
  <TabsTrigger value="classes" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
    Classes
  </TabsTrigger>
  <TabsTrigger value="reports" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
    Reports
  </TabsTrigger>
</TabsList>


          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Preparedness Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Preparedness Trends
                  </CardTitle>
                  <CardDescription>Monthly progress across all grades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Preparedness trend chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Activity Distribution
                  </CardTitle>
                  <CardDescription>Breakdown of learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <PieChart className="h-12 w-12 mx-auto mb-2" />
                      <p>Activity distribution chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest student activities and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Arjun Sharma completed Earthquake Safety module</p>
                      <p className="text-sm text-muted-foreground">2 hours ago • Score: 92%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">10th Grade A completed Fire Evacuation drill</p>
                      <p className="text-sm text-muted-foreground">3 hours ago • Average score: 87%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Rahul Kumar needs attention - Low engagement</p>
                      <p className="text-sm text-muted-foreground">1 day ago • Last activity: 1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Individual student progress and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Modules</TableHead>
                      <TableHead>Drills</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.modulesCompleted}/5</TableCell>
                        <TableCell>{student.drillsCompleted}/4</TableCell>
                        <TableCell>{student.averageScore}%</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.status === "active"
                                ? "default"
                                : student.status === "at-risk"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{student.lastActivity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mockClasses.map((classData) => (
                <Card key={classData.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{classData.name}</CardTitle>
                      <Badge variant="outline">{classData.students} students</Badge>
                    </div>
                    <CardDescription>Teacher: {classData.teacher}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Preparedness Score</span>
                          <span className="text-sm text-muted-foreground">{classData.preparednessScore}%</span>
                        </div>
                        <Progress value={classData.preparednessScore} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Completion Rate</span>
                          <span className="text-sm text-muted-foreground">{classData.completionRate}%</span>
                        </div>
                        <Progress value={classData.completionRate} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last drill:</span>
                        <span>{classData.lastDrill}</span>
                      </div>
                      <Button 
  size="sm" 
  className="w-full bg-black text-white hover:bg-gray-900 transition-colors"
>
  View Details
</Button>

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                  <CardDescription>Create detailed reports for stakeholders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-black text-white hover:bg-black">
  <Download className="h-4 w-4 mr-2" />
  Monthly Preparedness Report
</Button>
<Button className="w-full justify-start bg-black text-white hover:bg-black">
  <Download className="h-4 w-4 mr-2" />
  Student Progress Report
</Button>
<Button className="w-full justify-start bg-black text-white hover:bg-black">
  <Download className="h-4 w-4 mr-2" />
  Drill Participation Report
</Button>
<Button className="w-full justify-start bg-black text-white hover:bg-black">
  <Download className="h-4 w-4 mr-2" />
  Risk Assessment Report
</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Automated report delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Weekly Summary</p>
                        <p className="text-sm text-muted-foreground">Every Monday at 9:00 AM</p>
                      </div>
  <Badge className="bg-white text-black">Active</Badge>
</div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Monthly Report</p>
                        <p className="text-sm text-muted-foreground">1st of every month</p>
                      </div>
  <Badge className="bg-white text-black">Active</Badge>
</div>
                    <Button size="sm" className="w-full bg-black text-white hover:bg-black" asChild>
  <Link href="/schedule">
    <Calendar className="h-4 w-4 mr-2" />
    Schedule New Report
  </Link>
</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
