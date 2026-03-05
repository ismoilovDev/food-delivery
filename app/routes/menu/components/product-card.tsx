import { ChefHat, Minus, Plus } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import type { ProductDto } from "~/lib/api/types";
import { formatPrice } from "~/lib/format";
import { type Lang, localName } from "~/lib/i18n";
import { cn } from "~/lib/utils";

interface ProductCardProps {
	product: ProductDto;
	lang: Lang;
	cartItem?: { id: number; quantity: number };
	sumLabel: string;
	onIncrement: () => void;
	onDecrement: () => void;
}

export function ProductCard({
	product,
	lang,
	cartItem,
	sumLabel,
	onIncrement,
	onDecrement,
}: ProductCardProps) {
	const qty = cartItem?.quantity ?? 0;
	const price = product.discountPrice ?? product.price;
	const hasDiscount = !!product.discountPrice;

	return (
		<Link
			to={`/menu/${product.id}`}
			className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col active:scale-[0.98] transition-transform"
			onClick={(e) => {
				if ((e.target as HTMLElement).closest("[data-stepper]")) {
					e.preventDefault();
				}
			}}
		>
			{/* Image */}
			<div className="relative w-full aspect-square bg-gray-50">
				{product.mainImageUrl ? (
					<img
						src={product.mainImageUrl}
						alt={localName(product.name, lang)}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<ChefHat size={36} className="text-gray-200" />
					</div>
				)}

				{hasDiscount && (
					<div className="absolute top-2 left-2">
						<Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-[10px] px-1.5 py-0.5 shadow">
							-{product.discountPercentage}%
						</Badge>
					</div>
				)}
			</div>

			{/* Info */}
			<div className="p-2.5 flex flex-col gap-2 flex-1">
				<p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">
					{localName(product.name, lang)}
				</p>

				<div className="mt-auto flex items-end justify-between gap-1">
					<div className="flex flex-col min-w-0">
						<span className="text-sm font-bold text-orange-500 leading-tight">
							{formatPrice(price)} <span className="text-[10px] font-medium">{sumLabel}</span>
						</span>
						{hasDiscount && (
							<span className="text-[10px] text-gray-400 line-through leading-tight">
								{formatPrice(product.price)}
							</span>
						)}
					</div>

					<div data-stepper className="shrink-0">
						{qty === 0 ? (
							<button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									onIncrement();
								}}
								className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 text-white flex items-center justify-center shadow-md shadow-orange-200 active:scale-90 transition-transform"
							>
								<Plus size={16} strokeWidth={2.5} />
							</button>
						) : (
							<div className="flex items-center gap-1">
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										onDecrement();
									}}
									className={cn(
										"w-7 h-7 rounded-lg bg-orange-50 text-orange-500",
										"flex items-center justify-center active:scale-90 transition-transform"
									)}
								>
									<Minus size={13} strokeWidth={2.5} />
								</button>
								<span className="text-sm font-bold text-gray-800 min-w-[14px] text-center">
									{qty}
								</span>
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										onIncrement();
									}}
									className={cn(
										"w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 text-white",
										"flex items-center justify-center shadow-sm shadow-orange-200 active:scale-90 transition-transform"
									)}
								>
									<Plus size={13} strokeWidth={2.5} />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
}
