import { useNavigate } from "react-router";
import { useDefaultAddress } from "~/lib/api/hooks/useAddresses";
import {
	useCart,
	useClearCart,
	useRemoveCartItem,
	useUpdateCartItem,
} from "~/lib/api/hooks/useCart";
import { useCreateOrder } from "~/lib/api/hooks/useOrders";
import { useBranchStore } from "~/store/branchStore";
import { useI18nStore } from "~/store/i18nStore";

export function useCartPage() {
	const navigate = useNavigate();
	const { t } = useI18nStore();
	const selectedBranch = useBranchStore((s) => s.selectedBranch);

	const { data: cart, isLoading } = useCart();
	const { data: defaultAddress } = useDefaultAddress();

	const updateItem = useUpdateCartItem();
	const removeItem = useRemoveCartItem();
	const clearCart = useClearCart();
	const createOrder = useCreateOrder();

	const isEmpty = !cart?.items?.length;

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

	function handlePlaceOrder() {
		if (!cart || !defaultAddress || !selectedBranch) return;

		createOrder.mutate(
			{
				restaurantId: selectedBranch.id,
				deliveryAddressId: defaultAddress.id,
				items: cart.items.map((item) => ({
					productId: item.productId,
					quantity: item.quantity,
				})),
				paymentMethod: "CASH",
			},
			{
				onSuccess: () => navigate("/profile/orders"),
			}
		);
	}

	const canOrder = !!cart?.items?.length && !!defaultAddress && !!selectedBranch;

	const subtotal = cart?.totalAmount ?? 0;
	const discount = cart?.discountAmount ?? 0;
	const isFreeDelivery =
		selectedBranch?.freeDeliveryThreshold != null &&
		subtotal >= selectedBranch.freeDeliveryThreshold;
	const deliveryFee = isFreeDelivery ? 0 : (selectedBranch?.deliveryFee ?? 0);
	const total = subtotal - discount + deliveryFee;

	return {
		t,
		cart,
		isLoading,
		defaultAddress,
		isEmpty,
		canOrder,
		isOrdering: createOrder.isPending,
		isClearing: clearCart.isPending,
		subtotal,
		discount,
		deliveryFee,
		total,
		handleIncrement,
		handleDecrement,
		handleClear,
		handlePlaceOrder,
	};
}
