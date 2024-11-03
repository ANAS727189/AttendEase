import React from 'react'
import Link from 'next/link'
import { Card } from "@/components/ui/card"

export default function RelatedVideos({courses}) {
  return (
    <div className="space-y-3">
      {courses.map((course) => (
        <Link href={`/dashboard/courses/${course.id}`} key={course.id}>
          <div className="flex gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex-shrink-0 w-40 h-24 relative">
              <img
                src={course.thumbnail_src || "/placeholder.svg?height=100&width=200"}
                alt={course.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2 text-gray-900 dark:text-white">
                {course.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Course Instructor</p>
              <p className="text-xs text-gray-500">{course.duration}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}