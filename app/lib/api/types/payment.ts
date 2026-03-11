export type PaymentMethod = "CASH" | "PAYME" | "CLICK" | "UZUM" | "CARD";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

export interface PaymentDto {
	id: number;
	orderId: number;
	method: PaymentMethod;
	amount: number;
	status: PaymentStatus;
	checkoutUrl?: string;
	createdAt: string;
	updatedAt: string;
}
