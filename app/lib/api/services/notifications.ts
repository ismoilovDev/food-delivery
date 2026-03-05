import { api } from "~/lib/axios";
import type { ApiResponse, NotificationDto } from "../types";

export async function getMyNotifications(params?: {
  page?: number;
  limit?: number;
  isRead?: boolean;
}) {
  const res = await api.get<ApiResponse<NotificationDto[]>>(
    "/api/notifications/my",
    { params }
  );
  return res.data;
}

export async function getNotificationById(id: number) {
  const res = await api.get<ApiResponse<NotificationDto>>(
    `/api/notifications/${id}`
  );
  return res.data;
}

export async function markNotificationAsRead(id: number) {
  const res = await api.put<ApiResponse<NotificationDto>>(
    `/api/notifications/${id}/read`
  );
  return res.data;
}

export async function markAllNotificationsAsRead() {
  const res = await api.put<ApiResponse<void>>("/api/notifications/read-all");
  return res.data;
}

export async function getUnreadNotificationCount() {
  const res = await api.get<ApiResponse<{ count: number }>>(
    "/api/notifications/unread-count"
  );
  return res.data;
}

export async function deleteNotification(id: number) {
  const res = await api.delete<ApiResponse<void>>(`/api/notifications/${id}`);
  return res.data;
}
