import { api } from "~/lib/axios";
import type { ApiResponse, PaymentDto, PaymentMethod } from "../types";

type OnlinePaymentMethod = Exclude<PaymentMethod, "CASH">;

export async function initiatePayment(orderId: number, method: OnlinePaymentMethod) {
	const res = await api.post<ApiResponse<PaymentDto>>(`/api/payments/initiate/${orderId}`, null, {
		params: { method },
	});
	return res.data;
}

export async function getPaymentByOrder(orderId: number) {
	const res = await api.get<ApiResponse<PaymentDto>>(`/api/payments/order/${orderId}`);
	return res.data;
}
