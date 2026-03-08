import { api } from "~/lib/axios";
import type {
	AddressDTO,
	ApiResponse,
	CoordinatesDTO,
	DeliveryZoneCheckReqDto,
	DistanceReqDto,
	GeocodeReqDto,
	ReverseGeocodeReqDto,
} from "../types";

export async function geocode(params: GeocodeReqDto) {
	const res = await api.get<ApiResponse<CoordinatesDTO>>("/api/location/geocode", { params });
	return res.data;
}

export async function reverseGeocode(params: ReverseGeocodeReqDto) {
	const res = await api.get<ApiResponse<AddressDTO>>("/api/location/reverse-geocode", { params });
	return res.data;
}

export async function checkDeliveryZone(params: DeliveryZoneCheckReqDto) {
	const res = await api.get<ApiResponse<boolean>>("/api/location/check-delivery-zone", { params });
	return res.data;
}

export async function calculateDistance(params: DistanceReqDto) {
	const res = await api.get<ApiResponse<number>>("/api/location/calculate-distance", { params });
	return res.data;
}
