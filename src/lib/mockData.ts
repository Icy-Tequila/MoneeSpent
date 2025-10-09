import { Account, Category, Transaction } from '../types';

export const initialCategories: Category[] = [
  { id: '1', name: 'Salary', type: 'income', icon: 'Briefcase' },
  { id: '2', name: 'Freelance', type: 'income', icon: 'Laptop' },
  { id: '3', name: 'Food', type: 'expense', icon: 'UtensilsCrossed' },
  { id: '4', name: 'Transport', type: 'expense', icon: 'Car' },
  { id: '5', name: 'Shopping', type: 'expense', icon: 'ShoppingBag' },
  { id: '6', name: 'Entertainment', type: 'expense', icon: 'Film' },
  { id: '7', name: 'Bills', type: 'expense', icon: 'Receipt' },
  { id: '8', name: 'Healthcare', type: 'expense', icon: 'Heart' },
];

export const initialAccounts: Account[] = [
  { id: '1', name: 'Cash', balance: 1250.50, icon: 'Wallet' },
  { id: '2', name: 'Card', balance: 3840.75, icon: 'CreditCard' },
  { id: '3', name: 'Savings', balance: 15000.00, icon: 'PiggyBank' },
];

export const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    date: new Date(2025, 9, 1),
    category: '1',
    account: '2',
    note: 'Monthly salary',
  },
  {
    id: '2',
    type: 'expense',
    amount: 45.50,
    date: new Date(2025, 9, 3),
    category: '3',
    account: '1',
    note: 'Lunch with team',
  },
  {
    id: '3',
    type: 'expense',
    amount: 120.00,
    date: new Date(2025, 9, 5),
    category: '5',
    account: '2',
    note: 'New headphones',
  },
  {
    id: '4',
    type: 'transfer',
    amount: 1000,
    date: new Date(2025, 9, 6),
    fromAccount: '2',
    toAccount: '3',
    note: 'Monthly savings',
  },
  {
    id: '5',
    type: 'expense',
    amount: 60.00,
    date: new Date(2025, 9, 7),
    category: '4',
    account: '1',
    note: 'Gas',
  },
  {
    id: '6',
    type: 'income',
    amount: 800,
    date: new Date(2025, 9, 8),
    category: '2',
    account: '2',
    note: 'Website project',
  },
  {
    id: '7',
    type: 'expense',
    amount: 25.30,
    date: new Date(2025, 9, 9),
    category: '3',
    account: '1',
    note: 'Groceries',
  },
];
