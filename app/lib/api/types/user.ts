import type { Language, UserType } from "./common";

export interface UserProfileDto {
  id: number;
  phone: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  fullName: string;
  telegramId?: number;
  telegramUsername?: string;
  userType: UserType;
  language: Language;
  isActive: boolean;
  isBlocked: boolean;
  phoneVerified: boolean;
  roles: string[];
  photoUrl?: string;
  lastActiveAt: string;
  createdAt: string;
}

export interface UpdateProfileReqDto {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  language?: Language;
  photoUrl?: string;
}

export interface ChangePasswordReqDto {
  oldPassword: string;
  newPassword: string;
}

export interface UpdatePhoneReqDto {
  phone: string;
}
