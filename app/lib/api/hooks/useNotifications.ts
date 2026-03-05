import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount,
  deleteNotification,
} from "../services/notifications";

export const notificationKeys = {
  all: ["notifications"] as const,
  my: (params?: { page?: number; limit?: number; isRead?: boolean }) =>
    [...notificationKeys.all, "my", params] as const,
  unreadCount: () => [...notificationKeys.all, "unread-count"] as const,
};

export function useMyNotifications(params?: {
  page?: number;
  limit?: number;
  isRead?: boolean;
}) {
  return useQuery({
    queryKey: notificationKeys.my(params),
    queryFn: () => getMyNotifications(params),
    select: (res) => res.data,
  });
}

export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: getUnreadNotificationCount,
    select: (res) => res.data.count,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => markNotificationAsRead(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteNotification(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  });
}
