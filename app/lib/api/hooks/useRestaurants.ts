import { useQuery } from "@tanstack/react-query";
import {
  getRestaurants,
  getRestaurantById,
  getTopRatedRestaurants,
  getFeaturedRestaurants,
  getActiveRestaurants,
} from "../services/restaurants";
import type { RestaurantQueryParams } from "../types";

export const restaurantKeys = {
  all: ["restaurants"] as const,
  lists: () => [...restaurantKeys.all, "list"] as const,
  list: (params?: RestaurantQueryParams) =>
    [...restaurantKeys.lists(), params] as const,
  detail: (id: number) => [...restaurantKeys.all, id] as const,
  topRated: (limit?: number) =>
    [...restaurantKeys.all, "top-rated", limit] as const,
  featured: (limit?: number) =>
    [...restaurantKeys.all, "featured", limit] as const,
  active: (params?: { page?: number; limit?: number }) =>
    [...restaurantKeys.all, "active", params] as const,
};

export function useRestaurants(params?: RestaurantQueryParams) {
  return useQuery({
    queryKey: restaurantKeys.list(params),
    queryFn: () => getRestaurants(params),
    select: (res) => res.data,
  });
}

export function useRestaurant(id: number) {
  return useQuery({
    queryKey: restaurantKeys.detail(id),
    queryFn: () => getRestaurantById(id),
    select: (res) => res.data,
  });
}

export function useTopRatedRestaurants(limit?: number) {
  return useQuery({
    queryKey: restaurantKeys.topRated(limit),
    queryFn: () => getTopRatedRestaurants({ limit }),
    select: (res) => res.data,
  });
}

export function useFeaturedRestaurants(limit?: number) {
  return useQuery({
    queryKey: restaurantKeys.featured(limit),
    queryFn: () => getFeaturedRestaurants({ limit }),
    select: (res) => res.data,
  });
}

export function useActiveRestaurants(params?: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: restaurantKeys.active(params),
    queryFn: () => getActiveRestaurants(params),
    select: (res) => res.data,
  });
}
