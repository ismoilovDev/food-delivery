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
import type { CreateAddressFromCoordinatesReqDto } from "~/lib/api/types";
import { openCheckout } from "~/lib/openCheckout";
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
	const [note, setNote] = useState("");
	const [promoInput, setPromoInput] = useState("");
	const [promoError, setPromoError] = useState("");
	const [saveAddressError, setSaveAddressError] = useState("");
	const [orderError, setOrderError] = useState("");

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
		setSaveAddressError("");
		setIsPickerOpen(true);
	}

	function handleClosePicker() {
		setIsPickerOpen(false);
	}

	function handleSaveAddress(lat: number, lng: number) {
		setSaveAddressError("");

		// contactPhone backendda ^[+]?[0-9]{10,20}$ patterniga bo'ysunadi.
		// Bo'sh yoki noto'g'ri qiymat 400 beradi — shuning uchun tozalab,
		// faqat patternga mos bo'lsagina yuboramiz (yo'q bo'lsa — umuman yubormaymiz).
		const cleanedPhone = (user?.phone ?? "").replace(/[^\d+]/g, "");
		const body: CreateAddressFromCoordinatesReqDto = {
			latitude: lat,
			longitude: lng,
			isDefault: addresses.length === 0,
		};
		if (user?.fullName) body.contactName = user.fullName;
		if (/^[+]?[0-9]{10,20}$/.test(cleanedPhone)) body.contactPhone = cleanedPhone;

		createAddressFromCoords.mutate(body, {
			onSuccess: (res) => {
				const newId = res.data?.id;
				if (newId) setSelectedAddressId(newId);
				setIsPickerOpen(false);
			},
			onError: (err) => {
				setSaveAddressError(err instanceof Error ? err.message : "Manzilni saqlashda xato");
			},
		});
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
		setOrderError("");

		// Buyurtma yaratish (DELIVERY). Backend OrderReqDto: deliveryType majburiy,
		// paymentMethod yo'q — to'lov alohida /payments/initiate orqali boshlanadi.
		createOrder.mutate(
			{
				deliveryType: "DELIVERY",
				deliveryAddressId: resolvedSelectedId,
				items: cart.items.map((item) => ({
					productId: item.productId,
					quantity: item.quantity,
				})),
				deliveryNotes: note || undefined,
				promocodeCode: cart.promocodeCode || undefined,
			},
			{
				onSuccess: (res) => {
					const orderId = res.data?.id;
					if (!orderId) {
						setOrderError(t.cart.orderError);
						return;
					}

					// Hozircha faqat Payme. To'lovni boshlab, checkout URL'ni ochamiz.
					initiatePayment.mutate(
						{ orderId, method: "PAYME" },
						{
							onSuccess: (payRes) => {
								const checkoutUrl = payRes.data;
								if (checkoutUrl) openCheckout(checkoutUrl);
								navigate(`/orders/${orderId}`);
							},
							onError: () => {
								// Order yaratildi, lekin to'lov boshlanmadi —
								// foydalanuvchi buyurtma sahifasida qayta urinishi mumkin.
								navigate(`/orders/${orderId}`);
							},
						}
					);
				},
				onError: (err) => {
					setOrderError(err instanceof Error ? err.message : t.cart.orderError);
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
		saveAddressError,
		orderError,
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
