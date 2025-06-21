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

// DEMO BYPASS: Mock user data
const DEMO_USER: User = {
  id: 'demo-user',
  email: 'demo@mohitai.com',
  name: 'Demo User',
  role: 'admin',
  organizationId: 'demo-org'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // DEMO BYPASS: Always authenticated with demo user
      user: DEMO_USER,
      token: 'demo-token',
      isAuthenticated: true,

      login: async (email: string, password: string) => {
        // DEMO BYPASS: Always succeed with demo user
        set({
          user: DEMO_USER,
          token: 'demo-token',
          isAuthenticated: true,
        });
      },

      logout: () => {
        // DEMO BYPASS: Logout just redirects but keeps demo user
        window.location.href = '/login';
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