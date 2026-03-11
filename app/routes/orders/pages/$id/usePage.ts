import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCancelOrder, useOrder, useRateOrder } from "~/lib/api/hooks/useOrders";
import { useI18nStore } from "~/store/i18nStore";

const CANCELLABLE_STATUSES = ["PENDING", "CONFIRMED"];
const RATABLE_STATUSES = ["DELIVERED"];

export function useOrderDetailPage() {
	const { id } = useParams();
	const { t } = useI18nStore();
	const navigate = useNavigate();

	const [isRatingOpen, setIsRatingOpen] = useState(false);
	const [ratingValue, setRatingValue] = useState(0);
	const [reviewText, setReviewText] = useState("");
	const [showCancelConfirm, setShowCancelConfirm] = useState(false);

	const { data: order, isLoading } = useOrder(Number(id));
	const cancelOrder = useCancelOrder();
	const rateOrder = useRateOrder();

	const deliveryAddress = order?.deliveryAddress ?? null;

	const canCancel = !!order && CANCELLABLE_STATUSES.includes(order.status);
	const canRate = !!order && RATABLE_STATUSES.includes(order.status) && !order.rating;

	function handleCancel() {
		if (!order) return;
		cancelOrder.mutate({ id: order.id }, { onSuccess: () => setShowCancelConfirm(false) });
	}

	function handleSubmitRating() {
		if (!order || ratingValue === 0) return;
		rateOrder.mutate(
			{ id: order.id, rating: ratingValue, review: reviewText || undefined },
			{ onSuccess: () => setIsRatingOpen(false) }
		);
	}

	return {
		t,
		order,
		isLoading,
		canCancel,
		canRate,
		deliveryAddress,
		isCancelling: cancelOrder.isPending,
		isRatingOpen,
		ratingValue,
		reviewText,
		setRatingValue,
		setReviewText,
		isSubmittingRating: rateOrder.isPending,
		showCancelConfirm,
		setShowCancelConfirm,
		handleCancel,
		handleOpenRating: () => setIsRatingOpen(true),
		handleSubmitRating,
		handleCloseRating: () => setIsRatingOpen(false),
		handleBack: () => navigate("/orders"),
	};
}
