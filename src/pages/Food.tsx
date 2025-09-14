import React from "react";
import { DatePicker } from "../components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Food() {
  return (
    <div className="border border-gray-200 rounded-lg shadow-xs p-3">
      <div className="flex items-center justify-end gap-2">
        Date
        <DatePicker />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="amount">Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            ₱
          </span>
          <Input placeholder="0.00" className="pl-7 placeholder-gray-400!" />
        </div>

        <label htmlFor="amount">Note</label>
        <Input className="focus:ring-2! text-sm" />
      </div>
      <div className="flex justify-end mt-3">
        <Button className="font-normal cursor-pointer">+ Add Expense</Button>
      </div>
    </div>
  );
}
