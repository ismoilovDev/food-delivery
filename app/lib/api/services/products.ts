import { api } from "~/lib/axios";
import type { ApiResponse, ProductDto, ProductQueryParams } from "../types";

export async function getProducts(params?: ProductQueryParams) {
	const res = await api.get<ApiResponse<ProductDto[]>>("/api/products", {
		params,
	});
	return res.data;
}

export async function getProductById(id: number) {
	const res = await api.get<ApiResponse<ProductDto>>(`/api/products/${id}`);
	return res.data;
}

export async function searchProducts(query: string, params?: Omit<ProductQueryParams, "search">) {
	const res = await api.get<ApiResponse<ProductDto[]>>("/api/products/search", {
		params: { search: query, ...params },
	});
	return res.data;
}

export async function getPopularProducts(params?: { limit?: number; restaurantId?: number }) {
	const res = await api.get<ApiResponse<ProductDto[]>>("/api/products/popular", { params });
	return res.data;
}

export async function incrementProductView(id: number) {
	const res = await api.post<ApiResponse<void>>(`/api/products/${id}/view`);
	return res.data;
}
