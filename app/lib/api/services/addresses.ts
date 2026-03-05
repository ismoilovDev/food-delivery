import { api } from "~/lib/axios";
import type { ApiResponse, DeliveryAddressDto, DeliveryAddressReqDto } from "../types";

const BASE = "/api/addresses/my-addresses";

export async function getMyAddresses() {
	const res = await api.get<ApiResponse<DeliveryAddressDto[]>>(BASE);
	return res.data;
}

export async function getAddressById(id: number) {
	const res = await api.get<ApiResponse<DeliveryAddressDto>>(`${BASE}/${id}`);
	return res.data;
}

export async function createAddress(body: DeliveryAddressReqDto) {
	const res = await api.post<ApiResponse<DeliveryAddressDto>>(BASE, body);
	return res.data;
}

export async function updateAddress(id: number, body: Partial<DeliveryAddressReqDto>) {
	const res = await api.put<ApiResponse<DeliveryAddressDto>>(`${BASE}/${id}`, body);
	return res.data;
}

export async function deleteAddress(id: number) {
	const res = await api.delete<ApiResponse<void>>(`${BASE}/${id}`);
	return res.data;
}

export async function setDefaultAddress(id: number) {
	const res = await api.put<ApiResponse<DeliveryAddressDto>>(`${BASE}/${id}/set-default`);
	return res.data;
}

export async function getDefaultAddress() {
	const res = await api.get<ApiResponse<DeliveryAddressDto>>(`${BASE}/default`);
	return res.data;
}
