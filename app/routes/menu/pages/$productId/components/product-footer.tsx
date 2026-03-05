import { Minus, Plus, ShoppingCart } from "lucide-react";
import { formatPrice } from "~/lib/format";

interface ProductFooterProps {
	price: number;
	discountPrice?: number;
	qty: number;
	sumLabel: string;
	addToCartLabel: string;
	onIncrement: () => void;
	onDecrement: () => void;
}

export function ProductFooter({
	price,
	discountPrice,
	qty,
	sumLabel,
	addToCartLabel,
	onIncrement,
	onDecrement,
}: ProductFooterProps) {
	const displayPrice = discountPrice ?? price;

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 z-50">
			<div className="flex items-center justify-between gap-4">
				{/* Price */}
				<div className="flex flex-col">
					<span className="text-lg font-bold text-gray-900">
						{formatPrice(displayPrice)}{" "}
						<span className="text-sm font-medium text-gray-500">{sumLabel}</span>
					</span>
					{discountPrice && (
						<span className="text-xs text-gray-400 line-through">
							{formatPrice(price)} {sumLabel}
						</span>
					)}
				</div>

				{/* Stepper or Add button */}
				{qty === 0 ? (
					<button
						type="button"
						onClick={onIncrement}
						className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold text-sm shadow-lg shadow-orange-200 active:scale-95 transition-transform"
					>
						<ShoppingCart size={16} />
						{addToCartLabel}
					</button>
				) : (
					<div className="flex items-center gap-3 bg-orange-50 rounded-2xl px-2 py-1.5">
						<button
							type="button"
							onClick={onDecrement}
							className="w-8 h-8 rounded-xl bg-white text-orange-500 flex items-center justify-center shadow-sm active:scale-90 transition-transform"
						>
							<Minus size={15} strokeWidth={2.5} />
						</button>
						<span className="text-base font-bold text-gray-900 min-w-[20px] text-center">
							{qty}
						</span>
						<button
							type="button"
							onClick={onIncrement}
							className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 text-white flex items-center justify-center shadow-md shadow-orange-200 active:scale-90 transition-transform"
						>
							<Plus size={15} strokeWidth={2.5} />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
