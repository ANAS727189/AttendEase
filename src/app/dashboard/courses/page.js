"use client"

import React, { useState } from 'react'
import GradeSelection from '@/app/_components/GradeSelection'
import CourseList from './_components/CourseCard'
import { courses_data } from '../../../../public/assets/data'

export default function CoursesPage() {
  const [selectedGrade, setSelectedGrade] = useState("")
  const [courses, setCourses] = useState(courses_data)

  const filteredCourses = selectedGrade
    ? courses.filter(course => course.grade === parseInt(selectedGrade))
    : courses

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Courses</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Select Grade:</span>
          <GradeSelection selectedGrade={(v) => setSelectedGrade(v)} />
        </div>
      </div>
      <CourseList courses={filteredCourses} />
    </div>
  )
}