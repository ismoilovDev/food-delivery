// GET /api/addresses/my-addresses returns this
export interface DeliveryAddressResMiniDto {
	id: number;
	label?: string;
	fullAddress?: string;
	street?: string;
	building?: string;
	apartment?: string;
	latitude?: number;
	longitude?: number;
	isDefault?: boolean;
	contactName?: string;
	contactPhone?: string;
}

// POST/PUT /api/addresses/my-addresses body
export interface DeliveryAddressReqDto {
	fullAddress: string;
	label?: string;
	street?: string;
	building?: string;
	entrance?: string;
	floor?: string;
	apartment?: string;
	intercom?: string;
	latitude?: number;
	longitude?: number;
	deliveryNotes?: string;
	isDefault?: boolean;
	contactName?: string;
	contactPhone?: string;
}
