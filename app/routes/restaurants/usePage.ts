import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useClearCart } from "~/lib/api/hooks/useCart";
import { useRestaurants } from "~/lib/api/hooks/useRestaurants";
import type { RestaurantDto } from "~/lib/api/types";
import { localName } from "~/lib/i18n";
import { useBranchStore } from "~/store/branchStore";
import { useI18nStore } from "~/store/i18nStore";

export function useRestaurantsPage() {
	const navigate = useNavigate();
	const { t, lang } = useI18nStore();
	const { selectedBranch, setSelectedBranch } = useBranchStore();
	const clearCart = useClearCart();

	const [searchQuery, setSearchQuery] = useState("");

	const { data: restaurants, isLoading } = useRestaurants();

	const filtered = useMemo(() => {
		const list = restaurants ?? [];
		const q = searchQuery.trim().toLowerCase();
		if (!q) return list;
		return list.filter((r) => localName(r.name, lang).toLowerCase().includes(q));
	}, [restaurants, searchQuery, lang]);

	function handleSelect(restaurant: RestaurantDto) {
		if (selectedBranch && selectedBranch.id !== restaurant.id) {
			clearCart.mutate();
		}
		setSelectedBranch(restaurant);
		navigate("/menu", { replace: true });
	}

	return {
		t,
		lang,
		restaurants: filtered,
		isLoading,
		searchQuery,
		setSearchQuery,
		selectedBranchId: selectedBranch?.id,
		handleSelect,
	};
}
