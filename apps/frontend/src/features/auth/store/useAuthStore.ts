// src/features/auth/store/useAuthStore.ts
import { create } from 'zustand';

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
  fullName: string;
  username: string;
  email: string;
  imageUrl?: string;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isInitialized: false,
  getIsAuthenticated: () => {
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      set(() => ({ isAuthenticated: false, user: null, isInitialized: true }));
      return;
    }
    
    try {
      const parsedUser = userData ? JSON.parse(userData) : null;
      
      set(() => ({
        user: parsedUser,
        isAuthenticated: !!token,
        isInitialized: true,
      }));
    } catch (error) {
      console.error('Error parsing user data:', error);
      set(() => ({ isAuthenticated: false, user: null, isInitialized: true }));
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
  logout: () => {
    set({ isAuthenticated: false, user: null, isInitialized: true });
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },
}));

export default useAuthStore;
