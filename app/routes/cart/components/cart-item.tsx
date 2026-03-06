import { ChefHat, Minus, Plus, Trash2 } from "lucide-react";
import type { CartItemDto } from "~/lib/api/types";
import { formatPrice } from "~/lib/format";

interface CartItemProps {
	item: CartItemDto;
	sumLabel: string;
	onIncrement: () => void;
	onDecrement: () => void;
}

export function CartItem({ item, sumLabel, onIncrement, onDecrement }: CartItemProps) {
	return (
		<div className="flex items-center gap-3 bg-white rounded-2xl px-3 py-3 shadow-sm">
			{/* Image */}
			<div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 overflow-hidden">
				{item.productImage ? (
					<img
						src={item.productImage}
						alt={item.productName}
						className="w-full h-full object-cover"
					/>
				) : (
					<ChefHat size={22} className="text-orange-200" />
				)}
			</div>

			{/* Info */}
			<div className="flex-1 min-w-0">
				<p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
					{item.productName}
				</p>
				<p className="text-sm font-bold text-orange-500 mt-0.5">
					{formatPrice(item.totalPrice)}{" "}
					<span className="text-xs font-medium text-gray-400">{sumLabel}</span>
				</p>
			</div>

			{/* Stepper */}
			<div className="flex items-center gap-2 shrink-0">
				<button
					type="button"
					onClick={onDecrement}
					className="w-7 h-7 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center active:scale-90 transition-transform"
				>
					{item.quantity === 1 ? (
						<Trash2 size={13} strokeWidth={2} />
					) : (
						<Minus size={13} strokeWidth={2.5} />
					)}
				</button>
				<span className="text-sm font-bold text-gray-800 min-w-[18px] text-center">
					{item.quantity}
				</span>
				<button
					type="button"
					onClick={onIncrement}
					className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 text-white flex items-center justify-center shadow-sm shadow-orange-200 active:scale-90 transition-transform"
				>
					<Plus size={13} strokeWidth={2.5} />
				</button>
			</div>
		</div>
	);
}
