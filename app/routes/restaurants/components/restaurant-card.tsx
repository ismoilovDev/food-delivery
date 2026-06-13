import { Clock, Star, Store } from "lucide-react";
import type { RestaurantDto } from "~/lib/api/types";
import { formatLocalTime, formatPrice, isWithinWorkingHours } from "~/lib/format";
import type { TranslationKeys } from "~/lib/i18n";
import { type Lang, localName } from "~/lib/i18n";
import { cn } from "~/lib/utils";

interface RestaurantCardProps {
	restaurant: RestaurantDto;
	lang: Lang;
	t: TranslationKeys["restaurants"];
	sumLabel: string;
	isSelected: boolean;
	onSelect: () => void;
}

export function RestaurantCard({
	restaurant,
	lang,
	t,
	sumLabel,
	isSelected,
	onSelect,
}: RestaurantCardProps) {
	const isOpen =
		restaurant.isOpen ??
		isWithinWorkingHours(restaurant.workingHoursStart, restaurant.workingHoursEnd);

	return (
		<button
			type="button"
			onClick={onSelect}
			className={cn(
				"bg-white rounded-2xl shadow-sm overflow-hidden text-left active:scale-[0.98] transition-transform w-full",
				isSelected && "ring-2 ring-orange-500"
			)}
		>
			{/* Banner */}
			<div className="relative w-full h-28 bg-gray-100">
				{restaurant.bannerUrl || restaurant.logoUrl ? (
					<img
						src={restaurant.bannerUrl || restaurant.logoUrl}
						alt={localName(restaurant.name, lang)}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<Store size={32} className="text-gray-200" />
					</div>
				)}

				<div className="absolute top-2 right-2">
					<span
						className={cn(
							"px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-sm",
							isOpen ? "bg-green-500 text-white" : "bg-gray-700/80 text-white"
						)}
					>
						{isOpen ? t.open : t.closed}
					</span>
				</div>
			</div>

			{/* Info */}
			<div className="p-3 flex flex-col gap-1.5">
				<div className="flex items-center justify-between gap-2">
					<p className="text-sm font-bold text-gray-900 truncate">
						{localName(restaurant.name, lang)}
					</p>
					<div className="flex items-center gap-0.5 shrink-0">
						<Star size={12} className="fill-amber-400 text-amber-400" />
						<span className="text-xs font-semibold text-gray-700">
							{restaurant.rating?.toFixed(1) ?? "0.0"}
						</span>
					</div>
				</div>

				{restaurant.description && (
					<p className="text-xs text-gray-400 line-clamp-1">
						{localName(restaurant.description, lang)}
					</p>
				)}

				<div className="flex items-center gap-3 mt-0.5 text-[11px] text-gray-500">
					<span className="flex items-center gap-1">
						<Clock size={12} className="text-orange-400" />
						{restaurant.averageDeliveryTime} {t.deliveryTime}
					</span>
					<span className="truncate">
						{formatLocalTime(restaurant.workingHoursStart)}–
						{formatLocalTime(restaurant.workingHoursEnd)}
					</span>
				</div>

				{restaurant.minOrderAmount > 0 && (
					<p className="text-[11px] text-gray-500 truncate">
						{t.minOrder}: {formatPrice(restaurant.minOrderAmount)} {sumLabel}
					</p>
				)}
			</div>
		</button>
	);
}
