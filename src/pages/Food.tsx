import React from "react";
import { DatePicker } from "../components/ui/date-picker";

export default function Food() {
  return (
    <div className="border border-gray-200 rounded-lg shadow-xs p-3">
      Food Expenses
      <DatePicker />
    </div>
  );
}
