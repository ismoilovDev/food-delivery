export type OrderStatus =
	| "PENDING"
	| "CONFIRMED"
	| "PREPARING"
	| "READY_FOR_DELIVERY"
	| "ASSIGNED_TO_COURIER"
	| "PICKED_UP"
	| "IN_DELIVERY"
	| "DELIVERED"
	| "CANCELLED"
	| "REJECTED";

// Java LocalDateTime comes as [year, month, day, hour, minute, second, nanosecond]
export type JavaDateTime = [number, number, number, number, number, number, number];

export interface OrderItemReqDto {
	productId: number;
	quantity: number;
	notes?: string;
}

export interface OrderReqDto {
	deliveryAddressId: number;
	items: OrderItemReqDto[];
	notes?: string;
	paymentMethod: import("./payment").PaymentMethod;
	promocodeCode?: string;
}

export interface OrderItemDto {
	id: number;
	productId?: number;
	productName: string;
	quantity: number;
	unitPrice: number;
	discountPrice: number;
	totalPrice: number;
	notes?: string;
}

export interface OrderDeliveryAddress {
	id: number;
	label?: string;
	fullAddress?: string;
	street?: string;
	building?: string;
	entrance?: string;
	floor?: string;
	apartment?: string;
	latitude?: number;
	longitude?: number;
	contactName?: string;
	contactPhone?: string;
	deliveryNotes?: string;
}

export interface OrderDto {
	id: number;
	orderNumber: string;
	customerId?: number;
	customerName?: string;
	customerPhone?: string;
	courierId?: number;
	courierName?: string;
	restaurantId?: number;
	restaurantName?: string;
	status: OrderStatus;
	items: OrderItemDto[];
	subtotal: number;
	deliveryFee: number;
	serviceFee: number;
	discountAmount: number;
	totalAmount: number;
	deliveryAddress?: OrderDeliveryAddress;
	deliveryNotes?: string;
	promocodeCode?: string;
	estimatedDeliveryTime?: JavaDateTime;
	cancellationReason?: string;
	rating?: number;
	review?: string;
	isPaid: boolean;
	isPreorder: boolean;
	scheduledDeliveryTime?: JavaDateTime;
	createdAt: JavaDateTime;
	updatedAt: JavaDateTime;
}

export interface OrderResMiniDto {
	id: number;
	orderNumber: string;
	status: OrderStatus;
	totalAmount: number;
	restaurantName?: string;
	estimatedDeliveryTime?: JavaDateTime;
	createdAt: JavaDateTime;
}

export interface RateOrderReqDto {
	rating: number;
	review?: string;
}

export interface MyOrdersParams {
	page?: number;
	limit?: number;
	status?: OrderStatus;
}
