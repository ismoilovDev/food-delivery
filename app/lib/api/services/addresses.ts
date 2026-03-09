import { api } from "~/lib/axios";
import type { ApiResponse, DeliveryAddressReqDto, DeliveryAddressResMiniDto } from "../types";

const BASE = "/api/addresses/my-addresses";

export async function getMyAddresses() {
	const res = await api.get<ApiResponse<DeliveryAddressResMiniDto[]>>(BASE);
	return res.data;
}

export async function createAddress(body: DeliveryAddressReqDto) {
	const res = await api.post<ApiResponse<DeliveryAddressResMiniDto>>(BASE, body);
	return res.data;
}

export async function updateAddress(id: number, body: Partial<DeliveryAddressReqDto>) {
	const res = await api.put<ApiResponse<DeliveryAddressResMiniDto>>(`${BASE}/${id}`, body);
	return res.data;
}

export async function deleteAddress(id: number) {
	const res = await api.delete<ApiResponse<void>>(`${BASE}/${id}`);
	return res.data;
}

export async function setDefaultAddress(id: number) {
	const res = await api.patch<ApiResponse<DeliveryAddressResMiniDto>>(
		`/api/addresses/${id}/set-default`
	);
	return res.data;
}

export async function getDefaultAddress() {
	const res = await api.get<ApiResponse<DeliveryAddressResMiniDto>>("/api/addresses/my-default");
	return res.data;
}
