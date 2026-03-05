import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  searchProducts,
  getPopularProducts,
} from "../services/products";
import type { ProductQueryParams } from "../types";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params?: ProductQueryParams) =>
    [...productKeys.lists(), params] as const,
  detail: (id: number) => [...productKeys.all, id] as const,
  search: (query: string, params?: Omit<ProductQueryParams, "search">) =>
    [...productKeys.all, "search", query, params] as const,
  popular: (params?: { limit?: number; restaurantId?: number }) =>
    [...productKeys.all, "popular", params] as const,
};

export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
    select: (res) => res.data,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    select: (res) => res.data,
  });
}

export function useProductSearch(
  query: string,
  params?: Omit<ProductQueryParams, "search">
) {
  return useQuery({
    queryKey: productKeys.search(query, params),
    queryFn: () => searchProducts(query, params),
    select: (res) => res.data,
    enabled: query.length > 1,
  });
}

export function usePopularProducts(params?: {
  limit?: number;
  restaurantId?: number;
}) {
  return useQuery({
    queryKey: productKeys.popular(params),
    queryFn: () => getPopularProducts(params),
    select: (res) => res.data,
  });
}
