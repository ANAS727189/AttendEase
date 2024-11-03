"use client";

import { getUniqueRecords } from '@/app/_services/serviceAttendance'
import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'

const BarChartAttendance = ({attendanceList, totalPresentData}) => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        formatAttendanceListCount();
    }, [attendanceList, totalPresentData])

    const formatAttendanceListCount = () => {
        if (!totalPresentData || totalPresentData.length === 0 || !attendanceList) {
            setData([]);
            return;
        }

        const totalStudent = getUniqueRecords(attendanceList).length;
        const result = totalPresentData.map((item) => ({
            day: item.day,
            presentCount: item.presentCount,
            absentCount: totalStudent - item.presentCount
        }));

        console.log("Formatted bar chart data:", result);
        setData(result);
    }

    if (data.length === 0) {
        return <div>No data available for the chart</div>;
    }

    return (
        <>
        <div className='p-5 border rounded-lg shadow-sm'>
            <h2 className='my-2 font-bold text-lg'>Attendance</h2>
            <ResponsiveContainer width={'100%'} height={300}>
                <BarChart width={900} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="presentCount" name="Total Present" fill="#8884d8" />
                    <Bar dataKey="absentCount" name="Total Absent" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        </>
    )
}

export default BarChartAttendance