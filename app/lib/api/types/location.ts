export interface GeocodeReqDto {
	address: string;
}

export interface ReverseGeocodeReqDto {
	latitude: number;
	longitude: number;
}

// Matches API: AddressDTO
export interface AddressDTO {
	fullAddress?: string;
	street?: string;
	house?: string;
	city?: string;
	district?: string;
	postalCode?: string;
	latitude?: number;
	longitude?: number;
	formattedAddress?: string;
}

// Matches API: CoordinatesDTO
export interface CoordinatesDTO {
	latitude?: number;
	longitude?: number;
}

export interface DeliveryZoneCheckReqDto {
	latitude: number;
	longitude: number;
}

export interface DistanceReqDto {
	lat1: number;
	lon1: number;
	lat2: number;
	lon2: number;
}
