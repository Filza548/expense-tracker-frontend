// // // // import axios from 'axios';
// // // // import { supabase } from './supabase';

// // // // const api = axios.create({
// // // //   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
// // // // });

// // // // // Token automatically add karo har request mein
// // // // api.interceptors.request.use(async (config) => {
// // // //   const { data: { session } } = await supabase.auth.getSession();
// // // //   if (session?.access_token) {
// // // //     config.headers.Authorization = `Bearer ${session.access_token}`;
// // // //   }
// // // //   return config;
// // // // });

// // // // // Auth APIs
// // // // export const authAPI = {
// // // //   register: (email: string, password: string, full_name: string) =>
// // // //     api.post('/auth/register', { email, password, full_name }),
  
// // // //   login: (email: string, password: string) =>
// // // //     api.post('/auth/login', { email, password }),
  
// // // //   logout: async () => {
// // // //     await supabase.auth.signOut();
// // // //   },
// // // // };

// // // // // Categories APIs
// // // // export const categoriesAPI = {
// // // //   getAll: () => api.get('/categories'),
// // // // };

// // // // // Expenses APIs
// // // // export const expensesAPI = {
// // // //   getAll: (params?: { startDate?: string; endDate?: string; categoryId?: string }) =>
// // // //     api.get('/expenses', { params }),
  
// // // //   getOne: (id: string) => api.get(`/expenses/${id}`),
  
// // // //   create: (data: any) => api.post('/expenses', data),
  
// // // //   update: (id: string, data: any) => api.put(`/expenses/${id}`, data),
  
// // // //   delete: (id: string) => api.delete(`/expenses/${id}`),
  
// // // //   getSummary: () => api.get('/expenses/summary'),
// // // // };

// // // // export default api;



// // // import axios from 'axios';

// // // const api = axios.create({
// // //   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
// // // });

// // // console.log('API URL:', api.defaults.baseURL); // Debug

// // // export const authAPI = {
// // //   register: (email: string, password: string, full_name: string) =>
// // //     api.post('/auth/register', { email, password, full_name }),
  
// // //   login: (email: string, password: string) =>
// // //     api.post('/auth/login', { email, password }),
// // // };

// // // export default api;












// // import axios from 'axios';

// // // Direct URL use karo
// // const api = axios.create({
// //   baseURL: 'http://localhost:4000',
// // });

// // console.log('API Base URL:', api.defaults.baseURL);

// // // Auth APIs
// // export const authAPI = {
// //   register: (email: string, password: string, full_name: string) =>
// //     api.post('/auth/register', { email, password, full_name }),
  
// //   login: (email: string, password: string) =>
// //     api.post('/auth/login', { email, password }),
// // };

// // export default api;


// import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
// });

// // Request interceptor - automatically add token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor - handle auth errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('auth_token');
//       localStorage.removeItem('auth_user');
//       window.location.href = '/';
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth APIs
// export const authAPI = {
//   register: (email: string, password: string, full_name: string) =>
//     api.post('/auth/register', { email, password, full_name }),
  
//   login: (email: string, password: string) =>
//     api.post('/auth/login', { email, password }),
// };

// // Categories APIs
// export const categoriesAPI = {
//   getAll: () => api.get('/categories'),
// };

// // Expenses APIs  
// export const expensesAPI = {
//   getAll: () => api.get('/expenses'),
//   getSummary: () => api.get('/expenses/summary'),
//   create: (data: any) => api.post('/expenses', data),
//   update: (id: string, data: any) => api.put(`/expenses/${id}`, data),
//   delete: (id: string) => api.delete(`/expenses/${id}`),
// };

// export default api;











import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
});

// Request interceptor - automatically add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (email: string, password: string, full_name: string) =>
    api.post('/auth/register', { email, password, full_name }),
  
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

// Categories APIs
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
};

// Expenses APIs - ✅ getOne ADDED
export const expensesAPI = {
  getAll: () => api.get('/expenses'),
  getOne: (id: string) => api.get(`/expenses/${id}`),        // ← YEH ADD KIYA
  getSummary: () => api.get('/expenses/summary'),
  create: (data: any) => api.post('/expenses', data),
  update: (id: string, data: any) => api.put(`/expenses/${id}`, data),
  delete: (id: string) => api.delete(`/expenses/${id}`),
};

export default api;