import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createAddress,
	createAddressFromCoordinates,
	deleteAddress,
	getDefaultAddress,
	getMyAddresses,
	setDefaultAddress,
	updateAddress,
} from "../services/addresses";
import type { CreateAddressFromCoordinatesReqDto, DeliveryAddressReqDto } from "../types";

export const addressKeys = {
	all: ["addresses"] as const,
	my: () => [...addressKeys.all, "my"] as const,
	default: () => [...addressKeys.all, "default"] as const,
};

export function useMyAddresses() {
	return useQuery({
		queryKey: addressKeys.my(),
		queryFn: getMyAddresses,
		select: (res) => res.data,
	});
}

export function useDefaultAddress() {
	return useQuery({
		queryKey: addressKeys.default(),
		queryFn: getDefaultAddress,
		select: (res) => res.data,
	});
}

export function useCreateAddress() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: DeliveryAddressReqDto) => createAddress(body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: addressKeys.all }),
	});
}

export function useCreateAddressFromCoordinates() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: CreateAddressFromCoordinatesReqDto) =>
			createAddressFromCoordinates(body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: addressKeys.all }),
	});
}

export function useUpdateAddress() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, body }: { id: number; body: Partial<DeliveryAddressReqDto> }) =>
			updateAddress(id, body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: addressKeys.all }),
	});
}

export function useDeleteAddress() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => deleteAddress(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: addressKeys.all }),
	});
}

export function useSetDefaultAddress() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => setDefaultAddress(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: addressKeys.all }),
	});
}
