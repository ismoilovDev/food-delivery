import { useState } from "react";
import { useParams } from "react-router";
import { useCancelOrder, useOrder, useRateOrder } from "~/lib/api/hooks/useOrders";
import { useI18nStore } from "~/store/i18nStore";

const CANCELLABLE: string[] = ["PENDING", "CONFIRMED"];
const RATABLE: string[] = ["DELIVERED"];

export function useOrderDetailPage() {
	const { id } = useParams();
	const { t } = useI18nStore();
	const [isRatingOpen, setIsRatingOpen] = useState(false);
	const [ratingValue, setRatingValue] = useState(0);
	const [reviewText, setReviewText] = useState("");

	const { data: order, isLoading } = useOrder(Number(id));
	const cancelOrder = useCancelOrder();
	const rateOrder = useRateOrder();

	const canCancel = !!order && CANCELLABLE.includes(order.status) && !cancelOrder.isPending;
	const canRate = !!order && RATABLE.includes(order.status) && !order.rating;

	function handleCancel() {
		if (!order) return;
		cancelOrder.mutate({ id: order.id });
	}

	function handleOpenRating() {
		setIsRatingOpen(true);
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
		isCancelling: cancelOrder.isPending,
		isRatingOpen,
		ratingValue,
		reviewText,
		setRatingValue,
		setReviewText,
		isSubmittingRating: rateOrder.isPending,
		handleCancel,
		handleOpenRating,
		handleSubmitRating,
		handleCloseRating: () => setIsRatingOpen(false),
	};
}
