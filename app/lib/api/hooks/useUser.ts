import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMe,
  updateMe,
  changePassword,
  updatePhone,
  deleteMe,
} from "../services/users";
import type {
  UpdateProfileReqDto,
  ChangePasswordReqDto,
  UpdatePhoneReqDto,
} from "../types";

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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: userKeys.me }),
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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: userKeys.me }),
  });
}

export function useDeleteMe() {
  return useMutation({
    mutationFn: deleteMe,
  });
}
