import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/components/user';

export interface AuthState {
  user: User | null;
  homeserver: string;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  setUser: (user: User) => void;
  setAuth: (homeserver: string, accessToken: string, user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  homeserver: 'matrix.org',
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user: User) =>
        set({ user }),

      setAuth: (homeserver: string, accessToken: string, user: User) =>
        set({
          homeserver,
          accessToken,
          user,
          isAuthenticated: true,
          error: null,
        }),

      logout: () =>
        set({
          ...initialState,
          homeserver: 'matrix.org', // Keep default homeserver
        }),

      setLoading: (isLoading: boolean) =>
        set({ isLoading }),

      setError: (error: string | null) =>
        set({ error, isLoading: false }),

      clearError: () =>
        set({ error: null }),
    }),
    {
      name: 'nexus-auth',
      partialize: (state) => ({
        homeserver: state.homeserver,
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
