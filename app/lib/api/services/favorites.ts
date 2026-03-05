import { api } from "~/lib/axios";
import type { ApiResponse, FavoriteDto, FavoriteReqDto } from "../types";

export async function getMyFavorites(params?: { page?: number; limit?: number }) {
	const res = await api.get<ApiResponse<FavoriteDto[]>>("/api/favorites/my", {
		params,
	});
	return res.data;
}

export async function addFavorite(body: FavoriteReqDto) {
	const res = await api.post<ApiResponse<FavoriteDto>>("/api/favorites", body);
	return res.data;
}

export async function removeFavorite(productId: number) {
	const res = await api.delete<ApiResponse<void>>(`/api/favorites/${productId}`);
	return res.data;
}

export async function toggleFavorite(body: FavoriteReqDto) {
	const res = await api.post<ApiResponse<{ isFavorite: boolean }>>("/api/favorites/toggle", body);
	return res.data;
}

export async function checkIsFavorite(productId: number) {
	const res = await api.get<ApiResponse<{ isFavorite: boolean }>>(
		`/api/favorites/check/${productId}`
	);
	return res.data;
}

export async function getFavoriteCount() {
	const res = await api.get<ApiResponse<{ count: number }>>("/api/favorites/count");
	return res.data;
}
