import React from "react";
import { DatePicker } from "../components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Food() {
  return (
    <div>
      <div className="border border-gray-200 rounded-lg shadow-xs p-3 mt-1">
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
      <div className="border border-gray-200 rounded-lg shadow-xs p-3 mt-3">
        <h2>Food expenses on Sept. 14, 2025</h2>
        <div className="w-full h-[0.5px] bg-gray-200 my-3"></div>
        <ul className="list-disc ml-5 my-3">
            <li>₱120 - Lunch Jollibee</li>
            <li>₱80  - Breakfast</li>
            <li>₱60  - Snack</li>
        </ul>
        <div className="w-full h-[0.5px] bg-gray-200 my-3"></div>
        <h3 className="font-bold flex justify-end">Total: ₱260</h3>
      </div>
    </div>
  );
}
