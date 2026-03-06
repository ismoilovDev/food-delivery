import { formatPrice } from "~/lib/format";

interface CartSummaryProps {
	subtotal: number;
	deliveryFee: number;
	discount: number;
	total: number;
	t: {
		subtotal: string;
		deliveryFee: string;
		discount: string;
		total: string;
		free: string;
	};
}

export function CartSummary({ subtotal, deliveryFee, discount, total, t }: CartSummaryProps) {
	return (
		<div className="bg-white rounded-2xl px-4 py-4 shadow-sm space-y-2.5">
			<Row label={t.subtotal} value={`${formatPrice(subtotal)} so'm`} />

			<Row
				label={t.deliveryFee}
				value={deliveryFee === 0 ? t.free : `${formatPrice(deliveryFee)} so'm`}
				valueClass={deliveryFee === 0 ? "text-green-500" : undefined}
			/>

			{discount > 0 && (
				<Row
					label={t.discount}
					value={`-${formatPrice(discount)} so'm`}
					valueClass="text-green-500"
				/>
			)}

			<div className="border-t border-gray-100 pt-2.5">
				<Row
					label={t.total}
					value={`${formatPrice(total)} so'm`}
					labelClass="font-semibold text-gray-900"
					valueClass="font-bold text-orange-500 text-base"
				/>
			</div>
		</div>
	);
}

function Row({
	label,
	value,
	labelClass,
	valueClass,
}: {
	label: string;
	value: string;
	labelClass?: string;
	valueClass?: string;
}) {
	return (
		<div className="flex items-center justify-between">
			<span className={`text-sm text-gray-500 ${labelClass ?? ""}`}>{label}</span>
			<span className={`text-sm text-gray-800 ${valueClass ?? ""}`}>{value}</span>
		</div>
	);
}
