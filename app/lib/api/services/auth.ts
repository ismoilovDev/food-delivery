import { api } from "~/lib/axios";
import type {
	ApiResponse,
	LoginReqDto,
	RefreshTokenReqDto,
	RegisterReqDto,
	TelegramAuthReqDto,
	TokenDto,
} from "../types";

export async function login(body: LoginReqDto) {
	const res = await api.post<ApiResponse<TokenDto>>("/api/auth/login", body);
	return res.data;
}

export async function register(body: RegisterReqDto) {
	const res = await api.post<ApiResponse<TokenDto>>("/api/auth/register", body);
	return res.data;
}

export async function refreshToken(body: RefreshTokenReqDto) {
	const res = await api.post<ApiResponse<TokenDto>>("/api/auth/refresh", body);
	return res.data;
}

export async function telegramAuth(body: TelegramAuthReqDto) {
	const res = await api.post<ApiResponse<TokenDto>>("/api/auth/telegram-mini-app", body);
	return res.data;
}
