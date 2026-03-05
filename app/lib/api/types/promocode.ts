export type PromocodeType = "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_DELIVERY";

export interface PromocodeDto {
  id: number;
  code: string;
  description?: string;
  type: PromocodeType;
  discountPercentage?: number;
  discountAmount?: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isFirstOrderOnly: boolean;
}

export interface ValidatePromocodeReqDto {
  code: string;
  orderAmount: number;
}
