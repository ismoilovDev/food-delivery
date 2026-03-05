import { useState, useMemo } from "react";
import { useRootCategories } from "~/lib/api/hooks/useCategories";
import { useProducts, useProductSearch } from "~/lib/api/hooks/useProducts";
import {
  useCart,
  useAddCartItem,
  useUpdateCartItem,
  useRemoveCartItem,
} from "~/lib/api/hooks/useCart";
import { useBranchStore } from "~/store/branchStore";
import { useI18nStore } from "~/store/i18nStore";

export function useMenuPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { t, lang } = useI18nStore();
  const selectedBranch = useBranchStore((s) => s.selectedBranch);

  const { data: categories, isLoading: categoriesLoading } =
    useRootCategories();

  const { data: products, isLoading: productsLoading } = useProducts({
    categoryId: selectedCategoryId ?? undefined,
    restaurantId: selectedBranch?.id,
  });

  const { data: searchResults, isLoading: searchLoading } = useProductSearch(
    searchQuery,
    { restaurantId: selectedBranch?.id }
  );

  const { data: cart } = useCart();
  const addCartItem = useAddCartItem();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();

  const cartItemMap = useMemo(() => {
    const map = new Map<number, { id: number; quantity: number }>();
    cart?.items?.forEach((item) => map.set(item.productId, item));
    return map;
  }, [cart?.items]);

  const cartTotalItems =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const isSearching = searchQuery.length > 1;
  const displayProducts = isSearching ? searchResults : products;
  const isLoading =
    productsLoading || (isSearching && searchLoading);

  function handleIncrement(productId: number) {
    const item = cartItemMap.get(productId);
    if (!item) {
      addCartItem.mutate({ productId, quantity: 1 });
    } else {
      updateCartItem.mutate({
        itemId: item.id,
        body: { quantity: item.quantity + 1 },
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
        body: { quantity: item.quantity - 1 },
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
    selectedBranch,
    handleIncrement,
    handleDecrement,
  };
}
