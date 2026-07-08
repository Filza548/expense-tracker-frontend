'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { expensesAPI, categoriesAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Expense {
  id: string;
  amount: number;
  description: string;
  expense_date: string;
  categories?: {
    name: string;
    icon: string;
    color: string;
  };
}

interface Summary {
  total: number;
  count: number;
  average: number;
}

export default function DashboardPage() {
  const { user, token, signOut } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<Summary>({ total: 0, count: 0, average: 0 });

  useEffect(() => {
    if (!token) {
      router.push('/');
      return;
    }
    loadDashboard();
  }, [token]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [expensesRes, summaryRes] = await Promise.all([
        expensesAPI.getAll(),
        expensesAPI.getSummary()
      ]);
      
      setExpenses(expensesRes.data);
      setSummary(summaryRes.data);
    } catch (error: any) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    
    try {
      await expensesAPI.delete(id);
      toast.success('Expense deleted');
      loadDashboard();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Expense Tracker</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.full_name || user?.email}</span>
            <button
              onClick={signOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-800 text-sm">Total Expenses</p>
            <p className="text-3xl font-bold text-gray-800">Rs.{summary.total.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-800 text-sm">Number of Transactions</p>
            <p className="text-3xl font-bold text-gray-800">{summary.count}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-800 text-sm">Average Expense</p>
            <p className="text-3xl font-bold text-gray-800">Rs.{summary.average.toFixed(2)}</p>
          </div>
        </div>

        {/* Add Expense Button */}
        <div className="mb-6">
          <Link
            href="/expenses/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block"
          >
            + Add New Expense
          </Link>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-green-700">Recent Expenses</h2>
          </div>
          <div className="divide-y">
            {expenses.length === 0 ? (
              <div className="p-6 text-center text-gray-900">
                No expenses yet. Click "Add New Expense" to get started!
              </div>
            ) : (
              expenses.slice(0, 10).map((expense) => (
                <div key={expense.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-gray-500">{expense.categories?.icon || '💰'}</div>
                    <div>
                      <p className="font-medium text-gray-800">{expense.description}</p>
                      <p className="text-sm text-gray-500 text-gray-500">
                        {expense.categories?.name} • {new Date(expense.expense_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-lg text-green-500">Rs.{expense.amount.toFixed(2)}</span>
                    <Link
                      href={`/expenses/edit/${expense.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}