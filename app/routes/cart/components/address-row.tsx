import { ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router";
import type { DeliveryAddressDto } from "~/lib/api/types";

interface AddressRowProps {
	address: DeliveryAddressDto | undefined;
	selectLabel: string;
}

export function AddressRow({ address, selectLabel }: AddressRowProps) {
	return (
		<Link
			to="/profile/addresses"
			className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm active:scale-[0.98] transition-transform"
		>
			<div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
				<MapPin size={18} className="text-orange-500" />
			</div>
			<div className="flex-1 min-w-0">
				{address ? (
					<>
						<p className="text-xs text-gray-400 leading-none mb-0.5">
							{address.label ?? selectLabel}
						</p>
						<p className="text-sm font-medium text-gray-800 truncate">{address.address}</p>
					</>
				) : (
					<p className="text-sm font-medium text-gray-500">{selectLabel}</p>
				)}
			</div>
			<ChevronRight size={16} className="text-gray-400 shrink-0" />
		</Link>
	);
}
