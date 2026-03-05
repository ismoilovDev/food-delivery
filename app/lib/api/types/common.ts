export interface ApiResponse<T = unknown> {
	success: boolean;
	message: string;
	data: T;
	error?: ApiError;
	status: number;
	meta?: Pagination;
}

export interface ApiError {
	errorCode: number;
	errorMessage: string;
	details?: string;
	fieldErrors?: FieldError[];
}

export interface FieldError {
	field: string;
	error: string;
}

export interface Pagination {
	total: number;
	current: number;
	totalPages: number;
	perPage: number;
}

/** Ko'p tilli matn maydoni */
export interface I18nText {
	uz: string;
	ru: string;
	en: string;
}

export type Language = "UZ" | "RU" | "EN";
export type UserType = "CUSTOMER" | "COURIER" | "ADMIN" | "SUPER_ADMIN";
