import { Transaction, Account } from '../types';
import { Card } from './ui/card';
import { Settings, Wallet, CreditCard, PiggyBank } from 'lucide-react';
import { Button } from './ui/button';

interface AccountsProps {
  accounts: Account[];
  transactions: Transaction[];
  onManageAccounts: () => void;
}

export function Accounts({ accounts, transactions, onManageAccounts }: AccountsProps) {
  const getAccountIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Wallet':
        return <Wallet className="h-5 w-5" />;
      case 'CreditCard':
        return <CreditCard className="h-5 w-5" />;
      case 'PiggyBank':
        return <PiggyBank className="h-5 w-5" />;
      default:
        return <Wallet className="h-5 w-5" />;
    }
  };

  const getAccountTransactions = (accountId: string) => {
    return transactions
      .filter(
        (t) =>
          t.account === accountId ||
          t.fromAccount === accountId ||
          t.toAccount === accountId
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="pb-20 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="mb-1">Accounts</h1>
          <p className="text-muted-foreground">Total: ₱{totalBalance.toFixed(2)}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onManageAccounts}
          className="rounded-full"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => {
          const accountTransactions = getAccountTransactions(account.id);

          return (
            <Card key={account.id} className="overflow-hidden">
              {/* Account Header */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      {getAccountIcon(account.icon)}
                    </div>
                    <div>
                      <p>{account.name}</p>
                      <p className="text-2xl mt-1">₱{account.balance.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              {accountTransactions.length > 0 && (
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">Recent Transactions</p>
                  <div className="space-y-2">
                    {accountTransactions.map((transaction) => {
                      const isIncoming =
                        transaction.type === 'income' ||
                        transaction.toAccount === account.id;
                      const isOutgoing =
                        transaction.type === 'expense' ||
                        transaction.fromAccount === account.id;

                      let sign = '';
                      let color = '';

                      if (transaction.type === 'transfer') {
                        if (transaction.toAccount === account.id) {
                          sign = '+';
                          color = 'text-green-600 dark:text-green-400';
                        } else {
                          sign = '-';
                          color = 'text-red-600 dark:text-red-400';
                        }
                      } else if (isIncoming) {
                        sign = '+';
                        color = 'text-green-600 dark:text-green-400';
                      } else if (isOutgoing) {
                        sign = '-';
                        color = 'text-red-600 dark:text-red-400';
                      }

                      return (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="truncate">
                              {transaction.note || transaction.type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(transaction.date)}
                            </p>
                          </div>
                          <p className={`${color} ml-2 whitespace-nowrap`}>
                            {sign}₱{transaction.amount.toFixed(2)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
