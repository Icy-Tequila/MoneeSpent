import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="w-full h-[100dvh]">
      <Tabs defaultValue="dashboard" className="w-full flex flex-col">
        <div className="w-full m-3">
          <TabsContent value="dashboard">Dasboard</TabsContent>
          <TabsContent value="expenses">Expenses</TabsContent>
          <TabsContent value="history">History</TabsContent>
        </div>
        <div className="flex justify-center">
          <TabsList className="w-[95%] h-13 gap-2 p-2 fixed bottom-2">
            <TabsTrigger value="dashboard" className="cursor-pointer">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="expenses" className="cursor-pointer">
              Expenses
            </TabsTrigger>
            <TabsTrigger value="history" className="cursor-pointer">
              History
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
