import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	addFavorite,
	checkIsFavorite,
	getFavoriteCount,
	getMyFavorites,
	removeFavorite,
	toggleFavorite,
} from "../services/favorites";
import type { FavoriteReqDto } from "../types";

export const favoriteKeys = {
	all: ["favorites"] as const,
	my: (params?: { page?: number; limit?: number }) => [...favoriteKeys.all, "my", params] as const,
	check: (productId: number) => [...favoriteKeys.all, "check", productId] as const,
	count: () => [...favoriteKeys.all, "count"] as const,
};

export function useMyFavorites(params?: { page?: number; limit?: number }) {
	return useQuery({
		queryKey: favoriteKeys.my(params),
		queryFn: () => getMyFavorites(params),
		select: (res) => res.data,
	});
}

export function useIsFavorite(productId: number) {
	return useQuery({
		queryKey: favoriteKeys.check(productId),
		queryFn: () => checkIsFavorite(productId),
		select: (res) => res.data.isFavorite,
	});
}

export function useFavoriteCount() {
	return useQuery({
		queryKey: favoriteKeys.count(),
		queryFn: getFavoriteCount,
		select: (res) => res.data.count,
	});
}

export function useToggleFavorite() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: FavoriteReqDto) => toggleFavorite(body),
		onSuccess: (_data, { productId }) => {
			queryClient.invalidateQueries({ queryKey: favoriteKeys.my() });
			queryClient.invalidateQueries({
				queryKey: favoriteKeys.check(productId),
			});
			queryClient.invalidateQueries({ queryKey: favoriteKeys.count() });
		},
	});
}

export function useAddFavorite() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: FavoriteReqDto) => addFavorite(body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: favoriteKeys.all }),
	});
}

export function useRemoveFavorite() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (productId: number) => removeFavorite(productId),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: favoriteKeys.all }),
	});
}
