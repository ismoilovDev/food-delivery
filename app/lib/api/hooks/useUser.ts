import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, deleteMe, getMe, updateMe, updatePhone } from "../services/users";
import type { ChangePasswordReqDto, UpdatePhoneReqDto, UpdateProfileReqDto } from "../types";

export const userKeys = {
	me: ["user", "me"] as const,
};

export function useMe() {
	return useQuery({
		queryKey: userKeys.me,
		queryFn: getMe,
		select: (res) => res.data,
	});
}

export function useUpdateMe() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: UpdateProfileReqDto) => updateMe(body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.me }),
	});
}

export function useChangePassword() {
	return useMutation({
		mutationFn: (body: ChangePasswordReqDto) => changePassword(body),
	});
}

export function useUpdatePhone() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: UpdatePhoneReqDto) => updatePhone(body),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.me }),
	});
}

export function useDeleteMe() {
	return useMutation({
		mutationFn: deleteMe,
	});
}
