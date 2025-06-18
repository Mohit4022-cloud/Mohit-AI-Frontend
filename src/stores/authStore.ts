import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationId: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          console.log('Attempting login to:', `${API_URL}/auth/login`);
          
          const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
            validateStatus: (status) => status < 500, // Don't throw on 4xx
          });

          // Check if we got HTML instead of JSON
          const contentType = response.headers['content-type'];
          if (contentType && contentType.includes('text/html')) {
            console.error('Received HTML instead of JSON. Response:', response.data.substring(0, 200));
            throw new Error('API endpoint not found. Please check the backend deployment.');
          }

          if (response.status !== 200) {
            throw new Error(response.data?.message || 'Login failed');
          }

          const { user, token } = response.data;
          
          // Set default axios header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          set({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (error: any) {
          if (error.code === 'ECONNREFUSED') {
            throw new Error('Cannot connect to server. Please check if the backend is running.');
          }
          throw new Error(error.response?.data?.message || error.message || 'Login failed');
        }
      },

      logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);