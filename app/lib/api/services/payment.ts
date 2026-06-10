import { api } from "~/lib/axios";
import type { ApiResponse, PaymentDto, PaymentMethod } from "../types";

/**
 * To'lovni boshlaydi va checkout URL'ni qaytaradi.
 * Backend javobi ResponseDtoString — `data` to'g'ridan-to'g'ri checkout URL (string).
 */
export async function initiatePayment(orderId: number, method: PaymentMethod = "PAYME") {
	const res = await api.post<ApiResponse<string>>(`/api/payments/initiate/${orderId}`, null, {
		params: { method },
	});
	return res.data;
}

export async function getPaymentByOrder(orderId: number) {
	const res = await api.get<ApiResponse<PaymentDto>>(`/api/payments/order/${orderId}`);
	return res.data;
}
