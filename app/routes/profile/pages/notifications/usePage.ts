import {
	useMarkAllNotificationsAsRead,
	useMarkNotificationAsRead,
	useMyNotifications,
} from "~/lib/api/hooks/useNotifications";
import { useI18nStore } from "~/store/i18nStore";

export function useNotificationsPage() {
	const { t } = useI18nStore();
	const { data: notifications = [], isLoading } = useMyNotifications();
	const markOne = useMarkNotificationAsRead();
	const markAll = useMarkAllNotificationsAsRead();

	const hasUnread = notifications.some((n) => !n.isRead);

	function handleMarkOne(id: number) {
		markOne.mutate(id);
	}

	function handleMarkAll() {
		markAll.mutate();
	}

	return {
		t,
		notifications,
		isLoading,
		hasUnread,
		isMarkingAll: markAll.isPending,
		handleMarkOne,
		handleMarkAll,
	};
}
