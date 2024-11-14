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
import { PopoverClose } from "@radix-ui/react-popover";

interface DatePickerType {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DatePicker({ date, setDate }: DatePickerType) {
  const popoverCloseRef = React.useRef<HTMLButtonElement | null>(null);

  const selectDateHandler = (e: Date | undefined) => {
    if (e !== undefined) {
      setDate(e), popoverCloseRef.current?.click();
    }
  };
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
      <PopoverContent className="w-auto rounded-lg bg-black p-0">
        <Calendar
          className="rounded-xl border-none text-white"
          mode="single"
          selected={date}
          onSelect={selectDateHandler}
          initialFocus
        />
      </PopoverContent>
      <PopoverClose ref={popoverCloseRef} />
    </Popover>
  );
}
