import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Eye } from 'lucide-react'

export default function CourseList({ courses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses?.map((course) => (
        <Link href={`/dashboard/courses/${course.id}`} key={course.id}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <img
                src={course.thumbnail_src || "/placeholder.svg?height=200&width=400"}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {course.views} views
                </span>
              </div>
            </CardContent>
            <CardFooter className="px-4 py-2 bg-gray-50 text-sm text-gray-600">
              Grade {course.grade}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}