import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryById,
  getCategoryChildren,
  getRootCategories,
} from "../services/categories";

export const categoryKeys = {
  all: ["categories"] as const,
  roots: () => [...categoryKeys.all, "roots"] as const,
  list: (params?: { page?: number; limit?: number; parentId?: number }) =>
    [...categoryKeys.all, "list", params] as const,
  detail: (id: number) => [...categoryKeys.all, id] as const,
  children: (parentId: number) =>
    [...categoryKeys.all, parentId, "children"] as const,
};

export function useCategories(params?: {
  page?: number;
  limit?: number;
  parentId?: number;
}) {
  return useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => getCategories(params),
    select: (res) => res.data,
  });
}

export function useRootCategories() {
  return useQuery({
    queryKey: categoryKeys.roots(),
    queryFn: getRootCategories,
    select: (res) => res.data,
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => getCategoryById(id),
    select: (res) => res.data,
  });
}

export function useCategoryChildren(parentId: number) {
  return useQuery({
    queryKey: categoryKeys.children(parentId),
    queryFn: () => getCategoryChildren(parentId),
    select: (res) => res.data,
  });
}
