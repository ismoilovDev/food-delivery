import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelOrder, createOrder, getMyOrders, getOrderById, rateOrder } from "../services/orders";
import type { MyOrdersParams, OrderReqDto, RateOrderReqDto } from "../types";

export const orderKeys = {
	all: ["orders"] as const,
	my: (params?: MyOrdersParams) => [...orderKeys.all, "my", params] as const,
	detail: (id: number) => [...orderKeys.all, id] as const,
};

export function useMyOrders(params?: MyOrdersParams) {
	return useQuery({
		queryKey: orderKeys.my(params),
		queryFn: () => getMyOrders(params),
		select: (res) => res.data,
	});
}

export function useOrder(id: number) {
	return useQuery({
		queryKey: orderKeys.detail(id),
		queryFn: () => getOrderById(id),
		select: (res) => res.data,
	});
}

export function useCreateOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: OrderReqDto) => createOrder(body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: orderKeys.all }),
	});
}

export function useCancelOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => cancelOrder(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: orderKeys.all }),
	});
}

export function useRateOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, body }: { id: number; body: RateOrderReqDto }) => rateOrder(id, body),
		onSuccess: (_data, { id }) => queryClient.invalidateQueries({ queryKey: orderKeys.detail(id) }),
	});
}
