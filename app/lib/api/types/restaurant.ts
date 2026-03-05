import type { I18nText } from "./common";

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
  workingHoursStart: string;
  workingHoursEnd: string;
  isOpen: boolean;
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
