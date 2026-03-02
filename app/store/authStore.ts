import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setAccessToken } from "~/lib/axios";
import type { UserProfileDto } from "~/lib/api/types";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: UserProfileDto | null;
  isAuthenticated: boolean;

  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: UserProfileDto) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setTokens: (accessToken, refreshToken) => {
        setAccessToken(accessToken);
        set({ token: accessToken, refreshToken, isAuthenticated: true });
      },

      setUser: (user) => set({ user }),

      logout: () => {
        setAccessToken(null);
        set({ token: null, refreshToken: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          setAccessToken(state.token);
        }
      },
    }
  )
);
