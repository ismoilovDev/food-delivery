import { api } from "~/lib/axios";
import type {
  ApiResponse,
  UserProfileDto,
  UpdateProfileReqDto,
  ChangePasswordReqDto,
  UpdatePhoneReqDto,
} from "../types";

export async function getMe() {
  const res = await api.get<ApiResponse<UserProfileDto>>("/api/users/me");
  return res.data;
}

export async function updateMe(body: UpdateProfileReqDto) {
  const res = await api.put<ApiResponse<UserProfileDto>>("/api/users/me", body);
  return res.data;
}

export async function changePassword(body: ChangePasswordReqDto) {
  const res = await api.put<ApiResponse<void>>("/api/users/me/password", body);
  return res.data;
}

export async function updatePhone(body: UpdatePhoneReqDto) {
  const res = await api.put<ApiResponse<UserProfileDto>>(
    "/api/users/me/phone",
    body
  );
  return res.data;
}

export async function deleteMe() {
  const res = await api.delete<ApiResponse<void>>("/api/users/me");
  return res.data;
}
