import axios, { type InternalAxiosRequestConfig } from "axios";
import type { ApiResponse, TokenDto } from "./api/types";

const BASE_URL =
	(typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
	process.env.VITE_API_BASE_URL ||
	"http://food-delivery.uz";

export const api = axios.create({
	baseURL: BASE_URL,
	headers: { "Content-Type": "application/json" },
});

// ─── Token ────────────────────────────────────────────────────────────────────

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
	accessToken = token;
}

export function getAccessToken() {
	return accessToken;
}

// ─── Auth bridge ──────────────────────────────────────────────────────────────
// The auth store registers these callbacks so this module can read the refresh
// token and propagate refreshed tokens / logout back to the persisted store
// without importing the store (which would create a circular dependency).

interface AuthBridge {
	getRefreshToken: () => string | null;
	onRefreshed: (tokens: { accessToken: string; refreshToken: string }) => void;
	onLogout: () => void;
}

let bridge: AuthBridge | null = null;

export function registerAuthBridge(b: AuthBridge) {
	bridge = b;
}

function redirectToLogin() {
	if (typeof window !== "undefined") {
		window.location.href = "/";
	}
}

// ─── Request interceptor ─────────────────────────────────────────────────────

api.interceptors.request.use((config) => {
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

// ─── Response interceptor — refresh on 401 ────────────────────────────────────

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

function flushQueue(token: string | null) {
	for (const cb of pendingQueue) cb(token);
	pendingQueue = [];
}

async function performRefresh(refreshToken: string): Promise<string> {
	// Bare axios call (no interceptors) to avoid recursive 401 handling.
	const res = await axios.post<ApiResponse<TokenDto>>(
		`${BASE_URL}/api/auth/refresh`,
		{ refreshToken },
		{ headers: { "Content-Type": "application/json" } }
	);
	const tokens = res.data?.data;
	if (!tokens?.accessToken) throw new Error("Invalid refresh response");
	setAccessToken(tokens.accessToken);
	bridge?.onRefreshed({
		accessToken: tokens.accessToken,
		refreshToken: tokens.refreshToken ?? refreshToken,
	});
	return tokens.accessToken;
}

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (!axios.isAxiosError(error)) return Promise.reject(error);

		const status = error.response?.status;
		const message =
			error.response?.data?.error?.errorMessage || error.response?.data?.message || error.message;
		const original = error.config as RetriableConfig | undefined;
		const refreshTokenValue = bridge?.getRefreshToken() ?? null;
		const isRefreshCall = original?.url?.includes("/api/auth/refresh");

		const canRefresh =
			status === 401 && !!original && !original._retry && !isRefreshCall && !!refreshTokenValue;

		if (canRefresh) {
			// A refresh is already in flight — queue this request until it resolves.
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					pendingQueue.push((token) => {
						if (!token) {
							reject(new Error(message));
							return;
						}
						original.headers.Authorization = `Bearer ${token}`;
						resolve(api(original));
					});
				});
			}

			original._retry = true;
			isRefreshing = true;
			try {
				const newToken = await performRefresh(refreshTokenValue as string);
				flushQueue(newToken);
				original.headers.Authorization = `Bearer ${newToken}`;
				return await api(original);
			} catch {
				flushQueue(null);
				setAccessToken(null);
				bridge?.onLogout();
				redirectToLogin();
				return Promise.reject(new Error(message));
			} finally {
				isRefreshing = false;
			}
		}

		// 401 without a usable refresh token (or refresh itself failed) — log out.
		if (status === 401) {
			setAccessToken(null);
			bridge?.onLogout();
			redirectToLogin();
		}

		return Promise.reject(new Error(message));
	}
);
