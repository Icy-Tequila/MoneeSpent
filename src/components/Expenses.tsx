import { Transaction, Category, Account } from '../types';
import { Card } from './ui/card';
import { Plus, ArrowDownLeft, ArrowUpRight, ArrowRightLeft, Settings } from 'lucide-react';
import { Button } from './ui/button';

interface ExpensesProps {
  transactions: Transaction[];
  categories: Category[];
  accounts: Account[];
  onAddTransaction: () => void;
  onManageCategories: () => void;
}

export function Expenses({
  transactions,
  categories,
  accounts,
  onAddTransaction,
  onManageCategories,
}: ExpensesProps) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getCategoryName = (id?: string) => {
    return categories.find((c) => c.id === id)?.name || 'Unknown';
  };

  const getAccountName = (id?: string) => {
    return accounts.find((a) => a.id === id)?.name || 'Unknown';
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'expense':
        return <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case 'transfer':
        return <ArrowRightLeft className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      default:
        return null;
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'income':
        return 'text-green-600 dark:text-green-400';
      case 'expense':
        return 'text-red-600 dark:text-red-400';
      case 'transfer':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return '';
    }
  };

  return (
    <div className="pb-20 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="mb-1">Transactions</h1>
          <p className="text-muted-foreground">{transactions.length} total</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onManageCategories}
          className="rounded-full"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-3">
        {sortedTransactions.map((transaction) => (
          <Card key={transaction.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-muted rounded-lg mt-0.5">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="mb-1">
                    {transaction.type === 'transfer'
                      ? 'Transfer'
                      : getCategoryName(transaction.category)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.type === 'transfer'
                      ? `${getAccountName(transaction.fromAccount)} → ${getAccountName(
                          transaction.toAccount
                        )}`
                      : getAccountName(transaction.account)}
                  </p>
                  {transaction.note && (
                    <p className="text-sm text-muted-foreground mt-1">{transaction.note}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <p className={`${getAmountColor(transaction.type)} whitespace-nowrap ml-2`}>
                {transaction.type === 'income' ? '+' : transaction.type === 'expense' ? '-' : ''}₱
                {transaction.amount.toFixed(2)}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={onAddTransaction}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform active:scale-95 z-40"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
