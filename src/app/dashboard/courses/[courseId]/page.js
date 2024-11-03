"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { courses_data } from '../../../../../public/assets/data'
import VideoPlayer from '../_components/VideoPlayer'
import RelatedVideos from '../_components/RelatedVideos'
import { Loader, ThumbsUp, ThumbsDown, Share2, BookmarkPlus, User2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CourseDetailPage() {
  const params = useParams()
  const { courseId } = params
  const [course, setCourse] = useState(null)
  const [relatedCourses, setRelatedCourses] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLikeClick = () => {
    setIsLiked(!isLiked)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  useEffect(() => {
    if (!courseId) return
    
    const selectedCourse = courses_data.find(c => c.id === parseInt(courseId))
    
    if (selectedCourse) {
      setCourse(selectedCourse)
      const filtered = courses_data
        .filter(c => c.id !== courseId && c.grade === selectedCourse.grade)
        .slice(0, 5)
      setRelatedCourses(filtered)
    }
  }, [courseId])

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 ">
        <div className="flex items-center justify-center h-screen">
          <Loader className="w-6 h-6 animate-spin mr-2"/>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx global>{`
        @keyframes likeAnimation {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        
        .like-animation {
          animation: likeAnimation 0.3s ease-in-out;
        }
      `}</style>

      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="rounded-xl overflow-hidden bg-gray-100">
              <VideoPlayer videoSrc={course.video_src} />
            </div>
            
            {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
              
              {/* Channel & Actions Bar */}
              <div className="flex items-center justify-between mt-4 pb-4 border-b">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-300 flex justify-center items-center">
                    <User2Icon />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Course Instructor</p>
                    <p className="text-sm text-gray-500">Grade {course.grade}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleLikeClick}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                      isLiked ? "bg-blue-100 text-emerald-600" : "bg-gray-100 hover:bg-gray-200"
                    )}
                  >
                    <ThumbsUp 
                      className={cn(
                        "w-5 h-5",
                        isAnimating && "like-animation",
                        isLiked && "fill-current"
                      )}
                    />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <BookmarkPlus className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
              
              {/* Description */}
              <div className="mt-4 p-4 rounded-xl bg-gray-100">
                <p className="text-gray-700">{course.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <h2 className="text-lg font-medium mb-4 text-gray-900">Related Videos</h2>
            <RelatedVideos courses={relatedCourses} />
          </div>
        </div>
      </div>
    </div>
  )
}