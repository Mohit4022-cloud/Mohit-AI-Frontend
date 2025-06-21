import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { config, getApiUrl } from '@/lib/config';

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await axios.post(getApiUrl('/auth/login'), {
            email,
            password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: config.api.timeout,
            validateStatus: (status) => status < 500, // Don't throw on 4xx
          });

          // Check if we got HTML instead of JSON
          const contentType = response.headers['content-type'];
          if (contentType && contentType.includes('text/html')) {
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
          console.error('Login error:', error);
          if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
            throw new Error('Cannot connect to server. Please check if the backend is running.');
          }
          if (error.response?.status === 404) {
            throw new Error('Login endpoint not found. Please check your configuration.');
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
      name: config.auth.tokenKey,
    }
  )
);