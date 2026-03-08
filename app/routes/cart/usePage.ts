import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateAddress, useMyAddresses } from "~/lib/api/hooks/useAddresses";
import {
	useApplyPromocode,
	useCart,
	useClearCart,
	useRemoveCartItem,
	useRemovePromocode,
	useUpdateCartItem,
} from "~/lib/api/hooks/useCart";
import { useCreateOrder } from "~/lib/api/hooks/useOrders";
import { RESTAURANT_ID } from "~/lib/config";
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
	const createAddress = useCreateAddress();
	const applyPromo = useApplyPromocode();
	const removePromo = useRemovePromocode();

	const defaultAddress = addresses.find((a) => a.isDefault);
	const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(
		() => defaultAddress?.id
	);
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [note, setNote] = useState("");
	const [promoInput, setPromoInput] = useState("");
	const [promoError, setPromoError] = useState("");

	const isEmpty = !cart?.items?.length;

	// Sync selectedAddressId with default when addresses load
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

	function handleSaveAddress(lat: number, lng: number, address: string) {
		createAddress.mutate(
			{
				address,
				latitude: lat,
				longitude: lng,
				recipientName: user?.fullName ?? "",
				phoneNumber: user?.phone ?? "",
				isDefault: false,
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
			},
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
				restaurantId: RESTAURANT_ID,
				deliveryAddressId: resolvedSelectedId,
				items: cart.items.map((item) => ({
					productId: item.productId,
					quantity: item.quantity,
				})),
				paymentMethod: "CASH",
				specialInstructions: note || undefined,
				promocodeCode: cart.promocodeCode || undefined,
			},
			{
				onSuccess: () => navigate("/profile/orders"),
			}
		);
	}

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
		isOrdering: createOrder.isPending,
		isClearing: clearCart.isPending,
		isSavingAddress: createAddress.isPending,
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
