"use client";
import GradeSelection from '@/app/_components/GradeSelection'
import MonthSelection from '@/app/_components/MonthSelection'
import React from 'react'
import { Button } from '@/components/ui/button'
import GlobalApi from '@/app/_services/GlobalApi';
import moment from 'moment';
import AttendanceGrid from './_components/AttendanceGrid';

const page = () => {
    const [selectedMonth, setSelectedMonth] = React.useState();
    const [selectedGrade, setSelectedGrade] = React.useState("");
    const [attendanceList, setAttendanceList] = React.useState();

 

  const onSearchHandler = () => {
    if (!selectedGrade) {
        alert("Please select a grade");
        return;
      }
    const month = moment(selectedMonth).format('MM/YYYY');

    GlobalApi.GetAttendanceList(selectedGrade, month).then((response) => {
        setAttendanceList(response.data);
    });
  }

  return (
    <>
    <div className='p-10'>
        <h2 className='text-2xl font-bold'>Attendance</h2>
      

     <div className='flex gap-5 my-5 border rounded-lg shadow-sm p-5'>
     <div className='flex gap-2 items-center'>
       <label>Select Month: </label>
       <MonthSelection selectedMonth={(val) => setSelectedMonth(val)}/>
       </div>
        <div className='flex gap-2 items-center'>
        <label>Select Grade: </label>
        <GradeSelection selectedGrade = {(val) => setSelectedGrade(val)}/>
        </div>
        <Button
        onClick = {() => onSearchHandler()}
        >Search</Button>
     </div>

     <AttendanceGrid  attendanceList={attendanceList} selectedMonth={selectedMonth}/>

    </div>
    </>
  )
}

export default page