// app/lesson/[lessonId]/page.tsx
"use client"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.lessonId as string

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link href="/learn">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Lesson: {lessonId}</h1>
      </div>

      {/* MP4 Video Player */}
      <div className="bg-black rounded-xl overflow-hidden shadow-lg max-w-3xl mx-auto p-4">
        <video 
          controls 
          className="w-full aspect-video rounded-lg"
          
        >
          <source src="/videos/lesson1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Lesson Content Section */}
      <div className="max-w-3xl mx-auto mt-6 p-4 bg-gray-100 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Fire Evacuation Strategy: A Quick Guide</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
This lesson covers essential steps to take to prepare for and react to a fire emergency. Learn how to create a fire escape plan, use a fire extinguisher, and ensure everyone's safety during an evacuation.A fire needs three things to ignite and sustain itself: heat, oxygen, and fuel. This is known as the Fire Triangle. Heat can come from anything that gets hot, like a stove or an electrical spark. Oxygen is in the air all around us. Fuel is any material that can burn, such as wood, paper, or gasoline. If you remove any one of these three elements, you can stop a fire.


        </p>
        
       
      </div>
    </div>
  )
}