import { api } from "~/lib/axios";
import type { ApiResponse, FileUploadResDto } from "../types";

export async function uploadProfilePhoto(formData: FormData) {
  const res = await api.post<ApiResponse<FileUploadResDto>>(
    "/api/files/upload/profile",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
}

export async function uploadProductImages(formData: FormData) {
  const res = await api.post<ApiResponse<FileUploadResDto[]>>(
    "/api/files/upload/product",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
}
