export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY_FOR_DELIVERY"
  | "ASSIGNED_TO_COURIER"
  | "PICKED_UP"
  | "IN_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "REJECTED";

export interface OrderItemReqDto {
  productId: number;
  quantity: number;
  notes?: string;
}

export interface OrderReqDto {
  restaurantId: number;
  deliveryAddressId: number;
  items: OrderItemReqDto[];
  paymentMethod?: string;
  specialInstructions?: string;
  promocodeCode?: string;
}

export interface OrderItemDto {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface OrderDto {
  id: number;
  orderNumber: string;
  userId: number;
  restaurantId: number;
  restaurantName: string;
  deliveryAddressId: number;
  courierId?: number;
  items: OrderItemDto[];
  status: OrderStatus;
  totalAmount: number;
  discountAmount: number;
  deliveryFee: number;
  paymentMethod?: string;
  specialInstructions?: string;
  rating?: number;
  review?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime?: string;
}

export interface RateOrderReqDto {
  rating: number;
  review?: string;
}

export interface MyOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}
