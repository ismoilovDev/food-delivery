import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileDto } from "~/lib/api/types";
import { registerAuthBridge, setAccessToken } from "~/lib/axios";

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

// Let the axios layer read the refresh token and write back refreshed tokens /
// trigger logout, without axios importing this store (avoids a circular import).
registerAuthBridge({
	getRefreshToken: () => useAuthStore.getState().refreshToken,
	onRefreshed: ({ accessToken, refreshToken }) =>
		useAuthStore.getState().setTokens(accessToken, refreshToken),
	onLogout: () => useAuthStore.getState().logout(),
});
