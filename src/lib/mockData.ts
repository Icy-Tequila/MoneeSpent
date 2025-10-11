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
  { id: '9', name: 'Allowance', type: 'income', icon: 'Wallet' },
];

export const initialAccounts: Account[] = [
  { id: '1', name: 'Cash', balance: 0.00, icon: 'Wallet' },
  { id: '2', name: 'Card', balance: 0.00, icon: 'CreditCard' },
];

export const initialTransactions: Transaction[] = [
  
];
