"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner"
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const AddNewStudent = ({refreshData}) => {
  const [open, setOpen] = useState(false);
  const { register, reset,  handleSubmit, watch, formState: { errors } } = useForm();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  GetAllGradeList();
}, [])

  const GetAllGradeList = () => {
     GlobalApi.GetAllGrades().then((response) => {
         setGrades(response.data);
     });
  }

  const onSubmit = (data) => {
     console.log("Form data ")
     setLoading(true);
     GlobalApi.CreateNewStudent(data).then((response) => {
          console.log("--", response);
          if(response.data) {
            reset();
            refreshData();
              setOpen(false);
              toast.success("Student added successfully");
          }
          setLoading(false);
     });
  }

  return (
    <>
      <div>
        <Button onClick={() => setOpen(true)}>+ Add New Student</Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-bold font-mono">
                Add New Student
              </DialogTitle>
              <DialogDescription>
               <form onSubmit={handleSubmit(onSubmit)}>
               <div className="py-2">
                  <label>Full Name</label>
                  <Input placeholder="Ex. Anas Khan"
                   {...register("name", { required: true })}
                  />
                </div>

                <div className="py-2">
                  <label>Contact No</label>
                  <Input type = "number" placeholder="Ex. 9546132578"
                     {...register("contact")}
                  />
                </div>

                <div className="py-2">
                  <label>Address</label>
                  <Input placeholder="Ex. 123/10 Kidwai nagar, Kanpur" 
                        {...register("address")}
                  />
                </div>

                <div className="py-2 flex flex-col">
                    <label>Select Grade</label>
                    <select className="p-2 border rounded-lg bg-white text-slate-500"
                        {...register("grade", { required: true })}
                    >
                       {grades.map((grade, idx) => (
                            <option key={idx} value={grade.grade}>{grade.grade}</option>

                       ))}
                    </select>
                </div>

                <div className="flex gap-3 items-center justify-end mt-5">
                    <Button type= "button" onClick = {() => setOpen(false)} variant = "ghost">Cancel</Button>
                    <Button type = "submit" disable = {loading}>
                    {loading ? <Loader className="animate-spin"/> : 
                    "Save"}</Button>
                </div>
               </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddNewStudent;
