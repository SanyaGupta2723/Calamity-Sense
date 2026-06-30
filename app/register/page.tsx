"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false) // New state for the checkbox
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    institution: "",
    grade: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Now you can combine the checkbox state with the form data
    const finalFormData = {
      ...formData,
      agreeToTerms,
    }
    // TODO: Implement registration logic
    console.log("Registration attempt:", finalFormData)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">CalamitySense</h1>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Join the Community</h2>
          <p className="text-muted-foreground">Create your account to start learning disaster preparedness</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Fill in your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@school.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
  <Label htmlFor="role">Role</Label>
  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
    <SelectTrigger>
      <SelectValue placeholder="Select your role" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        value="student"
        className="hover:bg-black hover:text-white focus:bg-black focus:text-white"
      >
        Student
      </SelectItem>
      <SelectItem
        value="admin"
        className="hover:bg-black hover:text-white focus:bg-black focus:text-white"
      >
        Administrator
      </SelectItem>
    </SelectContent>
  </Select>
</div>

              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  placeholder="Your School/College Name"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                />
              </div>

              {formData.role === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Class</Label>
                  <Input
                    id="grade"
                    placeholder="e.g., 10th Grade, 2nd Year"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
 <Checkbox
  id="terms"
  checked={agreeToTerms}
  onCheckedChange={setAgreeToTerms}
  className="bg-white border-gray-400 hover:bg-gray-100 data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
/>
  <Label htmlFor="terms" className="text-sm">
    I agree to the{" "}
    <Link href="/terms" className="text-primary hover:underline">
      Terms of Service
    </Link>{" "}
    and{" "}
    <Link href="/privacy" className="text-primary hover:underline">
      Privacy Policy
    </Link>
  </Label>
</div>

              <Button type="submit" className="w-full bg-black text-white hover:bg-black" disabled={!agreeToTerms}>
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}