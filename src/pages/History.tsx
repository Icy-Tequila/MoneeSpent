import React from "react";
import { DatePicker } from "../components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function History() {
  return (
    <div>
      <h1 className="font-bold text-lg">Expenses History</h1>
      <div className="flex justify-between my-3">
        <div className="flex items-center gap-3">
          Date
          <DatePicker />
        </div>
        <div className="flex items-center gap-3">
          Filter
          <Select>
            <SelectTrigger className="w-[150px] cursor-pointer">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="food" className="cursor-pointer">Food</SelectItem>
              <SelectItem value="transportation" className="cursor-pointer">Transportation</SelectItem>
              <SelectItem value="other" className="cursor-pointer">Other</SelectItem>
              <SelectItem value="all" className="cursor-pointer">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
