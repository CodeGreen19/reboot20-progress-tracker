"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FormatDate from "../shared/FormatDate";

interface DatePickerType {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DatePicker({ date, setDate }: DatePickerType) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"default"}
          className="rounded-md bg-[#131313] text-white"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? FormatDate(date) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-black text-white"
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
