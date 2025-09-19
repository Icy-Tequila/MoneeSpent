"use client";

import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, CalendarFold } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type Expense = {
  id?: number;
  amount: number;
  note: string;
  date: string; // YYYY-MM-DD
  inserted_at?: string;
};

export default function Food() {
  // control selected date (Date object)
  const [date, setDate] = useState<Date | undefined>(new Date());
  // control popover visibility
  const [open, setOpen] = useState(false);

  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // ⬅️ new state to track loading (disables button and shows loading message)

  // derived YYYY-MM-DD string for expense records
  const selectedDate = date ? date.toISOString().split("T")[0] : "";

  // ⬅️ fetch expenses from Supabase for the selected date
  const fetchExpenses = useCallback(async () => {
    if (!selectedDate) return;
    setIsLoading(true);

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("date", selectedDate)
      .order("inserted_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else if (data) {
      setExpenses(
        (data as Expense[]).map((row) => ({
          id: row.id,
          amount: Number(row.amount),
          note: row.note,
          date: row.date.split("T")[0],
          inserted_at: row.inserted_at,
        }))
      );
    }
    setIsLoading(false);
  }, [selectedDate]); // ✅ now it's properly a dependency

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]); // ✅ no warning anymore

  // add expense
  const addExpense = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error("Please fill in a valid amount.");
      return;
    }

    if (!note.trim()) {
      toast.error("A note is required for each expense.");
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("expenses")
      .insert([
        { amount: Number(amount), note: note.trim(), date: selectedDate },
      ])
      .select(); // ⬅️ return the inserted row;

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data && data.length > 0) {
      setExpenses((prev) => [data[0], ...prev]); // append new expense
    }

    toast.success("Expense added successfully!");

    setAmount("");
    setNote("");
  };

  // ⬅️ delete an expense row in Supabase using its id
  const deleteExpense = async (id?: number) => {
    if (!id) return;
    if (!confirm("Delete this expense?")) return;
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      fetchExpenses(); // reload list so item disappears
    }
  };

  const expensesForDate = expenses.filter((exp) => exp.date === selectedDate);
  const totalForDate = expensesForDate.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-100 rounded-lg border border-gray-100 shadow-inner shadow-gray-400/20 p-3">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xs p-3 mt-1">
        <div className="flex items-center justify-end gap-2">
          Date
          <Popover open={open} onOpenChange={setOpen}>
            {/* use asChild so we can apply custom classes */}
            <PopoverTrigger asChild>
              <button className="w-35 flex justify-between items-center py-1 px-5 border border-gray-200 rounded-lg text-gray-500 text-sm">
                {date ? date.toLocaleDateString() : "Pick a date"}
                <CalendarFold width={15} />
              </button>
            </PopoverTrigger>

            <PopoverContent className="mr-5">
              {/* wrap onSelect so we can setDate AND close popover */}
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  setOpen(false); // <-- auto-close here
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="amount">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              ₱
            </span>
            <Input
              placeholder="0.00"
              className="pl-7 placeholder-gray-400!"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <label htmlFor="note">Note</label>
          <Input
            className="focus:ring-2! text-sm"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-3">
          <Button
            className="font-normal cursor-pointer"
            onClick={addExpense}
            disabled={isLoading} // ⬅️ button disabled when loading
          >
            {isLoading ? "Saving..." : "+ Add Expense"}
          </Button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-xs p-3 mt-3">
        <div className="flex gap-1">
          <h2>Food expenses on </h2>{" "}
          <div className="font-bold">{date?.toDateString()}</div>
        </div>
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
                  <DropdownMenuItem className="cursor-pointer">
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-700 hover:text-red-700!"
                    onClick={() => deleteExpense(exp.id)} // ⬅️ call deleteExpense with the current expense id
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </ul>
        <div className="w-full h-[0.5px] bg-gray-200 my-3" />
        <h3 className="font-bold flex justify-end">Total: ₱{totalForDate}</h3>
      </div>
    </div>
  );
}
