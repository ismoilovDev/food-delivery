import { Banknote, CheckCircle2 } from "lucide-react";
import paymeLogo from "~/assets/images/payme.png";
import { BottomSheet } from "~/components/bottom-sheet";
import type { PaymentMethod } from "~/lib/api/types";

interface PaymentOption {
	method: PaymentMethod;
	label: string;
	description: string;
	icon: React.ReactNode;
}

interface Props {
	isOpen: boolean;
	selected: PaymentMethod;
	onSelect: (method: PaymentMethod) => void;
	onClose: () => void;
	t: {
		selectPaymentMethod: string;
		cash: string;
		payme: string;
		paymentOnDelivery: string;
		paymentOnline: string;
	};
}

export function PaymentMethodSheet({ isOpen, selected, onSelect, onClose, t }: Props) {
	const options: PaymentOption[] = [
		{
			method: "CASH",
			label: t.cash,
			description: t.paymentOnDelivery,
			icon: <Banknote size={20} className="text-green-500" />,
		},
		{
			method: "PAYME",
			label: t.payme,
			description: t.paymentOnline,
			icon: <img src={paymeLogo} alt="Payme" className="w-5 h-5 object-contain" />,
		},
	];

	return (
		<BottomSheet isOpen={isOpen} onClose={onClose}>
			<h2 className="text-base font-semibold text-gray-900 mb-4">{t.selectPaymentMethod}</h2>
			<div className="flex flex-col gap-2">
				{options.map((opt) => {
					const isSelected = selected === opt.method;
					return (
						<button
							key={opt.method}
							type="button"
							onClick={() => {
								onSelect(opt.method);
								onClose();
							}}
							className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all active:scale-[0.98] ${
								isSelected ? "border-orange-400 bg-orange-50" : "border-gray-100 bg-gray-50"
							}`}
						>
							<div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0">
								{opt.icon}
							</div>
							<div className="flex-1 text-left">
								<p
									className={`text-sm font-semibold ${isSelected ? "text-orange-600" : "text-gray-900"}`}
								>
									{opt.label}
								</p>
								<p className="text-xs text-gray-400 mt-0.5">{opt.description}</p>
							</div>
							{isSelected && <CheckCircle2 size={18} className="text-orange-500 shrink-0" />}
						</button>
					);
				})}
			</div>
		</BottomSheet>
	);
}
