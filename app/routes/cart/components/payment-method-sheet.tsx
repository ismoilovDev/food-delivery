import { Banknote, CheckCircle2, CreditCard } from "lucide-react";
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
		card: string;
		payme: string;
		click: string;
		uzum: string;
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
			method: "CARD",
			label: t.card,
			description: t.paymentOnline,
			icon: <CreditCard size={20} className="text-blue-500" />,
		},
		{
			method: "PAYME",
			label: t.payme,
			description: t.paymentOnline,
			icon: (
				<span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-blue-600 rounded-full">
					P
				</span>
			),
		},
		{
			method: "CLICK",
			label: t.click,
			description: t.paymentOnline,
			icon: (
				<span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-green-500 rounded-full">
					C
				</span>
			),
		},
		{
			method: "UZUM",
			label: t.uzum,
			description: t.paymentOnline,
			icon: (
				<span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-orange-500 rounded-full">
					U
				</span>
			),
		},
	];

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<button
				type="button"
				className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm w-full"
				onClick={onClose}
				aria-label="Close"
			/>

			{/* Sheet */}
			<div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
				{/* Drag handle */}
				<div className="flex justify-center pt-3 pb-1">
					<div className="w-10 h-1 rounded-full bg-gray-200" />
				</div>

				{/* Title */}
				<div className="px-5 py-3 border-b border-gray-100">
					<h2 className="text-base font-semibold text-gray-900">{t.selectPaymentMethod}</h2>
				</div>

				{/* Options */}
				<div className="px-4 py-3 flex flex-col gap-2 pb-8">
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
									isSelected ? "border-orange-400 bg-orange-50" : "border-gray-100 bg-white"
								}`}
							>
								<div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
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
			</div>
		</>
	);
}
