"use client";

import { useState } from "react";
import { Transaction, Category, Account } from "../types";
import {
  initialCategories,
  initialAccounts,
  initialTransactions,
} from "../lib/mockData";
import { BottomNav } from "../components/BottomNav";
import { Dashboard } from "../components/Dashboard";
import { Expenses } from "../components/Expenses";
import { Accounts } from "../components/Accounts";

// 🟡 These imports are not yet used but ready for future use
import { AddTransaction } from "../components/AddTransaction";
// import { ManageCategories } from "./components/ManageCategories";
// import { ManageAccounts } from "./components/ManageAccounts";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

  // These will be used later
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  // const [isManageCategoriesOpen, setIsManageCategoriesOpen] = useState(false);
  // const [isManageAccountsOpen, setIsManageAccountsOpen] = useState(false);

  const updateAccountBalance = (accountId?: string, amount?: number) => {
    if (!accountId || typeof amount !== "number") return;
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, balance: acc.balance + amount } : acc
      )
    );
  };

  // replace your existing handleAddTransaction with this (minimal change)
  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };

    // update balances safely
    if (newTransaction.type === "income") {
      // add to account balance
      updateAccountBalance(newTransaction.account, newTransaction.amount);
    } else if (newTransaction.type === "expense") {
      // subtract from account balance
      updateAccountBalance(newTransaction.account, -newTransaction.amount);
    } else if (newTransaction.type === "transfer") {
      // handle transfer: subtract from fromAccount, add to toAccount (if present)
      updateAccountBalance(newTransaction.fromAccount, -newTransaction.amount);
      updateAccountBalance(newTransaction.toAccount, newTransaction.amount);
    }

    // add transaction to state (keeps your original order pattern)
    setTransactions((prev) => [newTransaction, ...prev]);

    // 🟢 Close modal after adding
    setIsAddTransactionOpen(false);
  };

  // const handleAddCategory = (category: Omit<Category, "id">) => {
  //   const newCategory: Category = {
  //     ...category,
  //     id: Date.now().toString(),
  //   };
  //   setCategories([...categories, newCategory]);
  // };

  // const handleAddAccount = (account: Omit<Account, "id">) => {
  //   const newAccount: Account = {
  //     ...account,
  //     id: Date.now().toString(),
  //   };
  //   setAccounts([...accounts, newAccount]);
  // };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="mx-auto">
        {activeTab === "dashboard" && (
          <Dashboard
            transactions={transactions}
            categories={categories}
            accounts={accounts}
          />
        )}

        {activeTab === "expenses" && (
          <Expenses
            transactions={transactions}
            categories={categories}
            accounts={accounts}
            onAddTransaction={() => setIsAddTransactionOpen(true)}
            onManageCategories={() => console.log("Manage categories clicked")}
          />
        )}

        {activeTab === "accounts" && (
          <Accounts
            accounts={accounts}
            transactions={transactions}
            onManageAccounts={() => console.log("Manage accounts clicked")}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Dialogs (🟡 Keep commented out until those components are ready) */}

      <AddTransaction
        open={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
        onAdd={handleAddTransaction}
        categories={categories}
        accounts={accounts}
      />

      {/* <ManageCategories
        open={isManageCategoriesOpen}
        onClose={() => setIsManageCategoriesOpen(false)}
        categories={categories}
        onAdd={handleAddCategory}
        onUpdate={handleUpdateCategory}
        onDelete={handleDeleteCategory}
      />

      <ManageAccounts
        open={isManageAccountsOpen}
        onClose={() => setIsManageAccountsOpen(false)}
        accounts={accounts}
        onAdd={handleAddAccount}
        onUpdate={handleUpdateAccount}
        onDelete={handleDeleteAccount}
      /> */}
    </div>
  );
}
