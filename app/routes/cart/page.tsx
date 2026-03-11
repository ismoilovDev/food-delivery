import { Banknote, ChevronRight, Loader2, Trash2 } from "lucide-react";
import paymeLogo from "~/assets/images/payme.png";
import { Skeleton } from "~/components/ui/skeleton";
import { formatPrice } from "~/lib/format";
import { AddressPickerModal } from "./components/address-picker-modal";
import { AddressSection } from "./components/address-section";
import { CartItem } from "./components/cart-item";
import { CartSummary } from "./components/cart-summary";
import { EmptyCart } from "./components/empty-cart";
import { PaymentMethodSheet } from "./components/payment-method-sheet";
import { PromoSection } from "./components/promo-section";
import { useCartPage } from "./usePage";

const PAYMENT_ICONS: Record<string, React.ReactNode> = {
	CASH: <Banknote size={16} className="text-green-500" />,
	PAYME: <img src={paymeLogo} alt="Payme" className="w-4 h-4 object-contain" />,
};

export default function CartPage() {
	const {
		t,
		cart,
		isLoading,
		addresses,
		selectedAddressId,
		isPickerOpen,
		isPaymentSheetOpen,
		setIsPaymentSheetOpen,
		paymentMethod,
		setPaymentMethod,
		note,
		setNote,
		promoInput,
		setPromoInput,
		promoError,
		appliedPromo,
		isApplyingPromo,
		isRemovingPromo,
		handleApplyPromo,
		handleRemovePromo,
		isEmpty,
		canOrder,
		isOrdering,
		isClearing,
		isSavingAddress,
		subtotal,
		discount,
		total,
		handleIncrement,
		handleDecrement,
		handleClear,
		handleSelectAddress,
		handleOpenPicker,
		handleClosePicker,
		handleSaveAddress,
		handlePlaceOrder,
	} = useCartPage();

	const paymentLabel = paymentMethod === "CASH" ? t.cart.cash : t.cart.payme;

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
					{/* Address section */}
					<AddressSection
						addresses={addresses}
						selectedId={selectedAddressId}
						onSelect={handleSelectAddress}
						onAddNew={handleOpenPicker}
						t={{
							addressSection: t.cart.addressSection,
							addAddress: t.cart.addAddress,
						}}
					/>

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

					{/* Payment method */}
					<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
						<div className="px-4 pt-3.5 pb-2">
							<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
								{t.cart.paymentMethod}
							</h2>
						</div>
						<button
							type="button"
							onClick={() => setIsPaymentSheetOpen(true)}
							className="w-full flex items-center gap-3 px-4 pb-3.5 active:bg-gray-50 transition-colors"
						>
							<div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
								{PAYMENT_ICONS[paymentMethod]}
							</div>
							<span className="flex-1 text-left text-sm font-medium text-gray-800">
								{paymentLabel}
							</span>
							<ChevronRight size={16} className="text-gray-400" />
						</button>
					</div>

					{/* Note */}
					<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
						<div className="px-4 pt-3.5 pb-2">
							<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
								{t.cart.notes}
							</h2>
						</div>
						<textarea
							value={note}
							onChange={(e) => setNote(e.target.value)}
							placeholder={t.cart.notesPlaceholder}
							rows={3}
							className="w-full px-4 pb-3.5 text-sm text-gray-800 placeholder-gray-400 resize-none outline-none"
						/>
					</div>

					{/* Promo */}
					<PromoSection
						input={promoInput}
						appliedPromo={appliedPromo}
						error={promoError}
						isApplying={isApplyingPromo}
						isRemoving={isRemovingPromo}
						onInputChange={setPromoInput}
						onApply={handleApplyPromo}
						onRemove={handleRemovePromo}
						t={{
							promo: t.cart.promo,
							promoPlaceholder: t.cart.promoPlaceholder,
							apply: t.cart.apply,
							remove: t.cart.remove,
						}}
					/>

					{/* Summary */}
					<CartSummary
						subtotal={subtotal}
						deliveryFee={0}
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

			{/* Address picker modal */}
			<AddressPickerModal
				isOpen={isPickerOpen}
				onClose={handleClosePicker}
				onSave={handleSaveAddress}
				isSaving={isSavingAddress}
				t={{
					pickLocation: t.cart.pickLocation,
					useCurrentLocation: t.cart.useCurrentLocation,
					confirmAddress: t.cart.confirmAddress,
					loadingAddress: t.cart.loadingAddress,
				}}
			/>

			{/* Payment method sheet */}
			<PaymentMethodSheet
				isOpen={isPaymentSheetOpen}
				selected={paymentMethod}
				onSelect={setPaymentMethod}
				onClose={() => setIsPaymentSheetOpen(false)}
				t={{
					selectPaymentMethod: t.cart.selectPaymentMethod,
					cash: t.cart.cash,
					payme: t.cart.payme,
					paymentOnDelivery: t.cart.paymentOnDelivery,
					paymentOnline: t.cart.paymentOnline,
				}}
			/>
		</div>
	);
}

function CartSkeleton() {
	return (
		<div className="flex flex-col gap-3 px-4 pt-4">
			<Skeleton className="h-32 w-full rounded-2xl" />
			<div className="flex flex-col gap-2">
				{[1, 2, 3].map((i) => (
					<Skeleton key={i} className="h-20 w-full rounded-2xl" />
				))}
			</div>
			<Skeleton className="h-16 w-full rounded-2xl" />
			<Skeleton className="h-28 w-full rounded-2xl" />
		</div>
	);
}
