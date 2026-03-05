import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  applyPromocode,
  removePromocode,
  clearCart,
} from "../services/cart";
import type { CartItemReqDto, ApplyPromocodeReqDto } from "../types";

export const cartKeys = {
  all: ["cart"] as const,
  my: () => [...cartKeys.all, "my"] as const,
};

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
    mutationFn: ({
      itemId,
      body,
    }: {
      itemId: number;
      body: Partial<CartItemReqDto>;
    }) => updateCartItem(itemId, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.my() }),
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: number) => removeCartItem(itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.my() }),
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.my() }),
  });
}
