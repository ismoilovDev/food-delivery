import { useMutation } from "@tanstack/react-query";
import { initiatePayment } from "../services/payment";
import type { PaymentMethod } from "../types";

type OnlinePaymentMethod = Exclude<PaymentMethod, "CASH">;

export function useInitiatePayment() {
	return useMutation({
		mutationFn: ({ orderId, method }: { orderId: number; method: OnlinePaymentMethod }) =>
			initiatePayment(orderId, method),
	});
}
