"use client";

import React, { useState } from "react";
import { DatePicker } from "../components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Expense = {
  amount: number;
  note: string;
  date: string; // YYYY-MM-DD
};

export default function Food() {
  // --- STATE ---
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // --- ADD EXPENSE FUNCTION ---
  const addExpense = () => {
    if (!amount || isNaN(Number(amount))) return;

    setExpenses([
      ...expenses,
      { amount: Number(amount), note: note || "No note", date: selectedDate },
    ]);

    setAmount("");
    setNote("");
  };

  // --- FILTER EXPENSES FOR SELECTED DATE ---
  const expensesForDate = expenses.filter(
    (exp) => exp.date === selectedDate
  );

  // --- TOTAL CALCULATION ---
  const totalForDate = expensesForDate.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-100 rounded-lg border border-gray-100 shadow-inner shadow-gray-400/20 p-3">
      {/* INPUT BOX */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-xs p-3 mt-1">
        <div className="flex items-center justify-end gap-2">
          Date
          <DatePicker />
          {/* hidden input for controlling the date logic */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="hidden"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="amount">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              ₱
            </span>
            {/* CONNECTED INPUT */}
            <Input
              placeholder="0.00"
              className="pl-7 placeholder-gray-400!"
              value={amount || ""} 
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <label htmlFor="note">Note</label>
          {/* CONNECTED INPUT */}
          <Input
            className="focus:ring-2! text-sm"
            value={note || ""}  
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-3">
          {/* CONNECTED BUTTON */}
          <Button className="font-normal cursor-pointer" onClick={addExpense}>
            + Add Expense
          </Button>
        </div>
      </div>

      {/* EXPENSE LIST */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-xs p-3 mt-3">
        <h2>Food expenses on {new Date(selectedDate).toDateString()}</h2>

        <ul className="list-disc ml-5 my-3 flex flex-col gap-2">
          {expensesForDate.map((exp, i) => (
            <div key={i} className="flex justify-between">
              <li>
                ₱{exp.amount} - {exp.note}
              </li>
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-10">
                  <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-700 hover:text-red-700!">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </ul>

        <div className="w-full h-[0.5px] bg-gray-200 my-3"></div>
        <h3 className="font-bold flex justify-end">Total: ₱{totalForDate}</h3>
      </div>
    </div>
  );
}
