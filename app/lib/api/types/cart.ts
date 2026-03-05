export interface CartItemDto {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface CartDto {
  id: number;
  userId: number;
  restaurantId?: number;
  items: CartItemDto[];
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  promocodeCode?: string;
  totalAmount: number;
  updatedAt: string;
}

export interface CartItemReqDto {
  productId: number;
  quantity: number;
  notes?: string;
}

export interface ApplyPromocodeReqDto {
  code: string;
}
