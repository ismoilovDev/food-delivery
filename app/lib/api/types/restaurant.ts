import type { I18nText } from "./common";

// Java LocalTime [hour, minute] sifatida keladi (masalan, [8, 0], [23, 30]).
export type JavaLocalTime = [number, number];

export interface RestaurantDto {
	id: number;
	name: I18nText;
	nameStr: string;
	description: I18nText;
	logoUrl?: string;
	bannerUrl?: string;
	phone: string;
	email?: string;
	address: I18nText;
	latitude: number;
	longitude: number;
	workingHoursStart: JavaLocalTime;
	workingHoursEnd: JavaLocalTime;
	isOpen?: boolean | null;
	isActive: boolean;
	rating: number;
	reviewCount: number;
	minOrderAmount: number;
	deliveryFee: number;
	freeDeliveryThreshold: number;
	averageDeliveryTime: number;
	averagePreparationTime: number;
	isFeatured: boolean;
	orderCount: number;
}

export interface RestaurantQueryParams {
	page?: number;
	limit?: number;
	search?: string;
}
