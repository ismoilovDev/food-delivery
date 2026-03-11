import { openLink } from "@telegram-apps/sdk-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateAddressFromCoordinates, useMyAddresses } from "~/lib/api/hooks/useAddresses";
import {
	useApplyPromocode,
	useCart,
	useClearCart,
	useRemoveCartItem,
	useRemovePromocode,
	useUpdateCartItem,
} from "~/lib/api/hooks/useCart";
import { useCreateOrder } from "~/lib/api/hooks/useOrders";
import { useInitiatePayment } from "~/lib/api/hooks/usePayment";
import type { PaymentMethod } from "~/lib/api/types";
import { useAuthStore } from "~/store/authStore";
import { useI18nStore } from "~/store/i18nStore";

export function useCartPage() {
	const navigate = useNavigate();
	const { t } = useI18nStore();
	const user = useAuthStore((s) => s.user);

	const { data: cart, isLoading } = useCart();
	const { data: addresses = [] } = useMyAddresses();

	const updateItem = useUpdateCartItem();
	const removeItem = useRemoveCartItem();
	const clearCart = useClearCart();
	const createOrder = useCreateOrder();
	const initiatePayment = useInitiatePayment();
	const createAddressFromCoords = useCreateAddressFromCoordinates();
	const applyPromo = useApplyPromocode();
	const removePromo = useRemovePromocode();

	const defaultAddress = addresses.find((a) => a.isDefault);
	const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(
		() => defaultAddress?.id
	);
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
	const [note, setNote] = useState("");
	const [promoInput, setPromoInput] = useState("");
	const [promoError, setPromoError] = useState("");

	const isEmpty = !cart?.items?.length;

	const resolvedSelectedId =
		selectedAddressId ?? addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id;

	function handleIncrement(itemId: number, currentQty: number) {
		updateItem.mutate({ itemId, quantity: currentQty + 1 });
	}

	function handleDecrement(itemId: number, currentQty: number) {
		if (currentQty <= 1) {
			removeItem.mutate(itemId);
		} else {
			updateItem.mutate({ itemId, quantity: currentQty - 1 });
		}
	}

	function handleClear() {
		clearCart.mutate();
	}

	function handleSelectAddress(id: number) {
		setSelectedAddressId(id);
	}

	function handleOpenPicker() {
		setIsPickerOpen(true);
	}

	function handleClosePicker() {
		setIsPickerOpen(false);
	}

	function handleSaveAddress(lat: number, lng: number) {
		createAddressFromCoords.mutate(
			{
				latitude: lat,
				longitude: lng,
				contactName: user?.fullName ?? "",
				contactPhone: user?.phone ?? "",
				isDefault: addresses.length === 0,
			},
			{
				onSuccess: (res) => {
					const newId = res.data?.id;
					if (newId) setSelectedAddressId(newId);
					setIsPickerOpen(false);
				},
			}
		);
	}

	function handleApplyPromo() {
		const code = promoInput.trim();
		if (!code) return;
		setPromoError("");
		applyPromo.mutate(
			{ code },
			{
				onSuccess: () => setPromoInput(""),
				onError: () => setPromoError(t.cart.promoError),
			}
		);
	}

	function handleRemovePromo() {
		setPromoError("");
		removePromo.mutate();
	}

	function handlePlaceOrder() {
		if (!cart || !resolvedSelectedId) return;

		createOrder.mutate(
			{
				deliveryAddressId: resolvedSelectedId,
				items: cart.items.map((item) => ({
					productId: item.productId,
					quantity: item.quantity,
				})),
				notes: note || undefined,
				paymentMethod,
				promocodeCode: cart.promocodeCode || undefined,
			},
			{
				onSuccess: (res) => {
					const orderId = res.data?.id;
					if (!orderId) {
						navigate("/orders");
						return;
					}

					if (paymentMethod === "CASH") {
						navigate(`/orders/${orderId}`);
						return;
					}

					// Online payment: initiate and open checkout URL
					initiatePayment.mutate(
						{ orderId, method: paymentMethod },
						{
							onSuccess: (payRes) => {
								const checkoutUrl = payRes.data?.checkoutUrl;
								if (checkoutUrl) {
									try {
										if (openLink.isAvailable()) {
											openLink(checkoutUrl);
										} else {
											window.open(checkoutUrl, "_blank");
										}
									} catch {
										window.open(checkoutUrl, "_blank");
									}
								}
								navigate(`/orders/${orderId}`);
							},
							onError: () => {
								// Payment initiation failed — still navigate to order detail
								navigate(`/orders/${orderId}`);
							},
						}
					);
				},
			}
		);
	}

	const isProcessing = createOrder.isPending || initiatePayment.isPending;
	const canOrder = !!cart?.items?.length && !!resolvedSelectedId;

	const subtotal = cart?.totalAmount ?? 0;
	const discount = cart?.discountAmount ?? 0;
	const total = cart?.finalAmount ?? subtotal - discount;
	const appliedPromo = cart?.promocodeCode ?? null;

	return {
		t,
		cart,
		isLoading,
		addresses,
		selectedAddressId: resolvedSelectedId,
		isPickerOpen,
		isPaymentSheetOpen,
		setIsPaymentSheetOpen,
		paymentMethod,
		setPaymentMethod,
		note,
		setNote,
		promoInput,
		setPromoInput,
		promoError,
		appliedPromo,
		isApplyingPromo: applyPromo.isPending,
		isRemovingPromo: removePromo.isPending,
		handleApplyPromo,
		handleRemovePromo,
		isEmpty,
		canOrder,
		isOrdering: isProcessing,
		isClearing: clearCart.isPending,
		isSavingAddress: createAddressFromCoords.isPending,
		subtotal,
		discount,
		total,
		handleIncrement,
		handleDecrement,
		handleClear,
		handleSelectAddress,
		handleOpenPicker,
		handleClosePicker,
		handleSaveAddress,
		handlePlaceOrder,
	};
}
