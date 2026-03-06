export interface CartItemDto {
	id: number;
	cartId: number;
	productId: number;
	productName: string;
	productImage?: string;
	price: number;
	quantity: number;
	totalPrice: number;
	isAvailable: boolean;
}

export interface CartDto {
	id: number;
	userId: number;
	userName?: string;
	items: CartItemDto[];
	totalAmount: number;
	itemsCount: number;
	promocodeCode?: string;
	discountAmount: number;
	finalAmount: number;
	createdAt: string;
	updatedAt: string;
}

export interface CartItemReqDto {
	productId: number;
	quantity: number;
	notes?: string;
}

export interface ApplyPromocodeReqDto {
	code: string;
}
