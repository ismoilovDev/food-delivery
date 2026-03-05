export interface GeocodeReqDto {
  address: string;
}

export interface ReverseGeocodeReqDto {
  latitude: number;
  longitude: number;
}

export interface AddressDto {
  address: string;
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface DeliveryZoneCheckReqDto {
  latitude: number;
  longitude: number;
  restaurantId: number;
}

export interface DistanceReqDto {
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
}
