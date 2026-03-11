import { useMemo, useState } from "react";
import {
	useAddCartItem,
	useCart,
	useRemoveCartItem,
	useUpdateCartItem,
} from "~/lib/api/hooks/useCart";
import { useRootCategories } from "~/lib/api/hooks/useCategories";
import { useProducts } from "~/lib/api/hooks/useProducts";
import { RESTAURANT_ID } from "~/lib/config";
import { localName } from "~/lib/i18n";
import { useI18nStore } from "~/store/i18nStore";

export function useMenuPage() {
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const { t, lang } = useI18nStore();

	const { data: categories, isLoading: categoriesLoading } = useRootCategories();

	const { data: products, isLoading: productsLoading } = useProducts({
		categoryId: selectedCategoryId ?? undefined,
		restaurantId: RESTAURANT_ID,
	});

	// All products (no category filter) — used for client-side search
	const { data: allProducts } = useProducts({ restaurantId: RESTAURANT_ID });

	const { data: cart } = useCart();
	const addCartItem = useAddCartItem();
	const updateCartItem = useUpdateCartItem();
	const removeCartItem = useRemoveCartItem();

	const cartItemMap = useMemo(() => {
		const map = new Map<number, { id: number; quantity: number }>();
		for (const item of cart?.items ?? []) map.set(item.productId, item);
		return map;
	}, [cart?.items]);

	const cartTotalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

	const isSearching = searchQuery.length > 1;
	const searchResults = useMemo(() => {
		if (!isSearching) return undefined;
		const q = searchQuery.toLowerCase();
		return (allProducts ?? []).filter((p) => localName(p.name, lang).toLowerCase().includes(q));
	}, [isSearching, searchQuery, allProducts]);

	const displayProducts = isSearching ? searchResults : products;
	const isLoading = productsLoading;

	function handleIncrement(productId: number) {
		const item = cartItemMap.get(productId);
		if (!item) {
			addCartItem.mutate({ productId, quantity: 1 });
		} else {
			updateCartItem.mutate({
				itemId: item.id,
				quantity: item.quantity + 1,
			});
		}
	}

	function handleDecrement(productId: number) {
		const item = cartItemMap.get(productId);
		if (!item) return;
		if (item.quantity <= 1) {
			removeCartItem.mutate(item.id);
		} else {
			updateCartItem.mutate({
				itemId: item.id,
				quantity: item.quantity - 1,
			});
		}
	}

	return {
		t,
		lang,
		categories,
		categoriesLoading,
		displayProducts,
		isLoading,
		selectedCategoryId,
		setSelectedCategoryId,
		searchQuery,
		setSearchQuery,
		cartItemMap,
		cartTotalItems,
		handleIncrement,
		handleDecrement,
	};
}
