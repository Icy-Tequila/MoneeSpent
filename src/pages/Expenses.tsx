import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Expenses() {
  return (
    <div>
      <h1 className="font-bold text-lg">Daily Expenses</h1>
      <div>
        <Tabs defaultValue="food" className="w-[400px] mt-3">
          <TabsList className="h-12 p-2">
            <TabsTrigger value="food" className="px-3">
              Food
            </TabsTrigger>
            <TabsTrigger value="transportation" className="px-3">
              Transportation
            </TabsTrigger>
            <TabsTrigger value="other" className="px-3">
              Other
            </TabsTrigger>
          </TabsList>
          <TabsContent value="food">Food Expenses</TabsContent>
          <TabsContent value="transportation">
            Transportation Expenses
          </TabsContent>
          <TabsContent value="other">Other Expenses</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
