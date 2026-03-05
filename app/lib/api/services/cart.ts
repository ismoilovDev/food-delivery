import { api } from "~/lib/axios";
import type { ApiResponse, ApplyPromocodeReqDto, CartDto, CartItemReqDto } from "../types";

export async function getMyCart() {
	const res = await api.get<ApiResponse<CartDto>>("/api/cart/my-cart");
	return res.data;
}

export async function addCartItem(body: CartItemReqDto) {
	const res = await api.post<ApiResponse<CartDto>>("/api/cart/items", body);
	return res.data;
}

export async function updateCartItem(itemId: number, body: Partial<CartItemReqDto>) {
	const res = await api.put<ApiResponse<CartDto>>(`/api/cart/items/${itemId}`, body);
	return res.data;
}

export async function removeCartItem(itemId: number) {
	const res = await api.delete<ApiResponse<CartDto>>(`/api/cart/items/${itemId}`);
	return res.data;
}

export async function applyPromocode(body: ApplyPromocodeReqDto) {
	const res = await api.post<ApiResponse<CartDto>>("/api/cart/promocode/apply", body);
	return res.data;
}

export async function removePromocode() {
	const res = await api.delete<ApiResponse<CartDto>>("/api/cart/promocode");
	return res.data;
}

export async function clearCart() {
	const res = await api.delete<ApiResponse<void>>("/api/cart/clear");
	return res.data;
}
