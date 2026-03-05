import axios from "axios";

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

// ─── Request interceptor — Bearer token qo'shish ─────────────────────────────

api.interceptors.request.use((config) => {
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

// ─── Response interceptor — xato handling ────────────────────────────────────

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error)) {
			const status = error.response?.status;
			const message =
				error.response?.data?.error?.errorMessage || error.response?.data?.message || error.message;

			if (status === 401) {
				setAccessToken(null);
				// Token muddati tugagan — login sahifasiga yo'naltirish
				if (typeof window !== "undefined") {
					window.location.href = "/login";
				}
			}

			return Promise.reject(new Error(message));
		}
		return Promise.reject(error);
	}
);
