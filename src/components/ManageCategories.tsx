import { useState } from 'react';
import { Category } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface ManageCategoriesProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  onAdd: (category: Omit<Category, 'id'>) => void;
  onUpdate: (id: string, category: Omit<Category, 'id'>) => void;
  onDelete: (id: string) => void;
}

export function ManageCategories({
  open,
  onClose,
  categories,
  onAdd,
  onUpdate,
  onDelete,
}: ManageCategoriesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');

  const incomeCategories = categories.filter((c) => c.type === 'income');
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      onUpdate(editingId, { name: name.trim(), type: activeTab });
      setEditingId(null);
    } else {
      onAdd({ name: name.trim(), type: activeTab });
    }

    setName('');
    setIsAdding(false);
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setName(category.name);
    setType(category.type);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setName('');
    setType('expense');
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setDeleteId(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <Tabs
              value={activeTab}
              onValueChange={(val) => setActiveTab(val as 'expense' | 'income')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="expense">Expenses</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
              </TabsList>

              <TabsContent value="expense" className="space-y-3 mt-4">
                {expenseCategories.map((category) => (
                  <Card key={category.id} className="p-3 flex items-center justify-between">
                    <span>{category.name}</span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(category)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(category.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="income" className="space-y-3 mt-4">
                {incomeCategories.map((category) => (
                  <Card key={category.id} className="p-3 flex items-center justify-between">
                    <span>{category.name}</span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(category)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(category.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {isAdding ? (
            <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Food, Salary"
                  autoFocus
                  required
                />
              </div>

              {/* <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={type === 'expense' ? 'default' : 'outline'}
                    onClick={() => setType('expense')}
                    className="flex-1"
                  >
                    Expense
                  </Button>
                  <Button
                    type="button"
                    variant={type === 'income' ? 'default' : 'outline'}
                    onClick={() => setType('income')}
                    className="flex-1"
                  >
                    Income
                  </Button>
                </div>
              </div> */}

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingId ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          ) : (
            <Button onClick={() => setIsAdding(true)} className="mt-4 w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
