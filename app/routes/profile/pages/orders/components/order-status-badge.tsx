import type { OrderStatus } from "~/lib/api/types";
import { cn } from "~/lib/utils";

const STATUS_STYLES: Record<OrderStatus, string> = {
	PENDING: "bg-yellow-100 text-yellow-700",
	CONFIRMED: "bg-blue-100 text-blue-700",
	PREPARING: "bg-orange-100 text-orange-700",
	READY_FOR_DELIVERY: "bg-purple-100 text-purple-700",
	ASSIGNED_TO_COURIER: "bg-purple-100 text-purple-700",
	PICKED_UP: "bg-indigo-100 text-indigo-700",
	IN_DELIVERY: "bg-blue-100 text-blue-700",
	DELIVERED: "bg-green-100 text-green-700",
	CANCELLED: "bg-gray-100 text-gray-500",
	REJECTED: "bg-red-100 text-red-600",
};

interface OrderStatusBadgeProps {
	status: OrderStatus;
	t: Record<OrderStatus, string>;
}

export function OrderStatusBadge({ status, t }: OrderStatusBadgeProps) {
	return (
		<span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", STATUS_STYLES[status])}>
			{t[status]}
		</span>
	);
}
