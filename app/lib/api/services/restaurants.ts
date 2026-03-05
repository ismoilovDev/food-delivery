import { api } from "~/lib/axios";
import type { ApiResponse, RestaurantDto, RestaurantQueryParams } from "../types";

export async function getRestaurants(params?: RestaurantQueryParams) {
	const res = await api.get<ApiResponse<RestaurantDto[]>>("/api/restaurants", {
		params,
	});
	return res.data;
}

export async function getRestaurantById(id: number) {
	const res = await api.get<ApiResponse<RestaurantDto>>(`/api/restaurants/${id}`);
	return res.data;
}

export async function getTopRatedRestaurants(params?: { limit?: number }) {
	const res = await api.get<ApiResponse<RestaurantDto[]>>("/api/restaurants/top-rated", { params });
	return res.data;
}

export async function getFeaturedRestaurants(params?: { limit?: number }) {
	const res = await api.get<ApiResponse<RestaurantDto[]>>("/api/restaurants/featured", { params });
	return res.data;
}

export async function getActiveRestaurants(params?: { page?: number; limit?: number }) {
	const res = await api.get<ApiResponse<RestaurantDto[]>>("/api/restaurants/active", { params });
	return res.data;
}
