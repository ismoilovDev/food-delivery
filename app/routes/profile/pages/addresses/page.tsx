import { ChevronLeft, Loader2, MapPin, Plus, Star, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { BottomSheet } from "~/components/bottom-sheet";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";
import { AddressPickerModal } from "~/routes/cart/components/address-picker-modal";
import { useProfileAddressesPage } from "./usePage";

export default function ProfileAddressesPage() {
	const {
		t,
		addresses,
		isLoading,
		deleteTargetId,
		setDeleteTargetId,
		isPickerOpen,
		setIsPickerOpen,
		isDeleting,
		isSettingDefault,
		isSavingAddress,
		handleSetDefault,
		handleDeleteConfirm,
		handleSaveAddress,
	} = useProfileAddressesPage();

	return (
		<div className="min-h-screen bg-gray-50 pb-8">
			{/* Header */}
			<div className="bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-12 pb-5 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Link
						to="/profile"
						className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0"
					>
						<ChevronLeft size={18} className="text-white" />
					</Link>
					<h1 className="text-lg font-bold text-white">{t.addresses.title}</h1>
				</div>
				<button
					type="button"
					onClick={() => setIsPickerOpen(true)}
					className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-xl"
				>
					<Plus size={15} className="text-white" />
					<span className="text-xs font-semibold text-white">{t.addresses.addNew}</span>
				</button>
			</div>

			<div className="px-4 pt-4 flex flex-col gap-3">
				{isLoading ? (
					Array.from({ length: 3 }).map((_, i) => (
						<Skeleton key={`sk-${i}`} className="h-20 w-full rounded-2xl" />
					))
				) : addresses.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-3 pt-20">
						<div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
							<MapPin size={28} className="text-orange-300" />
						</div>
						<p className="text-base font-semibold text-gray-700">{t.addresses.empty}</p>
						<p className="text-sm text-gray-400 text-center">{t.addresses.emptyDesc}</p>
						<button
							type="button"
							onClick={() => setIsPickerOpen(true)}
							className="mt-2 flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold text-sm shadow-lg shadow-orange-200"
						>
							<Plus size={16} />
							{t.addresses.addNew}
						</button>
					</div>
				) : (
					addresses.map((address) => (
						<div
							key={address.id}
							className={cn(
								"bg-white rounded-2xl shadow-sm px-4 py-3.5 flex items-start gap-3",
								address.isDefault && "ring-1 ring-orange-300",
							)}
						>
							{/* Icon */}
							<div
								className={cn(
									"w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
									address.isDefault ? "bg-orange-500" : "bg-gray-100",
								)}
							>
								<MapPin size={16} className={address.isDefault ? "text-white" : "text-gray-400"} />
							</div>

							{/* Content */}
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-0.5">
									{address.label && (
										<span className="text-xs font-semibold text-orange-500">{address.label}</span>
									)}
									{address.isDefault && (
										<span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">
											{t.addresses.default}
										</span>
									)}
								</div>
								<p className="text-sm text-gray-800 break-words leading-snug">
									{address.fullAddress ?? address.street ?? "—"}
								</p>
							</div>

							{/* Actions */}
							<div className="flex flex-col gap-1.5 shrink-0 ml-1">
								{!address.isDefault && (
									<button
										type="button"
										onClick={() => handleSetDefault(address.id)}
										disabled={isSettingDefault}
										className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
										title={t.addresses.setDefault}
									>
										<Star size={14} className="text-orange-400" />
									</button>
								)}
								<button
									type="button"
									onClick={() => setDeleteTargetId(address.id)}
									className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center active:scale-90 transition-transform"
									title={t.addresses.delete}
								>
									<Trash2 size={14} className="text-red-400" />
								</button>
							</div>
						</div>
					))
				)}
			</div>

			{/* Delete confirmation sheet */}
			<BottomSheet isOpen={deleteTargetId !== null} onClose={() => setDeleteTargetId(null)}>
				<h2 className="text-lg font-bold text-gray-900 mb-1">{t.addresses.deleteConfirm}</h2>
				<p className="text-sm text-gray-400 mb-6">{t.addresses.deleteConfirmDesc}</p>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => setDeleteTargetId(null)}
						className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-sm"
					>
						{t.common.no}
					</button>
					<button
						type="button"
						onClick={handleDeleteConfirm}
						disabled={isDeleting}
						className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
					>
						{isDeleting ? <Loader2 size={16} className="animate-spin" /> : t.common.delete}
					</button>
				</div>
			</BottomSheet>

			{/* Address picker modal */}
			<AddressPickerModal
				isOpen={isPickerOpen}
				onClose={() => setIsPickerOpen(false)}
				onSave={handleSaveAddress}
				isSaving={isSavingAddress}
				t={{
					pickLocation: t.cart.pickLocation,
					useCurrentLocation: t.cart.useCurrentLocation,
					confirmAddress: t.cart.confirmAddress,
					loadingAddress: t.cart.loadingAddress,
				}}
			/>
		</div>
	);
}
