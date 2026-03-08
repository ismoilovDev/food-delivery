import { Check, MapPin, Plus } from "lucide-react";
import { cn } from "~/lib/utils";
import type { DeliveryAddressDto } from "~/lib/api/types";

interface AddressSectionProps {
	addresses: DeliveryAddressDto[];
	selectedId: number | undefined;
	onSelect: (id: number) => void;
	onAddNew: () => void;
	t: {
		addressSection: string;
		addAddress: string;
	};
}

export function AddressSection({
	addresses,
	selectedId,
	onSelect,
	onAddNew,
	t,
}: AddressSectionProps) {
	return (
		<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
			<div className="px-4 pt-3.5 pb-2">
				<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
					{t.addressSection}
				</h2>
			</div>

			<div className="flex flex-col">
				{addresses.map((address) => {
					const isSelected = address.id === selectedId;
					return (
						<button
							key={address.id}
							type="button"
							onClick={() => onSelect(address.id)}
							className={cn(
								"flex items-center gap-3 px-4 py-3 text-left transition-colors active:scale-[0.98]",
								isSelected ? "bg-orange-50" : "bg-white"
							)}
						>
							<div
								className={cn(
									"w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
									isSelected ? "bg-orange-500" : "bg-gray-100"
								)}
							>
								{isSelected ? (
									<Check size={15} className="text-white" />
								) : (
									<MapPin size={15} className="text-gray-400" />
								)}
							</div>
							<div className="flex-1 min-w-0">
								{address.label && (
									<p
										className={cn(
											"text-xs leading-none mb-0.5",
											isSelected ? "text-orange-500 font-medium" : "text-gray-400"
										)}
									>
										{address.label}
									</p>
								)}
								<p
									className={cn(
										"text-sm truncate",
										isSelected ? "font-semibold text-gray-900" : "text-gray-600"
									)}
								>
									{address.address}
								</p>
							</div>
						</button>
					);
				})}

				{/* Add new address button */}
				<button
					type="button"
					onClick={onAddNew}
					className="flex items-center gap-3 px-4 py-3.5 border-t border-dashed border-gray-200 active:scale-[0.98] transition-transform"
				>
					<div className="w-8 h-8 rounded-xl bg-orange-50 border border-dashed border-orange-300 flex items-center justify-center shrink-0">
						<Plus size={15} className="text-orange-500" />
					</div>
					<span className="text-sm font-medium text-orange-500">{t.addAddress}</span>
				</button>
			</div>
		</div>
	);
}
