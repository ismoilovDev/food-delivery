import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	addCartItem,
	applyPromocode,
	clearCart,
	getMyCart,
	removeCartItem,
	removePromocode,
	updateCartItem,
} from "../services/cart";
import type {
	ApiResponse,
	ApplyPromocodeReqDto,
	CartDto,
	CartItemDto,
	CartItemReqDto,
} from "../types";

export const cartKeys = {
	all: ["cart"] as const,
	my: () => [...cartKeys.all, "my"] as const,
};

type CartCache = ApiResponse<CartDto> | undefined;

function patchCartCache(
	queryClient: ReturnType<typeof useQueryClient>,
	updater: (items: CartItemDto[]) => CartItemDto[]
) {
	queryClient.setQueryData<CartCache>(cartKeys.my(), (old) => {
		if (!old?.data) return old;
		return { ...old, data: { ...old.data, items: updater(old.data.items) } };
	});
}

export function useCart() {
	return useQuery({
		queryKey: cartKeys.my(),
		queryFn: getMyCart,
		select: (res) => res.data,
	});
}

export function useAddCartItem() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: CartItemReqDto) => addCartItem(body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.my() }),
	});
}

export function useUpdateCartItem() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
			updateCartItem(itemId, quantity),
		onMutate: async ({ itemId, quantity }) => {
			await queryClient.cancelQueries({ queryKey: cartKeys.my() });
			const previous = queryClient.getQueryData<CartCache>(cartKeys.my());
			patchCartCache(queryClient, (items) =>
				items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
			);
			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) queryClient.setQueryData(cartKeys.my(), ctx.previous);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: cartKeys.my() }),
	});
}

export function useRemoveCartItem() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (itemId: number) => removeCartItem(itemId),
		onMutate: async (itemId) => {
			await queryClient.cancelQueries({ queryKey: cartKeys.my() });
			const previous = queryClient.getQueryData<CartCache>(cartKeys.my());
			patchCartCache(queryClient, (items) => items.filter((item) => item.id !== itemId));
			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) queryClient.setQueryData(cartKeys.my(), ctx.previous);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: cartKeys.my() }),
	});
}

export function useApplyPromocode() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: ApplyPromocodeReqDto) => applyPromocode(body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.my() }),
	});
}

export function useRemovePromocode() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: removePromocode,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.my() }),
	});
}

export function useClearCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: clearCart,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: cartKeys.my() });
			const previous = queryClient.getQueryData<CartCache>(cartKeys.my());
			patchCartCache(queryClient, () => []);
			return { previous };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.previous) queryClient.setQueryData(cartKeys.my(), ctx.previous);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: cartKeys.my() }),
	});
}
