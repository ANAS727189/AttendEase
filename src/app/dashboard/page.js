"use client";

import React from "react";
import { useTheme } from "next-themes";
import MonthSelection from "../_components/MonthSelection";
import GradeSelection from "../_components/GradeSelection";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import BarChartAttendance from "./_components/BarChart";
import PieChartComponent from "./_components/PieChartComponent";

const Page = () => {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = React.useState(moment().format("MM/YYYY"));
  const [selectedGrade, setSelectedGrade] = React.useState("");
  const [attendanceList, setAttendanceList] = React.useState([]);
  const [totalPresentData, setTotalPresentData] = React.useState([]);


  React.useEffect(() => {
    if (selectedMonth && selectedGrade) {
      GetPresentCountByDay();
      getStudentAttendance();
    }
  }, [selectedMonth, selectedGrade]);


 const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(selectedGrade, selectedMonth)
      .then((response) => {
        setAttendanceList(response.data);
        console.log("Attendance List:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance list:", error);
      });
  };


  const GetPresentCountByDay = () => {
    GlobalApi.TotalPresentCountByDay(selectedMonth, selectedGrade)
      .then((response) => {
        console.log("Present count by day:", response.data);
        setTotalPresentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching present count:", error);
      });
  };

  return (
    <>
      <div className="p-10">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Dashboard</h2>

          <div className="flex items-center gap-4">
            <MonthSelection selectedMonth={setSelectedMonth} />
            <GradeSelection selectedGrade={(v) => setSelectedGrade(v)} />
          </div>
        </div>

        <StatusList attendanceList={attendanceList} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <BarChartAttendance
              attendanceList={attendanceList}
              totalPresentData={totalPresentData}
            />
          </div>

          <div>
            <PieChartComponent attendanceList={attendanceList} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
