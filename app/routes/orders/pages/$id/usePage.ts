import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCancelOrder, useOrder, useRateOrder } from "~/lib/api/hooks/useOrders";
import { useInitiatePayment, usePaymentByOrder } from "~/lib/api/hooks/usePayment";
import type { PaymentMethod } from "~/lib/api/types";
import { openCheckout } from "~/lib/openCheckout";
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

	const { data: payment } = usePaymentByOrder(Number(id));
	const initiatePayment = useInitiatePayment();

	const deliveryAddress = order?.deliveryAddress ?? null;

	const canCancel = !!order && CANCELLABLE_STATUSES.includes(order.status);
	const canRate = !!order && RATABLE_STATUSES.includes(order.status) && !order.rating;

	// To'lov holati (online to'lovlar uchun)
	const isOnlinePayment = !!payment && payment.method !== "CASH";
	const isPaid = payment?.status === "PAID";
	const isOrderDead = order?.status === "CANCELLED" || order?.status === "REJECTED";
	const canPay = isOnlinePayment && !isPaid && !isOrderDead;

	function handlePay() {
		if (!order || !payment || payment.method === "CASH") return;
		initiatePayment.mutate(
			{ orderId: order.id, method: payment.method as Exclude<PaymentMethod, "CASH"> },
			{
				onSuccess: (res) => {
					if (res.data) openCheckout(res.data);
				},
			}
		);
	}

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
		payment,
		isOnlinePayment,
		isPaid,
		canPay,
		isPaying: initiatePayment.isPending,
		handlePay,
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
