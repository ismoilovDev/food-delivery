import { Check, ChevronLeft, Clock, Loader2, MapPin, Package, Star, X } from "lucide-react";
import { BottomSheet } from "~/components/bottom-sheet";
import { Skeleton } from "~/components/ui/skeleton";
import type { OrderStatus } from "~/lib/api/types";
import { formatPrice } from "~/lib/format";
import { OrderStatusBadge } from "../../components/order-status-badge";
import { RatingModal } from "./components/rating-modal";
import { useOrderDetailPage } from "./usePage";

// Delivery progress timeline
type TimelineStep = {
	key: string;
	statuses: OrderStatus[];
	label: string;
};

function getTimelineSteps(t: Record<string, string>): TimelineStep[] {
	return [
		{ key: "ordered", statuses: ["PENDING"], label: t.ordered },
		{ key: "confirmed", statuses: ["CONFIRMED"], label: t.confirmed },
		{ key: "preparing", statuses: ["PREPARING"], label: t.preparing },
		{
			key: "onTheWay",
			statuses: ["READY_FOR_DELIVERY", "ASSIGNED_TO_COURIER", "PICKED_UP", "IN_DELIVERY"],
			label: t.onTheWay,
		},
		{ key: "delivered", statuses: ["DELIVERED"], label: t.delivered },
	];
}

function getStepIndex(status: OrderStatus, steps: TimelineStep[]): number {
	return steps.findIndex((s) => s.statuses.includes(status));
}

export default function OrderDetailPage() {
	const {
		t,
		order,
		isLoading,
		canCancel,
		canRate,
		deliveryAddress,
		isCancelling,
		isRatingOpen,
		ratingValue,
		reviewText,
		setRatingValue,
		setReviewText,
		isSubmittingRating,
		showCancelConfirm,
		setShowCancelConfirm,
		handleCancel,
		handleOpenRating,
		handleSubmitRating,
		handleCloseRating,
		handleBack,
	} = useOrderDetailPage();

	const isCancelled = order?.status === "CANCELLED" || order?.status === "REJECTED";
	const timelineSteps = getTimelineSteps(t.orders.timeline);
	const currentStep = order && !isCancelled ? getStepIndex(order.status, timelineSteps) : -1;

	return (
		<div className="min-h-screen bg-gray-50 pb-8">
			{/* Header */}
			<div className="bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-12 pb-5">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={handleBack}
						className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0"
					>
						<ChevronLeft size={18} className="text-white" />
					</button>
					<div className="flex-1 min-w-0">
						<h1 className="text-lg font-bold text-white">
							{isLoading ? "..." : `#${order?.orderNumber}`}
						</h1>
						{order && (
							<p className="text-orange-100 text-xs mt-0.5">
								{order.createdAt.slice(0, 10).split("-").reverse().join(".")}
								{order.estimatedDeliveryTime && (
									<span className="ml-2">
										· {t.orders.estimatedDelivery}: {order.estimatedDeliveryTime}
									</span>
								)}
							</p>
						)}
					</div>
					{order && <OrderStatusBadge status={order.status} t={t.orders.status} />}
				</div>
			</div>

			{isLoading ? (
				<div className="px-4 pt-4 flex flex-col gap-3">
					<Skeleton className="h-32 w-full rounded-2xl" />
					<Skeleton className="h-20 w-full rounded-2xl" />
					<Skeleton className="h-28 w-full rounded-2xl" />
				</div>
			) : !order ? (
				<div className="flex flex-col items-center justify-center gap-3 pt-24">
					<Package size={40} className="text-gray-300" />
					<p className="text-gray-500">{t.common.error}</p>
				</div>
			) : (
				<div className="px-4 pt-4 flex flex-col gap-3">
					{/* Status Timeline */}
					{!isCancelled ? (
						<div className="bg-white rounded-2xl shadow-sm px-4 py-4">
							<div className="flex items-center justify-between">
								{timelineSteps.map((step, i) => {
									const isDone = currentStep > i;
									const isCurrent = currentStep === i;
									return (
										<div key={step.key} className="flex flex-col items-center flex-1">
											{/* Connector + circle row */}
											<div className="flex items-center w-full">
												{/* Left connector */}
												<div
													className={`flex-1 h-0.5 ${i === 0 ? "invisible" : isDone || isCurrent ? "bg-orange-400" : "bg-gray-200"}`}
												/>
												{/* Circle */}
												<div
													className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
														isDone
															? "bg-orange-500"
															: isCurrent
																? "bg-orange-500 ring-2 ring-orange-200 ring-offset-1"
																: "bg-gray-200"
													}`}
												>
													{isDone ? (
														<Check size={12} className="text-white" />
													) : isCurrent ? (
														<div className="w-2 h-2 rounded-full bg-white" />
													) : (
														<div className="w-2 h-2 rounded-full bg-gray-400" />
													)}
												</div>
												{/* Right connector */}
												<div
													className={`flex-1 h-0.5 ${i === timelineSteps.length - 1 ? "invisible" : isDone ? "bg-orange-400" : "bg-gray-200"}`}
												/>
											</div>
											{/* Label */}
											<p
												className={`text-[9px] font-medium text-center mt-1.5 leading-tight ${
													isCurrent ? "text-orange-500" : isDone ? "text-gray-600" : "text-gray-300"
												}`}
											>
												{step.label}
											</p>
										</div>
									);
								})}
							</div>
						</div>
					) : (
						<div className="bg-red-50 rounded-2xl px-4 py-3.5 flex items-center gap-3">
							<div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
								<X size={16} className="text-red-500" />
							</div>
							<div>
								<p className="text-sm font-semibold text-red-700">
									{t.orders.status[order.status]}
								</p>
								<p className="text-xs text-red-400 mt-0.5">
									{order.createdAt.slice(0, 10).split("-").reverse().join(".")}
								</p>
							</div>
						</div>
					)}

					{/* Estimated delivery time */}
					{order.estimatedDeliveryTime && !isCancelled && (
						<div className="bg-orange-50 rounded-2xl px-4 py-3 flex items-center gap-3">
							<Clock size={16} className="text-orange-500 shrink-0" />
							<p className="text-sm font-medium text-orange-700">
								{t.orders.estimatedDelivery}: {order.estimatedDeliveryTime}
							</p>
						</div>
					)}

					{/* Items */}
					<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
						<div className="px-4 pt-3.5 pb-2">
							<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
								{t.orders.items_section}
							</h2>
						</div>
						<div className="flex flex-col divide-y divide-gray-50">
							{order.items.map((item) => (
								<div key={item.id} className="flex items-center justify-between px-4 py-3">
									<div className="flex items-center gap-2.5">
										<div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
											<span className="text-xs font-bold text-orange-500">{item.quantity}×</span>
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
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
								{t.orders.addressSection}
							</p>
							{deliveryAddress ? (
								<>
									{deliveryAddress.label && (
										<p className="text-xs text-orange-500 font-medium mb-0.5">
											{deliveryAddress.label}
										</p>
									)}
									<p className="text-sm text-gray-800 break-words">
										{deliveryAddress.fullAddress ?? deliveryAddress.street ?? t.orders.noAddress}
									</p>
								</>
							) : (
								<p className="text-sm text-gray-400">{t.orders.noAddress}</p>
							)}
						</div>
					</div>

					{/* Summary */}
					<div className="bg-white rounded-2xl shadow-sm px-4 py-4">
						<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
							{t.orders.summarySection}
						</h2>
						<div className="space-y-2.5">
							<div className="flex justify-between">
								<span className="text-sm text-gray-500">{t.cart.subtotal}</span>
								<span className="text-sm text-gray-800">{formatPrice(order.totalAmount)} so'm</span>
							</div>
							{order.discountAmount > 0 && (
								<div className="flex justify-between">
									<span className="text-sm text-gray-500">{t.cart.discount}</span>
									<span className="text-sm text-green-500">
										−{formatPrice(order.discountAmount)} so'm
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
					</div>

					{/* Existing rating */}
					{order.rating && (
						<div className="bg-white rounded-2xl shadow-sm px-4 py-3.5">
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
								{t.orders.rate}
							</p>
							<div className="flex gap-1 mb-1.5">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										// biome-ignore lint/suspicious/noArrayIndexKey: fixed length static list
										key={`star-${i}`}
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
									onClick={() => setShowCancelConfirm(true)}
									className="w-full py-3.5 rounded-2xl border border-red-200 text-red-500 font-semibold text-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
								>
									{t.orders.cancel}
								</button>
							)}
						</div>
					)}
				</div>
			)}

			{/* Cancel confirm bottom sheet */}
			<BottomSheet isOpen={showCancelConfirm} onClose={() => setShowCancelConfirm(false)}>
				<h2 className="text-lg font-bold text-gray-900 mb-1">{t.orders.cancelConfirm}</h2>
				<p className="text-sm text-gray-400 mb-6">{t.orders.cancelConfirmDesc}</p>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => setShowCancelConfirm(false)}
						className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-sm"
					>
						{t.common.no}
					</button>
					<button
						type="button"
						onClick={handleCancel}
						disabled={isCancelling}
						className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
					>
						{isCancelling ? <Loader2 size={16} className="animate-spin" /> : t.common.yes}
					</button>
				</div>
			</BottomSheet>

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
					placeholder: t.orders.reviewPlaceholder,
				}}
			/>
		</div>
	);
}
