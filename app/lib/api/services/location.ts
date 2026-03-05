import { api } from "~/lib/axios";
import type {
	AddressDto,
	ApiResponse,
	DeliveryZoneCheckReqDto,
	DistanceReqDto,
	GeocodeReqDto,
	ReverseGeocodeReqDto,
} from "../types";

export async function geocode(body: GeocodeReqDto) {
	const res = await api.post<ApiResponse<AddressDto>>("/api/location/geocode", body);
	return res.data;
}

export async function reverseGeocode(body: ReverseGeocodeReqDto) {
	const res = await api.post<ApiResponse<AddressDto>>("/api/location/reverse-geocode", body);
	return res.data;
}

export async function checkDeliveryZone(body: DeliveryZoneCheckReqDto) {
	const res = await api.post<ApiResponse<{ isInZone: boolean; deliveryFee?: number }>>(
		"/api/location/check-delivery-zone",
		body
	);
	return res.data;
}

export async function calculateDistance(body: DistanceReqDto) {
	const res = await api.post<ApiResponse<{ distanceKm: number; estimatedMinutes: number }>>(
		"/api/location/distance",
		body
	);
	return res.data;
}
