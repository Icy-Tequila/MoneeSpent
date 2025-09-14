import React from "react";
import { DatePicker } from "../components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Food() {
  return (
    <div className="border border-gray-200 rounded-lg shadow-xs p-3">
      <div className="flex items-center justify-end gap-2">
        Date
        <DatePicker />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="amount">Amount</label>
        <Input className="focus:ring-2! text-sm" />
        <label htmlFor="amount">Note</label>
        <Input className="focus:ring-2! text-sm" />
      </div>
      <div className="flex justify-end mt-3">
        <Button className="font-normal">Add Expense</Button>
      </div>
    </div>
  );
}
