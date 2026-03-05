export interface DeliveryAddressDto {
	id: number;
	userId: number;
	address: string;
	label?: string;
	latitude: number;
	longitude: number;
	phoneNumber: string;
	recipientName: string;
	isDefault: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface DeliveryAddressReqDto {
	address: string;
	label?: string;
	latitude: number;
	longitude: number;
	phoneNumber: string;
	recipientName: string;
	isDefault?: boolean;
}
