import { api } from "~/lib/axios";
import type { ApiResponse, MyOrdersParams, OrderDto, OrderReqDto, RateOrderReqDto } from "../types";

export async function createOrder(body: OrderReqDto) {
	const res = await api.post<ApiResponse<OrderDto>>("/api/orders", body);
	return res.data;
}

export async function getMyOrders(params?: MyOrdersParams) {
	const res = await api.get<ApiResponse<OrderDto[]>>("/api/orders/my-orders", {
		params,
	});
	return res.data;
}

export async function getOrderById(id: number) {
	const res = await api.get<ApiResponse<OrderDto>>(`/api/orders/${id}`);
	return res.data;
}

export async function cancelOrder(id: number) {
	const res = await api.post<ApiResponse<OrderDto>>(`/api/orders/${id}/cancel`);
	return res.data;
}

export async function rateOrder(id: number, body: RateOrderReqDto) {
	const res = await api.post<ApiResponse<OrderDto>>(`/api/orders/${id}/rate`, body);
	return res.data;
}
