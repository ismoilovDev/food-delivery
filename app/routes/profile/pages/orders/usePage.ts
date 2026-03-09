import { useNavigate } from "react-router";
import { useMyOrders } from "~/lib/api/hooks/useOrders";
import { useI18nStore } from "~/store/i18nStore";

export function useOrdersPage() {
	const { t } = useI18nStore();
	const navigate = useNavigate();
	const { data: orders = [], isLoading } = useMyOrders();

	function handleOrderClick(id: number) {
		navigate(`/profile/orders/${id}`);
	}

	return { t, orders, isLoading, handleOrderClick };
}
