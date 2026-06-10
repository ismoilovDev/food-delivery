export type PaymentMethod = "PAYME" | "CLICK" | "UZUM" | "CARD";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CANCELLED";

export interface PaymentDto {
	id: number;
	amount: number;
	status: PaymentStatus;
	paymentMethod: PaymentMethod;
	transactionId?: string;
	receiptUrl?: string;
	description?: string;
	paidAt?: string;
	failedAt?: string;
	failureReason?: string;
	createdAt: string;
	updatedAt: string;
}
