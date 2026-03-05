import type { I18nText } from "./common";

export interface ProductDto {
  id: number;
  name: I18nText;
  description: I18nText;
  categoryId: number;
  categoryName: string;
  restaurantId: number;
  restaurantName: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  mainImageUrl?: string;
  imageUrls: string[];
  isActive: boolean;
  isAvailable: boolean;
  stockQuantity: number;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  rating: number;
  reviewCount: number;
  orderCount: number;
  viewCount: number;
  preparationTime?: number;
  calories?: number;
  weight?: number;
  ingredients: string[];
  allergens: string[];
  isVegetarian: boolean;
  isSpicy: boolean;
  spicyLevel?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  restaurantId?: number;
  categoryId?: number;
  search?: string;
}
