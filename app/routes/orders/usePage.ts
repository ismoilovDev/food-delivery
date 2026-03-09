import { useState } from "react";
import { useNavigate } from "react-router";
import { useMyOrders } from "~/lib/api/hooks/useOrders";
import type { OrderResMiniDto, OrderStatus } from "~/lib/api/types";
import { useI18nStore } from "~/store/i18nStore";

export type FilterKey = "all" | "active" | "delivered" | "cancelled";

const ACTIVE_STATUSES: OrderStatus[] = [
	"PENDING",
	"CONFIRMED",
	"PREPARING",
	"READY_FOR_DELIVERY",
	"ASSIGNED_TO_COURIER",
	"PICKED_UP",
	"IN_DELIVERY",
];
const DELIVERED_STATUSES: OrderStatus[] = ["DELIVERED"];
const CANCELLED_STATUSES: OrderStatus[] = ["CANCELLED", "REJECTED"];

function filterOrders(orders: OrderResMiniDto[], filter: FilterKey): OrderResMiniDto[] {
	if (filter === "active") return orders.filter((o) => ACTIVE_STATUSES.includes(o.status));
	if (filter === "delivered") return orders.filter((o) => DELIVERED_STATUSES.includes(o.status));
	if (filter === "cancelled") return orders.filter((o) => CANCELLED_STATUSES.includes(o.status));
	return orders;
}

export function useOrdersPage() {
	const { t } = useI18nStore();
	const navigate = useNavigate();
	const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

	const { data: allOrders = [], isLoading } = useMyOrders();
	const orders = filterOrders(allOrders, activeFilter);

	function handleOrderClick(id: number) {
		navigate(`/orders/${id}`);
	}

	return { t, orders, allOrders, isLoading, activeFilter, setActiveFilter, handleOrderClick };
}
