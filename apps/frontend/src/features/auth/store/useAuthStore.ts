// src/features/auth/store/useAuthStore.ts
import { create } from 'zustand';
import api from '../../../shared/lib/axios';

interface AuthState {
  getIsAuthenticated: () => void;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  setAuthenticated: (userData: User) => void;
  logout: () => void;
}

interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  image?: string;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isInitialized: false,
  getIsAuthenticated: async () => {
    // Primero verificamos si hay un indicador en localStorage
    const hasAttemptedLogin = localStorage.getItem('hasAttemptedLogin');

    if (!hasAttemptedLogin) {
      set(() => ({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      }));
      return;
    }

    try {
      const response = await api.get('/auth/verify');
      set(() => ({
        user: response.data.user,
        isAuthenticated: true,
        isInitialized: true,
      }));
    } catch {
      localStorage.removeItem('hasAttemptedLogin');
      set(() => ({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      }));
    }
  },
  user: null,
  setAuthenticated: (userData: User) => {
    set(() => ({
      isAuthenticated: true,
      user: userData,
      isInitialized: true,
    }));
  },
  logout: async () => {
    await api.post('/auth/logout'); // Endpoint para limpiar la cookie
    localStorage.removeItem('hasAttemptedLogin');
    set({
      isAuthenticated: false,
      user: null,
      isInitialized: true,
    });
  },
}));

export default useAuthStore;
