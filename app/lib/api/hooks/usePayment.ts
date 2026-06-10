import { useMutation, useQuery } from "@tanstack/react-query";
import { getPaymentByOrder, initiatePayment } from "../services/payment";
import type { ApiResponse, PaymentDto, PaymentMethod } from "../types";

type OnlinePaymentMethod = Exclude<PaymentMethod, "CASH">;

export const paymentKeys = {
	all: ["payment"] as const,
	byOrder: (orderId: number) => [...paymentKeys.all, "order", orderId] as const,
};

export function useInitiatePayment() {
	return useMutation({
		mutationFn: ({ orderId, method }: { orderId: number; method: OnlinePaymentMethod }) =>
			initiatePayment(orderId, method),
	});
}

/**
 * Buyurtmaning to'lov holatini oladi.
 * `PENDING` bo'lsa — Payme javobini kutib, har necha soniyada qayta so'raydi.
 * CASH buyurtmalarda to'lov yozuvi bo'lmasligi mumkin (xato → undefined).
 */
export function usePaymentByOrder(orderId: number | undefined, enabled = true) {
	return useQuery({
		queryKey: paymentKeys.byOrder(orderId ?? 0),
		queryFn: () => getPaymentByOrder(orderId as number),
		select: (res) => res.data,
		enabled: !!orderId && enabled,
		retry: false,
		refetchInterval: (query) => {
			const status = (query.state.data as ApiResponse<PaymentDto> | undefined)?.data?.status;
			return status === "PENDING" ? 4000 : false;
		},
	});
}
