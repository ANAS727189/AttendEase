"use client"
import React, { useEffect } from 'react'
import AddNewStudent from './_components/AddNewStudent'
import GlobalApi from '@/app/_services/GlobalApi'
import StudentListTable from './_components/StudentListTable'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const page = () => {
  const [studentList, setStudentList] = React.useState([])

  useEffect(() => {
    GetAllStudents()
  }, [])

  const GetAllStudents = () => {
    GlobalApi.GetAllStudents().then((response) => {
      console.log(response.data)
      setStudentList(response.data)
    })
  }
  return (
   <>
    <div className='p-7'>
    <h2 className='font-bold text-2xl flex justify-between items-center'>Students
        <AddNewStudent refreshData={GetAllStudents} />
    </h2>

    <div>
    <Card className="w-[250px] transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer bg-slate-100  dark:hover:bg-gray-750 border dark:border-gray-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold transition-colors duration-300 text-black">
          Total no of Students
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Current enrolled students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <h1 className="text-4xl text-black font-bold bg-clip-text animate-pulse">
            {studentList.length}
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">students</span>
        </div>
      </CardContent>
    </Card>

    </div>

    <StudentListTable studentList = {studentList} refreshData={GetAllStudents}/>
    </div>
   </>
  )
}

export default page