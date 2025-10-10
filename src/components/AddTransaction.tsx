import { useState } from "react";
import { Transaction, Category, Account } from "../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { NumericKeypad } from "./NumericKeypad";

interface AddTransactionProps {
  open: boolean;
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, "id">) => void;
  categories: Category[];
  accounts: Account[];
}

export function AddTransaction({
  open,
  onClose,
  onAdd,
  categories,
  accounts,
}: AddTransactionProps) {
  const [transactionType, setTransactionType] = useState<
    "income" | "expense" | "transfer"
  >("expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) return;

    const transaction: Omit<Transaction, "id"> = {
      type: transactionType,
      amount: parseFloat(amount),
      date: new Date(date),
      note: note || undefined,
    };

    if (transactionType === "transfer") {
      if (!fromAccount || !toAccount) return;
      transaction.fromAccount = fromAccount;
      transaction.toAccount = toAccount;
    } else {
      if (!category || !account) return;
      transaction.category = category;
      transaction.account = account;
    }

    onAdd(transaction);
    handleClose();
  };

  const handleClose = () => {
    setDate(new Date().toISOString().split("T")[0]);
    setAmount("");
    setCategory("");
    setAccount("");
    setFromAccount("");
    setToAccount("");
    setNote("");
    onClose();
  };

  const incomeCategories = categories.filter((c) => c.type === "income");
  const expenseCategories = categories.filter((c) => c.type === "expense");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <Tabs
          value={transactionType}
          onValueChange={(v) =>
            setTransactionType(v as "income" | "expense" | "transfer")
          }
          className="w-full flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expense</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
            </TabsList>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto px-6 pb-4"
          >
            <div className="mt-4 space-y-4">
              {/* Common Fields */}
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <NumericKeypad value={amount} onChange={setAmount} />
              </div>

              {/* Income/Expense Fields */}
              <TabsContent value="income" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="income-category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="income-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {incomeCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income-account">Account</Label>
                  <Select value={account} onValueChange={setAccount} required>
                    <SelectTrigger id="income-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="expense" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="expense-category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="expense-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expense-account">Account</Label>
                  <Select value={account} onValueChange={setAccount} required>
                    <SelectTrigger id="expense-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="transfer" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="from-account">From Account</Label>
                  <Select
                    value={fromAccount}
                    onValueChange={setFromAccount}
                    required
                  >
                    <SelectTrigger id="from-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to-account">To Account</Label>
                  <Select
                    value={toAccount}
                    onValueChange={setToAccount}
                    required
                  >
                    <SelectTrigger id="to-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Add Transaction
                </Button>
              </div>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
