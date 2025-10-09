import { Transaction, Category, Account } from "../types";
import { Card } from "./ui/card";
import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type LabelProps = {
  name: string;
  percent: number;
};

interface DashboardProps {
  transactions: Transaction[];
  categories: Category[];
  accounts: Account[];
}

export function Dashboard({
  transactions,
  categories,
  accounts,
}: DashboardProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  const totalIncome = monthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Category breakdown for expenses
  const expensesByCategory = monthTransactions
    .filter((t) => t.type === "expense" && t.category)
    .reduce((acc, t) => {
      const categoryName =
        categories.find((c) => c.id === t.category)?.name || "Other";
      acc[categoryName] = (acc[categoryName] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  return (
    <div className="pb-20 px-4 pt-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          {monthName} {currentYear}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Balance Card */}
        <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="flex items-center justify-between mb-2">
            <p className="opacity-90">Total Balance</p>
            <TrendingUp className="h-5 w-5 opacity-90" />
          </div>
          <p className="text-3xl">₱{balance.toFixed(2)}</p>
        </Card>

        {/* Income and Expenses */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-muted-foreground text-sm">Income</p>
            </div>
            <p className="text-xl text-green-600 dark:text-green-400">
              ₱{totalIncome.toFixed(2)}
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-muted-foreground text-sm">Expenses</p>
            </div>
            <p className="text-xl text-red-600 dark:text-red-400">
              ₱{totalExpenses.toFixed(2)}
            </p>
          </Card>
        </div>
      </div>

      {/* Expense Breakdown */}
      {chartData.length > 0 && (
        <Card className="p-6">
          <h2 className="mb-4">Expense Breakdown</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props) => {
                    const { name, percent } = props as unknown as {
                      name: string;
                      percent?: number;
                    };
                    return `${name} ${((percent || 0) * 100).toFixed(0)}%`;
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {chartData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm">₱{item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
