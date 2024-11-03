"use client";
import React from "react";
import GlobalApi from "@/app/_services/GlobalApi";

const GradeSelection = ({selectedGrade}) => {
  const [grades, setGrades] = React.useState([]);
  const [selected, setSelected] = React.useState("");

  React.useEffect(() => {
    GetAllGradeList();
  }, []);

  const GetAllGradeList = () => {
    GlobalApi.GetAllGrades().then((response) => {
      setGrades(response.data);
      if (response.data.length > 0) {
        setSelected(response.data[0].grade);
        selectedGrade(response.data[0].grade);
      }
    });
  };

  return (
    <>
      <div>
        <select 
          className="p-2 border rounded-lg bg-white text-slate-500"
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            selectedGrade(e.target.value);
          }}
        >
          {grades.map((grade, idx) => (
            <option key={idx} value={grade.grade}>
              {grade.grade}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default GradeSelection;
