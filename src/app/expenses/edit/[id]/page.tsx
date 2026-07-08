// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import { expensesAPI, categoriesAPI } from '@/lib/api';
// import toast from 'react-hot-toast';
// import Link from 'next/link';
// import api from '../../../../lib/api';  // Add this import

// interface Category {
//   id: string;
//   name: string;
//   icon: string;
//   color: string;
// }

// interface Expense {
//   id: string;
//   category_id: string;
//   amount: number;
//   description: string;
//   expense_date: string;
// }

// export default function EditExpensePage() {
//   const { token } = useAuth();
//   const router = useRouter();
//   const params = useParams();
//   const expenseId = params.id as string;
  
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [formData, setFormData] = useState({
//     category_id: '',
//     amount: '',
//     description: '',
//     expense_date: ''
//   });

//   useEffect(() => {
//     if (!token) {
//       router.push('/');
//       return;
//     }
//     loadData();
//   }, [token, expenseId]);

//   const loadData = async () => {
//     try {
//       const [categoriesRes, expenseRes] = await Promise.all([
//         categoriesAPI.getAll(),
//         // expensesAPI.getOne(expenseId)
//         const expenseRes = await api.get(`/expenses/${expenseId}`);
//       ]);
      
//       setCategories(categoriesRes.data);
//       const expense = expenseRes.data;
//       setFormData({
//         category_id: expense.category_id,
//         amount: expense.amount.toString(),
//         description: expense.description,
//         expense_date: expense.expense_date.split('T')[0]
//       });
//     } catch (error) {
//       console.error('Error loading data:', error);
//       toast.error('Failed to load expense');
//       router.push('/dashboard');
//     } finally {
//       setFetching(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.category_id || !formData.amount || !formData.description) {
//       toast.error('Please fill all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       await expensesAPI.update(expenseId, {
//         category_id: formData.category_id,
//         amount: parseFloat(formData.amount),
//         description: formData.description,
//         expense_date: formData.expense_date
//       });
//       toast.success('Expense updated successfully!');
//       router.push('/dashboard');
//     } catch (error: any) {
//       console.error('Error updating expense:', error);
//       toast.error(error.response?.data?.message || 'Failed to update expense');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="max-w-2xl mx-auto px-4">
//         <div className="mb-6">
//           <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
//             ← Back to Dashboard
//           </Link>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-2xl font-bold mb-6">Edit Expense</h1>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Category */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category *
//               </label>
//               <select
//                 value={formData.category_id}
//                 onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.icon} {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Amount */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Amount (₹) *
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={formData.amount}
//                 onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <input
//                 type="text"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Date *
//               </label>
//               <input
//                 type="date"
//                 value={formData.expense_date}
//                 onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? 'Updating...' : 'Update Expense'}
//               </button>
//               <Link
//                 href="/dashboard"
//                 className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-center hover:bg-gray-400"
//               >
//                 Cancel
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { expensesAPI, categoriesAPI } from '@/lib/api';
import api from '@/lib/api';  // ← ADD THIS
import toast from 'react-hot-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function EditExpensePage() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const expenseId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    category_id: '',
    amount: '',
    description: '',
    expense_date: ''
  });

  useEffect(() => {
    if (!token) {
      router.push('/');
      return;
    }
    loadData();
  }, [token, expenseId]);

  const loadData = async () => {
    try {
      const [categoriesRes, expenseRes] = await Promise.all([
        categoriesAPI.getAll(),
        api.get(`/expenses/${expenseId}`)  // ← DIRECT API CALL
      ]);
      console.log(categoriesRes.data);
      
      setCategories(categoriesRes.data);
      const expense = expenseRes.data;
      setFormData({
        category_id: expense.category_id,
        amount: expense.amount.toString(),
        description: expense.description,
        expense_date: expense.expense_date?.split('T')[0] || new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load expense');
      router.push('/dashboard');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category_id || !formData.amount || !formData.description) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await expensesAPI.update(expenseId, {
        category_id: formData.category_id,
        amount: parseFloat(formData.amount),
        description: formData.description,
        expense_date: formData.expense_date
      });
      toast.success('Expense updated successfully! ✨');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error updating expense:', error);
      toast.error(error.response?.data?.message || 'Failed to update expense');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Edit Expense
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all  placeholder:text-gray-600"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all  placeholder:text-gray-600"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What was this expense for?"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all  placeholder:text-gray-600 " 
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData.expense_date}
                onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all  placeholder:text-gray-600"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Expense
                  </>
                )}
              </motion.button>
              
              <Link
                href="/dashboard"
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-center hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}