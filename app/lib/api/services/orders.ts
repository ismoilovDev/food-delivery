import { api } from "~/lib/axios";
import type { ApiResponse, MyOrdersParams, OrderDto, OrderReqDto, OrderResMiniDto } from "../types";

export async function createOrder(body: OrderReqDto) {
	const res = await api.post<ApiResponse<OrderDto>>("/api/orders/create-from-cart", body);
	return res.data;
}

export async function getMyOrders(params?: MyOrdersParams) {
	const res = await api.get<ApiResponse<OrderResMiniDto[]>>("/api/orders/my-orders", { params });
	return res.data;
}

export async function getOrderById(id: number) {
	const res = await api.get<ApiResponse<OrderDto>>(`/api/orders/${id}`);
	return res.data;
}

export async function cancelOrder(id: number, reason?: string) {
	const res = await api.put<ApiResponse<OrderDto>>(`/api/orders/${id}/cancel`, null, {
		params: reason ? { reason } : undefined,
	});
	return res.data;
}

export async function rateOrder(id: number, rating: number, review?: string) {
	const res = await api.post<ApiResponse<OrderDto>>(`/api/orders/${id}/rate`, null, {
		params: { rating, ...(review ? { review } : {}) },
	});
	return res.data;
}
