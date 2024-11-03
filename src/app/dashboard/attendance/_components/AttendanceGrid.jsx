import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { getUniqueRecords } from "@/app/_services/serviceAttendance";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const AttendanceGrid = ({ attendanceList, selectedMonth }) => {
  const [rowData, setRowData] = React.useState();
  const [colDefs, setColDefs] = React.useState([
    { field: "studentId", filter: true },
    { field: "name", filter: true },
  ]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(
    moment(selectedMonth).format("yyyy"),
    moment(selectedMonth).format("MM")
  );
  const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  useEffect(() => {
    if (attendanceList) {
      const userList = getUniqueRecords(attendanceList);
      setRowData(userList);
      daysArrays.forEach((date) => {
        setColDefs((prevData) => [
          ...prevData,
          {
            field: date.toString(),
            width: 50,
            editable: true,
          },
        ]);

        userList.forEach((obj) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });
    }
  }, [attendanceList]);

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (item) => item.day == day && item.studentId == studentId
    );
    return result ? true : false;
  };

 
  const onMarkAttendance = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/YYYY");
    if (presentStatus) {
      const data = {
        day: parseInt(day),
        studentId: parseInt(studentId),
        presentStatus: presentStatus,
        date: date,
      };
      GlobalApi.MarkAttendance(data)
        .then((response) => {
          console.log(response);
          toast.success(`Student Id: ${studentId} marked as present successfully`);
        })
        .catch((error) => {
          console.error("Error marking attendance:", error);
          toast.error("Failed to mark attendance");
        });
    } else {
      GlobalApi.MarkAbsent(studentId, day, date)
        .then((response) => {
          console.log(response);
          toast.success(`Student id: ${studentId} marked as absent successfully`);
        })
        .catch((error) => {
          console.error("Error marking absence:", error);
          toast.error("Failed to mark absence");
        });
    }
  };

  return (
    <>
      <div>
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            onCellValueChanged={(e) =>
                onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)
              }
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              paginationPageSizeSelector={paginationPageSizeSelector}
          />
        </div>
      </div>
    </>
  );
};

export default AttendanceGrid;
