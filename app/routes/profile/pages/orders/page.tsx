import { ChevronRight, Package } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { formatPrice } from "~/lib/format";
import { OrderStatusBadge } from "./components/order-status-badge";
import { useOrdersPage } from "./usePage";

export default function ProfileOrdersPage() {
	const { t, orders, isLoading, handleOrderClick } = useOrdersPage();

	return (
		<div className="min-h-screen bg-gray-50 pb-8">
			{/* Header */}
			<div className="bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-12 pb-5">
				<h1 className="text-xl font-bold text-white">{t.orders.title}</h1>
			</div>

			<div className="px-4 pt-4 flex flex-col gap-3">
				{isLoading ? (
					Array.from({ length: 3 }).map((_, i) => (
						<Skeleton key={`order-skeleton-${i}`} className="h-24 w-full rounded-2xl" />
					))
				) : orders.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-3 pt-24">
						<div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
							<Package size={28} className="text-orange-300" />
						</div>
						<p className="text-base font-semibold text-gray-700">{t.orders.empty}</p>
						<p className="text-sm text-gray-400 text-center">{t.orders.emptyDesc}</p>
					</div>
				) : (
					orders.map((order) => (
						<button
							key={order.id}
							type="button"
							onClick={() => handleOrderClick(order.id)}
							className="bg-white rounded-2xl shadow-sm px-4 py-3.5 text-left active:scale-[0.98] transition-transform w-full"
						>
							<div className="flex items-center justify-between mb-2">
								<span className="text-xs font-semibold text-gray-400">#{order.orderNumber}</span>
								<div className="flex items-center gap-1.5">
									<OrderStatusBadge status={order.status} t={t.orders.status} />
									<ChevronRight size={14} className="text-gray-300" />
								</div>
							</div>
							<div className="flex items-end justify-between">
								<div>
									<p className="text-sm font-semibold text-gray-900">{order.restaurantName}</p>
									<p className="text-xs text-gray-400 mt-0.5">
										{order.itemsCount} {t.orders.items} ·{" "}
										{order.createdAt.slice(0, 10).split("-").reverse().join(".")}
									</p>
								</div>
								<p className="text-sm font-bold text-orange-500">
									{formatPrice(order.totalAmount)} so'm
								</p>
							</div>
						</button>
					))
				)}
			</div>
		</div>
	);
}
