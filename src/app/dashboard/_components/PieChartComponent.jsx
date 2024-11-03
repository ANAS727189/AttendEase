"use client"

import { getUniqueRecords } from '@/app/_services/serviceAttendance';
import React from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import moment from 'moment';

const PieChartComponent = ({attendanceList}) => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        if(attendanceList && attendanceList.length > 0) {
            const totalStudents = getUniqueRecords(attendanceList);
        
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
        
            const clampedPresent = Math.min(100, Math.max(0, presentPercen));
        
            setData([
                {
                    name: "Present",
                    value: Number(clampedPresent.toFixed(1)),
                    fill: '#50C878'
                },
                {
                    name: "Absent",
                    value: Number((100 - clampedPresent).toFixed(1)),
                    fill: '#03A9F4'
                }
            ]);
        }
    }, [attendanceList])
    
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg mb-4'>Monthly Attendance</h2>
            <ResponsiveContainer width={'100%'} height={300}>
                <PieChart>
                    <Pie 
                        data={data} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60} 
                        outerRadius={80} 
                        label={({name, value}) => `${name}: ${value}%`}
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent