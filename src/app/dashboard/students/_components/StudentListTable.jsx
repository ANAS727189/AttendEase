import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];


const StudentListTable = ({ studentList, refreshData }) => {


  const CustomButtons = (props) => {
    const deleteRecord = (id) => {
     GlobalApi.DeleteStudentRecord(id).then((res) => {
       if(res){
         toast.success("Record deleted successfully");
         refreshData();
       }
    })};
     return (
       <AlertDialog>
         <AlertDialogTrigger>
           {" "}
           <Button variant="destructive">
             <Trash />
           </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
           <AlertDialogHeader>
             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
             <AlertDialogDescription>
               This action cannot be undone. This will permanently delete your
               record and remove your data from our servers.
             </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogCancel>Cancel</AlertDialogCancel>
             <AlertDialogAction onClick = {() => deleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>
     );
   };

   
   
  const [colDefs, setColDefs] = React.useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "address", filter: true },
    { field: "contact", filter: true },
    { field: "action", cellRenderer: CustomButtons },
  ]);
  const [rowData, setRowData] = React.useState();
  const [searchInput, setSearchInput] = React.useState("");

  useEffect(() => {
    studentList && setRowData(studentList);
  }, [studentList]);

  return (
    <>
      <div className="my-7">
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <div className="border flex gap-2 rounded-lg p-2 mb-4 max-w-sm">
            <Search />
            <input
              type="text"
              placeholder="Search anything..."
              onChange={(e) => setSearchInput(e.target.value)}
              className="outline-none w-full bg-white"
            />
          </div>

          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            quickFilterText={searchInput}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
          />
        </div>
      </div>
    </>
  );
};

export default StudentListTable;
