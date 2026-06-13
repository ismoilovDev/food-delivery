import { Search, Store } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { RestaurantCard } from "./components/restaurant-card";
import { useRestaurantsPage } from "./usePage";

export default function RestaurantsPage() {
	const {
		t,
		lang,
		restaurants,
		isLoading,
		searchQuery,
		setSearchQuery,
		selectedBranchId,
		handleSelect,
	} = useRestaurantsPage();

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			{/* Header */}
			<div className="sticky top-0 z-40 bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-12 pb-3 shadow-lg shadow-orange-200/50">
				<h1 className="text-xl font-bold text-white">{t.restaurants.title}</h1>
				<p className="text-white/80 text-xs mt-0.5">{t.restaurants.subtitle}</p>

				<div className="relative mt-3">
					<Search
						size={16}
						className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10"
					/>
					<Input
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder={t.restaurants.search}
						className="pl-9 rounded-2xl border-0 bg-white shadow-sm text-sm"
					/>
				</div>
			</div>

			{/* List */}
			<div className="flex-1 p-4 flex flex-col gap-3">
				{isLoading ? (
					Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={`sk-${i}`} className="h-44 w-full rounded-2xl" />
					))
				) : restaurants.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-3 pt-24">
						<div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
							<Store size={28} className="text-orange-300" />
						</div>
						<p className="text-base font-semibold text-gray-700">{t.restaurants.empty}</p>
					</div>
				) : (
					restaurants.map((restaurant) => (
						<RestaurantCard
							key={restaurant.id}
							restaurant={restaurant}
							lang={lang}
							t={t.restaurants}
							sumLabel={t.common.sum}
							isSelected={restaurant.id === selectedBranchId}
							onSelect={() => handleSelect(restaurant)}
						/>
					))
				)}
			</div>
		</div>
	);
}
