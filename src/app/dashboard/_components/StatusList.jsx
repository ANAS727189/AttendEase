"use client";
import React from 'react'
import { getUniqueRecords } from '@/app/_services/serviceAttendance';
import moment from 'moment';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

const StatusList = ({attendanceList}) => {
    const [totalStudent, setTotalStudent] = React.useState(0);
    const [presentPercentage, setPresentPercentage] = React.useState(0);

    React.useEffect(() => {
        if(attendanceList && attendanceList.length > 0) {
            const totalStudents = getUniqueRecords(attendanceList);
            setTotalStudent(totalStudents.length);

            const firstRecord = attendanceList[0];
            const month = moment(firstRecord.date).month();
            const year = moment(firstRecord.date).year();

            const totalDaysInMonth = moment(`${year}-${month + 1}`, "YYYY-MM").daysInMonth();

            const totalPossibleAttendances = totalStudents.length * totalDaysInMonth;

            const uniquePresentCount = attendanceList.reduce((acc, record) => {
                if (record.present === true) {
                    const key = `${record.studentId}-${moment(record.date).format('YYYY-MM-DD')}`;
                    if (!acc.has(key)) {
                        acc.add(key);
                    }
                }
                return acc;
            }, new Set()).size;

            const presentPercen = totalPossibleAttendances > 0 
                ? (uniquePresentCount / totalPossibleAttendances) * 100 
                : 0;

            setPresentPercentage(Math.min(100, Math.max(0, presentPercen)));
        } else {
            setTotalStudent(0);
            setPresentPercentage(0);
        }
    }, [attendanceList])
  return (
    <>
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
            <Card icon={<GraduationCap />} title="Total Student" value={totalStudent}/>
            <Card 
                icon={<TrendingUp />} 
                title="Total Present" 
                value={`${presentPercentage.toFixed(1)}%`}
            />
            <Card 
                icon={<TrendingDown />} 
                title="Total Absent" 
                value={`${(100 - presentPercentage).toFixed(1)}%`}
            />
        </div>
    </>
  )
}

export default StatusList