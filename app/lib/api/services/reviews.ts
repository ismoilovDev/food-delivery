import { api } from "~/lib/axios";
import type { ApiResponse, ReviewDto, ReviewReqDto } from "../types";

export async function createReview(body: ReviewReqDto) {
	const res = await api.post<ApiResponse<ReviewDto>>("/api/reviews", body);
	return res.data;
}

export async function getReviewById(id: number) {
	const res = await api.get<ApiResponse<ReviewDto>>(`/api/reviews/${id}`);
	return res.data;
}

export async function getProductReviews(
	productId: number,
	params?: { page?: number; limit?: number }
) {
	const res = await api.get<ApiResponse<ReviewDto[]>>(`/api/reviews/product/${productId}`, {
		params,
	});
	return res.data;
}

export async function getMyReviews(params?: { page?: number; limit?: number }) {
	const res = await api.get<ApiResponse<ReviewDto[]>>("/api/reviews/my-reviews", { params });
	return res.data;
}

export async function updateReview(id: number, body: Partial<ReviewReqDto>) {
	const res = await api.put<ApiResponse<ReviewDto>>(`/api/reviews/${id}`, body);
	return res.data;
}
