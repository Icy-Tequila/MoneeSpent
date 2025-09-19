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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      fetchExpenses();
    }
  };

  // NEW additions for dropdown + alert logic
  const [dropdownOpen, setDropdownOpen] = useState<number | null | undefined>(
    null
  );
  // tracks which expense's dropdown is open, null = none

  const [alertOpen, setAlertOpen] = useState(false);
  // tracks if the alert dialog is open
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(
    null
  );

  // stores which expense is selected for deletion

  // States for Edit functionality
  const [editAlertOpen, setEditAlertOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [editAmount, setEditAmount] = useState<string>("");
  const [editNote, setEditNote] = useState<string>("");

  // Function to open edit dialog and pre-fill values
  const openEditDialog = (exp: Expense) => {
    setSelectedExpense(exp);
    setEditAmount(exp.amount.toString());
    setEditNote(exp.note);
    setEditAlertOpen(true);
  };

  // Function to save edited expense
  const saveEditedExpense = async () => {
    if (!selectedExpense) return;

    if (!editAmount || isNaN(Number(editAmount))) {
      toast.error("Please fill in a valid amount.");
      return;
    }

    if (!editNote.trim()) {
      toast.error("Note cannot be empty.");
      return;
    }

    const { error } = await supabase
      .from("expenses")
      .update({ amount: Number(editAmount), note: editNote.trim() })
      .eq("id", selectedExpense.id);

    if (error) toast.error(error.message);
    else {
      toast.success("Expense updated successfully!");
      fetchExpenses(); // refresh list
      setEditAlertOpen(false); // close dialog
      setDropdownOpen(null); // close dropdown
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
            <PopoverTrigger asChild className="cursor-pointer">
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
              <DropdownMenu
                open={dropdownOpen === exp.id}
                onOpenChange={(open) => setDropdownOpen(open ? exp.id : null)}
              >
                <DropdownMenuTrigger
                  className="cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EllipsisVertical />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="mr-10"
                  onClick={(e) => e.stopPropagation()} // stops clicks inside content from reaching outer components
                >
                  <button
                    className="w-full text-left text-sm px-2 py-[5px] cursor-pointer hover:bg-gray-100 rounded-sm"
                    onClick={() => openEditDialog(exp)}
                  >
                    Edit
                  </button>
                  <AlertDialog
                    open={editAlertOpen}
                    onOpenChange={setEditAlertOpen}
                  >
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Edit Expense</AlertDialogTitle>
                        <AlertDialogDescription>
                          Update the amount and note for this expense.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            ₱
                          </span>
                          <Input
                            placeholder="0.00"
                            value={editAmount}
                            onChange={(e) => setEditAmount(e.target.value)}
                            className="pl-7" // padding-left to avoid overlap with peso sign
                          />
                        </div>

                        <Input
                          placeholder="Note"
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                        />
                      </div>
                      <AlertDialogFooter>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditAlertOpen(false);
                              setDropdownOpen(null);
                            }}
                            className="w-1/2 cursor-pointer"
                          >
                            Cancel
                          </Button>
                          <Button
                            className="w-1/2 cursor-pointer"
                            onClick={saveEditedExpense}
                          >
                            Save
                          </Button>
                        </div>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* Delete with AlertDialog */}
                  <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                    <AlertDialogTrigger asChild>
                      <button
                        className="w-full text-left text-red-700 hover:text-red-700! text-sm px-2 py-[5px] cursor-pointer hover:bg-gray-100 rounded-sm"
                        onClick={() => {
                          setSelectedExpenseId(exp.id ?? null); // select this expense
                          setAlertOpen(true); // open the confirm deletion dialog
                        }}
                      >
                        Delete
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this expense? <br />{" "}
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setAlertOpen(false);
                              setDropdownOpen(null);
                            }}
                            className="w-1/2 cursor-pointer"
                          >
                            Cancel
                          </Button>
                          <Button
                            className="w-1/2 bg-red-600 hover:bg-red-700 cursor-pointer"
                            onClick={async () => {
                              if (selectedExpenseId) {
                                await deleteExpense(selectedExpenseId);
                              }
                              setAlertOpen(false); // close dialog
                              setDropdownOpen(null); // close dropdown
                            }}
                          >
                            Confirm
                          </Button>
                        </div>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
