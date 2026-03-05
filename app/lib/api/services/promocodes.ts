import { api } from "~/lib/axios";
import type { ApiResponse, PromocodeDto, ValidatePromocodeReqDto } from "../types";

export async function getPromocodeByCode(code: string) {
	const res = await api.get<ApiResponse<PromocodeDto>>(`/api/promocodes/code/${code}`);
	return res.data;
}

export async function validatePromocode(body: ValidatePromocodeReqDto) {
	const res = await api.post<ApiResponse<{ isValid: boolean; discountAmount: number }>>(
		"/api/promocodes/validate",
		body
	);
	return res.data;
}
