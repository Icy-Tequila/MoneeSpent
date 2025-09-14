import React from "react";
import { DatePicker } from "../components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function History() {
  return (
    <div className="flex flex-col h-[84dvh]">
      <h1 className="font-bold text-lg">Expenses History</h1>
      <div className="flex justify-between my-3 text-sm gap-1">
        <div className="flex items-center gap-1">
          Date
          <DatePicker />
        </div>
        <div className="flex items-center gap-1">
          Filter
          <Select>
            <SelectTrigger className="w-auto max-w-[150px] cursor-pointer">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="food" className="cursor-pointer">
                Food
              </SelectItem>
              <SelectItem value="transportation" className="cursor-pointer">
                Transportation
              </SelectItem>
              <SelectItem value="other" className="cursor-pointer">
                Other
              </SelectItem>
              <SelectItem value="all" className="cursor-pointer">
                All
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollArea className="flex-1 overflow-auto bg-gray-100 rounded-lg border border-gray-100 shadow-inner shadow-gray-400/20 p-3">
        <div className="bg-white rounded-lg shadow-sm p-3 text-sm mb-3">
          <div className="flex justify-between font-bold">
            <h2>Sept. 14</h2>  <h2>Total: ₱510</h2>
          </div>
          <div className="w-full h-[0.5px] bg-gray-200 my-3"></div>
          <div>
            <label htmlFor="food">Food</label>
            <ul className="list-disc ml-10 my-2 flex flex-col gap-2">
              <li>₱60 - Breakfast Bread</li>
              <li>₱120 - Lunch Jollibee</li>
              <li>₱80 - Bingsu</li>
            </ul>
            <label htmlFor="transportation">Transportation</label>
            <ul className="list-disc ml-10 my-2 flex flex-col gap-2">
              <li>₱60 - To STI</li>
              <li>₱90 - To Hauz</li>
            </ul>
            <label htmlFor="food">Other</label>
            <ul className="list-disc ml-10 my-2 flex flex-col gap-2">
              <li>₱100 - Hair clip</li>
            </ul>
          </div>
          <div className="w-full h-[0.5px] bg-gray-200 my-3"></div>
          <h2 className="text-sm font-bold">Subtotal:  ₱260 (Food) |  ₱150 (Transportation) | ₱100 (Others)</h2>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 text-sm mb-3">
          <div className="flex justify-between font-bold">
            <h2>Sept. 13</h2>  <h2>Total: ₱510</h2>
          </div>
          <div className="w-full h-[0.5px] bg-gray-200 my-3"></div>
          <div>
            <label htmlFor="food">Food</label>
            <ul className="list-disc ml-10 my-2 flex flex-col gap-2">
              <li>₱60 - Breakfast Bread</li>
              <li>₱120 - Lunch Jollibee</li>
              <li>₱80 - Bingsu</li>
            </ul>
            <label htmlFor="transportation">Transportation</label>
            <ul className="list-disc ml-10 my-2 flex flex-col gap-2">
              <li>₱60 - To STI</li>
              <li>₱90 - To Hauz</li>
            </ul>
            <label htmlFor="food">Other</label>
            <ul className="list-disc ml-10 my-2 flex flex-col gap-2">
              <li>₱100 - Hair clip</li>
            </ul>
          </div>
          <div className="w-full h-[0.5px] bg-gray-200 my-3"></div>
          <h2 className="text-sm font-bold">Subtotal:  ₱260 (Food) |  ₱150 (Transportation) | ₱100 (Others)</h2>
        </div>
      </ScrollArea>
      <div className="p-3 pb-0">
        <h2 className="text-sm">Subtotal:  ₱520 (Food) |  ₱300 (Transpo) | ₱200 (Others)</h2>
      <h2 className="font-bold">Total: ₱1,020</h2>
      </div>
    </div>
  );
}
