import { ChevronDown, Search, Store } from "lucide-react";
import { Input } from "~/components/ui/input";

interface MenuHeaderProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	placeholder: string;
	restaurantName: string;
	onChangeRestaurant: () => void;
}

export function MenuHeader({
	searchQuery,
	onSearchChange,
	placeholder,
	restaurantName,
	onChangeRestaurant,
}: MenuHeaderProps) {
	return (
		<div className="bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-4 pb-3">
			<button
				type="button"
				onClick={onChangeRestaurant}
				className="flex items-center gap-1.5 mb-3 max-w-full active:scale-95 transition-transform"
			>
				<Store size={16} className="text-white shrink-0" />
				<span className="text-white font-semibold text-sm truncate">{restaurantName}</span>
				<ChevronDown size={16} className="text-white/80 shrink-0" />
			</button>

			<div className="relative">
				<Search
					size={16}
					className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10"
				/>
				<Input
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder={placeholder}
					className="pl-9 rounded-2xl border-0 bg-white shadow-sm text-sm"
				/>
			</div>
		</div>
	);
}
