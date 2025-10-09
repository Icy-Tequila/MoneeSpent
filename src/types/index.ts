export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon?: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  icon?: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: Date;
  category?: string;
  fromAccount?: string;
  toAccount?: string;
  account?: string;
  note?: string;
}
