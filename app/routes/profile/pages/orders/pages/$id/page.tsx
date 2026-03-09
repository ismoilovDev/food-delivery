import { ChevronLeft, Loader2, MapPin, Package, Star } from "lucide-react";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import { formatPrice } from "~/lib/format";
import { OrderStatusBadge } from "../../components/order-status-badge";
import { RatingModal } from "./components/rating-modal";
import { useOrderDetailPage } from "./usePage";

export default function OrderDetailPage() {
	const {
		t,
		order,
		isLoading,
		canCancel,
		canRate,
		isCancelling,
		isRatingOpen,
		ratingValue,
		reviewText,
		setRatingValue,
		setReviewText,
		isSubmittingRating,
		handleCancel,
		handleOpenRating,
		handleSubmitRating,
		handleCloseRating,
	} = useOrderDetailPage();

	return (
		<div className="min-h-screen bg-gray-50 pb-8">
			{/* Header */}
			<div className="bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-12 pb-5 flex items-center gap-3">
				<Link
					to="/profile/orders"
					className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center"
				>
					<ChevronLeft size={18} className="text-white" />
				</Link>
				<div>
					<h1 className="text-lg font-bold text-white">
						{isLoading ? "..." : `#${order?.orderNumber}`}
					</h1>
					{order && (
						<p className="text-orange-100 text-xs mt-0.5">
							{order.createdAt.slice(0, 10).split("-").reverse().join(".")}
						</p>
					)}
				</div>
				{order && (
					<div className="ml-auto">
						<OrderStatusBadge status={order.status} t={t.orders.status} />
					</div>
				)}
			</div>

			{isLoading ? (
				<div className="px-4 pt-4 flex flex-col gap-3">
					<Skeleton className="h-32 w-full rounded-2xl" />
					<Skeleton className="h-24 w-full rounded-2xl" />
					<Skeleton className="h-28 w-full rounded-2xl" />
				</div>
			) : !order ? (
				<div className="flex flex-col items-center justify-center gap-3 pt-24">
					<Package size={40} className="text-gray-300" />
					<p className="text-gray-500">{t.common.error}</p>
				</div>
			) : (
				<div className="px-4 pt-4 flex flex-col gap-3">
					{/* Items */}
					<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
						<div className="px-4 pt-3.5 pb-2">
							<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
								{t.orders.items}
							</h2>
						</div>
						<div className="flex flex-col divide-y divide-gray-50">
							{order.items.map((item) => (
								<div key={item.id} className="flex items-center justify-between px-4 py-3">
									<div className="flex items-center gap-2.5">
										<div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
											<span className="text-xs font-bold text-orange-500">{item.quantity}x</span>
										</div>
										<span className="text-sm text-gray-800">{item.productName}</span>
									</div>
									<span className="text-sm font-semibold text-gray-700">
										{formatPrice(item.price * item.quantity)} so'm
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Address */}
					<div className="bg-white rounded-2xl shadow-sm px-4 py-3.5 flex items-start gap-3">
						<div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
							<MapPin size={15} className="text-orange-500" />
						</div>
						<div>
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
								{t.cart.addressSection}
							</p>
							<p className="text-sm text-gray-800">ID: {order.deliveryAddressId}</p>
						</div>
					</div>

					{/* Summary */}
					<div className="bg-white rounded-2xl shadow-sm px-4 py-4 space-y-2.5">
						<div className="flex justify-between">
							<span className="text-sm text-gray-500">{t.cart.subtotal}</span>
							<span className="text-sm text-gray-800">{formatPrice(order.totalAmount)} so'm</span>
						</div>
						{order.discountAmount > 0 && (
							<div className="flex justify-between">
								<span className="text-sm text-gray-500">{t.cart.discount}</span>
								<span className="text-sm text-green-500">
									-{formatPrice(order.discountAmount)} so'm
								</span>
							</div>
						)}
						<div className="flex justify-between">
							<span className="text-sm text-gray-500">{t.cart.deliveryFee}</span>
							<span className="text-sm text-gray-800">
								{order.deliveryFee === 0 ? t.cart.free : `${formatPrice(order.deliveryFee)} so'm`}
							</span>
						</div>
						<div className="border-t border-gray-100 pt-2.5 flex justify-between">
							<span className="text-sm font-semibold text-gray-900">{t.cart.total}</span>
							<span className="text-base font-bold text-orange-500">
								{formatPrice(order.totalAmount - order.discountAmount + order.deliveryFee)} so'm
							</span>
						</div>
					</div>

					{/* Rating (if already rated) */}
					{order.rating && (
						<div className="bg-white rounded-2xl shadow-sm px-4 py-3.5">
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
								{t.orders.rate}
							</p>
							<div className="flex gap-1 mb-1.5">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={`star-display-${i}`}
										size={18}
										className={
											i < (order.rating ?? 0)
												? "text-orange-400 fill-orange-400"
												: "text-gray-200 fill-gray-200"
										}
									/>
								))}
							</div>
							{order.review && <p className="text-sm text-gray-600">{order.review}</p>}
						</div>
					)}

					{/* Actions */}
					{(canCancel || canRate) && (
						<div className="flex flex-col gap-2">
							{canRate && (
								<button
									type="button"
									onClick={handleOpenRating}
									className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-base shadow-lg shadow-orange-200 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
								>
									<Star size={18} />
									{t.orders.rate}
								</button>
							)}
							{canCancel && (
								<button
									type="button"
									onClick={handleCancel}
									disabled={isCancelling}
									className="w-full py-3.5 rounded-2xl border border-red-200 text-red-500 font-semibold text-sm active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
								>
									{isCancelling ? <Loader2 size={16} className="animate-spin" /> : t.orders.cancel}
								</button>
							)}
						</div>
					)}
				</div>
			)}

			{/* Rating modal */}
			<RatingModal
				isOpen={isRatingOpen}
				onClose={handleCloseRating}
				ratingValue={ratingValue}
				reviewText={reviewText}
				isSubmitting={isSubmittingRating}
				onRatingChange={setRatingValue}
				onReviewChange={setReviewText}
				onSubmit={handleSubmitRating}
				t={{
					title: t.orders.rateOrder,
					submit: t.common.save,
					placeholder: t.orders.rate,
				}}
			/>
		</div>
	);
}
