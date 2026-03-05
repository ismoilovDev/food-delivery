import type { I18nText } from "./common";

export interface CategoryDto {
  id: number;
  name: string;
  nameStr: string;
  description: I18nText;
  imageUrl?: string;
  parentId?: number;
  isActive: boolean;
  orderIndex: number;
  productCount: number;
}
