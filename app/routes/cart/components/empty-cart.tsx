import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

interface EmptyCartProps {
	emptyLabel: string;
	emptyDesc: string;
	goToMenuLabel: string;
}

export function EmptyCart({ emptyLabel, emptyDesc, goToMenuLabel }: EmptyCartProps) {
	return (
		<div className="flex flex-col items-center justify-center flex-1 gap-4 py-20 px-8 text-center">
			<div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center">
				<ShoppingCart size={36} className="text-orange-300" />
			</div>
			<div>
				<p className="text-gray-800 font-semibold text-base">{emptyLabel}</p>
				<p className="text-gray-400 text-sm mt-1">{emptyDesc}</p>
			</div>
			<Link
				to="/menu"
				className="mt-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-2xl font-semibold text-sm shadow-lg shadow-orange-200 active:scale-95 transition-transform"
			>
				{goToMenuLabel}
			</Link>
		</div>
	);
}
