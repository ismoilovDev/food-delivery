import { Loader2, Trash2 } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { formatPrice } from "~/lib/format";
import { AddressRow } from "./components/address-row";
import { CartItem } from "./components/cart-item";
import { CartSummary } from "./components/cart-summary";
import { EmptyCart } from "./components/empty-cart";
import { useCartPage } from "./usePage";

export default function CartPage() {
	const {
		t,
		cart,
		isLoading,
		defaultAddress,
		isEmpty,
		canOrder,
		isOrdering,
		isClearing,
		subtotal,
		discount,
		deliveryFee,
		total,
		handleIncrement,
		handleDecrement,
		handleClear,
		handlePlaceOrder,
	} = useCartPage();

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col pb-28">
			{/* Header */}
			<div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between border-b border-gray-100">
				<h1 className="text-2xl font-bold text-gray-900">{t.cart.title}</h1>
				{!isEmpty && (
					<button
						type="button"
						onClick={handleClear}
						disabled={isClearing}
						className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
					>
						{isClearing ? (
							<Loader2 size={16} className="text-red-400 animate-spin" />
						) : (
							<Trash2 size={16} className="text-red-400" />
						)}
					</button>
				)}
			</div>

			{/* Content */}
			{isLoading ? (
				<CartSkeleton />
			) : isEmpty ? (
				<EmptyCart
					emptyLabel={t.cart.empty}
					emptyDesc={t.cart.emptyDesc}
					goToMenuLabel={t.cart.goToMenu}
				/>
			) : (
				<div className="flex flex-col gap-3 px-4 pt-4">
					{/* Address */}
					<AddressRow address={defaultAddress} selectLabel={t.cart.selectAddress} />

					{/* Items */}
					<div className="flex flex-col gap-2">
						{cart?.items.map((item) => (
							<CartItem
								key={item.id}
								item={item}
								sumLabel="so'm"
								onIncrement={() => handleIncrement(item.id, item.quantity)}
								onDecrement={() => handleDecrement(item.id, item.quantity)}
							/>
						))}
					</div>

					{/* Summary */}
					<CartSummary
						subtotal={subtotal}
						deliveryFee={deliveryFee}
						discount={discount}
						total={total}
						t={{
							subtotal: t.cart.subtotal,
							deliveryFee: t.cart.deliveryFee,
							discount: t.cart.discount,
							total: t.cart.total,
							free: t.cart.free,
						}}
					/>
				</div>
			)}

			{/* Order button */}
			{!isLoading && !isEmpty && (
				<div className="fixed bottom-[64px] left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 z-40">
					<button
						type="button"
						onClick={handlePlaceOrder}
						disabled={!canOrder || isOrdering}
						className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-base shadow-lg shadow-orange-200 active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{isOrdering ? (
							<Loader2 size={18} className="animate-spin" />
						) : (
							<>
								<span>{t.cart.placeOrder}</span>
								<span className="opacity-80 font-semibold text-sm">
									· {formatPrice(total)} so'm
								</span>
							</>
						)}
					</button>
				</div>
			)}
		</div>
	);
}

function CartSkeleton() {
	return (
		<div className="flex flex-col gap-3 px-4 pt-4">
			<Skeleton className="h-14 w-full rounded-2xl" />
			<div className="flex flex-col gap-2">
				{[1, 2, 3].map((i) => (
					<Skeleton key={i} className="h-20 w-full rounded-2xl" />
				))}
			</div>
			<Skeleton className="h-28 w-full rounded-2xl" />
		</div>
	);
}
