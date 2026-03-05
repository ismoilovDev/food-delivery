export interface NotificationDto {
  id: number;
  userId: number;
  title: string;
  message: string;
  type?: string;
  relatedOrderId?: number;
  isRead: boolean;
  createdAt: string;
}
