import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
	useAddCartItem,
	useCart,
	useRemoveCartItem,
	useUpdateCartItem,
} from "~/lib/api/hooks/useCart";
import { useProduct } from "~/lib/api/hooks/useProducts";
import { useI18nStore } from "~/store/i18nStore";

export function useProductDetailPage() {
	const { productId } = useParams();
	const navigate = useNavigate();
	const { t, lang } = useI18nStore();

	const id = Number(productId);
	const { data: product, isLoading } = useProduct(id);
	const { data: cart } = useCart();

	const addCartItem = useAddCartItem();
	const updateCartItem = useUpdateCartItem();
	const removeCartItem = useRemoveCartItem();

	const cartItem = useMemo(
		() => cart?.items?.find((item) => item.productId === id),
		[cart?.items, id]
	);

	const qty = cartItem?.quantity ?? 0;

	function handleIncrement() {
		if (!cartItem) {
			addCartItem.mutate({ productId: id, quantity: 1 });
		} else {
			updateCartItem.mutate({
				itemId: cartItem.id,
				quantity: cartItem.quantity + 1,
			});
		}
	}

	function handleDecrement() {
		if (!cartItem) return;
		if (cartItem.quantity <= 1) {
			removeCartItem.mutate(cartItem.id);
		} else {
			updateCartItem.mutate({
				itemId: cartItem.id,
				quantity: cartItem.quantity - 1,
			});
		}
	}

	return {
		t,
		lang,
		product,
		isLoading,
		qty,
		handleIncrement,
		handleDecrement,
		goBack: () => navigate(-1),
	};
}
