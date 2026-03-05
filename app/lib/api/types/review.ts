export interface ReviewDto {
  id: number;
  orderId: number;
  orderNumber: string;
  productId: number;
  productName: string;
  userId: number;
  userName: string;
  rating: number;
  comment?: string;
  deliveryRating?: number;
  foodQualityRating?: number;
  serviceRating?: number;
  isAnonymous: boolean;
  adminReply?: string;
  isVerified: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewReqDto {
  orderId: number;
  productId: number;
  rating: number;
  comment?: string;
  deliveryRating?: number;
  foodQualityRating?: number;
  serviceRating?: number;
  isAnonymous?: boolean;
}
