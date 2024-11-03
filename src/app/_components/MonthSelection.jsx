"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { addMonths } from "date-fns";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";

const MonthSelection = ({selectedMonth}) => {
  const today = new Date();

  const nextMonths = addMonths(today, 0);
  const [month, setMonth] = React.useState(nextMonths);
  return (
    <>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex gap-2 items-center text-slate-500"
            >
              <CalendarDays className="h-5 w-5" />
              {moment(month).format("MM/YYYY")}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              month = {month}
              onMonthChange = {(val) => {
                setMonth(val);
                selectedMonth(val);
              }}
              selectedMonth={month}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default MonthSelection;
