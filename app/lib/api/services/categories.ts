import { api } from "~/lib/axios";
import type { ApiResponse, CategoryDto } from "../types";

export async function getCategories(params?: {
  page?: number;
  limit?: number;
  parentId?: number;
}) {
  const res = await api.get<ApiResponse<CategoryDto[]>>("/api/categories", {
    params,
  });
  return res.data;
}

export async function getCategoryById(id: number) {
  const res = await api.get<ApiResponse<CategoryDto>>(`/api/categories/${id}`);
  return res.data;
}

export async function getCategoryChildren(parentId: number) {
  const res = await api.get<ApiResponse<CategoryDto[]>>(
    `/api/categories/${parentId}/children`
  );
  return res.data;
}

export async function getRootCategories() {
  const res = await api.get<ApiResponse<CategoryDto[]>>("/api/categories/roots");
  return res.data;
}
