"use client"

import { useState, useEffect } from "react"
import { Bell, MapPin, Clock, Users, Phone, MessageSquare, Shield, Siren, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import WeatherDashboard from "@/app/WeatherDashboard"

interface DisasterAlert {
  id: string
  type: "earthquake" | "flood" | "fire" | "cyclone" | "general"
  severity: "low" | "moderate" | "high" | "critical"
  title: string
  description: string
  location: string
  radius: number
  timestamp: string
  isActive: boolean
  instructions: string[]
  estimatedDuration?: string
  affectedAreas: string[]
}

interface EmergencyContact {
  id: string
  name: string
  role: string
  phone: string
  email: string
  department: string
  isAvailable: boolean
}

const mockAlerts: DisasterAlert[] = [
  {
    id: "1",
    type: "earthquake",
    severity: "high",
    title: "Earthquake Alert - Magnitude 6.2",
    description: "Strong earthquake detected in Delhi NCR region. Immediate safety measures required.",
    location: "Delhi NCR",
    radius: 50,
    timestamp: "2024-01-15T10:30:00Z",
    isActive: true,
    instructions: [
      "Drop, Cover, and Hold immediately",
      "Stay away from windows and heavy objects",
      "Do not use elevators",
      "Evacuate only after shaking stops",
      "Proceed to designated assembly areas",
    ],
    estimatedDuration: "2-3 minutes",
    affectedAreas: ["Delhi", "Gurgaon", "Noida", "Faridabad"],
  },
  {
    id: "2",
    type: "flood",
    severity: "moderate",
    title: "Heavy Rainfall Warning",
    description: "Monsoon intensification expected. Potential flooding in low-lying areas.",
    location: "Mumbai Metropolitan",
    radius: 30,
    timestamp: "2024-01-15T08:15:00Z",
    isActive: true,
  
    instructions: [
      "Avoid waterlogged areas",
      "Keep emergency supplies ready",
      "Monitor water levels continuously",
      "Prepare for possible evacuation",
      "Stay indoors unless necessary",
    ],
    estimatedDuration: "6-8 hours",
    affectedAreas: ["Mumbai", "Thane", "Navi Mumbai"],
  },
  {
    id: "3",
    type: "fire",
    severity: "critical",
    title: "Fire Emergency - Building C",
    description: "Fire detected in Building C, 3rd floor. Immediate evacuation required.",
    location: "School Campus",
    radius: 1,
    timestamp: "2024-01-15T14:45:00Z",
    isActive: false,
    
    instructions: [
      "Evacuate immediately via nearest exit",
      "Do not use elevators",
      "Stay low to avoid smoke",
      "Proceed to assembly point",
      "Do not re-enter building",
    ],
    affectedAreas: ["Building C", "Adjacent Buildings"],
  },
]

const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    role: "Emergency Coordinator",
    phone: "+91-9876543210",
    email: "rajesh.kumar@school.edu",
    department: "Administration",
    isAvailable: true,
  },

  {
    id: "3",
    name: "Ms. Priya Sharma",
    role: "Medical Officer",
    phone: "+91-9876543212",
    email: "amit.patel@school.edu",
    department: "Medical",
    isAvailable: false,
  },
  {
    id: "4",
    name: "Fire Department",
    role: "Emergency Services",
    phone: "101",
    email: "fire@delhi.gov.in",
    department: "External",
    isAvailable: true,
  },
  {
    id: "5",
    name: "Police Control Room",
    role: "Emergency Services",
    phone: "100",
    email: "control@delhipolice.gov.in",
    department: "External",
    isAvailable: true,
  },
]

export default function AlertsPage() {
  const [activeAlerts, setActiveAlerts] = useState(mockAlerts.filter((alert) => alert.isActive))
  const [selectedAlert, setSelectedAlert] = useState<DisasterAlert | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [locationEnabled, setLocationEnabled] = useState(true)

  // Simulate real-time alert updates
 useEffect(() => {
  async function fetchAlerts() {
    try {
      const res = await fetch("/api/weather-alerts"); // ya direct external API
      const data = await res.json();
      setActiveAlerts(data.alerts); // API ka response ke according
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  }

  fetchAlerts();

  const interval = setInterval(fetchAlerts, 60000); // har 1 min refresh
  return () => clearInterval(interval);
}, []);


  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "moderate":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "moderate":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
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
              <span className="font-medium">Emergency Alerts</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="border-black hover:border-black hover:text-black">
  <Bell className="h-4 w-4 mr-2" />
  Settings
</Button>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Siren className="h-4 w-4 mr-2" />
                Emergency
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Active Alerts Banner */}
      {activeAlerts.length > 0 && (
        <div className="bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-800">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <Siren className="h-5 w-5 text-red-600 animate-pulse" />
              <span className="font-medium text-red-800 dark:text-red-200">
                {activeAlerts.length} Active Alert{activeAlerts.length > 1 ? "s" : ""}
              </span>
              <Button
  variant="outline"
  size="sm"
  className="ml-auto bg-transparent border-black hover:bg-transparent hover:text-black"
>
  View All
</Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 gap-4">
    <TabsTrigger value="alerts" className="border border-black hover:border-black">Active Alerts</TabsTrigger>
    <TabsTrigger value="contacts" className="border border-black hover:border-black">Emergency Contacts</TabsTrigger>
    <TabsTrigger value="communication" className="border border-black hover:border-black">Communication</TabsTrigger>
    <TabsTrigger value="settings" className="border border-black hover:border-black">Settings</TabsTrigger>
</TabsList>

          <TabsContent value="alerts" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Emergency Alerts</h1>
                <p className="text-muted-foreground">Real-time disaster warnings and safety notifications</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Live monitoring</span>
                </div>
              </div>
            </div>

            {/* Current Active Alerts */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Current Alerts</h2>
              {activeAlerts.length > 0 ? (
                activeAlerts.map((alert) => (
                  <Card key={alert.id} className="border-l border-l-white-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
  {/* Severity Badge */}
  <Badge
    variant={getSeverityBadge(alert.severity) as any}
    className="capitalize text-black bg-orange-100 text-orange-800 border border-orange-300"
  >
    {alert.severity.toUpperCase()}
  </Badge>

  {/* Disaster Type Badge */}
  <Badge
    variant="outline"
    className="capitalize bg-blue-100 text-blue-800 border-blue-300"
  >
    {alert.type}
  </Badge>

  {/* Source Badge */}
  <Badge
    variant="secondary"
    className="capitalize bg-green-100 text-green-800"
  >
    
  </Badge>
</div>

                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <CardDescription className="mt-1">{alert.description}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className=" border-black hover:bg-gray-100 hover:text-gray-800">
                            <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {alert.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {new Date(alert.timestamp).toLocaleString()}
                          </div>
                          {alert.estimatedDuration && (
                            <div className="flex items-center gap-1">Duration: {alert.estimatedDuration}</div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Safety Instructions:</h4>
                          <ul className="space-y-1">
                            {alert.instructions.map((instruction, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {instruction}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="border-black hover:bg-gray-100 hover:text-gray-800 hover:border-black">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Emergency
                          </Button>
                          <Button variant="outline" size="sm" className="border-black hover:bg-gray-100 hover:text-gray-800 hover:border-black">
                            <MessageSquare className=" h-4 w-4 mr-2" />
                            Send Update
                          </Button>
                          <Button variant="outline" size="sm" className="border-black hover:bg-gray-100 hover:text-gray-800 hover:border-black">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All Clear</h3>
                    <p className="text-muted-foreground">No active emergency alerts in your area.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Recent Alerts History */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Alerts</h2>
              <div className="space-y-3">
                {mockAlerts
                  .filter((alert) => !alert.isActive)
                  .map((alert) => (
                    <Card key={alert.id} className="opacity-75">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                            <div>
                              <p className="font-medium">{alert.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {alert.location} • {new Date(alert.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">Resolved</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Emergency Contacts</h1>
              <p className="text-muted-foreground">Quick access to emergency personnel and services</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {emergencyContacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                        <p className="text-xs text-muted-foreground">{contact.department}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${contact.isAvailable ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                        <span className="text-xs text-muted-foreground">
                          {contact.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{contact.phone}</span>
                        <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                          Call
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{contact.email}</span>
                        <Button
  size="sm"
  variant="outline"
  className="ml-auto bg-black text-white hover:bg-gray-800"
>
  Message
</Button>

                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Emergency Communication</h1>
              <p className="text-muted-foreground">Send alerts and communicate during emergencies</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send Emergency Alert</CardTitle>
                  <CardDescription>Broadcast urgent messages to all users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="alert-type">Alert Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select alert type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="earthquake">Earthquake</SelectItem>
                        <SelectItem value="fire">Fire</SelectItem>
                        <SelectItem value="flood">Flood</SelectItem>
                        <SelectItem value="cyclone">Cyclone</SelectItem>
                        <SelectItem value="general">General Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="title">Alert Title</Label>
                    <Input placeholder="Enter alert title" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea placeholder="Enter detailed message and instructions" rows={4} />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input placeholder="Affected area or location" />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Siren className="h-4 w-4 mr-2" />
                    Send Emergency Alert
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication Channels</CardTitle>
                  <CardDescription>Available communication methods during emergencies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Instant mobile alerts</p>
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">SMS Alerts</p>
                          <p className="text-sm text-muted-foreground">Text message notifications</p>
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">PA System</p>
                          <p className="text-sm text-muted-foreground">School-wide announcements</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Offline</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Test Communication Systems
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Alert Settings</h1>
              <p className="text-muted-foreground">Configure your emergency notification preferences</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive instant alerts on your device</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="location-services">Location Services</Label>
                      <p className="text-sm text-muted-foreground">Get location-specific alerts</p>
                    </div>
                    <Switch id="location-services" checked={locationEnabled} onCheckedChange={setLocationEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sound-alerts">Sound Alerts</Label>
                      <p className="text-sm text-muted-foreground">Play alert sounds for critical notifications</p>
                    </div>
                    <Switch id="sound-alerts" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Filters</CardTitle>
                  <CardDescription>Customize which alerts you receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Minimum Severity Level</Label>
                    <Select defaultValue="moderate">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low and above</SelectItem>
                        <SelectItem value="moderate">Moderate and above</SelectItem>
                        <SelectItem value="high">High and above</SelectItem>
                        <SelectItem value="critical">Critical only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Alert Radius (km)</Label>
                    <Select defaultValue="50">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 km</SelectItem>
                        <SelectItem value="25">25 km</SelectItem>
                        <SelectItem value="50">50 km</SelectItem>
                        <SelectItem value="100">100 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
     <WeatherDashboard/>
   </div>
  )
}
